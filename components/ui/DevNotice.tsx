import Link from "next/link";
import { stage, footer } from "@/lib/copy";

/**
 * R&D-stage notice, required on product/technology pages (master §1, Appendix A):
 * a short stage statement linking to the full development-stage disclaimer.
 *
 * Set as a quiet footnote under a hairline rather than as a bordered callout box.
 * It has to appear on every page, so it should read as the standing footnote it
 * is instead of competing with the page — the boxed, uppercase-mono treatment
 * made a legal footnote look like an alert, on every page, twice.
 *
 * The wording and the link are compliance copy and must not be dropped or
 * reworded. `tone` matches the surface it sits on.
 */
export function DevNotice({
  tone = "paper",
  className = "",
}: {
  tone?: "paper" | "void";
  className?: string;
}) {
  const dark = tone === "void";
  return (
    <div
      role="note"
      className={`border-t pt-5 ${
        dark ? "border-[var(--border-dark)]" : "border-[var(--border-light)]"
      } ${className}`}
    >
      <p
        className={`max-w-3xl font-body text-xs leading-relaxed ${
          dark ? "text-signal/60" : "text-ink/65"
        }`}
      >
        {stage.notice}{" "}
        <Link
          href={footer.disclaimerHref}
          className={`underline underline-offset-2 transition-colors ${
            dark ? "hover:text-signal" : "hover:text-ink"
          }`}
        >
          Read the disclaimer
        </Link>
      </p>
    </div>
  );
}
