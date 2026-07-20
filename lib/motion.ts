// Central switch for continuous/scroll-driven motion. Returns true when motion
// should be suppressed: either the user prefers reduced motion, or a `?static=1`
// query param is present (used for screenshot/QA of a stable frame, and to
// preview the reduced-motion fallback). Client-side only.
export function motionDisabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    const params = new URLSearchParams(window.location.search);
    if (params.get("static") === "1") return true;
  } catch {
    // no-op
  }
  return false;
}
