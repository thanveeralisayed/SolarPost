# Product Requirement Document (PRD): solarPost

---

## 1. Executive Summary & Product Vision

**solarPost** is a lightweight, crowd-sourced web application where solar energy system owners can publicly share their daily generation metrics without the friction of creating an account. The goal is to provide a clean, real-time community dashboard that highlights regional solar efficiency and encourages solar adoption through transparent, peer-to-peer data sharing.

---

## 2. Core Features & Scope

### In Scope
* **Anonymous Daily Log Submission:** A simple form to post daily generation metrics.
* **Public Activity Feed:** A chronological list of all global or regional solar submissions.
* **Basic Search/Filter:** Filter posts by location (place) or date.
* **Automatic Calculations:** Total system capacity (kWp) calculated automatically based on panel count and wattage.

### Out of Scope
* User Authentication, Profiles, or User-specific Dashboards.
* Push or Email Notifications.
* Historical analytics charts per specific user (since posts are anonymous).
* Upvotes, comments, or social interactions.

---

## 3. Functional Requirements

### 3.1. Form Submission (The Post Component)
Users must be able to submit their data via a single, clean form component on the homepage. 

| Field Name | Type | Validation / Constraints |
| :--- | :--- | :--- |
| **Daily Production** | Number (Float) | Required. Unit: kWh. Must be greater than 0. |
| **Place / Location** | String | Required. Free text (e.g., "Kerala, India" or "Austin, TX"). Max 100 chars. |
| **Date** | Date Picker | Required. Defaults to current date. Cannot be a future date. |
| **Panel Wattage** | Number (Integer) | Required. Unit: Watts (e.g., 450, 550). |
| **Number of Panels**| Number (Integer) | Required. Minimum: 1. |

> **Note on Spam Mitigation:** Since there is no user authentication, a hidden honeypot field or basic rate-limiting via Next.js middleware (by IP address) should be implemented to prevent automated spam submissions.

### 3.2. Public Dashboard & Feed
* **The Global Feed:** Displays submissions in a clean, chronological feed (latest first).
* **Calculated Metrics Per Post:** 
    * **Total Capacity (kWp):** Calculated as `(Panel Wattage * Number of Panels) / 1000`.
    * **Specific Yield:** Calculated as `Daily Production (kWh) / Total Capacity (kWp)`. This enables fair comparison between small and large setups.
* **Filtering:** Users can search posts by typing a location or filtering by a specific date.

---

## 4. Technical Architecture & Stack

The application is built to maximize performance, zero-cold-start efficiency, and rapid deployment.

* **Framework:** Next.js (Latest App Router) leveraging Server Components for optimized data fetching.
* **Language:** TypeScript for strict type safety across the frontend and database layers.
* **Styling:** Tailwind CSS for a fully responsive, utility-first UI.
* **Database:** Neon Postgres (Serverless Postgres database that scales to zero).
* **ORM:** Drizzle ORM for type-safe database queries and migrations.

### Database Schema (Drizzle Concept)

```typescript
import { pgTable, serial, integer, real, varchar, date, timestamp } from 'drizzle-orm/pg-core';

export const solarPosts = pgTable('solar_posts', {
  id: serial('id').primaryKey(),
  dailyProduction: real('daily_production').notNull(),
  place: varchar('place', { length: 100 }).notNull(),
  postDate: date('post_date').notNull(),
  panelWattage: integer('panel_wattage').notNull(),
  panelCount: integer('panel_count').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});