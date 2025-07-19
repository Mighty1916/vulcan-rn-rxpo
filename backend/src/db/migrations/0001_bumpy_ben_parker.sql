CREATE TABLE "club_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" text NOT NULL,
	"date_of_birth" varchar(20) NOT NULL,
	"position" varchar(50) NOT NULL,
	"previous_clubs" text,
	"submitted_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_name" varchar(255);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_phone" varchar(20);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_address" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_pincode" varchar(10);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "jersey_name" varchar(32);--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "jersey_number" varchar(8);