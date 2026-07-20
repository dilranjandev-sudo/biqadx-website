import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What BIQADX collects, and how it is used. Draft — pending counsel review.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      notice={<DraftNotice />}
      sections={[
        {
          heading: "What we collect",
          body: "We collect only what you provide through our contact form: enquiry type, name, email address, and your message. We do not run third-party advertising trackers.",
        },
        {
          heading: "How we use it",
          body: "We use the information solely to respond to your enquiry. We do not sell personal data.",
        },
        {
          heading: "Your choices",
          // TODO(legal): contact route for data requests depends on the real
          // inbox — TODO(contact-email). Finalize with counsel.
          body: "You can ask us to access or delete the information you have shared. A contact route will be published here once confirmed.",
        },
      ]}
    />
  );
}
