"use client";

import { useEffect } from "react";
import { motionDisabled } from "@/lib/motion";
import { registerScrollJob, scheduleScrollFrame } from "./scrollLoop";

/**
 * The site read as its own surface.
 *
 * A metasurface returns a different colour depending on the angle the light meets
 * it at. Here the angle is scroll: one value, `--diffract`, is written on the
 * document from the scroll position, and every prism accent on the page — the
 * small rules beside section numbers, the hero seam — keys its hue off it. Scroll
 * the page and the structural colour travels across all of them together, as if
 * the whole sheet were being tilted under a light. It is the company's own thesis
 * happening rather than being stated, and it is the one scroll behaviour the site
 * did not already have.
 *
 * Costs almost nothing: one job on the shared scroll loop, writing a single
 * custom property on `:root`. No layout is read, nothing re-renders. With reduced
 * motion or `?static=1` it never registers, and `--diffract` keeps its CSS
 * default — every accent simply shows the prism gradient at a fixed, pleasant
 * angle. Never blank, exactly like every other effect here.
 */

// Scroll distance, in px, over which the hue sweeps out and back once. A triangle
// ramp (0→1→0) rather than a saw, so the colour never snaps at a wrap point.
const CYCLE = 820;

export function DiffractionDriver() {
  useEffect(() => {
    if (motionDisabled()) return;
    const root = document.documentElement;
    let last = -1;

    const unsubscribe = registerScrollJob({
      measure() {
        const p = window.scrollY / CYCLE;
        // triangle wave: ramps 0→1→0 with no discontinuity to snap on
        return 1 - Math.abs((p % 2) - 1);
      },
      apply(v: number) {
        if (Math.abs(v - last) < 0.002) return;
        last = v;
        root.style.setProperty("--diffract", v.toFixed(4));
      },
    });
    scheduleScrollFrame();

    return () => {
      unsubscribe();
      root.style.removeProperty("--diffract");
    };
  }, []);

  return null;
}
