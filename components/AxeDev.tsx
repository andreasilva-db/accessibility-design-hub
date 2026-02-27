"use client";

import { useEffect } from "react";

/**
 * In development, runs axe-core accessibility audits and logs results to the console.
 * Not included in production builds. Note: @axe-core/react has limited React 18 support;
 * if audits don't run, use browser DevTools or axe DevTools extension instead.
 */
export function AxeDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      Promise.all([import("@axe-core/react"), import("react"), import("react-dom")]).then(
        ([axeMod, React, ReactDOM]) => {
          const axe = axeMod.default;
          if (typeof axe === "function") {
            axe(React, ReactDOM, 1000);
          }
        }
      );
    }
  }, []);
  return null;
}
