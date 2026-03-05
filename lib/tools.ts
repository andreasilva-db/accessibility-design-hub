export const TOOL_SLUGS = [
  "contrast-check",
  "text-scaling",
  "keyboard-nav",
  "screen-reader",
  "focus-order",
  "touch-targets",
  "reduced-motion",
  "aria-structure",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];

export type ToolItem = {
  slug: ToolSlug;
  title: string;
  description: string;
  hasDemo: boolean;
};

export const TOOL_ITEMS: ToolItem[] = [
  {
    slug: "contrast-check",
    title: "Contrast Ratio",
    description:
      "Test foreground and background color pairs against WCAG 2.2 AA and AAA thresholds.",
    hasDemo: true,
  },
  {
    slug: "text-scaling",
    title: "Text Scaling",
    description:
      "Preview how your layout responds when text is scaled up to 200% for low-vision users.",
    hasDemo: false,
  },
  {
    slug: "keyboard-nav",
    title: "Keyboard Navigation",
    description:
      "Audit tab order and keyboard operability of interactive elements on any page.",
    hasDemo: false,
  },
  {
    slug: "screen-reader",
    title: "Screen Reader Labels",
    description:
      "Verify that every interactive element has a meaningful accessible name and role.",
    hasDemo: false,
  },
  {
    slug: "focus-order",
    title: "Focus Order",
    description:
      "Visualize and validate the sequential focus order through your interface.",
    hasDemo: true,
  },
  {
    slug: "touch-targets",
    title: "Touch Targets",
    description:
      "Check that tappable areas meet the minimum 24\u00d724 CSS pixel size requirement.",
    hasDemo: false,
  },
  {
    slug: "reduced-motion",
    title: "Reduced Motion",
    description:
      "Simulate prefers-reduced-motion and verify animations respect user preferences.",
    hasDemo: false,
  },
  {
    slug: "aria-structure",
    title: "ARIA & Semantic Structure",
    description:
      "Inspect landmark regions, heading hierarchy and ARIA attribute correctness.",
    hasDemo: false,
  },
];
