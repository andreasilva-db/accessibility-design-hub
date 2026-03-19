export const SECTION_SLUGS = [
  "fundamentos",
  "visual",
  "interaccion",
  "contenido",
  "desarrollo",
  "claude-skills",
  "proceso-de-diseno",
  "recursos",
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export const NAV_ITEMS: { slug: SectionSlug; label: string; parent?: SectionSlug }[] = [
  { slug: "fundamentos", label: "Fundamentals" },
  { slug: "visual", label: "Visual" },
  { slug: "interaccion", label: "Interaction" },
  { slug: "contenido", label: "Content" },
  { slug: "desarrollo", label: "Development" },
  { slug: "claude-skills", label: "Claude Skills", parent: "desarrollo" },
  { slug: "proceso-de-diseno", label: "Design Process" },
  { slug: "recursos", label: "Resources" },
];
