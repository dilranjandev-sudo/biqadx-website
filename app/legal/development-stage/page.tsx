import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection } from "@/components/ui/PaperSection";
import { developmentStageDisclaimer as d } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Development Stage & Website Disclaimer",
  description:
    "Full transparency regarding the research, prototype, validation, regulatory and commercial status of BIQADX technologies and website information.",
};

export default function DevelopmentStagePage() {
  return (
    <>
      <PageHero kicker="Legal transparency · Research-stage information" title={d.title} />
      <PaperSection>
        <div className="max-w-3xl space-y-5">
          {d.intro.map((p, i) => (
            <p key={i} className="font-body leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 max-w-3xl space-y-10">
          {d.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                {s.heading}
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.12em] text-ink/45">
          {/* Internal note surfaced as a visible caveat, not legal advice. */}
          This baseline is pending review by counsel against final website
          functionality, company records, patent status and applicable law before
          launch.
        </p>
      </PaperSection>
    </>
  );
}
