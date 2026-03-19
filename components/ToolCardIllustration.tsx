import type { ToolSlug } from "@/lib/tools";

/* Per-tool tinted background gradients (light / dark handled via opacity on colored bases) */
const BG_COLORS: Record<ToolSlug, string> = {
  "contrast-check":  "from-blue-50   to-cyan-50   dark:from-blue-950/60  dark:to-cyan-950/40",
  "text-scaling":    "from-violet-50 to-indigo-50 dark:from-violet-950/60 dark:to-indigo-950/40",
  "keyboard-nav":    "from-sky-50    to-blue-50   dark:from-sky-950/60   dark:to-blue-950/40",
  "screen-reader":   "from-emerald-50 to-teal-50  dark:from-emerald-950/60 dark:to-teal-950/40",
  "focus-order":     "from-orange-50 to-amber-50  dark:from-orange-950/60 dark:to-amber-950/40",
  "touch-targets":   "from-rose-50   to-pink-50   dark:from-rose-950/60  dark:to-pink-950/40",
  "reduced-motion":  "from-purple-50 to-violet-50 dark:from-purple-950/60 dark:to-violet-950/40",
  "aria-structure":  "from-teal-50   to-cyan-50   dark:from-teal-950/60  dark:to-cyan-950/40",
};

const ICON_COLORS: Record<ToolSlug, string> = {
  "contrast-check":  "text-blue-500   dark:text-blue-400",
  "text-scaling":    "text-violet-500 dark:text-violet-400",
  "keyboard-nav":    "text-sky-500    dark:text-sky-400",
  "screen-reader":   "text-emerald-600 dark:text-emerald-400",
  "focus-order":     "text-orange-500 dark:text-orange-400",
  "touch-targets":   "text-rose-500   dark:text-rose-400",
  "reduced-motion":  "text-purple-500 dark:text-purple-400",
  "aria-structure":  "text-teal-600   dark:text-teal-400",
};

const illustrations: Record<ToolSlug, React.ReactNode> = {
  "contrast-check": (
    <>
      <rect x="20" y="20" width="60" height="80" rx="8" fill="currentColor" opacity={0.85} />
      <rect x="120" y="20" width="60" height="80" rx="8" fill="currentColor" opacity={0.15} />
      <rect x="83" y="42" width="34" height="22" rx="11" fill="currentColor" opacity={0.20} stroke="currentColor" strokeOpacity={0.3} strokeWidth="1" />
      <text x="100" y="57" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" opacity={0.75}>4.5:1</text>
    </>
  ),

  "text-scaling": (
    <>
      <rect x="22" y="22" width="90" height="7" rx="3.5" fill="currentColor" opacity={0.30} />
      <rect x="22" y="38" width="72" height="6" rx="3" fill="currentColor" opacity={0.18} />
      <rect x="22" y="52" width="80" height="6" rx="3" fill="currentColor" opacity={0.16} />
      <rect x="22" y="66" width="55" height="6" rx="3" fill="currentColor" opacity={0.14} />
      <circle cx="148" cy="58" r="30" stroke="currentColor" strokeWidth="2.5" fill="none" opacity={0.45} />
      <line x1="170" y1="80" x2="183" y2="93" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity={0.45} />
      <text x="148" y="56" textAnchor="middle" fill="currentColor" fontSize="20" fontWeight="bold" opacity={0.55}>Aa</text>
    </>
  ),

  "keyboard-nav": (
    <>
      <rect x="28" y="22" width="144" height="78" rx="10" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.20} />
      <rect x="40" y="34" width="30" height="17" rx="4" fill="currentColor" opacity={0.50} />
      <text x="55" y="46.5" textAnchor="middle" fill="currentColor" fontSize="7.5" fontWeight="bold" opacity={0.95}>TAB</text>
      {[75, 97, 119, 141].map((x) => (
        <rect key={x} x={x} y="34" width="17" height="17" rx="4" fill="currentColor" opacity={0.10} />
      ))}
      {[40, 62, 84, 106, 128].map((x) => (
        <rect key={x} x={x} y="56" width="17" height="17" rx="4" fill="currentColor" opacity={0.10} />
      ))}
      <rect x="40" y="78" width="112" height="11" rx="4" fill="currentColor" opacity={0.08} />
      <path d="M55 28 L75 28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity={0.35} markerEnd="url(#arr)" />
    </>
  ),

  "screen-reader": (
    <>
      <rect x="28" y="16" width="74" height="92" rx="8" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.18} />
      {[28, 40, 52, 64, 76].map((y, i) => (
        <rect key={y} x="40" y={28 + i * 14} width={[52, 40, 46, 36, 44][i]} height="6" rx="3" fill="currentColor" opacity={0.16 - i * 0.02} />
      ))}
      <rect x="116" y="28" width="62" height="44" rx="10" fill="currentColor" opacity={0.14} />
      <polygon points="116,50 108,56 116,56" fill="currentColor" opacity={0.14} />
      <rect x="126" y="40" width="30" height="5" rx="2.5" fill="currentColor" opacity={0.30} />
      <rect x="126" y="52" width="22" height="5" rx="2.5" fill="currentColor" opacity={0.20} />
    </>
  ),

  "focus-order": (
    <>
      <rect x="38" y="16" width="124" height="92" rx="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.14} />
      <rect x="50" y="28" width="100" height="18" rx="5" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.35} />
      <circle cx="50" cy="37" r="9" fill="currentColor" opacity={0.22} />
      <text x="50" y="41" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.7}>1</text>
      <rect x="50" y="54" width="100" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.22} />
      <circle cx="50" cy="63" r="9" fill="currentColor" opacity={0.18} />
      <text x="50" y="67" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.6}>2</text>
      <rect x="50" y="80" width="52" height="18" rx="5" fill="currentColor" opacity={0.22} />
      <circle cx="50" cy="89" r="9" fill="currentColor" opacity={0.18} />
      <text x="50" y="93" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" opacity={0.6}>3</text>
      <path d="M50 46 L50 54" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity={0.28} />
      <path d="M50 72 L50 80" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity={0.28} />
    </>
  ),

  "touch-targets": (
    <>
      <rect x="58" y="8" width="84" height="104" rx="12" stroke="currentColor" strokeWidth="2" fill="none" opacity={0.18} />
      <rect x="84" y="11" width="28" height="4" rx="2" fill="currentColor" opacity={0.15} />
      <circle cx="82" cy="46" r="16" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity={0.10} opacity={0.45} />
      <circle cx="82" cy="46" r="5" fill="currentColor" opacity={0.45} />
      <circle cx="118" cy="46" r="6" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity={0.06} opacity={0.25} />
      <circle cx="118" cy="46" r="2.5" fill="currentColor" opacity={0.25} />
      <text x="82" y="72" textAnchor="middle" fill="currentColor" fontSize="6.5" opacity={0.5}>44px ✓</text>
      <text x="118" y="72" textAnchor="middle" fill="currentColor" fontSize="6.5" opacity={0.3}>16px ✗</text>
    </>
  ),

  "reduced-motion": (
    <>
      <rect x="16" y="28" width="40" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />
      <rect x="62" y="28" width="40" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.22} />
      <rect x="108" y="28" width="40" height="64" rx="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity={0.15} />
      <circle cx="36" cy="57" r="9" fill="currentColor" opacity={0.12} />
      <circle cx="82" cy="63" r="9" fill="currentColor" opacity={0.18} />
      <circle cx="128" cy="69" r="9" fill="currentColor" opacity={0.12} />
      <circle cx="110" cy="60" r="24" fill="currentColor" opacity={0.10} />
      <rect x="103" y="50" width="6" height="20" rx="1.5" fill="currentColor" opacity={0.50} />
      <rect x="113" y="50" width="6" height="20" rx="1.5" fill="currentColor" opacity={0.50} />
    </>
  ),

  "aria-structure": (
    <>
      <rect x="68" y="10" width="64" height="18" rx="5" fill="currentColor" opacity={0.24} />
      <text x="100" y="23" textAnchor="middle" fill="currentColor" fontSize="7.5" opacity={0.65}>&lt;main&gt;</text>
      <line x1="100" y1="28" x2="100" y2="38" stroke="currentColor" strokeWidth="1.5" opacity={0.20} />
      <line x1="50" y1="38" x2="150" y2="38" stroke="currentColor" strokeWidth="1.5" opacity={0.20} />
      {[50, 100, 150].map((x) => (
        <line key={x} x1={x} y1="38" x2={x} y2="46" stroke="currentColor" strokeWidth="1.5" opacity={0.20} />
      ))}
      <rect x="24" y="46" width="52" height="15" rx="4" fill="currentColor" opacity={0.15} />
      <text x="50" y="57" textAnchor="middle" fill="currentColor" fontSize="6.5" opacity={0.55}>&lt;nav&gt;</text>
      <rect x="86" y="46" width="28" height="15" rx="4" fill="currentColor" opacity={0.15} />
      <text x="100" y="57" textAnchor="middle" fill="currentColor" fontSize="6.5" opacity={0.55}>&lt;h1&gt;</text>
      <rect x="122" y="46" width="56" height="15" rx="4" fill="currentColor" opacity={0.15} />
      <text x="150" y="57" textAnchor="middle" fill="currentColor" fontSize="6.5" opacity={0.55}>&lt;section&gt;</text>
      <line x1="150" y1="61" x2="150" y2="70" stroke="currentColor" strokeWidth="1" opacity={0.15} />
      <rect x="126" y="70" width="48" height="13" rx="3" fill="currentColor" opacity={0.10} />
      <rect x="126" y="88" width="48" height="13" rx="3" fill="currentColor" opacity={0.10} />
      <line x1="150" y1="83" x2="150" y2="88" stroke="currentColor" strokeWidth="1" opacity={0.12} />
    </>
  ),
};

type ToolCardIllustrationProps = {
  slug: ToolSlug;
  className?: string;
};

export function ToolCardIllustration({ slug, className = "" }: ToolCardIllustrationProps) {
  const bg = BG_COLORS[slug] ?? "from-blue-50 to-cyan-50 dark:from-blue-950/60 dark:to-cyan-950/40";
  const iconColor = ICON_COLORS[slug] ?? "text-blue-500 dark:text-blue-400";

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br ${bg} p-6 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 120"
        fill="none"
        className={`h-28 w-full max-w-[220px] ${iconColor}`}
        aria-hidden="true"
      >
        {illustrations[slug]}
      </svg>
    </div>
  );
}
