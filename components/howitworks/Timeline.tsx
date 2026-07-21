"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useAnimate } from "@/components/motion/useAnimate";
import { motionDisabled } from "@/lib/motion";

/**
 * "From sample entry to a validity state" as a vertical timeline.
 *
 * The eight process steps run down a single line; a prism line fills from the top
 * as the section is scrolled, and each numbered node fills in — hollow to solid —
 * as the scroll reaches it, so the reader's progress down the page tracks the
 * platform's progress through the run. Steps reveal as they enter. Reduced motion
 * lands on the finished state: full line, all nodes solid, everything visible.
 */

const STEPS = [
  {
    t: "Cartridge identity is read",
    d: "Family, lot and authorized profile are identified; incompatible or expired cards are rejected.",
  },
  {
    t: "The cartridge is seated to datums",
    d: "Mechanical references establish the optical, thermal and electrical relationship.",
  },
  {
    t: "Sample enters a fluidic path",
    d: "Validated transport delivers sample and reagents to defined chambers.",
  },
  {
    t: "Assay chemistry or interaction occurs",
    d: "Absorption, fluorescence, binding, coagulation, electrochemistry or imaging.",
  },
  {
    t: "The zone transforms the signal",
    d: "A structured surface, cavity, electrode or aperture produces the measurable response.",
  },
  {
    t: "OMEGA-PRO interrogates the zone",
    d: "The authorized illumination, motion, thermal or electrical profile acquires the raw signal.",
  },
  {
    t: "References and controls are evaluated",
    d: "Intensity, wavelength, dark, electrical and assay controls are checked; corrections are bounded and recorded.",
  },
  {
    t: "A validity state is assigned",
    d: "The output is released, flagged, repeated or invalidated — with raw data preserved for audit.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const animate = useAnimate();
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  // A node fills once it reaches the middle of the viewport; all earlier nodes
  // stay filled. Reduced motion / no-JS: every node is already filled.
  useEffect(() => {
    if (motionDisabled()) {
      setActive(STEPS.length - 1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive((a) => Math.max(a, idx));
          }
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    nodeRefs.current.forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={ref} className="relative">
      {/* Track and the scroll-linked fill, centred on the node column. */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 bg-ink/15"
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-5 top-6 w-px -translate-x-1/2 origin-top"
        style={{
          height: "calc(100% - 3rem)",
          scaleY: animate ? fill : 1,
          background: "var(--prism-gradient)",
        }}
      />

      {STEPS.map((s, i) => {
        const on = i <= active;
        return (
          <li
            key={s.t}
            data-idx={i}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className="pb-11 last:pb-0"
          >
            <ScrollReveal variant="up" className="flex gap-6 sm:gap-8">
              <div className="relative z-10 shrink-0">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[0.7rem] tracking-[0.1em] transition-colors duration-500 ${
                    on
                      ? "border-ink bg-ink text-paper"
                      : "border-ink/20 bg-paper text-ink/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="pt-1.5">
                <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink sm:text-xl">
                  {s.t}
                </h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ink/70 sm:text-[0.95rem]">
                  {s.d}
                </p>
              </div>
            </ScrollReveal>
          </li>
        );
      })}
    </ol>
  );
}
