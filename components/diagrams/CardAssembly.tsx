import { Diagram, DgLabel, DgPath } from "./Diagram";

/**
 * METACARD drawn as an assembly that comes apart.
 *
 * The existing CardLayers is a section — the card seen edge-on, six slabs in a
 * row. That is the right drawing for "what is inside", and the wrong one for
 * "these six things are one object": separating slabs that are already separate
 * only widens the gaps.
 *
 * This is the same six layers in axonometric, so the stack reads as a physical
 * part. Assembled it is a card; pulled apart it is six pieces, each still
 * obviously belonging to the one above and below it. That is the page's claim —
 * six functions inside a couple of millimetres — happening rather than asserted.
 *
 * Every layer is one addressable group keyed off `spread`, so a scroll scene can
 * drive the whole explode from a single number.
 */

// Plan dimensions of the card, before projection. Roughly credit-card ratio.
const W = 214;
const D = 134;
// Thickness of one layer in the drawing. Not to scale — a true fraction of a
// millimetre at this width would be invisible; the stacking is the point.
const T = 9;
// Vertical separation between layer faces when fully exploded.
const GAP = 60;

/**
 * A deliberately shallow projection rather than true 30° isometric.
 *
 * At 30° a plate's own on-screen depth is (W+D)/2 = 174 units, nearly three
 * times the gap between plates, so each layer buried the features drawn on the
 * one below it and the drawing turned to mush. Flattening the vertical axis to
 * 0.24 drops that to 84 — the eye sits lower, the plates read as plates, and
 * every face stays legible while still overlapping enough to be a stack.
 */
const A = 0.97;
const B = 0.24;
const ORIGIN_X = 175;
const ORIGIN_Y = 180;

/** Where the leaders stop and the labels begin. */
const LEADER_X = 545;
const LABEL_X = 555;

/** Plan (x across, y deep, z up) → screen. */
function iso(x: number, y: number, z = 0): [number, number] {
  return [ORIGIN_X + (x - y) * A, ORIGIN_Y + (x + y) * B - z];
}

const pt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** The top face, as a closed parallelogram. */
function face(z: number) {
  return (
    `M${pt(iso(0, 0, z))} L${pt(iso(W, 0, z))} ` +
    `L${pt(iso(W, D, z))} L${pt(iso(0, D, z))} Z`
  );
}

/**
 * The whole solid's outer silhouette, filled with the page background so a plate
 * actually hides what is behind it. Without an opaque occluder every layer's
 * lines showed through every other layer's, which is the difference between a
 * stack of objects and a wireframe.
 */
function solid(z: number) {
  const b = z - T;
  return (
    `M${pt(iso(0, 0, z))} L${pt(iso(W, 0, z))} L${pt(iso(W, 0, b))} ` +
    `L${pt(iso(W, D, b))} L${pt(iso(0, D, b))} L${pt(iso(0, D, z))} Z`
  );
}

/** The visible side walls — the two faces that turn toward the viewer. */
function walls(z: number) {
  const b = z - T;
  return (
    `M${pt(iso(W, 0, z))} L${pt(iso(W, 0, b))} L${pt(iso(W, D, b))} ` +
    `L${pt(iso(0, D, b))} L${pt(iso(0, D, z))} ` +
    `M${pt(iso(W, D, z))} L${pt(iso(W, D, b))}`
  );
}

// The six layers, top of the stack first — the order a sample meets them. Each
// carries one feature on its own face, because six identical plates under six
// labels would be a list rather than a drawing.
const LAYERS = [
  { name: "Sample entry", note: "Port and vent" },
  { name: "Microfluidics", note: "Routing, metering" },
  { name: "Structured optics", note: "Metasurface zone" },
  { name: "Electrodes", note: "Electrochemical contact" },
  { name: "References", note: "On-card known values" },
  { name: "Identity", note: "Machine-readable code" },
];

export const ASSEMBLY_LAYERS = LAYERS.length;

/** Measured from the middle of the stack rather than its base, so the layers move
 *  symmetrically out from where the card already is. Anchored at the base, the
 *  whole object climbs the frame as it opens — the drawing appears to be sliding
 *  rather than coming apart, which is the wrong thing to notice. */
const MID = (LAYERS.length - 1) / 2;

/** Height of layer `i` above the middle of the stack, at a given spread. */
function layerZ(i: number, spread: number) {
  return (LAYERS.length - 1 - i - MID) * (T + (GAP - T) * spread);
}

/**
 * How far layer `i` must move on screen to sit at `spread`, measured against the
 * geometry as rendered at spread 1.
 *
 * This projection sends z to screen y and to nothing else, so changing the spread
 * translates each layer straight up or down and alters nothing else about it.
 * That is what makes the scroll scene affordable: the drawing is rendered once,
 * on the server, at its final geometry, and the scene only ever writes a
 * transform. No path is recomputed and React never re-renders while scrolling.
 */
export function assemblyLayerOffset(i: number, spread: number) {
  return layerZ(i, 1) - layerZ(i, spread);
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Fraction of the whole explode that one layer takes to travel.
 *
 * One plate at a time: it lifts, its name lands, and only then does the next
 * begin. At 0.26 no more than two are ever in motion, and the second is only
 * starting as the first finishes — enough overlap that the sequence never comes
 * to a dead stop, little enough that each layer plainly gets its own moment.
 *
 * Wider values were tried and are worse for this drawing, not just busier: at
 * 0.55 four plates move at once and the six names arrive in a bunch, which is
 * the thing a sequence is supposed to avoid.
 */
const WINDOW = 0.26;
const STAGGER = (1 - WINDOW) / (ASSEMBLY_LAYERS - 1);

/** Cubic ease-in-out. Scrubbed rather than played, so the ease is felt as the
 *  layer gathering pace and settling rather than as a duration. */
const ease = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/** How far through its own travel layer `i` is, at overall progress `t`. */
export function assemblyLayerProgress(i: number, t: number) {
  return clamp01((t - i * STAGGER) / WINDOW);
}

/**
 * Layer `i`'s own spread at overall progress `t`.
 *
 * Layers separate top-down — the order you would actually take the thing apart,
 * lifting the lid before reaching what is under it. Moving all six at once is
 * one gesture and says nothing about the order a sample meets them; moving them
 * in sequence says it without a word of copy.
 */
export function assemblyLayerSpread(i: number, t: number) {
  return ease(assemblyLayerProgress(i, t));
}

/**
 * A layer's label, tied to that layer's own travel rather than to the whole
 * drawing's. Each name arrives as its own plate settles, so the drawing annotates
 * itself piece by piece instead of captioning everything at once at the end.
 *
 * The lateness is a hard geometric constraint, not a taste: a label is pinned to
 * its plate's corner, so two visible labels are only as far apart as their two
 * plates. A label block needs about 34 user units of room. Measured across the
 * whole timeline, this ramp never brings two closer than 43.7; starting it at
 * half travel drops that to 6.4 and the names overlap each other for a third of
 * the scene. Anything that moves this earlier has to be re-measured.
 */
export function assemblyLabelOpacity(p: number) {
  return clamp01((p - 0.66) / 0.28);
}

/** Feature drawn on the face of layer `i`, in plan coordinates. */
function feature(i: number, z: number): { d: string; width: number } {
  const line = (pts: [number, number][]) =>
    pts.map((p, k) => `${k ? "L" : "M"}${pt(iso(p[0], p[1], z))}`).join(" ");

  const ring = (cx: number, cy: number, r: number) => {
    const steps = 20;
    return (
      Array.from({ length: steps + 1 }, (_, k) => {
        const a = (k / steps) * Math.PI * 2;
        return iso(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z);
      })
        .map((p, k) => `${k ? "L" : "M"}${pt(p)}`)
        .join(" ") + " Z"
    );
  };

  switch (i) {
    case 0:
      // the port the sample goes into, and the vent that lets air out
      return { d: `${ring(52, 62, 15)} ${ring(96, 62, 7)}`, width: 1.3 };
    case 1:
      // A serpentine, not a single dogleg: one turn projects to a shape that
      // reads as a letter, three turns read as a route.
      //
      // Its runs go along the card's depth and step along its width, which looks
      // backwards on the page and is the only way round that survives. This
      // projection compresses the depth axis to 0.24 while the width axis stays
      // at 0.97, so two runs a plan-distance apart in depth land five units
      // apart on screen and merge into one thick band. Everything drawn on these
      // faces has to separate along the width.
      return {
        d:
          ring(66, 42, 8) +
          " " +
          line([
            [66, 50],
            [66, 106],
            [106, 106],
            [106, 50],
            [146, 50],
            [146, 106],
            [184, 106],
          ]),
        width: 2,
      };
    case 2: {
      // the structured zone: a short run of sub-wavelength features
      const r: string[] = [];
      for (let k = 0; k < 11; k++) {
        const x = 74 + k * 9;
        r.push(line([[x, 52], [x, 104]]));
      }
      return { d: r.join(" "), width: 1 };
    }
    case 3: {
      // interdigitated fingers, alternating from each side of a pair of buses
      const f: string[] = [line([[62, 48], [180, 48]]), line([[62, 108], [180, 108]])];
      for (let k = 0; k < 9; k++) {
        const x = 68 + k * 13;
        f.push(line([[x, k % 2 ? 48 : 108], [x, k % 2 ? 92 : 64]]));
      }
      return { d: f.join(" "), width: 1.15 };
    }
    case 4: {
      // a row of reference patches — known values carried on the card itself
      const p: string[] = [];
      for (let k = 0; k < 5; k++) {
        const x = 60 + k * 27;
        p.push(line([[x, 54], [x + 19, 54], [x + 19, 100], [x, 100], [x, 54]]));
      }
      return { d: p.join(" "), width: 1 };
    }
    default: {
      // a coded mark, deliberately abstract: no readable text, no real number
      const bars = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1];
      let x = 60;
      const b: string[] = [];
      for (const wd of bars) {
        b.push(line([[x, 56], [x, 102]]));
        x += wd * 3 + 6;
      }
      return { d: b.join(" "), width: 1.8 };
    }
  }
}

export function CardAssembly({
  tone = "ink",
  /** 0 = assembled into one card, 1 = fully apart. */
  spread = 1,
}: {
  tone?: "ink" | "signal";
  spread?: number;
}) {
  // The occluder has to be the surface the drawing sits on, not `currentColor`,
  // which is the ink. Both are CSS variables so the plate follows the theme.
  const bg = tone === "signal" ? "var(--void)" : "var(--paper)";

  // Layer 0 sits highest, so it is drawn last: a plate nearer the eye paints
  // over the one behind it.
  const order = LAYERS.map((_, i) => i).reverse();

  return (
    <Diagram
      tone={tone}
      height={450}
      label="Figure — cartridge assembly"
      title="The cartridge as an assembly, drawn apart"
      description="An axonometric drawing of the cartridge with its six layers separated vertically, each a flat plate with visible thickness. From the top: a sample entry layer carrying a port and a vent; a microfluidics layer with one routed channel; a structured optics layer whose face carries a short run of sub-wavelength features; an electrode layer drawn as interdigitated fingers between two buses; a reference layer drawn as a row of patches; and an identity layer drawn as a coded mark. A leader runs from each plate out to its name at the right."
      caption="Six functions, one disposable. Drawn apart so the stack is visible; in the hand it is a card a couple of millimetres thick."
    >
      <g data-assembly>
        {order.map((i) => {
          // Each plate runs on its own clock, so `spread` here is the whole
          // drawing's progress and every intermediate value renders exactly what
          // the scroll scene shows at that point.
          const p = assemblyLayerProgress(i, spread);
          const z = layerZ(i, assemblyLayerSpread(i, spread));
          const annot = assemblyLabelOpacity(p);
          const f = feature(i, z);
          const delay = i * 0.1;
          const [lx, ly] = iso(W, 0, z);
          return (
            <g key={LAYERS[i].name} data-layer={i}>
              {/* opaque first, so everything below this plate is hidden by it */}
              <path d={solid(z)} fill={bg} stroke="none" />
              <DgPath d={walls(z)} width={1.1} opacity={0.8} delay={delay} />
              <DgPath d={face(z)} width={1.5} fill={0.06} delay={delay} />
              <DgPath d={f.d} width={f.width} opacity={0.85} delay={delay + 0.08} />

              <g data-annot opacity={annot}>
                <DgPath
                  d={`M${lx.toFixed(1)} ${ly.toFixed(1)} L${LEADER_X} ${ly.toFixed(1)}`}
                  width={1}
                  opacity={0.32}
                  delay={delay}
                />
                <DgLabel x={LABEL_X} y={ly - 3} anchor="start" delay={delay}>
                  {LAYERS[i].name.toUpperCase()}
                </DgLabel>
                <DgLabel x={LABEL_X} y={ly + 15} anchor="start" delay={delay} dim>
                  {LAYERS[i].note}
                </DgLabel>
              </g>
            </g>
          );
        })}
      </g>
    </Diagram>
  );
}
