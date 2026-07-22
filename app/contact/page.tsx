import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection } from "@/components/ui/PaperSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { contact, brand } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact BIQADX for investment, research, engineering, manufacturing, assay, validation, regulatory, media or talent inquiries.",
};

const INFO = [
  { label: "Company", value: brand.legalName },
  { label: "Location", value: contact.location },
  { label: "Website", value: contact.website },
  // TODO(contact-email): official email published only after verification.
  { label: "Email", value: "Being finalised — please use the form." },
];

// Short forms of the enquiry categories, shown as context.
const AREAS = [
  "Investment",
  "Research",
  "Nanofabrication & optics",
  "Cartridge & microfluidics",
  "Assay development",
  "Engineering & software",
  "Quality & regulatory",
  "Manufacturing",
  "Media",
  "Talent",
];

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title={contact.hero.title}>
        {contact.hero.lead}
      </PageHero>

      <PaperSection>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — how to reach us, the facts, and what we work on */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/65">
                Direct
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <ScrollReveal as="span" variant="mask" delay={0.06} className="block">
                    One official channel.
                  </ScrollReveal>
                </span>
              </h2>
              <p className="mt-4 max-w-sm font-body leading-relaxed text-ink/75">
                Use the form for any professional inquiry — it reaches the right
                people and we reply from the official company channel.
              </p>
            </ScrollReveal>

            <dl className="mt-9">
              {INFO.map((i, idx) => (
                <ScrollReveal key={i.label} delay={idx * 0.05}>
                  <div className="border-t border-[var(--border-light)] py-4">
                    <dt className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/65">
                      {i.label}
                    </dt>
                    <dd className="mt-1.5 font-body text-ink/80">{i.value}</dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>

            <ScrollReveal>
              <p className="mt-9 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/65">
                We collaborate on
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-[var(--border-light)] px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink/70"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Footnote, not a callout box — matches the stage notice elsewhere. */}
            <p className="mt-9 border-t border-[var(--border-light)] pt-5 font-body text-xs leading-relaxed text-ink/65">
              {contact.privacyNote}
            </p>
          </div>

          {/* Right — the form */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </PaperSection>
    </>
  );
}
