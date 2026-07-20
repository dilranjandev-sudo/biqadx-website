import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page went off the surface.",
};

export default function NotFound() {
  return (
    <section className="bg-void">
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-signal/45">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tightest text-signal sm:text-6xl">
          This page went off the surface.
        </h1>
        <p className="mt-5 font-body text-lg text-signal/70">Let&apos;s get you back.</p>

        <nav aria-label="Recovery links" className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/metasurface-diagnostics" className="btn-outline">
            Platform
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact
          </Link>
        </nav>

        <form action="/search" className="mt-10 flex max-w-md gap-2" role="search">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search"
            className="w-full rounded-full border border-[var(--border-dark)] bg-graphite px-4 py-2.5 font-body text-sm text-signal placeholder:text-signal/40"
          />
          <button type="submit" className="btn-outline">
            Search
          </button>
        </form>
      </Container>
    </section>
  );
}
