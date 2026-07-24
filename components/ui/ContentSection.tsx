import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PaperSection } from "./PaperSection";

/**
 * A Paper content section: numbered heading on the left, content on the right.
 *
 * The layout technical documentation uses — a section's title sits beside what it
 * describes rather than stranded above a full-width block, and the reading column
 * stays a sane width on a large display instead of running the full 1400px.
 *
 * Shared so every subpage gets the same rhythm from one place. Pass `no` to put
 * the section on the page's numbered spine.
 */
export function ContentSection({
  no,
  title,
  intro,
  children,
  aside,
  className = "",
  divider = true,
}: {
  /** Position on the page spine, e.g. "02 / 04". */
  no?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  /**
   * Optional figure under the heading, in the left column.
   *
   * A heading and a short intro never fill four columns, so every one of these
   * sections carries a tall empty block beside its content — most obvious where
   * the right-hand column runs long. This is where an image belongs on a Paper
   * page: beside the text, not behind it. Behind it would put a photograph under
   * body copy on the light surface, which is the argument the heroes already
   * lost — it was settled there by giving the copy its own ground rather than
   * fighting the picture with scrims.
   */
  aside?: ReactNode;
  className?: string;
  /** Hairline above the section. Off for the first one on a page. */
  divider?: boolean;
}) {
  return (
    <PaperSection
      className={`${divider ? "border-t border-[var(--border-light)]" : ""} ${className}`}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          {no && (
            <ScrollReveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                  {no}
                </span>
                <span aria-hidden="true" className="diffract-rule h-px w-10" />
              </div>
            </ScrollReveal>
          )}

          {/* The heading rises out of a mask, the way every headline on Home
              does. It was a plain fade before, which is why the subpages felt
              like a different site scrolling past — same content rhythm, a
              different arrival. */}
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
            <span className="block overflow-hidden pb-[0.08em]">
              <ScrollReveal as="span" variant="mask" delay={0.06} className="block">
                {title}
              </ScrollReveal>
            </span>
          </h2>

          {intro && (
            <ScrollReveal delay={0.14}>
              <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">{intro}</p>
            </ScrollReveal>
          )}

          {aside && (
            <ScrollReveal delay={0.2} className="mt-8 block">
              {aside}
            </ScrollReveal>
          )}
        </div>

        <div className="lg:col-span-8">{children}</div>
      </div>
    </PaperSection>
  );
}
