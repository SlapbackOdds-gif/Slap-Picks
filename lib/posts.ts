export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // display string
  tag: string;
  readMinutes: number;
  body: string[]; // paragraphs — swap for real CMS/MDX content later
}

// Placeholder posts — replace with your real blog content, or wire this file
// up to a headless CMS later without touching any page components.
export const POSTS: Post[] = [
  {
    slug: "how-to-read-a-point-spread",
    title: "How to Read a Point Spread (Without Googling It Mid-Bet)",
    excerpt:
      "Spreads look intimidating until you see the pattern. Here's the plain-English breakdown we wish someone had given us on day one.",
    date: "Sep 20, 2026",
    tag: "Betting 101",
    readMinutes: 4,
    body: [
      "A point spread exists to level the playing field between a favorite and an underdog, and once you see the mechanics, the number stops being scary.",
      "The negative number next to a team is how many points they need to win by for a spread bet to cash. The positive number next to the other team is how much cushion they get.",
      "The vig — that extra -110 you see next to most spread bets — is how the book makes money regardless of outcome. Understanding it is step one to betting smarter, not just more.",
    ],
  },
  {
    slug: "week-4-nfl-matchups-to-watch",
    title: "Week 4 NFL Matchups Worth Betting Attention",
    excerpt:
      "Three games this week where the line movement is telling a different story than the public money.",
    date: "Sep 18, 2026",
    tag: "NFL",
    readMinutes: 6,
    body: [
      "Line movement is one of the most underrated signals in sports betting — when a number moves against the betting public, it's usually sharp money pushing back.",
      "This week we're watching three specific matchups where that divergence is showing up clearly, and breaking down what it might mean for how the games play out.",
      "As always: this is analysis, not a guarantee. Treat it as one more data point in your own research.",
    ],
  },
  {
    slug: "bankroll-management-basics",
    title: "Bankroll Management: The Boring Skill That Actually Wins",
    excerpt:
      "The single biggest difference between long-term winners and everyone else has nothing to do with picking games.",
    date: "Sep 12, 2026",
    tag: "Best Practices",
    readMinutes: 5,
    body: [
      "Most bettors lose not because their picks are bad, but because their bet sizing is undisciplined — chasing losses, doubling up, betting outside their means.",
      "A simple unit system (betting 1-2% of your bankroll per play) keeps a bad week from becoming a bad month.",
      "We'll be building this out into a full guide, but the short version: decide your unit size before the season starts, and don't touch it based on emotion.",
    ],
  },
];
