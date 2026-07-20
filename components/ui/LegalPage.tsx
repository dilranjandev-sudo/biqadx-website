import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { Container } from "./Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Shared shell for the legal and policy pages.
 *
 * Deliberately single-column, unlike the rest of the site: legal text is read
 * start to finish, so splitting a clause away from its heading would work against
 * it. The polish here is typographic — a real reading measure (a prose column
 * capped near 68 characters rather than the full container), a hairline between
 * clauses, and headings set at body scale so a policy reads as a document rather
 * than as a marketing page.
 *
 * `lead` paragraphs run before the numbered clauses, for pages whose disclaimer
 * opens with unheaded prose.
 */
export function LegalPage({
  kicker = "Legal",
  title,
  notice,
  lead,
  sections,
  footnote,
}: {
  kicker?: string;
  title: string;
  /** Draft / review notice, shown above the text. */
  notice?: ReactNode;
  lead?: string[];
  sections?: LegalSection[];
  footnote?: string;
}) {
  return (
    <>
      <PageHero kicker={kicker} title={title} />

      <section className="bg-paper text-ink">
        <Container className="py-16 sm:py-24">
          <div className="max-w-[68ch]">
            {notice && <div className="mb-10">{notice}</div>}

            {lead && (
              <div className="space-y-5">
                {lead.map((p, i) => (
                  <ScrollReveal key={i} delay={Math.min(i, 4) * 0.04}>
                    <p className="font-body leading-relaxed text-ink/75">{p}</p>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {sections && (
              <div className={lead ? "mt-14" : ""}>
                {sections.map((s, i) => (
                  <ScrollReveal key={s.heading} delay={Math.min(i, 4) * 0.05}>
                    <section
                      className={
                        i === 0
                          ? "pb-8"
                          : "border-t border-[var(--border-light)] py-8 last:pb-0"
                      }
                    >
                      <div className="mb-4 flex items-baseline gap-4">
                        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">
                          {s.heading}
                        </h2>
                      </div>
                      <div className="font-body leading-relaxed text-ink/75">{s.body}</div>
                    </section>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {footnote && (
              <p className="mt-12 border-t border-[var(--border-light)] pt-5 font-body text-xs leading-relaxed text-ink/65">
                {footnote}
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
