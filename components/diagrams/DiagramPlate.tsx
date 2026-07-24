import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Container } from "@/components/ui/Container";

/**
 * A drawing given its own full-bleed plate.
 *
 * These used to be dark without exception, for a reason that was real rather
 * than aesthetic: the prism gradient is built for the dark surface, and on Paper
 * its cyan measures 1.3:1 and its amber 1.4:1 — so a light path drawn there
 * faded out exactly where it mattered. That constraint has been dealt with at
 * the source: `--prism-ink-*` is the same three hues darkened until each clears
 * 4.5:1 on Paper, and the two drawings that use the gradient pick their stops by
 * tone.
 *
 * So the default is Paper now. A line drawing is ink on paper — that is what an
 * engineering drawing is, and it reads as a real document rather than as a
 * lightbox. Dark is still available and is right for two things: photographs,
 * which this site presents as cinematic bands, and the home page, which is Void
 * throughout.
 */
export function DiagramPlate({
  title,
  intro,
  children,
  tone = "ink",
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "ink" | "signal";
}) {
  const dark = tone === "signal";
  return (
    <section className={dark ? "bg-void" : "bg-paper"}>
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2
              className={`font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem] ${
                dark ? "text-signal" : "text-ink"
              }`}
            >
              {title}
            </h2>
            {intro ? (
              <p
                className={`mt-4 max-w-xl font-body text-sm leading-relaxed ${
                  dark ? "text-signal/85" : "text-ink/75"
                }`}
              >
                {intro}
              </p>
            ) : null}
          </ScrollReveal>
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
