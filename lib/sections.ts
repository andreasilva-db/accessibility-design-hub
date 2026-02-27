import fs from "fs";
import path from "path";
import { SECTION_SLUGS, type SectionSlug } from "./nav";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export { SECTION_SLUGS, type SectionSlug } from "./nav";

/**
 * Returns raw MDX content for a section (e.g. content/fundamentos.mdx), or null if not found.
 */
export function getSectionContent(section: string): string | null {
  const mdxPath = path.join(CONTENT_ROOT, `${section}.mdx`);
  const mdPath = path.join(CONTENT_ROOT, `${section}.md`);
  if (fs.existsSync(mdxPath)) return fs.readFileSync(mdxPath, "utf-8");
  if (fs.existsSync(mdPath)) return fs.readFileSync(mdPath, "utf-8");
  return null;
}

export function isSectionSlug(slug: string): slug is SectionSlug {
  return (SECTION_SLUGS as readonly string[]).includes(slug);
}
