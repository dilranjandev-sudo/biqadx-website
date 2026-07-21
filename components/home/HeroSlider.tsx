"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { motionDisabled } from "@/lib/motion";

type CtaLink = { label: string; href: string };
type Slide = { src: string; alt: string };

const DURATION_MS = 6500;

/**
 * Hero — a full-bleed auto-advancing image stage. Each slide cross-fades in and
 * holds a slow Ken Burns push so the frame is never static; the whole stage
 * drifts and dims as the page scrolls past it, so the hero recedes rather than
 * cutting away. Segmented ticks double as the timer and as manual controls.
 * Under reduced-motion / ?static=1 it holds the first slide with no drift.
 */
export function HeroSlider({
  eyebrow,
  headline,
  description,
  primary,
  slides,
}: {
  eyebrow: string;
  headline: string;
  description: string;
  primary: CtaLink;
  slides: Slide[];
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);
  const n = slides.length;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // motionDisabled() reads window — resolve it after mount so SSR markup matches.
  useEffect(() => setStill(motionDisabled()), []);

  useEffect(() => {
    if (still || paused || n <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), DURATION_MS);
    return () => clearInterval(id);
  }, [n, paused, still]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scrim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const animate = !still && !reduce;

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-void"
      aria-roledescription="carousel"
      aria-label="BIQADX platform"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <motion.div className="absolute inset-0 -z-10" style={animate ? { y } : { y: 0 }}>
        {slides.map((s, idx) => {
          const on = idx === i;
          return (
            <div
              key={s.src}
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-out"
              style={{ opacity: on ? 1 : 0 }}
              aria-hidden={on ? undefined : true}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={
                  animate
                    ? {
                        transform: on ? "scale(1.1)" : "scale(1.02)",
                        transition: `transform ${DURATION_MS + 1600}ms linear`,
                      }
                    : undefined
                }
              >
                <Image
                  src={s.src}
                  alt={on ? s.alt : ""}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Legibility scrims, kept to the text side only. The copy sits lower-left,
          so the ground is a corner pocket anchored there plus a light wash in
          from the left — both clear before mid-frame, so the right side of the
          picture stays bright and fully visible, the way a hero image should
          read. The image is already dark, so this is all the type needs. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 90% at 0% 100%, rgba(11,14,20,0.55) 0%, rgba(11,14,20,0.22) 42%, rgba(11,14,20,0) 68%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.48) 0%, rgba(11,14,20,0.14) 34%, transparent 56%)",
        }}
      />
      {/* Scroll-away dim — the hero settles into the section below it */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-void"
        style={animate ? { opacity: scrim } : { opacity: 0 }}
      />

      <Container className="relative pb-16 pt-32 sm:pb-24">
        {/* A little more air on the left on wide screens — the copy sits in from
            the container edge the way the reference hero does, instead of hard
            against it. */}
        {/* A soft shadow on the copy keeps every line legible on the brightest
            slide without a heavier scrim darkening the whole frame — the scrims
            stay light, the shadow does the work at the glyph edge. */}
        <motion.div
          className="max-w-2xl lg:pl-6 xl:pl-10"
          style={{
            textShadow:
              "0 1px 3px rgba(11,14,20,0.95), 0 0 2px rgba(11,14,20,0.85), 0 2px 24px rgba(11,14,20,0.55)",
            ...(animate ? { y: copyY, opacity: copyOpacity } : { y: 0, opacity: 1 }),
          }}
        >
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal">
            {eyebrow}
          </p>

          {/* The headline carries the page — short, at display scale, in the
              caps register globals.css gives every h1. One punchy line replaces
              the paragraph that used to sit here, which read as a wall rather
              than a statement. */}
          <h1 className="mt-5 max-w-xl font-display text-[2.6rem] font-bold leading-[0.98] tracking-tightest text-signal sm:text-6xl lg:text-[4.25rem]">
            {headline}
          </h1>

          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-signal/80 sm:text-lg">
            {description}
          </p>
          {/* One call to action only — Contact already lives in the nav, so a
              second hero link just repeated it. */}
          <div className="mt-9">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal underline decoration-signal/50 underline-offset-4 transition-colors hover:decoration-signal"
            >
              {primary.label}
              <Arrow />
            </Link>
          </div>

        </motion.div>
      </Container>

    </section>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
      <path
        d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
