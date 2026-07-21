import Image from "next/image";
import Link from "next/link";
import { footer, nav, cta, messaging, brand } from "@/lib/copy";
import { getImage } from "@/lib/images";
import { StagePill } from "./StagePill";
import { StageBadges } from "./StageBadges";
import { LegalBlock } from "./LegalBlock";

/**
 * Global footer — a cinematic CTA band over the sitemap and the compliance
 * furniture that every route is required to carry.
 *
 * All four link groups are now plain columns, including Transparency. It used to
 * be pulled out of the grid and re-set as a row of small mono links along the
 * bottom bar, with the development-stage disclaimer filtered out of it because
 * LegalBlock links there too. That meant one group looked like a different kind
 * of thing for no reason, and the filtering was a rule you had to know about to
 * read the code. Four columns, all treated alike, and the duplicate link is
 * simply allowed — the legal line and the sitemap are different routes to it.
 *
 * The bottom bar is then a single stack: badges, then legal. Previously it put
 * badges and links on one flex row that broke apart awkwardly between lg and the
 * point where the links wrapped.
 */
export function Footer() {
  // The closing band is opt-in on the asset existing. It sits on every route, so
  // a labelled placeholder here would appear site-wide — better that the band
  // simply is not there until the photograph is, and appears the moment the id
  // is added to lib/images.ts. See IMAGE_PLACEHOLDERS.md → footer-signoff.
  const signoff = getImage("footer-signoff");

  return (
    <footer className="bg-void">
      {/* CTA — its own image band, so the engineered-surface photograph and its
          cyan→violet→amber sheen read clearly behind the headline. A single image
          stretched over the whole footer put this dark part of the frame here and
          hid the sheen; giving the CTA its own band keeps the picture where it
          belongs. */}
      <section className="relative isolate overflow-hidden border-t border-[var(--border-dark)]">
        <Image
          src="/images/footer-cta.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.72) 0%, rgba(11,14,20,0.55) 44%, rgba(11,14,20,0.9) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-content px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tightest text-signal sm:text-5xl">
            Engineering the diagnostic surface.
            <br className="hidden sm:block" /> Partner with BIQADX.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={cta.primary.href} className="btn-primary">
              {cta.primary.label}
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Sitemap + legal — over a dark photograph of the card at rest on the
          bench, its cyan-violet sheen showing through the lower middle. The image
          is mostly near-black, so the scrim can stay moderate: the picture reads,
          and every line — down to the small mono legal — still clears AA. */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/footer-bench.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.6) 0%, rgba(11,14,20,0.66) 42%, rgba(11,14,20,0.82) 78%, rgba(11,14,20,0.9) 100%)",
          }}
        />

        {/* Sitemap — brand, then the four groups on one alignment */}
        <div className="relative mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:gap-x-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-lg font-bold tracking-tightest text-signal">
                {nav.brand}
              </span>
              <StagePill />
            </div>
            <p className="mt-5 max-w-xs font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.2em] text-signal/70">
              India-based deep-tech healthcare R&amp;D
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/70">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm leading-snug text-signal/85 transition-colors hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Compliance furniture — required on every route. Structured as two
            parts: the development stage on the left as labelled chips, the legal
            fine print on the right. */}
        <div className="mt-16 border-t border-[var(--border-dark)] pt-10 sm:mt-20">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-signal/60">
                Development stage
              </p>
              <StageBadges className="mt-4 max-w-md" />
            </div>
            <div className="lg:col-span-7">
              <LegalBlock />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Closing sign-off — the last thing on every page. Full-bleed, no card,
          copy set over the picture at the lower left. It carries the brand line
          only: the compliance furniture stays above it on solid ground, because
          a required disclaimer should not be read off a photograph. */}
      {signoff && (
        <section
          aria-label="BIQADX"
          className="relative isolate flex min-h-[62svh] items-end overflow-hidden border-t border-[var(--border-dark)] sm:min-h-[58svh]"
        >
          <Image
            src={signoff.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,14,20,0.5) 0%, rgba(11,14,20,0.2) 40%, rgba(11,14,20,0.88) 84%, rgba(11,14,20,0.97) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(11,14,20,0.82) 0%, rgba(11,14,20,0.35) 55%, rgba(11,14,20,0) 100%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-content px-4 pb-14 pt-28 sm:px-6 sm:pb-16">
            <div className="max-w-xl">
              <p className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-signal sm:text-3xl">
                {nav.brand}
              </p>
              <p className="mt-4 font-display text-lg font-medium leading-snug tracking-tight text-signal sm:text-xl">
                {messaging.headline}.
              </p>
              <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
                {brand.location}
              </p>
            </div>
          </div>
        </section>
      )}
    </footer>
  );
}
