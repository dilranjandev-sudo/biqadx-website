import type { ReactNode } from "react";
import { Container } from "./Container";

/** Short Void-toned hero band at the top of each subpage, for visual
 *  continuity with Home before the page drops into Paper (brief §3, §6). */
export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-void">
      <Container className="py-20 sm:py-28">
        {kicker && (
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-signal/50">
            {kicker}
          </p>
        )}
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.04] tracking-tightest text-signal sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="mt-6 max-w-2xl font-body text-base leading-relaxed text-signal/70 sm:text-lg">
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
