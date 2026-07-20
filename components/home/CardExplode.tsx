"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const ZONES = [
  "OPTICAL ZONE",
  "MICROFLUIDIC NETWORK",
  "SENSING INTERFACE",
  "REFERENCE & IDENTITY",
  "SEALING & CONTAINMENT",
];
const N = ZONES.length;
const MID = (N - 1) / 2;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const slab: Variants = {
  hidden: (i: number) => ({ y: (MID - i) * 42, opacity: 0.35 }),
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** "Inside the card": the METACARD zones separate on scroll into an exploded
 *  stack with labels. Framer whileInView; reduced-motion → exploded static. */
export function CardExplode() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px]"
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2"
        style={{ background: "var(--prism-gradient)", opacity: 0.22 }}
      />
      <div
        className="relative flex flex-col gap-3 py-2"
        role="img"
        aria-label="Exploded view of the METACARD cartridge zones: optical, microfluidic network, sensing interface, reference and identity, and sealing and containment."
      >
        {ZONES.map((z, i) => (
          <motion.div
            key={z}
            custom={i}
            variants={reduce ? undefined : slab}
            className="relative flex h-11 items-center rounded-md border border-[var(--border-dark)] bg-graphite"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "var(--prism-gradient)", opacity: i === 1 ? 0.85 : 0.25 }}
            />
            <span className="pl-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal/60">
              {z}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
