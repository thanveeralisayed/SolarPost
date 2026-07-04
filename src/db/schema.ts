import { pgTable, serial, integer, real, varchar, date, timestamp } from "drizzle-orm/pg-core";

export const solarPosts = pgTable("solar_posts", {
  id: serial("id").primaryKey(),
  dailyProduction: real("daily_production").notNull(),
  place: varchar("place", { length: 100 }).notNull(),
  postDate: date("post_date").notNull(),
  panelWattage: integer("panel_wattage").notNull(),
  panelCount: integer("panel_count").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type SolarPost = typeof solarPosts.$inferSelect;
export type NewSolarPost = typeof solarPosts.$inferInsert;
