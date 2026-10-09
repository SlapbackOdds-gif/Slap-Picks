import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel/60">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold">
              SHARP<span className="text-edge">SIDE</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-mist">
              Odds, matchups, analysis, and a public picks record — built to
              back up the blog and video breakdowns, not replace them.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-mist">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="text-mist hover:text-white">Today&apos;s Matchups</Link></li>
              <li><Link href="/picks" className="text-mist hover:text-white">Picks Record</Link></li>
              <li><Link href="/blog" className="text-mist hover:text-white">Blog</Link></li>
              <li><Link href="/about" className="text-mist hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-mist">
              Play Responsibly
            </p>
            <p className="mt-3 text-sm text-mist">
              This site is for sports betting news, analysis, and
              entertainment. It does not accept wagers. Must be 21+ and
              located where sports betting is legal. Gambling problem? Call{" "}
              <span className="font-semibold text-white">1-800-GAMBLER</span>.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} SharpSide. Placeholder brand — swap freely.</p>
          <p>
            Contains affiliate links. We may earn a commission if you sign up
            through a link on this site, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
