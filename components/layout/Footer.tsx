import Image from "next/image";
import Link from "next/link";
import { footer, nav, cta } from "@/lib/copy";
import { StagePill } from "./StagePill";
import { StageBadges } from "./StageBadges";
import { LegalBlock } from "./LegalBlock";

/** Global footer — a cinematic CTA image band over a clean, evenly-structured
 *  footer: brand + three aligned link columns, then a two-tier legal bar. Keeps
 *  the required compliance furniture on every route. */
export function Footer() {
  const [platform, company, connect, transparency] = footer.columns;
  const quickLinks = transparency.links.filter(
    (l) => l.href !== footer.disclaimerHref,
  );

  return (
    <footer className="bg-void">
      {/* CTA — image band with overlaid text */}
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
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.74) 0%, rgba(11,14,20,0.62) 45%, rgba(11,14,20,0.9) 100%)",
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

      {/* Footer body */}
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-16">
        {/* Brand + three link columns — one aligned grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold tracking-tightest text-signal">
                {nav.brand}
              </span>
              <StagePill />
            </div>
            <p className="mt-4 max-w-xs font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.2em] text-signal/60">
              India-based deep-tech healthcare R&amp;D
            </p>
          </div>

          {[platform, company, connect].map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-signal/75 transition-colors hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar — badges + quick links, then legal */}
        <div className="mt-14 border-t border-[var(--border-dark)] pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <StageBadges />
            <nav aria-label={transparency.title}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-[0.66rem] text-signal/60 transition-colors hover:text-signal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <LegalBlock className="mt-8" />
        </div>
      </div>
    </footer>
  );
}
