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
      },
      outlineColor: {
        "focus-ring": "var(--color-focus-ring)",
      },
      transitionDuration: {
        DEFAULT: "var(--motion-duration, 150ms)",
      },
    },
  },
  plugins: [],
};

export default config;
