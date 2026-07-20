"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { motionDisabled } from "@/lib/motion";

/**
 * Scroll reveal that can never leave content invisible.
 *
 * The failure this exists to prevent: if the hidden starting state is rendered on
 * the server, anything that stops the animation from running — reduced motion, a
 * `?static=1` load, JS failing, a throttled IntersectionObserver — leaves the
 * element hidden forever. Framer's `initial` cannot express "hide only if I will
 * definitely be able to un-hide you", because the server has no way to know.
 *
 * So the order is inverted:
 *   1. Server and first paint render the element in its natural, visible state.
 *   2. `useLayoutEffect` (client only, before paint, so there is no flash) arms
 *      the hidden state — but only when motion is actually permitted.
 *   3. An IntersectionObserver plays it back in. `animation-fill-mode: both`
 *      holds the visible end state.
 *   4. Anything already on screen when armed plays immediately rather than
 *      waiting for an observer callback, and a timeout releases anything the
 *      observer never reports.
 *
 * Every path that skips a step ends with the content visible.
 */
export function ScrollReveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /**
   * "up" fades and lifts, "mask" rises out of an overflow-hidden parent, "wipe"
   * uncovers left to right like a scan passing over the frame.
   */
  variant?: "up" | "mask" | "wipe";
  /** Seconds. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;
    el.classList.add("rv-armed");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;

    let done = false;
    const play = () => {
      if (done) return;
      done = true;
      el.classList.add("rv-in");
    };

    // Already on screen? Play now — do not wait to be scrolled into.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) play();

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    // Backstop: never let a missed callback strand the content off screen.
    const t = window.setTimeout(play, 3000);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`rv rv-${variant} ${className}`.trim()}
      style={delay ? ({ "--rv-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
