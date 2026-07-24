import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection } from "@/components/ui/PaperSection";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ARTICLES, type Article } from "@/content/insights";
import { getImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research-stage perspectives on metasurface diagnostics, cartridge engineering, measurement quality, decentralized healthcare and responsible deep-tech development.",
};

const PUBLISHED = ARTICLES.filter((a) => a.status === "published");
const FEATURED = PUBLISHED[0];
// Everything after the featured piece, published first, then the rest.
const REST = ARTICLES.filter((a) => a.slug !== FEATURED?.slug);

/** An image tile: the picture fills, the title sits on it under a scrim. Maximally
 *  visual — almost no standalone text. Published tiles link and lift; in-prep
 *  tiles dim and carry a tag, so nothing unfinished pretends to be ready. */
function Card({ article, delay }: { article: Article; delay: number }) {
  const img = article.hero ? getImage(article.hero) : undefined;
  const published = article.status === "published";

  const inner = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-graphite">
      {img ? (
        <Image
          src={img.src}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
          className={`object-cover ${
            published
              ? "transition-transform duration-500 group-hover:scale-[1.05]"
              : "opacity-45"
          }`}
        />
      ) : null}
      {/* scrim so the title clears AA on any frame */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.15) 0%, rgba(11,14,20,0) 30%, rgba(11,14,20,0.55) 62%, rgba(11,14,20,0.92) 100%)",
        }}
      />
      {!published && (
        <span className="absolute left-3 top-3 rounded-full bg-void/70 px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-signal/80 backdrop-blur">
          In preparation
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-signal/70">
          {article.category}
          {published && article.minutes ? ` · ${article.minutes} min` : ""}
        </p>
        <h3
          className={`mt-2 font-display text-base font-bold leading-snug tracking-tight ${
            published ? "text-signal" : "text-signal/70"
          }`}
        >
          {article.title}
        </h3>
      </div>
    </div>
  );

  return (
    <ScrollReveal delay={delay} className="block">
      {published ? (
        <Link href={`/insights/${article.slug}`} className="group block">
          {inner}
        </Link>
      ) : (
        <div>{inner}</div>
      )}
    </ScrollReveal>
  );
}

export default function InsightsPage() {
  const featImg = FEATURED?.hero ? getImage(FEATURED.hero) : undefined;

  return (
    <>
      <PageHero
        kicker="Insights & Research"
        title="The science, without the hype."
        image="insights-desk"
      >
        What is established, what we are targeting, and the difference.
      </PageHero>

      <PaperSection>
        {/* Featured — one wide, image-led piece leads the page */}
        {FEATURED && (
          <ScrollReveal className="block">
            <Link
              href={`/insights/${FEATURED.slug}`}
              className="group relative flex min-h-[52svh] items-end overflow-hidden rounded-2xl bg-graphite"
            >
              {featImg ? (
                <Image
                  src={featImg.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              ) : null}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,14,20,0.2) 0%, rgba(11,14,20,0) 30%, rgba(11,14,20,0.5) 60%, rgba(11,14,20,0.92) 100%)",
                }}
              />
              <div className="relative max-w-2xl p-7 sm:p-10">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal/75">
                  Featured · {FEATURED.category}
                  {FEATURED.minutes ? ` · ${FEATURED.minutes} min` : ""}
                </p>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-signal sm:text-4xl">
                  {FEATURED.title}
                </h2>
                <p className="mt-4 max-w-md font-body leading-relaxed text-signal/85">
                  {FEATURED.dek}
                </p>
                <span className="mt-6 inline-block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/75 group-hover:text-signal">
                  Read the article →
                </span>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* The rest — a clean visual grid */}
        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {REST.map((a, i) => (
            <Card key={a.slug} article={a} delay={(i % 3) * 0.06} />
          ))}
        </div>
      </PaperSection>
    </>
  );
}
