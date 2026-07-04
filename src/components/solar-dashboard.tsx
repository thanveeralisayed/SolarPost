"use client";

import { useState, useEffect, useCallback } from "react";
import type { SolarPostWithCalculations } from "@/lib/types";
import SubmissionForm from "./submission-form";
import Feed from "./feed";

export default function SolarDashboard() {
  const [posts, setPosts] = useState<SolarPostWithCalculations[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then(setPosts);
  }, []);

  const handlePostCreated = useCallback((post: SolarPostWithCalculations) => {
    setPosts((prev) => [post, ...prev]);
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
