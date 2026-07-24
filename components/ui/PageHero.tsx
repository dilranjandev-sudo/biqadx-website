import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { ParallaxFrame } from "@/components/motion/Parallax";
import { KineticHeading } from "@/components/motion/KineticHeading";
import { getImage } from "@/lib/images";

/**
 * Hero band at the top of each subpage.
 *
 * ## Why the copy is beside the photograph, not on it
 *
 * It used to be set over the picture, which meant every hero was a negotiation
 * between two things that pull in opposite directions: the photograph wants to
 * be bright, and the type needs a dark ground. That negotiation was fought with
 * scrims, and it was re-fought every time an image was swapped — brightness
 * tuned per file, scrim stops reshaped around the copy corner, contrast
 * re-measured against the actual pixels of every frame in the set.
 *
 * Giving the copy its own panel of solid Void ends the argument rather than
 * winning it. The type sits at a fixed, known contrast that no photograph can
 * affect, and the photograph is shown with no scrim over it at all — for the
 * first time, whole and at its own exposure.
 *
 * On a narrow screen the two stack: picture, then copy beneath it. The split is
 * a wide-screen idea; forcing it into one column would give both halves too
 * little room.
 *
 * ## Motion
 *
 * The entrance is CSS (`.rise-in` / `.fade-up` in globals.css) rather than
 * JS-driven, for two reasons: this component carries the <h1> on sixteen pages,
 * so it must stay visible even if no animation ever runs; and it keeps the band
 * a server component. Reduced motion is handled by the global media query.
 *
 * The headline additionally answers to the pointer — see KineticHeading, which
 * is an enhancement layered on top of already-rendered text.
 */
export function PageHero({
  kicker,
  title,
  image,
  imageAlt,
  // Exposure comes from the manifest, per image — see below. A page can still
  // override it. Drift is on by default so every page opens alive.
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
      {kicker && (
        <p className="fade-up font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/75">
          {kicker}
        </p>
      )}

      {/* The one sanctioned use of the prism gradient: a short mark, never a
          fill. It anchors the copy column and echoes Home. Its hue now travels
          with scroll (see DiffractionDriver) — the same accent as the section
          rules, on the bright set for the dark hero. With no JS it parks at the
          resting angle and reads exactly as it did before. */}
      <span
        aria-hidden="true"
        className="diffract-rule-signal fade-up mt-5 block h-[3px] w-10 rounded-full"
        style={{ animationDelay: "120ms" }}
      />

      {/* Rises out of its mask, then answers to the pointer. `aria-label` carries
          the whole string, so the per-character spans inside are never read out
          one letter at a time. */}
      {/* `text-wrap: balance` matters more here than the size does. Without it
          the last line of a hero headline is regularly one orphaned word, which
          is what makes a wrapped title look broken rather than set. */}
      <h1
        aria-label={title}
        className="mt-5 overflow-hidden font-display text-[2.3rem] font-bold leading-[1.03] tracking-tightest text-signal [text-wrap:balance] sm:text-[3rem] lg:text-[3.4rem]"
      >
        <span className="rise-in block pb-[0.06em]" style={{ animationDelay: "60ms" }}>
          <KineticHeading text={title} />
        </span>
      </h1>

      {children && (
        <div
          className="fade-up mt-6 max-w-md font-body text-base leading-relaxed text-signal/80 sm:text-lg"
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

  const picture = (
    <>
      <Image
        src={asset.src}
        alt={imageAlt ?? asset.alt}
        fill
        priority
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover"
        style={{ filter: imageFilter }}
      />
      {/* The only tone laid over the picture, and only at the seam: a short fade
          into the copy panel so the two halves meet rather than butt. Everywhere
          else the photograph is shown untouched. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.85) 0%, rgba(11,14,20,0.25) 12%, rgba(11,14,20,0) 30%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.30) 0%, rgba(11,14,20,0) 45%, rgba(11,14,20,0.85) 100%)",
        }}
      />
    </>
  );

  return (
    <section className="relative isolate bg-void">
      <div className="lg:grid lg:min-h-[74svh] lg:grid-cols-12">
        {/* Picture. First in the DOM on narrow screens so the page opens on the
            photograph, which is how Home opens too. */}
        <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[16/9] lg:order-2 lg:col-span-6 lg:aspect-auto">
          {imageParallax ? (
            // A whisper of scale only. The frame is no longer a wide, short band
            // cropping a 3:2 photograph hard, so the drift needs almost no
            // overflow to stay gap-free.
            <ParallaxFrame className="absolute inset-0" amount={2} from={1.05} to={1.04}>
              {picture}
            </ParallaxFrame>
          ) : (
            <div className="absolute inset-0">{picture}</div>
          )}
        </div>

        {/* Copy, on solid Void. Nothing behind it, so its contrast is fixed and
            no photograph can move it. */}
        {/* Six columns, not five, and a tighter right gutter. At five the
            headline had 423px to work in at 54px type, which wrapped
            thirty-five-character titles onto four lines — the copy was being
            broken by the panel, not by its own length. */}
        <div className="lg:order-1 lg:col-span-6 lg:flex lg:items-center">
          <div className="mx-auto w-full max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:mx-0 lg:max-w-none lg:py-20 lg:pl-[max(1.5rem,calc((100vw-72rem)/2))] lg:pr-8">
            {copy}
          </div>
        </div>
      </div>
    </section>
  );
}
