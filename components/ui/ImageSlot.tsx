"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { getImage } from "@/lib/images";
import { useAnimate } from "@/components/motion/useAnimate";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type ImageSlotProps = {
  /** Manifest id in lib/images.ts. Renders a placeholder until populated. */
  id: string;
  /** Required descriptive alt text (also shown as the placeholder label). */
  alt: string;
  /** Aspect ratio, e.g. "16/9", "4/3", "1/1". */
  ratio?: string;
  /**
   * Tailwind aspect classes for the frame, overriding `ratio`. Use when the shape
   * must change by breakpoint — a 21:9 band is only 147px tall on a phone, which
   * reads as a strip rather than as an image.
   */
  frameClassName?: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Short mono label set on the image itself, e.g. "Figure 02". */
  label?: string;
  /**
   * Put the caption on the photograph under a scrim instead of below it. Used by
   * the full-bleed bands, where a caption sitting outside a 21:9 image floats
   * unattached to anything.
   */
  overlay?: boolean;
  /**
   * A short line set on the photograph itself, above the compliance caption.
   *
   * A band carrying only "Illustrative — engineering work in progress" is a
   * picture with a disclaimer on it; the reader gets nothing from the image that
   * the surrounding page did not already say. This is the sentence the band is
   * there to make. Overlay bands only — on an inline figure it would compete
   * with the section heading beside it.
   */
  statement?: string;
};

/** Renders a generated image when the manifest has one, otherwise an accessible,
 *  on-brand placeholder. Lets pages build cleanly before imagery exists (step 5).
 *  Compliance: device/card imagery must carry an "Illustrative — in development"
 *  caption; pass it via `caption` or set it on the manifest entry (brief §7).
 *
 *  The frame is held still and the picture drifts inside it as the page scrolls
 *  past — the same treatment used on Home, so subpage imagery reads the same way.
 *  Placeholders never drift; there is nothing there to move. */
export function ImageSlot({
  id,
  alt,
  ratio = "16/9",
  caption,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  label,
  overlay = false,
  statement,
  frameClassName,
}: ImageSlotProps) {
  const asset = getImage(id);
  const shownCaption = caption ?? asset?.caption;

  const ref = useRef<HTMLDivElement>(null);
  const animate = useAnimate();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.4 });

  const drift = animate && !!asset;

  return (
    <figure className={className}>
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite ${
          frameClassName ?? ""
        }`}
        style={frameClassName ? undefined : { aspectRatio: ratio }}
      >
        {asset ? (
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={drift ? { y, scale: 1.12 } : undefined}
          >
            <Image
              src={asset.src}
              alt={asset.alt || alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          </motion.div>
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <span className="text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
              {alt}
            </span>
          </div>
        )}

        {/* Prism edge glow — an allowed light-refraction accent. Sits after the
            image so it reads on top of it rather than behind. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "var(--prism-gradient)", opacity: 0.6 }}
        />

        {label && (
          <>
            {/* The label sits on the photograph, so it carries its own ground —
                a bright frame would otherwise swallow it. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,14,20,0.7) 0%, rgba(11,14,20,0) 100%)",
              }}
            />
            <span className="absolute left-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/75 sm:left-7 sm:top-6">
              {label}
            </span>
          </>
        )}

        {overlay && (shownCaption || statement) && (
          <>
            {/* Taller and heavier when a statement sits on the picture: a scrim
                sized for one line of 10px mono leaves display type standing on
                whatever the photograph happens to be doing underneath it. */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 bottom-0 ${
                statement ? "h-2/3" : "h-1/3"
              }`}
              style={{
                background: statement
                  ? "linear-gradient(180deg, rgba(11,14,20,0) 0%, rgba(11,14,20,0.45) 45%, rgba(11,14,20,0.9) 100%)"
                  : "linear-gradient(180deg, rgba(11,14,20,0) 0%, rgba(11,14,20,0.8) 100%)",
              }}
            />
            <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-6">
              {statement && (
                <p className="mb-2 max-w-xl font-display text-lg font-bold leading-snug tracking-tight text-signal sm:text-2xl">
                  {/* Masked rise, the same arrival every headline on this site
                      uses — so a line on a photograph reads as part of the page
                      rather than as a caption that happens to be large. */}
                  <span className="block overflow-hidden pb-[0.08em]">
                    <ScrollReveal as="span" variant="mask" delay={0.18} className="block">
                      {statement}
                    </ScrollReveal>
                  </span>
                </p>
              )}
              {shownCaption && (
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/75">
                  {shownCaption}
                </span>
              )}
            </figcaption>
          </>
        )}
      </div>

      {!overlay && shownCaption && (
        <figcaption className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
          {shownCaption}
        </figcaption>
      )}
    </figure>
  );
}
