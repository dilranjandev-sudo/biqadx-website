"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

type CtaLink = { label: string; href: string };

type ImmersiveHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  layers: string[];
  primary: CtaLink;
  secondary: CtaLink;
};

/**
 * Signature hero: an exploded, scroll-scrubbed cartridge stack (METACARD zones)
 * with a Prism light beam. Sticky stage + one scrubbed GSAP timeline; GSAP is
 * dynamically imported so it never ships to other pages. Under reduced-motion /
 * ?static=1 it renders a readable, fully-exploded static view.
 */
export function ImmersiveHero({
  eyebrow,
  title,
  lead,
  layers,
  primary,
  secondary,
}: ImmersiveHeroProps) {
  const outerRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tlRef = useRef<any>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (motionDisabled()) return;
    let killed = false;

    (async () => {
      try {
        const [{ default: gsap }, stMod] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (killed) return;
        const ScrollTrigger =
          (stMod as { ScrollTrigger?: unknown }).ScrollTrigger ??
          (stMod as { default?: unknown }).default;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gsap.registerPlugin(ScrollTrigger as any);
        stRef.current = ScrollTrigger;

        setAnimated(true);
        const root = outerRef.current;
        if (killed || !root) return;
        root.style.height = "320vh"; // ensure scroll distance now (avoid rAF wait)

        const slabEls = Array.from(root.querySelectorAll<HTMLElement>(".bq-slab"));
        const puckEl = root.querySelector<HTMLElement>(".bq-puck");
        const labelEls = Array.from(root.querySelectorAll<HTMLElement>(".bq-label"));
        const glintEls = Array.from(root.querySelectorAll<HTMLElement>(".bq-glint"));
        if (slabEls.length < 2) return;

        const n = slabEls.length;
        const pitch = slabEls[1].offsetTop - slabEls[0].offsetTop || 48;
        const collapse = (i: number) => -((i - (n - 1) / 2) * pitch);

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });
        tl.fromTo(slabEls, { y: (i: number) => collapse(i) }, { y: 0, stagger: 0.04, duration: 0.5 }, 0);
        if (puckEl) {
          tl.fromTo(puckEl, { top: "-6%", opacity: 0 }, { top: "100%", opacity: 1, duration: 0.5 }, 0);
        }
        tl.to(labelEls, { opacity: 1, stagger: 0.08, duration: 0.14 }, 0.14);
        tl.to(glintEls, { opacity: 0.85, stagger: 0.08, duration: 0.1 }, 0.14);
        if (puckEl) tl.to(puckEl, { opacity: 0, duration: 0.15 }, 0.56);
        tl.to(slabEls, { y: (i: number) => collapse(i), stagger: 0.04, duration: 0.4 }, 0.6);
        tl.to(labelEls, { opacity: 0, duration: 0.2 }, 0.62);
        tl.to(glintEls, { opacity: 0, duration: 0.2 }, 0.62);

        tlRef.current = tl;
        (ScrollTrigger as { refresh: () => void }).refresh();
        setTimeout(() => {
          if (!killed) (ScrollTrigger as { refresh: () => void }).refresh();
        }, 200);
      } catch (e) {
        console.error("[ImmersiveHero] GSAP setup failed:", e);
      }
    })();

    return () => {
      killed = true;
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!lenis || !stRef.current) return;
    const st = stRef.current;
    const onScroll = () => st.update();
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis, animated]);

  return (
    <section
      ref={outerRef}
      className="relative bg-void"
      style={animated ? { height: "320vh" } : undefined}
      aria-label="Introduction"
    >
      <div
        className={
          animated
            ? "sticky top-0 flex h-[100svh] items-center overflow-hidden"
            : "flex min-h-[78vh] items-center"
        }
      >
        <Container className="grid w-full items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/50">
              {eyebrow}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.04] tracking-tightest text-signal sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-signal/70 sm:text-lg">
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primary.href} className="btn-primary">
                {primary.label}
              </Link>
              <Link href={secondary.href} className="btn-outline">
                {secondary.label}
              </Link>
            </div>
          </div>

          <div className="order-first lg:order-none">
            <div className="relative mx-auto h-[360px] w-full max-w-[400px]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2"
                style={{ background: "var(--prism-gradient)", opacity: 0.22 }}
              />
              <div
                aria-hidden="true"
                className="bq-puck absolute left-1/2 h-14 w-[7px] -translate-x-1/2 rounded-full opacity-0"
                style={{ top: "-6%", background: "var(--prism-gradient)", filter: "blur(3px)" }}
              />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                role="img"
                aria-label="Exploded view of the METACARD cartridge as stacked optical, microfluidic, sensing and reference zones, with a beam of light passing through the gaps between them."
              >
                {layers.map((label, i) => (
                  <div
                    key={label}
                    className="bq-slab relative flex h-9 w-full items-center rounded-md border border-[var(--border-dark)] bg-graphite"
                  >
                    <span
                      aria-hidden="true"
                      className="bq-glint absolute inset-x-0 top-0 h-[2px] opacity-0"
                      style={{ background: "var(--prism-gradient)" }}
                    />
                    <span
                      aria-hidden="true"
                      className={`bq-label pl-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal/60 ${
                        animated ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
