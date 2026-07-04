import Header from "@/components/header";
import SolarDashboard from "@/components/solar-dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <SolarDashboard />
      </main>
      <footer className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        solarPost — Sharing solar generation data openly. ☀️
      </footer>
    </div>
  );
}
