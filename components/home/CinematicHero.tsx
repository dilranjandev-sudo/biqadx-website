import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type CtaLink = { label: string; href: string };
type HeroImage = { src: string; alt: string };

/**
 * Editorial hero: a three-image triptych with a short description and borderless
 * actions anchored bottom-left. Subtle Ken Burns via CSS; neutralized under
 * prefers-reduced-motion.
 */
export function CinematicHero({
  eyebrow,
  description,
  primary,
  secondary,
  images,
}: {
  eyebrow: string;
  description: string;
  primary: CtaLink;
  secondary: CtaLink;
  images: HeroImage[];
}) {
  return (
    <section className="relative isolate flex min-h-[82svh] items-end overflow-hidden bg-void">
      {/* Triptych — one image on mobile, three on larger screens */}
      <div className="absolute inset-0 -z-10 grid grid-cols-1 sm:grid-cols-3">
        {images.map((im, i) => (
          <div key={im.src} className={`relative overflow-hidden ${i > 0 ? "hidden sm:block" : ""}`}>
            <div className="hero-kenburns absolute inset-0">
              <Image
                src={im.src}
                alt={im.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 640px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
            {i > 0 && (
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-void/50" />
            )}
          </div>
        ))}
      </div>

      {/* Legibility scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,14,20,0.45) 0%, rgba(11,14,20,0.08) 34%, rgba(11,14,20,0.9) 86%, rgba(11,14,20,1) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,14,20,0.78) 0%, rgba(11,14,20,0.1) 55%, transparent 100%)",
        }}
      />

      <Container className="relative pb-14 pt-32 sm:pb-20">
        <div className="max-w-xl">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-signal sm:text-2xl">
            {description}
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-6">
            <Link href={primary.href} className="btn-primary">
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-signal/85 transition-colors hover:text-signal"
            >
              {secondary.label}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
