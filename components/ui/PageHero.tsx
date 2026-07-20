import type { ReactNode } from "react";
import { Container } from "./Container";

/** Short Void-toned hero band at the top of each subpage, for visual
 *  continuity with Home before the page drops into Paper (brief §3, §6).
 *
 *  The entrance is CSS-driven (`.rise-in` / `.fade-up` in globals.css) rather
 *  than JS-driven, for two reasons: this component carries the <h1> on 17 pages,
 *  so it must stay visible even if no animation ever runs; and it keeps the whole
 *  band a server component, shipping no JavaScript at all. Reduced motion is
 *  handled by the global media query. */
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
          <p className="fade-up font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            {kicker}
          </p>
        )}

        <h1 className="mt-4 max-w-4xl overflow-hidden font-display text-4xl font-bold leading-[1.04] tracking-tightest text-signal sm:text-5xl md:text-6xl">
          <span className="rise-in block pb-[0.06em]" style={{ animationDelay: "60ms" }}>
            {title}
          </span>
        </h1>

        {children && (
          <div
            className="fade-up mt-6 max-w-2xl font-body text-base leading-relaxed text-signal/75 sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
