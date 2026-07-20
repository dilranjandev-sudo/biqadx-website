"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

const SLIDES = [
  {
    img: "/images/seq-1-sample.png",
    title: "Apply the sample.",
    alt: "A gloved hand releasing a clear droplet from a pipette onto the iridescent nanostructured surface of a thin card.",
  },
  {
    img: "/images/seq-2-seat.png",
    title: "Seat the card.",
    alt: "A gloved hand sliding a thin iridescent card into the front slot of a matte-black analyzer.",
  },
  {
    img: "/images/seq-3-interrogate.png",
    title: "The surface is interrogated.",
    alt: "The seated card inside the analyzer, a blade of light grazing its engineered surface beneath the reading optics.",
  },
  {
    img: "/images/seq-4-validate.png",
    title: "The system checks itself.",
    alt: "An inspection objective over the card's geometric alignment and reference features during a self-check.",
  },
  {
    img: "/images/seq-5-result.png",
    title: "Released only when valid.",
    alt: "The card resting in the analyzer with a single neutral status light, a gloved hand stepping back.",
  },
];

const HEIGHT_VH = 560;

/**
 * "See it work" — a pinned scroll sequence that continuously cross-fades a
 * consistent set of real photos with a slow Ken Burns zoom, and clean numbered
 * captions that slide up on each step. No progress chrome — the photography
 * carries it. GSAP scrub; reduced-motion → first frame + a plain step list.
 */
export function HowItWorksScroll() {
  const outerRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stRef = useRef<any>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (motionDisabled()) return;
    let killed = false;
    let off: (() => void) | undefined;

    (async () => {
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
      root.style.height = `${HEIGHT_VH}vh`;
      const n = SLIDES.length;
      let lastActive = -1;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ScrollTrigger as any).create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: (self: any) => {
          const p = self.progress as number;
          const pos = p * (n - 1);
          const zoom = (1.06 + 0.14 * p).toFixed(4);
          imgRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = String(Math.max(0, 1 - Math.abs(pos - i)));
            el.style.transform = `scale(${zoom})`;
          });
          const active = Math.min(n - 1, Math.round(pos));
          if (active !== lastActive) {
            lastActive = active;
            capRefs.current.forEach((el, i) => {
              if (!el) return;
              const on = i === active;
              el.style.opacity = on ? "1" : "0";
              el.style.transform = on ? "translateY(0)" : "translateY(16px)";
            });
          }
        },
      });

      if (lenis) {
        const on = () => (ScrollTrigger as { update: () => void }).update();
        lenis.on("scroll", on);
        off = () => lenis.off("scroll", on);
      }
      (ScrollTrigger as { refresh: () => void }).refresh();
    })();

    return () => {
      killed = true;
      if (off) off();
      if (stRef.current) stRef.current.getAll().forEach((t: { kill: () => void }) => t.kill());
    };
  }, [lenis]);

  return (
    <section
      ref={outerRef}
      className="relative bg-void"
      style={animated ? { height: `${HEIGHT_VH}vh` } : undefined}
      aria-label="How it works"
    >
      <div className={animated ? "sticky top-0 h-[100svh] overflow-hidden" : "relative min-h-[80vh] overflow-hidden"}>
        {SLIDES.map((s, i) => (
          <div
            key={s.img}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0, transform: "scale(1.06)" }}
          >
            <Image src={s.img} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.55) 0%, rgba(11,14,20,0.12) 40%, rgba(11,14,20,0.92) 100%)",
          }}
        />

        <div className="relative flex h-full min-h-[80vh] items-end">
          <Container className="pb-16 sm:pb-24">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-signal/55">
              See it work
            </p>

            {animated ? (
              <div className="relative mt-5 h-28 sm:h-32">
                {SLIDES.map((s, i) => (
                  <div
                    key={s.title}
                    ref={(el) => {
                      capRefs.current[i] = el;
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      transform: i === 0 ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 0.55s ease, transform 0.55s ease",
                    }}
                  >
                    <h2 className="flex max-w-3xl items-baseline gap-4 font-display text-3xl font-bold leading-tight tracking-tightest text-signal sm:text-5xl">
                      <span className="font-mono text-lg font-normal text-signal/35 sm:text-2xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </h2>
                  </div>
                ))}
              </div>
            ) : (
              <ol className="mt-5 space-y-2">
                {SLIDES.map((s, i) => (
                  <li key={s.title} className="font-display text-2xl font-bold tracking-tight text-signal sm:text-3xl">
                    <span className="mr-3 font-mono text-base text-signal/40">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </li>
                ))}
              </ol>
            )}
          </Container>
        </div>
      </div>
    </section>
  );
}
