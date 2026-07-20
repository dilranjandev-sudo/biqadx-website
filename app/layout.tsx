import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { organizationJsonLd } from "@/lib/copy";

// One superfamily across the whole site: IBM Plex. Headlines use the Condensed
// cut set in caps — a DIN-adjacent, engineering-drawing register — while body and
// labels stay in the regular Sans and Mono. Staying inside Plex keeps the three
// cuts visibly related instead of reading as three unrelated typefaces.
const display = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biqadx.com"),
  title: {
    default: "BIQADX — Metasurface-Integrated Diagnostic Platforms",
    template: "%s · BIQADX",
  },
  description:
    "BIQADX is developing METACARD and OMEGA-PRO: a research-stage metasurface-integrated cartridge and cooperative analyzer platform for future decentralized diagnostics.",
  openGraph: {
    type: "website",
    siteName: "BIQADX",
    title: "BIQADX — Metasurface-Integrated Diagnostic Platforms",
    description:
      "Engineering the diagnostic surface — a research-stage metasurface-integrated diagnostic platform.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LenisProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
