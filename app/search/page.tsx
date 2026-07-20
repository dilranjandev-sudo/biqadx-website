import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { nav } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Search",
  description: "Find your way around BIQADX.",
  robots: { index: false, follow: false },
};

// Lightweight search landing (linked from the 404). A full index can be added
// later; for now it echoes the query and offers the main routes.
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
          ? "We do not have full-text search yet. Here are the main sections to jump to."
          : "Jump to a section."}
      </PageHero>
      <section className="bg-paper text-ink">
        <Container className="py-16 sm:py-24">
          <ul className="grid gap-3 sm:grid-cols-2">
            {[...nav.links, nav.cta].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg border border-[var(--border-light)] px-5 py-4 font-display text-lg text-ink transition-colors hover:bg-black/[0.03]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
