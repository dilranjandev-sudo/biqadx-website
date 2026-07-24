import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * Shared frame for the site's line diagrams.
 *
 * Every visual on this site was a photograph, and a photograph of a bench cannot
 * show structure — which is precisely what needs explaining here: how light is
 * shaped at a surface, how a card and a reader form one optical path, why an
 * invalid run yields no number. These diagrams carry that load.
 *
 * Two rules make one drawing work everywhere:
 *
 * 1. **Colour comes from `currentColor`.** The subpages are Paper and the home
 *    page is Void, so a diagram with baked-in stroke colours would be invisible
 *    on one of them. The frame sets a text colour and every stroke inherits it.
 *    The prism gradient is the single exception, and only where the drawing is
 *    literally showing light — which is the one use the design rules allow.
 *
 * 2. **The drawing is finished by default.** Motion is added by ScrollReveal,
 *    which only arms the hidden state when it knows it can play it back. A
 *    diagram that never animates is just a diagram.
 *
 * The SVG is labelled rather than decorative: it is carrying an explanation, so
 * it gets a role, an accessible name, and a longer description that says in words
 * what the drawing says in lines.
 */
export function Diagram({
  label,
  title,
  description,
  caption,
  tone = "ink",
  height = 300,
  interactive = false,
  children,
}: {
  /** Short mono label, e.g. "Figure 01". */
  label?: string;
  /** Accessible name for the drawing. */
  title: string;
  /** What the drawing shows, in words, for anyone who cannot see it. */
  description: string;
  /** Printed under the drawing. */
  caption?: string;
  tone?: "ink" | "signal";
  /** viewBox height. Width is always 800, so drawings share one scale. */
  height?: number;
  /** Marks the drawing probeable: a crosshair cursor, and `.dg-probe` parts
   *  respond to the pointer (see `.dg-interactive` in globals.css). */
  interactive?: boolean;
  children: ReactNode;
}) {
  // Pattern ids are document-global, so two drawings on one page would collide
  // on a fixed one. Derived from the title, which is already unique per drawing.
  const gridId = `dg-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const t =
    tone === "signal"
      ? { text: "text-signal", rule: "bg-signal/25", muted: "text-signal/70" }
      : { text: "text-ink", rule: "bg-ink/20", muted: "text-ink/65" };

  return (
    <figure className={`${t.text} not-prose`}>
      {label && (
        <div className="mb-4 flex items-center gap-4">
          <span className={`font-mono text-[0.6rem] tracking-[0.16em] ${t.muted}`}>
            {label}
          </span>
          <span aria-hidden="true" className={`h-px w-10 ${t.rule}`} />
        </div>
      )}

      <ScrollReveal variant="draw">
        {/* The drawing keeps a floor width and scrolls sideways below it rather
            than scaling down with the viewport. Text inside an SVG scales with
            the viewBox, so a full-width fit on a 343px phone would render these
            labels at about 5px — unreadable. The container scrolls; the page
            never does. */}
        {/* No border. The drafting grid already reads as a sheet, and a framed
            box made the drawing look like a component dropped onto the page
            rather than a plate printed on it. `overflow-x-auto` stays: it is
            what lets the drawing keep its floor width on a narrow screen. */}
        <div className="-mx-1 overflow-x-auto px-1 py-2 sm:py-4">
          <svg
            role="img"
            aria-label={title}
            viewBox={`0 0 800 ${height}`}
            className={`h-auto w-full${interactive ? " dg-interactive" : ""}`}
            style={{ minWidth: 560 }}
            fill="none"
            // Strokes and text both key off this, so the whole drawing follows
            // the surface it is placed on.
            stroke="currentColor"
          >
            <desc>{description}</desc>

            {/* A drafting grid, barely there. Without it the drawings floated in
                an empty rectangle and read as generated rather than drawn; with
                it they sit on a sheet, which is what they are. Kept well under
                the lightest construction line so it never competes — and outside
                the reveal, since a grid that draws itself on would be a gimmick. */}
            <defs>
              <pattern
                id={`${gridId}-minor`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M20 0 L0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.07"
                  strokeWidth="0.6"
                />
              </pattern>
            </defs>
            <rect
              width="800"
              height={height}
              fill={`url(#${gridId}-minor)`}
              stroke="none"
            />

            {children}
          </svg>
        </div>
      </ScrollReveal>

      {caption && (
        <figcaption className={`mt-3 font-body text-sm leading-relaxed ${t.muted}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Mono label inside a drawing, at the drawing's own scale. */
export function DgLabel({
  x,
  y,
  children,
  anchor = "middle",
  dim = false,
  delay,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  dim?: boolean;
  /** Seconds, staggered against the rest of the drawing. */
  delay?: number;
}) {
  return (
    <text
      data-draw-fade
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      stroke="none"
      opacity={dim ? 0.62 : 0.92}
      className="font-mono"
      // Labels are written upper-case at the call site rather than transformed
      // here: `text-transform` is honoured unevenly in SVG, and a label that
      // silently falls back to sentence case breaks the drawing's register.
      style={
        {
          fontSize: 15,
          letterSpacing: "0.05em",
          ...(delay ? { "--dg-delay": `${delay}s` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </text>
  );
}

/**
 * Every stroke is drawn this much heavier than its nominal weight.
 *
 * The drawings are authored in an 800-unit space but displayed at 560–1100 CSS
 * pixels, so a nominal 1.25 line was reaching the screen at well under a pixel
 * and being resolved as grey rather than as a line. The relative hierarchy the
 * drawings were authored with is worth keeping, so it is scaled rather than
 * re-tuned path by path.
 */
const STROKE = 1.55;

/**
 * A short highlight that runs the length of a path once the drawing has settled.
 *
 * Decorative only, and deliberately fragile in the safe direction: the element
 * is `opacity="0"` as a presentation attribute, which the keyframes override and
 * nothing else does. No animation, no highlight — and the drawing underneath is
 * already complete without it. See `[data-draw-run]` in globals.css.
 */
export function DgRunner({
  d,
  width = 2.6,
  stroke,
  delay,
  /** Fraction of the path the highlight covers. */
  length = 0.14,
}: {
  d: string;
  width?: number;
  stroke?: string;
  delay?: number;
  length?: number;
}) {
  return (
    <path
      data-draw-run
      d={d}
      pathLength={1}
      opacity={0}
      style={delay ? ({ "--dg-delay": `${delay}s` } as React.CSSProperties) : undefined}
      stroke={stroke ?? "currentColor"}
      strokeWidth={width * STROKE}
      strokeDasharray={`${length} ${1 - length}`}
      strokeLinecap="round"
      fill="none"
    />
  );
}

/** A drawn stroke. `pathLength` is normalised so one dash rule fits every path. */
export function DgPath({
  d,
  width = 1.25,
  opacity = 1,
  dash,
  stroke,
  delay,
  fill,
}: {
  d: string;
  width?: number;
  opacity?: number;
  /** A statically dashed line — construction lines, boundaries. */
  dash?: string;
  stroke?: string;
  /** Seconds, so a stack or a sequence can arrive a piece at a time. */
  delay?: number;
  /** Tint the enclosed area. Gives a closed shape some weight, so a drawing
   *  reads as objects on a sheet rather than as a wireframe. */
  fill?: number;
}) {
  const style = delay
    ? ({ "--dg-delay": `${delay}s` } as React.CSSProperties)
    : undefined;

  // A path that is meant to look dashed cannot also be drawn on with a dash
  // animation, so those are faded in instead.
  return (
    <>
      {/* The tint is a second, separate path. On one element the fill would be
          painted in full while the outline was still drawing itself on, so a
          shape appeared before its own edges — the fill fades in behind the
          finished outline instead. */}
      {fill ? (
        <path
          data-draw-fade
          d={d}
          style={style}
          fill="currentColor"
          fillOpacity={fill}
          stroke="none"
        />
      ) : null}
      <path
        {...(dash ? { "data-draw-fade": "" } : { "data-draw": "", pathLength: 1 })}
        d={d}
        style={style}
        stroke={stroke ?? "currentColor"}
        strokeWidth={width * STROKE}
        strokeOpacity={opacity}
        strokeDasharray={dash}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        // Deliberately NOT `vector-effect: non-scaling-stroke`. The labels scale
        // with the viewBox, so strokes that refused to would make the drawing
        // change proportion with the viewport — and it silently flattens a
        // gradient stroke to its last stop in some renderers.
      />
    </>
  );
}
