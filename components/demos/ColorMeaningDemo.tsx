"use client";

import { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";

const STATUSES = [
  {
    label: "Active",
    color: "text-green-600 dark:text-green-400",
    dot: "bg-green-500",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Pending",
    color: "text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-500",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Error",
    color: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export function ColorMeaningDemo() {
  const [grayscale, setGrayscale] = useState(false);

  return (
    <DemoWrapper
      title="Color as the sole indicator"
      description="Toggle grayscale to see why colour alone is not enough to convey meaning."
    >
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setGrayscale((g) => !g)}
          aria-pressed={grayscale}
          className={`rounded border px-3 py-1.5 text-xs font-medium motion-safe-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${
            grayscale
              ? "border-focus-ring bg-focus-ring/10 text-focus-ring"
              : "border-border bg-bg text-fg hover:bg-border"
          }`}
        >
          {grayscale ? "Remove grayscale" : "Apply grayscale"}
        </button>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          style={{ filter: grayscale ? "grayscale(100%)" : "none" }}
        >
          {/* Inaccessible: colour only */}
          <div className="rounded border border-border p-4">
            <h3 className="mb-3 text-sm font-semibold text-fg">Color only</h3>
            <ul className="space-y-2.5" aria-label="Status list using color only">
              {STATUSES.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-sm text-fg">
                  <span
                    className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${s.dot}`}
                    aria-hidden="true"
                  />
                  {s.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Accessible: colour + icon + label */}
          <div className="rounded border border-border p-4">
            <h3 className="mb-3 text-sm font-semibold text-fg">Color + icon + label</h3>
            <ul className="space-y-2.5" aria-label="Status list using color, icon and label">
              {STATUSES.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-sm text-fg">
                  <span className={`shrink-0 ${s.color}`}>{s.icon}</span>
                  <span className="font-medium">{s.label}</span>
                  <span className={`text-xs font-medium ${s.color}`}>
                    ({s.label.toLowerCase()})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
