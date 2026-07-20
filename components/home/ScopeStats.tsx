"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { getImage } from "@/lib/images";
import { motionDisabled } from "@/lib/motion";

/** A number that counts up from 0 to `to` once it scrolls into view. */
function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (motionDisabled()) {
      setVal(to);
      return;
    }
    let current = 0;
    const steps = 34;
    const id = window.setInterval(() => {
      current += 1;
      const p = current / steps;
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (current >= steps) {
        setVal(to);
        clearInterval(id);
      }
    }, 34);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
    </span>
  );
}

type Stat =
  | { kind: "num"; to: number; prefix?: string; label: string }
  | { kind: "text"; text: string; label: string };

const STATS: Stat[] = [
  { kind: "num", to: 14, label: "Core measurement methods" },
  { kind: "num", to: 200, prefix: "~", label: "Candidate assays in development" },
  { kind: "text", text: "On-card", label: "Intensity & wavelength references" },
];

/** Research scope as a cinematic image band with the three figures overlaid.
 *  Uses the "home-scope" image once generated; a tasteful placeholder until then. */
export function ScopeStats() {
  const asset = getImage("home-scope");

  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--border-dark)]"
        style={{ aspectRatio: "16 / 7" }}
      >
        {asset ? (
          <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-graphite">
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.16]"
              style={{ background: "var(--prism-gradient)" }}
            />
            <span className="absolute left-4 top-4 font-mono text-[0.54rem] uppercase tracking-[0.22em] text-signal/40">
              home-scope.png
            </span>
          </div>
        )}

        {/* Scrim for the overlaid figures */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.15) 0%, rgba(11,14,20,0.25) 45%, rgba(11,14,20,0.88) 100%)",
          }}
        />

        {/* Figures overlaid at the base of the image */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
          <div className="grid grid-cols-3 divide-x divide-signal/15">
            {STATS.map((s) => (
              <div key={s.label} className="px-3 text-center sm:px-6">
                <span className="block font-display text-2xl font-bold leading-none tracking-tightest text-signal sm:text-4xl">
                  {s.kind === "num" ? <CountUp to={s.to} prefix={s.prefix} /> : s.text}
                </span>
                <span className="mt-2 block font-mono text-[0.5rem] uppercase leading-relaxed tracking-[0.16em] text-signal/55 sm:text-[0.56rem]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 max-w-lg text-center font-body text-xs leading-relaxed text-signal/35">
        Research scope — the assay menu is not finalized, and every method and assay
        requires method-specific validation.
      </p>
    </div>
  );
}
