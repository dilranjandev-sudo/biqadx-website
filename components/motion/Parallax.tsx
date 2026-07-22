"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motionDisabled } from "@/lib/motion";

/**
 * Scroll-linked motion for images, run by one shared loop.
 *
 * ## Why this is not Framer, and not CSS either
 *
 * It was six Framer `useScroll` components with twelve springs between them,
 * because Home renders six of these at once. Each carried its own observers and
 * its own animation loop, all recomputing on the same frames as the hero's
 * transforms, a sticky column, the GSAP scrub and Lenis. No single one was the
 * culprit; the sum was.
 *
 * The obvious replacement — `animation-timeline: view()` — is wrong here, and
 * silently so. A view timeline resolves against the nearest *scroll container*,
 * and `overflow: hidden` is a scroll container. Every one of these frames clips
 * its picture, and the picture fills the frame exactly, so inside that scrollport
 * the subject is permanently 100% visible: the timeline is created, reports a
 * `currentTime` of null, and no transform is ever applied. It fails as a
 * still image rather than as an error, which is the worst way to fail.
 *
 * So: one module-level registry, one scroll listener, one frame callback for the
 * whole page. Reads are batched ahead of writes so N frames cost one layout pass
 * rather than N, and anything off screen is skipped before it costs anything.
 */

type Entry = {
  frame: HTMLElement;
  inner: HTMLElement;
  amount: number;
  unit: "px" | "%";
  from: number;
  to: number;
};

const entries = new Set<Entry>();
let rafId = 0;
let bound = false;

function paint() {
  rafId = 0;
  const vh = window.innerHeight;

  // Read every rect first. Interleaving a read with a write forces a synchronous
  // reflow per element, which is exactly the cost this is meant to avoid.
  const reads: { e: Entry; top: number; h: number }[] = [];
  entries.forEach((e) => {
    const r = e.frame.getBoundingClientRect();
    reads.push({ e, top: r.top, h: r.height });
  });

  for (const { e, top, h } of reads) {
    // Nothing off screen is worth a transform.
    if (top > vh || top + h < 0) continue;
    // 0 as the frame enters from the bottom, 1 as it leaves past the top.
    const p = 1 - (top + h) / (vh + h);
    const y = e.amount - 2 * e.amount * p;
    // Scale runs from → to → from, peaking as the frame crosses the middle.
    const s = e.from + (e.to - e.from) * (1 - Math.abs(0.5 - p) * 2);
    e.inner.style.transform = `translateY(${y.toFixed(3)}${e.unit}) scale(${s.toFixed(4)})`;
  }
}

function schedule() {
  // Cancel-then-request rather than "skip if one is pending". Both coalesce to
  // one paint per frame, but the latch version dead-locks if a requested frame
  // is never delivered: `rafId` stays set, and every later scroll is discarded
  // as a duplicate. That is not hypothetical — it is exactly what happens in a
  // throttled or non-rendering context, and it fails silently, as a picture that
  // simply never moves.
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(paint);
}

function register(entry: Entry) {
  entries.add(entry);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();
  return () => {
    entries.delete(entry);
    entry.inner.style.transform = "";
    if (entries.size === 0 && bound) {
      bound = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}

function useParallax(
  frameRef: React.RefObject<HTMLElement | null>,
  innerRef: React.RefObject<HTMLElement | null>,
  opts: Omit<Entry, "frame" | "inner">,
) {
  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner || motionDisabled()) return;
    return register({ frame, inner, ...opts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.amount, opts.from, opts.to, opts.unit]);
}

/**
 * Vertical drift as the element crosses the viewport. `amount` is the travel in
 * px at each end (positive = starts low, ends high).
 */
export function Parallax({
  children,
  className,
  amount = 40,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useParallax(frameRef, innerRef, { amount, unit: "px", from: 1, to: 1 });

  return (
    <div ref={frameRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/**
 * Image that both drifts and slowly de-zooms as it crosses the viewport — the
 * frame stays put, the picture breathes inside it. Wrap a `fill` <Image>.
 *
 * `amount` is a percentage, so the scale must always leave at least that much
 * overflow on each side or a sliver of empty frame shows at the extremes.
 */
export function ParallaxFrame({
  children,
  className,
  amount = 8,
  from = 1.12,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical travel of the image inside its frame, in percent. */
  amount?: number;
  from?: number;
  to?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  useParallax(frameRef, innerRef, { amount, unit: "%", from, to });

  return (
    <div ref={frameRef} className={className}>
      {/* The starting transform is inline so the picture is already at its
          entry position on first paint, rather than snapping when the first
          scroll frame lands. */}
      <div
        ref={innerRef}
        className="absolute inset-0"
        style={{ transform: `translateY(${amount}%) scale(${from})` }}
      >
        {children}
      </div>
    </div>
  );
}
