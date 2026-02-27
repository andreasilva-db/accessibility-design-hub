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
  { slug: "fundamentos", label: "Fundamentos" },
  { slug: "visual", label: "Visual" },
  { slug: "interaccion", label: "Interacción" },
  { slug: "contenido", label: "Contenido" },
  { slug: "desarrollo", label: "Desarrollo" },
  { slug: "proceso-de-diseno", label: "Proceso de diseño" },
  { slug: "recursos", label: "Recursos" },
];
