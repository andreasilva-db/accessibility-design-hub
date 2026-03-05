import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TOOL_ITEMS, TOOL_SLUGS } from "@/lib/tools";
import { ContrastPlayground } from "@/components/demos/ContrastPlayground";
import { FocusStateDemo } from "@/components/demos/FocusStateDemo";
import { ToolPlaceholder } from "@/components/tools/ToolPlaceholder";

/* Map slugs that have an existing demo component */
const TOOL_DEMOS: Record<string, React.ComponentType> = {
  "contrast-check": ContrastPlayground,
  "focus-order": FocusStateDemo,
};

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOL_ITEMS.find((t) => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.title} | Accessibility Tools | Accessibility Design Hub`,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = TOOL_ITEMS.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const DemoComponent = TOOL_DEMOS[slug];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
          <li>
            <Link
              href="/"
              className="rounded hover:text-fg hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/#tools-heading"
              className="rounded hover:text-fg hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-fg">
            {tool.title}
          </li>
        </ol>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-fg">{tool.title}</h1>
      <p className="mb-8 text-fg-muted">{tool.description}</p>

      {DemoComponent ? (
        <DemoComponent />
      ) : (
        <ToolPlaceholder title={tool.title} />
      )}
    </div>
  );
}
