"use client";

import { useState } from "react";
import { announcement } from "@/lib/copy";

/** Optional dismissible announcement bar (brief §4). */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative border-b border-[var(--border-dark)] bg-graphite">
      <div className="mx-auto flex max-w-content items-center justify-center px-10 py-2">
        <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-signal/70">
          {announcement}
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-signal/60 transition hover:text-signal"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
