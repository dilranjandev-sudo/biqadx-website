import { Diagram, DgLabel, DgPath } from "./Diagram";

/**
 * Why there is a family of cartridges, not one universal card.
 *
 * Different assays need different anticoagulants and chemistries, so METACARD is a
 * controlled family — but every member shares one reader interface. The drawing
 * makes that the whole point: three distinct cards converging on a single
 * interface. It is the page's answer to the tempting, unsafe idea of one card for
 * everything.
 *
 * Probe a family to see the workflow it is built for.
 */

const CARD_CX = 156;
const CARD_W = 128;
const CARD_H = 54;
const READER_X = 512;
const READER_W = 214;
const READER_Y = 60;
const READER_H = 150;

const FAMILIES = [
  { name: "METACARD-H", full: "Heparin workflows", cy: 62 },
  { name: "METACARD-E", full: "EDTA workflows", cy: 135 },
  { name: "METACARD-C", full: "Citrate workflows", cy: 208 },
];

/** A card with a keyed corner, centred at (cx, cy). */
function card(cx: number, cy: number) {
  const x = cx - CARD_W / 2;
  const y = cy - CARD_H / 2;
  return (
    `M${x + 10} ${y} L${x + CARD_W} ${y} L${x + CARD_W} ${y + CARD_H} ` +
    `L${x} ${y + CARD_H} L${x} ${y + 10} Z`
  );
}

export function CartridgeFamilies({ tone = "ink" }: { tone?: "ink" | "signal" }) {
  const readerCx = READER_X + READER_W / 2;
  const readerCy = READER_Y + READER_H / 2;
  return (
    <Diagram
      tone={tone}
      height={270}
      interactive
      label="Figure — one interface, a family of cards"
      title="A controlled cartridge family sharing one reader interface"
      description="On the left, three distinct cartridges are drawn stacked: METACARD-H for heparin workflows, METACARD-E for EDTA workflows and METACARD-C for citrate workflows. A leader runs from each to a single tall box on the right marked one reader interface, so all three converge on the same instrument. The point is that the cards differ by chemistry while the interface stays constant."
      caption="Different assays need different anticoagulants and chemistries, so METACARD is a controlled family — METACARD-H, -E and -C — not one universal card. Every member shares a single reader interface, so the analyzer stays constant while the cartridge changes."
    >
      {/* One reader interface, shared */}
      <DgPath
        d={`M${READER_X} ${READER_Y} L${READER_X + READER_W} ${READER_Y} L${READER_X + READER_W} ${READER_Y + READER_H} L${READER_X} ${READER_Y + READER_H} Z`}
        width={1.8}
        fill={0.1}
        delay={0.7}
      />
      <DgLabel x={readerCx} y={readerCy - 6} delay={0.8}>
        ONE READER
      </DgLabel>
      <DgLabel x={readerCx} y={readerCy + 14} delay={0.8}>
        INTERFACE
      </DgLabel>

      {FAMILIES.map((f, i) => {
        const d = 0.15 + i * 0.14;
        return (
          <g key={f.name} className="dg-probe">
            <g className="dg-detail">
              <DgLabel x={CARD_CX} y={f.cy + CARD_H / 2 + 18} dim>
                {f.full}
              </DgLabel>
            </g>
            <DgPath d={card(CARD_CX, f.cy)} width={1.5} fill={0.06} delay={d} />
            <DgLabel x={CARD_CX} y={f.cy + 5} delay={d + 0.05}>
              {f.name}
            </DgLabel>
            {/* leader converging on the shared interface */}
            <DgPath
              d={`M${CARD_CX + CARD_W / 2} ${f.cy} L${READER_X} ${readerCy}`}
              width={1}
              opacity={0.4}
              delay={d + 0.08}
            />
            <DgPath
              d={`M${READER_X - 10} ${readerCy - 4} L${READER_X} ${readerCy} L${READER_X - 10} ${readerCy + 4}`}
              width={1}
              opacity={0.4}
              delay={d + 0.08}
            />
          </g>
        );
      })}
    </Diagram>
  );
}
