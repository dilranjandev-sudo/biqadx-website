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
 *      observer never reports — cancelled as soon as the observer proves it is
 *      working, so it can never pre-empt a reveal further down a long page.
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
   * uncovers left to right like a scan passing over the frame, "draw" strokes an
   * SVG diagram on as if it were being drafted.
   */
  variant?: "up" | "mask" | "wipe" | "draw";
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

    // What gets observed is not always the element itself.
    //
    // The `mask` variant arms by translating the element a full 110% down, out
    // of a parent that clips it — that is how the wipe works. But an
    // IntersectionObserver intersects against every clipping ancestor, so an
    // element deliberately pushed outside its own `overflow: hidden` parent
    // reports `isIntersecting: false` for as long as it stays armed. It can
    // never become visible on its own: the thing that would trigger the reveal
    // is hidden *by* the reveal.
    //
    // So the mask variant is observed through its parent, which stays in normal
    // layout, is exactly the size of the line, and is never clipped away.
    const target = (variant === "mask" ? el.parentElement : el) ?? el;

    // Already on screen? Play now — do not wait to be scrolled into.
    const r = target.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) play();

    // Backstop: never let a missed callback strand the content off screen. It is
    // cancelled the instant the observer proves it works — see below.
    const t = window.setTimeout(play, 3000);

    const io = new IntersectionObserver(
      (entries) => {
        // An observer delivers an initial entry for everything it observes, so
        // any callback at all proves it is working and the blind timer is no
        // longer needed.
        //
        // Without this, the timer fired three seconds after mount regardless of
        // where the element was. On a short page that is invisible; on Home,
        // where the validity gate sits below the hero, three showcase sections
        // and three journey chapters, nobody reaches it inside three seconds —
        // so the reveal played to an empty screen and the section was already
        // finished by the time it was scrolled to. The same component looked
        // animated on /udos and static on Home purely because of page length.
        window.clearTimeout(t);
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(target);

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
