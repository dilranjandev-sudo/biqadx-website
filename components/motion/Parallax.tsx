"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Scroll-linked vertical drift. `amount` is the total travel in px across the
 * element's full pass through the viewport (positive = moves up on scroll).
 * Spring-smoothed so it never feels mechanically pinned to the wheel.
 */
export function Parallax({
  children,
  className,
  amount = 40,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  const y = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Image that both drifts and slowly de-zooms as it crosses the viewport — the
 * frame stays put, the picture breathes inside it. Wrap a `fill` <Image>.
 */
export function ParallaxFrame({
  children,
  className,
  amount = 8,
  from = 1.12,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical travel of the image inside its frame, in percent. */
  amount?: number;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `${-amount}%`]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.4 });
  const scale = useSpring(rawScale, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduce ? undefined : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
