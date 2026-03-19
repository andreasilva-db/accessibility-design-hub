type Resource = {
  title: string;
  description: string;
  url: string;
  tag: string;
};

const RESOURCES: Resource[] = [
  {
    title: "WCAG 2.2",
    description: "The official W3C accessibility guidelines. The primary reference for digital accessibility requirements and success criteria.",
    url: "https://www.w3.org/TR/WCAG22/",
    tag: "Standard",
  },
  {
    title: "WAI-ARIA Authoring Practices",
    description: "Patterns and examples for building accessible widgets, navigation, and application design patterns using ARIA.",
    url: "https://www.w3.org/WAI/ARIA/apg/",
    tag: "Reference",
  },
  {
    title: "WebAIM",
    description: "Articles, guides, and tools covering all aspects of web accessibility. Includes the annual WebAIM Million report.",
    url: "https://webaim.org/",
    tag: "Guide",
  },
  {
    title: "The A11Y Project",
    description: "Community-driven resource with a WCAG checklist, accessibility myths, and practical how-to articles.",
    url: "https://www.a11yproject.com/",
    tag: "Guide",
  },
  {
    title: "Inclusive Components",
    description: "In-depth articles on building accessible UI components — toggles, tabs, menus, cards, and more.",
    url: "https://inclusive-components.design/",
    tag: "Patterns",
  },
  {
    title: "Deque University",
    description: "Free and paid courses on digital accessibility. Covers design, development, testing, and WCAG compliance.",
    url: "https://dequeuniversity.com/",
    tag: "Learning",
  },
  {
    title: "MDN Accessibility",
    description: "Mozilla's documentation on HTML semantics, ARIA, keyboard interaction, and accessibility best practices.",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
    tag: "Reference",
  },
  {
    title: "axe DevTools",
    description: "Browser extension for automated accessibility testing. Built on the open-source axe-core engine by Deque.",
    url: "https://www.deque.com/axe/devtools/",
    tag: "Tool",
  },
  {
    title: "Colour Contrast Analyser",
    description: "Desktop tool by TPGi to check foreground/background contrast ratios against WCAG AA and AAA thresholds.",
    url: "https://www.tpgi.com/color-contrast-checker/",
    tag: "Tool",
  },
  {
    title: "GOV.UK Design System",
    description: "Accessible, production-tested patterns and components from the UK Government. A practical reference for inclusive design.",
    url: "https://design-system.service.gov.uk/",
    tag: "Patterns",
  },
  {
    title: "Apple HIG — Accessibility",
    description: "Apple's Human Interface Guidelines on accessibility, covering VoiceOver, Dynamic Type, and inclusive design principles.",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    tag: "Platform",
  },
  {
    title: "Material Design — Accessibility",
    description: "Google's Material Design guidelines on accessibility, including color, motion, touch targets, and assistive technology support.",
    url: "https://m3.material.io/foundations/overview/accessibility",
    tag: "Platform",
  },
];

const TAG_COLORS: Record<string, string> = {
  Standard: "bg-blue-500/15 text-blue-400",
  Reference: "bg-purple-500/15 text-purple-400",
  Guide: "bg-green-500/15 text-green-400",
  Patterns: "bg-orange-500/15 text-orange-400",
  Learning: "bg-yellow-500/15 text-yellow-400",
  Tool: "bg-cyan-500/15 text-cyan-400",
  Platform: "bg-pink-500/15 text-pink-400",
};

export function ResourcesGrid() {
  return (
    <ul className="not-prose m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
      {RESOURCES.map((r) => (
        <li key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-focus-ring/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-fg leading-snug group-hover:text-focus-ring transition-colors duration-200">
                {r.title}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${TAG_COLORS[r.tag] ?? "bg-border text-fg-muted"}`}>
                  {r.tag}
                </span>
                <svg
                  className="h-3.5 w-3.5 text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M10 2h4m0 0v4m0-4L7 9" />
                </svg>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-fg-muted flex-1">{r.description}</p>
          </a>
        </li>
      ))}
    </ul>
  );
}
