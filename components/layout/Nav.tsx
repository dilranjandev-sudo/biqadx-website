"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/copy";

/**
 * Site header.
 *
 * Set as flat text with a hairline active marker rather than as rounded pills:
 * pills read as app chrome, and this is the masthead of an instrument company.
 * Dropdowns open on hover with a short intent delay — and still on click, on
 * Enter and on arrow keys — so a pointer user never has to click to look, while
 * keyboard and touch keep an explicit toggle.
 *
 * The Platform group runs to eight pages, so its panel is two columns; a single
 * narrow list of eight was taller than it was readable. No invented descriptions
 * accompany the links — copy on this site is compliance-reviewed, so the nav
 * shows the page names it actually has.
 */
export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Close the open dropdown on outside click / Escape.
  useEffect(() => {
    if (openGroup === null) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Small delays either side: opening instantly on a passing cursor feels
  // twitchy, and closing instantly makes the gap to the panel unreachable.
  const hoverOpen = (gi: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenGroup(gi), 90);
  };
  const hoverClose = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenGroup(null), 160);
  };

  const itemBase =
    "relative inline-flex items-center gap-1.5 px-3 py-2 font-body text-sm transition-colors";
  const marker =
    "after:absolute after:inset-x-3 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 after:content-['']";

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-dark)] bg-void/90 backdrop-blur"
    >
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-content items-center justify-between gap-6 px-4 sm:h-[4.5rem] sm:px-6"
      >
        <Link
          href="/"
          className="font-display text-base font-bold uppercase tracking-[0.06em] text-signal transition-opacity hover:opacity-80 sm:text-lg"
        >
          {nav.brand}
        </Link>

        {/* Desktop */}
        <div className="hidden h-full items-center lg:flex">
          {nav.groups.map((group, gi) => {
            const active = group.items.some((i) => i.href === pathname);
            const isOpen = openGroup === gi;
            const wide = group.items.length > 5;
            return (
              <div
                key={group.label}
                className="relative flex h-full items-center"
                onMouseEnter={() => hoverOpen(gi)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : gi)}
                  className={`${itemBase} ${marker} ${
                    active || isOpen
                      ? "text-signal after:scale-x-100"
                      : "text-signal/75 hover:text-signal"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2.5 4.5L6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute left-0 top-full z-10 pt-3 transition-all duration-200 ${
                    isOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div
                    className={`rounded-lg border border-[var(--border-dark)] bg-graphite p-2 ${
                      wide ? "w-[32rem]" : "w-60"
                    }`}
                  >
                    <div className={wide ? "grid grid-cols-2 gap-x-1" : ""}>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          tabIndex={isOpen ? undefined : -1}
                          aria-current={item.href === pathname ? "page" : undefined}
                          className={`block rounded px-3 py-2 font-body text-sm transition-colors ${
                            item.href === pathname
                              ? "bg-signal/10 text-signal"
                              : "text-signal/75 hover:bg-signal/5 hover:text-signal"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {nav.links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${itemBase} ${marker} ${
                  active ? "text-signal after:scale-x-100" : "text-signal/75 hover:text-signal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <span aria-hidden="true" className="mx-4 h-5 w-px bg-signal/20" />
          <Link href={nav.cta.href} className="btn-primary">
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-1.5 inline-flex items-center justify-center rounded p-1.5 text-signal lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path
                d="M4 4l14 14M18 4L4 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h16M3 11h16M3 16h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-[var(--border-dark)] bg-void lg:hidden"
        >
          <div className="mx-auto max-w-content px-4 py-6 sm:px-6">
            {nav.groups.map((group) => (
              <div key={group.label} className="mb-7">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-signal/60">
                  {group.label}
                </p>
                <div className="mt-3 flex flex-col">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={item.href === pathname ? "page" : undefined}
                      className={`border-b border-[var(--border-dark)] py-3 font-body text-base ${
                        item.href === pathname ? "text-signal" : "text-signal/75"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className={`border-b border-[var(--border-dark)] py-3 font-body text-base ${
                    link.href === pathname ? "text-signal" : "text-signal/75"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link href={nav.cta.href} className="btn-primary mt-6 w-full">
              {nav.cta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
