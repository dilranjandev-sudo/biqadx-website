import Link from "next/link";
import { Container } from "@/components/ui/Container";

type Pillar = { name: string; tag: string; line: string; href: string };

/** "Platform at a glance": METACARD + OMEGA-PRO + UDOS as one cooperative
 *  system. Visual schematic + three short pillars — low text, motion via the
 *  Prism through-line. */
export function HomeSystem({
  kicker,
  title,
  note,
  pillars,
}: {
  kicker: string;
  title: string;
  note: string;
  pillars: Pillar[];
}) {
  return (
    <section className="border-t border-[var(--border-dark)] bg-void">
      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal/45">
              {kicker}
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-md font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-signal/55">
              {note}
            </p>
          </div>

          {/* Schematic: cartridge into analyzer, software as the control band. */}
          <div className="order-first lg:order-none">
            <svg
              viewBox="0 0 480 360"
              role="img"
              aria-label="Schematic: the METACARD cartridge is read by the OMEGA-PRO analyzer, with the UDOS software layer controlling the measurement and releasing a validated result."
              className="w-full"
            >
              <defs>
                <linearGradient id="hs-beam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6EE7F0" />
                  <stop offset="50%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#F2C879" />
                </linearGradient>
              </defs>

              <rect x="234" y="150" width="6" height="78" fill="url(#hs-beam)" opacity="0.7" />

              {/* METACARD */}
              <rect x="138" y="40" width="200" height="110" rx="12" fill="#1A1F2B" stroke="rgba(232,236,239,0.16)" />
              <rect x="138" y="40" width="200" height="3" rx="1.5" fill="url(#hs-beam)" opacity="0.85" />
              <line x1="158" y1="74" x2="318" y2="74" stroke="rgba(232,236,239,0.14)" />
              <line x1="158" y1="94" x2="318" y2="94" stroke="rgba(232,236,239,0.14)" />
              <line x1="158" y1="114" x2="318" y2="114" stroke="rgba(232,236,239,0.14)" />
              <text x="154" y="60" fill="rgba(232,236,239,0.55)" fontFamily="monospace" fontSize="11" letterSpacing="1.5">METACARD</text>

              {/* OMEGA-PRO */}
              <rect x="118" y="228" width="244" height="92" rx="16" fill="#1A1F2B" stroke="rgba(232,236,239,0.16)" />
              <rect x="158" y="228" width="164" height="6" rx="3" fill="#0B0E14" />
              <rect x="294" y="266" width="48" height="30" rx="5" fill="#0B0E14" stroke="rgba(232,236,239,0.14)" />
              <circle cx="318" cy="281" r="4" fill="url(#hs-beam)" />
              <text x="136" y="308" fill="rgba(232,236,239,0.55)" fontFamily="monospace" fontSize="11" letterSpacing="1.5">OMEGA-PRO</text>

              {/* UDOS control band */}
              <rect x="118" y="336" width="244" height="1.5" fill="rgba(232,236,239,0.2)" />
              <text x="118" y="352" fill="rgba(232,236,239,0.4)" fontFamily="monospace" fontSize="10" letterSpacing="1.5">UDOS · VALIDITY-GATED CONTROL</text>
            </svg>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group flex flex-col rounded-xl border border-[var(--border-dark)] p-6 transition-colors hover:border-signal/30"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold tracking-tight text-signal">
                  {p.name}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-signal/45">
                  {p.tag}
                </span>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-signal/65">{p.line}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
