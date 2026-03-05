"use client";

import { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";

export function FocusStateDemo() {
  const [accessible, setAccessible] = useState(false);

  const focusClass = accessible
    ? "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
    : "focus:outline-none focus-visible:outline-none";

  const inputBase =
    "w-full rounded border border-border bg-bg px-3 py-2 text-sm text-fg";
  const btnBase =
    "rounded bg-focus-ring px-4 py-2 text-sm font-medium text-white hover:opacity-90 motion-safe-transition";

  return (
    <DemoWrapper
      title="Focus state comparison"
      description="Tab through the form below. Toggle between hidden and visible focus indicators to feel the difference."
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setAccessible((a) => !a)}
            aria-pressed={accessible}
            className={`rounded border px-3 py-1.5 text-xs font-medium motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
              accessible
                ? "border-focus-ring bg-focus-ring/10 text-focus-ring"
                : "border-border bg-bg text-fg hover:bg-border"
            }`}
          >
            {accessible ? "Showing: Accessible focus" : "Showing: Hidden focus"}
          </button>
          <p className="text-xs text-fg-muted" aria-live="polite">
            {accessible
              ? "Focus rings are visible. Tab through the fields."
              : "Focus indicators are hidden. Try tabbing — can you tell where you are?"}
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-sm space-y-4 rounded border border-border p-4"
        >
          <div>
            <label htmlFor="focus-name" className="mb-1 block text-sm font-medium text-fg">
              Name
            </label>
            <input
              id="focus-name"
              type="text"
              placeholder="Jane Doe"
              className={`${inputBase} ${focusClass}`}
            />
          </div>

          <div>
            <label htmlFor="focus-role" className="mb-1 block text-sm font-medium text-fg">
              Role
            </label>
            <select id="focus-role" className={`${inputBase} ${focusClass}`}>
              <option>Designer</option>
              <option>Developer</option>
              <option>Product Manager</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="focus-agree"
              type="checkbox"
              className={`h-4 w-4 rounded border-border accent-[var(--color-focus-ring)] ${focusClass}`}
            />
            <label htmlFor="focus-agree" className="text-sm text-fg">
              I agree to the terms
            </label>
          </div>

          <button type="submit" className={`${btnBase} ${focusClass}`}>
            Submit
          </button>
        </form>
      </div>
    </DemoWrapper>
  );
}
