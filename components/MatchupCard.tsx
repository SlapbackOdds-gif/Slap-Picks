import { Game, formatOdds, primaryMarkets } from "@/lib/oddsApi";

function formatKickoff(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function OddsCell({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex-1 rounded-lg border border-line bg-ink/60 px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-mist">
        {label}
      </p>
      <p className="mt-0.5 font-display text-sm font-bold text-white">
        {value}
      </p>
      {sub && <p className="text-[10px] text-mist">{sub}</p>}
    </div>
  );
}

export default function MatchupCard({ game }: { game: Game }) {
  const markets = primaryMarkets(game);
  const away = markets?.h2h?.outcomes.find((o) => o.name === game.away_team);
  const home = markets?.h2h?.outcomes.find((o) => o.name === game.home_team);
  const spreadAway = markets?.spreads?.outcomes.find(
    (o) => o.name === game.away_team
  );
  const total = markets?.totals?.outcomes.find((o) => o.name === "Over");

  return (
    <div className="card card-hover p-5">
      <div className="flex items-center justify-between">
        <span className="badge bg-volt/15 text-volt">{game.sport_title}</span>
        <span className="text-xs font-medium text-mist">
          {formatKickoff(game.commence_time)}
        </span>
      </div>

      <div className="mt-4 space-y-1">
        <p className="font-display text-base font-bold text-white">
          {game.away_team}
        </p>
        <p className="text-xs text-mist">@</p>
        <p className="font-display text-base font-bold text-white">
          {game.home_team}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <OddsCell
          label="Spread"
          value={spreadAway ? `${spreadAway.point! > 0 ? "+" : ""}${spreadAway.point}` : "—"}
        />
        <OddsCell
          label="Moneyline"
          value={away ? formatOdds(away.price) : "—"}
          sub={home ? `Home ${formatOdds(home.price)}` : undefined}
        />
        <OddsCell
          label="Total"
          value={total ? `O/U ${total.point}` : "—"}
        />
      </div>

      {markets?.bookTitle && (
        <p className="mt-3 text-right text-[10px] uppercase tracking-wide text-mist">
          via {markets.bookTitle}
        </p>
      )}
    </div>
  );
}
