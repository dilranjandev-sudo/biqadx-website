"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useAnimate } from "@/components/motion/useAnimate";
import { ValidityGate } from "./ValidityGate";

/**
 * "Why it works" — three full-bleed chapters, each a screen tall.
 *
 * This is the closing argument of the page, so it is the one section that gives
 * up the content grid entirely: edge to edge, no card, no rounded corner, no
 * hairline. Every other section on Home is held inside a frame of some kind, so
 * dropping the frame here is what marks these three as the conclusion rather than
 * three more rows.
 *
 * Each chapter holds its picture still while you scroll through it — the image
 * counter-travels against the page, so it reads as a held shot rather than
 * something sliding past. The copy rises in once as the chapter arrives.
 *
 * The section above it, "See it work", travels sideways on a rail. Holding still
 * and going deep here is the deliberate opposite — the page stops advancing and
 * starts arguing.
 *
 * Every motion is transform and opacity only, and every neutral state is the
 * finished state, so a chapter whose scrub never runs is a full-strength still
 * photograph with its copy on it, not a blank screen.
 */

const CHAPTERS = [
  {
    index: "01",
    kicker: "The science",
    title: "The cartridge is part of the instrument.",
    lead: "An engineered surface finer than a wavelength of light — doing the measurement, not decorating it.",
    href: "/metasurface-diagnostics",
    linkLabel: "Explore the science",
    img: "/images/metasurface-macro.png",
    alt: "Macro of a nanostructured surface showing structural colour shifting across the texture.",
  },
  {
    index: "02",
    kicker: "The trust",
    title: "A number appears only when it's valid.",
    lead: "Identity, seating and controls must all pass — otherwise the result is withheld.",
    href: "/quality-validation",
    linkLabel: "Quality & validation",
    img: "/images/why-validate.png",
    alt: "A card held in a precision fixture as a focused light probe scans along its reference edge during a self-check.",
  },
  {
    index: "03",
    kicker: "The mission",
    title: "For where diagnostic delay matters most.",
    lead: "Quality-gated measurement, engineered to move closer to the point of care.",
    href: "/impact",
    linkLabel: "Intended impact",
    img: "/images/impact-reach.png",
    alt: "A community health worker sitting with a family in a rural Indian setting at dusk.",
    position: "object-[center_35%]",
  },
];

const SPRING = { stiffness: 110, damping: 26, mass: 0.35 };

function Chapter({
  chapter,
  animate,
  right,
  top,
}: {
  chapter: (typeof CHAPTERS)[number];
  animate: boolean;
  right: boolean;
  top: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The picture moves against the page — roughly a fifth of the travel — so the
  // frame appears held while the chapter passes through it.
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["-11%", "11%"]),
    SPRING,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.12]),
    SPRING,
  );

  return (
    <div
      ref={ref}
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden"
    >
      <motion.div
        className="absolute inset-[-8%] will-change-transform"
        style={animate ? { y, scale } : { y: 0, scale: 1 }}
      >
        <Image
          src={chapter.img}
          alt={chapter.alt}
          fill
          sizes="100vw"
          className={`object-cover ${chapter.position ?? ""}`}
        />
      </motion.div>

      {/* The ground is anchored to the copy's own corner — bottom-left or
          top-right — as a pocket that clears well before the opposite side, so
          the far corner of the picture stays bright and fully visible. A light
          wash in from the copy's side backs the taller lines. The photography is
          already dark, so this is all the type needs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 78% at ${right ? "100%" : "0%"} ${
            top ? "0%" : "100%"
          }, rgba(11,14,20,0.56) 0%, rgba(11,14,20,0.24) 44%, rgba(11,14,20,0) 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(${
            right ? "270deg" : "90deg"
          }, rgba(11,14,20,0.38) 0%, rgba(11,14,20,0.15) 46%, rgba(11,14,20,0) 82%)`,
        }}
      />

      <div
        className={`absolute inset-x-0 flex px-4 sm:px-10 ${
          top ? "top-0 pt-28 sm:pt-32" : "bottom-0 pb-16 sm:pb-24"
        } ${right ? "justify-end" : "justify-start"}`}
      >
        {/* The copy enters through ScrollReveal, not through the scrub.
            Scrub-bound opacity was tried and reverted: it made the copy fade out
            again as the chapter left, which looked right, but it also meant the
            text sat at opacity 0 in every state where the scrub never ran. A
            reveal fires once, holds its visible end state, and has a timeout
            backstop — so the worst case here is a still frame with legible copy
            on it, never an empty screen. */}
        <ScrollReveal
          variant="up"
          className="max-w-md [text-shadow:0_1px_3px_rgba(11,14,20,0.95),0_0_2px_rgba(11,14,20,0.85),0_2px_22px_rgba(11,14,20,0.5)]"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal">
              {chapter.index} / 03
            </span>
            <span aria-hidden="true" className="h-px w-10 bg-signal/30" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal">
              {chapter.kicker}
            </span>
          </div>

          <h3 className="mt-5 font-display text-[1.7rem] font-bold leading-[1.06] tracking-tightest text-signal sm:text-[2.5rem]">
            {chapter.title}
          </h3>
          <p className="mt-4 font-body text-sm leading-relaxed text-signal/85 sm:text-base">
            {chapter.lead}
          </p>

          <Link
            href={chapter.href}
            className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
          >
            {chapter.linkLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}

export function Journey() {
  const animate = useAnimate();

  return (
    <section className="bg-void">
      <Container className="pb-14 pt-20 sm:pb-16 sm:pt-28">
        <ScrollReveal>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            Why it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-[2.5rem]">
            Science, trust, and reach.
          </h2>
        </ScrollReveal>
      </Container>

      {/* Full-bleed from here — deliberately outside the content grid. */}
      {/* The middle chapter is set top-right, the outer two bottom-left, so the
          three are not one repeated composition down the page. */}
      {CHAPTERS.map((c, i) => (
        <Chapter
          key={c.index}
          chapter={c}
          animate={animate}
          right={i % 2 === 1}
          top={i % 2 === 1}
        />
      ))}

      {/* The gate itself, stated once beneath all three — the section's conclusion. */}
      <Container className="pb-4 pt-20 sm:pt-28">
        <ValidityGate />
      </Container>
    </section>
  );
}
