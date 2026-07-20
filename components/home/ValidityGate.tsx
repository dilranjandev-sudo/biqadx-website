"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const CONDITIONS = [
  "Cartridge identity",
  "Seating & safety",
  "References in-limit",
  "Internal controls",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const dot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.2, 0.9, 0.3, 1.2] } },
};

/** Validity gate — an instrument-style readout: each condition satisfies in
 *  sequence (a prism node lights), and only then does the gated output release.
 *  Reduced-motion → shown resolved and static. */
export function ValidityGate() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="rounded-2xl border border-[var(--border-dark)] bg-graphite/40 p-6 sm:p-8"
      variants={container}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {/* Header */}
      <motion.div
        variants={reduce ? undefined : item}
        className="flex items-center justify-between border-b border-[var(--border-dark)] pb-4"
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal/55">
          Validity gate
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-signal/35">
          All must pass
        </span>
      </motion.div>

      {/* Conditions */}
      <ul className="mt-5 space-y-1">
        {CONDITIONS.map((c, i) => (
          <motion.li
            key={c}
            variants={reduce ? undefined : item}
            className="flex items-center justify-between gap-4 py-2.5"
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] text-signal/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-sm text-signal/80">{c}</span>
            </span>
            <span className="flex items-center gap-2.5">
              <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-signal/40">
                Met
              </span>
              <motion.span
                variants={reduce ? undefined : dot}
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--prism-gradient)" }}
              />
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Gated output — releases last, once every condition has passed */}
      <motion.div
        variants={reduce ? undefined : item}
        className="mt-5 flex items-center gap-3 rounded-xl border border-[var(--border-dark)] bg-void/50 px-4 py-4"
      >
        <motion.span
          variants={reduce ? undefined : dot}
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            background: "var(--prism-gradient)",
            boxShadow: "0 0 14px rgba(167, 139, 250, 0.55)",
          }}
        />
        <span className="font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-signal/70">
          Output released only in the authorized validity state
        </span>
      </motion.div>
    </motion.div>
  );
}
