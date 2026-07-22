import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Container } from "@/components/ui/Container";

/**
 * A drawing given its own full-bleed dark plate.
 *
 * Diagrams sit on Void rather than in the Paper flow for a reason that is not
 * aesthetic: the prism gradient's amber stop is about 1.4:1 on Paper, so a light
 * path drawn there fades out exactly where it matters. Keeping every drawing on
 * one surface also means one contrast story instead of two.
 *
 * Shared by PlatformPage and by the pages that are not template-driven, so a
 * drawing looks the same wherever it appears.
 */
export function DiagramPlate({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-void">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-signal sm:text-[1.75rem]">
              {title}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-signal/85">
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
