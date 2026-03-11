import { TOOL_ITEMS } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { VideoAutoplay } from "@/components/VideoAutoplay";

// ── Inline icon components ────────────────────────────────────────────────────

function IconGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5"
    >
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
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden px-4 py-32 md:px-6 md:py-44 lg:py-52"
        aria-labelledby="hero-heading"
      >
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p
            className="mb-7 inline-block rounded-full border border-blue-300/60 dark:border-white/20 bg-blue-100/70 dark:bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-blue-800 dark:text-white/80 backdrop-blur-sm"
            aria-hidden="true"
          >
            Accessible Design · WCAG 2.2
          </p>

          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-extrabold leading-[1.10] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Inclusive experiences aren&apos;t an extra feature
            <span className="hero-accent"> — they&apos;re the foundation</span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-600 dark:text-white/75 md:text-xl">
            Beyond UI. Creating experiences for everyone
          </p>
        </div>
      </section>

      {/* ── Impact stats ───────────────────────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-16 md:px-6"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">
          Impact by the numbers
        </h2>

        <dl className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3">
          {IMPACT_STATS.map(({ stat, label, source }) => (
            <div key={stat} className="flex flex-col items-center text-center">
              <dt className="sr-only">{label}</dt>
              <dd
                className="text-5xl font-black tabular-nums tracking-tight text-focus-ring"
                aria-label={`${stat} — ${label}`}
              >
                {stat}
              </dd>
              <p className="mt-2 text-sm font-medium leading-snug text-fg">{label}</p>
              <p className="mt-1 text-xs text-fg-muted">{source}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Narrative callout — side by side ──────────────────────────────── */}
      <section
        className="border-t border-border landing-callout px-4 py-16 md:px-6 lg:py-20"
        aria-labelledby="narrative-heading"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left — text */}
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-focus-ring"
              aria-hidden="true"
            >
              The bigger picture
            </p>
            <h2
              id="narrative-heading"
              className="mb-5 text-2xl font-bold leading-snug text-fg sm:text-3xl"
            >
              This is bigger than UI
            </h2>
            <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
              When a button has no label, or a form gives no error guidance, or a page can&apos;t be
              navigated by keyboard — most users shrug it off. For 1.3 billion people, those
              aren&apos;t quirks. They&apos;re locked doors.
            </p>
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
              Accessible design is the practice of removing those locks — one decision at a time.
              Every color choice, every label, every interactive state is a chance to include or
              exclude someone.
            </p>
          </div>

          {/* Right — video in a 16:9 frame; VideoAutoplay auto-plays on scroll into view */}
          <div className="relative w-full overflow-hidden rounded-xl border border-border shadow-sm aspect-square">
            <VideoAutoplay />
          </div>

        </div>
      </section>

      {/* ── Why it matters: 3 pillars ──────────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-16 md:px-6"
        aria-labelledby="pillars-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2 id="pillars-heading" className="sr-only">
            Why accessibility matters
          </h2>

          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-3">
            {PILLARS.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="rounded-lg border border-border bg-bg p-6"
              >
                <span
                  className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-focus-ring/10 text-focus-ring"
                  aria-hidden="true"
                >
                  <Icon />
                </span>
                <h3 className="mb-2 text-base font-semibold text-fg">{title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Accessibility Tools ────────────────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-16 md:px-6"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-7">
            <h2
              id="tools-heading"
              className="text-xl font-bold text-fg sm:text-2xl"
            >
              Quick checks
            </h2>
            <p className="mt-1 text-sm text-fg-muted">
              Interactive tools to audit and improve your designs — no setup needed.
            </p>
          </div>

          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TOOL_ITEMS.map((tool) => (
              <ToolCard
                key={tool.slug}
                slug={tool.slug}
                title={tool.title}
                description={tool.description}
              />
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
