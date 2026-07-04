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
        <p>solarPost — Sharing solar generation data openly. ☀️</p>
        <p className="mt-1">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/thanveer-ali-98041a1a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-amber-600 underline underline-offset-2 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          >
            Thanveer Ali
          </a>
        </p>
      </footer>
    </div>
  );
}
