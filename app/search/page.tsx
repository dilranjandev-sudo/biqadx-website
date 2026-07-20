import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { nav } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Search",
  description: "Find your way around BIQADX.",
  robots: { index: false, follow: false },
};

/**
 * Lightweight search landing, linked from the 404. There is no full-text index
 * yet, so it works as a site map instead — and it lists every nav group, not just
 * the top-level links: someone arriving here from a broken URL was previously
 * offered four destinations and no route into Platform or Company at all.
 */
const GROUPS = [
  ...nav.groups.map((g) => ({ title: g.label, items: [...g.items] })),
  { title: "More", items: [...nav.links, nav.cta] },
];

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = (searchParams?.q ?? "").trim();

  return (
    <>
      <PageHero kicker="Search" title={q ? `Results for “${q}”` : "Search"}>
        {q
          ? "We do not have full-text search yet — here is everything on the site."
          : "Everything on the site."}
      </PageHero>

      {GROUPS.map((g, gi) => (
        <ContentSection
          key={g.title}
          no={`${String(gi + 1).padStart(2, "0")} / ${String(GROUPS.length).padStart(2, "0")}`}
          title={g.title}
          divider={gi > 0}
        >
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {g.items.map((link, i) => (
              <li key={link.href}>
                <ScrollReveal delay={Math.min(i, 4) * 0.04}>
                  <Link
                    href={link.href}
                    className="block border-b border-ink/12 py-3.5 font-body text-sm text-ink/75 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </ContentSection>
      ))}
    </>
  );
}
