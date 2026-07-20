import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { DraftNotice } from "@/components/ui/DraftNotice";

export const metadata: Metadata = {
  title: "Cookies",
  description: "How BIQADX uses cookies. Draft — pending counsel review.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      notice={<DraftNotice />}
      sections={[
        {
          heading: "What we use",
          body: "This site aims to run with only what is strictly necessary. Any analytics would be first-party and privacy-preserving, with no third-party advertising cookies.",
        },
        {
          heading: "Your control",
          // TODO(legal): wire a granular consent panel (necessary vs. optional)
          // before enabling any non-essential cookies.
          body: "Where non-essential cookies are introduced, you will be able to accept or decline them individually before they are set.",
        },
      ]}
    />
  );
}
