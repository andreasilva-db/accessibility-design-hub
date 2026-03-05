export const SECTION_SLUGS = [
  "fundamentos",
  "visual",
  "interaccion",
  "contenido",
  "desarrollo",
  "proceso-de-diseno",
  "recursos",
] as const;

export type SectionSlug = (typeof SECTION_SLUGS)[number];

export const NAV_ITEMS: { slug: SectionSlug; label: string }[] = [
  { slug: "fundamentos", label: "Fundamentals" },
  { slug: "visual", label: "Visual" },
  { slug: "interaccion", label: "Interaction" },
  { slug: "contenido", label: "Content" },
  { slug: "desarrollo", label: "Development" },
  { slug: "proceso-de-diseno", label: "Design Process" },
  { slug: "recursos", label: "Resources" },
];
