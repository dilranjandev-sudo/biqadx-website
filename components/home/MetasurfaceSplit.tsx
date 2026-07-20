"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const RAYS = [
  { y: 84, label: "Amplitude" },
  { y: 140, label: "Phase" },
  { y: 200, label: "Direction" },
  { y: 260, label: "Spectrum" },
  { y: 316, label: "Polarization" },
];

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
};
const fade: Variants = {
  hidden: { opacity: 0, x: 6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

/** Animated diagram: one light beam meets the engineered surface and splits into
 *  the properties a metasurface can control. Draws in on scroll; static under
 *  reduced-motion. */
export function MetasurfaceSplit() {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 620 400"
      role="img"
      aria-label="Diagram: an incoming beam of light meets an engineered surface and is split into amplitude, phase, direction, spectrum and polarization."
      className="w-full"
      variants={group}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <defs>
        <linearGradient id="ms-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6EE7F0" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="ms-ray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#F2C879" />
        </linearGradient>
      </defs>

      {/* Incoming beam */}
      <motion.line
        x1="20" y1="200" x2="250" y2="200"
        stroke="url(#ms-beam)" strokeWidth="3" strokeLinecap="round"
        variants={reduce ? undefined : draw}
      />

      {/* The engineered surface */}
      <rect x="250" y="120" width="14" height="160" rx="4" fill="#1A1F2B" stroke="rgba(232,236,239,0.25)" />
      {[132, 148, 164, 180, 196, 212, 228, 244, 260].map((y) => (
        <line key={y} x1="252" y1={y} x2="262" y2={y} stroke="rgba(167,139,250,0.5)" strokeWidth="1" />
      ))}
      <rect x="250" y="120" width="14" height="4" fill="url(#ms-beam)" />

      {/* Split output rays + labels */}
      {RAYS.map((ray) => (
        <g key={ray.label}>
          <motion.line
            x1="264" y1="200" x2="470" y2={ray.y}
            stroke="url(#ms-ray)" strokeWidth="2.5" strokeLinecap="round"
            variants={reduce ? undefined : draw}
          />
          <motion.circle cx="470" cy={ray.y} r="3" fill="#F2C879" variants={reduce ? undefined : fade} />
          <motion.text
            x="484" y={ray.y + 4}
            className="font-mono"
            fontSize="15"
            fill="rgba(232,236,239,0.75)"
            letterSpacing="0.5"
            variants={reduce ? undefined : fade}
          >
            {ray.label}
          </motion.text>
        </g>
      ))}
    </motion.svg>
  );
}
