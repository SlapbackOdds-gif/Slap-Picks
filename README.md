# SharpSide (placeholder name)

A sports betting content site — live odds, matchup analysis, blog, and a
public picks record. Built with Next.js + Tailwind, deployable for free on
Vercel.

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs on sample
matchup data out of the box — no API key required to see it working.

## 2. Switch on live odds (optional, still free)

1. Get a free API key at [the-odds-api.com](https://the-odds-api.com) (500
   free credits/month, no credit card required).
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Paste your key in:
   ```
   ODDS_API_KEY=your_key_here
   ```
4. Restart `npm run dev`. The homepage will now pull real lines. A banner
   telling you you're on sample data disappears automatically once this is
   set.

Sports pulled are set in `lib/oddsApi.ts` (`SPORT_KEYS`) — add or remove
leagues there. Full list of sport keys:
https://the-odds-api.com/sports-odds-data/sports-apis.html

## 3. Switch on the Picks database + /admin dashboard (optional, still free)

Without this, `/picks` shows sample data and there's no way to add real
picks without editing code. With it, you get a free Postgres database and a
password-protected `/admin` page to add, grade, and delete picks from any
browser — no code edits, no redeploys.

1. Create a free project at [supabase.com](https://supabase.com).
2. In the project's SQL Editor, run:
   ```sql
   create table picks (
     id uuid primary key default gen_random_uuid(),
     created_at timestamp with time zone default now(),
     pick_date date not null,
     matchup text not null,
     sport text not null,
     pick text not null,
     odds text not null,
     result text not null default 'pending', -- 'win', 'loss', 'push', or 'pending'
     note text
   );

   alter table picks enable row level security;

   create policy "Public can read picks"
     on picks for select
     using (true);
   ```
3. In `.env.local`, fill in (from Project Settings → API Keys):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # keep this secret
   ADMIN_PASSWORD=choose_a_real_password
   ```
4. Restart `npm run dev`, go to `/admin`, log in, and add a pick. It should
   immediately show up on `/picks`.

**Security note:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe to expose — it's
read-only, enforced by the SQL policy above (no insert/update/delete policy
exists for it). `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD` are secrets
— never commit them or share them with anyone, including in chat. The
`lib/supabaseAdmin.ts` file that uses the service role key is marked
`server-only`, so the build fails loudly if it's ever accidentally imported
into a client component.

## 4. Deploy for free on Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), sign up free, click "Add New
   Project," and import the repo.
3. In the project's Environment Variables settings, add every variable from
   your `.env.local` (`ODDS_API_KEY`, and the four Supabase/admin variables
   above if you set those up) — or skip any of them to launch on sample data.
4. Click Deploy. You'll get a free `yourproject.vercel.app` URL immediately.
5. Once you buy a domain, add it under the project's Settings → Domains —
   Vercel's free tier includes custom domain hosting.

## What's already built

- **Homepage** — hero, live/sample odds board (spread, moneyline, total per
  game), latest blog posts
- **Picks page** (`/picks`) — public win/loss record, graded pick history
  (live from Supabase once configured, sample data otherwise)
- **Admin dashboard** (`/admin`) — password-gated page to add, grade, and
  delete picks without editing code (requires Supabase setup, see below)
- **Blog** (`/blog`) — listing + individual post pages
- **About** (`/about`) — site purpose + affiliate disclosure
- **Age gate** — 21+ confirmation on first visit (required by most
  sportsbook affiliate programs)
- **Responsible gambling footer** — 1-800-GAMBLER line + disclosures on
  every page

## Where content lives (edit these, no design changes needed)

| What | File |
|---|---|
| Blog posts | `lib/posts.ts` |
| Picks record (sample fallback only — real picks are managed at `/admin`) | `lib/picks.ts` |
| Sample odds (used until API key is set) | `lib/mockOdds.ts` |
| Sports pulled from the odds API | `lib/oddsApi.ts` |
| Site name / branding | `components/Header.tsx`, `components/Footer.tsx`, `app/layout.tsx` (metadata) |
| Colors / vibe | `tailwind.config.ts` |

## Renaming from the placeholder

Search the project for `SharpSide` / `SHARPSIDE` (Header, Footer, layout
metadata) and swap in your real name. The "placeholder name" badge in the
header can be deleted from `components/Header.tsx` once you've renamed it.

## Not built yet (roadmap)

- Multi-bookmaker odds comparison (currently shows one book per game)
- Live in-play odds / line movement history
- CMS or MDX for blog posts instead of the `lib/posts.ts` array
- Mobile app (this site is fully mobile-responsive as a starting point)
