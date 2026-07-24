import { Diagram, DgLabel, DgPath } from "./Diagram";

/**
 * The references the card carries on itself.
 *
 * Quality does not come only from the analyzer — the card brings its own known
 * values, so a run can check itself. The drawing places each reference where it
 * lives on the card and lets you probe what it guards against. It pairs with the
 * evidence ladder: the ladder says how high a claim may stand, this shows the
 * on-card machinery that keeps a single run honest.
 *
 * Compliance: these are reference and control zones, not readings. Nothing here is
 * a result.
 */

const CARD_X = 96;
const CARD_Y = 42;
const CARD_W = 608;
const CARD_H = 150;
const LABEL_Y = 238;

const ZONES = [
  { k: "Intensity", full: "Corrects illumination drift", x: 176 },
  { k: "Wavelength", full: "Verifies wavelength registration", x: 300 },
  { k: "Fiducials", full: "Position, focus, registration", x: 410 },
  { k: "Electrical", full: "Open, short, known-impedance", x: 520 },
  { k: "Controls", full: "Positive, negative, procedural", x: 628 },
];

/** The small mark for each reference, drawn in place on the card. */
function mark(i: number, x: number): string {
  switch (i) {
    case 0: // intensity — a graded patch
      return `M${x - 26} 84 L${x + 26} 84 L${x + 26} 112 L${x - 26} 112 Z`;
    case 1: // wavelength — a short run of ticks
      return Array.from({ length: 6 }, (_, k) => {
        const tx = x - 22 + k * 9;
        return `M${tx} 138 L${tx} 162`;
      }).join(" ");
    case 2: // fiducials — a registration cross
      return `M${x - 14} 96 L${x + 14} 96 M${x} 82 L${x} 110`;
    case 3: // electrical — two contact pads
      return `M${x - 24} 138 L${x - 4} 138 L${x - 4} 160 L${x - 24} 160 Z ` +
        `M${x + 4} 138 L${x + 24} 138 L${x + 24} 160 L${x + 4} 160 Z`;
    default: // controls — a row of small wells (explicit two-arc circles: the
      // compact `a r r 0 1 0 0.01 0` form is degenerate and renders blank in some
      // rasterisers)
      return Array.from({ length: 3 }, (_, k) => {
        const cx = x - 18 + k * 18;
        const cy = 98;
        const r = 6;
        return `M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} A${r} ${r} 0 1 0 ${cx} ${cy - r} Z`;
      }).join(" ");
  }
}

const markY = (i: number) => (i === 1 || i === 3 ? 150 : 98);

export function OnCardReferences({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  return (
    <Diagram
      tone={tone}
      height={270}
      interactive
      label="Figure — on-card references"
      title="The reference and control zones the card carries"
      description="A plan view of the cartridge as a rounded rectangle carrying five marked reference zones: an intensity reference drawn as a graded patch; a wavelength reference drawn as a run of ticks; geometric fiducials drawn as a registration cross; electrical references drawn as two contact pads; and internal assay controls drawn as a row of wells. A leader runs from each down to its name beneath the card. Each is a reference or control, not a reading."
      caption="The card carries its own known values — intensity, wavelength, geometric, electrical references and internal controls — so a single run can check itself. It is the on-card half of quality; the evidence ladder is the other."
    >
      {/* The card, in plan */}
      <DgPath
        d={`M${CARD_X + 16} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y} L${CARD_X + CARD_W} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + CARD_H} L${CARD_X} ${CARD_Y + 16} Z`}
        width={1.6}
        fill={0.05}
      />
      <DgLabel x={CARD_X + CARD_W - 14} y={CARD_Y + 24} anchor="end" delay={1.0} dim>
        METACARD
      </DgLabel>

      {ZONES.map((z, i) => {
        const d = 0.2 + i * 0.12;
        const my = markY(i);
        return (
          <g key={z.k} className="dg-probe">
            <g className="dg-detail">
              <DgLabel x={z.x} y={LABEL_Y + 18} dim>
                {z.full}
              </DgLabel>
            </g>
            <DgPath d={mark(i, z.x)} width={1.3} opacity={0.85} fill={i === 0 ? 0.12 : undefined} delay={d} />
            {/* leader down to the label */}
            <DgPath d={`M${z.x} ${my + 22} L${z.x} ${LABEL_Y - 12}`} width={1} opacity={0.32} delay={d} />
            <DgLabel x={z.x} y={LABEL_Y} delay={d + 0.05}>
              {z.k.toUpperCase()}
            </DgLabel>
          </g>
        );
      })}
    </Diagram>
  );
}
