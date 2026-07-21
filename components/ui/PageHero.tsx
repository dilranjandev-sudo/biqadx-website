import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { ParallaxFrame } from "@/components/motion/Parallax";
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
 * a bottom-up gradient and a left-side one. They are shaped around the copy
 * rather than veiling the frame evenly, so the picture keeps its brightness
 * where nothing is written and the copy still clears AA over every frame in the
 * set. Verified against the real pixels, not assumed — see the scrims below.
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
  // Exposure normally comes from the manifest, per image — see below. A page can
  // still override it. Drift is on by default so every page opens alive.
  imageBrightness,
  imageParallax = true,
  children,
}: {
  kicker?: string;
  title: string;
  /** Manifest id in lib/images.ts. Omit for a plain dark band. */
  image?: string;
  /** Overrides the manifest alt. Decorative here — the h1 carries the meaning. */
  imageAlt?: string;
  /** Overrides the manifest's per-image exposure. Prefer setting `brightness` in
   *  lib/images.ts, which keeps it beside the file it describes. */
  imageBrightness?: number;
  /** Drift + de-zoom the hero photograph as the page scrolls, like Home. */
  imageParallax?: boolean;
  children?: ReactNode;
}) {
  const asset = image ? getImage(image) : undefined;

  // Exposure is a property of the photograph, not of the layout, so it lives in
  // the manifest beside the file. One shared multiplier cannot work here: these
  // frames run from a mean level of 24 to 109, so a lift that rescues the dark
  // ones flattens a third of the bright ones to white.
  const brightness = imageBrightness ?? asset?.brightness ?? 1;

  // Brightness alone lifts the blacks and leaves a photograph looking washed and
  // foggy, so a little contrast and saturation goes with it — the picture reads
  // brighter *and* crisper rather than merely paler.
  const imageFilter =
    brightness === 1
      ? "contrast(1.06) saturate(1.06)"
      : `brightness(${brightness}) contrast(1.06) saturate(1.06)`;

  const copy = (
    <div className="max-w-2xl">
      {/* Full signal, not /70: this is the smallest type in the hero and it sits
          highest, where the scrim is lightest — it was the only line in the band
          that ever fell under 4.5:1. */}
      {kicker && (
        <p className="fade-up font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal">
          {kicker}
        </p>
      )}

      {/* Big, bold, in the caps register globals.css gives every h1 — the same
          highlighted headline the home hero carries, so every page opens the same
          way. It rises in from the mask; the size steps down on narrow screens so
          longer titles still fit. */}
      <h1 className="mt-4 max-w-3xl overflow-hidden font-display text-[2.4rem] font-bold leading-[1.02] tracking-tightest text-signal sm:text-5xl md:text-[3.5rem]">
        <span className="rise-in block pb-[0.06em]" style={{ animationDelay: "60ms" }}>
          {title}
        </span>
      </h1>

      {children && (
        <div
          className="fade-up mt-6 max-w-xl font-body text-base leading-relaxed text-signal/80 sm:text-lg"
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

  // What actually zooms a hero is the band's aspect ratio, not the parallax: a
  // 3:2 photograph in a wide, short band is cropped hard by object-cover and the
  // subject reads as a blown-up detail. Height is the real de-zoom lever, so the
  // band is tall.
  //
  // The scale is then kept as close to 1 as the drift allows. It cannot be 1:
  // translating the image by `amount` percent needs at least that much overflow
  // on each side or a sliver of empty band shows at the extremes — the old
  // 5% drift under a 1.06→1.0 scale did exactly that at the top of the scroll.
  // 2% drift with a 1.05→1.04 scale is gap-free everywhere and barely enlarges
  // the picture at all.
  return (
    <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-void sm:min-h-[82svh]">
      {imageParallax ? (
        <ParallaxFrame
          className="absolute inset-0 -z-10"
          amount={2}
          from={1.05}
          to={1.04}
        >
          <Image
            src={asset.src}
            alt={imageAlt ?? asset.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={imageFilter ? { filter: imageFilter } : undefined}
          />
        </ParallaxFrame>
      ) : (
        <div
          className="absolute inset-0 -z-10"
          style={imageFilter ? { filter: imageFilter } : undefined}
        >
          <Image
            src={asset.src}
            alt={imageAlt ?? asset.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      {/* The scrims are shaped around where the copy actually sits — the lower
          left — instead of veiling the whole frame evenly. The old pair held a
          flat 0.25 veil across the middle and 0.05 at the right edge, which cost
          the picture brightness everywhere and still left the small kicker under
          4.5:1 on the lighter photographs.
          Now the upper third is nearly clear and the right edge is untouched, so
          the picture reads bright, while the copy corner is taken deliberately
          darker. Measured against the actual pixels of all fourteen hero files
          at their manifest exposures, the worst case across the set is kicker
          5.1:1, h1 6.5:1, lead 8.5:1 — against floors of 4.5, 3.0 and 4.5. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.36) 0%, rgba(11,14,20,0.10) 30%, rgba(11,14,20,0.58) 52%, rgba(11,14,20,0.86) 82%, rgba(11,14,20,0.94) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.80) 0%, rgba(11,14,20,0.26) 55%, rgba(11,14,20,0) 100%)",
        }}
      />

      <Container className="relative pb-14 pt-28 sm:pb-20 sm:pt-32">{copy}</Container>
    </section>
  );
}
