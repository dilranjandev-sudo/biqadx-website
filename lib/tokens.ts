// Design tokens as TS constants (for canvas/SVG/Three.js where CSS vars can't reach).
// The CSS custom properties in app/globals.css are the source for DOM styling;
// keep these in sync with that file.

export const colors = {
  void: "#0B0E14",
  graphite: "#1A1F2B",
  paper: "#F5F3EE",
  signal: "#E8ECEF",
  ink: "#0B0E14",
  // Prism accent — reserved for light-refraction moments only (beam, edge glow,
  // active-zone highlight). Never a flat fill, never buttons/nav.
  prism: ["#6EE7F0", "#A78BFA", "#F2C879"] as [string, string, string],
} as const;

export const prismGradient = `linear-gradient(120deg, ${colors.prism[0]} 0%, ${colors.prism[1]} 50%, ${colors.prism[2]} 100%)`;
