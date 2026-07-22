"use client";

import { useEffect, type RefObject } from "react";
import { motionDisabled } from "@/lib/motion";

/**
 * Drives a slow loop over one diagram, and owns everything that has to be right
 * about it so the drawings themselves only have to say what changes.
 *
 * The rules it enforces, all of which the diagrams depend on:
 *
 * - **The drawing is complete without it.** The server render is the rest state;
 *   this only ever attaches afterwards. Reduced motion, `?static=1`, a failed
 *   chunk load — any of them leaves a finished drawing rather than a broken one.
 * - **anime.js is loaded on demand**, so it stays out of every bundle but the
 *   page that actually animates, the same treatment the home page gives GSAP.
 * - **It pauses off screen.** A perpetual animation-frame loop running under a
 *   reader who has scrolled past it is pure waste, and there are nine of these.
 * - **It waits for the draw-on.** Every diagram strokes itself in on reveal;
 *   starting the loop underneath that reads as two animations fighting.
 *
 * `onFrame` receives a single normalised 0→1 value. Deriving anything more
 * elaborate than that — phases, per-element staggers — belongs in the drawing,
 * where the meaning is.
 */
export function useDiagramLoop(
  ref: RefObject<SVGGElement | null>,
  onFrame: (k: number) => void,
  {
    duration = 3600,
    delay = 1800,
    alternate = true,
  }: { duration?: number; delay?: number; alternate?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;

    let stop: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const { animate } = await import("animejs");
      if (cancelled) return;

      const state = { k: 0 };
      const anim = animate(state, {
        k: 1,
        duration,
        delay,
        ease: "inOutSine",
        loop: true,
        alternate,
        onUpdate: () => onFrame(state.k),
      });

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) anim.play();
          else anim.pause();
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el);

      stop = () => {
        io.disconnect();
        anim.pause();
      };
    })();

    return () => {
      cancelled = true;
      stop?.();
    };
    // The callback is intentionally not a dependency: these loops are set up
    // once for the life of the drawing, and re-running the effect on every
    // render would restart the animation on each parent update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
