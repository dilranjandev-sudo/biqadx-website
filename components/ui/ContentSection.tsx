import type { ReactNode } from "react";
import { PaperSection } from "./PaperSection";
import { Reveal } from "@/components/motion/Reveal";

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
  className = "",
  divider = true,
}: {
  /** Position on the page spine, e.g. "02 / 04". */
  no?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
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
          <Reveal>
            {no && (
              <div className="mb-6 flex items-center gap-4">
                <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/65">
                  {no}
                </span>
                <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
              </div>
            )}
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">{intro}</p>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-8">{children}</div>
      </div>
    </PaperSection>
  );
}
