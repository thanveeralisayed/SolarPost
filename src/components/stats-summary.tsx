import type { SolarPostWithCalculations } from "@/lib/types";

interface StatsSummaryProps {
  posts: SolarPostWithCalculations[];
}

export default function StatsSummary({ posts }: StatsSummaryProps) {
  const totalPosts = posts.length;
  const avgYield =
    totalPosts > 0
      ? posts.reduce((s, p) => s + p.specificYield, 0) / totalPosts
      : 0;
  const totalEnergy = posts.reduce((s, p) => s + p.dailyProduction, 0);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-950/30">
        <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
          {totalPosts}
        </p>
        <p className="text-xs text-amber-600 dark:text-amber-400">Posts</p>
      </div>
      <div className="rounded-lg bg-emerald-50 p-3 text-center dark:bg-emerald-950/30">
        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
          {totalEnergy.toFixed(0)}
        </p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          Total kWh
        </p>
      </div>
      <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-950/30">
        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          {avgYield.toFixed(1)}
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">Avg Yield</p>
      </div>
    </div>
  );
}
