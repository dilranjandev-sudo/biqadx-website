"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";

const STEPS = [
  { k: "01", t: "Apply", s: "Sample enters the card." },
  { k: "02", t: "The surface works", s: "A structured zone transforms the signal." },
  { k: "03", t: "The reader reads", s: "OMEGA-PRO interrogates the zone." },
  { k: "04", t: "Checked", s: "References and controls are evaluated." },
  { k: "05", t: "Valid result", s: "Released only when technically valid." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const node: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const beamX: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: "easeInOut" } },
};
const beamY: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.1, ease: "easeInOut" } },
};

function Dot() {
  return (
    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
      <span
        className="absolute inset-0 rounded-full blur-[3px]"
        style={{ background: "var(--prism-2)", opacity: 0.6 }}
      />
      <span className="relative h-3.5 w-3.5 rounded-full border-2 border-void" style={{ background: "var(--prism-2)" }} />
    </span>
  );
}

/** Animated "sample → validated result" flow: the Prism beam draws and each node
 *  lights up in sequence as it scrolls into view. Reduced-motion → static. */
export function MeasurementChain() {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -15% 0px" } as const;

  return (
    <section className="border-t border-[var(--border-dark)] bg-void">
      <Container className="py-20 sm:py-28">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal/45">
          How it works
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
          From sample to a validated result.
        </h2>

        {/* Desktop: horizontal chain */}
        <motion.div
          className="relative mt-14 hidden sm:block"
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewport}
        >
          <motion.div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[6px] h-[3px] origin-left"
            style={{ background: "var(--prism-gradient)", opacity: 0.6 }}
            variants={reduce ? undefined : beamX}
          />
          <ol className="grid grid-cols-5 gap-4">
            {STEPS.map((step) => (
              <motion.li key={step.k} className="flex flex-col items-center text-center" variants={reduce ? undefined : node}>
                <Dot />
                <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-signal/40">{step.k}</p>
                <p className="mt-2 font-display text-lg leading-tight text-signal">{step.t}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-signal/60">{step.s}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* Mobile: vertical chain */}
        <motion.div
          className="relative mt-10 pl-8 sm:hidden"
          variants={container}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewport}
        >
          <motion.div
            aria-hidden="true"
            className="absolute left-[6px] top-1 h-[calc(100%-1rem)] w-[3px] origin-top"
            style={{ background: "var(--prism-gradient)", opacity: 0.6 }}
            variants={reduce ? undefined : beamY}
          />
          <ol className="space-y-9">
            {STEPS.map((step) => (
              <motion.li key={step.k} className="relative" variants={reduce ? undefined : node}>
                <span className="absolute -left-8 top-0.5">
                  <Dot />
                </span>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-signal/40">{step.k}</p>
                <p className="mt-1 font-display text-lg leading-tight text-signal">{step.t}</p>
                <p className="mt-1 font-body text-sm leading-relaxed text-signal/60">{step.s}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </Container>
    </section>
  );
}
