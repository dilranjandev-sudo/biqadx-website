"use client";

import { useEffect, useRef } from "react";
import { motionDisabled } from "@/lib/motion";
import { colors } from "@/lib/tokens";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

const STOPS = colors.prism.map(hexToRgb);

function prismAt(x: number): [number, number, number] {
  // Interpolate cyan -> violet -> amber across x in [0,1].
  const t = Math.min(1, Math.max(0, x));
  const [a, b] = t < 0.5 ? [STOPS[0], STOPS[1]] : [STOPS[1], STOPS[2]];
  const k = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  return [
    Math.round(a[0] + (b[0] - a[0]) * k),
    Math.round(a[1] + (b[1] - a[1]) * k),
    Math.round(a[2] + (b[2] - a[2]) * k),
  ];
}

/**
 * Animated metasurface: a lattice of nanostructure cells that shimmer through
 * the Prism gradient as a band of light sweeps across — structural colour,
 * illustrative. Canvas + rAF; renders a single static frame under
 * reduced-motion / ?static=1. This is a code visual — no external asset or MCP.
 */
export function Metasurface({
  className = "",
  ratio = "4/3",
  label = "Illustrative animation of a nanostructured surface: a lattice of cells shimmering through cyan, violet and amber as a band of light sweeps across, showing structural colour.",
}: {
  className?: string;
  ratio?: string;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let cell = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      W = canvas.width = Math.floor(rect.width * dpr);
      H = canvas.height = Math.floor(rect.height * dpr);
      cell = Math.max(12, Math.floor(rect.width / 24)) * dpr;
      cols = Math.ceil(W / cell) + 1;
      rows = Math.ceil(H / cell) + 1;
    };

    const draw = (band: number) => {
      ctx.fillStyle = colors.graphite;
      ctx.fillRect(0, 0, W, H);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell + cell / 2;
          const y = j * cell + cell / 2;
          const nx = W ? x / W : 0;
          // Diagonal sweeping band; cells near it glow.
          const d = Math.abs(nx + (H ? (y / H) * 0.16 : 0) - band);
          const glow = Math.max(0, 1 - d / 0.16);
          const base = 0.09 + 0.05 * Math.sin(i * 0.6 + j * 0.5);
          const [r, g, b] = prismAt(nx);
          const radius = cell * 0.15 * (1 + glow * 1.5);
          const alpha = Math.min(1, base + glow * 0.9);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }
    };

    resize();
    const reduce = motionDisabled();

    let raf = 0;
    let t = 0;
    const onResize = () => {
      resize();
      if (reduce) draw(0.5);
    };

    // Paint one frame synchronously so the canvas is never blank (rAF can be
    // delayed/throttled, especially on the first frame).
    draw(reduce ? 0.5 : 0);
    if (!reduce) {
      const loop = () => {
        t += 0.004;
        draw(t % 1);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--border-dark)] ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
