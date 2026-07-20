import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "BIQADX's accessibility commitment for this website. Draft — pending review.",
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      notice={<DraftNotice />}
      sections={[
        {
          heading: "Our commitment",
          body: "We are building this site to target WCAG 2.2 Level AA: visible keyboard focus, meaningful alt text, sufficient contrast, semantic structure, and a reduced-motion experience for anyone who prefers it.",
        },
        {
          heading: "Motion",
          body: "The scroll animations respect your system reduced-motion setting and fall back to simple, static views.",
        },
        {
          heading: "Tell us",
          // TODO(contact-email): publish an accessibility contact once the real
          // inbox is confirmed.
          body: "If something is hard to use, we want to fix it. A contact route will be published here once confirmed.",
        },
      ]}
    />
  );
}
