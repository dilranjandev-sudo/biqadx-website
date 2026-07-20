import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Cookie policy. Draft — pending counsel review.",
};

export default function CookiesPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Cookies" />
      <section className="bg-paper text-ink">
        <Container className="max-w-3xl py-16 sm:py-24">
          <DraftNotice className="mb-10" />
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                What we use
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                This site aims to run with only what is strictly necessary. Any
                analytics would be first-party and privacy-preserving, with no
                third-party advertising cookies.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Your control
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                {/* TODO(legal): wire a granular consent panel (necessary vs.
                    optional) before enabling any non-essential cookies. */}
                Where non-essential cookies are introduced, you will be able to
                accept or decline them individually before they are set.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
