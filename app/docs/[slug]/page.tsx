import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSectionContent, isSectionSlug } from "@/lib/sections";
import { getDocContent, getDocSlugs, hasDoc } from "@/lib/mdx";
import { DemoWrapper } from "@/components/demos/DemoWrapper";
import { DemoButtonCompare } from "@/components/demos/DemoButtonCompare";
import { ContrastPlayground } from "@/components/demos/ContrastPlayground";
import { ColorMeaningDemo } from "@/components/demos/ColorMeaningDemo";
import { FocusStateDemo } from "@/components/demos/FocusStateDemo";
import { HierarchyDemo } from "@/components/demos/HierarchyDemo";
import { ToolShortcutsGrid } from "@/components/ToolShortcutsGrid";
import { ResourcesGrid } from "@/components/ResourcesGrid";
import type { Metadata } from "next";

const DEMO_COMPONENTS = {
  DemoWrapper,
  DemoButtonCompare,
  ContrastPlayground,
  ColorMeaningDemo,
  FocusStateDemo,
  HierarchyDemo,
};
const MDX_COMPONENTS = { ...DEMO_COMPONENTS, ToolShortcutsGrid, ResourcesGrid };

type DocSlugPageProps = {
  params: Promise<{ slug: string }>;
};

function getContent(slug: string): string | null {
  if (isSectionSlug(slug)) {
    return getSectionContent(slug);
  }
  if (hasDoc([slug])) {
    return getDocContent([slug]);
  }
  return null;
}

export async function generateStaticParams() {
  const sectionSlugs = [
    "fundamentos",
    "visual",
    "interaccion",
    "contenido",
    "desarrollo",
    "claude-skills",
    "proceso-de-diseno",
    "recursos",
  ];
  const guideSlugs = getDocSlugs().map((s) => s[0]);
  return [...sectionSlugs.map((slug) => ({ slug })), ...guideSlugs.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: DocSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getContent(slug);
  if (!content) return {};
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : "Docs";
  return { title: `${title} | Accessibility Design Hub` };
}

export default async function DocSlugPage({ params }: DocSlugPageProps) {
  const { slug } = await params;
  const content = getContent(slug);
  if (!content) {
    notFound();
  }
  return (
    <article className="mx-auto w-full max-w-3xl [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:pt-8 [&_h2]:border-t [&_h2]:border-border [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-fg [&_p]:mb-5 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1.5 [&_li]:text-fg-muted [&_a]:text-focus-ring [&_a]:underline [&_a]:underline-offset-2 [&_hr]:my-0 [&_hr]:border-0 [&_strong]:text-fg [&_strong]:font-semibold">
      <MDXRemote source={content} components={MDX_COMPONENTS} />
    </article>
  );
}
