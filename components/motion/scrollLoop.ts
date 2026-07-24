/**
 * One scroll listener and one animation frame for the whole page.
 *
 * This started inside Parallax, where six frames each carrying their own Framer
 * `useScroll` and springs were the reason the site stuttered while scrolling. The
 * fix was one shared loop; the fix stops working the moment a second feature adds
 * a second loop beside it. So the scheduler lives here and everything scroll-
 * driven registers with it.
 *
 * Jobs are split into `measure` and `apply` rather than one callback, and every
 * measure runs before any apply. Interleaving a read with a write forces a
 * synchronous reflow per element, which is precisely the cost this exists to
 * avoid — N jobs should cost one layout pass, not N.
 */

export type ScrollJob<M = unknown> = {
  /** Read the DOM. Must not write. */
  measure: () => M;
  /** Write the DOM. Must not read. */
  apply: (measured: M) => void;
};

const jobs = new Set<ScrollJob<never>>();
let rafId = 0;
let bound = false;

function paint() {
  rafId = 0;
  const staged: Array<[ScrollJob<never>, unknown]> = [];
  jobs.forEach((j) => staged.push([j, j.measure()]));
  for (const [j, m] of staged) j.apply(m as never);
}

export function scheduleScrollFrame() {
  // Cancel-then-request rather than "skip if one is pending". Both coalesce to
  // one paint per frame, but the latch version dead-locks if a requested frame is
  // never delivered: `rafId` stays set and every later scroll is discarded as a
  // duplicate. It fails silently, as motion that simply stops.
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(paint);
}

export function registerScrollJob<M>(job: ScrollJob<M>): () => void {
  const j = job as unknown as ScrollJob<never>;
  jobs.add(j);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", scheduleScrollFrame, { passive: true });
    window.addEventListener("resize", scheduleScrollFrame);
  }
  scheduleScrollFrame();

  return () => {
    jobs.delete(j);
    if (jobs.size === 0 && bound) {
      bound = false;
      window.removeEventListener("scroll", scheduleScrollFrame);
      window.removeEventListener("resize", scheduleScrollFrame);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}
