import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { orders, clubApplications, friendlyBookings, adminUsers, nextMatch, recentResults, announcements } from "./db/schema.js";
import { eq, and } from "drizzle-orm";
import job from './config/cron.js'
import crypto from "crypto";
import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;

if(ENV.NODE_ENV === "production")  job.start()

app.use(express.json());

// Admin Authentication Middleware
const isAdmin = async (req, res, next) => {
  const adminEmail = req.headers['admin-email'];
  if (!adminEmail) {
    return res.status(401).json({ error: "Admin email required" });
  }
  
  try {
    const admin = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, adminEmail))
      .limit(1);
    
    if (admin.length === 0) {
      return res.status(403).json({ error: "Not authorized as admin" });
    }
    
    req.admin = admin[0];
    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email } = req.body;
    
    const admin = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);
    
    if (admin.length === 0) {
      return res.status(401).json({ error: "Not authorized as admin" });
    }
    
    res.status(200).json({ success: true, admin: admin[0] });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Admin Routes - Orders Management
app.get("/api/admin/orders", isAdmin, async (req, res) => {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(orders.createdAt);
    
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/admin/orders/:id/status", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const updatedOrder = await db
      .update(orders)
      .set({ status, adminNotes })
      .where(eq(orders.id, parseInt(id)))
      .returning();
    
    res.status(200).json(updatedOrder[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Admin Routes - Bookings Management
app.get("/api/admin/bookings", isAdmin, async (req, res) => {
  try {
    const allBookings = await db
      .select()
      .from(friendlyBookings)
      .orderBy(friendlyBookings.createdAt);
    
    res.status(200).json(allBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/admin/bookings/:id/status", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const updatedBooking = await db
      .update(friendlyBookings)
      .set({ status, adminNotes })
      .where(eq(friendlyBookings.id, parseInt(id)))
      .returning();
    
    res.status(200).json(updatedBooking[0]);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Admin Routes - Applications Management
app.get("/api/admin/applications", isAdmin, async (req, res) => {
  try {
    const allApplications = await db
      .select()
      .from(clubApplications)
      .orderBy(clubApplications.submittedAt);
    
    res.status(200).json(allApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/api/admin/applications/:id/status", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    
    const updatedApplication = await db
      .update(clubApplications)
      .set({ status, adminNotes })
      .where(eq(clubApplications.id, parseInt(id)))
      .returning();
    
    res.status(200).json(updatedApplication[0]);
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Admin Routes - Content Management
app.get("/api/admin/content", isAdmin, async (req, res) => {
  try {
    const [nextMatchData] = await db.select().from(nextMatch).where(eq(nextMatch.isActive, true));
    const recentResultsData = await db.select().from(recentResults).orderBy(recentResults.createdAt);
    const announcementsData = await db.select().from(announcements).where(eq(announcements.isActive, true));
    
    res.status(200).json({
      nextMatch: nextMatchData || null,
      recentResults: recentResultsData,
      announcements: announcementsData
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/admin/content/next-match", isAdmin, async (req, res) => {
  try {
    const { opponent, date, time, competition } = req.body;
    
    // Deactivate current active match
    await db.update(nextMatch).set({ isActive: false });
    
    // Create new active match
    const newMatch = await db
      .insert(nextMatch)
      .values({ opponent, date, time, competition, isActive: true })
      .returning();
    
    res.status(201).json(newMatch[0]);
  } catch (error) {
    console.error("Error updating next match:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/admin/content/recent-result", isAdmin, async (req, res) => {
  try {
    const { team1, team2, score, date, competition } = req.body;
    
    const newResult = await db
      .insert(recentResults)
      .values({ team1, team2, score, date, competition })
      .returning();
    
    res.status(201).json(newResult[0]);
  } catch (error) {
    console.error("Error adding recent result:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/admin/content/announcement", isAdmin, async (req, res) => {
  try {
    const { title, content, type } = req.body;
    
    const newAnnouncement = await db
      .insert(announcements)
      .values({ title, content, type: type || 'public', isActive: true })
      .returning();
    
    res.status(201).json(newAnnouncement[0]);
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/orders", (req, res) => {
  res.status(200).json({ success: true }); 
});

// Create a new order only for testing 
app.post("/api/orders", async (req, res) => {
  try {
    const { userEmail, userID, total, items, userName, userPhone, userAddress, userPincode, jerseyName, jerseyNumber } = req.body;

    if (!userEmail || !userID || !total || !items) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = await db
      .insert(orders)
      .values({
        userEmail,
        userID,
        total,
        items, // <-- Save the full cart array as JSONB
        userName,
        userPhone,
        userAddress,
        userPincode,
        jerseyName,
        jerseyNumber,
        status: "Pending",
      })
      .returning();

    res.status(201).json(newOrder[0]);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get orders by user email
app.get("/api/orders/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    userID
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userID, userID));

    res.status(200).json(userOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE order by ID
app.delete("/api/orders/:userID", async (req, res) => {
    try {
      const { userID } = req.params;
  
      await db.delete(orders).where(eq(orders.userID, parseInt(userID)));
  
      res.status(200).json({ message: "Order deleted successfully 🗑️" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

app.listen(PORT, () => {
  console.log("🔥 Vulcan server running on PORT:", PORT);
});


// Submit club application
app.post("/api/apply", async (req, res) => {
  try {
    const {
      fullName, email, phone, address, dateOfBirth,
      position, previousClubs, userID
    } = req.body;

    // Simple field check
    if (!fullName || !email || !phone || !address || !dateOfBirth || !position || !userID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newApplication = await db
      .insert(clubApplications)
      .values({
        fullName, email, phone, address, dateOfBirth,
        position, previousClubs, userID
      })
      .returning();

    res.status(201).json({ message: "Application submitted", data: newApplication[0] });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


const razorpay = new Razorpay({
  key_id: ENV.RAZORPAY_KEY_ID,
  key_secret: ENV.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
app.post("/api/create-razorpay-order", async (req, res) => {
  try {
    let { amount, currency, receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ error: "Amount and receipt required" });
    }

    currency = (currency || "INR").toUpperCase(); // Ensure it's uppercase

    const options = {
      amount: Math.floor(Number(amount) * 100), // Convert to number + paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    res.json({ ...order, key: ENV.RAZORPAY_KEY_ID }); // Send key to frontend too
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});


// Verify payment and save order
app.post("/api/verify-razorpay-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
      userID,
      total,
      items,
      userName,
      userPhone,
      userAddress,
      userPincode,
      jerseyName,
      jerseyNumber,
    } = req.body;

    // 1. Verify signature
    const generated_signature = crypto
      .createHmac("sha256", ENV.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // 2. Save order to DB
    const newOrder = await db
      .insert(orders)
      .values({
        userEmail,
        userID,
        total,
        items, // <-- Save the full cart array as JSONB
        userName,
        userPhone,
        userAddress,
        userPincode,
        jerseyName,
        jerseyNumber,
        status: "Pending",
      })
      .returning();

    res.status(201).json({ success: true, order: newOrder[0] });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//friendly booking endpoint
app.post("/api/friendly-booking", async (req, res) => {
  try {
    const { name, phone, email, teamName, matchGround, date, time, userID } = req.body;
    if (!name || !phone || !email || !teamName || !matchGround || !date || !time || !userID) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newBooking = await db
      .insert(friendlyBookings)
      .values({ name, phone, email, teamName, matchGround, date, time, userID })
      .returning();
    res.status(201).json({ success: true, booking: newBooking[0] });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get friendly bookings by userID
app.get("/api/friendly-booking/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const bookings = await db
      .select()
      .from(friendlyBookings)
      .where(eq(friendlyBookings.userID, userID));
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get club applications by userID
app.get("/api/apply/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const applications = await db
      .select()
      .from(clubApplications)
      .where(eq(clubApplications.userID, userID));
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});