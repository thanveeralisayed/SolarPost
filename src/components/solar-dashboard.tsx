"use client";

import { useState, useCallback } from "react";
import type { SolarPostWithCalculations } from "@/lib/types";
import { getSortedPosts } from "@/lib/mock-data";
import SubmissionForm from "./submission-form";
import Feed from "./feed";

export default function SolarDashboard() {
  const [posts, setPosts] = useState<SolarPostWithCalculations[]>(getSortedPosts);
  const [, setRefreshKey] = useState(0);

  const handlePostCreated = useCallback((post: SolarPostWithCalculations) => {
    setPosts((prev) => [post, ...prev]);
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      <section>
        <SubmissionForm onPostCreated={handlePostCreated} />
      </section>
      <section>
        <Feed posts={posts} />
      </section>
    </div>
  );
}
