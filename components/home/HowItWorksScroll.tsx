"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

// Each step carries one plain sentence saying what is physically happening, and
// what is not. The titles alone read as a caption strip; a visitor who does not
// already know the platform could watch all five frames and still not know that
// step 4 measures the instrument rather than the sample, or that step 5 can end
// in nothing being shown. That is the part worth understanding, so it is stated.
const SLIDES = [
  {
    img: "/images/seq-1-sample.png",
    title: "Apply the sample.",
    body: "A small volume is placed on the card's prepared zone. Nothing is measured yet.",
    alt: "A gloved hand releasing a clear droplet from a pipette onto the micro-textured surface of a thin card resting on a dark steel bench, the analyzer out of focus behind.",
  },
  {
    img: "/images/seq-2-seat.png",
    title: "Seat the card.",
    body: "The card locks into a fixed geometry, and the analyzer reads its identity before anything else begins.",
    alt: "A gloved hand sliding the card into the open loading port of the off-white benchtop analyzer, its touchscreen dark.",
  },
  {
    img: "/images/seq-3-interrogate.png",
    title: "The surface is interrogated.",
    body: "Controlled light meets the engineered surface. The sample changes what that surface does to the light.",
    alt: "The seated card under an optical objective ringed by an illuminated white collar, a narrow band of cyan-violet structural colour raised across the card's textured face.",
  },
  {
    img: "/images/seq-4-validate.png",
    title: "The system checks itself.",
    body: "The instrument measures its own references — seating, calibration, internal controls. Not the sample.",
    alt: "The objective stepped across to the card's reference row and registration cutout, a tight pool of cool light beneath it.",
  },
  {
    // NOTE: the supplied seq-5-result.png cannot ship — it shows a full interface
    // with a green tick, "PASS", and an invented inspection summary (uniformity,
    // contrast, defect count). Result screens and fabricated data are both barred
    // (CLAUDE.md, image rules). Standing in with the enclosed-machine shot, which
    // carries the same "nothing is released" reading and stays on-message.
    // Replace once a compliant step-5 frame exists — screen dark, nothing shown.
    img: "/images/omega-exterior.png",
    title: "Released only when valid.",
    body: "If any check fails, no number is shown. The measurement is repeated, flagged or rejected.",
    alt: "The analyzer standing closed and quiet on a dark bench, its touchscreen dark and nothing displayed.",
  },
];

// ~72vh of scroll per frame. Slower than a screen per step on purpose: each
// frame now carries a sentence to read, and at 64vh the copy arrived and left
// faster than it could be finished.
const HEIGHT_VH = 360;

/**
 * "See it work" — the five frames sit on a rail and travel sideways as the
 * section is scrubbed, rather than cross-fading in place.
 *
 * The mechanic is the content: this is a sequence of five discrete steps, so the
 * frames advance past a fixed viewing position the way the process advances. A
 * cross-fade said "here is another picture of the same thing"; lateral travel
 * says "step three, then step four". The neighbouring frames stay half in shot,
 * dimmed and set back, so you can always see where you are in the run without a
 * progress bar — you can see the step you came from and the one you are going to.
 *
 * The step index and title ride on their own frame rather than sitting in a fixed
 * caption slot, so the label arrives with its picture instead of swapping under a
 * stationary one.
 *
 * Stage aspect is 3:2 because the sequence photography is 3:2 — filling the
 * viewport with `object-cover` cropped the pipette, the card and the objective,
 * which are the subject of every frame, out of shot. Panel width is sized off the
 * viewport height so it runs as wide as it can at that aspect and still fit.
 *
 * GSAP scrub. Reduced motion / ?static=1 falls back to a plain vertical stack —
 * all five frames, no pinning, no rail.
 */
export function HowItWorksScroll() {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stRef = useRef<any>(null);
  const lenis = useLenis();

  // Stage one: load GSAP, then switch the markup over to the rail. Nothing is
  // measured here — the rail does not exist in the DOM yet.
  useEffect(() => {
    if (motionDisabled()) return;
    let killed = false;
    (async () => {
      const [{ default: gsap }, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (killed) return;
      const ScrollTrigger =
        (stMod as { ScrollTrigger?: unknown }).ScrollTrigger ??
        (stMod as { default?: unknown }).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.registerPlugin(ScrollTrigger as any);
      stRef.current = ScrollTrigger;
      setAnimated(true);
    })();
    return () => {
      killed = true;
    };
  }, []);

  // Stage two: wire the scrub, once the rail is actually on the page.
  //
  // These were one effect, and it was wrong: it called setAnimated(true) and
  // then measured in the same tick. React had not re-rendered yet, so trackRef
  // was still null, `place()` bailed out, and `step` stayed 0 — the rail never
  // moved, and only the first frame or two were ever reachable. The trigger was
  // also bound to the fallback element, which then unmounted. Splitting on
  // `animated` guarantees the refs point at the rail before anything is read.
  useEffect(() => {
    if (!animated) return;
    const ScrollTrigger = stRef.current;
    const root = outerRef.current;
    if (!ScrollTrigger || !root) return;

    root.style.height = `${HEIGHT_VH}vh`;
    const n = SLIDES.length;

    // Rail geometry is measured, not expressed in CSS. An earlier version put
    // the travel in a calc() that multiplied a custom property by a length —
    // `calc(var(--pos) * (var(--panel) + var(--gap)))` — and Chrome resolved it
    // 56px short at exactly --pos:1 while every other value was correct, so
    // frame 2 alone never centred. Measuring removes the whole class of problem.
    let step = 0;
    let originX = 0;
    let pos = 0;

    const draw = () => {
      const track = trackRef.current;
      // Self-heal rather than sit still. A zero step means the measurement has
      // not landed yet — that is exactly the state the old single-effect version
      // got permanently stuck in, so recover from it here instead of silently
      // rendering a rail that never moves.
      if (track && step === 0) measure();
      if (track && step > 0)
        track.style.transform = `translate3d(${(originX - pos * step).toFixed(2)}px, 0, 0)`;
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const signed = Math.max(-1, Math.min(1, pos - i));
        const d = Math.abs(signed);
        // Off-centre frames sit back and go quiet — present, not competing.
        el.style.opacity = String(1 - 0.62 * d);
        el.style.transform = `scale(${(1 - 0.07 * d).toFixed(4)})`;
        // The picture drifts against the rail inside its own frame, so the strip
        // has depth instead of reading as five flat cards sliding as one sheet.
        // The 1.1 scale is what keeps the drift from exposing a frame edge.
        const img = el.querySelector("img");
        if (img)
          img.style.transform = `translate3d(${(signed * -4).toFixed(2)}%, 0, 0) scale(1.1)`;
      });
    };

    const measure = () => {
      const track = trackRef.current;
      const first = panelRefs.current[0];
      if (!track || !first) return;
      const panelW = first.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      step = panelW + gap;
      originX = ((track.parentElement?.clientWidth ?? 0) - panelW) / 2;
      draw();
    };

    measure();

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      // Re-measure whenever ScrollTrigger recalculates — covers late-loading
      // images and font swaps changing the panel size after first paint.
      onRefresh: measure,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onUpdate: (self: any) => {
        pos = (self.progress as number) * (n - 1);
        draw();
      },
    });

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const onLenis = () => (ScrollTrigger as { update: () => void }).update();
    if (lenis) lenis.on("scroll", onLenis);

    (ScrollTrigger as { refresh: () => void }).refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      if (lenis) lenis.off("scroll", onLenis);
      trigger.kill();
    };
  }, [animated, lenis]);

  if (!animated) {
    // No pinning, no rail: the same five frames read top to bottom.
    return (
      <section ref={outerRef} className="bg-void" aria-label="How it works">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            See it work
          </p>
          <div className="mt-10 space-y-8">
            {SLIDES.map((s, i) => (
              <Frame key={s.img} slide={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      className="relative bg-void"
      style={{ height: `${HEIGHT_VH}vh` }}
      aria-label="How it works"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Section label and the run length, at the top of the pinned stage.
            "Step N of 5" is a plain statement of where you are, not a bar — the
            reader gets the count without a graphic tracking their scroll. */}
        <div className="absolute inset-x-4 top-8 z-10 flex items-baseline justify-between sm:inset-x-6 sm:top-10">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            See it work
          </p>
          {/* /60, not /45 — the dimmer tone falls to 3.99:1 on Void, under AA. */}
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
            Five steps
          </p>
        </div>

        {/* The rail. CSS owns panel width and gap; JS measures them and owns the
            travel, writing a single translate3d on this one element. */}
        {/* Panel width is set per breakpoint, not by one expression. The
            height-based cap (`72svh * 1.5`) is what keeps a 3:2 frame on screen
            on a wide display, but on a portrait phone it never binds and the
            width term wins — at 74vw that left a 278×185 frame, too small to
            read the pipette or the objective. Phones give the frame nearly the
            full width instead and drop the peek at the neighbours. */}
        <div
          ref={trackRef}
          className="flex gap-4 [--panel:92vw] will-change-transform sm:gap-8 sm:[--panel:min(84vw,calc(80svh*1.5),1480px)]"
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.img}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="shrink-0 will-change-transform"
              // No CSS transition here: the scrub already writes opacity every
              // frame, so a transition would only add lag between the scroll
              // position and the dimming that is supposed to track it.
              style={{
                width: "var(--panel)",
                opacity: i === 0 ? 1 : 0.38,
                transform: i === 0 ? "scale(1)" : "scale(0.93)",
              }}
            >
              <Frame slide={s} index={i} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * One frame of the sequence, with its own step index and title set on the
 * photograph. Used by both the rail and the reduced-motion stack, so the two
 * paths cannot drift apart.
 */
function Frame({
  slide,
  index,
  priority = false,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
  priority?: boolean;
}) {
  // Odd-numbered frames carry their caption at the top, even ones at the bottom,
  // so the strip is not five identical bottom-caption cards. Each frame's scrim
  // follows its caption to that edge, and stays light — the photography is dark,
  // so the ground only has to lift the type off it, not black the picture out.
  const top = index % 2 === 1;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite/30"
      style={{ aspectRatio: "3 / 2" }}
    >
      <Image
        src={slide.img}
        alt={slide.alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 1480px, 92vw"
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 h-3/5 sm:h-1/2 ${
          top ? "top-0" : "bottom-0"
        }`}
        style={{
          background: `linear-gradient(${
            top ? "0deg" : "180deg"
          }, rgba(11,14,20,0) 0%, rgba(11,14,20,0.36) 42%, rgba(11,14,20,0.58) 74%, rgba(11,14,20,0.72) 100%)`,
        }}
      />

      <div
        className={`absolute inset-x-0 p-4 sm:p-10 ${top ? "top-0" : "bottom-0"}`}
        // A crisp near-outline shadow carries the legibility so the scrim can
        // stay light — the text reads clean on the dark photo, not on a wash.
        style={{
          textShadow:
            "0 1px 3px rgba(11,14,20,0.95), 0 0 2px rgba(11,14,20,0.85), 0 2px 20px rgba(11,14,20,0.5)",
        }}
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal">
            {String(index + 1).padStart(2, "0")} / 05
          </span>
          <span aria-hidden="true" className="h-px w-10 bg-signal/30" />
        </div>
        {/* Sized down hard on phones — the frame is only ~230px tall there, so a
            24px title would have run past the top of its own scrim. */}
        <h2 className="mt-2 max-w-2xl font-display text-base font-bold leading-[1.08] tracking-tightest text-signal sm:mt-3 sm:text-[2.25rem]">
          {slide.title}
        </h2>
        <p className="mt-1.5 max-w-md font-body text-xs leading-relaxed text-signal/80 sm:mt-4 sm:text-[0.95rem]">
          {slide.body}
        </p>
      </div>
    </div>
  );
}
