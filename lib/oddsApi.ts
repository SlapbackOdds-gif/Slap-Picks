import { Game, MOCK_GAMES } from "./mockOdds";

export type { Game };

// ---------------------------------------------------------------------------
// Odds data layer.
//
// MVP mode (default): no API key set -> serves MOCK_GAMES so the site looks
// complete immediately.
//
// Live mode: set ODDS_API_KEY in .env.local (get a free key at
// https://the-odds-api.com, 500 free credits/month) and this automatically
// switches to live odds. No other code changes needed.
// ---------------------------------------------------------------------------

const ODDS_API_BASE = "https://api.the-odds-api.com/v4";

// Sports to pull for the homepage. Add/remove keys as needed — full list at
// https://the-odds-api.com/sports-odds-data/sports-apis.html
const SPORT_KEYS = [
  "americanfootball_nfl",
  "basketball_nba",
  "baseball_mlb",
];

export async function getUpcomingGames(): Promise<Game[]> {
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    return MOCK_GAMES;
  }

  try {
    const results = await Promise.all(
      SPORT_KEYS.map(async (sportKey) => {
        const url = `${ODDS_API_BASE}/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`;
        const res = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
        if (!res.ok) {
          console.error(`Odds API error for ${sportKey}: ${res.status}`);
          return [];
        }
        return (await res.json()) as Game[];
      })
    );
    const games = results.flat();
    return games.length > 0 ? games : MOCK_GAMES;
  } catch (err) {
    console.error("Failed to fetch live odds, falling back to mock data:", err);
    return MOCK_GAMES;
  }
}

export function isLiveDataMode(): boolean {
  return Boolean(process.env.ODDS_API_KEY);
}

// Helper: format American odds with the leading +/- sign.
export function formatOdds(price: number): string {
  return price > 0 ? `+${price}` : `${price}`;
}

// Helper: pull the first bookmaker's markets for a game (MVP just shows one
// book; expand to a comparison table across bookmakers later).
export function primaryMarkets(game: Game) {
  const book = game.bookmakers[0];
  if (!book) return null;
  const byKey = Object.fromEntries(book.markets.map((m) => [m.key, m]));
  return {
    bookTitle: book.title,
    h2h: byKey["h2h"],
    spreads: byKey["spreads"],
    totals: byKey["totals"],
  };
}
