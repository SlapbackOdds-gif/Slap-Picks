import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Matchups" },
  { href: "/picks", label: "Picks" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-edge/10 text-edge">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            SHARP<span className="text-edge">SIDE</span>
          </span>
          <span className="badge ml-1 border border-line text-mist">
            placeholder name
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1 text-sm font-medium text-mist transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/picks"
          className="rounded-lg bg-edge px-4 py-2 text-sm font-bold text-ink transition hover:bg-edgedim"
        >
          Get Picks
        </Link>
      </div>
    </header>
  );
}
