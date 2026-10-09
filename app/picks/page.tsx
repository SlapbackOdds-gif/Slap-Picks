import { getPicks, computeRecord } from "@/lib/picks";
import ResultBadge from "@/components/ResultBadge";
import SectionHeading from "@/components/SectionHeading";

// Fully public — no account gate. Picks are managed via the password-
// protected /admin page (see app/admin/page.tsx), which is a separate
// concern from who can VIEW the record. If a premium/members-only tier
// is added later, this is the page to re-introduce a visitor gate on.
export default async function PicksPage() {
  const picks = await getPicks();
  const record = computeRecord(picks);

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <SectionHeading
        eyebrow="Track Record"
        title="Every Pick, Graded in the Open"
        description="No cherry-picking. Every published pick lands here, win or lose, with a note on why."
      />

      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-edge">
            {record.wins}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-mist">
            Wins
          </p>
        </div>
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-warn">
            {record.losses}
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-mist">
            Losses
          </p>
        </div>
        <div className="card p-5 text-center">
          <p className="font-display text-3xl font-bold text-white">
            {record.winPct}%
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-mist">
            Win Rate
          </p>
        </div>
      </div>

      {picks.length === 0 ? (
        <p className="rounded-lg border border-line bg-panel/40 p-6 text-center text-sm text-mist">
          No picks published yet — check back soon.
        </p>
      ) : (
        <div className="card divide-y divide-line">
          {picks.map((pick) => (
            <div
              key={pick.id}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs text-mist">
                  {pick.date} · {pick.sport} · {pick.matchup}
                </p>
                <p className="font-display text-sm font-bold text-white">
                  {pick.pick}{" "}
                  <span className="font-body font-normal text-mist">
                    ({pick.odds})
                  </span>
                </p>
                {pick.note && (
                  <p className="mt-1 text-xs text-mist">{pick.note}</p>
                )}
              </div>
              <ResultBadge result={pick.result} />
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-mist">
        Past results don&apos;t guarantee future performance. This record is
        for transparency, not a promise.
      </p>
    </div>
  );
}
