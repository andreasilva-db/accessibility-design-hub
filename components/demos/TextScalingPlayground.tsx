"use client";

import { useState, useCallback, useId, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ScaleStep = 100 | 125 | 150 | 175 | 200;

/** A frame pasted from Figma (or any image source) */
type PastedFrame =
  | { kind: "svg"; markup: string }
  | { kind: "png"; url: string };

interface Issue {
  id: string;
  label: string;
  description: string;
  fix: string;
}

interface PreviewComponent {
  id: string;
  label: string;
  html: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SCALE_STEPS: ScaleStep[] = [100, 125, 150, 175, 200];

const PREVIEW_COMPONENTS: PreviewComponent[] = [
  {
    id: "card",
    label: "Card with fixed height",
    html: `<div style="border:1px solid #e5e5e5;border-radius:8px;overflow:hidden;background:#fff;">
  <div style="height:120px;background:#dbeafe;display:flex;align-items:center;justify-content:center;overflow:hidden;">
    <span style="font-weight:600;color:#1e40af;">Hero Image Area</span>
  </div>
  <div style="padding:16px;height:90px;overflow:hidden;">
    <h3 style="margin:0 0 6px;font-size:1em;font-weight:700;color:#111;">Accessible Design Principles</h3>
    <p style="margin:0;font-size:0.875em;color:#555;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
      Learn how to build interfaces that work for everyone, regardless of ability or assistive technology.
    </p>
  </div>
  <div style="padding:12px 16px;border-top:1px solid #e5e5e5;display:flex;justify-content:space-between;align-items:center;">
    <span style="font-size:0.75em;color:#888;">5 min read</span>
    <button style="background:#0055cc;color:#fff;border:none;border-radius:6px;padding:6px 14px;font-size:0.875em;cursor:pointer;">Read more</button>
  </div>
</div>`,
  },
  {
    id: "nav",
    label: "Navigation bar",
    html: `<nav style="background:#1a1a1a;padding:0 16px;height:52px;display:flex;align-items:center;gap:24px;overflow:hidden;border-radius:8px;">
  <span style="color:#fff;font-weight:700;font-size:1em;white-space:nowrap;">MyApp</span>
  <div style="display:flex;gap:16px;overflow:hidden;height:100%;align-items:center;">
    <a href="#" style="color:#ccc;text-decoration:none;font-size:0.875em;white-space:nowrap;">Home</a>
    <a href="#" style="color:#ccc;text-decoration:none;font-size:0.875em;white-space:nowrap;">Products</a>
    <a href="#" style="color:#ccc;text-decoration:none;font-size:0.875em;white-space:nowrap;">Pricing</a>
    <a href="#" style="color:#ccc;text-decoration:none;font-size:0.875em;white-space:nowrap;">About</a>
    <a href="#" style="color:#ccc;text-decoration:none;font-size:0.875em;white-space:nowrap;">Contact</a>
  </div>
  <button style="margin-left:auto;background:#0055cc;color:#fff;border:none;border-radius:6px;padding:6px 14px;font-size:0.875em;cursor:pointer;white-space:nowrap;">Sign up</button>
</nav>`,
  },
  {
    id: "form",
    label: "Form field group",
    html: `<div style="display:flex;flex-direction:column;gap:16px;background:#fff;padding:20px;border:1px solid #e5e5e5;border-radius:8px;">
  <div>
    <label style="display:block;font-size:0.875em;font-weight:600;margin-bottom:4px;color:#111;">Full name</label>
    <input type="text" placeholder="Jane Smith" style="width:100%;border:1px solid #ccc;border-radius:6px;padding:8px 12px;font-size:1em;box-sizing:border-box;" readonly />
  </div>
  <div>
    <label style="display:block;font-size:0.875em;font-weight:600;margin-bottom:4px;color:#111;">Email address</label>
    <input type="email" placeholder="jane@example.com" style="width:100%;border:1px solid #ccc;border-radius:6px;padding:8px 12px;font-size:1em;box-sizing:border-box;" readonly />
  </div>
  <div style="display:flex;gap:8px;">
    <button style="flex:1;background:#0055cc;color:#fff;border:none;border-radius:6px;padding:10px 16px;font-size:0.875em;font-weight:600;cursor:pointer;">Submit</button>
    <button style="flex:1;background:transparent;color:#0055cc;border:1px solid #0055cc;border-radius:6px;padding:10px 16px;font-size:0.875em;font-weight:600;cursor:pointer;">Cancel</button>
  </div>
</div>`,
  },
  {
    id: "badge-row",
    label: "Badge / chip row",
    html: `<div style="background:#fff;padding:16px;border:1px solid #e5e5e5;border-radius:8px;">
  <p style="font-size:0.875em;font-weight:600;color:#111;margin:0 0 10px;">Filter by category</p>
  <div style="display:flex;gap:8px;overflow:hidden;height:32px;align-items:center;">
    <span style="background:#dbeafe;color:#1e40af;border-radius:999px;padding:4px 12px;font-size:0.75em;font-weight:600;white-space:nowrap;">Design</span>
    <span style="background:#dcfce7;color:#166534;border-radius:999px;padding:4px 12px;font-size:0.75em;font-weight:600;white-space:nowrap;">Accessibility</span>
    <span style="background:#fef9c3;color:#854d0e;border-radius:999px;padding:4px 12px;font-size:0.75em;font-weight:600;white-space:nowrap;">WCAG 2.2</span>
    <span style="background:#fce7f3;color:#9d174d;border-radius:999px;padding:4px 12px;font-size:0.75em;font-weight:600;white-space:nowrap;">UX Research</span>
  </div>
</div>`,
  },
  {
    id: "alert",
    label: "Alert / notification",
    html: `<div style="border:1px solid #fbbf24;background:#fffbeb;border-radius:8px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start;height:72px;overflow:hidden;box-sizing:border-box;">
  <span style="font-size:1.25em;flex-shrink:0;line-height:1;">⚠️</span>
  <div style="overflow:hidden;">
    <p style="margin:0 0 2px;font-size:0.875em;font-weight:700;color:#92400e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Your session will expire in 5 minutes</p>
    <p style="margin:0;font-size:0.8125em;color:#b45309;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Save your work to avoid losing any unsaved changes.</p>
  </div>
</div>`,
  },
];

// ─── Issue detection ──────────────────────────────────────────────────────────

const KNOWN_ISSUES: Record<string, Issue[]> = {
  card: [
    {
      id: "card-overflow",
      label: "Fixed height clips body text",
      description:
        "The card body has a fixed height (90px) with overflow:hidden. At larger scales the description text is cut off.",
      fix: "Use min-height instead of height, or remove the height constraint and let content flow naturally.",
    },
    {
      id: "card-ellipsis",
      label: "Text truncated with ellipsis",
      description:
        "The description uses white-space:nowrap + text-overflow:ellipsis, hiding content from low-vision users who rely on text scaling.",
      fix: "Allow text to wrap (remove white-space:nowrap) and let the container grow.",
    },
  ],
  nav: [
    {
      id: "nav-overflow",
      label: "Nav overflows at larger scales",
      description:
        "The navigation bar has a fixed height of 52px with overflow:hidden. At 150%+ the nav items are clipped.",
      fix: "Remove the fixed height. Use min-height and allow the bar to wrap or scroll horizontally.",
    },
  ],
  "badge-row": [
    {
      id: "badges-clipped",
      label: "Badges row clips at scale",
      description:
        "The badge container has a fixed height of 32px with overflow:hidden. Badges disappear at larger text sizes.",
      fix: "Remove the fixed height and allow the row to wrap with flex-wrap:wrap.",
    },
  ],
  alert: [
    {
      id: "alert-overflow",
      label: "Alert text is truncated",
      description:
        "The alert has a fixed height with overflow:hidden and text-overflow:ellipsis on both lines. Critical messages may be hidden.",
      fix: "Remove the fixed height and allow the alert to grow. Never truncate error or warning messages.",
    },
  ],
  form: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip fixed width/height from an SVG root element so it fills its container
 * fluidly. Figma SVGs carry explicit pixel dimensions that would overflow.
 */
function makeSvgFluid(markup: string): string {
  return markup.replace(/<svg\b([^>]*)>/i, (_, attrs: string) => {
    const cleaned = attrs
      .replace(/\s+width="[^"]*"/g, "")
      .replace(/\s+height="[^"]*"/g, "")
      .replace(/\s+style="[^"]*"/g, "");
    return `<svg${cleaned} style="width:100%;height:auto;display:block;">`;
  });
}

// ─── ScaleBadge ───────────────────────────────────────────────────────────────

function ScaleBadge({ scale }: { scale: ScaleStep }) {
  const color =
    scale === 100
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      : scale === 125
        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        : scale === 150
          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
          : scale === 175
            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums ${color}`}
    >
      {scale}%
    </span>
  );
}

// ─── IssuePanel ───────────────────────────────────────────────────────────────

function IssuePanel({ issues }: { issues: Issue[] }) {
  if (issues.length === 0) return null;
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800/40 dark:bg-red-900/10"
      role="alert"
      aria-label="Detected accessibility issues"
    >
      <p className="mb-3 text-sm font-semibold text-red-800 dark:text-red-300">
        Issues detected — here&apos;s how to fix them:
      </p>
      <ul className="space-y-3">
        {issues.map((issue) => (
          <li
            key={issue.id}
            className="rounded-md bg-white p-3 shadow-sm ring-1 ring-red-200 dark:bg-red-950/30 dark:ring-red-800/40"
          >
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
              {issue.label}
            </p>
            <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
              {issue.description}
            </p>
            <p className="mt-1.5 text-xs font-medium text-green-700 dark:text-green-400">
              <span className="font-bold">Fix: </span>
              {issue.fix}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── ScaleSlider ──────────────────────────────────────────────────────────────

function ScaleSlider({
  value,
  onChange,
  sliderId,
}: {
  value: ScaleStep;
  onChange: (v: ScaleStep) => void;
  sliderId: string;
}) {
  const stepIndex = SCALE_STEPS.indexOf(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(SCALE_STEPS[Number(e.target.value)]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label
          htmlFor={sliderId}
          className="text-sm font-semibold text-fg whitespace-nowrap"
        >
          Text Scale
        </label>
        <ScaleBadge scale={value} />
      </div>
      <div className="flex flex-col gap-1">
        <input
          id={sliderId}
          type="range"
          min={0}
          max={SCALE_STEPS.length - 1}
          step={1}
          value={stepIndex}
          onChange={handleChange}
          aria-valuemin={100}
          aria-valuemax={200}
          aria-valuenow={value}
          aria-valuetext={`${value}% text scale`}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
        />
        <div className="flex justify-between px-0.5">
          {SCALE_STEPS.map((step) => (
            <span
              key={step}
              className={`text-[10px] tabular-nums transition-colors ${
                step === value ? "font-bold text-fg" : "text-fg-muted"
              }`}
              aria-hidden="true"
            >
              {step}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PreviewPanel ─────────────────────────────────────────────────────────────

/**
 * Renders either:
 * - A preloaded HTML component, scaled via font-size (simulates text-only scaling)
 * - A pasted Figma frame (SVG/PNG), scaled via CSS zoom (simulates full-frame scaling)
 *
 * The baseline panel always receives scale=100; the scaled panel receives the
 * current scale value.
 */
function PreviewPanel({
  component,
  pastedFrame,
  scale,
  label,
  isBaseline,
}: {
  component?: PreviewComponent;
  pastedFrame?: PastedFrame;
  scale: ScaleStep;
  label: string;
  isBaseline: boolean;
}) {
  const panelLabel = isBaseline ? "Baseline — 100%" : `Scaled — ${scale}%`;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {/* ── Panel header ── */}
      <div className="flex items-center gap-2">
        <p
          className="text-xs font-semibold uppercase tracking-wide text-fg-muted"
          aria-hidden="true"
        >
          {label}
        </p>
        {!isBaseline && <ScaleBadge scale={scale} />}
      </div>

      {/* ── Panel body ── */}
      <div
        className="overflow-auto rounded-lg border border-border bg-[#f8f8f8] min-h-[200px]"
        aria-label={`${panelLabel} preview`}
      >
        {pastedFrame ? (
          /*
           * Figma frame: apply CSS zoom so the entire visual scales up.
           * zoom:1 on baseline, zoom:scale/100 on the scaled panel.
           * The container is overflow:auto so the designer sees exactly
           * how much space the UI consumes at each scale level.
           */
          <div
            style={{
              zoom: isBaseline ? 1 : scale / 100,
              // Anchor top-left so the overflow extends right + down (intuitive)
              transformOrigin: "top left",
            }}
          >
            {pastedFrame.kind === "svg" ? (
              <div dangerouslySetInnerHTML={{ __html: pastedFrame.markup }} />
            ) : (
              <img
                src={pastedFrame.url}
                alt="Pasted Figma frame"
                style={{ display: "block", width: "100%", maxWidth: "none" }}
              />
            )}
          </div>
        ) : component ? (
          /*
           * HTML component: scale font-size on the root so em-based children
           * reflow naturally — mirrors what happens in a real browser.
           */
          <div
            className="p-4"
            style={{
              fontSize: isBaseline ? "100%" : `${scale}%`,
              transition: "font-size 300ms ease",
            }}
            aria-label={`Preview of ${component.label} at ${
              isBaseline ? 100 : scale
            }% text scale`}
          >
            <div dangerouslySetInnerHTML={{ __html: component.html }} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─── FigmaImportArea ──────────────────────────────────────────────────────────

/**
 * Drop zone + paste capture for Figma frames.
 *
 * Technique: a transparent <textarea> overlays the visible zone and captures
 * the native `paste` event (which carries full clipboard data including SVG/PNG
 * blobs that Figma puts on the clipboard when you ⌘C a frame).
 *
 * The <textarea> is focusable so paste events fire reliably in all browsers.
 */
function FigmaImportArea({
  onImport,
  hasFrame,
  onClear,
}: {
  onImport: (frame: PastedFrame) => void;
  hasFrame: boolean;
  onClear: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pasteRef = useRef<HTMLTextAreaElement>(null);
  const labelId = useId();

  /** Read SVG or PNG blobs from a DataTransferItemList */
  const processItems = useCallback(
    async (items: DataTransferItemList): Promise<boolean> => {
      setError(null);
      const arr = Array.from(items);

      // ── Priority 1: SVG (vector, best quality) ──
      const svgItem = arr.find((i) => i.type === "image/svg+xml");
      if (svgItem) {
        const blob = svgItem.getAsFile();
        if (blob) {
          const text = await blob.text();
          onImport({ kind: "svg", markup: makeSvgFluid(text) });
          return true;
        }
      }

      // ── Priority 2: PNG raster ──
      const pngItem = arr.find((i) => i.type === "image/png");
      if (pngItem) {
        const blob = pngItem.getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);
          onImport({ kind: "png", url });
          return true;
        }
      }

      setError(
        "No image found. Make sure to copy a frame in Figma (⌘C), not just select it.",
      );
      return false;
    },
    [onImport],
  );

  const handlePaste = useCallback(
    async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      await processItems(e.clipboardData.items);
    },
    [processItems],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      await processItems(e.dataTransfer.items);
    },
    [processItems],
  );

  const focusPasteArea = () => pasteRef.current?.focus();

  return (
    <div className="space-y-2">
      {/* ── Drop / paste zone ── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={focusPasteArea}
        aria-labelledby={labelId}
        className={[
          "relative flex min-h-[96px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors duration-150",
          "focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2",
          dragging
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : hasFrame
              ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-900/10"
              : "border-border hover:border-blue-300 hover:bg-blue-50/40 dark:hover:bg-blue-900/10",
        ].join(" ")}
      >
        {/*
         * Transparent textarea overlays the zone. It is the actual paste target.
         * Screen readers see its aria-label; sighted users see the zone visuals.
         */}
        <textarea
          ref={pasteRef}
          value=""
          onChange={() => {}}
          onPaste={handlePaste}
          aria-label={
            hasFrame
              ? "Click here and paste (⌘V) to replace the current frame"
              : "Click here and paste (⌘V) to load a Figma frame"
          }
          className="absolute inset-0 h-full w-full cursor-pointer resize-none rounded-lg bg-transparent opacity-0"
        />

        {/* Visual content — pointer-events-none so clicks reach the textarea */}
        <div className="pointer-events-none relative z-10 flex flex-col items-center gap-1.5">
          {dragging ? (
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Drop your frame here
            </p>
          ) : hasFrame ? (
            <>
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-green-600 dark:text-green-400"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Frame loaded
                </span>
              </div>
              <p className="text-xs text-fg-muted">
                Click here and press{" "}
                <kbd className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-[10px]">
                  ⌘V
                </kbd>{" "}
                to replace
              </p>
            </>
          ) : (
            <>
              <svg
                className="h-7 w-7 text-fg-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.4}
                aria-hidden="true"
              >
                <rect
                  x="8"
                  y="2"
                  width="13"
                  height="15"
                  rx="2"
                  stroke="currentColor"
                />
                <path
                  d="M8 6H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-3"
                  stroke="currentColor"
                />
              </svg>
              <p className="text-sm text-fg">
                <span className="font-semibold">Click here</span>, then press{" "}
                <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-xs">
                  ⌘V
                </kbd>{" "}
                to paste a Figma frame
              </p>
              <p className="text-xs text-fg-muted">
                In Figma: select a frame → ⌘C · Supports SVG &amp; PNG
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      {/* Clear button (pointer-events-auto, outside the zone overlay) */}
      {hasFrame && (
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-fg-muted underline hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
        >
          ← Back to component examples
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function TextScalingPlayground() {
  const [scale, setScale] = useState<ScaleStep>(100);
  const [selectedComponentId, setSelectedComponentId] =
    useState<string>("card");
  const [pastedFrame, setPastedFrame] = useState<PastedFrame | null>(null);

  const sliderId = useId();
  const componentSelectId = useId();

  // Revoke blob URLs when the pasted frame changes or the component unmounts
  useEffect(() => {
    return () => {
      if (pastedFrame?.kind === "png") {
        URL.revokeObjectURL(pastedFrame.url);
      }
    };
  }, [pastedFrame]);

  const handleImport = useCallback((frame: PastedFrame) => {
    setPastedFrame((prev) => {
      // Clean up previous blob URL before replacing
      if (prev?.kind === "png") URL.revokeObjectURL(prev.url);
      return frame;
    });
  }, []);

  const handleClear = useCallback(() => {
    setPastedFrame((prev) => {
      if (prev?.kind === "png") URL.revokeObjectURL(prev.url);
      return null;
    });
  }, []);

  const activeComponent =
    PREVIEW_COMPONENTS.find((c) => c.id === selectedComponentId) ??
    PREVIEW_COMPONENTS[0];

  const issues = KNOWN_ISSUES[activeComponent.id] ?? [];
  const visibleIssues = !pastedFrame
    ? scale >= 150
      ? issues
      : scale >= 125
        ? issues.slice(0, 1)
        : []
    : [];

  return (
    <div className="space-y-6">
      {/* ── Controls ── */}
      <div className="rounded-lg border border-border bg-bg p-5 space-y-5">
        <ScaleSlider value={scale} onChange={setScale} sliderId={sliderId} />

        {/* Component selector — only shown when no pasted frame */}
        {!pastedFrame && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor={componentSelectId}
              className="text-sm font-semibold text-fg"
            >
              Component example
            </label>
            <select
              id={componentSelectId}
              value={selectedComponentId}
              onChange={(e) => setSelectedComponentId(e.target.value)}
              className="w-fit rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {PREVIEW_COMPONENTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Figma paste zone */}
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-fg">
            Paste your own Figma frame
          </p>
          <p className="text-xs text-fg-muted">
            Select any frame in Figma and copy it (⌘C). The preview below will
            use your actual design at both 100% and your selected scale.
          </p>
          <FigmaImportArea
            onImport={handleImport}
            hasFrame={pastedFrame !== null}
            onClear={handleClear}
          />
        </div>
      </div>

      {/* ── Issue status badge ── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm font-semibold text-fg">
          {pastedFrame ? "Your frame" : "Preview"}
        </p>

        {!pastedFrame &&
          (visibleIssues.length > 0 ? (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-300"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M6 3.5V6.5M6 8.5h.01"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {visibleIssues.length}{" "}
              {visibleIssues.length === 1 ? "issue" : "issues"} detected at{" "}
              {scale}%
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-300"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              No issues at {scale}%
            </span>
          ))}
      </div>

      {/* ── Always-visible side-by-side preview ── */}
      <div
        className="grid grid-cols-2 gap-3"
        aria-label="Side by side scale comparison"
      >
        <PreviewPanel
          component={pastedFrame ? undefined : activeComponent}
          pastedFrame={pastedFrame ?? undefined}
          scale={100}
          label="Baseline — 100%"
          isBaseline={true}
        />
        <PreviewPanel
          component={pastedFrame ? undefined : activeComponent}
          pastedFrame={pastedFrame ?? undefined}
          scale={scale}
          label={`Scaled — ${scale}%`}
          isBaseline={false}
        />
      </div>

      {/* ── Issue fix cards ── */}
      {visibleIssues.length > 0 && <IssuePanel issues={visibleIssues} />}

      {/* ── WCAG reference ── */}
      <aside className="rounded-lg border border-border bg-bg p-4 text-xs text-fg-muted space-y-1">
        <p className="font-semibold text-fg text-sm">
          WCAG 1.4.4 — Resize Text (Level AA)
        </p>
        <p>
          Text must be resizable up to 200% without assistive technology and
          without loss of content or functionality. Fixed heights, truncation,
          and overflow:hidden are common culprits.
        </p>
      </aside>
    </div>
  );
}
