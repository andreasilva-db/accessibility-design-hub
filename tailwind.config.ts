import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fg: "var(--color-fg)",
        bg: "var(--color-bg)",
        "fg-muted": "var(--color-fg-muted)",
        "focus-ring": "var(--color-focus-ring)",
        border: "var(--color-border)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
      },
      outlineColor: {
        "focus-ring": "var(--color-focus-ring)",
      },
      transitionDuration: {
        DEFAULT: "var(--motion-duration, 200ms)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)",
        "glow-sm": "0 0 20px rgba(37,99,235,0.15)",
        "glow": "0 0 40px rgba(37,99,235,0.20)",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
