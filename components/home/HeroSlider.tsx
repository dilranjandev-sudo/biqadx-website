"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { motionDisabled } from "@/lib/motion";

type CtaLink = { label: string; href: string };
type Slide = { src: string; alt: string };

/**
 * Hero slider — a full-bleed auto-advancing image carousel with a short
 * description and borderless actions anchored bottom-left. Pauses on hover;
 * under reduced-motion / ?static=1 it holds the first slide (dots still work).
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
  const n = slides.length;

  useEffect(() => {
    if (motionDisabled() || n <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5500);
    return () => clearInterval(id);
  }, [n]);

  return (
    <section
      className="relative isolate flex min-h-[82svh] items-end overflow-hidden bg-void"
      aria-roledescription="carousel"
      aria-label="BIQADX platform"
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: idx === i ? 1 : 0 }}
            aria-hidden={idx === i ? undefined : true}
          >
            <Image src={s.src} alt={idx === i ? s.alt : ""} fill priority={idx === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.45) 0%, rgba(11,14,20,0.08) 34%, rgba(11,14,20,0.9) 86%, rgba(11,14,20,1) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.78) 0%, rgba(11,14,20,0.1) 55%, transparent 100%)",
        }}
      />

      <Container className="relative pb-14 pt-32 sm:pb-20">
        <div className="max-w-xl">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            {eyebrow}
          </p>
          <p className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-signal sm:text-2xl">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-7">
            <Link
              href={primary.href}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal underline decoration-signal/50 underline-offset-4 transition-colors hover:decoration-signal"
            >
              {primary.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal/70 transition-colors hover:text-signal"
            >
              {secondary.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
