"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useAnimate } from "@/components/motion/useAnimate";
import { ValidityGate } from "./ValidityGate";

/**
 * "Why it works" — three wide cinematic bands, each uncovered by a scan wipe as
 * it enters, with the picture drifting inside the held frame as it passes.
 *
 * The layout is deliberately unlike its neighbours: the platform section above
 * uses alternating 4:3 rows and the research section uses a sticky split, so
 * repeating either shape here flattened the back half of the page into one
 * rhythm. Wide 21:9 bands with the text set beneath read as chapters rather than
 * as more product rows.
 *
 * The wipe is the section's own idea rather than decoration — this is a company
 * whose instrument reads a surface by scanning light across it, so the image is
 * revealed the same way. It runs through ScrollReveal, so a frame that never
 * animates is simply visible rather than stuck hidden.
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
  },
];

const SPRING = { stiffness: 120, damping: 28, mass: 0.4 };

/**
 * Wide band with continuous scroll motion: the picture drifts vertically inside
 * the held frame, and settles from 1.18 to 1.0 as the band reaches the middle of
 * the viewport, then eases back out. The scale is what gives the section depth —
 * each chapter appears to come forward as you reach it and recede as you leave.
 *
 * Both are transform-only and never affect opacity or clipping, so a band whose
 * motion never runs is simply a still photograph rather than a missing one.
 */
function Band({
  src,
  alt,
  animate,
  position,
}: {
  src: string;
  alt: string;
  animate: boolean;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["9%", "-9%"]),
    SPRING,
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.0, 1.18]),
    SPRING,
  );

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite/30 sm:aspect-[21/9]"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={animate ? { y, scale } : { y: 0, scale: 1 }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 1100px, 100vw"
          className={`object-cover ${position ?? ""}`}
        />
      </motion.div>
    </div>
  );
}

/**
 * The chapter's text, drifting at a slower rate than its photograph above it.
 * The difference between the two rates is the effect: the band and its caption
 * separate slightly as they pass, which reads as depth rather than as a slide.
 */
function ChapterText({
  children,
  animate,
}: {
  children: React.ReactNode;
  animate: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [26, -26]), SPRING);

  return (
    <div ref={ref}>
      <motion.div style={animate ? { y } : { y: 0 }}>{children}</motion.div>
    </div>
  );
}

export function Journey() {
  const animate = useAnimate();

  return (
    <section className="bg-void">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            Why it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
            Science, trust, and reach.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
          {CHAPTERS.map((c) => (
            <article key={c.index} className="group">
              <ScrollReveal variant="wipe">
                <Band
                  src={c.img}
                  alt={c.alt}
                  animate={animate}
                  position={
                    c.index === "03" ? "object-[center_35%]" : undefined
                  }
                />
              </ScrollReveal>

              <ChapterText animate={animate}>
                <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className="font-display text-xl font-bold leading-none tracking-tightest text-signal/30"
                      >
                        {c.index}
                      </span>
                      <span className="h-px w-10 bg-signal/20" />
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
                        {c.kicker}
                      </span>
                    </div>
                    <h3 className="mt-4 max-w-2xl font-display text-2xl font-bold leading-[1.1] tracking-tightest text-signal sm:text-[2rem]">
                      {c.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="max-w-md font-body leading-relaxed text-signal/75">
                      {c.lead}
                    </p>
                    <Link
                      href={c.href}
                      className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal/85 transition-colors hover:text-signal"
                    >
                      {c.linkLabel}
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
                  </div>
                </div>
              </ChapterText>
            </article>
          ))}
        </div>

        {/* The gate itself, stated once beneath all three — the section's conclusion. */}
        <div className="mt-16 sm:mt-20">
          <ValidityGate />
        </div>
      </Container>
    </section>
  );
}
