CREATE TABLE "friendly_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"team_name" varchar(255) NOT NULL,
	"match_ground" varchar(255) NOT NULL,
	"date" varchar(32) NOT NULL,
	"time" varchar(32) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
