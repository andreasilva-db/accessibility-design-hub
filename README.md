# Accessibility Design Hub

A web-based documentation app with interactive micro-demos for accessibility best practices. Built with Next.js (App Router), TypeScript, MDX, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   ```

   Or with pnpm:

   ```bash
   pnpm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   Or:

   ```bash
   pnpm dev
   ```

3. **Open in the browser**

   Go to [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Start dev server (hot reload)  |
| `npm run build`| Build for production          |
| `npm run start`| Run production build locally   |
| `npm run lint` | Run ESLint (includes jsx-a11y)|

## Project structure

- **`app/`** — Next.js App Router: root layout, home page, docs catch-all route.
- **`components/`** — UI components, layout (e.g. SkipLink), and interactive demos.
- **`content/guides/`** — MDX documentation; each file is served at `/docs/<filename>`.
- **`lib/`** — MDX loading helpers and accessibility utilities.

## Accessibility

- **Linting:** ESLint with `eslint-config-next` and `plugin:jsx-a11y/strict` to catch common a11y issues.
- **Runtime (dev):** Optional axe-core runs in development and logs findings to the browser console (React 18 support may be limited; the axe DevTools browser extension is an alternative).
- **Layout:** Skip link, semantic landmarks (header, main, footer), and design tokens that respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Adding content

Add new guides as `.mdx` files in `content/guides/`. The URL will be `/docs/<name>` (e.g. `content/guides/color-contrast.mdx` → `/docs/color-contrast`). You can embed demo components (e.g. `<DemoButtonCompare />`) in MDX; register them in `app/docs/[[...slug]]/page.tsx`.
