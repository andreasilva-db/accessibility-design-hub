import { TOOL_ITEMS } from "@/lib/tools";
import { ToolsCarousel } from "@/components/ToolsCarousel";

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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex w-full items-center justify-center overflow-hidden px-4 py-36 md:px-6 md:py-48 lg:py-56"
        aria-labelledby="hero-heading"
      >
        <div className="hero-gradient absolute inset-0" aria-hidden="true" />
        <div className="hero-noise absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="hero-vignette absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            id="hero-heading"
            className="mb-6 text-4xl font-extrabold leading-[1.08] tracking-tighter text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            Inclusive experiences{" "}
            <br className="hidden sm:block" />
            aren&apos;t an extra feature
            <span className="gradient-text"> — they&apos;re the foundation</span>
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-500 dark:text-white/60 md:text-xl">
            Beyond UI. Creating experiences for everyone.
          </p>
        </div>
      </section>

      {/* ── Impact stats ─────────────────────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-16 md:px-6 md:py-20"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">Impact by the numbers</h2>

        <dl className="mx-auto grid max-w-4xl grid-cols-1 gap-0 sm:grid-cols-3">
          {IMPACT_STATS.map(({ stat, label, source }, i) => (
            <div
              key={stat}
              className={
                "flex flex-col items-center text-center px-8 py-6 " +
                (i < 2 ? "sm:border-r border-b sm:border-b-0 border-border" : "")
              }
            >
              <dt className="sr-only">{label}</dt>
              <dd
                className="stat-number text-5xl font-black tabular-nums tracking-tighter lg:text-6xl"
                aria-label={`${stat} — ${label}`}
              >
                {stat}
              </dd>
              <p className="mt-3 text-sm font-medium leading-snug text-fg max-w-[180px]">{label}</p>
              <p className="mt-1.5 text-xs text-fg-muted">{source}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Narrative callout ─────────────────────────────────────────────── */}
      <section
        className="border-t border-border landing-callout px-4 py-16 md:px-6 lg:py-24"
        aria-labelledby="narrative-heading"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — text */}
          <div>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.15em] gradient-text"
              aria-hidden="true"
            >
              The bigger picture
            </p>
            <h2
              id="narrative-heading"
              className="mb-5 text-2xl font-bold leading-snug tracking-tight text-fg sm:text-3xl"
            >
              This is bigger than UI
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                When a button has no label, or a form gives no error guidance, or a page can&apos;t be
                navigated by keyboard — most users shrug it off. For 1.3 billion people, those
                aren&apos;t quirks. They&apos;re locked doors.
              </p>
              <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
                Accessible design is the practice of removing those locks — one decision at a time.
                Every color choice, every label, every interactive state is a chance to include or
                exclude someone.
              </p>
            </div>
          </div>

          {/* Right — placeholder (VideoAutoplay coming in main branch) */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-border shadow-card aspect-square bg-surface" aria-hidden="true" />

        </div>
      </section>

      {/* ── Why it matters: 3 pillars ────────────────────────────────────── */}
      <section
        className="border-t border-border px-4 py-16 md:px-6 md:py-20"
        aria-labelledby="pillars-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2 id="pillars-heading" className="sr-only">Why accessibility matters</h2>

          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
            {PILLARS.map(({ Icon, title, body }) => (
              <li
                key={title}
                className="rounded-xl border border-border bg-surface p-6 shadow-card"
              >
                <span
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl icon-gradient-bg text-focus-ring"
                  aria-hidden="true"
                >
                  <Icon />
                </span>
                <h3 className="mb-2 text-sm font-bold tracking-tight text-fg">{title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Tools ────────────────────────────────────────────────────────── */}
      <section
        className="border-t border-border bg-surface px-4 py-16 md:px-6 md:py-20"
        aria-labelledby="tools-heading"
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.15em] gradient-text" aria-hidden="true">
                Quick checks
              </p>
              <h2
                id="tools-heading"
                className="text-xl font-bold tracking-tight text-fg sm:text-2xl"
              >
                Audit your design, right now
              </h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                Interactive tools — no setup, no sign-up.
              </p>
            </div>
          </div>

          <ToolsCarousel tools={TOOL_ITEMS} />
        </div>
      </section>

    </article>
  );
}
