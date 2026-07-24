/**
 * Insights articles.
 *
 * Content lives here as typed data, not MDX: for a research-stage medical company
 * every published sentence is a compliance surface, so the copy is kept in one
 * reviewable file rather than scattered through markup. Each article opens with a
 * `stage` statement — the discipline the page promises — and the bodies stay
 * educational: what the science is, what the architecture does, and where the
 * engineering targets begin. No accuracy, sensitivity, approval or availability
 * claims appear here, by construction.
 *
 * A `published` article has a `body` and gets its own page at /insights/<slug>.
 * An `in-preparation` one is listed but not linked — the honest state for a piece
 * that has not been written and reviewed yet.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "pull"; text: string }
  | { kind: "list"; items: string[] }
  /** An inline figure that breaks out wider than the reading column. `image` is a
   *  manifest id in lib/images.ts. */
  | { kind: "figure"; image: string; alt: string; caption?: string };

export type Article = {
  slug: string;
  title: string;
  category: string;
  /** One-line standfirst shown under the title. */
  dek: string;
  /** The mandatory stage statement, shown as a banner at the top of the article. */
  stage: string;
  status: "published" | "in-preparation";
  /** Rough read time in minutes, for the index. */
  minutes?: number;
  /** Manifest id (lib/images.ts) for the lead image — the hero band and the index
   *  card thumbnail. */
  hero?: string;
  heroAlt?: string;
  body?: Block[];
};

const STAGE_DEFAULT =
  "Research-stage background. This article explains science and architecture; it is not a claim of clinical performance, regulatory approval or product availability.";

export const ARTICLES: Article[] = [
  {
    slug: "what-is-a-diagnostic-metasurface",
    title: "What is a diagnostic metasurface — and what is it not?",
    category: "Metasurface science",
    dek: "A patterned surface can control light. That is the starting point, not the finish line.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "surface-macro-1",
    heroAlt: "Extreme macro of an engineered surface lit at a grazing angle, a narrow band of cyan-to-violet structural colour across its fine texture.",
    body: [
      {
        kind: "p",
        text: "A metasurface is a deliberately patterned optical interface: a surface textured at a scale finer than the wavelength of the light that reads it, arranged so that the pattern — not a bulk lens or filter — controls how that light behaves. Depending on the design, it can shape amplitude, phase, direction, spectrum, polarization or the local field near the surface.",
      },
      {
        kind: "p",
        text: "In a diagnostic context, that control is useful because a measurement is, at bottom, a question asked of light: how much is absorbed, how a wavefront is delayed, which wavelengths return, how a field is enhanced where a sample sits. A structured surface lets some of those questions be asked by the surface itself, rather than only by the instrument reading it.",
      },
      {
        kind: "figure",
        image: "surface-macro-2",
        alt: "The same engineered surface lit face-on, where almost no structural colour survives — the response depends on the angle it is read at.",
        caption: "The same surface, read at a different angle. The response depends on the geometry, not the material.",
      },
      {
        kind: "pull",
        text: "A strong optical effect is a capability. A diagnostic test is a validated claim. The distance between them is the entire discipline.",
      },
      {
        kind: "h",
        text: "What it is not",
      },
      {
        kind: "p",
        text: "A metasurface is not, by itself, a test. Producing a large, repeatable optical response is a necessary condition for a measurement, never a sufficient one. Between a resonance in a lab and a result a clinician can act on lie sample handling, references, controls, calibration, manufacturing tolerance, and analytical and clinical evidence — none of which the physics supplies on its own.",
      },
      {
        kind: "p",
        text: "It is also not a coating or a decorative sheen. The structural colour a well-made surface shows is a side effect of the geometry, not the point of it; the point is the engineered relationship between the surface and the light that reads it, which is why the same surface returns different colour at different angles.",
      },
      {
        kind: "h",
        text: "Why it belongs on a card",
      },
      {
        kind: "p",
        text: "Moving an optical function into a disposable cartridge means part of the measurement travels with the sample. That is the architecture BIQADX is researching: a card that carries structured optics, and a reusable analyzer engineered to read it under controlled and repeatable conditions. The rest of this site describes how that pair is designed to stay honest about what it measures.",
      },
    ],
  },
  {
    slug: "resonance-is-not-a-test",
    title: "Why a strong optical resonance is not automatically a good diagnostic test",
    category: "Quality & validation",
    dek: "The gap between a striking measurement and a trustworthy result is where most of the work lives.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 6,
    hero: "quality-metrology",
    heroAlt: "An optical inspection microscope over an iridescent card on a precision stage, verifying geometry under controlled light.",
    body: [
      {
        kind: "p",
        text: "It is easy to be impressed by a sharp resonance or a bright enhancement. It is a mistake to treat that as evidence of a diagnostic. A signal that moves a great deal is only valuable if what moves it is the thing you meant to measure, if it moves the same way tomorrow, and if you can tell when it has not.",
      },
      {
        kind: "figure",
        image: "quality-surface",
        alt: "Extreme macro of the card's structured corner, a narrow cyan-to-violet sheen across its fine texture on a near-black ground.",
        caption: "Before a claim: the surface itself is measured. Evidence starts here, not at a result.",
      },
      {
        kind: "h",
        text: "Specificity, not just sensitivity",
      },
      {
        kind: "p",
        text: "A large response to the target is worth little if the same response appears for things that are not the target — other molecules, temperature, the matrix the sample arrives in. Establishing that a signal is specific is a separate body of work from showing that it is strong, and it is usually the harder one.",
      },
      {
        kind: "pull",
        text: "A measurement you cannot check is not a fast result. It is an unverified one.",
      },
      {
        kind: "h",
        text: "Repeatability and references",
      },
      {
        kind: "p",
        text: "A number is only meaningful against something known. That is why references and controls matter: an intensity reference to catch illumination drift, a wavelength reference to catch registration drift, internal controls to confirm the assay itself behaved. Without them, a run can produce a confident-looking value that nothing was in a position to challenge.",
      },
      {
        kind: "h",
        text: "The evidence ladder",
      },
      {
        kind: "p",
        text: "BIQADX describes what may be claimed in terms of four evidence layers — physics, fabricated component, integrated cartridge, and assay-and-system studies — where a statement may only stand as high as the evidence beneath it. A resonance in simulation or on a bench sits on the lower rungs. The upper rungs are studies, and until they are done the honest position is to say so.",
      },
      {
        kind: "list",
        items: [
          "A strong effect earns a hypothesis, not a claim.",
          "Specificity and stability are separate work from magnitude.",
          "References and controls are what let a single run check itself.",
          "Clinical performance is a study, never an inference from physics.",
        ],
      },
    ],
  },
  {
    slug: "cooperative-measurement-system",
    title: "How METACARD and OMEGA-PRO form a cooperative measurement system",
    category: "Analyzer systems",
    dek: "The card and the reader are designed together, because an optical zone cannot be specified alone.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "omega-hero",
    heroAlt: "Concept render of the OMEGA-PRO analyzer and its internal optical path.",
    body: [
      {
        kind: "p",
        text: "A cartridge optical zone cannot be specified independently of the instrument that reads it. The wavelength, the angle, the polarization, the numerical aperture, the detector response, the thermal state, the fluid's refractive index and the surface chemistry all enter the same measurement. Design the card alone and you have specified half of a system.",
      },
      {
        kind: "p",
        text: "So METACARD and OMEGA-PRO are researched as a cooperative pair with explicit interface controls: the card carries the structured optics, the microfluidics, the references and a machine-readable identity; the analyzer holds the illumination, detection, motion, thermal control and the software that governs a run.",
      },
      {
        kind: "figure",
        image: "metacard-hero",
        alt: "Concept render of the METACARD cartridge and a macro of its nanostructured surface.",
        caption: "The disposable half: structured optics, microfluidics, references and identity, in a card.",
      },
      {
        kind: "pull",
        text: "The card decides what is measured. The analyzer holds the conditions that make one card's reading comparable to another's.",
      },
      {
        kind: "h",
        text: "One geometry, held every run",
      },
      {
        kind: "p",
        text: "Repeatability is the quiet requirement underneath everything. The analyzer fixes the angles between illumination and detection, the stand-off to the card face, and where the card comes to rest against its stops — every run, so that a reading is comparable across cards and across time. The one thing that moves is the card being seated; the point is that it always stops in the same place.",
      },
      {
        kind: "h",
        text: "Identity and control travel with the card",
      },
      {
        kind: "p",
        text: "Each cartridge carries a machine-readable profile binding its family, lot, method and quality limits to the card itself. The analyzer reads that profile and configures the run accordingly, which is how one instrument can serve a family of assay-specific cartridges without the operator hand-configuring anything — and how an unauthorized or mismatched card can be refused rather than mis-run.",
      },
    ],
  },

  // In preparation — listed honestly, not linked, until written and reviewed.
  {
    slug: "optical-functions-into-the-cartridge",
    title: "Moving optical functions from the analyzer into the cartridge",
    category: "Cartridge engineering",
    dek: "What is gained, and what is harder, when part of the instrument becomes disposable.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "metacard-hero",
    body: [
      {
        kind: "p",
        text: "In a conventional analyzer, the optics live in the instrument and the consumable is a passive strip or well. Moving optical functions into the cartridge inverts part of that: the disposable now carries structure that shapes the light, so part of the measurement travels with the sample rather than waiting in the machine.",
      },
      {
        kind: "p",
        text: "The gain is specificity and integration. A structured surface can be tuned for the assay it serves, references can sit beside the sample they calibrate, and the fluidics that deliver the sample can be built into the same part. The cost that has to be kept expensive — precise illumination, detection and control — stays in the reusable analyzer, amortised across every run.",
      },
      {
        kind: "figure",
        image: "surface-macro-3",
        alt: "Extreme macro of a card's chamfered corner: only the textured top face carries a cyan-to-violet sheen while the edge stays plain.",
        caption: "The optics are a zone on the card, not the whole card — which is what lets the rest do other work.",
      },
      {
        kind: "pull",
        text: "Putting optics on the disposable is only an advantage if the disposable can be made to tolerance every time.",
      },
      {
        kind: "h",
        text: "What gets harder",
      },
      {
        kind: "p",
        text: "The difficulty moves to manufacturing. A structure that only works because it is fabricated to a fine tolerance must now be reproduced at the volume and cost of a consumable, without drifting outside the limits the assay depends on. That is why manufacturability, replication and inline metrology are treated as first-order engineering problems here, not afterthoughts.",
      },
    ],
  },
  {
    slug: "four-evidence-layers",
    title: "The four evidence layers, from simulation to clinical validation",
    category: "Quality & validation",
    dek: "How high a claim is allowed to stand, and why the upper layers are studies not yet done.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 6,
    hero: "surface-macro-4",
    body: [
      {
        kind: "p",
        text: "A claim in diagnostics is only as strong as the evidence directly beneath it. BIQADX organises that evidence as four layers, and treats the rule as one-directional: a statement may stand as high as the layer it is actually supported by, and no higher. Most of what makes a striking demonstration exciting sits on the lower two layers.",
      },
      {
        kind: "h",
        text: "The four layers",
      },
      {
        kind: "list",
        items: [
          "Physics — simulation and theory: the effect is possible and understood in principle.",
          "Component — a fabricated structure measured on the bench behaves as the physics predicts.",
          "Integrated cartridge — the structure still behaves once it is inside a real card with fluidics, references and a sample.",
          "Assay & system studies — the full card-and-analyzer measures a defined quantity with characterised analytical and, ultimately, clinical performance.",
        ],
      },
      {
        kind: "figure",
        image: "quality-metrology",
        alt: "An optical inspection microscope over an iridescent card on a precision stage under controlled light.",
        caption: "Each layer up the ladder is a separate body of measurement, not a stronger adjective for the last one.",
      },
      {
        kind: "pull",
        text: "The physics layer earns a hypothesis. Only the top layer earns a performance claim — and that layer is studies, not inference.",
      },
      {
        kind: "h",
        text: "Why the upper layers are not done yet",
      },
      {
        kind: "p",
        text: "The upper layers are studies that take defined samples, protocols, reference methods, statistics and — for the clinical layer — appropriate oversight. At a research and prototype stage those studies are planned rather than completed, which is exactly why this site presents targets and architecture, and states the stage on every page, rather than reporting performance the evidence does not yet support.",
      },
      {
        kind: "p",
        text: "Reading the ladder the wrong way — letting a strong lower-layer result stand in for an upper-layer claim — is the single most common way diagnostic communication goes wrong. Keeping the layers explicit is a way of making that mistake visible instead of easy.",
      },
    ],
  },
  {
    slug: "references-on-the-cartridge",
    title: "Why intensity and wavelength references belong on the cartridge",
    category: "Quality & validation",
    dek: "Known values that travel with the sample, so a single run can check itself.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "quality-surface",
    body: [
      {
        kind: "p",
        text: "A measured number means nothing until it is placed against something known. In a laboratory that something is a calibrator run alongside the sample. On a decentralized cartridge there is no technician to run a separate calibrator each time — so the known values are built onto the card itself, beside the sample, and read in the same instant under the same conditions.",
      },
      {
        kind: "h",
        text: "Two references, two different drifts",
      },
      {
        kind: "p",
        text: "An intensity reference is a zone of known optical response: if the illumination dims or the detector's gain wanders, that zone moves too, and the run can correct for it or refuse. A wavelength reference is a feature at a known spectral position: if the reading registers slightly off, the reference reveals the offset. They guard against different failures, which is why both belong on the card rather than either one standing in for the other.",
      },
      {
        kind: "figure",
        image: "quality-surface",
        alt: "Extreme macro of the card's structured corner, a narrow cyan-to-violet sheen across its fine texture on a near-black ground.",
        caption: "References are structure on the card, read in the same frame as the sample — not a separate step.",
      },
      {
        kind: "pull",
        text: "A reference that travels with the sample turns a single reading into one that can be audited on its own.",
      },
      {
        kind: "h",
        text: "Controls close the loop",
      },
      {
        kind: "p",
        text: "Beyond optical references, internal controls confirm that the assay chemistry itself behaved on this card, on this run — that the sample flowed, that the reagents were active. Together, references and controls are what let the software gate a result: a run that cannot demonstrate its own references and controls were in range is withheld, not reported. The point of putting them on the card is that this check happens every time, without depending on the operator to remember it.",
      },
    ],
  },
  {
    slug: "sers-lspr-fluorescence",
    title: "SERS, LSPR and fluorescence: different physics, different validation questions",
    category: "Metasurface science",
    dek: "Why the measurement mechanism changes what has to be proven about it.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 6,
    hero: "surface-macro-3",
    body: [
      {
        kind: "p",
        text: "“Optical biosensing” is not one technique. A structured surface can enhance a measurement through several distinct physical mechanisms, and they are not interchangeable: each asks a different question of the light, and so each carries a different set of things that must be proven before a result can be trusted.",
      },
      {
        kind: "list",
        items: [
          "SERS — surface-enhanced Raman: the structure amplifies a molecule's vibrational fingerprint, giving chemical specificity but demanding tight control of where and how strongly the field is enhanced.",
          "LSPR — localized surface plasmon resonance: binding near the surface shifts a resonance; sensitive to refractive-index change, so it must be defended against non-specific binding and matrix effects.",
          "Fluorescence: a label emits light; bright and established, but dependent on the label, on background, and on photostability rather than on the surface alone.",
        ],
      },
      {
        kind: "figure",
        image: "surface-macro-3",
        alt: "Extreme macro of a structured surface at a grazing angle, a narrow cyan-to-violet sheen across its fine texture.",
        caption: "One surface, several possible mechanisms — and each mechanism changes the validation question.",
      },
      {
        kind: "pull",
        text: "Choosing the mechanism is choosing the evidence you will have to produce. They are the same decision.",
      },
      {
        kind: "h",
        text: "Why the distinction is not academic",
      },
      {
        kind: "p",
        text: "A field enhancement that makes SERS possible says nothing about a fluorescence assay's background, and an LSPR shift that tracks the target also tracks temperature and the sample matrix unless that is specifically controlled for. Treating these as one “optical sensor” hides exactly the questions validation has to answer. BIQADX's position is that the mechanism is chosen per assay, and the evidence plan is written to that mechanism — not borrowed from a different one because the surface looks similar.",
      },
    ],
  },
  {
    slug: "manufacturing-metasurfaces-in-polymer",
    title: "Manufacturing metasurfaces in polymer: from master to replicated cartridge",
    category: "Cartridge engineering",
    dek: "Reproducing a sub-wavelength structure faithfully, at volume, is the real problem.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 6,
    hero: "ip-nanofab",
    body: [
      {
        kind: "p",
        text: "Making one metasurface in a cleanroom is a solved kind of problem. Making millions of them, in polymer, at the cost and cadence of a disposable, while every copy stays inside the tolerance the optics depend on — that is the problem that decides whether a card-format platform is real.",
      },
      {
        kind: "h",
        text: "Master, then replica",
      },
      {
        kind: "p",
        text: "The approach BIQADX is researching separates the two hard things. A master carries the true sub-wavelength structure, made once with precision tooling. Production then replicates that master into polymer — the general family of roll-to-roll and imprint methods used across optics manufacturing — so the expensive precision is spent once and reproduced many times rather than re-created per part.",
      },
      {
        kind: "figure",
        image: "ip-nanofab",
        alt: "Near-black macro of a nanofabricated master surface under raking light, a faint ordered iridescence across it.",
        caption: "The precision lives in the master. Manufacturing is the discipline of copying it faithfully.",
      },
      {
        kind: "pull",
        text: "The interesting number is not how good the best card is. It is how little the worst acceptable card differs from it.",
      },
      {
        kind: "h",
        text: "Fidelity is the whole game",
      },
      {
        kind: "p",
        text: "A replica is never a perfect copy. Feature height, edge sharpness and pattern registration all drift a little, and beyond some limit that drift changes the optical response enough to matter. So replication is inseparable from metrology: inline measurement that verifies each production run still sits inside the acceptance window, and rejects what does not. A card whose structure cannot be shown to be in-spec is not a cheaper card — it is an unmeasured one.",
      },
      {
        kind: "p",
        text: "This is why manufacturability is treated as a research question here and not a later logistics detail. A design that cannot be replicated within tolerance at cost is not a diagnostic that happens to be expensive; at the volumes decentralized care needs, it is not yet a diagnostic at all.",
      },
    ],
  },
  {
    slug: "not-one-universal-cartridge",
    title: "Why one universal cartridge cannot safely replace assay-specific families",
    category: "Cartridge engineering",
    dek: "Different chemistries need different cards; a shared reader interface is what makes that a family.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "roadmap-families",
    body: [
      {
        kind: "p",
        text: "It is tempting to promise one universal cartridge that measures everything. It is also, for real chemistries, unsafe. A coagulation measurement, an electrolyte panel, an immunoassay and a molecular test make genuinely different demands on fluidics, reagents, sensing zones, timing and temperature. Forcing them onto one identical consumable means compromising every one of them at the point where compromise is least acceptable.",
      },
      {
        kind: "h",
        text: "What actually stays common",
      },
      {
        kind: "p",
        text: "The thing that can be shared is not the card — it is the interface to the reader. The card's outer geometry, how it seats, where its references sit, and the machine-readable profile that tells the analyzer what it is holding: keep those constant, and the analyzer can serve many assay-specific cartridges without being reconfigured by hand. That shared interface is what turns a set of different cards into a family rather than a pile of unrelated products.",
      },
      {
        kind: "figure",
        image: "roadmap-families",
        alt: "Near-black still of several diagnostic cards fanned in sequence, a faint cyan-to-violet sheen along their structured edges.",
        caption: "Different chemistries, different cards — one shared interface to the same analyzer.",
      },
      {
        kind: "pull",
        text: "A platform is not one card that does everything. It is many honest cards that a single reader knows how to read.",
      },
      {
        kind: "h",
        text: "Why this is the safer architecture",
      },
      {
        kind: "p",
        text: "Each cartridge family can then be developed, validated and released on its own evidence, at its own pace, without a claim about one implying a claim about another. A card carries its own family, lot, method and quality limits, and the analyzer refuses what it is not configured to run. The result is a system that can grow assay by assay while keeping each assay's evidence — and each assay's limits — separate and legible.",
      },
    ],
  },
  {
    slug: "role-of-ai-after-controls",
    title: "The role of AI after calibration, controls and data integrity",
    category: "Responsible innovation",
    dek: "Where governed machine learning may help, and the lines it must not cross.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 6,
    hero: "udos-control",
    body: [
      {
        kind: "p",
        text: "There is a version of AI in diagnostics that is marketing, and a version that is engineering. The difference is where it sits. BIQADX's position is that machine learning enters only after the deterministic work is done — after calibration, after references and controls, after the data's integrity is established — and never as a substitute for any of it.",
      },
      {
        kind: "h",
        text: "Deterministic first",
      },
      {
        kind: "p",
        text: "The parts of a run that decide whether a result is trustworthy are handled by fixed, inspectable logic: the references corrected, the controls in range, the validity gate passed or the result withheld. None of that is learned or probabilistic. A model does not get to overrule a failed control or rescue a run that the deterministic layer says is invalid.",
      },
      {
        kind: "figure",
        image: "udos-control",
        alt: "Near-black still of an analyzer's internal control surface under low light, a faint prism line along one edge, its screen dark.",
        caption: "Control and validity are deterministic. Learning is allowed on top of that floor, never beneath it.",
      },
      {
        kind: "pull",
        text: "AI is permitted to make a good measurement more useful. It is not permitted to make an invalid one look valid.",
      },
      {
        kind: "h",
        text: "Where learning can earn its place",
      },
      {
        kind: "p",
        text: "Given a measurement the deterministic layer already trusts, governed models may help with pattern recognition, denoising, drift detection or flagging anomalies for review. “Governed” is the operative word: any such model is versioned, its training and change control documented, its influence bounded, and its behaviour subject to the same evidence discipline as the rest of the system. It assists interpretation; it does not author truth.",
      },
      {
        kind: "p",
        text: "The line it must not cross is fabrication — inventing, smoothing or completing a result the raw measurement did not support. A number a clinician acts on has to trace back to something the instrument actually measured and the controls actually vouched for. That traceability is what keeps machine learning a tool here rather than a liability.",
      },
    ],
  },
  {
    slug: "designing-for-small-clinics",
    title: "Designing diagnostic technology for small clinics and rural care",
    category: "Diagnostic access",
    dek: "What decentralized, clinic-first deployment asks of the engineering.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "about-clinic-first",
    body: [
      {
        kind: "p",
        text: "A diagnostic designed for a reference laboratory can assume a great deal: trained technicians, stable power, cold storage, calibration routines, service contracts and time. A diagnostic designed for a small clinic or a rural facility can assume almost none of it. Designing clinic-first means treating those absences as the specification, not as edge cases to apologise for later.",
      },
      {
        kind: "h",
        text: "The constraints become the design",
      },
      {
        kind: "list",
        items: [
          "Limited operator time and training — the run has to configure itself from the card, not from the person.",
          "Unreliable power and no cold chain — the consumable and the analyzer have to tolerate the real environment.",
          "No on-site metrologist — references and controls must ride on the card so each run can check itself.",
          "Distance from follow-up — a result that cannot be trusted on its own is worse than no result, so an uncertain run is withheld.",
        ],
      },
      {
        kind: "figure",
        image: "about-clinic-first",
        alt: "A community primary-care setting in soft daylight, a small unbranded portable device at hand, its screen off.",
        caption: "The setting is the specification: what the clinic lacks is what the engineering has to supply.",
      },
      {
        kind: "pull",
        text: "Decentralized does not mean a smaller lab. It means moving the lab's guarantees onto the card and into the reader.",
      },
      {
        kind: "h",
        text: "Why this is architecture, not packaging",
      },
      {
        kind: "p",
        text: "These requirements are why the platform is split the way it is — expensive precision kept in a reusable analyzer, self-checking references and identity carried on a disposable card, and a deterministic validity gate that would rather withhold than mislead. Clinic-first is not a coat of ruggedised paint on a lab instrument; it is the reason the system is shaped like this in the first place.",
      },
    ],
  },
  {
    slug: "sustainable-consumables",
    title: "Sustainable medical consumables: claims that require real testing",
    category: "Responsible innovation",
    dek: "Biodegradable, recyclable and reduced-material are distinct claims — each needs its own evidence.",
    stage: STAGE_DEFAULT,
    status: "published",
    minutes: 5,
    hero: "sustainability-film",
    body: [
      {
        kind: "p",
        text: "A single-use card is, by design, waste. Taking that seriously means being precise about sustainability rather than reaching for a comfortable word. “Eco-friendly” is not a claim; it is a gesture. The useful claims are specific ones — and each specific claim is a separate thing to test.",
      },
      {
        kind: "list",
        items: [
          "Biodegradable — breaks down under defined conditions in a defined time. Which conditions, and how completely, is the whole question.",
          "Recyclable — can actually re-enter a real recycling stream, not merely be made of a material that is recyclable in principle.",
          "Reduced-material — uses measurably less mass or fewer problematic components than a baseline that has to be named to mean anything.",
        ],
      },
      {
        kind: "figure",
        image: "sustainability-film",
        alt: "Near-black macro of a thin translucent polymer film curling under raking light, a faint cyan-to-violet edge sheen.",
        caption: "Three different claims, three different tests. The material alone settles none of them.",
      },
      {
        kind: "pull",
        text: "The honest sustainability claim is the narrow one you can measure — not the broad one that sounds better.",
      },
      {
        kind: "h",
        text: "The medical constraint comes first",
      },
      {
        kind: "p",
        text: "A consumable that touches a clinical sample also has to meet requirements that do not bend for sustainability: material stability, the optical fidelity the assay depends on, contamination control, and safe handling of biological waste. A greener material that degrades the measurement or the safety of the device is not a trade-off worth making. So sustainability here is researched inside those constraints — as claims that must be earned by testing and stated at the level the evidence supports, exactly like every other claim on this platform.",
      },
    ],
  },
];

export const PUBLISHED = ARTICLES.filter((a) => a.status === "published");

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug && a.status === "published");
}
