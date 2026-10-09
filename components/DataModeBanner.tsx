export default function DataModeBanner({ isLive }: { isLive: boolean }) {
  if (isLive) return null;
  return (
    <div className="mx-auto mb-8 max-w-6xl px-5">
      <div className="rounded-lg border border-volt/30 bg-volt/10 px-4 py-2.5 text-xs text-volt">
        Showing sample odds data. Add an <code className="rounded bg-ink/60 px-1 py-0.5">ODDS_API_KEY</code>{" "}
        to <code className="rounded bg-ink/60 px-1 py-0.5">.env.local</code> to switch to live odds — see README.
      </div>
    </div>
  );
}
