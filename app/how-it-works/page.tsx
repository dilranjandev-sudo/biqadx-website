import type { Metadata } from "next";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { SplitFigure } from "@/components/ui/SplitFigure";
import { Timeline } from "@/components/howitworks/Timeline";
import { SamplePathScene } from "@/components/diagrams/SamplePathScene";

export const metadata: Metadata = {
  title: "How the Platform Works",
  description:
    "The research-stage workflow from cartridge identity and sample routing to multi-modal interrogation, calibration, QC and validity-gated output.",
};

/**
 * How it works, off the shared PlatformPage template: the eight-step process is
 * the point of this page, so it is given a vertical timeline whose line fills as
 * you scroll — your progress down the page tracks the run's progress.
 */
export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How the Platform Works"
        title="From sample to a gated result."
        image="howitworks-sequence"
        imageAlt="A gloved hand applying a sample to the card, then seating it into the analyzer."
      >
        Every link has to hold.
      </PageHero>

      <ContentSection
        no="01 / 02"
        title="From sample entry to a validity state"
        intro="Eight controlled steps. The output only means something once every one of them has held."
        divider={false}
      >
        <Timeline />
      </ContentSection>

      {/* A figure between the abstract timeline and the abstract route: the run
          begins with a real hand and a real card. */}
      <SplitFigure
        id="howitworks-figure"
        flip
        kicker="Where it begins"
        lead="Every run starts with a hand and a card."
        body="Before any of the eight controlled steps, a cartridge is loaded by a person at a bench. The workflow is designed around that first, physical moment."
        alt="Gloved hands holding a card-format cartridge over a fixture at a lab bench, a cyan-blue sheen on its face."
        caption="Illustrative — research workflow"
      />

      {/* The timeline above is the run in time; this is the same run in space.
          Seeing the route is what makes metering, the zone's position partway
          along it, and containment read as separate concerns rather than as one
          vague processing step.
          Scrubbed rather than still, because a run that goes one way and does not
          come back is exactly what scrolling is. */}
      <SamplePathScene
        title="The same run, in space"
        intro="One route through the card: in at the port, metered, across the zone that is measured, then sealed. Keep scrolling to follow it."
      />

      <ContentSection no="02 / 02" title="Why validity gating matters">
        <ScrollReveal>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            A number should not be shown merely because a detector produced a
            signal. Technical validity depends on identity, seating, references,
            detector state, fluid completion, calibration and configuration
            integrity. This is the basis of BIQADX&rsquo;s validity-gated output
            philosophy.
          </p>
        </ScrollReveal>
      </ContentSection>
    </>
  );
}
