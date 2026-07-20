import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the BIQADX website. Draft — pending counsel review.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      notice={<DraftNotice />}
      sections={[
        {
          heading: "Development-stage information",
          body: "Everything described on this site is in active research and development. Nothing here is certified or approved by any regulatory authority, and nothing is offered for sale or for diagnostic use.",
        },
        {
          heading: "Intellectual property",
          body: "Patent applications are pending and remain under examination; no grant is asserted. Site content, marks, and designs are the property of BIQADX Diagnostics Private Limited.",
        },
        {
          heading: "No performance claims",
          body: "Descriptions are illustrative of our engineering direction and are not clinical performance claims.",
        },
      ]}
    />
  );
}
