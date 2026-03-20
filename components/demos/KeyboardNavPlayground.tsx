"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const FOCUSABLE_SEL = [
  "a[href]",
  "button:not([disabled]):not([aria-disabled='true'])",
  "input:not([type='hidden']):not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

const SCENARIOS = [
  { id: "form", label: "Form" },
  { id: "nav", label: "Navigation" },
  { id: "modal", label: "Modal / Dialog" },
] as const;
type ScenarioId = (typeof SCENARIOS)[number]["id"];

const KEY_REF = [
  { key: "Tab", action: "Next focusable element" },
  { key: "Shift+Tab", action: "Previous focusable element" },
  { key: "Enter", action: "Activate button or link" },
  { key: "Space", action: "Toggle checkbox or button" },
  { key: "↑ / ↓", action: "Navigate options in select or menu" },
  { key: "← / →", action: "Navigate tabs, radio group, slider" },
  { key: "Esc", action: "Close modal or dropdown" },
  { key: "Home / End", action: "Jump to first or last item" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRole(el: Element): string {
  const explicit = el.getAttribute("role");
  if (explicit) return explicit;
  const tag = el.tagName.toLowerCase();
  const type = (el.getAttribute("type") || "").toLowerCase();
  if (tag === "button") return "button";
  if (tag === "a") return "link";
  if (tag === "select") return "combobox";
  if (tag === "textarea") return "textbox";
  if (tag === "input") {
    if (type === "checkbox") return "checkbox";
    if (type === "radio") return "radio";
    if (type === "submit" || type === "button") return "button";
    return "textbox";
  }
  return tag;
}

function getAccessibleName(el: Element): string {
  const ariaLabel = el.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;
  const labelledBy = el.getAttribute("aria-labelledby");
  if (labelledBy) {
    const text = labelledBy
      .split(" ")
      .map((id) => document.getElementById(id)?.textContent?.trim())
      .filter(Boolean)
      .join(" ");
    if (text) return text;
  }
  if (el.id) {
    const label = document.querySelector(`label[for="${el.id}"]`);
    if (label) return label.textContent?.trim() || "";
  }
  const inner = (el as HTMLElement).innerText?.trim();
  if (inner) return inner;
  const placeholder = el.getAttribute("placeholder");
  if (placeholder) return placeholder;
  return "(no accessible name)";
}

// ── Form scenario ─────────────────────────────────────────────────────────────

function FormScenario() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-shadow";
  const btnPrimary =
    "rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-colors";
  const btnSecondary =
    "rounded-lg border border-border px-5 py-2 text-sm font-medium text-fg-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-colors";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="kn-fname" className="block text-xs font-medium uppercase tracking-wide text-fg-muted">
            First name
          </label>
          <input id="kn-fname" type="text" placeholder="Jane" className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="kn-lname" className="block text-xs font-medium uppercase tracking-wide text-fg-muted">
            Last name
          </label>
          <input id="kn-lname" type="text" placeholder="Smith" className={inputCls} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="kn-email" className="block text-xs font-medium uppercase tracking-wide text-fg-muted">
          Email address
        </label>
        <input id="kn-email" type="email" placeholder="jane@example.com" className={inputCls} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="kn-role" className="block text-xs font-medium uppercase tracking-wide text-fg-muted">
          Role
        </label>
        <select id="kn-role" className={inputCls}>
          <option>UX Designer</option>
          <option>Product Manager</option>
          <option>Developer</option>
          <option>Researcher</option>
        </select>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="kn-agree"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
        <label htmlFor="kn-agree" className="text-sm leading-snug text-fg-muted">
          I agree to receive accessibility tips and educational resources
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => setSubmitted(true)} className={btnPrimary}>
          Subscribe
        </button>
        <button type="button" onClick={() => setSubmitted(false)} className={btnSecondary}>
          Cancel
        </button>
        <button
          type="button"
          disabled
          title="Disabled — not reachable by keyboard"
          className="cursor-not-allowed rounded-lg border border-border px-5 py-2 text-sm font-medium text-fg-muted/40"
        >
          Reset (disabled)
        </button>
      </div>

      {submitted && (
        <div
          role="alert"
          className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
        >
          Subscribed successfully!
        </div>
      )}
    </div>
  );
}

// ── Navigation scenario ───────────────────────────────────────────────────────

function NavScenario() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const items = [
    { label: "Home", href: "#" },
    { label: "Docs", children: ["Fundamentals", "Development", "Resources"] },
    { label: "Tools", children: ["Contrast Check", "Focus Order", "Screen Reader"] },
    { label: "About", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <nav aria-label="Demo site navigation" className="rounded-lg border border-border bg-bg px-4 py-3">
        <ul className="flex items-center gap-1" role="list">
          {items.map((item) => (
            <li key={item.label} className="relative">
              {item.children ? (
                <>
                  <button
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpenMenu(openMenu === item.label ? null : item.label);
                      }
                      if (e.key === "Escape") setOpenMenu(null);
                    }}
                    className="flex items-center gap-1 rounded px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-xs transition-transform duration-150 ${openMenu === item.label ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  {openMenu === item.label && (
                    <ul className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded-lg border border-border bg-surface shadow-xl">
                      {item.children.map((child) => (
                        <li key={child}>
                          <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") setOpenMenu(null);
                            }}
                            className="block px-4 py-2 text-sm text-fg-muted transition-colors hover:bg-bg/50 hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring"
                          >
                            {child}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  className="block rounded px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="rounded-lg border border-border/40 bg-surface/40 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">Try this:</p>
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-fg-muted">
          <li>
            Tab to <strong className="text-fg">Docs</strong> or <strong className="text-fg">Tools</strong>
          </li>
          <li>
            Press{" "}
            <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 text-xs font-mono">Enter</kbd> or{" "}
            <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 text-xs font-mono">↓</kbd> to open the
            dropdown
          </li>
          <li>Tab through the menu items</li>
          <li>
            Press <kbd className="rounded border border-border bg-bg px-1.5 py-0.5 text-xs font-mono">Esc</kbd> to close
            and return focus
          </li>
        </ol>
      </div>
    </div>
  );
}

// ── Modal scenario ────────────────────────────────────────────────────────────

function ModalScenario() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  // Focus first element when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const first = modalRef.current.querySelector<HTMLElement>(FOCUSABLE_SEL);
      first?.focus();
    }
  }, [isOpen]);

  // Focus trap + Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SEL)
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-bg p-6 text-center space-y-3">
        <p className="text-sm text-fg-muted max-w-sm mx-auto">
          When a dialog opens, focus should move inside it and be trapped there. Tabbing cycles only within the dialog.
          Focus returns to the trigger on close.
        </p>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg transition-colors"
        >
          Open dialog
        </button>
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          {/* Dialog */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="kn-dialog-title"
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 id="kn-dialog-title" className="text-lg font-semibold text-fg">
                  Confirm your action
                </h2>
                <p className="mt-1 text-sm text-fg-muted">
                  Focus is trapped here. Tab cycles through the 4 elements below. Press Esc to close.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={close}
                className="ml-3 shrink-0 rounded-md p-1 text-fg-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-colors"
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="kn-modal-note" className="block text-xs font-medium uppercase tracking-wide text-fg-muted">
                  Add a note (optional)
                </label>
                <input
                  id="kn-modal-note"
                  type="text"
                  placeholder="Your note..."
                  className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-colors"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Focus trap indicator */}
            <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-xs text-blue-400">
              Focus is trapped inside this dialog
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Badge type ────────────────────────────────────────────────────────────────

type Badge = { x: number; y: number; w: number; h: number; order: number };

// ── Main component ────────────────────────────────────────────────────────────

export function KeyboardNavPlayground() {
  const [scenario, setScenario] = useState<ScenarioId>("form");
  const [showOrder, setShowOrder] = useState(false);
  const [focusInfo, setFocusInfo] = useState<{
    tag: string;
    role: string;
    name: string;
    order: number;
    total: number;
  } | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const keyTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Recompute badge positions
  const updateBadges = useCallback(() => {
    if (!demoRef.current) return;
    const container = demoRef.current.getBoundingClientRect();
    const els = Array.from(demoRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SEL));
    setBadges(
      els.map((el, i) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - container.left, y: r.top - container.top, w: r.width, h: r.height, order: i + 1 };
      })
    );
  }, []);

  useEffect(() => {
    if (showOrder) {
      // Small delay to let scenario render first
      const t = setTimeout(updateBadges, 50);
      return () => clearTimeout(t);
    } else {
      setBadges([]);
    }
  }, [showOrder, scenario, updateBadges]);

  // Track focused element in demo area
  useEffect(() => {
    const container = demoRef.current;
    if (!container) return;
    const handleFocusIn = (e: FocusEvent) => {
      const el = e.target as Element;
      if (!container.contains(el)) return;
      const all = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SEL));
      const order = all.indexOf(el as HTMLElement) + 1;
      setFocusInfo({
        tag: el.tagName.toLowerCase(),
        role: getRole(el),
        name: getAccessibleName(el),
        order,
        total: all.length,
      });
      if (showOrder) updateBadges();
    };
    container.addEventListener("focusin", handleFocusIn);
    return () => container.removeEventListener("focusin", handleFocusIn);
  }, [scenario, showOrder, updateBadges]);

  // Track pressed keys globally
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const label =
        e.shiftKey && e.key === "Tab" ? "Shift+Tab"
        : e.key === "Tab" ? "Tab"
        : e.key === "Enter" ? "Enter"
        : e.key === " " ? "Space"
        : e.key === "Escape" ? "Esc"
        : e.key === "ArrowUp" ? "↑ / ↓"
        : e.key === "ArrowDown" ? "↑ / ↓"
        : e.key === "ArrowLeft" ? "← / →"
        : e.key === "ArrowRight" ? "← / →"
        : e.key === "Home" ? "Home / End"
        : e.key === "End" ? "Home / End"
        : null;
      if (!label) return;
      setPressedKey(label);
      clearTimeout(keyTimerRef.current);
      keyTimerRef.current = setTimeout(() => setPressedKey(null), 900);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="space-y-5">
      {/* Scenario tabs */}
      <div className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => { setScenario(s.id); setFocusInfo(null); setBadges([]); }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
              scenario === s.id ? "bg-bg text-fg shadow-sm" : "text-fg-muted hover:text-fg"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main area: demo + inspector */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        {/* Demo panel */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-fg-muted">Click inside, then use keyboard to navigate</span>
            </div>
            <button
              type="button"
              onClick={() => setShowOrder((v) => !v)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
                showOrder
                  ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                  : "border-border text-fg-muted hover:text-fg"
              }`}
            >
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                <text x="6" y="9" textAnchor="middle" fontSize="6" fill="currentColor" fontWeight="bold">
                  1
                </text>
              </svg>
              Tab order
            </button>
          </div>

          {/* Demo content with badge overlay */}
          <div ref={demoRef} className="relative">
            {scenario === "form" && <FormScenario />}
            {scenario === "nav" && <NavScenario />}
            {scenario === "modal" && <ModalScenario />}

            {/* Tab order number badges */}
            {badges.map((b) => (
              <div
                key={b.order}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: b.x + b.w - 8,
                  top: b.y - 8,
                  zIndex: 20,
                }}
                className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold leading-none text-white shadow-lg ring-2 ring-surface"
              >
                {b.order}
              </div>
            ))}
          </div>
        </div>

        {/* Inspector panel */}
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-muted">Focus Inspector</h3>

          {focusInfo ? (
            <div className="space-y-3">
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-fg-muted">
                  <span>Tab stop</span>
                  <span className="font-mono text-fg">
                    {focusInfo.order} / {focusInfo.total}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${(focusInfo.order / focusInfo.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Info rows */}
              {[
                { label: "Element", value: `<${focusInfo.tag}>` },
                { label: "Role", value: focusInfo.role },
                { label: "Accessible name", value: focusInfo.name },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-bg p-3">
                  <div className="mb-1 text-xs text-fg-muted">{label}</div>
                  <div className="break-all font-mono text-sm text-fg">{value}</div>
                </div>
              ))}

              {/* Name quality indicator */}
              <div
                className={`rounded-lg border px-3 py-2 text-xs ${
                  focusInfo.name === "(no accessible name)"
                    ? "border-red-500/30 bg-red-500/10 text-red-400"
                    : "border-green-500/20 bg-green-500/10 text-green-400"
                }`}
              >
                {focusInfo.name === "(no accessible name)"
                  ? "No accessible name — screen readers will announce just the role"
                  : "Has an accessible name"}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
              <svg
                aria-hidden="true"
                className="mb-3 h-8 w-8 text-fg-muted/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M8 12h8M8 8h4" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-fg-muted">Tab through the demo to inspect each element</p>
            </div>
          )}

          {/* Live key indicator */}
          <div
            className={`rounded-lg border px-3 py-2.5 text-center transition-all duration-200 ${
              pressedKey
                ? "border-blue-500/40 bg-blue-500/10"
                : "border-border bg-bg/50"
            }`}
          >
            <div className="mb-1 text-xs text-fg-muted">Last key pressed</div>
            <kbd
              className={`inline-block rounded border px-2 py-0.5 font-mono text-sm transition-all ${
                pressedKey
                  ? "border-blue-500/40 bg-blue-500/20 text-blue-300"
                  : "border-border text-fg-muted/40"
              }`}
            >
              {pressedKey || "—"}
            </kbd>
          </div>
        </div>
      </div>

      {/* Keyboard reference */}
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-muted">Keyboard Reference</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {KEY_REF.map(({ key, action }) => (
            <div
              key={key}
              className={`rounded-lg border p-3 transition-all duration-150 ${
                pressedKey && pressedKey === key
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-border bg-bg/40"
              }`}
            >
              <kbd className="mb-1.5 block font-mono text-xs text-blue-400">{key}</kbd>
              <span className="text-xs leading-snug text-fg-muted">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
