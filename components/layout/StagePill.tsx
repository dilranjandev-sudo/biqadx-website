import { stage } from "@/lib/copy";

/** Mono stage pill — required in nav on every page (brief §4, §7). */
export function StagePill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[var(--border-dark)] px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/75 ${className}`}
    >
      {stage.pill}
    </span>
  );
}
