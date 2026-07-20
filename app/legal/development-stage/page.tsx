import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { developmentStageDisclaimer as d } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Development Stage & Website Disclaimer",
  description:
    "Full transparency regarding the research, prototype, validation, regulatory and commercial status of BIQADX technologies and website information.",
};

export default function DevelopmentStagePage() {
  return (
    <LegalPage
      kicker="Legal transparency · Research-stage information"
      title={d.title}
      lead={[...d.intro]}
      sections={d.sections.map((s) => ({ heading: s.heading, body: s.body }))}
      // Internal note surfaced as a visible caveat, not legal advice.
      footnote="This baseline is pending review by counsel against final website functionality, company records, patent status and applicable law before launch."
    />
  );
}
