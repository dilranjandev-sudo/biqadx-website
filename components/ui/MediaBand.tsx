import Image from "next/image";

/** Full-width image band (Void-toned) used to drop a concept render / photo into
 *  a page. Keeps captions compliant ("Illustrative — …"). */
export function MediaBand({
  src,
  alt,
  width,
  height,
  caption,
  max = "max-w-4xl",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  max?: string;
}) {
  return (
    <section className="bg-void">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16">
        <figure>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 900px, 100vw"
            className={`mx-auto w-full ${max} rounded-xl border border-[var(--border-dark)]`}
          />
          {caption && (
            <figcaption className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
