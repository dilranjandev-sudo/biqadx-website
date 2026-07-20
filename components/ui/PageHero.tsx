import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { getImage } from "@/lib/images";

/**
 * Hero band at the top of each subpage.
 *
 * Pass `image` (a manifest id) and the page opens on its photograph with the
 * copy set over it, the way Home does — rather than a flat dark band followed
 * immediately by the same picture as a separate section, which read as the page
 * saying everything twice. Without an id it falls back to the plain band, which
 * is what the legal pages want.
 *
 * Text over photography needs its own ground, so two scrims sit under the copy:
 * a bottom-up gradient and a left-side one. Both are heavy enough that the copy
 * clears AA over any frame in the set, not just the dark ones.
 *
 * Copy is kept short and small on purpose. Every subpage opens the way Home does
 * — kicker, one display line, one sentence — so the picture carries the page and
 * the reading starts in the sections below rather than in the hero.
 *
 * The entrance is CSS-driven (`.rise-in` / `.fade-up` in globals.css) rather than
 * JS-driven, for two reasons: this component carries the <h1> on 17 pages, so it
 * must stay visible even if no animation ever runs; and it keeps the band a
 * server component. Reduced motion is handled by the global media query.
 */
export function PageHero({
  kicker,
  title,
  image,
  imageAlt,
  children,
}: {
  kicker?: string;
  title: string;
  /** Manifest id in lib/images.ts. Omit for a plain dark band. */
  image?: string;
  /** Overrides the manifest alt. Decorative here — the h1 carries the meaning. */
  imageAlt?: string;
  children?: ReactNode;
}) {
  const asset = image ? getImage(image) : undefined;

  const copy = (
    <div className="max-w-xl">
      {kicker && (
        <p className="fade-up font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
          {kicker}
        </p>
      )}

      {/* Set in the same register as the home hero: a short display line at
          text-xl/2xl in a narrow column, not a 6xl slab. Sentence case is forced
          inline because globals.css uppercases every `h1.font-display` — that is
          right for the section headings inside a page, but the hero line is the
          one piece of type that should read like Home's, which is a sentence. */}
      <h1
        className="mt-4 overflow-hidden font-display text-xl font-medium leading-snug tracking-tight text-signal sm:text-2xl"
        style={{ textTransform: "none", letterSpacing: "-0.01em" }}
      >
        <span className="rise-in block pb-[0.06em]" style={{ animationDelay: "60ms" }}>
          {title}
        </span>
      </h1>

      {children && (
        <div
          className="fade-up mt-5 font-body text-sm leading-relaxed text-signal/70 sm:text-base"
          style={{ animationDelay: "220ms" }}
        >
          {children}
        </div>
      )}
    </div>
  );

  if (!asset) {
    return (
      <section className="bg-void">
        <Container className="py-20 sm:py-28">{copy}</Container>
      </section>
    );
  }

  return (
    <section className="relative isolate flex min-h-[58svh] items-end overflow-hidden bg-void sm:min-h-[64svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={asset.src}
          alt={imageAlt ?? asset.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.55) 0%, rgba(11,14,20,0.25) 38%, rgba(11,14,20,0.88) 82%, rgba(11,14,20,0.96) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.82) 0%, rgba(11,14,20,0.25) 58%, rgba(11,14,20,0.05) 100%)",
        }}
      />

      <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-32">{copy}</Container>
    </section>
  );
}
