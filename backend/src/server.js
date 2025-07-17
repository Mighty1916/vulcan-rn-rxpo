import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { orders, clubApplications } from "./db/schema.js";
import { eq } from "drizzle-orm";
import job from './config/cron.js'

const app = express();
const PORT = ENV.PORT || 3000;

if(ENV.NODE_ENV === "production")  job.start()

//if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.get("/api/orders", (req, res) => {
  res.status(200).json({ success: true }); 
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const { userEmail, userID, productName, quantity, total } = req.body;

    if (!userEmail || !productName || !quantity || !total || !userID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = await db
      .insert(orders)
      .values({ userEmail, productName, quantity, total, userID })
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
      position, experience, previousClubs, emergencyContact, emergencyPhone
    } = req.body;

    // Simple field check
    if (!fullName || !email || !phone || !address || !dateOfBirth || !position) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newApplication = await db
      .insert(clubApplications)
      .values({
        fullName, email, phone, address, dateOfBirth,
        position, experience, previousClubs, emergencyContact, emergencyPhone
      })
      .returning();

    res.status(201).json({ message: "Application submitted", data: newApplication[0] });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

