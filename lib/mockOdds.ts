// Types roughly matching The Odds API (https://the-odds-api.com) response shape,
// so swapping mock data for the live API later requires no changes downstream.

export interface Outcome {
  name: string; // team name, or "Over"/"Under"
  price: number; // American odds, e.g. -110, +150
  point?: number; // spread or total line
}

export interface Market {
  key: "h2h" | "spreads" | "totals";
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  markets: Market[];
}

export interface Game {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string; // ISO string
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

const inHours = (h: number) =>
  new Date(Date.now() + h * 60 * 60 * 1000).toISOString();

// Placeholder matchups so the site looks alive before an API key is wired up.
// Replace by setting ODDS_API_KEY in .env.local — see lib/oddsApi.ts
export const MOCK_GAMES: Game[] = [
  {
    id: "mock-nfl-1",
    sport_key: "americanfootball_nfl",
    sport_title: "NFL",
    commence_time: inHours(5),
    home_team: "Kansas City Chiefs",
    away_team: "Buffalo Bills",
    bookmakers: [
      {
        key: "draftkings",
        title: "DraftKings",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Buffalo Bills", price: 145 },
              { name: "Kansas City Chiefs", price: -170 },
            ],
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Buffalo Bills", price: -110, point: 3.5 },
              { name: "Kansas City Chiefs", price: -110, point: -3.5 },
            ],
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -108, point: 47.5 },
              { name: "Under", price: -112, point: 47.5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mock-nba-1",
    sport_key: "basketball_nba",
    sport_title: "NBA",
    commence_time: inHours(8),
    home_team: "Boston Celtics",
    away_team: "Denver Nuggets",
    bookmakers: [
      {
        key: "fanduel",
        title: "FanDuel",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Denver Nuggets", price: 120 },
              { name: "Boston Celtics", price: -142 },
            ],
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Denver Nuggets", price: -110, point: 2.5 },
              { name: "Boston Celtics", price: -110, point: -2.5 },
            ],
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -110, point: 224.5 },
              { name: "Under", price: -110, point: 224.5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mock-mlb-1",
    sport_key: "baseball_mlb",
    sport_title: "MLB",
    commence_time: inHours(3),
    home_team: "Los Angeles Dodgers",
    away_team: "Atlanta Braves",
    bookmakers: [
      {
        key: "betmgm",
        title: "BetMGM",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Atlanta Braves", price: 132 },
              { name: "Los Angeles Dodgers", price: -155 },
            ],
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -105, point: 8.5 },
              { name: "Under", price: -115, point: 8.5 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "mock-nfl-2",
    sport_key: "americanfootball_nfl",
    sport_title: "NFL",
    commence_time: inHours(28),
    home_team: "San Francisco 49ers",
    away_team: "Dallas Cowboys",
    bookmakers: [
      {
        key: "draftkings",
        title: "DraftKings",
        markets: [
          {
            key: "h2h",
            outcomes: [
              { name: "Dallas Cowboys", price: 160 },
              { name: "San Francisco 49ers", price: -190 },
            ],
          },
          {
            key: "spreads",
            outcomes: [
              { name: "Dallas Cowboys", price: -108, point: 4.5 },
              { name: "San Francisco 49ers", price: -112, point: -4.5 },
            ],
          },
          {
            key: "totals",
            outcomes: [
              { name: "Over", price: -110, point: 45.5 },
              { name: "Under", price: -110, point: 45.5 },
            ],
          },
        ],
      },
    ],
  },
];
