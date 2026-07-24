"use client";

import { PinnedScene } from "@/components/motion/PinnedScene";
import {
  CardReaderPath,
  crCardState,
  crBeamOpacity,
  crHeldOpacity,
  crStage,
} from "./CardReaderPath";

/**
 * The card being seated, under the reader's own scrolling.
 *
 * This page argues that the analyzer holds one geometry — the same angles, the
 * same stand-off, the same seating, every run — and that this is what makes one
 * card's reading comparable to another's. Prose can only assert that. Handing
 * the motion to the reader proves it: they push the card in themselves, and
 * however fast or slow they scroll, it comes to rest against the same stops and
 * then stops moving. Half the scroll is spent with the card not moving at all,
 * which is the argument rather than dead time.
 *
 * The order matters and is not decoration. The beam is held back until the card
 * is at the datum, because a path drawn through a card that has not arrived says
 * the opposite of what the page says. The held dimensions come last, because
 * they are what seating guarantees.
 *
 * A frame writes one transform and four opacities. Nothing is recomputed.
 */
export function CardReaderScene({
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
      readout={{ total: 3, unit: "STAGES", value: crStage }}
      setup={(host) => {
        const card = host.querySelector<SVGGElement>("g[data-cr-card]");
        const beam = host.querySelector<SVGGElement>("g[data-cr-beam]");
        const held = host.querySelector<SVGGElement>("g[data-cr-held]");
        if (!card || !beam || !held) return null;

        return (t) => {
          const { dx, opacity } = crCardState(t);
          card.setAttribute("transform", `translate(${dx.toFixed(1)} 0)`);
          card.setAttribute("opacity", opacity.toFixed(3));
          beam.setAttribute("opacity", crBeamOpacity(t).toFixed(3));
          held.setAttribute("opacity", crHeldOpacity(t).toFixed(3));
        };
      }}
    >
      <CardReaderPath tone="ink" t={1} />
    </PinnedScene>
  );
}
