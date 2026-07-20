"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "@/components/motion/LenisProvider";
import { motionDisabled } from "@/lib/motion";

const SLIDES = [
  {
    img: "/images/seq-1-sample.png",
    title: "Apply the sample.",
    alt: "A gloved hand releasing a clear droplet from a pipette onto the micro-textured surface of a thin card resting on a dark steel bench, the analyzer out of focus behind.",
  },
  {
    img: "/images/seq-2-seat.png",
    title: "Seat the card.",
    alt: "A gloved hand sliding the card into the open loading port of the off-white benchtop analyzer, its touchscreen dark.",
  },
  {
    img: "/images/seq-3-interrogate.png",
    title: "The surface is interrogated.",
    alt: "The seated card under an optical objective ringed by an illuminated white collar, a narrow band of cyan-violet structural colour raised across the card's textured face.",
  },
  {
    img: "/images/seq-4-validate.png",
    title: "The system checks itself.",
    alt: "The objective stepped across to the card's reference row and registration cutout, a tight pool of cool light beneath it.",
  },
  {
    // NOTE: the supplied seq-5-result.png cannot ship — it shows a full interface
    // with a green tick, "PASS", and an invented inspection summary (uniformity,
    // contrast, defect count). Result screens and fabricated data are both barred
    // (CLAUDE.md, image rules). Standing in with the enclosed-machine shot, which
    // carries the same "nothing is released" reading and stays on-message.
    // Replace once a compliant step-5 frame exists — screen dark, nothing shown.
    img: "/images/omega-exterior.png",
    title: "Released only when valid.",
    alt: "The analyzer standing closed and quiet on a dark bench, its touchscreen dark and nothing displayed.",
  },
];

const HEIGHT_VH = 560;

/**
 * "See it work" — a pinned sequence viewer. The five frames cross-fade inside a
 * held stage as the section is scrubbed, with the step caption set on the
 * photograph itself. GSAP scrub; reduced-motion → first frame + a plain step list.
 *
 * The stage holds 3:2 because the sequence photography is 3:2: filling the
 * viewport with `object-cover` cropped 13% away on desktop and 69% on a phone,
 * cutting the pipette, the card and the objective — the subject of every frame —
 * out of shot. It is sized off the viewport *height* (`86svh * 1.5`) rather than
 * the container width, so it runs as wide as it can while still fitting on screen
 * at that aspect, and grows on taller displays.
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
          imgRefs.current.forEach((el, i) => {
            if (!el) return;
            const d = Math.abs(pos - i);
            el.style.opacity = String(Math.max(0, 1 - d));
            // Each frame settles as it becomes the active one, rather than the
            // whole stage zooming — the photograph stays fully in view.
            el.style.transform = `scale(${(1 + 0.05 * Math.min(1, d)).toFixed(4)})`;
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
      if (stRef.current)
        stRef.current.getAll().forEach((t: { kill: () => void }) => t.kill());
    };
  }, [lenis]);

  return (
    <section
      ref={outerRef}
      className="relative bg-void"
      style={animated ? { height: `${HEIGHT_VH}vh` } : undefined}
      aria-label="How it works"
    >
      <div
        className={
          animated
            ? "sticky top-0 flex h-[100svh] items-center justify-center px-4 sm:px-6"
            : "relative px-4 py-20 sm:px-6"
        }
      >
        {/* Stage — sized off the viewport height so it runs as wide as it can at
            3:2 and still fit on screen. It sits outside Container deliberately:
            the content grid would cap it at 1152px and waste width on the large,
            tall displays where this sequence reads best. */}
        <div
          className="relative overflow-hidden rounded-xl border border-[var(--border-dark)] bg-graphite/30"
          style={{
            width: "min(calc(100vw - 2rem), calc(86svh * 1.5), 1600px)",
            aspectRatio: "3 / 2",
          }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.img}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0, transform: "scale(1)" }}
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
          ))}

          {/* Scrims — the label and caption sit on the photograph, so each
                needs its own ground rather than relying on what is behind it. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/4"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,14,20,0.75) 0%, rgba(11,14,20,0) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,14,20,0) 0%, rgba(11,14,20,0.72) 55%, rgba(11,14,20,0.92) 100%)",
            }}
          />

          <p className="absolute left-6 top-5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/75 sm:left-10 sm:top-8">
            See it work
          </p>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            {animated ? (
              <>
                <div className="relative h-20 sm:h-24">
                  {SLIDES.map((s, i) => (
                    <div
                      key={s.title}
                      ref={(el) => {
                        capRefs.current[i] = el;
                      }}
                      className="absolute inset-x-0 bottom-0"
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        transform:
                          i === 0 ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.55s ease, transform 0.55s ease",
                      }}
                    >
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-3 font-display text-2xl font-bold leading-[1.1] tracking-tightest text-signal sm:text-4xl">
                        {s.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <ol className="space-y-2">
                {SLIDES.map((s, i) => (
                  <li
                    key={s.title}
                    className="font-display text-xl font-bold tracking-tight text-signal sm:text-2xl"
                  >
                    <span className="mr-3 font-mono text-base text-signal/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
