CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'admin',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"type" varchar(50) DEFAULT 'public',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "next_match" (
	"id" serial PRIMARY KEY NOT NULL,
	"opponent" varchar(255) NOT NULL,
	"date" varchar(50) NOT NULL,
	"time" varchar(50) NOT NULL,
	"competition" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "recent_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"team1" varchar(255) NOT NULL,
	"team2" varchar(255) NOT NULL,
	"score" varchar(50) NOT NULL,
	"date" varchar(50) NOT NULL,
	"competition" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "club_applications" ADD COLUMN "status" varchar(32) DEFAULT 'Pending';--> statement-breakpoint
ALTER TABLE "club_applications" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "friendly_bookings" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "refund_status" varchar(32);