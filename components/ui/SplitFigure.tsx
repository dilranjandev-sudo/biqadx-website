import type { ReactNode } from "react";
import { PaperSection } from "./PaperSection";
import { ImageSlot } from "./ImageSlot";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * A photograph beside its line — the site's one image pattern on Paper.
 *
 * It replaces the full-bleed band that carried a line burned across the bottom of
 * the picture. A line sitting on a photograph fights whatever the photograph is
 * doing underneath it and reads as a caption that happens to be large; a line
 * *beside* the photograph is a figure with something to say. This is also the
 * layout the subpage heroes already use — copy on one side, image on the other —
 * so the whole site reads as one system rather than two.
 *
 * The lead is set in the display face but as a paragraph, not a heading: the
 * section headings around it are condensed capitals, and a second block of those
 * mid-section would compete rather than punctuate. It rises out of a mask, the
 * arrival every headline on the site uses.
 *
 * `flip` puts the image on the left; callers alternate it down the page. The
 * image is an `ImageSlot`, so a slot with no asset yet renders a labelled
 * placeholder instead of collapsing the layout.
 */
export function SplitFigure({
  id,
  alt,
  lead,
  body,
  kicker,
  caption,
  flip = false,
  divider = true,
}: {
  /** Manifest id for the photograph. */
  id: string;
  alt: string;
  /** The line beside the image — what this figure is here to say. */
  lead: string;
  /** Optional supporting sentence under the lead. */
  body?: ReactNode;
  /** Optional short mono label above the lead, e.g. "IN PRACTICE". */
  kicker?: string;
  /** Compliance caption, shown under the image. */
  caption?: string;
  /** Image on the left instead of the right. */
  flip?: boolean;
  /** Hairline above the section. */
  divider?: boolean;
}) {
  return (
    <PaperSection
      className={divider ? "border-t border-[var(--border-light)]" : ""}
    >
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        {/* The image reveals with a scan wipe — a light passing once across the
            frame, the register the whole site uses for a figure arriving. Reads
            more like an instrument than a fade. */}
        <ScrollReveal
          variant="wipe"
          className={
            flip ? "lg:col-span-6 lg:order-1" : "lg:col-span-6 lg:order-2"
          }
        >
          <ImageSlot
            id={id}
            alt={alt}
            ratio="4/3"
            caption={caption}
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </ScrollReveal>

        <div
          className={
            flip ? "lg:col-span-6 lg:order-2" : "lg:col-span-6 lg:order-1"
          }
        >
          {kicker ? (
            <ScrollReveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                  {kicker}
                </span>
                <span aria-hidden="true" className="diffract-rule h-px w-10" />
              </div>
            </ScrollReveal>
          ) : null}

          <p className="max-w-md font-display text-xl font-bold leading-snug tracking-tight text-ink sm:text-2xl">
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal as="span" variant="mask" delay={0.06} className="block">
                {lead}
              </ScrollReveal>
            </span>
          </p>

          {body ? (
            <ScrollReveal delay={0.14}>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink/75">
                {body}
              </p>
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </PaperSection>
  );
}
