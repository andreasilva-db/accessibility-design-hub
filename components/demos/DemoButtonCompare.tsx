"use client";

import { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";
import { Button } from "@/components/ui/Button";

export function DemoButtonCompare() {
  const [count, setCount] = useState(0);
  return (
    <DemoWrapper
      title="Button: accessible vs. inaccessible"
      description="Compare a button with a visible label and focus style (correct) against a div that looks like a button (poor accessibility)."
    >
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg">Accessible button</span>
          <Button
            onClick={() => setCount((c) => c + 1)}
            aria-label="Increment counter"
          >
            Clicked {count} times
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-fg-muted">Div (not focusable, no role)</span>
          <div
            className="inline-flex items-center justify-center rounded px-4 py-2 font-medium bg-border text-fg cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
              }
            }}
          >
            Not a real button
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
