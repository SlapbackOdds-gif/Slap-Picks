import { isAdminAuthed } from "@/lib/adminAuth";
import { getPicks } from "@/lib/picks";
import { login, logout, addPick, updatePickResult, deletePick } from "./actions";

const RESULT_OPTIONS = ["pending", "win", "loss", "push"] as const;

function ErrorBanner({ error }: { error?: string }) {
  if (!error) return null;

  const message =
    error === "wrong_password"
      ? "Incorrect password."
      : error === "not_configured"
      ? "Supabase admin credentials aren't set up on the server yet (SUPABASE_SERVICE_ROLE_KEY / ADMIN_PASSWORD)."
      : decodeURIComponent(error);

  return (
    <div className="mb-6 rounded-lg border border-warn/30 bg-warn/10 px-4 py-3 text-sm text-warn">
      {message}
    </div>
  );
}

function LoginScreen({ error }: { error?: string }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-edge">
        Admin
      </p>
      <h1 className="mt-2 font-display text-2xl font-bold text-white">
        Manage Picks
      </h1>
      <p className="mt-2 text-sm text-mist">
        Enter the admin password to add and grade picks.
      </p>

      <ErrorBanner error={error} />

      <form action={login} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-mist">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white focus:border-edge focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-edge py-2.5 text-sm font-bold text-ink transition hover:bg-edgedim"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const authed = await isAdminAuthed();

  if (!authed) {
    return <LoginScreen error={error} />;
  }

  const picks = await getPicks();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-edge">
            Admin
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-white">
            Manage Picks
          </h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-mist transition hover:text-white"
          >
            Log Out
          </button>
        </form>
      </div>

      <ErrorBanner error={error} />

      {/* Add a new pick */}
      <div className="card mb-10 p-5">
        <h2 className="mb-4 font-display text-sm font-bold text-white">
          Add a New Pick
        </h2>
        <form action={addPick} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Date
            </label>
            <input
              type="date"
              name="pick_date"
              required
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white focus:border-edge focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Sport
            </label>
            <input
              type="text"
              name="sport"
              placeholder="NFL"
              required
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-edge focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Matchup
            </label>
            <input
              type="text"
              name="matchup"
              placeholder="Bills @ Jets"
              required
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-edge focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Pick
            </label>
            <input
              type="text"
              name="pick"
              placeholder="Bills -2.5"
              required
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-edge focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Odds
            </label>
            <input
              type="text"
              name="odds"
              placeholder="-110"
              required
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-edge focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Result
            </label>
            <select
              name="result"
              defaultValue="pending"
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white focus:border-edge focus:outline-none"
            >
              {RESULT_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-mist">
              Note (optional)
            </label>
            <input
              type="text"
              name="note"
              placeholder="Why this pick, or what happened"
              className="mt-1 w-full rounded-lg border border-line bg-ink px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-edge focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-edge py-2.5 text-sm font-bold text-ink transition hover:bg-edgedim sm:w-auto sm:px-6"
            >
              Add Pick
            </button>
          </div>
        </form>
      </div>

      {/* Existing picks — grade or delete */}
      <h2 className="mb-4 font-display text-sm font-bold text-white">
        All Picks ({picks.length})
      </h2>
      <div className="card divide-y divide-line">
        {picks.length === 0 && (
          <p className="p-5 text-sm text-mist">
            No picks yet — add your first one above.
          </p>
        )}
        {picks.map((pick) => (
          <div
            key={pick.id}
            className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs text-mist">
                {pick.date} · {pick.sport} · {pick.matchup}
              </p>
              <p className="font-display text-sm font-bold text-white">
                {pick.pick}{" "}
                <span className="font-body font-normal text-mist">
                  ({pick.odds})
                </span>
              </p>
              {pick.note && (
                <p className="mt-1 text-xs text-mist">{pick.note}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <form
                action={updatePickResult.bind(null, pick.id)}
                className="flex items-center gap-2"
              >
                <select
                  name="result"
                  defaultValue={pick.result}
                  className="rounded-lg border border-line bg-ink px-2 py-1.5 text-xs font-semibold text-white focus:border-edge focus:outline-none"
                >
                  {RESULT_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-lg border border-edge/40 px-2 py-1.5 text-xs font-semibold text-edge transition hover:bg-edge/10"
                >
                  Update
                </button>
              </form>
              <form action={deletePick.bind(null, pick.id)}>
                <button
                  type="submit"
                  className="rounded-lg border border-line px-2 py-1.5 text-xs font-semibold text-mist transition hover:border-warn hover:text-warn"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
