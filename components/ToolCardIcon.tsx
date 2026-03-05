import type { ToolSlug } from "@/lib/tools";

const ICON_SIZE = 28;

const icons: Record<ToolSlug, React.ReactNode> = {
  /* Two overlapping circles — Venn-diagram contrast concept */
  "contrast-check": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),

  /* Capital A with magnifying glass — text scaling */
  "text-scaling": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 20l5-14h2l5 14" />
      <path d="M5.5 14h7" />
      <circle cx="18" cy="16" r="4" />
      <path d="M21 19l2 2" />
    </svg>
  ),

  /* Keyboard key with Tab arrow */
  "keyboard-nav": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M8 12h8" />
      <path d="M13 9l3 3-3 3" />
      <path d="M8 15v-6" />
    </svg>
  ),

  /* Speaker with broadcast lines — screen reader */
  "screen-reader": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  ),

  /* Numbered tab stops with connecting line */
  "focus-order": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="4" cy="6" r="2.5" />
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="20" cy="18" r="2.5" />
      <path d="M6.5 7.5l3.5 2.5" strokeDasharray="3 2" />
      <path d="M14.5 13.5l3.5 2.5" strokeDasharray="3 2" />
    </svg>
  ),

  /* Finger touching a target circle */
  "touch-targets": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    </svg>
  ),

  /* Play triangle with a slash — reduced motion */
  "reduced-motion": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="6,4 20,12 6,20" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  ),

  /* HTML brackets with indented tree lines */
  "aria-structure": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4 7 1 12 4 17" />
      <polyline points="20 7 23 12 20 17" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="11" y1="12" x2="17" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  ),
};

type ToolCardIconProps = {
  slug: ToolSlug;
  className?: string;
};

export function ToolCardIcon({ slug, className = "" }: ToolCardIconProps) {
  return (
    <span
      className={`inline-flex shrink-0 text-focus-ring ${className}`}
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
    >
      {icons[slug]}
    </span>
  );
}
