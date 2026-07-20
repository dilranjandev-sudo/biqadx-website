"use client";

import { useState } from "react";
import { motionDisabled } from "@/lib/motion";

/**
 * True when motion is permitted — i.e. neither `prefers-reduced-motion` nor the
 * `?static=1` QA flag is in play. `motionDisabled()` covers both.
 *
 * Resolved *synchronously* on the first render via a lazy initialiser, not in an
 * effect. That matters: Framer only reads a `motion` element's `initial` prop at
 * mount, so a flag that arrives one render late leaves every reveal with no
 * starting offset and the animation silently never plays.
 *
 * On the server `motionDisabled()` returns false, so this returns true there.
 * Keep `initial` independent of this value — set the offset unconditionally and
 * gate only the transition duration — so server and client markup always agree.
 */
export function useAnimate() {
  const [animate] = useState(() => !motionDisabled());
  return animate;
}

/** Transition duration that collapses to an instant cut when motion is off. */
export function dur(animate: boolean, seconds: number) {
  return animate ? seconds : 0;
}

/**
 * Starting state for a scroll reveal, or `false` when motion is off.
 *
 * Never hide content unconditionally: a reveal that starts hidden only becomes
 * visible if its trigger actually fires, so any environment that does not run the
 * animation — reduced motion, `?static=1`, a throttled IntersectionObserver —
 * leaves the content permanently invisible. Passing `false` opts the element out
 * of the animation entirely and renders it in its natural, visible state.
 */
export function from<T extends object>(animate: boolean, state: T): T | false {
  return animate ? state : false;
}
