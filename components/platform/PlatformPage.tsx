import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { PaperSection, VoidBand } from "@/components/ui/PaperSection";
import { Reveal } from "@/components/motion/Reveal";
import { DevNotice } from "@/components/ui/DevNotice";

type GridItem = { t: string; d?: string };

export type PlatformBlock =
  | { kind: "grid"; title: string; intro?: string; cols?: 2 | 3 | 4; numbered?: boolean; items: GridItem[] }
  | { kind: "chips"; title: string; intro?: string; items: string[] }
  | { kind: "list"; title: string; intro?: string; items: string[] }
  | { kind: "note"; title: string; body: string }
  | { kind: "band"; id: string; alt: string; caption?: string };

type Cta = { label: string; href: string };

const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };

function Band({ id, alt, caption, priority = false }: { id: string; alt: string; caption?: string; priority?: boolean }) {
  return (
    <section className="bg-void">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
        <ImageSlot id={id} alt={alt} ratio="16/9" caption={caption} priority={priority} sizes="(min-width: 1024px) 1100px, 100vw" />
      </div>
    </section>
  );
}

/**
 * PlatformPage — one consistent, image-led flow shared by every Platform page:
 * hero → signature image band → visual content blocks → R&D notice → CTA band.
 * Pages supply only data, so the whole section reads as a single flow.
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
  let paperIndex = 0;

  return (
    <>
      <PageHero kicker={kicker} title={title}>
        {lead}
      </PageHero>

      <Band id={heroImage.id} alt={heroImage.alt} caption={heroImage.caption} priority />

      {blocks.map((b, bi) => {
        if (b.kind === "band") {
          return <Band key={bi} id={b.id} alt={b.alt} caption={b.caption} />;
        }
        const border = paperIndex === 0 ? "" : "border-t border-[var(--border-light)]";
        paperIndex += 1;

        return (
          <PaperSection key={bi} className={border}>
            {b.kind === "note" ? (
              <Reveal>
                <div className="max-w-3xl">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{b.title}</h2>
                  <p className="mt-4 font-body text-lg leading-relaxed text-ink/75">{b.body}</p>
                </div>
              </Reveal>
            ) : (
              <>
                <Reveal>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{b.title}</h2>
                  {b.intro ? (
                    <p className="mt-3 max-w-2xl font-body leading-relaxed text-ink/70">{b.intro}</p>
                  ) : null}
                </Reveal>

                {b.kind === "grid" && (
                  <div className={`mt-8 grid gap-x-8 gap-y-6 ${colClass[b.cols ?? 3]}`}>
                    {b.items.map((it, i) => (
                      <Reveal key={it.t} delay={(i % (b.cols ?? 3)) * 0.05}>
                        <div className="h-full border-t border-ink/15 pt-4">
                          {b.numbered ? (
                            <span className="font-mono text-[0.66rem] text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                          ) : null}
                          <h3 className={`font-display text-base font-bold leading-tight tracking-tight text-ink ${b.numbered ? "mt-1" : ""}`}>
                            {it.t}
                          </h3>
                          {it.d ? <p className="mt-1.5 font-body text-sm leading-relaxed text-ink/65">{it.d}</p> : null}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                )}

                {b.kind === "list" && (
                  <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                    {b.items.map((it, i) => (
                      <Reveal key={it} delay={(i % 2) * 0.05}>
                        <li className="flex gap-3 border-t border-ink/15 pt-3">
                          <span className="font-mono text-[0.6rem] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                          <span className="font-body text-sm leading-relaxed text-ink/70">{it}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                )}

                {b.kind === "chips" && (
                  <Reveal>
                    <ul className="mt-8 flex flex-wrap gap-2.5">
                      {b.items.map((z) => (
                        <li
                          key={z}
                          className="rounded-full border border-[var(--border-light)] px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-ink/65"
                        >
                          {z}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </>
            )}
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
