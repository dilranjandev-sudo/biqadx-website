"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { motionDisabled } from "@/lib/motion";
import { registerScrollJob, scheduleScrollFrame } from "./scrollLoop";

/**
 * A drawing pinned to the viewport while the page scrolls past it, scrubbing one
 * number from 0 to 1.
 *
 * The plumbing is identical for every scene of this kind and none of it is
 * obvious — the pin only exists above `lg`, the drawing must be the server's
 * finished state so it survives with no JS, the scroll job has to read before it
 * writes, and the whole thing has to hand the drawing back untouched on unmount.
 * Getting that wrong fails silently, as a picture that never moves. It is written
 * once here.
 *
 * A scene supplies `setup`, which runs once with the element holding the drawing
 * and returns the function that applies a progress value. Everything that scene
 * needs to find in the DOM is looked up in that closure, once, rather than on
 * every frame.
 */
export function PinnedScene({
  title,
  intro,
  children,
  setup,
  readout,
  /** Height of the scroll track, in viewports. */
  trackVh = 400,
  /** Scroll spent held at 0 before anything moves, and at 1 after it finishes.
   *  Starting on the first pixel reads as a glitch, and finishing on the last
   *  means the final state is never actually seen. */
  lead = 0.1,
  tail = 0.16,
  /** The surface the scene sits on. Paper by default: a line drawing is ink on
   *  paper, which is what an engineering drawing is and what makes it read as a
   *  real document rather than a lightbox. Void is for the home page, which is
   *  dark throughout. */
  tone = "ink",
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  /** Returns the per-frame apply function, or null to leave the drawing alone. */
  setup: (host: HTMLElement) => ((t: number) => void) | null;
  /** Optional mono readout beside the drawing, e.g. a stage counter. */
  readout?: { total: number; unit: string; value: (t: number) => number };
  trackVh?: number;
  lead?: number;
  tail?: number;
  tone?: "ink" | "signal";
}) {
  const dark = tone === "signal";
  const trackRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const host = hostRef.current;
    if (!track || !host) return;

    // The rendered HTML is already the finished state, so "no motion" is not a
    // fallback that has to be built — it is what happens if this never writes.
    if (motionDisabled()) return;

    const apply = setup(host);
    if (!apply) return;

    // Pinning only happens at lg and up, so the scene only drives anything there.
    const wide = window.matchMedia("(min-width: 1024px)");
    let last = -1;
    let lastCount = -1;

    const unsubscribe = registerScrollJob({
      measure() {
        if (!wide.matches) return 1;
        const r = track.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        if (travel <= 0) return 1;
        const p = Math.max(0, Math.min(1, -r.top / travel));
        return Math.max(0, Math.min(1, (p - lead) / (1 - lead - tail)));
      },
      apply(t: number) {
        // Nothing here is composited, so a redundant write is a real repaint.
        if (Math.abs(t - last) < 0.001) return;
        last = t;

        apply(t);

        if (readout) {
          const n = readout.value(t);
          if (n !== lastCount) {
            lastCount = n;
            const el = countRef.current;
            if (el) el.textContent = String(n).padStart(2, "0");
          }
          const bar = barRef.current;
          if (bar) bar.style.transform = `scaleX(${t.toFixed(4)})`;
        }
      },
    });

    const onChange = () => scheduleScrollFrame();
    wide.addEventListener("change", onChange);
    return () => {
      wide.removeEventListener("change", onChange);
      unsubscribe();
      // Hand the drawing back in the state the server rendered it in.
      apply(1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={dark ? "bg-void" : "bg-paper"}>
      {/* The track is only tall — and only a scroll surface — where the scene
          actually runs. `motion-reduce` collapses it too, so a reader who asked
          for less motion does not get several screens of scrolling for nothing. */}
      <div
        ref={trackRef}
        className="motion-reduce:lg:!h-auto lg:h-[var(--track)]"
        style={{ ["--track" as string]: `${trackVh}vh` }}
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:block">
          <Container className="w-full py-16 sm:py-20 lg:py-0">
            {/* Copy beside the drawing rather than above it. Stacked, a heading
                and a figure of this size overflow the pinned viewport and the
                bottom of the drawing is cut off for the whole scene — invisible
                in the markup, obvious the moment it is measured. */}
            <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-4">
                <ScrollReveal>
                  <h2
                    className={`font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem] ${
                      dark ? "text-signal" : "text-ink"
                    }`}
                  >
                    {title}
                  </h2>
                  {intro ? (
                    <p
                      className={`mt-4 max-w-xl font-body text-sm leading-relaxed ${
                        dark ? "text-signal/85" : "text-ink/75"
                      }`}
                    >
                      {intro}
                    </p>
                  ) : null}
                </ScrollReveal>

                {/* Decorative: the drawing's <desc> already carries the whole
                    explanation, so this is hidden rather than announcing a number
                    that changes on every scroll frame. Only while pinned — in
                    ordinary flow the drawing arrives complete and a readout at
                    its final value beside it is furniture. */}
                {readout ? (
                  <div
                    aria-hidden="true"
                    className="mt-8 hidden items-center gap-4 lg:flex motion-reduce:lg:hidden"
                  >
                    <span
                      className={`font-mono text-[0.6rem] tracking-[0.16em] ${
                        dark ? "text-signal/70" : "text-ink/65"
                      }`}
                    >
                      <span ref={countRef}>
                        {String(readout.total).padStart(2, "0")}
                      </span>{" "}
                      / {String(readout.total).padStart(2, "0")} {readout.unit}
                    </span>
                    <span
                      className={`relative h-px flex-1 ${
                        dark ? "bg-signal/20" : "bg-ink/20"
                      }`}
                    >
                      <span
                        ref={barRef}
                        className={`absolute inset-0 origin-left ${
                          dark ? "bg-signal/70" : "bg-ink/70"
                        }`}
                      />
                    </span>
                  </div>
                ) : null}
              </div>

              <div ref={hostRef} className="mt-8 lg:col-span-8 lg:mt-0">
                {children}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
