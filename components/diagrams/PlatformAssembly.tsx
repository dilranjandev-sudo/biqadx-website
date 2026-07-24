import { Diagram, DgLabel, DgPath } from "./Diagram";

/**
 * The platform as three parts of one system, drawn together and pulled apart.
 *
 * Home names METACARD, OMEGA-PRO and UDOS separately but never shows that they
 * are one thing. This does: assembled they read as a single unit; scrolled, they
 * separate into the card that does part of the measurement, the analyzer that
 * reads it, and the software that decides whether a number may be released — each
 * labelled with its role as it settles. It is the anime.js "one object comes
 * apart, its parts named over it" treatment, applied to the argument the whole
 * company rests on.
 *
 * Like the other scenes it renders finished on the server and moves under one
 * scrolled value: the projection is flat, so each part's whole motion is a single
 * horizontal translate, and the scene writes three transforms and three
 * opacities per frame.
 */

const CENTER = 400;
const CY = 150;
/** Assembled centres — the three parts touching as one bar. */
const ASSEMBLED = [232, 392, 556];
/** How far the parts fan out from the group centre at full spread. */
const SPREAD = 0.52;

export const PLATFORM_PARTS = 3;

/** Centre x of part `i` at overall progress `t`. */
function partCx(i: number, t: number) {
  return CENTER + (ASSEMBLED[i] - CENTER) * (1 + SPREAD * t);
}

/** Screen shift of part `i` at `t`, measured against its rendered (t = 1) place. */
export function platformOffset(i: number, t: number) {
  return partCx(i, t) - partCx(i, 1);
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// All three names sit on one line under the tallest block, not each under its own
// — three labels at three heights read as a staircase, not a row.
const LABEL_NAME_Y = 262;
const LABEL_ROLE_Y = 280;

/** A part's name and role arrive as it separates, staggered left to right. */
export function platformLabelOpacity(i: number, t: number) {
  const start = 0.35 + i * 0.16;
  return clamp01((t - start) / 0.2);
}

const rrect = (cx: number, cy: number, w: number, h: number, r: number) => {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    `M${x + r} ${y} L${x + w - r} ${y} Q${x + w} ${y} ${x + w} ${y + r} ` +
    `L${x + w} ${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} ` +
    `L${x + r} ${y + h} Q${x} ${y + h} ${x} ${y + h - r} ` +
    `L${x} ${y + r} Q${x} ${y} ${x + r} ${y} Z`
  );
};

/** Wrapper: places a part at its rendered spot and shifts it for the current `t`,
 *  with its label fading in as it separates. The scene overrides both at runtime;
 *  this keeps the server render (and the no-JS fallback) correct at any `t`. */
function Part({
  i,
  t,
  children,
  label,
}: {
  i: number;
  t: number;
  children: React.ReactNode;
  label: React.ReactNode;
}) {
  const dx = platformOffset(i, t);
  return (
    <g data-part={i} transform={`translate(${dx.toFixed(2)} 0)`}>
      {children}
      <g data-part-label={i} opacity={platformLabelOpacity(i, t)}>
        {label}
      </g>
    </g>
  );
}

/** METACARD — a thin card carrying the structured zone. */
function Metacard(t: number) {
  const cx = partCx(0, 1);
  const w = 116;
  const h = 74;
  const x = cx - w / 2;
  const ticks = Array.from({ length: 7 }, (_, k) => {
    const tx = cx - 28 + k * 9;
    return `M${tx} ${CY - 16} L${tx} ${CY + 16}`;
  }).join(" ");
  return (
    <Part
      i={0}
      t={t}
      label={
        <>
          <DgLabel x={cx} y={LABEL_NAME_Y}>METACARD</DgLabel>
          <DgLabel x={cx} y={LABEL_ROLE_Y} dim>Does part of the measurement</DgLabel>
        </>
      }
    >
      {/* keyed corner, so it reads as a cartridge with one orientation */}
      <DgPath
        d={`M${x + 10} ${CY - h / 2} L${x + w} ${CY - h / 2} L${x + w} ${CY + h / 2} L${x} ${CY + h / 2} L${x} ${CY - h / 2 + 10} Z`}
        width={1.5}
        fill={0.05}
      />
      {/* The structured zone drawn in the prism gradient — the one place on the
          whole scene where light is being structured, so it is the one place the
          colour belongs. Everything else stays line-drawing white. */}
      <DgPath d={ticks} width={1.5} stroke="url(#pa-prism)" />
      <DgPath d={ticks} width={1.5} opacity={0.25} />
    </Part>
  );
}

/** OMEGA-PRO — the analyzer, with a card slot and an optical head. */
function OmegaPro(t: number) {
  const cx = partCx(1, 1);
  const w = 188;
  const h = 150;
  return (
    <Part
      i={1}
      t={t}
      label={
        <>
          <DgLabel x={cx} y={LABEL_NAME_Y}>OMEGA-PRO</DgLabel>
          <DgLabel x={cx} y={LABEL_ROLE_Y} dim>Reads the card</DgLabel>
        </>
      }
    >
      <DgPath d={rrect(cx, CY, w, h, 12)} width={1.6} fill={0.05} />
      {/* one aperture and one card slot — the analyzer's whole job in two marks */}
      <circle cx={cx} cy={CY - 14} r={21} stroke="currentColor" strokeWidth={1.5} fill="none" />
      <DgPath d={`M${cx - 44} ${CY + 42} L${cx + 44} ${CY + 42}`} width={3} opacity={0.45} />
    </Part>
  );
}

/** UDOS — the software, drawn as conditions in series that gate an output. */
function Udos(t: number) {
  const cx = partCx(2, 1);
  const w = 150;
  const h = 104;
  const x = cx - w / 2;
  const gates = Array.from({ length: 2 }, (_, k) => {
    const gx = x + 44 + k * 34;
    return `M${gx - 8} ${CY - 8} h16 v16 h-16 Z`;
  }).join(" ");
  return (
    <Part
      i={2}
      t={t}
      label={
        <>
          <DgLabel x={cx} y={LABEL_NAME_Y}>UDOS</DgLabel>
          <DgLabel x={cx} y={LABEL_ROLE_Y} dim>Validity-gated output</DgLabel>
        </>
      }
    >
      <DgPath d={rrect(cx, CY, w, h, 12)} width={1.6} fill={0.05} />
      {/* conditions on a spine, then a validated output leaving to the right */}
      <DgPath d={`M${x + 26} ${CY} L${x + w - 22} ${CY}`} width={1.1} opacity={0.5} />
      <DgPath d={gates} width={1.2} opacity={0.85} />
      <DgPath
        d={`M${x + w - 30} ${CY - 5} L${x + w - 20} ${CY} L${x + w - 30} ${CY + 5}`}
        width={1.2}
        opacity={0.8}
      />
    </Part>
  );
}

export function PlatformAssembly({
  tone = "signal",
  /** 0 = one unit, 1 = three named parts. */
  t = 1,
}: {
  tone?: "ink" | "signal";
  t?: number;
}) {
  return (
    <Diagram
      tone={tone}
      height={300}
      label="Figure — one platform, three parts"
      title="The platform as three parts of one system"
      description="A schematic of the three parts of the platform, drawn apart. On the left a thin cartridge carrying a run of sub-wavelength features — the part that does part of the measurement. In the middle the analyzer, drawn with an optical head over a stage and a card slot on its front — the part that reads the card. On the right the software layer, drawn as three conditions in series feeding an output arrow — the part that releases a result only when every condition holds. Assembled the three touch as one unit; drawn apart, each is named with its role."
      caption="One platform, three parts: a cartridge that does part of the measurement, an analyzer that reads it, and software that releases a result only when it is valid."
    >
      <defs>
        <linearGradient id="pa-prism" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--prism-1)" />
          <stop offset="50%" stopColor="var(--prism-2)" />
          <stop offset="100%" stopColor="var(--prism-3)" />
        </linearGradient>
      </defs>
      {Metacard(t)}
      {OmegaPro(t)}
      {Udos(t)}
    </Diagram>
  );
}
