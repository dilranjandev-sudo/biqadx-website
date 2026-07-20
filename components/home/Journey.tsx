"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ValidityShot } from "./ValidityShot";

function Chapter({
  index,
  kicker,
  title,
  lead,
  linkHref,
  linkLabel,
  flip,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  lead: string;
  linkHref: string;
  linkLabel: string;
  flip?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [34, -34]);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Visual — dominant, framed, with a soft prism edge-glow */}
      <div className={flip ? "lg:order-2 lg:col-span-7" : "lg:order-1 lg:col-span-7"}>
        <motion.div style={{ y: reduce ? 0 : y }} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 -top-8 -z-10 h-28 rounded-full opacity-20 blur-3xl"
            style={{ background: "var(--prism-gradient)" }}
          />
          {children}
        </motion.div>
      </div>

      {/* Text — minimal; index numeral sits inline as a header accent (no overlap) */}
      <div className={flip ? "lg:order-1 lg:col-span-5" : "lg:order-2 lg:col-span-5"}>
        <Reveal>
          <div>
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden="true"
                className="select-none font-display text-5xl font-bold leading-none tracking-tightest sm:text-6xl"
                style={{ color: "rgba(232, 236, 239, 0.22)" }}
              >
                {index}
              </span>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/45">
                {kicker}
              </p>
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold leading-[1.08] tracking-tightest text-signal sm:text-[2.5rem]">
              {title}
            </h3>
            <p className="mt-4 max-w-sm font-body leading-relaxed text-signal/65">{lead}</p>
            <Link
              href={linkHref}
              className="mt-7 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal/85 transition-colors hover:text-signal"
            >
              {linkLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
        </Reveal>
      </div>
    </div>
  );
}

const frame =
  "overflow-hidden rounded-2xl border border-[var(--border-dark)] bg-graphite/30";

/** The science → the trust → the mission — one idea, three premium image-led
 *  chapters. Text pared to a line each; visuals carry the weight. */
export function Journey() {
  return (
    <section className="bg-void">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/45">
            Why it works
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
            Science, trust, and reach.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-36">
          <Chapter
            index="01"
            kicker="The science"
            title="The cartridge is part of the instrument."
            lead="An engineered surface finer than a wavelength of light — doing the measurement, not decorating it."
            linkHref="/metasurface-diagnostics"
            linkLabel="Explore the science"
          >
            <figure className={frame}>
              <Image
                src="/images/metasurface-macro.png"
                alt="Macro of a nanostructured surface showing structural colour — cyan, violet and amber shifting across the texture."
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="w-full"
              />
            </figure>
          </Chapter>

          <Chapter
            index="02"
            kicker="The trust"
            title="A number appears only when it's valid."
            lead="Identity, seating and controls must all pass — otherwise the result is withheld."
            linkHref="/quality-validation"
            linkLabel="Quality & validation"
            flip
          >
            <ValidityShot />
          </Chapter>

          <Chapter
            index="03"
            kicker="The mission"
            title="For where diagnostic delay matters most."
            lead="Quality-gated measurement, engineered to move closer to the point of care."
            linkHref="/impact"
            linkLabel="Intended impact"
          >
            <figure className={`${frame} relative aspect-[16/10]`}>
              <Image
                src="/images/impact-reach.png"
                alt="A community health worker with a family in a rural Indian setting, holding a small portable device."
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover object-[center_35%]"
              />
            </figure>
          </Chapter>
        </div>
      </Container>
    </section>
  );
}
