# Common Pitfalls

**Domain:** Premium multi-page Next.js marketing website (landscaping company)
**Project:** Yard Weasels Inc. (YWI)
**Researched:** 2026-02-18
**Overall confidence:** HIGH for Next.js pitfalls (official docs verified) / MEDIUM for Tailwind v4 + Framer Motion specifics

---

## Critical Pitfalls (Causes Rewrites or Disqualifying Failures)

### 1. Framer Motion Client Bundle Bloat

**The mistake:** Importing `framer-motion` normally in every animated component ships the full 30-40KB animation runtime to every page, even if only using simple fade-ins.

**Warning signs:**
- Large client JS bundle in Next.js build output
- Slow Time to Interactive (TTI) on mobile
- `framer-motion` appearing in multiple chunks

**Prevention strategy:**
- Use `LazyMotion` with `domAnimation` feature set (not `domMax`) at the root layout level
- Use `next/dynamic` with `{ ssr: false }` for heavy animation components (carousel, lightbox)
- Keep animation components as small leaf nodes, not page wrappers
- Audit bundle with `@next/bundle-analyzer` during polish phase

**Phase mapping:** Establish in Phase 1 (foundation) before any animation work begins.

---

### 2. Client Boundary Creep ('use client' Propagating Up)

**The mistake:** Adding `'use client'` at page or section level because one child needs interactivity. This turns entire subtrees into client bundles, destroying SSR benefits.

**Warning signs:**
- `'use client'` in `page.tsx` files
- `'use client'` in section-level components that are mostly static HTML
- Server-rendered content not visible in "View Source"

**Prevention strategy:**
- All `page.tsx` files must be Server Components — no exceptions
- Interactive features are leaf-level Client Components (Calculator, Carousel, Gallery, Form)
- Use the `AnimatedSection` wrapper pattern — thin `'use client'` wrapper that accepts server-rendered `children`
- Never add `'use client'` to fix an import error — restructure the component boundary instead

**Phase mapping:** Enforce from Phase 1 (architecture setup). Review during every phase.

---

### 3. Hero Image Lazy Loading Tanks LCP

**The mistake:** `next/image` defaults to `loading="lazy"`. The hero image (the largest visible element above the fold) must load eagerly or LCP scores tank by 2-3 seconds on mobile.

**Warning signs:**
- LCP > 2.5s in Lighthouse
- Hero image visibly pops in after page load
- White/empty hero area on initial render

**Prevention strategy:**
- Set `priority={true}` (or `preload={true}` in Next.js 16+) on hero images
- Set explicit `sizes` prop for responsive images
- Use `placeholder="blur"` with a base64 blurDataURL for instant visual feedback
- For placeholder boxes (pre-photo-swap), use CSS gradients instead of `next/image`

**Phase mapping:** Implement when building hero sections. Verify during SEO/performance phase.

---

### 4. Missing `sizes` Prop on Responsive Images

**The mistake:** Using `next/image` without a `sizes` prop causes the browser to download full-width images even on mobile — 3-5x larger than needed.

**Warning signs:**
- Images taking long to load on mobile
- Network tab showing 1200px+ images on 375px viewports
- Lighthouse "Properly size images" warning

**Prevention strategy:**
- Every `next/image` with responsive layout gets a `sizes` prop
- Example: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- Create a helper that generates common sizes patterns

**Phase mapping:** Implement when swapping placeholders for real images. Check during performance phase.

---

### 5. Tailwind CSS v4 Config Using v3 Syntax

**The mistake:** The ecosystem is full of v3 tutorials. Using `tailwind.config.js`, `@tailwind base/components/utilities` directives, or the v3 PostCSS plugin silently breaks styles or the build.

**Warning signs:**
- `tailwind.config.js` or `tailwind.config.ts` exists in project root
- `@tailwind base;` in CSS files instead of `@import 'tailwindcss';`
- `tailwindcss` PostCSS plugin instead of `@tailwindcss/postcss`
- Custom colors not working with utility classes

**Prevention strategy:**
- v4 uses CSS-based config via `@theme` block in `globals.css`
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`)
- Import is `@import 'tailwindcss';` (not `@tailwind` directives)
- Custom colors go in `@theme { --color-forest: #1a3a2a; }` — then use as `bg-forest`, `text-forest`
- Verify setup against official Tailwind v4 + Next.js docs before writing any styles

**Phase mapping:** Must be correct in Phase 1 (project setup). Wrong config here breaks everything downstream.

---

### 6. SEO Metadata Not Configured Per-Page

**The mistake:** Only setting metadata in root `layout.tsx` and forgetting per-page metadata. For a local business site, every page needs location-specific keywords.

**Warning signs:**
- All pages show the same `<title>` tag
- No Open Graph tags on services/products pages
- Google search results showing generic titles

**Prevention strategy:**
- Every `page.tsx` exports its own `metadata` object (or `generateMetadata` function)
- Include location keywords: "Fergus, Ontario", "Centre Wellington"
- Include service-specific keywords per page
- Set Open Graph images per page (even if placeholder initially)
- Add `sitemap.ts` and `robots.ts` in the app directory

**Phase mapping:** Add metadata as each page is built. Final audit during SEO phase.

---

## Moderate Pitfalls

### 7. Parallax/Scroll Animations Causing Layout Thrash

**The mistake:** Animating CSS properties that trigger layout recalculation (top, left, width, height, margin, padding) instead of transform-only properties.

**Prevention strategy:**
- Only animate `transform` (translate, scale, rotate) and `opacity`
- Use `will-change: transform` sparingly on parallax elements
- Use Framer Motion's `useScroll` + `useTransform` for parallax (GPU-accelerated)
- Test on low-end Android device — layout thrash is invisible on fast Macs

**Phase mapping:** Animation implementation phases. Test on real devices during polish.

---

### 8. Contact Form Without Rate Limiting

**The mistake:** Even UI-only forms can be abused if a backend is added later without rate limiting.

**Prevention strategy:**
- Add client-side honeypot field (hidden field bots fill out)
- Add basic client-side rate limiting (disable submit for 3s after submission)
- Document that server-side rate limiting is required when backend is wired up

**Phase mapping:** Contact page build phase. Note for future backend integration.

---

### 9. Google Fonts Loaded via `<link>` Instead of `next/font`

**The mistake:** Adding Google Fonts via `<link>` in `<head>` causes render-blocking requests, FOUT (flash of unstyled text), and CLS shifts.

**Prevention strategy:**
- Always use `next/font/google` — it self-hosts fonts automatically
- Configure in root `layout.tsx` and apply via CSS variable
- Set `display: 'swap'` for perceived performance
- Never add font `<link>` tags manually

**Phase mapping:** Phase 1 (project foundation). Must be correct from the start.

---

### 10. Heading Hierarchy Broken by Design Decisions

**The mistake:** Using heading levels for visual styling (e.g., `<h3>` because it looks right) instead of semantic structure. Screen readers and SEO crawlers rely on heading order.

**Prevention strategy:**
- One `<h1>` per page (the page title/hero headline)
- Headings descend logically: h1 → h2 → h3
- Use Tailwind classes for visual sizing, not heading levels for appearance
- Run axe accessibility checker on each page

**Phase mapping:** Enforce during every page build. Audit during accessibility phase.

---

### 11. Gallery Filter Causing Full Component Re-render

**The mistake:** Filtering gallery items causes all images to unmount and remount, losing scroll position and causing visual flicker.

**Prevention strategy:**
- Use CSS `display: none` / Framer Motion `AnimatePresence` to show/hide items
- Key gallery items by their ID, not array index
- Use `layout` prop on Framer Motion for smooth reflow animation
- Memoize filtered results with `useMemo`

**Phase mapping:** Gallery page build phase.

---

### 12. Material Calculator With Unvalidated Inputs

**The mistake:** Calculator accepts negative numbers, zero values, or absurdly large inputs and shows nonsensical results.

**Prevention strategy:**
- Input validation: min 0, max reasonable limits (e.g., 1000 ft)
- Show inline validation messages
- Handle edge cases (zero depth, empty fields)
- Round results to 2 decimal places
- Show "Contact us for large orders" above a threshold

**Phase mapping:** Products page build phase.

---

## Minor Pitfalls

### 13. Page Transitions Causing Scroll Position Issues

**The mistake:** `AnimatePresence` page transitions leave the user scrolled mid-page on navigation.

**Prevention strategy:**
- Reset scroll to top on route change
- Use `onExitComplete` callback to scroll after exit animation
- Test navigation from bottom of long pages

**Phase mapping:** Page transitions implementation (polish phase).

---

### 14. `aria-label` Missing on Icon-Only Buttons

**The mistake:** Social media icons, hamburger menu, close buttons, and arrow buttons have no text labels for screen readers.

**Prevention strategy:**
- Every button without visible text gets `aria-label`
- Hamburger: `aria-label="Open menu"` / `aria-label="Close menu"`
- Social: `aria-label="Visit us on Facebook"`
- Back to top: `aria-label="Back to top"`

**Phase mapping:** Enforce during component builds. Audit during accessibility phase.

---

### 15. Color Contrast Failures on Decorative Overlays

**The mistake:** Text on image placeholders or gradient overlays doesn't meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).

**Prevention strategy:**
- Cream text (#f5f0e8) on forest green (#1a3a2a) = 8.5:1 ratio ✓
- Terracotta (#c4703f) on cream (#f5f0e8) = 3.2:1 — only for large text/buttons
- Always add a dark overlay on image backgrounds before placing text
- Test with browser DevTools contrast checker

**Phase mapping:** Design system setup (Phase 1) and every page build.

---

### 16. Missing robots.txt and sitemap.xml Before Launch

**The mistake:** Forgetting to add `robots.txt` and `sitemap.xml` means search engines may not properly index the site.

**Prevention strategy:**
- Add `app/robots.ts` that exports a robots config
- Add `app/sitemap.ts` that generates sitemap from route list
- Verify both are accessible at `/robots.txt` and `/sitemap.xml` after deploy
- Submit sitemap to Google Search Console after launch

**Phase mapping:** SEO/performance polish phase (final phase).

---

## Summary: Phase-Mapped Prevention Checklist

| Phase | Pitfalls to Address |
|-------|-------------------|
| Foundation / Setup | #2 Client boundaries, #5 Tailwind v4 config, #9 next/font, #15 Color contrast system |
| Layout Chrome (Nav/Footer) | #14 aria-labels on icon buttons, #10 Heading hierarchy |
| Home Page | #1 Framer Motion bundle, #3 Hero LCP, #7 Parallax layout thrash |
| Gallery | #11 Filter re-render, #4 Image sizes |
| Products | #12 Calculator validation |
| Contact | #8 Form rate limiting |
| SEO/Polish | #6 Per-page metadata, #13 Page transitions scroll, #16 robots/sitemap |
