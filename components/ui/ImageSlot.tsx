import Image from "next/image";
import { getImage } from "@/lib/images";

type ImageSlotProps = {
  /** Manifest id in lib/images.ts. Renders a placeholder until populated. */
  id: string;
  /** Required descriptive alt text (also shown as the placeholder label). */
  alt: string;
  /** Aspect ratio, e.g. "16/9", "4/3", "1/1". */
  ratio?: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Renders a generated image when the manifest has one, otherwise an accessible,
 *  on-brand placeholder. Lets pages build cleanly before imagery exists (step 5).
 *  Compliance: device/card imagery must carry an "Illustrative — in development"
 *  caption; pass it via `caption` or set it on the manifest entry (brief §7). */
export function ImageSlot({
  id,
  alt,
  ratio = "16/9",
  caption,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: ImageSlotProps) {
  const asset = getImage(id);
  const shownCaption = caption ?? asset?.caption;

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite"
        style={{ aspectRatio: ratio }}
      >
        {/* Prism edge glow — an allowed light-refraction accent. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "var(--prism-gradient)", opacity: 0.6 }}
        />
        {asset ? (
          <Image
            src={asset.src}
            alt={asset.alt || alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-6">
            <span className="text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal/40">
              {alt}
            </span>
          </div>
        )}
      </div>
      {shownCaption && (
        <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-signal/40">
          {shownCaption}
        </figcaption>
      )}
    </figure>
  );
}
