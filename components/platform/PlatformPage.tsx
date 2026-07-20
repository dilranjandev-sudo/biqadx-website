import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FigureBand } from "@/components/ui/FigureBand";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DevNotice } from "@/components/ui/DevNotice";

type GridItem = { t: string; d?: string };

export type PlatformBlock =
  | {
      kind: "grid";
      title: string;
      intro?: string;
      cols?: 2 | 3 | 4;
      numbered?: boolean;
      items: GridItem[];
    }
  | { kind: "chips"; title: string; intro?: string; items: string[] }
  | { kind: "list"; title: string; intro?: string; items: string[] }
  | { kind: "note"; title: string; body: string }
  | { kind: "band"; id: string; alt: string; caption?: string }
  /** Text paired with its own image — the block that makes these pages image-led. */
  | {
      kind: "figure";
      title: string;
      body: string;
      id: string;
      alt: string;
      caption?: string;
      /** Put the image on the left instead of the right. */
      flip?: boolean;
    };

type Cta = { label: string; href: string };

const colClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Section counter and rule — the page's spine, so a long technical page reads
 *  as a numbered document rather than as an undifferentiated scroll. */
function SectionMark({ no }: { no: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
        {no}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
    </div>
  );
}

/** Text and image side by side, alternating sides down the page. */
function Figure({
  title,
  body,
  id,
  alt,
  caption,
  flip,
}: {
  title: string;
  body: string;
  id: string;
  alt: string;
  caption?: string;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <ScrollReveal
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
        <Reveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md font-body leading-relaxed text-ink/75">
            {body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

/**
 * PlatformPage — one consistent, image-led flow shared by every Platform page:
 * hero → signature band → content blocks → R&D notice → CTA band.
 *
 * Pages supply only data, so all eight read as a single system and a change here
 * lands on all of them. Bands are full-bleed and enter with a scan wipe; figures
 * pair copy with an image and alternate sides; every image is an ImageSlot, so an
 * id with no asset yet renders a labelled placeholder instead of breaking the
 * layout. See IMAGE_PLACEHOLDERS.md for what is still outstanding.
 */
export function PlatformPage({
  kicker,
  title,
  lead,
  heroImage,
  blocks,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  lead: string;
  heroImage: { id: string; alt: string; caption?: string };
  blocks: PlatformBlock[];
  primary: Cta;
  secondary: Cta;
}) {
  // A numbered spine down the page. Titled blocks are the sections a reader
  // navigates by, so they carry "01 / 06"; bands are figures and are numbered
  // separately, the way a technical document separates plates from sections.
  const sectionTotal = blocks.filter((b) => b.kind !== "band").length;
  let paperIndex = 0;
  let figureIndex = 0;
  let bandIndex = 1; // the signature band is Figure 01

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <PageHero kicker={kicker} title={title}>
        {lead}
      </PageHero>

      <FigureBand
        id={heroImage.id}
        alt={heroImage.alt}
        caption={heroImage.caption}
        label="Figure 01"
        priority
      />

      {blocks.map((b, bi) => {
        if (b.kind === "band") {
          bandIndex += 1;
          return (
            <FigureBand
              key={bi}
              id={b.id}
              alt={b.alt}
              caption={b.caption}
              label={`Figure ${pad(bandIndex)}`}
            />
          );
        }

        const border =
          paperIndex === 0 ? "" : "border-t border-[var(--border-light)]";
        paperIndex += 1;
        const sectionNo = `${pad(paperIndex)} / ${pad(sectionTotal)}`;

        if (b.kind === "figure") {
          // Alternate sides automatically unless the block asks for a side.
          const flip = b.flip ?? figureIndex % 2 === 1;
          figureIndex += 1;
          return (
            <PaperSection key={bi} className={border}>
              <Reveal>
                <SectionMark no={sectionNo} />
              </Reveal>
              <Figure {...b} flip={flip} />
            </PaperSection>
          );
        }

        return (
          <PaperSection key={bi} className={border}>
            {/* Heading on the left, content on the right — the layout technical
                documentation uses, because it keeps a section's title beside what
                it describes instead of stranding it above a full-width block. */}
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionMark no={sectionNo} />
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                    {b.title}
                  </h2>
                  {b.kind !== "note" && b.intro ? (
                    <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">
                      {b.intro}
                    </p>
                  ) : null}
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                {b.kind === "note" && (
                  <Reveal>
                    <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
                      {b.body}
                    </p>
                  </Reveal>
                )}

                {b.kind === "grid" && (
                  <div
                    className={`grid gap-x-8 gap-y-6 ${colClass[b.cols ?? 3]}`}
                  >
                    {b.items.map((it, i) => (
                      <ScrollReveal
                        key={it.t}
                        delay={(i % (b.cols ?? 3)) * 0.06}
                      >
                        <div className="h-full border-t border-ink/15 pt-4">
                          {b.numbered ? (
                            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          ) : null}
                          <h3
                            className={`font-display text-base font-bold leading-tight tracking-tight text-ink ${
                              b.numbered ? "mt-1" : ""
                            }`}
                          >
                            {it.t}
                          </h3>
                          {it.d ? (
                            <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">
                              {it.d}
                            </p>
                          ) : null}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {b.kind === "list" && (
                  <ul>
                    {b.items.map((it, i) => (
                      <li key={it}>
                        <ScrollReveal delay={i * 0.05}>
                          <div className="flex gap-5 border-b border-ink/12 py-4 first:pt-0">
                            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-body text-sm leading-relaxed text-ink/75">
                              {it}
                            </span>
                          </div>
                        </ScrollReveal>
                      </li>
                    ))}
                  </ul>
                )}

                {b.kind === "chips" && (
                  <Reveal>
                    <ul className="flex flex-wrap gap-2">
                      {b.items.map((z) => (
                        <li
                          key={z}
                          className="rounded-full border border-[var(--border-light)] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/75"
                        >
                          {z}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </div>
          </PaperSection>
        );
      })}

      <PaperSection className="border-t border-[var(--border-light)]">
        <DevNotice />
      </PaperSection>

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={primary.href} className="btn-primary">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="btn-outline">
            {secondary.label}
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
