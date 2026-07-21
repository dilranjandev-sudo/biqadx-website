import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FaqItem } from "@/components/faq/FaqItem";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about BIQADX, METACARD, OMEGA-PRO, metasurfaces, the test roadmap, validation, AI, patents and product availability.",
};

/**
 * Grouped rather than run as one list of fifteen. The stage-and-claims answers
 * are the ones that matter most for a research-stage medical company, so they get
 * their own titled section instead of being buried mid-scroll.
 */
const GROUPS = [
  {
    title: "The platform",
    intro: "What the terms mean and what the architecture is.",
    items: [
      {
        q: "What is BIQADX?",
        a: "An India-based deep-tech healthcare R&D company developing metasurface-integrated diagnostic cartridges, cooperative analyzers, diagnostic software-control systems and responsible medical technologies.",
      },
      {
        q: "What is a metasurface?",
        a: "A deliberately patterned optical interface that controls one or more properties of light — phase, amplitude, direction, spectrum, polarization or local field. In diagnostics it can support coupling, filtering, focusing, resonance, enhancement, computational imaging, calibration or authentication.",
      },
      {
        q: "What is METACARD?",
        a: "A research-stage multi-modal cartridge architecture combining microfluidics, optical and metasurface zones, electrochemical interfaces, assay regions, references and machine-readable identity.",
      },
      {
        q: "What is OMEGA-PRO?",
        a: "The reusable cooperative analyzer intended to position and interrogate METACARD cartridges using controlled optical, electrical, thermal, motion and software systems.",
      },
      {
        q: "Is METACARD one identical cartridge for every test?",
        a: "No. Different assays require different sample types, anticoagulants, reagents, fluidics and interfaces. BIQADX develops a family architecture that shares a reader interface while using assay-specific cartridges.",
      },
      {
        q: "What does the fourteen-method architecture mean?",
        a: "The platform is engineered around fourteen core measurement-physics families. It does not mean fourteen clinically validated methods are currently available.",
      },
    ],
  },
  {
    title: "Stage, claims and validation",
    intro: "What is not being claimed, and why.",
    items: [
      {
        q: "Does BIQADX already offer approximately 200 tests?",
        a: "No. It refers to a long-term candidate roadmap across future cartridge families. Each assay requires development, analytical and clinical validation, manufacturing control and regulatory authorization.",
      },
      {
        q: "Are BIQADX products available for purchase or clinical use?",
        a: "No. The programs described are in research, prototype, engineering-development or validation-planning stages unless BIQADX later publishes a verified product release.",
      },
      {
        q: "Are METACARD or OMEGA-PRO clinically validated?",
        a: "No clinical validation is claimed. Validation must be completed for the specific cartridge family, assay, reader configuration, software version and intended use.",
      },
      {
        q: "Are BIQADX products regulatory approved?",
        a: "No regulatory approval should be assumed. Any future approval will be stated only with the relevant authority, product, intended use and verified documentation.",
      },
      {
        q: "Does artificial intelligence diagnose patients?",
        a: "No. BIQADX does not present AI as an autonomous doctor. AI may support reconstruction, analysis or workflow only within a controlled method and cannot bypass calibration, internal controls, safety or validity rules.",
      },
      {
        q: "What does “patent filed” mean?",
        a: "An intellectual-property application has been submitted. It does not prove clinical performance, product readiness, regulatory approval or that a patent will be granted.",
      },
      {
        q: "Does the website provide medical advice?",
        a: "No. Website content is for research, company and collaboration information. It is not medical advice, diagnosis, treatment guidance or a substitute for a qualified healthcare professional.",
      },
    ],
  },
  {
    title: "Working with BIQADX",
    intro: "Who we can talk to, and about what.",
    items: [
      {
        q: "Can researchers, manufacturers or investors collaborate?",
        a: "Yes. BIQADX welcomes serious inquiries involving research, prototyping, manufacturing, assay development, validation, regulation, funding and public-health implementation.",
      },
      {
        q: "Can hospitals or clinics procure the platform now?",
        a: "No. Procurement or routine clinical deployment is not available unless BIQADX formally announces a validated and authorized product.",
      },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function FaqPage() {
  return (
    <section className="relative isolate overflow-clip bg-void">
      {/* The photograph is held fixed behind the whole page — the questions scroll
          over it. A sticky layer with a negative margin equal to its own height
          pins the image to the viewport while contributing no height of its own,
          so the copy sits directly on the picture.
          The image is the closed analyzer with a blank card at rest: its left
          side falls to near-black — exactly where the copy sits — while the
          machine catches the light on the right. So the scrims can stay light and
          the picture reads bright, yet every line still clears AA. */}
      <div className="pointer-events-none sticky top-0 -z-10 -mb-[100svh] h-[100svh] overflow-hidden">
        <Image
          src="/images/faq-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(1.2)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,14,20,0.32) 0%, rgba(11,14,20,0.3) 45%, rgba(11,14,20,0.55) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,14,20,0.72) 0%, rgba(11,14,20,0.34) 48%, rgba(11,14,20,0) 100%)",
          }}
        />
      </div>

      <Container className="relative py-24 sm:py-32">
        {/* Title, on the picture */}
        <Reveal>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-signal/70">
            FAQ
          </p>
        </Reveal>
        <h1
          className="mt-4 max-w-3xl font-display text-[2.4rem] font-bold leading-[1.02] tracking-tightest text-signal sm:text-5xl md:text-[3.5rem]"
          style={{ textShadow: "0 1px 14px rgba(11,14,20,0.6)" }}
        >
          Frequently asked questions.
        </h1>
        <p
          className="mt-6 max-w-xl font-body text-base leading-relaxed text-signal/85 sm:text-lg"
          style={{ textShadow: "0 1px 10px rgba(11,14,20,0.55)" }}
        >
          What we are, and what we are not.
        </p>

        {/* Groups — questions set directly on the photograph */}
        <div className="mt-16 max-w-2xl space-y-14 sm:mt-20 sm:space-y-16">
          {GROUPS.map((g, gi) => (
            <div key={g.title}>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-signal/70">
                    {pad(gi + 1)} / {pad(GROUPS.length)}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-signal/30" />
                </div>
                <h2
                  className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-signal sm:text-[1.75rem]"
                  style={{ textShadow: "0 1px 10px rgba(11,14,20,0.55)" }}
                >
                  {g.title}
                </h2>
                <p
                  className="mt-3 max-w-md font-body text-sm leading-relaxed text-signal/75"
                  style={{ textShadow: "0 1px 8px rgba(11,14,20,0.5)" }}
                >
                  {g.intro}
                </p>
              </Reveal>

              <div className="mt-6">
                {g.items.map((item, i) => (
                  <ScrollReveal key={item.q} delay={Math.min(i, 4) * 0.05}>
                    <FaqItem {...item} tone="dark" />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
