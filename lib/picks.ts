import { supabase } from "./supabaseClient";

export type PickResult = "win" | "loss" | "push" | "pending";

export interface Pick {
  id: string;
  date: string; // formatted for display, e.g. "Sep 21, 2026"
  matchup: string;
  sport: string;
  pick: string; // e.g. "Chiefs -3.5"
  odds: string; // e.g. "-110"
  result: PickResult;
  note?: string;
}

// Raw row shape as stored in Supabase — see the `picks` table created in
// the SQL editor. pick_date is a plain ISO date string (YYYY-MM-DD).
export interface DbPickRow {
  id: string;
  pick_date: string;
  matchup: string;
  sport: string;
  pick: string;
  odds: string;
  result: PickResult;
  note: string | null;
}

// ---------------------------------------------------------------------------
// MVP mode (Supabase not configured): shows sample picks so the page looks
// complete immediately. See .env.local.example / README for Supabase setup.
// Once Supabase IS configured, this fallback is only used if a request
// fails — a real empty table correctly shows an empty state, not this.
// ---------------------------------------------------------------------------
const FALLBACK_PICKS: Pick[] = [
  {
    id: "p1",
    date: "Sep 21, 2026",
    matchup: "Bills @ Jets",
    sport: "NFL",
    pick: "Bills -2.5",
    odds: "-110",
    result: "win",
    note: "Bills covered comfortably, 24-13.",
  },
  {
    id: "p2",
    date: "Sep 20, 2026",
    matchup: "Celtics @ Heat",
    sport: "NBA",
    pick: "Under 219.5",
    odds: "-108",
    result: "win",
  },
  {
    id: "p3",
    date: "Sep 19, 2026",
    matchup: "Dodgers @ Padres",
    sport: "MLB",
    pick: "Dodgers ML",
    odds: "-145",
    result: "loss",
    note: "Bullpen blew a 3-run lead in the 8th.",
  },
  {
    id: "p4",
    date: "Sep 17, 2026",
    matchup: "Cowboys @ Giants",
    sport: "NFL",
    pick: "Cowboys -6.5",
    odds: "-112",
    result: "push",
  },
];

function formatDate(iso: string): string {
  // Noon avoids the date shifting a day backward/forward across timezones.
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapRow(row: DbPickRow): Pick {
  return {
    id: row.id,
    date: formatDate(row.pick_date),
    matchup: row.matchup,
    sport: row.sport,
    pick: row.pick,
    odds: row.odds,
    result: row.result,
    note: row.note ?? undefined,
  };
}

// Used by the public /picks page.
export async function getPicks(): Promise<Pick[]> {
  if (!supabase) return FALLBACK_PICKS;

  const { data, error } = await supabase
    .from("picks")
    .select("*")
    .order("pick_date", { ascending: false });

  if (error) {
    console.error("Failed to fetch picks from Supabase:", error.message);
    return FALLBACK_PICKS; // fail open to sample data rather than a broken page
  }

  // A real empty table is a true empty state, not stale sample data.
  return (data as DbPickRow[]).map(mapRow);
}

export function isPicksLiveMode(): boolean {
  return Boolean(supabase);
}

export function computeRecord(picks: Pick[]) {
  const graded = picks.filter((p) => p.result !== "pending");
  const wins = graded.filter((p) => p.result === "win").length;
  const losses = graded.filter((p) => p.result === "loss").length;
  const pushes = graded.filter((p) => p.result === "push").length;
  const winPct =
    wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
  return { wins, losses, pushes, winPct };
}
