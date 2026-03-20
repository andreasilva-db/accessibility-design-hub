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

export type NavItem = {
  slug: string;
  label: string;
  parent?: SectionSlug;
  href?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { slug: "fundamentos", label: "Fundamentals" },
  { slug: "fundamentos-why", label: "Why it matters", parent: "fundamentos", href: "/docs/fundamentos#why-accessibility-matters" },
  { slug: "fundamentos-pour", label: "Core principles (POUR)", parent: "fundamentos", href: "/docs/fundamentos#core-principles-pour" },
  { slug: "fundamentos-standards", label: "Standards & frameworks", parent: "fundamentos", href: "/docs/fundamentos#accessibility-standards-and-frameworks" },
  { slug: "fundamentos-shared", label: "Shared responsibility", parent: "fundamentos", href: "/docs/fundamentos#accessibility-as-a-shared-responsibility" },
  { slug: "fundamentos-baseline", label: "Practical baseline", parent: "fundamentos", href: "/docs/fundamentos#practical-baseline-for-teams" },
  { slug: "visual", label: "Visual" },
  { slug: "interaccion", label: "Interaction" },
  { slug: "contenido", label: "Content" },
  { slug: "desarrollo", label: "Development" },
  { slug: "claude-skills", label: "Claude Skills", parent: "desarrollo" },
  { slug: "proceso-de-diseno", label: "Design Process" },
  { slug: "recursos", label: "Resources" },
];
