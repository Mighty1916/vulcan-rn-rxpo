import { pgTable, serial, text, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    productName: varchar("product_name", { length: 255 }).notNull(),
    quantity: integer("quantity").default(1),
    total: integer("total").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    userID: text("user_id").notNull(),
    userName: varchar("user_name", { length: 255 }),
    userPhone: varchar("user_phone", { length: 20 }),
    userAddress: text("user_address"),
    userPincode: varchar("user_pincode", { length: 10 }),
    jerseyName: varchar("jersey_name", { length: 32 }),
    jerseyNumber: varchar("jersey_number", { length: 8 }),
}); 

export const clubApplications = pgTable("club_applications", {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    dateOfBirth: varchar("date_of_birth", { length: 20 }).notNull(),
    position: varchar("position", { length: 50 }).notNull(),
    previousClubs: text("previous_clubs"),
    submittedAt: timestamp("submitted_at").defaultNow(),
    userID: text("user_id").notNull(),
});

export const friendlyBookings = pgTable("friendly_bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  teamName: varchar("team_name", { length: 255 }).notNull(),
  matchGround: varchar("match_ground", { length: 255 }).notNull(),
  date: varchar("date", { length: 32 }).notNull(),
  time: varchar("time", { length: 32 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  userID: text("user_id").notNull(),
});