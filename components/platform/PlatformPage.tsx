import { PageHero } from "@/components/ui/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FigureBand } from "@/components/ui/FigureBand";
import { PaperSection } from "@/components/ui/PaperSection";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { LightPath } from "@/components/diagrams/LightPath";
import { CardAssemblyScene } from "@/components/diagrams/CardAssemblyScene";
import { CardReaderScene } from "@/components/diagrams/CardReaderScene";
import { ValidityGateDiagram } from "@/components/diagrams/ValidityGateDiagram";
import { MethodFamilies } from "@/components/diagrams/MethodFamilies";
import { EvidenceLadder } from "@/components/diagrams/EvidenceLadder";
import { RoadmapFunnel } from "@/components/diagrams/RoadmapFunnel";
import { UdosPipeline } from "@/components/diagrams/UdosPipeline";
import { OmegaDetectors } from "@/components/diagrams/OmegaDetectors";
import { CartridgeFamilies } from "@/components/diagrams/CartridgeFamilies";
import { OnCardReferences } from "@/components/diagrams/OnCardReferences";
import { DiagramPlate } from "@/components/diagrams/DiagramPlate";

type GridItem = { t: string; d?: string };

// Pages name a drawing rather than importing one, so a page stays a data file.
const DIAGRAMS = {
  "light-path": LightPath,
  "validity-gate": ValidityGateDiagram,
  "method-families": MethodFamilies,
  "evidence-ladder": EvidenceLadder,
  "roadmap-funnel": RoadmapFunnel,
  "udos-pipeline": UdosPipeline,
  "omega-detectors": OmegaDetectors,
  "cartridge-families": CartridgeFamilies,
  "on-card-references": OnCardReferences,
} as const;

export type DiagramId = keyof typeof DIAGRAMS;

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
  /** A line drawing. The photography can show the bench; only this can show the
   *  structure the page is actually describing. */
  | { kind: "diagram"; title: string; intro?: string; diagram: DiagramId }
  /** The cartridge taken apart under the reader's own scrolling. Its own block
   *  kind rather than another `diagram` id, because it owns a pinned scroll track
   *  and so has to control its whole section rather than sit inside a plate. */
  | { kind: "assembly"; title: string; intro?: string }
  /** The card seated against its stops under the reader's own scrolling. Same
   *  reason as `assembly` for being its own kind: it owns a pinned scroll track. */
  | { kind: "seating"; title: string; intro?: string }
  | { kind: "band"; id: string; alt: string; caption?: string }
  /** Two photographs side by side, where the comparison *is* the content and
   *  either one alone would say nothing. */
  | {
      kind: "pair";
      title: string;
      intro?: string;
      left: { id: string; alt: string; caption: string };
      right: { id: string; alt: string; caption: string };
    }
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
      <span aria-hidden="true" className="diffract-rule h-px w-10" />
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
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-md font-body leading-relaxed text-ink/75">
            {body}
          </p>
        </ScrollReveal>
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
}: {
  kicker: string;
  title: string;
  lead: string;
  heroImage: { id: string; alt: string; caption?: string };
  blocks: PlatformBlock[];
  /** Still accepted so the eight pages that pass them do not error, but no longer
   *  rendered — the closing CTA band was removed site-wide. */
  primary?: Cta;
  secondary?: Cta;
}) {
  // A numbered spine down the page. Titled blocks are the sections a reader
  // navigates by, so they carry "01 / 06"; bands are figures and are numbered
  // separately, the way a technical document separates plates from sections.
  // Bands and diagrams are plates, not sections — they are numbered as figures
  // and must not inflate the "01 / 06" the reader navigates by.
  const sectionTotal = blocks.filter(
    (b) =>
      b.kind !== "band" &&
      b.kind !== "diagram" &&
      b.kind !== "assembly" &&
      b.kind !== "seating" &&
      b.kind !== "pair",
  ).length;
  let paperIndex = 0;
  let figureIndex = 0;
  // The signature image now opens the page inside the hero, so in-page bands
  // number from Figure 01.
  let bandIndex = 0;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        image={heroImage.id}
        imageAlt={heroImage.alt}
      >
        {lead}
      </PageHero>

      {blocks.map((b, bi) => {
        // Diagrams get their own full-bleed plate rather than sitting inside a
        // text section, so they read as plates in a technical document rather
        // than as decoration. On Paper: a line drawing is ink on paper, which is
        // what an engineering drawing is. The contrast problem that used to force
        // these onto a dark surface is fixed at the source — see DiagramPlate.
        if (b.kind === "diagram") {
          const Drawing = DIAGRAMS[b.diagram];
          return (
            <DiagramPlate key={bi} title={b.title} intro={b.intro}>
              <Drawing tone="ink" />
            </DiagramPlate>
          );
        }

        if (b.kind === "assembly") {
          return <CardAssemblyScene key={bi} title={b.title} intro={b.intro} />;
        }

        if (b.kind === "seating") {
          return <CardReaderScene key={bi} title={b.title} intro={b.intro} />;
        }

        // A pair keeps the dark plate even though the drawings no longer do.
        // These are photographs, and a full-bleed dark band is how this site
        // presents photography everywhere else; two bright frames dropped into
        // the Paper flow read as decoration rather than as a comparison.
        if (b.kind === "pair") {
          return (
            <DiagramPlate key={bi} title={b.title} intro={b.intro} tone="signal">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {[b.left, b.right].map((side, si) => (
                  <ScrollReveal key={side.id} variant="wipe" delay={si * 0.1}>
                    <figure>
                      <div className="relative aspect-square overflow-hidden rounded-lg">
                        <ImageSlot
                          id={side.id}
                          alt={side.alt}
                          ratio="1/1"
                          sizes="(min-width: 640px) 45vw, 100vw"
                        />
                      </div>
                      <figcaption className="mt-3 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-signal/70">
                        {side.caption}
                      </figcaption>
                    </figure>
                  </ScrollReveal>
                ))}
              </div>
            </DiagramPlate>
          );
        }

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
              <ScrollReveal>
                <SectionMark no={sectionNo} />
              </ScrollReveal>
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
                <ScrollReveal>
                  <SectionMark no={sectionNo} />
                  {/* Masked rise, matching Home and ContentSection, so all
                      three page families land a heading the same way. */}
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                    <span className="block overflow-hidden pb-[0.08em]">
                      <ScrollReveal as="span" variant="mask" delay={0.06} className="block">
                        {b.title}
                      </ScrollReveal>
                    </span>
                  </h2>
                  {b.kind !== "note" && b.intro ? (
                    <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">
                      {b.intro}
                    </p>
                  ) : null}
                </ScrollReveal>
              </div>

              <div className="lg:col-span-8">
                {b.kind === "note" && (
                  <ScrollReveal>
                    <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
                      {b.body}
                    </p>
                  </ScrollReveal>
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
                  <ScrollReveal>
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
                  </ScrollReveal>
                )}
              </div>
            </div>
          </PaperSection>
        );
      })}
    </>
  );
}
