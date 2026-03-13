import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { TOOL_ITEMS } from "@/lib/tools";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { VideoAutoplay } from "@/components/VideoAutoplay";

// ── Inline icons ─────────────────────────────────────────────────────────────

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-5 w-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

type ImpactStat = {
  stat: string;
  label: string;
  source: string;
};

const IMPACT_STATS: ImpactStat[] = [
  {
    stat: "1.3B",
    label: "people worldwide live with a disability",
    source: "WHO, 2023",
  },
  {
    stat: "97%",
    label: "of top websites fail basic accessibility tests",
    source: "WebAIM Million, 2024",
  },
  {
    stat: "71%",
    label: "of users with disabilities leave inaccessible sites",
    source: "Click-Away Pound Report",
  },
];

type Pillar = {
  Icon: () => JSX.Element;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    Icon: IconGlobe,
    title: "It's a civil right",
    body: "The web was built for everyone. When products are inaccessible, people are locked out of banking, healthcare, education, and work — not by circumstance, but by design.",
  },
  {
    Icon: IconShield,
    title: "It's the law",
    body: "The ADA, European Accessibility Act, EN 301 549, and dozens of national standards make digital accessibility a legal requirement in most global markets.",
  },
  {
    Icon: IconStar,
    title: "It makes products better",
    body: "Captions help people in noisy rooms. High contrast helps in bright sunlight. Clear structure helps everyone navigate faster. Accessible design is simply good design.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <article>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden px-4 py-32 md:px-6 md:py-44 lg:py-52"
        aria-labelledby="hero-heading"
      >
        {/* Layered grain gradient */}
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />

        {/* Film grain noise */}
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden="true" />

        {/* Radial vignette — depth & cinematic feel */}
        <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Badge */}
          <p
            className="mb-7 inline-block rounded-full border border-blue-300/60 dark:border-white/20 bg-blue-100/70 dark:bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-blue-800 dark:text-white/80 backdrop-blur-sm"
            aria-hidden="true"
          >
            Accessible Design · WCAG 2.2
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-extrabold leading-[1.10] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Inclusive experiences aren&apos;t an extra feature
            <span className="hero-accent"> — they&apos;re the foundation</span>
          </h1>

          {/* Supportive text */}
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 dark:text-white/75 md:text-xl">
            Beyond UI. Creating experiences for everyone
          </p>
        </div>
      </section>

      {/* ── Section cards ─────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-8 md:px-6"
        aria-label="Documentation sections"
      >
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={`/docs/${slug}`}
                className="flex items-center gap-4 rounded border border-border bg-bg p-5 hover:border-focus-ring hover:bg-focus-ring/5 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
              >
                <SectionCardIcon slug={slug} className="shrink-0" />
                <span className="font-medium text-fg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Accessibility Tools ───────────────────── */}
      <section
        className="border-t border-border px-4 py-12 md:px-6"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2
              id="tools-heading"
              className="text-2xl font-bold text-fg sm:text-3xl"
            >
              Accessibility Tools
            </h2>
            <p className="mt-2 text-fg-muted">
              Interactive checks to audit and improve your designs.
            </p>
          </div>

          <ToolsCarousel tools={TOOL_ITEMS} />
        </div>
      </section>
    </article>
  );
}
