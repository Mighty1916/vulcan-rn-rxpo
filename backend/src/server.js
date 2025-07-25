import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { orders, clubApplications, friendlyBookings } from "./db/schema.js";
import { eq } from "drizzle-orm";
import job from './config/cron.js'
import crypto from "crypto";
import dotenv from "dotenv";
import Razorpay from "razorpay";
dotenv.config();

const app = express();
const PORT = ENV.PORT || 3000;


if(ENV.NODE_ENV === "production")  job.start()
//if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

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