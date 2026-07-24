"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motionDisabled } from "@/lib/motion";
import {
  registerScrollJob,
  scheduleScrollFrame,
} from "@/components/motion/scrollLoop";

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
 * So: one module-level registry, and one entry on the page's single shared scroll
 * loop. Reads are batched ahead of writes so N frames cost one layout pass rather
 * than N, and anything off screen is skipped before it costs anything. The loop
 * itself is in `scrollLoop`, because the whole point is undone if the next
 * scroll-driven feature starts a second one.
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

// Every parallax frame on the page is one job on the shared loop, not one job
// each: they all read the same viewport height and all want their rects taken in
// a single batch.
const job = {
  measure() {
    const vh = window.innerHeight;
    const reads: { e: Entry; top: number; h: number }[] = [];
    entries.forEach((e) => {
      const r = e.frame.getBoundingClientRect();
      reads.push({ e, top: r.top, h: r.height });
    });
    return { vh, reads };
  },
  apply({ vh, reads }: { vh: number; reads: { e: Entry; top: number; h: number }[] }) {
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
  },
};

let unsubscribe: (() => void) | null = null;

function register(entry: Entry) {
  entries.add(entry);
  if (!unsubscribe) unsubscribe = registerScrollJob(job);
  scheduleScrollFrame();
  return () => {
    entries.delete(entry);
    entry.inner.style.transform = "";
    if (entries.size === 0 && unsubscribe) {
      unsubscribe();
      unsubscribe = null;
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
