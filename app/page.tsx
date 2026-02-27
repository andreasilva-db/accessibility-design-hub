import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";
import { SectionCardIcon } from "@/components/SectionCardIcon";

export default function HomePage() {
  return (
    <article>
      <section
        className="relative w-full overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 px-4 py-16 md:px-6 md:py-24"
        aria-labelledby="hero-heading"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h1 id="hero-heading" className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Hub de Accesibilidad
          </h1>
          <p className="mb-8 text-xl text-indigo-100">
            Documentación y referencia para diseñar y desarrollar productos digitales accesibles. Consulta las secciones siguientes para fundamentos, criterios y buenas prácticas.
          </p>
          <Link
            href="/docs"
            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-indigo-700 hover:bg-indigo-50 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
          >
            Ver documentación
          </Link>
        </div>
      </section>

      <section className="border-t border-border px-4 py-8 md:px-6" aria-label="Secciones de documentación">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {NAV_ITEMS.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={`/docs/${slug}`}
                className="flex items-center gap-4 p-5 rounded border border-border bg-bg hover:border-focus-ring hover:bg-focus-ring/5 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
              >
                <SectionCardIcon slug={slug} className="shrink-0" />
                <span className="font-medium text-fg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
