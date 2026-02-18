# Phase 1: Foundation and Design System - Research

**Researched:** 2026-02-18
**Domain:** Next.js 15+ project setup, Tailwind CSS v4 configuration, editorial typography, Framer Motion optimization, component primitives
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation that every subsequent phase depends on. The three critical areas are: (1) correct Tailwind v4 CSS-based configuration with brand design tokens, (2) zero-CLS typography via `next/font`, and (3) a Framer Motion bundle strategy using `LazyMotion` + `domAnimation` that prevents client JS bloat from the start. Getting any of these wrong in Phase 1 causes cascading failures in all later phases.

The current stable Next.js version is **16.1.6** (verified via npm). The project requirements reference Next.js 15+ which is compatible -- using `create-next-app@latest` will install 16.1.6 with React 19, Turbopack, and App Router enabled by default. Tailwind CSS v4.2.0 uses a pure CSS-based configuration model with `@theme` blocks -- no `tailwind.config.js` exists. The Framer Motion library has been rebranded to `motion` (npm package `motion` v12.34.2) with new import paths (`motion/react`, `motion/react-m`).

**Primary recommendation:** Use `create-next-app@latest` with `--yes` flag for default setup (TypeScript, Tailwind, ESLint, App Router, Turbopack), then configure brand tokens via `@theme` in `globals.css`, load fonts via `next/font/google` with CSS variables, and install `motion` (not `framer-motion`) with `LazyMotion` + `domAnimation` wrapping the app.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FNDN-01 | Site uses Next.js 15+ with App Router, TypeScript, deployed to Vercel | `create-next-app@latest --yes` installs Next.js 16.1.6 with all defaults (TS, App Router, Turbopack). Vercel deployment is zero-config for Next.js projects. |
| FNDN-02 | Tailwind CSS v4 configured with CSS-based `@theme` block (not v3 syntax) | Tailwind 4.2.0 uses `@import "tailwindcss"` + `@theme {}` block in CSS. PostCSS plugin is `@tailwindcss/postcss`. No JS config file. Verified code patterns in Standard Stack section. |
| FNDN-03 | Color palette defined as CSS variables: forest green (#1a3a2a), cream (#f5f0e8), terracotta (#c4703f), charcoal (#2a2a2a), sage (#8fa98a) | Define as `--color-*` inside `@theme {}` block. Automatically generates utilities: `bg-forest`, `text-cream`, `border-terracotta`, etc. |
| FNDN-04 | Editorial typography pairing loaded via `next/font`: DM Serif Display (headings) + Plus Jakarta Sans (body) | Import `DM_Serif_Display` (weight 400) and `Plus_Jakarta_Sans` (variable font) from `next/font/google`. Assign CSS variables `--font-display` and `--font-body`. Reference in `@theme` for Tailwind utilities `font-display` and `font-body`. |
| FNDN-05 | Framer Motion configured with LazyMotion + domAnimation to minimize bundle size | Install `motion` package (v12.34.2). Import `{ LazyMotion, domAnimation }` from `motion/react` and `{ m }` from `motion/react-m`. Wrap app in `<LazyMotion features={domAnimation} strict>`. Use `m` instead of `motion` components. ~4.6KB initial vs ~34KB full bundle. |
| FNDN-06 | Reusable AnimatedSection wrapper for scroll-triggered fade-in/slide-up animations | Build as `'use client'` component using `m.div` with `whileInView`, `viewport={{ once: true }}`, and fade-in/slide-up variants. Accepts server-rendered `children` prop. |
| FNDN-07 | Image placeholder system -- styled colored boxes with descriptive labels, easy to swap for real photos | Pure CSS/Tailwind component. No external library needed. Accepts `label`, `aspectRatio`, and optional `className`. Uses brand colors for background. |
| FNDN-08 | Grain/noise texture overlay available for hero sections | CSS `::after` pseudo-element with inline SVG `feTurbulence` filter as data URL background. Lightweight, no image files needed. Uses `mix-blend-mode: overlay` and low opacity. |
| FNDN-09 | Spacing system uses generous whitespace with consistent 8px base scale | Tailwind v4 default `--spacing` is `0.25rem` (4px base). Override to `0.5rem` (8px base) in `@theme` so that `p-1` = 8px, `p-2` = 16px, etc. All spacing utilities automatically recalculate. |
| FNDN-10 | All pages server-rendered by default; client components only where interactivity is needed | Next.js App Router renders all components as Server Components by default. Only add `'use client'` to leaf components that use hooks, event handlers, or browser APIs. AnimatedSection and the LazyMotion provider are the only client components in Phase 1. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework (App Router, SSR, image optimization, metadata API) | Current stable. Turbopack default. React 19. Vercel-native deployment. |
| React | 19.x (canary) | UI runtime | Bundled with Next.js 16. Server Components built-in. |
| TypeScript | ^5.1 | Type safety | Built into `create-next-app`. Required for async Server Components. |
| Tailwind CSS | 4.2.0 | Utility-first CSS with CSS-based config | CSS-first `@theme` tokens. 5x faster builds. 70% smaller output. |
| `@tailwindcss/postcss` | 4.2.0 | PostCSS integration for Next.js | Required adapter for Tailwind v4 in Next.js (not `tailwindcss` PostCSS plugin). |
| `motion` | 12.34.2 | Scroll animations, page transitions | Rebranded from Framer Motion. LazyMotion + domAnimation for minimal bundle. |
| `next/font` | bundled | Google Fonts self-hosting | Zero CLS. No render-blocking requests. No external `<link>` tags. |
| Node.js | >=20.9 (LTS 22.x recommended) | Runtime | Required minimum for Next.js 16. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` | 2.1.1 | Conditional class name composition | Every component with conditional styles |
| `tailwind-merge` | 3.5.0 | Merge conflicting Tailwind classes | Component variants where parent can override child classes |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` (new package) | `framer-motion` (legacy package) | Both at v12.34.2 and functionally identical. `motion` is the maintained path forward; `framer-motion` is deprecated but still works. Use `motion`. |
| Custom CSS animations | `motion` library | Custom CSS is lighter but lacks `whileInView`, `AnimatePresence`, and variant orchestration needed for the scroll-triggered staggered animations this project requires. |
| `postcss` alone | `@tailwindcss/postcss` | The Tailwind-specific PostCSS plugin is required; raw PostCSS cannot process `@theme` blocks. |

**Installation:**
```bash
# Project initialization (creates Next.js 16.1.6 with TS, Tailwind, ESLint, App Router, Turbopack)
npx create-next-app@latest ywi-website --yes

# Additional dependencies
npm install motion clsx tailwind-merge
```

> **Note:** `create-next-app@latest --yes` with Tailwind enabled already installs `tailwindcss`, `@tailwindcss/postcss`, and `postcss`. No need to install them separately.

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)
```
src/
├── app/
│   ├── layout.tsx           # Root layout: HTML shell, fonts, LazyMotion provider
│   ├── page.tsx             # Home page (test content for Phase 1)
│   └── globals.css          # Tailwind import + @theme tokens + grain overlay
│
├── components/
│   └── ui/
│       ├── AnimatedSection.tsx   # 'use client' — scroll-triggered wrapper
│       ├── ImagePlaceholder.tsx  # Server component — styled placeholder box
│       └── GrainOverlay.tsx      # Server component — CSS grain texture
│
├── lib/
│   └── utils/
│       └── cn.ts            # clsx + tailwind-merge utility
│
└── providers/
    └── MotionProvider.tsx    # 'use client' — LazyMotion wrapper
```

### Pattern 1: Tailwind v4 CSS-Based Design Tokens
**What:** All brand colors, fonts, and spacing defined in `@theme` block within `globals.css`.
**When to use:** Always. This is the only way to configure Tailwind v4.
**Example:**
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-forest: #1a3a2a;
  --color-cream: #f5f0e8;
  --color-terracotta: #c4703f;
  --color-charcoal: #2a2a2a;
  --color-sage: #8fa98a;

  /* Typography */
  --font-display: var(--font-dm-serif-display), Georgia, serif;
  --font-body: var(--font-plus-jakarta-sans), system-ui, sans-serif;

  /* Spacing (8px base scale) */
  --spacing: 0.5rem;
}
```
**Source:** [Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4), [Tailwind Next.js Guide](https://tailwindcss.com/docs/guides/nextjs)

### Pattern 2: next/font with CSS Variables for Tailwind v4
**What:** Load Google Fonts via `next/font/google`, expose as CSS variables on `<html>`, reference in `@theme`.
**When to use:** Root layout only. Fonts are set once and cascade to all pages.
**Example:**
```typescript
// src/app/layout.tsx
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body text-charcoal bg-cream">
        {children}
      </body>
    </html>
  )
}
```
**Source:** [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts), [Tailwind v4 Font Discussion](https://github.com/tailwindlabs/tailwindcss/discussions/15923)

**Critical detail:** The CSS variable names in `next/font` (`--font-dm-serif-display`) must match what `@theme` references via `var()`. The `@theme` block creates the Tailwind utility class name (`font-display`, `font-body`), not the CSS variable name.

### Pattern 3: LazyMotion Provider with Strict Mode
**What:** Wrap the app in `LazyMotion` with `domAnimation` features and `strict` prop to enforce `m` usage.
**When to use:** Root layout, as a client component provider.
**Example:**
```typescript
// src/providers/MotionProvider.tsx
'use client'

import { LazyMotion, domAnimation } from 'motion/react'

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
```

```typescript
// In layout.tsx, wrap children:
import MotionProvider from '@/providers/MotionProvider'

// Inside the body:
<body className="font-body text-charcoal bg-cream">
  <MotionProvider>
    {children}
  </MotionProvider>
</body>
```
**Source:** [Motion LazyMotion docs](https://motion.dev/docs/react-lazy-motion), [Motion bundle reduction](https://motion.dev/docs/react-reduce-bundle-size)

**Why strict:** The `strict` prop causes a runtime error if any `motion.*` component is used instead of `m.*`, preventing accidental full-bundle imports that bypass LazyMotion.

### Pattern 4: AnimatedSection with m Component
**What:** Thin `'use client'` wrapper using `m.div` with `whileInView` for scroll-triggered animations.
**When to use:** Wrap any section that should animate on scroll. Accepts server-rendered children.
**Example:**
```typescript
// src/components/ui/AnimatedSection.tsx
'use client'

import { m } from 'motion/react-m'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </m.div>
  )
}
```
**Source:** [Motion whileInView](https://motion.dev/docs/react-scroll-animations), verified import path via npm exports

**Key insight:** Uses `m` from `motion/react-m` (not `motion` from `motion/react`) to leverage LazyMotion's tree-shaking. The `m` component is functionally identical to `motion` but doesn't bundle features -- it inherits them from the nearest `LazyMotion` ancestor.

### Pattern 5: ImagePlaceholder Component
**What:** Server Component that renders a styled colored box with a descriptive label. Easy to swap for `next/image` later.
**When to use:** Anywhere a photo will eventually go.
**Example:**
```typescript
// src/components/ui/ImagePlaceholder.tsx
import { cn } from '@/lib/utils/cn'

interface ImagePlaceholderProps {
  label: string
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide'
  className?: string
}

const aspectClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
}

export default function ImagePlaceholder({
  label,
  aspectRatio = 'video',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-lg bg-sage/30',
        aspectClasses[aspectRatio],
        className
      )}
    >
      <span className="text-sm font-medium text-forest/60 px-4 text-center">
        {label}
      </span>
    </div>
  )
}
```

**Note:** This is a Server Component (no `'use client'`). No JavaScript is shipped for placeholders.

### Pattern 6: Grain/Noise Texture Overlay
**What:** CSS-only grain texture using SVG `feTurbulence` filter as an inline data URL.
**When to use:** Hero sections and full-width banner backgrounds.
**Example:**
```css
/* In globals.css or as a utility */
.grain-overlay {
  position: relative;
}

.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```
**Source:** [CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/)

Alternatively, as a React component:
```typescript
// src/components/ui/GrainOverlay.tsx
export default function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-10 opacity-[0.05] mix-blend-overlay', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
```

### Pattern 7: cn() Utility (clsx + tailwind-merge)
**What:** Utility function for composing Tailwind classes safely.
**When to use:** Every component that accepts a `className` prop.
**Example:**
```typescript
// src/lib/utils/cn.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Anti-Patterns to Avoid

- **Using `tailwind.config.js` or `tailwind.config.ts`:** Tailwind v4 uses CSS-based config only. No JS config file should exist.
- **Using `@tailwind base; @tailwind components; @tailwind utilities;`:** v3 syntax. Use `@import "tailwindcss";` instead.
- **Using `tailwindcss` as PostCSS plugin:** Must use `@tailwindcss/postcss` for v4.
- **Importing `motion` instead of `m` inside LazyMotion:** Importing `motion` bypasses LazyMotion and bundles the full ~34KB runtime. Use `m` from `motion/react-m`.
- **Adding `'use client'` to `page.tsx` files:** Turns entire page into client bundle. Keep all pages as Server Components.
- **Loading fonts via `<link>` tags:** Use `next/font/google` exclusively. External font requests cause CLS and render blocking.
- **Setting `--spacing` in `:root` instead of `@theme`:** Values in `:root` are not picked up by Tailwind's utility generation. Must be inside `@theme {}`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Conditional CSS classes | String concatenation with ternaries | `clsx` + `tailwind-merge` via `cn()` | Handles falsy values, arrays, objects; resolves Tailwind class conflicts |
| Font loading | `<link>` tags or `@import url()` in CSS | `next/font/google` | Self-hosts fonts, eliminates CLS, zero external requests |
| Scroll-triggered visibility | IntersectionObserver + useState | `m.div` with `whileInView` | Handles animation states, viewport margins, `once` option out of the box |
| Design tokens distribution | Separate CSS variable file + manual Tailwind config | `@theme {}` block in globals.css | Single source of truth; auto-generates both CSS variables and Tailwind utilities |
| Noise texture | PNG/WebP texture images | Inline SVG `feTurbulence` | Resolution-independent, <1KB, no network request, adjustable parameters |

**Key insight:** Every listed "don't hand-roll" item maps to a Phase 1 primitive that later phases depend on. Building custom alternatives creates maintenance debt across 9 subsequent phases.

## Common Pitfalls

### Pitfall 1: Tailwind v4 Using v3 Syntax
**What goes wrong:** Styles don't apply, custom colors don't work, build may fail silently or produce empty CSS.
**Why it happens:** 95% of Tailwind tutorials online target v3. Developers copy-paste `tailwind.config.js` patterns.
**How to avoid:**
- No `tailwind.config.js` or `.ts` file in project root
- CSS file starts with `@import "tailwindcss";` (not `@tailwind` directives)
- PostCSS config uses `@tailwindcss/postcss` (not `tailwindcss`)
- Custom values go inside `@theme {}` (not JS objects)
**Warning signs:** Custom color classes like `bg-forest` render as transparent. `postcss.config.mjs` references wrong plugin.

### Pitfall 2: Font CSS Variables Not Available in @theme
**What goes wrong:** `font-display` and `font-body` Tailwind utilities don't apply any font. Headings render in system font.
**Why it happens:** `next/font` injects CSS variables at the element level (where `className` is applied). If the `@theme` block references a CSS variable that isn't on `:root` or an ancestor, Tailwind can't resolve it at build time.
**How to avoid:**
- Apply font variable classes to `<html>` element (not `<body>`)
- Use `var(--font-dm-serif-display)` in `@theme`'s `--font-display` declaration
- Verify the CSS variable name in `next/font` matches exactly what `@theme` references
**Warning signs:** `font-display` class exists in HTML but headings render in system serif. DevTools shows CSS variable as undefined.

### Pitfall 3: Importing `motion` Instead of `m` with LazyMotion
**What goes wrong:** Full Framer Motion runtime (~34KB) ships to client despite `LazyMotion` being configured.
**Why it happens:** Developer imports `{ motion }` from `motion/react` instead of `{ m }` from `motion/react-m` by habit.
**How to avoid:**
- Add `strict` prop to `<LazyMotion>` to get runtime errors on `motion` usage
- Import `{ m }` from `motion/react-m` in all animated components
- Never import from `motion/react` in components that render motion elements
**Warning signs:** Bundle analyzer shows large `motion` chunk. `strict` mode throws console error.

### Pitfall 4: `'use client'` Boundary Creep
**What goes wrong:** Pages ship as client-rendered bundles. View Source shows empty HTML shell. SEO and Core Web Vitals tank.
**Why it happens:** Adding `'use client'` to a parent component to fix an import error (e.g., importing a component that uses hooks).
**How to avoid:**
- All `page.tsx` files are Server Components -- no exceptions
- Only leaf interactive components get `'use client'`: `AnimatedSection`, `MotionProvider`
- Use the "server parent, client child" pattern: server component renders static HTML and passes children to client wrapper
**Warning signs:** `'use client'` appears in `page.tsx` or section-level components.

### Pitfall 5: 8px Spacing Override Breaking Tailwind Expectations
**What goes wrong:** Setting `--spacing: 0.5rem` means `p-4` = 32px (not the usual 16px). Developers familiar with default Tailwind will use wrong numbers.
**Why it happens:** Default Tailwind uses 4px base (`--spacing: 0.25rem`). Overriding to 8px doubles all spacing values.
**How to avoid:**
- Document the spacing scale clearly in the project
- Create a spacing reference: `p-1`=8px, `p-2`=16px, `p-3`=24px, `p-4`=32px, `p-6`=48px, `p-8`=64px
- Consider keeping default `--spacing: 0.25rem` and simply using larger numbers (p-8, p-12, p-16) for generous whitespace instead
**Warning signs:** Layouts have too much or too little spacing because developer assumed default 4px scale.

**Recommendation on FNDN-09:** Rather than overriding `--spacing` to `0.5rem` (which changes every Tailwind spacing utility), keep the default `0.25rem` base and establish a project convention of using generous spacing values (e.g., `py-16` for section padding, `gap-8` for card grids, `space-y-6` for content flow). This avoids confusion while achieving the "generous whitespace" requirement. Document recommended spacing values in the codebase.

## Code Examples

Verified patterns from official sources:

### PostCSS Configuration (Tailwind v4 + Next.js)
```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```
**Source:** [Tailwind CSS Next.js Installation Guide](https://tailwindcss.com/docs/guides/nextjs)

### Complete globals.css (Phase 1)
```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-forest: #1a3a2a;
  --color-cream: #f5f0e8;
  --color-terracotta: #c4703f;
  --color-charcoal: #2a2a2a;
  --color-sage: #8fa98a;

  /* Extended palette for UI states */
  --color-forest-light: #2d5a42;
  --color-terracotta-light: #d4884f;

  /* Typography — references CSS variables injected by next/font */
  --font-display: var(--font-dm-serif-display), Georgia, serif;
  --font-body: var(--font-plus-jakarta-sans), system-ui, sans-serif;
}

/* Grain texture overlay utility */
.grain-overlay {
  position: relative;
}

.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```
**Source:** [Tailwind CSS v4 @theme](https://tailwindcss.com/blog/tailwindcss-v4), [CSS-Tricks Grainy Gradients](https://css-tricks.com/grainy-gradients/)

### Complete Root Layout (Phase 1)
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import MotionProvider from '@/providers/MotionProvider'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yard Weasels Inc. | Professional Landscaping in Fergus, Ontario',
  description: 'Premium landscaping services in Fergus, Ontario. Design, build, maintenance, irrigation, snow removal, and quality materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body text-charcoal bg-cream antialiased">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
```
**Source:** [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts), [Next.js Installation](https://nextjs.org/docs/app/getting-started/installation)

### MotionProvider (LazyMotion wrapper)
```typescript
// src/providers/MotionProvider.tsx
'use client'

import { LazyMotion, domAnimation } from 'motion/react'

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
```
**Source:** [Motion LazyMotion](https://motion.dev/docs/react-lazy-motion), [Motion Bundle Size](https://motion.dev/docs/react-reduce-bundle-size)

### cn() Utility
```typescript
// src/lib/utils/cn.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JavaScript) | `@theme {}` in CSS | Tailwind v4 (Jan 2025) | All config is CSS-native. No JS config file. |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (Jan 2025) | Single import replaces three directives. |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` | Tailwind v4 (Jan 2025) | Different npm package for PostCSS integration. |
| `framer-motion` package | `motion` package | Late 2024 | New import paths: `motion/react`, `motion/react-m`. Same API. |
| `import { motion } from 'framer-motion'` | `import { m } from 'motion/react-m'` | Late 2024 | Tree-shakeable `m` component for LazyMotion. |
| Next.js 14 (Webpack default) | Next.js 16.1.6 (Turbopack default) | Next.js 15 (Oct 2024) | Turbopack is default for `next dev` and `next build`. Faster builds. |
| React 18 | React 19 (canary) | Next.js 15+ (Oct 2024) | Server Components stable. Bundled with Next.js. |
| `create-next-app` with many prompts | `create-next-app --yes` | Next.js 16 | Single flag for all defaults (TS, Tailwind, ESLint, App Router, Turbopack). |

**Deprecated/outdated:**
- `tailwind.config.js`: v3 syntax. Will not work with Tailwind v4.
- `@tailwind` directives: Replaced by `@import "tailwindcss"`.
- `framer-motion` package name: Still works but deprecated in favor of `motion`.
- `import { motion }` with LazyMotion: Use `import { m }` from `motion/react-m`.
- Next.js 14 / 15: Still functional but 16.1.6 is current stable with Turbopack default.

## Open Questions

1. **Spacing convention: override --spacing or use larger values?**
   - What we know: Tailwind v4 default `--spacing` is `0.25rem` (4px). Overriding to `0.5rem` doubles all utilities. FNDN-09 requires "8px base scale."
   - What's unclear: Whether the requirement means "redefine the base" or "use generous spacing." Overriding creates developer confusion.
   - Recommendation: Keep default `--spacing: 0.25rem` and document a project spacing convention using multiples of 2 (e.g., `py-16` = 64px for sections). If strict 8px base is required, override `--spacing: 0.5rem` but document the new scale prominently.

2. **`motion/react` vs `motion/react-client` for Next.js App Router**
   - What we know: The `motion` package exports `motion/react` and `motion/react-client`. The `react-client` entry point has "use client" baked in.
   - What's unclear: Whether `motion/react` already includes "use client" directive or if components must be in files with explicit `'use client'`.
   - Recommendation: Always wrap motion usage in explicit `'use client'` files. This is clear, explicit, and guaranteed correct regardless of internal package directives.

3. **DM Serif Display availability as variable font**
   - What we know: DM Serif Display is available on Google Fonts with weight 400 only. It is NOT a variable font.
   - What's unclear: N/A - this is confirmed.
   - Recommendation: Import with `weight: '400'` since it only has one weight. This is fine for headings.

## Sources

### Primary (HIGH confidence)
- [Next.js Installation Docs (v16.1.6)](https://nextjs.org/docs/app/getting-started/installation) - create-next-app flags, system requirements, project structure
- [Next.js Font Optimization (v16.1.6)](https://nextjs.org/docs/app/getting-started/fonts) - next/font/google API, CSS variable pattern, layout integration
- [Tailwind CSS v4 Next.js Guide](https://tailwindcss.com/docs/guides/nextjs) - PostCSS setup, @import syntax, installation steps
- [Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) - @theme syntax, spacing scale, font tokens, color tokens
- npm registry (verified 2026-02-18): `next@16.1.6`, `tailwindcss@4.2.0`, `@tailwindcss/postcss@4.2.0`, `motion@12.34.2`, `clsx@2.1.1`, `tailwind-merge@3.5.0`

### Secondary (MEDIUM confidence)
- [Motion LazyMotion docs](https://motion.dev/docs/react-lazy-motion) - LazyMotion API, strict mode, m component (page did not render content but information verified via WebSearch and npm exports)
- [Motion Bundle Size docs](https://motion.dev/docs/react-reduce-bundle-size) - domAnimation vs domMax, ~4.6KB initial bundle
- [Tailwind v4 Font Discussion (#15923)](https://github.com/tailwindlabs/tailwindcss/discussions/15923) - next/font CSS variable connection to @theme
- [CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/) - SVG feTurbulence technique, blend modes, CSS patterns
- [Motion GitHub](https://github.com/motiondivision/motion) - Package exports verified via `npm view motion exports`

### Tertiary (LOW confidence)
- Motion `motion/react-client` vs `motion/react` internal "use client" behavior - inferred from npm exports and community patterns, not verified against official docs (motion.dev pages did not render documentation content in WebFetch)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified via npm registry (2026-02-18). Next.js, Tailwind, Motion install commands verified against official docs.
- Architecture: HIGH - Patterns verified against Next.js official docs (App Router, next/font) and Tailwind v4 official docs (@theme). Motion LazyMotion patterns verified via npm exports and multiple community sources.
- Pitfalls: HIGH - Tailwind v3/v4 incompatibility well-documented. Font CSS variable cascade issue documented in official Tailwind GitHub discussions. Motion m vs motion component distinction documented in multiple sources.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days - stable ecosystem, all libraries at major release versions)
