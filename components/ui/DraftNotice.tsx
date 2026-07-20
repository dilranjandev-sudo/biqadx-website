/** Visible marker for legal/utility pages whose wording is not yet counsel-reviewed
 *  (brief §6, §12). Never present unreviewed legal text as final. */
export function DraftNotice({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      className={`rounded-lg border border-[var(--border-light)] bg-black/[0.03] px-4 py-3 ${className}`}
    >
      <p className="font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.2em] text-ink/75">
        Draft — pending review by counsel before launch. This wording is not final
        and is not legal advice.
      </p>
    </div>
  );
}
