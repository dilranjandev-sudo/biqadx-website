"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/copy";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

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

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--border-dark)] backdrop-blur"
      style={{ backgroundColor: "rgba(11, 14, 20, 0.92)" }}
    >
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <div className="flex items-center">
          <Link href="/" className="font-display text-lg font-bold tracking-tightest text-signal">
            {nav.brand}
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {nav.groups.map((group, gi) => {
            const active = group.items.some((i) => i.href === pathname);
            const isOpen = openGroup === gi;
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : gi)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-body text-sm transition-colors ${
                    active || isOpen ? "text-signal" : "text-signal/70 hover:text-signal"
                  }`}
                >
                  {group.label}
                  <svg
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full z-10 w-64 pt-2">
                    <div className="rounded-xl border border-[var(--border-dark)] bg-graphite p-2 shadow-xl">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={item.href === pathname ? "page" : undefined}
                          className={`block rounded-lg px-3 py-2 font-body text-sm transition-colors ${
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
                )}
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
                className={`rounded-full px-3 py-2 font-body text-sm transition-colors ${
                  active ? "text-signal" : "text-signal/70 hover:text-signal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href={nav.cta.href} className="btn-primary ml-1">
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-1.5 text-signal lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="max-h-[80vh] overflow-y-auto border-t border-[var(--border-dark)] bg-void lg:hidden">
          <div className="mx-auto flex max-w-content flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.groups.map((group) => (
              <div key={group.label} className="mb-2">
                <p className="px-2 pt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal/40">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded px-2 py-2 font-body text-base ${
                      item.href === pathname ? "text-signal" : "text-signal/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="my-1 h-px bg-[var(--border-dark)]" />
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded px-2 py-2.5 font-body text-base ${
                  link.href === pathname ? "text-signal" : "text-signal/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href={nav.cta.href} className="btn-primary mt-3 w-full">
              {nav.cta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
