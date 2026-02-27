import Link from "next/link";
import { NAV_ITEMS } from "@/lib/nav";

export default function HomePage() {
  return (
    <article className="px-4 md:px-6">
      <section className="max-w-2xl mx-auto py-12 md:py-16 text-center" aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-fg mb-4">
          Hub de Accesibilidad
        </h1>
        <p className="text-xl text-fg-muted mb-6">
          Documentación y referencia para diseñar y desarrollar productos digitales accesibles. Consulta las secciones siguientes para fundamentos, criterios y buenas prácticas.
        </p>
        <Link
          href="/docs"
          className="inline-block px-5 py-2.5 rounded font-medium bg-focus-ring text-white hover:opacity-90 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
        >
          Ver documentación
        </Link>
      </section>

      <section className="py-8 border-t border-border" aria-label="Secciones de documentación">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
          {NAV_ITEMS.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={`/docs/${slug}`}
                className="block p-5 rounded border border-border bg-bg hover:border-focus-ring hover:bg-focus-ring/5 motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
              >
                <span className="font-medium text-fg">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
