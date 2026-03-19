# Project Context: The Accessibility Hub

## What This Project Is
A practical, hands-on learning platform that helps **designers integrate accessibility into their everyday workflow**.

Not a documentation site. Not a reference library.
A tool that transforms accessibility guidelines into **interactive, actionable design experiences**.

## Core Philosophy
- Accessibility should feel approachable, not overwhelming
- Learning by doing > reading walls of text
- Every module should answer: *"How do I apply this right now, in my designs?"*
- Target user: **designers** — not developers, not auditors

---

## Key Features to Build

### Interactive Modules (small, focused, self-contained)
Each module covers one accessibility topic and includes:
- A short explanation of the concept
- An **interactive playground** to explore it visually
- A **real design scenario** showing it in context
- A quick checklist or takeaway

### Priority Modules
1. **Color Contrast Checker** — test foreground/background pairs against WCAG AA/AAA
2. **Focus States Explorer** — visualize and design accessible focus indicators
3. **Accessible UI Patterns** — interactive examples of common components done right (modals, tooltips, forms, etc.)
4. **Typography & Readability** — font size, line height, spacing for accessibility
5. **Motion & Animation** — prefers-reduced-motion considerations

### Quick Accessibility Checks
Lightweight tools designers can use mid-workflow without leaving the hub:
- Contrast ratio calculator
- Color blindness simulator
- Focus order visualizer
- Touch target size checker

---

## Target Audience
- **Primary:** UI/UX designers who know accessibility matters but find it hard to apply
- **Secondary:** Design teams wanting to build shared accessibility standards
- **Not the primary user:** Developers, QA testers, accessibility auditors

---

## Design Principles for the Hub Itself
The platform must practice what it teaches:
- Full keyboard navigability
- WCAG AA compliant at minimum (AAA where possible)
- Responsive and mobile-friendly
- Clear visual hierarchy and readable typography
- Meaningful focus states on every interactive element
- No motion without respecting `prefers-reduced-motion`

---

## Content Structure (Information Architecture)

```
/
├── Home — value prop + entry points to modules
├── Modules
│   ├── Color Contrast
│   ├── Focus States
│   ├── UI Patterns
│   ├── Typography
│   └── Motion
├── Quick Checks — standalone micro-tools
└── Resources — WCAG references, further reading (minimal, curated)
```

---

## What I Want Claude Code to Help Me Build
- [ ] Project scaffold and routing structure
- [ ] Reusable component system (accessible by default)
- [ ] Color contrast checker module (interactive, real-time feedback)
- [ ] Focus state playground (live preview of focus styles)
- [ ] UI pattern library with do/don't examples
- [ ] Quick check tools as standalone components
- [ ] Theming system that itself is WCAG compliant

---

## Stack
**Framework:** Next.js (App Router)
**Language:** TypeScript
**Styling:** Tailwind CSS
**Architecture:** Component-based UI

### Architecture Notes for Claude Code
- Use the `app/` directory with App Router conventions (layouts, pages, loading, error files)
- Components live in `components/` organized by feature/module
- Each accessibility module = its own folder with its components, logic, and types colocated
- Prefer React Server Components by default, use `"use client"` only when interactivity requires it
- TypeScript strict mode — no `any`, explicit types for all props and return values
- Tailwind for all styling — no CSS modules, no inline styles

---

## Key Constraints & Notes
- Every component built must be natively accessible (semantic HTML, ARIA only when needed)
- Prefer **showing over telling** — if something can be interactive, make it interactive
- Keep modules **small and focused** — a designer should complete one in under 5 minutes
- Avoid jargon — explain WCAG criteria in plain, design-friendly language
- No login, no paywall — fully open and frictionless to access