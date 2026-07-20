import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use. Draft — pending counsel review.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Terms of use" />
      <section className="bg-paper text-ink">
        <Container className="max-w-3xl py-16 sm:py-24">
          <DraftNotice className="mb-10" />
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Development-stage information
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                Everything described on this site is in active research and
                development. Nothing here is certified or approved by any
                regulatory authority, and nothing is offered for sale or for
                diagnostic use.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Intellectual property
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                Patent applications are pending and remain under examination; no
                grant is asserted. Site content, marks, and designs are the
                property of BIQADX Diagnostics Private Limited.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                No performance claims
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                Descriptions are illustrative of our engineering direction and are
                not clinical performance claims.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
