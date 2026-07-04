export default function Header() {
  return (
    <header className="border-b border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-xl">
          ☀️
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-amber-900 dark:text-amber-100">
            solarPost
          </h1>
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Community Solar Energy Feed
          </p>
        </div>
      </div>
    </header>
  );
}
