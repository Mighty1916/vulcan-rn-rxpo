import { db } from "./src/config/db.js";
import { adminUsers } from "./src/db/schema.js";

// Add admin user
const addAdmin = async () => {
  try {
    const adminEmail = "albabkhan1916135@gmail.com"; // Change this to your admin email
    
    const newAdmin = await db
      .insert(adminUsers)
      .values({
        email: adminEmail,
        role: 'admin'
      })
      .returning();
    
    console.log('Admin added successfully:', newAdmin[0]);
  } catch (error) {
    console.error('Error adding admin:', error);
  }
};

addAdmin(); 