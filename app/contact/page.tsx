import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PaperSection } from "@/components/ui/PaperSection";
import { ContactForm } from "@/components/contact/ContactForm";
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

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title={contact.hero.title}>
        {contact.hero.lead}
      </PageHero>
      <PaperSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
          <div>
            <dl className="space-y-4">
              {INFO.map((i) => (
                <div
                  key={i.label}
                  className="border-t border-[var(--border-light)] pt-4"
                >
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-ink/65">
                    {i.label}
                  </dt>
                  <dd className="mt-1.5 font-body text-ink/75">{i.value}</dd>
                </div>
              ))}
            </dl>
            {/* Footnote, not a callout box — it sits beside a form the reader is
                already filling in, and matches the stage notice elsewhere. */}
            <p className="mt-8 border-t border-[var(--border-light)] pt-5 font-body text-xs leading-relaxed text-ink/65">
              {contact.privacyNote}
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </PaperSection>
    </>
  );
}
