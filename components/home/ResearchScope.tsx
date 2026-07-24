"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { motionDisabled } from "@/lib/motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParallaxFrame } from "@/components/motion/Parallax";

/**
 * Research scope, laid out as a lab plate sheet rather than a hero band.
 *
 * The headline column pins while three framed "plates" — the most
 * documentary photographs in the set — travel past it, each carrying one scope
 * figure. Small framed images with mono index rules read as documentation, not
 * as stock hero art, which is what keeps the section from looking generated.
 */

const HEADLINE = ["Metasurface-Integrated", "Diagnostics for", "Decentralized Healthcare"];

type Plate = {
  index: string;
  kicker: string;
  img: string;
  alt: string;
  ratio: string;
  /** Horizontal inset so the stack reads as a hand-laid sheet, not a grid. */
  offset: string;
  figure: { value: number; prefix?: string; text?: string; label: string };
};

const PLATES: Plate[] = [
  {
    index: "01",
    kicker: "Measurement",
    img: "/images/scope-methods.png",
    alt: "Three different measurement heads — an optical objective, a row of gold electrical contact pins and a thermal block — arranged above a single blank card on a precision stage.",
    ratio: "3 / 2",
    offset: "lg:mr-16",
    figure: { value: 14, label: "Core measurement methods" },
  },
  {
    index: "02",
    kicker: "Assay development",
    img: "/images/scope-assays.png",
    alt: "A development rack densely loaded with rows of blank cards on a laboratory bench, beside trays of pipette tips.",
    ratio: "3 / 2",
    offset: "lg:ml-20",
    figure: { value: 200, prefix: "~", label: "Candidate assays in development" },
  },
  {
    index: "03",
    kicker: "On-card references",
    img: "/images/scope-references.png",
    alt: "Macro of a card corner showing a row of engineered reference patches — a graded step wedge from bright silver to near-black, followed by cyan, violet and amber tinted squares.",
    ratio: "3 / 2",
    offset: "lg:mr-8",
    figure: { value: 0, text: "On-card", label: "Intensity & wavelength references" },
  },
];

/** Counts up once in view. Falls straight to the final value when motion is off. */
function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    // When motion is off, land on the final figure without waiting to be
    // scrolled into view — otherwise a static capture reads zero.
    if (motionDisabled()) {
      setVal(to);
      return;
    }
    if (!inView) return;
    let step = 0;
    const steps = 34;
    const id = window.setInterval(() => {
      step += 1;
      const p = step / steps;
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (step >= steps) {
        setVal(to);
        clearInterval(id);
      }
    }, 34);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val}
    </span>
  );
}

export function ResearchScope() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="bg-void" aria-label="Research scope">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Headline column — pins while the plates travel past */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {/* Two distinct lines rather than one crammed run: the company
                  descriptor, then the three development stages as separate tokens
                  with dot separators — legible, and consistent with the stage
                  badges the footer uses. */}
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/70">
                India-based deep-tech healthcare R&amp;D
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {["Research", "Prototype", "Engineering Development"].map(
                  (stage, i) => (
                    <span
                      key={stage}
                      className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/65"
                    >
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-signal/35"
                        />
                      )}
                      {stage}
                    </span>
                  ),
                )}
              </div>

              {/* Refined light-refraction accent — the one sanctioned use of the
                  prism gradient, as a short mark, never a fill. */}
              <span
                aria-hidden="true"
                className="mt-6 block h-[3px] w-12 rounded-full"
                style={{ background: "var(--prism-gradient)" }}
              />

              <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.04] tracking-tightest text-signal sm:text-[3.25rem]">
                {HEADLINE.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    {/* Deliberately not a KineticHeading. This headline is
                        fifty-nine characters over five lines, and it sits in a
                        column that is `sticky` while three spring-driven plates
                        scroll past it — per-letter work here lands on the one
                        part of Home that is already doing the most during a
                        scroll. The hero carries the effect for this page. */}
                    <ScrollReveal as="span" variant="mask" delay={i * 0.09} className="block">
                      {line}
                    </ScrollReveal>
                  </span>
                ))}
              </h1>

              <div className="mt-8 h-px w-full bg-signal/20" />

              <p className="mt-8 max-w-sm font-body text-sm leading-[1.7] text-signal/80">
                Research scope — the assay menu is not finalized, and every method and
                assay requires method-specific validation.
              </p>
            </div>
          </div>

          {/* Plate sheet */}
          <div className="lg:col-span-7">
            <ul className="space-y-16 sm:space-y-20">
              {PLATES.map((p, i) => (
                <Plate key={p.index} plate={p} eager={i === 0} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Plate({ plate, eager }: { plate: Plate; eager: boolean }) {
  return (
    <li className={plate.offset}>
      <ScrollReveal>
        {/* Index rule — plate number, subject, hairline */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal/70">
            {plate.index} / 03
          </span>
          <span className="h-px flex-1 bg-signal/15" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/70">
            {plate.kicker}
          </span>
        </div>

        {/* Same drift as before, now on the shared CSS timeline rather than on
            a scroll observer and a spring of its own. Three of these run in a
            sticky column, which is the worst place on the page to be doing
            per-frame work. */}
        <div
          className="relative mt-4 overflow-hidden border border-[var(--border-dark)]"
          style={{ aspectRatio: plate.ratio }}
        >
          <ParallaxFrame className="absolute inset-0" amount={7} from={1.1} to={1.1}>
            <Image
              src={plate.img}
              alt={plate.alt}
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              priority={eager}
              className="object-cover"
            />
          </ParallaxFrame>
        </div>

        {/* Figure — sits under its plate like a caption, not overlaid on it */}
        <div className="mt-5 flex items-baseline gap-5">
          <span className="font-display text-4xl font-bold leading-none tracking-tightest text-signal sm:text-5xl">
            {plate.figure.text ?? (
              <CountUp to={plate.figure.value} prefix={plate.figure.prefix} />
            )}
          </span>
          {/* Kept light — the big figure leads, the label sits back beside it as
              a quiet caption. /50 is about as faint as this can go and still hold
              AA (4.5:1) for small text on Void. */}
          <span className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-signal/50">
            {plate.figure.label}
          </span>
        </div>
      </ScrollReveal>
    </li>
  );
}
