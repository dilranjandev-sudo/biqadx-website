"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const CONDITIONS = [
  "Cartridge identity",
  "Seating & safety",
  "References in-limit",
  "Internal controls",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const line: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Chapter-02 visual — the real self-check photo with the validity conditions
 *  overlaid: each lights in sequence, then the gated-output line. Combines the
 *  photography with the validity-gate points. Reduced-motion → shown static. */
export function ValidityShot() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-dark)]">
      <Image
        src="/images/why-validate.png"
        alt="A card held in a precision fixture as a light probe scans its reference edge during a self-check."
        width={1536}
        height={1024}
        sizes="(min-width: 1024px) 620px, 100vw"
        className="w-full"
      />

      {/* Legibility scrim for the overlaid readout */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0) 26%, rgba(11,14,20,0.5) 58%, rgba(11,14,20,0.93) 100%)",
        }}
      />

      {/* Validity conditions → gated output */}
      <motion.div
        className="absolute inset-x-0 bottom-0 p-5 sm:p-6"
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      >
        <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5">
          {CONDITIONS.map((c) => (
            <motion.li
              key={c}
              variants={reduce ? undefined : line}
              className="flex items-center gap-2"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--prism-gradient)" }}
              />
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.13em] text-signal/85 sm:text-[0.6rem]">
                {c}
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          variants={reduce ? undefined : line}
          className="mt-4 border-t border-signal/15 pt-3 font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.13em] text-signal/60 sm:text-[0.6rem]"
        >
          Output released only in the authorized validity state
        </motion.p>
      </motion.div>
    </div>
  );
}
