"use client";

import { useMemo, useState } from "react";
import { Game } from "@/lib/oddsApi";
import MatchupCard from "./MatchupCard";

// Sport filter tabs + matchup grid. Client component so switching sports is
// instant with no page reload — the games themselves are still fetched
// server-side in app/page.tsx and passed in as a prop.
export default function MatchupsBoard({ games }: { games: Game[] }) {
  const sports = useMemo(() => {
    const unique = Array.from(new Set(games.map((g) => g.sport_title)));
    return ["All", ...unique];
  }, [games]);

  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? games : games.filter((g) => g.sport_title === active);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {sports.map((sport) => {
          const isActive = sport === active;
          return (
            <button
              key={sport}
              onClick={() => setActive(sport)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                isActive
                  ? "border-edge bg-edge text-ink"
                  : "border-line text-mist hover:border-mist hover:text-white"
              }`}
            >
              {sport}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-line bg-panel/40 p-6 text-center text-sm text-mist">
          No {active} matchups on the board right now — check back soon.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((game) => (
            <MatchupCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
