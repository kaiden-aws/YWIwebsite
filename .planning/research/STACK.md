# Technology Stack

**Project:** Yard Weasels Inc. (YWI) Marketing Website
**Researched:** 2026-02-18
**Sources:** Next.js official docs, Tailwind CSS official docs

---

## CRITICAL VERSION FLAG

The project constraints specify "Next.js 14 App Router" but the current Next.js stable release is **16.x**. Next.js 14 is ~2.5 years old. **Recommendation: upgrade to Next.js 15 or 16.** The App Router pattern is identical — migration is low-risk via the official codemod. If the team must pin to 14 for any reason, several features below are unavailable.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | `^15.x` (ideally `^16.x`) | Framework | App Router, SSR, image optimization, metadata API, Vercel-native deployment. Project specifies "14" but 16 is current as of Feb 2026. Upgrade via `npx @next/codemod@canary upgrade latest`. |
| React | `^19.x` | UI runtime | React 19 is stable and bundled with Next.js 15+. Server Components work out of the box with App Router. |
| TypeScript | `^5.1` | Type safety | Built into `create-next-app`. Minimum v5.1 required for async Server Components. Next.js ships its own TS plugin for IDE-level route type checking. |
| Node.js | `>=20.9` | Runtime | Required minimum as of Next.js 15. Use LTS (v22.x) for best compatibility. |

**Confidence:** HIGH — verified against official Next.js docs (2026-02-16).

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | `^4.x` (latest) | Utility-first CSS | Project-locked. v4 is a major rewrite: CSS-based config replaces `tailwind.config.js`, `@import 'tailwindcss'` replaces directives, significantly faster build. |
| `@tailwindcss/postcss` | latest | Next.js integration | v4's PostCSS adapter for Next.js. Official Next.js docs (2026-02-16) show exactly this setup. NOT `@tailwindcss/vite` — that's for Vite projects. |

**Tailwind v4 setup (Next.js specific):**
```bash
npm install -D tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';

:root {
  --color-forest: #1a3a2a;
  --color-cream: #f5f0e8;
  --color-terracotta: #c4703f;
  --color-charcoal: #2a2a2a;
  --color-sage: #8fa98a;
}
```

**Confidence:** HIGH — verified against official Next.js CSS docs (2026-02-16).

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `framer-motion` | `^11.x` | Scroll animations, page transitions, entrance effects | Project-locked. Framer Motion rebranded to `motion` (package: `motion`) in late 2024, but `framer-motion` still installs. For greenfield, prefer `motion` package. Both import paths are valid. |

**Confidence:** MEDIUM — framer-motion v11 and rebranding confirmed. Exact latest patch unverified. Verify at install time.

**For Next.js App Router:** Framer Motion components require `'use client'` directive. Use `LazyMotion` + `domAnimation` bundle to minimize client-side JS.

### Typography

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font` | bundled | Google Fonts loading | Automatically self-hosts fonts, eliminates render-blocking Google requests, zero CLS. Never use a `<link>` tag for Google Fonts in Next.js. |

**Font pairing:** DM Serif Display (display/headings) + Plus Jakarta Sans (body). DM Serif is sharper than Playfair Display; Plus Jakarta Sans is more distinctive than Outfit.

### Infrastructure

| Technology | Purpose | Why |
|------------|---------|-----|
| Vercel | Deployment | Native Next.js platform, zero-config, automatic image optimization, Edge CDN, preview deployments. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` | `^2.x` | Conditional class names | Composing Tailwind classes conditionally |
| `tailwind-merge` | `^2.x` | Merge Tailwind classes | Prevents conflicting class duplication in variants |
| `react-hook-form` | `^7.x` | Form state | Contact form validation (UI-only) |
| `prettier` + `prettier-plugin-tailwindcss` | latest | Formatting | Auto-sorts Tailwind classes |

---

## What NOT to Use

| Technology | Why Avoid |
|------------|-----------|
| `tailwind.config.js` | v4 uses CSS-based config — no JS config file |
| `@tailwindcss/vite` | That's for Vite projects; Next.js uses `@tailwindcss/postcss` |
| Google Fonts `<link>` tag | Use `next/font` — self-hosts, no CLS, no render blocking |
| CSS-in-JS (styled-components, emotion) | Conflicts with Server Components, bundle bloat, unnecessary with Tailwind |
| Component libraries (shadcn, MUI, Chakra) | Project requires all-custom UI |
| jQuery or legacy animation libs | Framer Motion handles everything; no need for GSAP unless complex 3D |
| `next/image` with external loaders | Use Vercel's built-in image optimization |

---

## Key Findings

- **Next.js "14" is stale** — current stable is 16.x. Upgrade recommended.
- **Tailwind v4** uses `@tailwindcss/postcss` for Next.js. Config is CSS-based — no `tailwind.config.js`.
- **Node.js 20.9+** is required (not 18 as per Next.js 14 docs).
- **Turbopack** is the default dev bundler in Next.js 15+ — no flag needed.
- **Framer Motion** → rebranded to `motion`, but `framer-motion` package still works.
- **React 19** is the paired React version for Next.js 15+.
