"use client";

import { useState, useMemo } from "react";
import type { SolarPostWithCalculations } from "@/lib/types";
import { filterPosts } from "@/lib/mock-data";
import PostCard from "./post-card";
import StatsSummary from "./stats-summary";

interface FeedProps {
  posts: SolarPostWithCalculations[];
}

export default function Feed({ posts }: FeedProps) {
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = useMemo(() => {
    let result = posts;
    if (query.trim()) {
      result = filterPosts(result, query);
    }
    if (dateFilter) {
      result = result.filter((p) => p.postDate === dateFilter);
    }
    return result;
  }, [posts, query, dateFilter]);

  return (
    <div className="space-y-4">
      <StatsSummary posts={filtered} />

      <div className="flex gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 py-2 pl-10 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-40 rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          No solar posts found. Be the first to share!
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
