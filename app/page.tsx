import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { TOOL_ITEMS } from "@/lib/tools";
import { SectionCardIcon } from "@/components/SectionCardIcon";
import { ToolCard } from "@/components/ToolCard";

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

          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
