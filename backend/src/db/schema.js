import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    productName: varchar("product_name", { length: 255 }).notNull(),
    quantity: integer("quantity").default(1),
    total: integer("total").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    userID: text("user_id").notNull(),
    userAddress: text("address").notNull(),
}); 

export const clubApplications = pgTable("club_applications", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    dateOfBirth: varchar("date_of_birth", { length: 20 }).notNull(),
    position: varchar("position", { length: 50 }).notNull(),
    experience: text("experience"),
    previousClubs: text("previous_clubs"),
    emergencyContact: varchar("emergency_contact", { length: 255 }),
    emergencyPhone: varchar("emergency_phone", { length: 20 }),
    submittedAt: timestamp("submitted_at").defaultNow()
  });