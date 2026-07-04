import { db } from "@/db";
import { solarPosts } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const posts = await db
    .select({
      id: solarPosts.id,
      dailyProduction: solarPosts.dailyProduction,
      place: solarPosts.place,
      postDate: solarPosts.postDate,
      panelWattage: solarPosts.panelWattage,
      panelCount: solarPosts.panelCount,
      createdAt: solarPosts.createdAt,
      totalCapacityKwp: sql<number>`(${solarPosts.panelWattage} * ${solarPosts.panelCount}) / 1000.0`,
      specificYield: sql<number>`${solarPosts.dailyProduction} / ((${solarPosts.panelWattage} * ${solarPosts.panelCount}) / 1000.0)`,
    })
    .from(solarPosts)
    .orderBy(desc(solarPosts.createdAt));

  const result = posts.map((p) => ({
    ...p,
    totalCapacityKwp: Number(p.totalCapacityKwp),
    specificYield: Number(p.specificYield),
  }));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const [post] = await db
    .insert(solarPosts)
    .values({
      dailyProduction: body.dailyProduction,
      place: body.place,
      postDate: body.postDate,
      panelWattage: body.panelWattage,
      panelCount: body.panelCount,
    })
    .returning();

  const totalCapacityKwp = (post.panelWattage * post.panelCount) / 1000;
  const specificYield = totalCapacityKwp > 0 ? post.dailyProduction / totalCapacityKwp : 0;

  return NextResponse.json({ ...post, totalCapacityKwp, specificYield });
}
