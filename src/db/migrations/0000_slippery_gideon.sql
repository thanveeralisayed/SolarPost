CREATE TABLE "solar_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"daily_production" real NOT NULL,
	"place" varchar(100) NOT NULL,
	"post_date" date NOT NULL,
	"panel_wattage" integer NOT NULL,
	"panel_count" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
