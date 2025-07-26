import { pgTable, serial, text, timestamp, integer, varchar, jsonb, boolean } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    productName: varchar("product_name", { length: 255 }),
    quantity: integer("quantity"),
    total: integer("total").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    userID: text("user_id").notNull(),
    userName: varchar("user_name", { length: 255 }),
    userPhone: varchar("user_phone", { length: 20 }),
    userAddress: text("user_address"),
    userPincode: varchar("user_pincode", { length: 10 }),
    jerseyName: varchar("jersey_name", { length: 32 }),
    jerseyNumber: varchar("jersey_number", { length: 8 }),
    items: jsonb("items"),
    status: varchar("status", { length: 32 }).default('Pending'),
    adminNotes: text("admin_notes"),
    refundStatus: varchar("refund_status", { length: 32 }),
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
    status: varchar("status", { length: 32 }).default('Pending'),
    adminNotes: text("admin_notes"),
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
  status: varchar("status", { length: 32 }).default('Booked'),
  adminNotes: text("admin_notes"),
});

// New Admin Tables
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).default('admin'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const nextMatch = pgTable("next_match", {
  id: serial("id").primaryKey(),
  opponent: varchar("opponent", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  competition: varchar("competition", { length: 255 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recentResults = pgTable("recent_results", {
  id: serial("id").primaryKey(),
  team1: varchar("team1", { length: 255 }).notNull(),
  team2: varchar("team2", { length: 255 }).notNull(),
  score: varchar("score", { length: 50 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  competition: varchar("competition", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  type: varchar("type", { length: 50 }).default('public'), // 'public' or 'secret'
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});