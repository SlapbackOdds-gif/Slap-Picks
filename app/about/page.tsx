import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <SectionHeading
        eyebrow="About"
        title="Why This Site Exists"
        description="A hub for the analysis, so the blog and videos have somewhere to send people."
      />

      <div className="space-y-4 text-[15px] leading-relaxed text-mist">
        <p>
          This started as a blog and a video series breaking down matchups
          and betting strategy. This site is the home base — live odds,
          matchup analysis, a public picks record, and the educational
          content that makes betting less of a guessing game.
        </p>
        <p>
          Every pick published here gets tracked, win or lose. No deleting
          bad calls, no cherry-picked screenshots. If you&apos;re going to
          trust an analysis, you should be able to see the receipts.
        </p>
        <p>
          This site is still early — odds coverage, sportsbook comparisons,
          and more in-depth tools are actively being built out.
        </p>
      </div>

      <div className="card mt-10 p-5">
        <p className="text-sm font-bold text-white">A quick disclosure</p>
        <p className="mt-2 text-sm text-mist">
          Some links on this site are affiliate links to sportsbooks — if you
          sign up through one, we may earn a commission at no extra cost to
          you. It never changes the picks or analysis we publish.
        </p>
      </div>
    </div>
  );
}
