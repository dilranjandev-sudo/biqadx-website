"use client";

import { PinnedScene } from "@/components/motion/PinnedScene";
import {
  SamplePath,
  SAMPLE_STAGES,
  sampleFillOffset,
  sampleStageOpacity,
  sampleStagesDone,
} from "./SamplePath";

/**
 * The sample travelling its route, under the reader's own scrolling.
 *
 * Of everything on this site this is the most literal mapping of scroll to
 * meaning: the page is about a run that goes one way and does not come back, and
 * scrolling is a movement that goes one way. The reader pushes the sample through
 * the card, and each stage is marked as the fluid finishes it rather than all
 * four being captioned at once.
 *
 * The order carries the page's argument by itself. Metering is complete a quarter
 * of the way along; the structured zone — the part that is actually measured —
 * sits at four fifths, not at the end; and the route finishes sealed. A reader
 * who has scrolled it has understood why those are separate concerns without a
 * sentence saying so.
 *
 * A frame writes one dash offset and four opacities.
 */
export function SamplePathScene({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <PinnedScene
      title={title}
      intro={intro}
      readout={{
        total: SAMPLE_STAGES.length,
        unit: "STAGES",
        value: sampleStagesDone,
      }}
      setup={(host) => {
        const fill = host.querySelector<SVGPathElement>("path[data-sp-fill]");
        const stages = SAMPLE_STAGES.map((_, i) =>
          host.querySelector<SVGGElement>(`g[data-sp-stage="${i}"]`),
        );
        if (!fill || stages.some((g) => !g)) return null;
        const found = stages as SVGGElement[];

        return (t) => {
          fill.setAttribute("stroke-dashoffset", sampleFillOffset(t).toFixed(4));
          for (let i = 0; i < found.length; i++) {
            found[i].setAttribute("opacity", sampleStageOpacity(i, t).toFixed(3));
          }
        };
      }}
    >
      <SamplePath tone="ink" t={1} />
    </PinnedScene>
  );
}
