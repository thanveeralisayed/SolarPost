import type { SolarPostWithCalculations } from "@/lib/types";

interface PostCardProps {
  post: SolarPostWithCalculations;
}

function getYieldColor(yield_: number): string {
  if (yield_ >= 4) return "text-emerald-600 dark:text-emerald-400";
  if (yield_ >= 2.5) return "text-amber-600 dark:text-amber-400";
  return "text-red-500 dark:text-red-400";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {post.place}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {formatDate(post.postDate)}
          </p>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
          {post.dailyProduction} kWh
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Capacity</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {post.totalCapacityKwp.toFixed(2)} kWp
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Yield</p>
          <p
            className={`text-sm font-semibold ${getYieldColor(post.specificYield)}`}
          >
            {post.specificYield.toFixed(2)}
            <span className="text-xs font-normal"> kWh/kWp</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">System</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {post.panelCount} × {post.panelWattage}W
          </p>
        </div>
      </div>
    </div>
  );
}
