import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSection } from "@/components/ui/ContentSection";
import { VoidBand } from "@/components/ui/PaperSection";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

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
      { q: "What is BIQADX?", a: "An India-based deep-tech healthcare R&D company developing metasurface-integrated diagnostic cartridges, cooperative analyzers, diagnostic software-control systems and responsible medical technologies." },
      { q: "What is a metasurface?", a: "A deliberately patterned optical interface that controls one or more properties of light — phase, amplitude, direction, spectrum, polarization or local field. In diagnostics it can support coupling, filtering, focusing, resonance, enhancement, computational imaging, calibration or authentication." },
      { q: "What is METACARD?", a: "A research-stage multi-modal cartridge architecture combining microfluidics, optical and metasurface zones, electrochemical interfaces, assay regions, references and machine-readable identity." },
      { q: "What is OMEGA-PRO?", a: "The reusable cooperative analyzer intended to position and interrogate METACARD cartridges using controlled optical, electrical, thermal, motion and software systems." },
      { q: "Is METACARD one identical cartridge for every test?", a: "No. Different assays require different sample types, anticoagulants, reagents, fluidics and interfaces. BIQADX develops a family architecture that shares a reader interface while using assay-specific cartridges." },
      { q: "What does the fourteen-method architecture mean?", a: "The platform is engineered around fourteen core measurement-physics families. It does not mean fourteen clinically validated methods are currently available." },
    ],
  },
  {
    title: "Stage, claims and validation",
    intro: "What is not being claimed, and why.",
    items: [
      { q: "Does BIQADX already offer approximately 200 tests?", a: "No. It refers to a long-term candidate roadmap across future cartridge families. Each assay requires development, analytical and clinical validation, manufacturing control and regulatory authorization." },
      { q: "Are BIQADX products available for purchase or clinical use?", a: "No. The programs described are in research, prototype, engineering-development or validation-planning stages unless BIQADX later publishes a verified product release." },
      { q: "Are METACARD or OMEGA-PRO clinically validated?", a: "No clinical validation is claimed. Validation must be completed for the specific cartridge family, assay, reader configuration, software version and intended use." },
      { q: "Are BIQADX products regulatory approved?", a: "No regulatory approval should be assumed. Any future approval will be stated only with the relevant authority, product, intended use and verified documentation." },
      { q: "Does artificial intelligence diagnose patients?", a: "No. BIQADX does not present AI as an autonomous doctor. AI may support reconstruction, analysis or workflow only within a controlled method and cannot bypass calibration, internal controls, safety or validity rules." },
      { q: "What does “patent filed” mean?", a: "An intellectual-property application has been submitted. It does not prove clinical performance, product readiness, regulatory approval or that a patent will be granted." },
      { q: "Does the website provide medical advice?", a: "No. Website content is for research, company and collaboration information. It is not medical advice, diagnosis, treatment guidance or a substitute for a qualified healthcare professional." },
    ],
  },
  {
    title: "Working with BIQADX",
    intro: "Who we can talk to, and about what.",
    items: [
      { q: "Can researchers, manufacturers or investors collaborate?", a: "Yes. BIQADX welcomes serious inquiries involving research, prototyping, manufacturing, assay development, validation, regulation, funding and public-health implementation." },
      { q: "Can hospitals or clinics procure the platform now?", a: "No. Procurement or routine clinical deployment is not available unless BIQADX formally announces a validated and authorized product." },
    ],
  },
];

function Question({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-ink/12">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 font-display text-base font-bold leading-snug tracking-tight text-ink [&::-webkit-details-marker]:hidden">
        {q}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mt-1 shrink-0 text-ink/65 transition-transform duration-300 group-open:rotate-45"
        >
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <p className="max-w-2xl pb-5 pr-10 font-body text-sm leading-relaxed text-ink/75">{a}</p>
    </details>
  );
}

export default function FaqPage() {
  return (
    <>
      <PageHero kicker="FAQ" title="Frequently asked questions about BIQADX." />

      {GROUPS.map((g, gi) => (
        <ContentSection
          key={g.title}
          no={`${String(gi + 1).padStart(2, "0")} / ${String(GROUPS.length).padStart(2, "0")}`}
          title={g.title}
          intro={g.intro}
          divider={gi > 0}
        >
          <div>
            {g.items.map((item, i) => (
              <ScrollReveal key={item.q} delay={Math.min(i, 4) * 0.04}>
                <Question {...item} />
              </ScrollReveal>
            ))}
          </div>
        </ContentSection>
      ))}

      <VoidBand>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Contact BIQADX
          </Link>
          <Link href="/legal/development-stage" className="btn-outline">
            Read the full disclaimer
          </Link>
        </div>
      </VoidBand>
    </>
  );
}
