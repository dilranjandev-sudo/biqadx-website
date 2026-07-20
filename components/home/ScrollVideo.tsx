"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

const BEATS = [
  { at: 0.0, title: "The card enters the analyzer." },
  { at: 0.42, title: "The surface is interrogated." },
  { at: 0.78, title: "A validated result is released." },
];

/**
 * Scroll-scrubbed background video (Apple/SpaceX style): a pinned clip whose
 * frames advance with scroll while captions cross-fade over it. GSAP is
 * dynamically imported; under reduced-motion / ?static=1 it falls back to a
 * static poster with the captions stacked.
 */
export function ScrollVideo({
  src = "/videos/hero.mp4",
  poster = "/images/home-platform.png",
}: {
  src?: string;
  poster?: string;
}) {
  const outerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stRef = useRef<any>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (motionDisabled()) return;
    let killed = false;
    let offScroll: (() => void) | undefined;

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
      const video = videoRef.current;
      if (killed || !root || !video) return;
      root.style.height = "300vh";
      video.pause();

      const dur = () =>
        Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ScrollTrigger as any).create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUpdate: (self: any) => {
          const d = dur();
          if (d) {
            try {
              video.currentTime = Math.min(d - 0.05, self.progress * d);
            } catch {
              /* seeking not ready */
            }
          }
          const p = self.progress;
          overlayRefs.current.forEach((el, idx) => {
            if (!el) return;
            const next = BEATS[idx + 1]?.at ?? 1.01;
            el.style.opacity = p >= BEATS[idx].at && p < next ? "1" : "0";
          });
        },
      });

      if (lenis) {
        const on = () => (ScrollTrigger as { update: () => void }).update();
        lenis.on("scroll", on);
        offScroll = () => lenis.off("scroll", on);
      }
      (ScrollTrigger as { refresh: () => void }).refresh();
    })();

    return () => {
      killed = true;
      if (offScroll) offScroll();
      if (stRef.current) stRef.current.getAll().forEach((t: { kill: () => void }) => t.kill());
    };
  }, [lenis]);

  return (
    <section
      ref={outerRef}
      className="relative bg-void"
      style={animated ? { height: "300vh" } : undefined}
      aria-label="The platform in motion"
    >
      <div
        className={
          animated
            ? "sticky top-0 flex h-[100svh] items-center overflow-hidden"
            : "relative flex min-h-[72vh] items-center overflow-hidden"
        }
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.5) 0%, rgba(11,14,20,0.2) 42%, rgba(11,14,20,0.85) 100%)",
          }}
        />

        <Container className="relative">
          {animated ? (
            <div className="relative h-44">
              {BEATS.map((b, i) => (
                <div
                  key={b.title}
                  ref={(el) => {
                    overlayRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center"
                  style={{ opacity: i === 0 ? 1 : 0, transition: "opacity 0.4s ease" }}
                >
                  <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tightest text-signal sm:text-5xl">
                    {b.title}
                  </h2>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 py-16">
              {BEATS.map((b) => (
                <h2
                  key={b.title}
                  className="max-w-2xl font-display text-2xl font-bold tracking-tight text-signal sm:text-3xl"
                >
                  {b.title}
                </h2>
              ))}
            </div>
          )}
        </Container>
      </div>
    </section>
  );
}
