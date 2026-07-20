import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our accessibility commitment. Draft — pending counsel review.",
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Accessibility" />
      <section className="bg-paper text-ink">
        <Container className="max-w-3xl py-16 sm:py-24">
          <DraftNotice className="mb-10" />
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Our commitment
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                We are building this site to target WCAG 2.2 Level AA: visible
                keyboard focus, meaningful alt text, sufficient contrast, semantic
                structure, and a reduced-motion experience for anyone who prefers
                it.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Motion
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                The immersive scroll animations respect your system
                reduced-motion setting and fall back to simple, static views.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Tell us
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                {/* TODO(contact-email): publish an accessibility contact once the
                    real inbox is confirmed. */}
                If something is hard to use, we want to fix it. A contact route
                will be published here once confirmed.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
