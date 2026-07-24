"use client";

import { useEffect, useRef } from "react";
import { motionDisabled } from "@/lib/motion";
import { registerScrollJob } from "@/components/motion/scrollLoop";

/**
 * A thin prism bar across the very top that fills as the article is read.
 *
 * It reuses the site's one shared scroll loop rather than adding a listener, and
 * it is a prism accent, so its hue also travels with `--diffract` — the reading
 * position and the diffraction system are the same gesture. Decorative and
 * `aria-hidden`; with reduced motion or no JS it simply shows full, never a stuck
 * empty bar.
 */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    if (motionDisabled()) {
      el.style.transform = "scaleX(1)";
      return;
    }
    const unsubscribe = registerScrollJob({
      measure() {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        return h <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / h));
      },
      apply(p: number) {
        el.style.transform = `scaleX(${p.toFixed(4)})`;
      },
    });
    return unsubscribe;
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        ref={bar}
        className="diffract-rule-signal h-full w-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
