import type { ToolSlug } from "@/lib/tools";

const illustrations: Record<ToolSlug, React.ReactNode> = {
  /* Two swatches side by side with a ratio badge in between */
  "contrast-check": (
    <>
      <rect x="20" y="20" width="60" height="80" rx="6" fill="currentColor" opacity={0.85} />
      <rect x="120" y="20" width="60" height="80" rx="6" fill="currentColor" opacity={0.15} />
      <rect x="85" y="42" width="30" height="22" rx="11" fill="currentColor" opacity={0.25} />
      <text x="100" y="57" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" opacity={0.7}>4.5</text>
      <line x1="82" y1="53" x2="88" y2="53" stroke="currentColor" strokeWidth="1.5" opacity={0.4} />
      <line x1="112" y1="53" x2="118" y2="53" stroke="currentColor" strokeWidth="1.5" opacity={0.4} />
    </>
  ),

  /* Paragraph lines with a magnifier zooming in */
  "text-scaling": (
    <>
      <rect x="25" y="25" width="80" height="6" rx="3" fill="currentColor" opacity={0.3} />
      <rect x="25" y="40" width="65" height="6" rx="3" fill="currentColor" opacity={0.2} />
      <rect x="25" y="55" width="75" height="6" rx="3" fill="currentColor" opacity={0.2} />
      <rect x="25" y="70" width="50" height="6" rx="3" fill="currentColor" opacity={0.15} />
      <rect x="25" y="85" width="70" height="6" rx="3" fill="currentColor" opacity={0.15} />
      <circle cx="145" cy="55" r="28" stroke="currentColor" strokeWidth="2.5" fill="none" opacity={0.5} />
      <line x1="164" y1="76" x2="178" y2="90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity={0.5} />
      <text x="145" y="53" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="bold" opacity={0.55}>Aa</text>
    </>
  ),

  /* Stylized keyboard with highlighted Tab key and arrow flow */
  "keyboard-nav": (
    <>
      <rect x="30" y="25" width="140" height="75" rx="8" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.25} />
      {/* Key grid */}
      <rect x="42" y="37" width="28" height="16" rx="3" fill="currentColor" opacity={0.45} />
      <text x="56" y="49" textAnchor="middle" fill="currentColor" fontSize="7" fontWeight="bold" opacity={0.9}>TAB</text>
      <rect x="75" y="37" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="96" y="37" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="117" y="37" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="138" y="37" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="42" y="58" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="63" y="58" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="84" y="58" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="105" y="58" width="16" height="16" rx="3" fill="currentColor" opacity={0.12} />
      <rect x="126" y="58" width="28" height="16" rx="3" fill="currentColor" opacity={0.12} />
      {/* Arrow showing tab flow */}
      <path d="M56 30 L75 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity={0.35} />
    </>
  ),

  /* Document with speech bubbles */
  "screen-reader": (
    <>
      <rect x="30" y="20" width="70" height="85" rx="6" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.2} />
      <rect x="40" y="32" width="50" height="5" rx="2.5" fill="currentColor" opacity={0.2} />
      <rect x="40" y="43" width="40" height="5" rx="2.5" fill="currentColor" opacity={0.15} />
      <rect x="40" y="54" width="45" height="5" rx="2.5" fill="currentColor" opacity={0.15} />
      <rect x="40" y="65" width="35" height="5" rx="2.5" fill="currentColor" opacity={0.12} />
      {/* Speech bubble */}
      <rect x="115" y="30" width="60" height="40" rx="8" fill="currentColor" opacity={0.15} />
      <polygon points="115,52 108,58 115,58" fill="currentColor" opacity={0.15} />
      <rect x="125" y="42" width="28" height="4" rx="2" fill="currentColor" opacity={0.3} />
      <rect x="125" y="52" width="20" height="4" rx="2" fill="currentColor" opacity={0.2} />
    </>
  ),

  /* Form mockup with numbered focus indicators */
  "focus-order": (
    <>
      <rect x="40" y="18" width="120" height="84" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />
      {/* Input 1 */}
      <rect x="52" y="28" width="96" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.3} />
      <circle cx="52" cy="36" r="8" fill="currentColor" opacity={0.2} />
      <text x="52" y="40" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.6}>1</text>
      {/* Input 2 */}
      <rect x="52" y="52" width="96" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.3} />
      <circle cx="52" cy="60" r="8" fill="currentColor" opacity={0.2} />
      <text x="52" y="64" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.6}>2</text>
      {/* Button 3 */}
      <rect x="52" y="76" width="50" height="16" rx="3" fill="currentColor" opacity={0.25} />
      <circle cx="52" cy="84" r="8" fill="currentColor" opacity={0.2} />
      <text x="52" y="88" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.6}>3</text>
      {/* Dashed flow lines */}
      <path d="M52 44 L52 52" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity={0.25} />
      <path d="M52 68 L52 76" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity={0.25} />
    </>
  ),

  /* Mobile screen with target circles */
  "touch-targets": (
    <>
      <rect x="60" y="10" width="80" height="100" rx="10" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.2} />
      <rect x="88" y="13" width="24" height="4" rx="2" fill="currentColor" opacity={0.15} />
      {/* Touch targets — good vs bad */}
      <circle cx="82" cy="45" r="14" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity={0.1} opacity={0.4} />
      <circle cx="82" cy="45" r="4" fill="currentColor" opacity={0.4} />
      <circle cx="118" cy="45" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity={0.08} opacity={0.25} />
      <circle cx="118" cy="45" r="2" fill="currentColor" opacity={0.25} />
      {/* Labels */}
      <text x="82" y="70" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.45}>44px</text>
      <text x="118" y="70" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.3}>16px</text>
      {/* Checkmark and X */}
      <path d="M78 78 L81 81 L86 76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
      <path d="M115 76 L121 82 M121 76 L115 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
    </>
  ),

  /* Animation frames with a pause overlay */
  "reduced-motion": (
    <>
      {/* Film frames */}
      <rect x="20" y="30" width="36" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />
      <rect x="62" y="30" width="36" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.2} />
      <rect x="104" y="30" width="36" height="60" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />
      {/* Motion lines in frames */}
      <circle cx="38" cy="55" r="8" fill="currentColor" opacity={0.12} />
      <circle cx="80" cy="60" r="8" fill="currentColor" opacity={0.18} />
      <circle cx="122" cy="65" r="8" fill="currentColor" opacity={0.12} />
      {/* Pause symbol overlay */}
      <circle cx="100" cy="60" r="22" fill="currentColor" opacity={0.12} />
      <rect x="93" y="50" width="5" height="20" rx="1" fill="currentColor" opacity={0.45} />
      <rect x="102" y="50" width="5" height="20" rx="1" fill="currentColor" opacity={0.45} />
    </>
  ),

  /* Tree structure with landmark labels */
  "aria-structure": (
    <>
      {/* Root */}
      <rect x="70" y="12" width="60" height="16" rx="4" fill="currentColor" opacity={0.25} />
      <text x="100" y="24" textAnchor="middle" fill="currentColor" fontSize="7" opacity={0.6}>&lt;main&gt;</text>
      {/* Branch lines */}
      <line x1="100" y1="28" x2="100" y2="36" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <line x1="55" y1="36" x2="145" y2="36" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <line x1="55" y1="36" x2="55" y2="44" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <line x1="100" y1="36" x2="100" y2="44" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      <line x1="145" y1="36" x2="145" y2="44" stroke="currentColor" strokeWidth="1.5" opacity={0.2} />
      {/* Children */}
      <rect x="30" y="44" width="50" height="14" rx="3" fill="currentColor" opacity={0.15} />
      <text x="55" y="54" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.5}>&lt;nav&gt;</text>
      <rect x="88" y="44" width="24" height="14" rx="3" fill="currentColor" opacity={0.15} />
      <text x="100" y="54" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.5}>&lt;h1&gt;</text>
      <rect x="120" y="44" width="50" height="14" rx="3" fill="currentColor" opacity={0.15} />
      <text x="145" y="54" textAnchor="middle" fill="currentColor" fontSize="6" opacity={0.5}>&lt;section&gt;</text>
      {/* Deeper nesting */}
      <line x1="145" y1="58" x2="145" y2="66" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <rect x="125" y="66" width="40" height="12" rx="3" fill="currentColor" opacity={0.1} />
      <rect x="125" y="82" width="40" height="12" rx="3" fill="currentColor" opacity={0.1} />
      <line x1="145" y1="78" x2="145" y2="82" stroke="currentColor" strokeWidth="1" opacity={0.12} />
    </>
  ),
};

type ToolCardIllustrationProps = {
  slug: ToolSlug;
  className?: string;
};

export function ToolCardIllustration({ slug, className = "" }: ToolCardIllustrationProps) {
  return (
    <div
      className={`flex items-center justify-center bg-focus-ring/[0.06] dark:bg-focus-ring/[0.08] p-6 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 120"
        fill="none"
        className="h-28 w-full max-w-[220px] text-focus-ring"
        aria-hidden="true"
      >
        {illustrations[slug]}
      </svg>
    </div>
  );
}
