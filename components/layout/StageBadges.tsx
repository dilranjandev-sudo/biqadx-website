import { stage } from "@/lib/copy";

/** Four footer stage badges — mono, plain text in bordered chips, no icons.
 *  Required on every page including legal/utility/404 (brief §4, §7).
 *
 *  Set as chips rather than a middot-separated run: each stage reads as its own
 *  discrete label, which is what they are, and the form matches the chip rows the
 *  rest of the site already uses. Still plain text, still no pictographs. */
export function StageBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap gap-2 ${className}`}
      aria-label="Development stage"
    >
      {stage.badges.map((badge) => (
        <li
          key={badge}
          className="rounded-full border border-signal/20 bg-signal/[0.04] px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/75"
        >
          {badge}
        </li>
      ))}
    </ul>
  );
}
