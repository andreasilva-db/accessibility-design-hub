import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getSectionContent, isSectionSlug } from "@/lib/sections";
import { getDocContent, getDocSlugs, hasDoc } from "@/lib/mdx";
import { DemoWrapper } from "@/components/demos/DemoWrapper";
import { DemoButtonCompare } from "@/components/demos/DemoButtonCompare";
import type { Metadata } from "next";

const DEMO_COMPONENTS = { DemoWrapper, DemoButtonCompare };
const MDX_COMPONENTS = { ...DEMO_COMPONENTS };

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
  const title = titleMatch ? titleMatch[1] : "Documentación";
  return { title: `${title} | Hub de Accesibilidad` };
}

export default async function DocSlugPage({ params }: DocSlugPageProps) {
  const { slug } = await params;
  const content = getContent(slug);
  if (!content) {
    notFound();
  }
  return (
    <article className="max-w-3xl [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:mt-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_a]:text-focus-ring [&_a]:underline">
      <MDXRemote source={content} components={MDX_COMPONENTS} />
    </article>
  );
}
