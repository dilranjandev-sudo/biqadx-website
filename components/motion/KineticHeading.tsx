"use client";

import { useEffect, useRef } from "react";
import { motionDisabled } from "@/lib/motion";

// The cuts loaded for --font-display in app/layout.tsx. Adding a step here
// without adding the weight there gives a silent fallback to the nearest cut.
const WEIGHTS = [400, 500, 600, 700];

/**
 * A heading whose letters answer to the pointer, the way the surface this
 * company builds answers to the angle light arrives at.
 *
 * The well-known version morphs a variable font's weight axis under the cursor.
 * There is no axis to morph here: Google serves IBM Plex Sans Condensed as
 * static cuts only, and changing the site's headline typeface to get one is not
 * a decision this component should make. So the ramp is built from four static
 * cuts (see WEIGHTS), which the layout loads for exactly this purpose.
 *
 * Weight is only part of it. Lift and brightness carry the rest, and together
 * they say the thing this company is actually about: letters nearest the pointer
 * rise, thicken and catch the light, and settle back as it moves on — a surface
 * whose response depends on where the light is coming from.
 *
 * ## What it refuses to do
 *
 * - **It never hides the heading.** The text is rendered normally on the server;
 *   this only ever adds transforms afterwards. No JS, no effect, whole heading.
 * - **It is pointer-only.** Guarded on `(pointer: fine)` — a touch device has no
 *   hover, and a heading that responds to taps would be a trap, not an effect.
 * - **It respects reduced motion**, via the same `motionDisabled()` the rest of
 *   the site uses.
 * - **It does not touch the accessible text.** Screen readers get the whole
 *   string from `aria-label`; the per-character spans are hidden from them, so
 *   nothing is ever announced letter by letter.
 */
export function KineticHeading({
  text,
  className = "",
  // How far a letter dims when the pointer is nowhere near it. The default suits
  // copy on solid Void, where contrast is fixed and generous. Over a photograph
  // the floor has to be raised — the scrims there were tuned for type at full
  // strength, and dimming on top of that eats the margin they bought.
  dimFloor = 0.72,
  lift = 7,
}: {
  text: string;
  className?: string;
  dimFloor?: number;
  lift?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const letters = Array.from(
      el.querySelectorAll<HTMLElement>("[data-kt]"),
    );
    if (!letters.length) return;

    // Geometry is measured once per pointer pass rather than per frame: reading
    // a rect for every letter on every mousemove is the expensive way to do
    // this, and the letters do not move in layout.
    //
    // Each letter's width is then *locked* to what it measures at the resting
    // weight. Without that, changing weight changes advance width, every letter
    // after it shifts, and a two-line headline can re-wrap to three and back as
    // the pointer moves across it. The rest weight is the heaviest one used, so
    // locking there only ever leaves a little air around a lighter glyph — it
    // never clips one.
    let boxes: { x: number; y: number; el: HTMLElement }[] = [];
    const measure = () => {
      // Strictly read-then-write. Reading a rect straight after writing a style
      // forces a synchronous reflow, and doing that once per letter turned a
      // single measurement into ninety of them.
      for (const l of letters) l.style.width = "";
      const rects = letters.map((l) => l.getBoundingClientRect());
      boxes = letters.map((l, i) => ({
        x: rects[i].left + rects[i].width / 2,
        y: rects[i].top + rects[i].height / 2,
        el: l,
      }));
      letters.forEach((l, i) => {
        l.style.width = `${rects[i].width.toFixed(2)}px`;
      });
    };

    let frame = 0;
    let px = 0;
    let py = 0;

    const paint = () => {
      frame = 0;
      // Radius in pixels over which a letter still feels the pointer. Generous,
      // so the effect reads as a soft wave rather than a spotlight on one glyph.
      const R = 190;
      for (const b of boxes) {
        const d = Math.hypot(b.x - px, b.y - py);
        const k = Math.max(0, 1 - d / R);
        // eased so the falloff is soft at the edges and firm in the middle
        const e = k * k * (3 - 2 * k);
        b.el.style.transform = `translateY(${(-lift * e).toFixed(2)}px)`;
        b.el.style.opacity = (dimFloor + (1 - dimFloor) * e).toFixed(3);
        // Four static cuts, because there is no weight axis to interpolate.
        // The letter under the pointer sits at the heading's resting weight and
        // the others step down away from it, so the effect adds emphasis where
        // you are pointing rather than taking it away everywhere else.
        b.el.style.fontWeight = String(WEIGHTS[Math.round(e * (WEIGHTS.length - 1))]);
      }
    };

    const onMove = (ev: PointerEvent) => {
      px = ev.clientX;
      py = ev.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      for (const l of letters) {
        l.style.transform = "";
        l.style.opacity = "";
        l.style.fontWeight = "";
        l.style.willChange = "";
      }
    };

    // Layers are created on the way in and released on the way out, so a
    // heading nobody is pointing at costs the compositor nothing.
    const onEnter = () => {
      for (const l of letters) l.style.willChange = "transform, opacity";
      measure();
    };

    measure();
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, [text, dimFloor, lift]);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {text.split(/(\s+)/).map((chunk, wi) =>
        /^\s+$/.test(chunk) ? (
          // Spaces stay plain text so words still break normally.
          <span key={`s${wi}`}> </span>
        ) : (
          // Each word is kept unbreakable so a letter never wraps alone.
          <span key={`w${wi}`} className="inline-block whitespace-nowrap">
            {Array.from(chunk).map((ch, ci) => (
              <span
                key={ci}
                data-kt
                className="inline-block"
                style={{ transition: "transform 260ms ease-out, opacity 260ms ease-out" }}
              >
                {ch}
              </span>
            ))}
          </span>
        ),
      )}
    </span>
  );
}
