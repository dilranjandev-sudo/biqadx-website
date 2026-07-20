import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What BIQADX collects, and how it is used. Draft — pending counsel review.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero kicker="Legal" title="Privacy" />
      <section className="bg-paper text-ink">
        <Container className="max-w-3xl py-16 sm:py-24">
          <DraftNotice className="mb-10" />
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                What we collect
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                We collect only what you provide through our contact form: enquiry
                type, name, email address, and your message. We do not run
                third-party advertising trackers.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                How we use it
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                We use the information solely to respond to your enquiry. We do not
                sell personal data.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                Your choices
              </h2>
              <p className="mt-3 font-body leading-relaxed text-ink/75">
                {/* TODO(legal): contact route for data requests depends on the real
                    inbox — TODO(contact-email). Finalize with counsel. */}
                You can ask us to access or delete the information you have shared.
                A contact route will be published here once confirmed.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
