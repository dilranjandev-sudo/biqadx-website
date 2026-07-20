"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

const ZONES = [
  "OPTICAL ZONE",
  "MICROFLUIDIC NETWORK",
  "SENSING INTERFACE",
  "REFERENCE & IDENTITY",
  "SEALING & CONTAINMENT",
];

/**
 * Signature scroll animation: the METACARD cartridge separates into its zones
 * with a Prism beam travelling through, then reassembles — scrubbed to scroll.
 * GSAP is dynamically imported; reduced-motion / ?static=1 → exploded static.
 */
export function CardScrollScene() {
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
      root.style.height = "300vh";

      const slabs = Array.from(root.querySelectorAll<HTMLElement>(".cs-slab"));
      const labels = Array.from(root.querySelectorAll<HTMLElement>(".cs-label"));
      const puck = root.querySelector<HTMLElement>(".cs-puck");
      if (slabs.length < 2) return;

      const n = slabs.length;
      const pitch = slabs[1].offsetTop - slabs[0].offsetTop || 52;
      const collapse = (i: number) => -((i - (n - 1) / 2) * pitch);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      tl.fromTo(slabs, { y: (i: number) => collapse(i) }, { y: 0, stagger: 0.05, duration: 0.5 }, 0);
      if (puck) tl.fromTo(puck, { top: "-6%", opacity: 0 }, { top: "100%", opacity: 1, duration: 0.5 }, 0);
      tl.to(labels, { opacity: 1, stagger: 0.08, duration: 0.15 }, 0.16);
      if (puck) tl.to(puck, { opacity: 0, duration: 0.15 }, 0.56);
      tl.to(slabs, { y: (i: number) => collapse(i), stagger: 0.05, duration: 0.4 }, 0.62);
      tl.to(labels, { opacity: 0, duration: 0.2 }, 0.64);

      tlRef.current = tl;
      (ScrollTrigger as { refresh: () => void }).refresh();
      setTimeout(() => {
        if (!killed) (ScrollTrigger as { refresh: () => void }).refresh();
      }, 200);
    })();

    return () => {
      killed = true;
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (!lenis || !stRef.current) return;
    const st = stRef.current;
    const on = () => st.update();
    lenis.on("scroll", on);
    return () => lenis.off("scroll", on);
  }, [lenis, animated]);

  return (
    <section
      ref={outerRef}
      className="relative border-t border-[var(--border-dark)] bg-void"
      style={animated ? { height: "300vh" } : undefined}
      aria-label="How the card is read"
    >
      <div
        className={
          animated
            ? "sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden"
            : "flex min-h-[80vh] flex-col items-center justify-center"
        }
      >
        <Container>
          <div className="mx-auto max-w-md text-center">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-signal/45">
              See it work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tightest text-signal sm:text-4xl">
              Sample in. Validated answer out.
            </h2>
          </div>

          <div className="relative mx-auto mt-12 h-[380px] w-full max-w-[440px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2"
              style={{ background: "var(--prism-gradient)", opacity: 0.22 }}
            />
            <div
              aria-hidden="true"
              className="cs-puck absolute left-1/2 h-14 w-[7px] -translate-x-1/2 rounded-full opacity-0"
              style={{ top: "-6%", background: "var(--prism-gradient)", filter: "blur(3px)" }}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3.5"
              role="img"
              aria-label="The METACARD cartridge separating into optical, microfluidic, sensing, reference and sealing zones with a beam of light passing through."
            >
              {ZONES.map((z, i) => (
                <div
                  key={z}
                  className="cs-slab relative flex h-10 w-full items-center rounded-md border border-[var(--border-dark)] bg-graphite"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: "var(--prism-gradient)", opacity: i === 1 ? 0.85 : 0.25 }}
                  />
                  <span
                    className={`cs-label pl-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal/60 ${
                      animated ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {z}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
