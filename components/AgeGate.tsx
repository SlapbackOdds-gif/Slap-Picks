"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sharpside_age_confirmed";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    try {
      const confirmed = window.localStorage.getItem(STORAGE_KEY);
      if (!confirmed) setVisible(true);
    } catch {
      // localStorage unavailable (private browsing etc.) — fail open rather
      // than blocking the page.
    }
  }, []);

  const confirm = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  const decline = () => {
    setBlocked(true);
  };

  if (blocked) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink p-6 text-center">
        <div>
          <p className="font-display text-xl font-bold text-white">
            This site is intended for visitors 21 and older.
          </p>
          <p className="mt-2 text-sm text-mist">
            Please come back once you meet the age requirement in your
            jurisdiction.
          </p>
        </div>
      </div>
    );
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6 backdrop-blur">
      <div className="card w-full max-w-sm p-6 text-center shadow-glow">
        <p className="font-display text-lg font-bold text-white">
          Are you 21 or older?
        </p>
        <p className="mt-2 text-sm text-mist">
          This site covers sports betting odds and analysis. You must be of
          legal betting age in your jurisdiction to continue.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            onClick={decline}
            className="flex-1 rounded-lg border border-line py-2 text-sm font-semibold text-mist transition hover:text-white"
          >
            No
          </button>
          <button
            onClick={confirm}
            className="flex-1 rounded-lg bg-edge py-2 text-sm font-bold text-ink transition hover:bg-edgedim"
          >
            Yes, I&apos;m 21+
          </button>
        </div>
      </div>
    </div>
  );
}
