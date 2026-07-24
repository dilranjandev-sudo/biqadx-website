"use client";

import { PinnedScene } from "@/components/motion/PinnedScene";
import {
  CardAssembly,
  ASSEMBLY_LAYERS,
  assemblyLayerOffset,
  assemblyLayerProgress,
  assemblyLayerSpread,
  assemblyLabelOpacity,
} from "./CardAssembly";

/**
 * The cartridge coming apart as you scroll.
 *
 * A still drawing asserts that six functions are stacked inside a disposable.
 * Taking the card apart under the reader's own scrolling demonstrates it, one
 * plate at a time, each named as it settles.
 *
 * The drawing is rendered once, on the server, at its final exploded geometry.
 * Because the projection sends z to screen y and nowhere else, every intermediate
 * state is that same drawing with one translate per layer — so a frame costs six
 * transforms and six opacities, and React is not involved after mount.
 */
export function CardAssemblyScene({
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
        total: ASSEMBLY_LAYERS,
        unit: "LAYERS",
        value: (t) => {
          let n = 0;
          for (let i = 0; i < ASSEMBLY_LAYERS; i++) {
            if (assemblyLayerProgress(i, t) > 0.5) n++;
          }
          return n;
        },
      }}
      setup={(host) => {
        // Indexed by layer, never taken in document order: the drawing paints
        // back to front, so a plain querySelectorAll returns these reversed and
        // every layer would be driven by its opposite number's clock.
        const plates = Array.from({ length: ASSEMBLY_LAYERS }, (_, i) => {
          const g = host.querySelector<SVGGElement>(`g[data-layer="${i}"]`);
          return {
            g,
            annot: g?.querySelector<SVGGElement>("g[data-annot]") ?? null,
          };
        });
        if (plates.some((p) => !p.g || !p.annot)) return null;
        const found = plates as { g: SVGGElement; annot: SVGGElement }[];

        return (t) => {
          for (let i = 0; i < found.length; i++) {
            const p = assemblyLayerProgress(i, t);
            const dy = assemblyLayerOffset(i, assemblyLayerSpread(i, t));
            // A CSS transform on an SVG element is expressed in that element's
            // own user units, which is the space these offsets are computed in.
            found[i].g.style.transform = `translateY(${dy.toFixed(3)}px)`;
            found[i].annot.setAttribute(
              "opacity",
              assemblyLabelOpacity(p).toFixed(3),
            );
          }
        };
      }}
    >
      <CardAssembly tone="ink" spread={1} />
    </PinnedScene>
  );
}
