import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "guides");

/**
 * Returns slug segments for all MDX files under content/guides.
 * e.g. ["getting-started"] for content/guides/getting-started.mdx
 */
export function getDocSlugs(): string[][] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  const files = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const slugs: string[][] = [];
  for (const file of files) {
    if (file.isFile() && (file.name.endsWith(".mdx") || file.name.endsWith(".md"))) {
      const base = file.name.replace(/\.mdx?$/, "");
      slugs.push([base]);
    }
  }
  return slugs;
}

/**
 * Resolves slug (e.g. ["guides", "getting-started"] or ["getting-started"]) to file path.
 * We keep guides at content/guides/*.mdx and URL as /docs/guides/name or /docs/name.
 * Plan says slug maps to content/guides/*.mdx - so slug ["getting-started"] -> content/guides/getting-started.mdx
 */
function getFilePath(slug: string[]): string | null {
  if (slug.length === 0) return null;
  const base = slug[slug.length - 1];
  const mdxPath = path.join(CONTENT_DIR, `${base}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${base}.md`);
  if (fs.existsSync(mdxPath)) return mdxPath;
  if (fs.existsSync(mdPath)) return mdPath;
  return null;
}

/**
 * Returns raw MDX content for a given slug, or null if not found.
 */
export function getDocContent(slug: string[]): string | null {
  const filePath = getFilePath(slug);
  if (!filePath) return null;
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Returns true if a doc exists for the given slug.
 */
export function hasDoc(slug: string[]): boolean {
  return getFilePath(slug) !== null;
}
