import Link from "next/link";
import { getUpcomingGames, isLiveDataMode } from "@/lib/oddsApi";
import SectionHeading from "@/components/SectionHeading";
import DataModeBanner from "@/components/DataModeBanner";
import MatchupsBoard from "@/components/MatchupsBoard";
import { POSTS } from "@/lib/posts";

// This is the "Matchups" tab and the homepage at the same time — the site
// opens straight into the live board rather than a generic landing page.
export default async function HomePage() {
  const games = await getUpcomingGames();
  const liveMode = isLiveDataMode();

  return (
    <div>
      {/* Slim hero — matchups are the point, so this stays short */}
      <section className="border-b border-line bg-grid-fade">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center md:py-14">
          <span className="badge border border-line text-mist">
            Placeholder brand · swap anytime
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
            Today&apos;s <span className="text-gradient">matchups</span>,
            odds, and analysis.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mist md:text-base">
            Filter by sport below, then check the full picks record —
            every call graded in the open.
          </p>
        </div>
      </section>

      <DataModeBanner isLive={liveMode} />

      {/* Matchups — this IS the home tab */}
      <section id="matchups" className="mx-auto max-w-6xl px-5 py-10">
        <SectionHeading
          eyebrow="Live Board"
          title="Today's Matchups"
          description="Spreads, moneylines, and totals for the games we're covering. Full multi-book comparison is on the roadmap."
        />
        <MatchupsBoard games={games} />

        <div className="mt-8 flex justify-center">
          <Link
            href="/picks"
            className="rounded-lg border border-line px-6 py-3 text-sm font-bold text-white transition hover:border-edge"
          >
            See Our Picks Record →
          </Link>
        </div>
      </section>

      {/* Recent analysis */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <SectionHeading
            eyebrow="From the Blog"
            title="Latest Analysis"
            description="Full breakdowns from the blog, mirrored here for anyone who lands on the odds board first."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card card-hover flex flex-col p-5"
              >
                <span className="badge w-fit bg-volt/15 text-volt">
                  {post.tag}
                </span>
                <h3 className="mt-3 font-display text-base font-bold text-white">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-mist">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-mist">
                  {post.date} · {post.readMinutes} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
