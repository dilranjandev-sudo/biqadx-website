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
  description,
  primary,
  secondary,
  slides,
}: {
  eyebrow: string;
  description: string;
  primary: CtaLink;
  secondary: CtaLink;
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

      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.45) 0%, rgba(11,14,20,0.08) 34%, rgba(11,14,20,0.9) 86%, rgba(11,14,20,1) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.78) 0%, rgba(11,14,20,0.1) 55%, transparent 100%)",
        }}
      />
      {/* Scroll-away dim — the hero settles into the section below it */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-void"
        style={animate ? { opacity: scrim } : { opacity: 0 }}
      />

      <Container className="relative pb-14 pt-32 sm:pb-20">
        <motion.div
          className="max-w-xl"
          style={animate ? { y: copyY, opacity: copyOpacity } : { y: 0, opacity: 1 }}
        >
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            {eyebrow}
          </p>
          <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-signal sm:text-2xl">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-7">
            <Link
              href={primary.href}
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal underline decoration-signal/50 underline-offset-4 transition-colors hover:decoration-signal"
            >
              {primary.label}
              <Arrow />
            </Link>
            <Link
              href={secondary.href}
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal/75 transition-colors hover:text-signal"
            >
              {secondary.label}
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
