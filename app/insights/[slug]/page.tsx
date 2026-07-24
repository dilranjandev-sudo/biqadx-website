import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { PUBLISHED, getArticle, type Block } from "@/content/insights";
import { getImage } from "@/lib/images";

export function generateStaticParams() {
  return PUBLISHED.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArticle(params.slug);
  if (!a) return { title: "Insights" };
  return { title: a.title, description: a.dek };
}

/** Body blocks. Prose sits in a narrow reading column; figures and pull-quotes
 *  break out wider, the rhythm that keeps a long read from reading as a wall. */
function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mx-auto max-w-2xl">
      {blocks.map((b, i) => {
        if (b.kind === "figure") {
          return (
            <ScrollReveal
              key={i}
              variant="wipe"
              className="my-12 block sm:-mx-16 lg:-mx-28"
            >
              <ImageSlot
                id={b.image}
                alt={b.alt}
                ratio="16/9"
                caption={b.caption}
                sizes="(min-width: 1024px) 820px, 100vw"
              />
            </ScrollReveal>
          );
        }
        if (b.kind === "h") {
          return (
            <ScrollReveal key={i} className="mt-14 block">
              <h2 className="font-display text-xl font-bold leading-tight tracking-tight text-ink sm:text-2xl">
                {b.text}
              </h2>
            </ScrollReveal>
          );
        }
        if (b.kind === "pull") {
          return (
            <ScrollReveal key={i} className="my-12 block sm:-mx-10">
              <blockquote className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="diffract-rule absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[3px] rounded-full"
                />
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-[1.75rem]">
                  {b.text}
                </p>
              </blockquote>
            </ScrollReveal>
          );
        }
        if (b.kind === "list") {
          return (
            <ScrollReveal key={i} className="mt-6 block">
              <ul>
                {b.items.map((it, k) => (
                  <li
                    key={it}
                    className="flex gap-4 border-b border-ink/12 py-3 first:border-t"
                  >
                    <span className="font-mono text-[0.6rem] tracking-[0.16em] text-ink/55">
                      {String(k + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-[0.95rem] leading-relaxed text-ink/80">
                      {it}
                    </span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          );
        }
        return (
          <ScrollReveal key={i} className="mt-5 block">
            <p className="font-body text-[1.05rem] leading-relaxed text-ink/80">
              {b.text}
            </p>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const hero = article.hero ? getImage(article.hero) : undefined;
  const others = PUBLISHED.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="bg-paper text-ink">
      <ReadingProgress />

      {/* Magazine hero: the lead image full-bleed, the title over a scrim at the
          foot of it. The scrim is sized and weighted so the title clears AA on
          any frame — the same lesson the subpage heroes learned. */}
      <header className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-void">
        {hero ? (
          <>
            <Image
              src={hero.src}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,14,20,0.55) 0%, rgba(11,14,20,0.1) 35%, rgba(11,14,20,0.35) 62%, rgba(11,14,20,0.92) 100%)",
              }}
            />
          </>
        ) : null}

        <Container className="relative w-full py-14 sm:py-20">
          <div className="max-w-3xl">
            <Link
              href="/insights"
              className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal/70 hover:text-signal"
            >
              ← Insights
            </Link>
            <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal/75">
              {article.category}
              {article.minutes ? ` · ${article.minutes} min read` : ""}
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-signal sm:text-5xl">
              <span className="block overflow-hidden pb-[0.08em]">
                <ScrollReveal as="span" variant="mask" delay={0.05} className="block">
                  {article.title}
                </ScrollReveal>
              </span>
            </h1>
            <ScrollReveal delay={0.12}>
              <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-signal/85">
                {article.dek}
              </p>
            </ScrollReveal>
          </div>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        {/* The mandatory stage statement, first thing under the hero */}
        <div className="mx-auto max-w-2xl">
          <ScrollReveal>
            <p className="border-y border-[var(--border-light)] py-4 font-body text-sm leading-relaxed text-ink/60">
              {article.stage}
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-10">
          {article.body ? <Blocks blocks={article.body} /> : null}
        </div>

        {others.length > 0 && (
          <div className="mx-auto mt-16 max-w-2xl border-t border-[var(--border-light)] pt-8">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/55">
              Keep reading
            </p>
            <ul className="mt-5 space-y-5">
              {others.map((o) => {
                const oh = o.hero ? getImage(o.hero) : undefined;
                return (
                  <li key={o.slug}>
                    <Link
                      href={`/insights/${o.slug}`}
                      className="group flex items-center gap-4"
                    >
                      {oh ? (
                        <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-md bg-graphite">
                          <Image
                            src={oh.src}
                            alt=""
                            aria-hidden="true"
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </span>
                      ) : null}
                      <span>
                        <span className="block font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink/55">
                          {o.category}
                        </span>
                        <span className="mt-1 block font-display text-base font-bold leading-tight tracking-tight text-ink group-hover:text-ink/70">
                          {o.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
    </article>
  );
}
