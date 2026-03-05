"use client";

import { DemoWrapper } from "./DemoWrapper";
import { Button } from "@/components/ui/Button";

export function HierarchyDemo() {
  return (
    <DemoWrapper
      title="Visual hierarchy comparison"
      description="Side-by-side: poor hierarchy (left) relies on subtle colour differences. Improved hierarchy (right) uses size, weight and spacing."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Version A — low contrast, flat hierarchy */}
        <div
          className="rounded border border-border p-5"
          aria-label="Version A: Low contrast hierarchy"
        >
          <p className="mb-3 text-xs font-medium text-fg-muted">Version A</p>
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 400, color: "#999" }}>
              Account Settings
            </h4>
            <p style={{ fontSize: "13px", color: "#aaa", marginTop: "4px" }}>
              Update your profile information and preferences below.
            </p>
            <div style={{ marginTop: "12px" }}>
              <span style={{ fontSize: "12px", color: "#bbb", display: "block", marginBottom: "4px" }}>
                Name
              </span>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  color: "#aaa",
                  fontSize: "13px",
                }}
              >
                Jane Doe
              </div>
            </div>
            <button
              type="button"
              style={{
                marginTop: "14px",
                padding: "6px 18px",
                backgroundColor: "#e5e5e5",
                color: "#aaa",
                border: "none",
                borderRadius: "4px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>

        {/* Version B — clear hierarchy */}
        <div
          className="rounded border border-border p-5"
          aria-label="Version B: Improved hierarchy"
        >
          <p className="mb-3 text-xs font-medium text-fg-muted">Version B</p>
          <div>
            <h4 className="text-lg font-semibold text-fg">Account Settings</h4>
            <p className="mt-1 text-sm text-fg-muted">
              Update your profile information and preferences below.
            </p>
            <div className="mt-3">
              <span className="mb-1 block text-sm font-medium text-fg">Name</span>
              <div className="rounded border border-border bg-bg px-3 py-2 text-sm text-fg">
                Jane Doe
              </div>
            </div>
            <div className="mt-4">
              <Button variant="primary">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </DemoWrapper>
  );
}
