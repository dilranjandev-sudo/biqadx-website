"use client";

import { useState } from "react";

/**
 * One FAQ row — a clean, smoothly-animated disclosure.
 *
 * The answer expands with a grid-template-rows 0fr → 1fr transition rather than a
 * native <details>, which cannot animate its own open/close. The toggle is a
 * bordered +/× that rotates, so the interactive affordance is unmistakable.
 *
 * `tone` flips the palette: "light" for the ink-on-paper pages, "dark" for the
 * signal-on-image FAQ where the rows sit over the photograph.
 */
export function FaqItem({
  q,
  a,
  tone = "light",
}: {
  q: string;
  a: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";

  return (
    <div
      className={`border-b first:border-t ${
        dark ? "border-signal/15" : "border-ink/12"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span
          className={`font-display text-[1.05rem] font-bold leading-snug tracking-tight transition-colors sm:text-lg ${
            dark
              ? "text-signal group-hover:text-signal/70"
              : "text-ink group-hover:text-ink/60"
          }`}
          style={dark ? { textShadow: "0 1px 8px rgba(11,14,20,0.6)" } : undefined}
        >
          {q}
        </span>
        <span
          aria-hidden="true"
          className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
            dark
              ? "border-signal/25 text-signal/80 group-hover:border-signal/50 group-hover:text-signal"
              : "border-ink/20 text-ink/70 group-hover:border-ink/45 group-hover:text-ink"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className={`max-w-2xl pb-6 pr-2 font-body text-sm leading-relaxed sm:pr-10 sm:text-[0.95rem] ${
              dark ? "text-signal/80" : "text-ink/80"
            }`}
            style={dark ? { textShadow: "0 1px 8px rgba(11,14,20,0.6)" } : undefined}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
