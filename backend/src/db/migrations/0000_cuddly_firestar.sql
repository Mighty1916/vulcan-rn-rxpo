CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"quantity" integer DEFAULT 1,
	"total" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"user_id" text NOT NULL
);
