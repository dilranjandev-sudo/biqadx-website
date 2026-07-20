import { ImageSlot } from "./ImageSlot";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

/**
 * Full-bleed image band on the Void surface — the cinematic moment on an
 * otherwise dense page.
 *
 * Runs edge to edge rather than inside the content grid, because boxing it at
 * 1100px wasted the effect. Taller on a phone: 21:9 across 343px is a 147px
 * strip, which reads as a rule rather than as a photograph. Entered with a scan
 * wipe, matching Home. Shared so Platform and Company pages band identically.
 */
export function FigureBand({
  id,
  alt,
  caption,
  label,
  priority = false,
}: {
  id: string;
  alt: string;
  caption?: string;
  /** Short mono label set on the image, e.g. "Figure 02". */
  label?: string;
  priority?: boolean;
}) {
  return (
    <section className="bg-void py-10 sm:py-14">
      <div className="px-4 sm:px-6">
        <ScrollReveal variant="wipe">
          <ImageSlot
            id={id}
            alt={alt}
            frameClassName="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            caption={caption}
            label={label}
            overlay
            priority={priority}
            className="mx-auto max-w-[1600px]"
            sizes="100vw"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
