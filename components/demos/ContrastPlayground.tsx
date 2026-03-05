"use client";

import { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";
import { contrastRatio, getWcagLevel } from "@/lib/contrast";

const PRESETS: { label: string; fg: string; bg: string }[] = [
  { label: "Black / White", fg: "#000000", bg: "#ffffff" },
  { label: "Gray / White", fg: "#767676", bg: "#ffffff" },
  { label: "White / Blue", fg: "#ffffff", bg: "#0055cc" },
  { label: "Navy / Cream", fg: "#1e3a5f", bg: "#fdf6e3" },
  { label: "White / Dark", fg: "#f0f0f0", bg: "#1a1a1a" },
];

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function Badge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        pass
          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
      }`}
    >
      {pass ? (
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {label}: {pass ? "Pass" : "Fail"}
    </span>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const valid = HEX_RE.test(draft);

  function handleTextChange(text: string) {
    setDraft(text);
    if (HEX_RE.test(text)) onChange(text);
  }

  function handlePickerChange(hex: string) {
    setDraft(hex);
    onChange(hex);
  }

  // Sync draft when parent value changes (e.g. presets)
  if (valid && draft !== value && HEX_RE.test(value) && value !== draft) {
    // Stale draft — parent changed via preset
  }

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 text-sm font-medium text-fg">
        <span className="w-24">{label}</span>
        <span className="relative">
          <span
            className="block h-8 w-8 rounded border border-border"
            style={{ backgroundColor: value }}
            aria-hidden="true"
          />
          <input
            type="color"
            value={value}
            onChange={(e) => handlePickerChange(e.target.value)}
            className="absolute inset-0 h-8 w-8 cursor-pointer opacity-0"
            aria-label={`${label} color picker`}
          />
        </span>
      </label>
      <input
        type="text"
        value={draft}
        onChange={(e) => handleTextChange(e.target.value)}
        onBlur={() => {
          if (!valid) setDraft(value);
        }}
        className={`w-24 rounded border px-2 py-1 text-sm font-mono text-fg bg-bg ${
          valid ? "border-border" : "border-red-500"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2`}
        aria-label={`${label} hex value`}
        aria-invalid={!valid}
        maxLength={7}
        spellCheck={false}
      />
    </div>
  );
}

export function ContrastPlayground() {
  const [fg, setFg] = useState("#1a1a1a");
  const [bg, setBg] = useState("#ffffff");
  const [isLargeText, setIsLargeText] = useState(false);
  const [showGrayscale, setShowGrayscale] = useState(false);
  const [showProtanopia, setShowProtanopia] = useState(false);

  const ratio = contrastRatio(fg, bg);
  const level = getWcagLevel(ratio, isLargeText);

  // Keep ColorInput drafts in sync with presets
  const [fgKey, setFgKey] = useState(0);
  const [bgKey, setBgKey] = useState(0);

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setFg(preset.fg);
    setBg(preset.bg);
    setFgKey((k) => k + 1);
    setBgKey((k) => k + 1);
  }

  let previewFilter = "none";
  if (showGrayscale && showProtanopia) previewFilter = "grayscale(100%)";
  else if (showGrayscale) previewFilter = "grayscale(100%)";
  else if (showProtanopia)
    previewFilter =
      "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"p\"><feColorMatrix type=\"matrix\" values=\"0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0\"/></filter></svg>#p')";

  return (
    <DemoWrapper
      title="Contrast Playground"
      description="Pick two colours and see the live contrast ratio with WCAG compliance badges."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Controls */}
        <div className="space-y-5">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-fg mb-1">Colors</legend>
            <ColorInput key={`fg-${fgKey}`} label="Foreground" value={fg} onChange={setFg} />
            <ColorInput key={`bg-${bgKey}`} label="Background" value={bg} onChange={setBg} />
          </fieldset>

          <fieldset className="space-y-1">
            <legend className="text-sm font-semibold text-fg mb-1">Text size</legend>
            <label className="flex items-center gap-2 text-sm text-fg">
              <input
                type="radio"
                name="textSize"
                checked={!isLargeText}
                onChange={() => setIsLargeText(false)}
                className="accent-[var(--color-focus-ring)]"
              />
              Normal text (body)
            </label>
            <label className="flex items-center gap-2 text-sm text-fg">
              <input
                type="radio"
                name="textSize"
                checked={isLargeText}
                onChange={() => setIsLargeText(true)}
                className="accent-[var(--color-focus-ring)]"
              />
              Large text (18pt+)
            </label>
          </fieldset>

          <div>
            <p className="text-sm font-semibold text-fg mb-2">Presets</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Preset color palettes">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="rounded border border-border bg-bg px-3 py-1.5 text-xs font-medium text-fg hover:bg-border motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowGrayscale((v) => !v)}
              aria-pressed={showGrayscale}
              className={`rounded border px-3 py-1.5 text-xs font-medium motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
                showGrayscale
                  ? "border-focus-ring bg-focus-ring/10 text-focus-ring"
                  : "border-border bg-bg text-fg hover:bg-border"
              }`}
            >
              Grayscale
            </button>
            <button
              type="button"
              onClick={() => setShowProtanopia((v) => !v)}
              aria-pressed={showProtanopia}
              className={`rounded border px-3 py-1.5 text-xs font-medium motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
                showProtanopia
                  ? "border-focus-ring bg-focus-ring/10 text-focus-ring"
                  : "border-border bg-bg text-fg hover:bg-border"
              }`}
            >
              Protanopia sim
            </button>
          </div>
        </div>

        {/* Preview + results */}
        <div className="space-y-4">
          <div
            className="rounded-lg border border-border p-6"
            style={{
              backgroundColor: bg,
              color: fg,
              filter: previewFilter,
            }}
          >
            <p
              className="font-semibold"
              style={{ fontSize: isLargeText ? "24px" : "16px", lineHeight: 1.5 }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <p style={{ fontSize: isLargeText ? "20px" : "14px", marginTop: "0.5rem", opacity: 0.9 }}>
              0123456789 — Aa Bb Cc Dd Ee
            </p>
          </div>

          <div aria-live="polite" className="space-y-3">
            <p className="text-sm text-fg">
              Contrast ratio:{" "}
              <strong className="text-lg font-bold text-fg">{ratio > 0 ? `${ratio.toFixed(2)}:1` : "—"}</strong>
            </p>

            <div className="flex flex-wrap gap-2">
              <Badge pass={level.aa} label="AA" />
              <Badge pass={level.aaa} label="AAA" />
            </div>

            <p className="text-xs text-fg-muted">
              {isLargeText
                ? "Large text: AA ≥ 3:1 · AAA ≥ 4.5:1"
                : "Normal text: AA ≥ 4.5:1 · AAA ≥ 7:1"}
            </p>
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
