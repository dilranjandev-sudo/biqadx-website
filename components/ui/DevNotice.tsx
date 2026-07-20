import Link from "next/link";
import { stage, footer } from "@/lib/copy";

/** R&D-stage notice required on product/technology pages (master §1, Appendix A):
 *  a short stage statement linking to the full development-stage disclaimer.
 *  `tone` matches the surface it sits on. */
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
      className={`rounded-lg border px-4 py-3 ${
        dark
          ? "border-[var(--border-dark)] bg-graphite/60"
          : "border-[var(--border-light)] bg-black/[0.03]"
      } ${className}`}
    >
      <p
        className={`font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.13em] ${
          dark ? "text-signal/60" : "text-ink/60"
        }`}
      >
        {stage.notice}{" "}
        <Link
          href={footer.disclaimerHref}
          className={`underline underline-offset-2 ${dark ? "hover:text-signal" : "hover:text-ink"}`}
        >
          Read the disclaimer
        </Link>
      </p>
    </div>
  );
}
