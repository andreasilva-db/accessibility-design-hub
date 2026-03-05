export const metadata = {
  title: "About | Accessibility Design Hub",
  description: "Why accessibility matters and what this project covers.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl px-4 md:px-6 py-8">
      <h1 className="text-4xl font-bold text-fg mb-6">About this project</h1>

      <section className="space-y-4 mb-10" aria-labelledby="why-heading">
        <h2 id="why-heading" className="text-2xl font-semibold text-fg">
          Why accessibility matters
        </h2>
        <p className="text-fg-muted">
          Digital accessibility ensures that all people — including those with disabilities or who rely on assistive technologies — can perceive, use, and understand products and services on the web and in applications. It is not an optional extra: it is a requirement for inclusion and, in many contexts, a legal obligation.
        </p>
        <p className="text-fg-muted">
          Designing and developing with accessibility from the start reduces costs, improves the experience for everyone, and broadens the reach of what we build. This hub brings together criteria, guidelines, and references so that design and development teams can apply them in their daily work.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="scope-heading">
        <h2 id="scope-heading" className="text-2xl font-semibold text-fg">
          What this project covers
        </h2>
        <p className="text-fg-muted">
          The Accessibility Design Hub offers documentation structured in sections: Fundamentals (concepts and standards), Visual (contrast, typography, icons), Interaction (keyboard, focus, timing), Content (alt text, structure, forms), Development (HTML, ARIA, testing), and Design Process (integration into the workflow). It also includes a Resources section with links and tools.
        </p>
        <p className="text-fg-muted">
          The goal is to serve as a practical reference for teams that want to align their products with WCAG guidelines and proven best practices, without replacing user evaluation or testing with assistive technologies.
        </p>
      </section>
    </article>
  );
}
