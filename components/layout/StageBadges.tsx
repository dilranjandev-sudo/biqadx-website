import { stage } from "@/lib/copy";

/** Four footer stage badges — mono, plain text, no icons. Required on every
 *  page including legal/utility/404 (brief §4, §7). */
export function StageBadges({ className = "" }: { className?: string }) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 ${className}`}
      aria-label="Development stage"
    >
      {stage.badges.map((badge, i) => (
        <li
          key={badge}
          className="flex items-center font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60"
        >
          {i > 0 && (
            <span aria-hidden="true" className="mr-3 text-signal/25">
              ·
            </span>
          )}
          {badge}
        </li>
      ))}
    </ul>
  );
}
