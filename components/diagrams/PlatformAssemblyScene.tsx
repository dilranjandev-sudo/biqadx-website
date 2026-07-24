"use client";

import { PinnedScene } from "@/components/motion/PinnedScene";
import {
  PlatformAssembly,
  PLATFORM_PARTS,
  platformOffset,
  platformLabelOpacity,
} from "./PlatformAssembly";

/**
 * The platform separating into its three named parts as you scroll — Home's one
 * pinned scene.
 *
 * Home names METACARD, OMEGA-PRO and UDOS in the hero eyebrow and shows each as a
 * photograph further down, but never shows that they are one system. This does:
 * assembled they read as a single unit; scrolled, they fan apart and each is
 * named with its role. It is the anime.js expand-and-label treatment the other
 * three scenes use, on Void, carrying the argument the whole company rests on.
 *
 * A frame writes three transforms and three opacities. Nothing recomputes.
 */
export function PlatformAssemblyScene({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <PinnedScene
      tone="signal"
      stack
      trackVh={300}
      title={title}
      intro={intro}
      readout={{
        total: PLATFORM_PARTS,
        unit: "PARTS",
        value: (t) => {
          let n = 0;
          for (let i = 0; i < PLATFORM_PARTS; i++) {
            if (platformLabelOpacity(i, t) > 0.5) n++;
          }
          return n;
        },
      }}
      setup={(host) => {
        const parts = Array.from({ length: PLATFORM_PARTS }, (_, i) => {
          const g = host.querySelector<SVGGElement>(`g[data-part="${i}"]`);
          return {
            g,
            label: g?.querySelector<SVGGElement>(`g[data-part-label="${i}"]`) ?? null,
          };
        });
        if (parts.some((p) => !p.g || !p.label)) return null;
        const found = parts as { g: SVGGElement; label: SVGGElement }[];

        return (t) => {
          for (let i = 0; i < found.length; i++) {
            const dx = platformOffset(i, t);
            found[i].g.setAttribute("transform", `translate(${dx.toFixed(2)} 0)`);
            found[i].label.setAttribute(
              "opacity",
              platformLabelOpacity(i, t).toFixed(3),
            );
          }
        };
      }}
    >
      <PlatformAssembly tone="signal" t={1} />
    </PinnedScene>
  );
}
