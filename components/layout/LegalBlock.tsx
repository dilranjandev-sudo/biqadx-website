import Link from "next/link";
import { stage, footer } from "@/lib/copy";

/** Footer legal: short development-stage disclaimer + entity line + link to the
 *  full disclaimer. Required on every page (master §1, Appendix A). */
export function LegalBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`max-w-4xl ${className}`}>
      <p className="font-mono text-[0.66rem] leading-relaxed text-signal/60">
        {stage.shortDisclaimer}
      </p>
      <p className="mt-3 font-mono text-[0.66rem] leading-relaxed text-signal/60">
        {footer.entity}{" "}
        <Link
          href={footer.disclaimerHref}
          className="underline decoration-signal/30 underline-offset-2 transition-colors hover:text-signal"
        >
          Full development-stage disclaimer
        </Link>
      </p>
    </div>
  );
}
