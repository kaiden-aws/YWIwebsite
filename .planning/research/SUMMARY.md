# Project Research Summary

**Project:** Yard Weasels Inc. (YWI) Marketing Website
**Domain:** Premium landscaping / outdoor contractor marketing website (Fergus, Ontario)
**Researched:** 2026-02-18
**Confidence:** HIGH

## Executive Summary

Yard Weasels Inc. needs a premium multi-page marketing website that converts local search traffic into qualified landscaping leads. The expert approach for this type of site is a statically-rendered Next.js App Router application with surgical client-side islands — the goal is maximum Core Web Vitals performance (which directly affects local SEO ranking) combined with agency-quality visual design. The entire site is static at build time: no database, no CMS, no backend — all content lives as TypeScript constants. This architecture delivers excellent SEO, near-instant page loads, and is deployable to Vercel in minutes.

The recommended approach is Next.js 15+ (not the specified 14, which is 2.5 years old), Tailwind CSS v4 with CSS-based configuration, and Framer Motion for scroll animations. All pages are Server Components by default; only four interactive components require client-side JS: the Material Calculator, Gallery with lightbox, Testimonial Carousel, and Contact Form. This "surgical island" pattern keeps the client bundle minimal while delivering a polished, animated experience. The build order matters: CSS design tokens and static data structures must come first, then shared layout chrome (Nav, Footer), then the Homepage which establishes the visual language for all other pages.

The primary risks are technical rather than strategic. Tailwind v4 has breaking changes from v3 (CSS-based config, different PostCSS plugin) and the ecosystem is full of stale v3 tutorials. Framer Motion can balloon the client JS bundle if not configured carefully with LazyMotion. Hero images must have `priority={true}` set or LCP scores tank on mobile. And client boundary creep — adding `'use client'` at page level to fix one interactive element — can silently destroy SSR benefits that are critical for local SEO. All of these are well-understood and preventable if addressed during the foundation phase.

---

## Key Findings

### Recommended Stack

The stack is well-suited to the brief. Next.js with App Router is the natural choice for a multi-page static marketing site that needs SSR for SEO. The project brief specifies Next.js 14, but 14 is approximately 2.5 years old — the current stable release is 16.x. Upgrading to 15+ carries low migration risk (official codemod exists) and is strongly recommended because it pairs with React 19, enables Turbopack as the default dev bundler, and requires Node.js 20.9+ as the minimum runtime.

Tailwind v4 is a significant departure from v3: configuration is now CSS-based via an `@theme` block in `globals.css`, the PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`), and the import is `@import 'tailwindcss'` (not the old `@tailwind` directives). This is correct for the project but requires care given that nearly all community tutorials target v3.

**Core technologies:**
- **Next.js 15+ (App Router):** Framework — SSR, image optimization, metadata API, Vercel-native deployment
- **React 19:** UI runtime — Server Components, bundled with Next.js 15+
- **TypeScript 5.1+:** Type safety — required for async Server Components; built into create-next-app
- **Tailwind CSS v4:** Styling — CSS-based config; `@tailwindcss/postcss` for Next.js integration
- **Framer Motion 11+:** Animations — scroll-triggered reveals, page transitions, carousel; requires `'use client'`
- **next/font:** Typography — self-hosts Google Fonts, zero CLS, no render-blocking requests
- **Vercel:** Deployment — zero-config Next.js, Edge CDN, automatic image optimization, preview deploys
- **clsx + tailwind-merge:** Class utilities — conditional and conflict-free class composition
- **react-hook-form:** Contact form validation — UI-only for v1

### Expected Features

The site needs 16 table stakes features that users expect from any professional contractor site, plus a targeted set of differentiators that justify the premium visual treatment. The most important differentiator unique to this project is the Material Calculator on the Products page — no other local landscaping site offers this, and it directly serves the retail materials yard use case. The Gallery with filter and lightbox is the second most critical interactive feature.

**Must have (table stakes):**
- Sticky header with prominent phone number — primary conversion action for landscaping customers
- Hero with clear value proposition — who, what, where above the fold
- Services list with descriptions — users confirm scope in seconds
- Project photo gallery — visual proof of quality; landscaping is a visual purchase decision
- Contact form (UI-only) — lead capture outside business hours
- Business hours and both location addresses — retail yard customers plan trips
- Testimonials (3-6 named quotes) — social proof for high-trust, high-cost services
- Service area statement — "Do you serve my area?" is a top-3 user question
- Clear CTAs at every scroll depth — "Get a Free Quote" or "Request an Estimate"
- Mobile-responsive layout — >60% of local search traffic is mobile
- Semantic HTML and per-page meta tags — local SEO fundamentals
- About / company story — establishes trust; "who am I hiring?"

**Should have (competitive differentiators):**
- Material Calculator (Products page) — unique utility; removes friction for material buyers; standout differentiator
- Filterable gallery with lightbox — lets prospects self-sort to project type
- Cinematic scroll animations via Framer Motion — communicates craftsmanship before content is read
- Full-viewport hero with parallax and grain texture overlay — agency quality without video payload
- Editorial typography (DM Serif Display + Plus Jakarta Sans) — elevated feel most local landscapers never achieve
- Smooth page transitions via AnimatePresence — reinforces premium feel
- Dual-location showcase — retail materials yard is a real differentiator
- Backflow preventor licensing callout — legally required in Ontario; differentiates from unlicensed competitors
- Municipal/commercial portfolio callout — elevates perceived scale

**Defer to v2+:**
- Blog / news section — only if owner commits to content cadence; empty blog hurts more than it helps
- Backend form submission — UI-only is the explicit brief; wire up later
- CMS / admin panel — static content works for v1; significant complexity not warranted
- Online booking — landscaping quotes require site visits; not appropriate for this service model
- Cookie consent / GDPR — no tracking cookies planned; add only if analytics introduced

### Architecture Approach

The architecture is a flat App Router layout with a shared root layout, per-page Server Components, and four surgical client islands for interactive elements. No route groups are needed for a 6-page marketing site. All site content lives as typed TypeScript arrays in `lib/data/` — no database, no API calls, no CMS. Data flows from static arrays into Server page components as imports, then down to client interactive components as props. The `AnimatedSection` wrapper pattern (a thin `'use client'` component that accepts server-rendered children) is the key technique that enables scroll animations without sacrificing SSR benefits.

**Major components:**
1. **app/layout.tsx (Server)** — root HTML shell, font loading, Nav and Footer mount, global providers
2. **Nav.tsx + NavClient.tsx (Server + Client island)** — Nav shell is server-rendered; NavClient owns scroll state and mobile drawer
3. **Footer.tsx (Server)** — static multi-column footer with both addresses, hours, phone, social links
4. **AnimatedSection.tsx (Client wrapper)** — Framer Motion `whileInView` wrapper; accepts server-rendered children; scroll animations without SSR loss
5. **MaterialCalculator.tsx (Client island)** — quantity + material selection, coverage calculation, result display; imports from lib/data/products.ts
6. **GalleryGrid.tsx + GalleryLightbox.tsx (Client islands)** — filter state, filtered item list, portal-based lightbox
7. **TestimonialCarousel.tsx (Client island)** — slide state, keyboard nav, auto-advance; data passed as props from server parent
8. **ContactForm.tsx (Client island)** — form state, validation, submit stub; self-contained
9. **lib/data/*.ts (Static)** — services, products, testimonials, gallery items; single source of truth for all content
10. **lib/utils/metadata.ts (Server)** — shared metadata builder for per-page Open Graph and title tags

### Critical Pitfalls

1. **Client boundary creep ('use client' propagating up)** — Adding `'use client'` at page or section level destroys SSR benefits critical for local SEO. Enforce: all `page.tsx` files are Server Components with no exceptions; interactive features are leaf-level Client Components only; never add `'use client'` to fix an import error.

2. **Tailwind v4 config using v3 syntax** — The ecosystem is full of v3 tutorials. Using `tailwind.config.js`, `@tailwind` directives, or the v3 PostCSS plugin silently breaks styles. Must use CSS-based config via `@theme` block, `@tailwindcss/postcss` plugin, and `@import 'tailwindcss'`. Must be correct in Phase 1 — wrong config breaks everything downstream.

3. **Hero image lazy loading tanks LCP** — `next/image` defaults to `loading="lazy"`. The hero image must have `priority={true}` or LCP scores are 2-3 seconds worse on mobile. Also requires explicit `sizes` prop or mobile browsers download full-resolution images unnecessarily.

4. **Framer Motion client bundle bloat** — Importing framer-motion normally ships 30-40KB to every page. Use `LazyMotion` with `domAnimation` at root layout level. Use `next/dynamic` with `{ ssr: false }` for heavy components (carousel, lightbox). Establish in Phase 1 before any animation work begins.

5. **SEO metadata not configured per-page** — Only root layout metadata means all pages share the same title. Every `page.tsx` must export its own `metadata` object with location keywords ("Fergus, Ontario", "Centre Wellington") and service-specific copy. Add `sitemap.ts` and `robots.ts` before launch.

---

## Implications for Roadmap

Based on combined research, the architecture's explicit build order dependency graph maps cleanly to a 5-phase roadmap. Each phase delivers something verifiable before the next begins.

### Phase 1: Foundation and Project Setup

**Rationale:** CSS design tokens, data structures, and utility functions are dependencies for every subsequent phase. Getting Tailwind v4 config wrong here breaks everything downstream. Framer Motion bundle strategy must be established before any animation work begins.

**Delivers:** Working Next.js app with correct Tailwind v4 setup, all brand CSS tokens, font loading, static data files, className utilities, and AnimatedSection wrapper. Visual smoke test: the app renders with correct colors and typography.

**Addresses:** Design system foundation, color palette, editorial typography pairing

**Avoids:** Pitfall #5 (Tailwind v4 v3 syntax), Pitfall #9 (Google Fonts via link tag), Pitfall #1 (Framer Motion bundle — LazyMotion established here), Pitfall #15 (color contrast system established here), Pitfall #2 (client boundary rules established here)

**Research flag:** Standard patterns — skip research-phase. Next.js and Tailwind v4 setup is well-documented in official sources.

### Phase 2: Layout Chrome (Nav and Footer)

**Rationale:** Nav and Footer appear on every page. They must be built and verified before any page content so all subsequent pages can render with full chrome. This phase also validates the mobile hamburger drawer and sticky scroll behavior.

**Delivers:** Sticky nav with phone number, desktop links, mobile hamburger drawer with scroll-blur effect; full-width multi-column footer with both addresses, hours, social icons. Passes mobile-responsive test.

**Addresses:** Table stakes — phone number always visible, navigable structure, footer with contact info

**Avoids:** Pitfall #14 (aria-labels on icon-only buttons — hamburger, close), Pitfall #10 (heading hierarchy — nav should not use heading elements), Pitfall #2 (NavClient is the correct scope for client code)

**Research flag:** Standard patterns — skip research-phase. Server + Client island nav pattern is well-documented.

### Phase 3: Shared UI Primitives

**Rationale:** Reusable components (ImagePlaceholder, SectionHeader, ServiceCard) are used across multiple pages. Building them before pages eliminates duplication and ensures visual consistency from the first page onwards.

**Delivers:** ImagePlaceholder (swap-ready colored boxes with labels), SectionHeader (display serif + eyebrow text), ServiceCard (icon + title + description). All components follow the design system established in Phase 1.

**Addresses:** Placeholder system (enables building all pages before real photos arrive), service card display

**Avoids:** Pitfall #15 (contrast checked in component build), Pitfall #10 (semantic markup in reusable components)

**Research flag:** Standard patterns — skip research-phase.

### Phase 4: Homepage

**Rationale:** The homepage is the most complex page, has the most sections, and sets the visual and animation language for all other pages. Building it fourth (after all foundations are in place) means every decision made here can be referenced when building secondary pages. The homepage is also the core conversion path — Hero → Services Preview → Project Showcase → Testimonials → CTA.

**Delivers:** Full homepage: Hero (parallax, oversized serif headline, grain overlay, single CTA), Services Preview (card grid teaser), About Teaser, Products Banner, Project Showcase (residential/commercial/municipal category grid), Testimonial Carousel, CTA Banner. Scroll animations on all sections. Demonstrates premium visual language.

**Addresses:** Hero with value proposition, services preview, social proof (testimonials), project category showcase, CTAs at every scroll depth, service area statement

**Avoids:** Pitfall #3 (hero image priority flag set), Pitfall #7 (parallax uses transform-only animations), Pitfall #1 (Framer Motion LazyMotion in use), Pitfall #2 (AnimatedSection wrapper pattern enforced)

**Research flag:** Standard patterns — skip research-phase. Well-documented marketing site patterns; animation approach is defined in architecture.

### Phase 5: Secondary Pages and Interactive Components

**Rationale:** All secondary pages share the same foundation, layout chrome, and UI primitives. They can be built in any order; the main complexity is in the three interactive components (Gallery, Material Calculator, Contact Form). Group them in a single phase since they are independent of each other.

**Delivers:**
- **About page** — company story, team, "Why Choose YWI" differentiator grid, backflow licensing callout
- **Services page** — full service descriptions, service area, licensed credentials
- **Products page** — product categories + Material Calculator (quantity → coverage → CTA); input validation
- **Gallery page** — masonry grid with filter tabs, GalleryLightbox portal
- **Contact page** — ContactForm with validation, two location addresses, hours, map placeholder

**Addresses:** All remaining table stakes (gallery, contact, services detail, about/trust, materials yard); all differentiators (calculator, filterable gallery, lightbox, dual-location showcase)

**Avoids:** Pitfall #11 (gallery filter uses CSS show/hide + AnimatePresence, not unmount/remount), Pitfall #12 (calculator input validation), Pitfall #8 (contact form honeypot + client rate limit), Pitfall #4 (image sizes prop on gallery images)

**Research flag:** Material Calculator needs careful implementation design during phase planning — input validation edge cases and coverage formula per material type. Gallery lightbox keyboard accessibility (ESC, arrow keys, focus trap) follows established patterns but requires attention.

### Phase 6: SEO, Accessibility Audit, and Polish

**Rationale:** SEO metadata and polish cannot be done incrementally across phases without it becoming a cleanup task. Consolidate all SEO metadata exports, sitemap, robots.txt, page transition animations, accessibility audit, and performance verification into a final phase after all pages exist.

**Delivers:** Per-page metadata exports with location keywords, sitemap.ts, robots.ts, smooth page transitions via AnimatePresence in layout, BackToTop component, accessibility audit (contrast, aria-labels, heading hierarchy), Lighthouse performance run.

**Addresses:** Local SEO (title/description/OG per page), Core Web Vitals validation, WCAG AA compliance, sitemap submission readiness

**Avoids:** Pitfall #6 (per-page metadata — final audit), Pitfall #13 (page transition scroll reset), Pitfall #16 (robots.txt + sitemap before launch), Pitfall #14 (aria-label audit), Pitfall #10 (heading hierarchy audit)

**Research flag:** Standard patterns — skip research-phase. All SEO and accessibility approaches are well-documented.

---

### Phase Ordering Rationale

- **Foundation before chrome before pages** is the explicit dependency order from ARCHITECTURE.md's build graph. Violating this means rebuilding primitives once the design system changes.
- **Homepage before secondary pages** because the homepage is the most complex and visual-language-setting page. Decisions made there propagate everywhere else.
- **Secondary pages in a single phase** because they are independent of each other once the foundation is solid, and grouping avoids artificial phase boundaries.
- **SEO and polish last** because metadata requires all pages to exist and performance testing requires all content to be in place.
- **No CMS phase** because all content is static TypeScript. This is an anti-feature by deliberate research decision — the brief does not require it and it adds significant complexity.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5 (Material Calculator):** Coverage formula per material type (mulch, topsoil, gravel, etc.) needs defined data structure and sensible defaults. Input validation edge cases and "large order" threshold need explicit values.
- **Phase 5 (Gallery Lightbox):** Keyboard accessibility pattern (focus trap, ESC close, arrow nav) is established but needs careful implementation to be WCAG AA compliant.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js 15 + Tailwind v4 setup is fully documented in official sources verified Feb 2026.
- **Phase 2 (Nav/Footer):** Server + Client island nav pattern is canonical App Router architecture.
- **Phase 3 (UI Primitives):** Straightforward component authoring; no complex patterns.
- **Phase 4 (Homepage):** Marketing homepage patterns are extensively documented; animation approach is defined in architecture research.
- **Phase 6 (SEO/Polish):** Next.js metadata API, sitemap.ts, and accessibility audit patterns are well-established.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Next.js and Tailwind v4 verified against official docs Feb 2026. Framer Motion rebranding and v11 confirmed. Node.js runtime requirement verified. |
| Features | MEDIUM-HIGH | Table stakes features are well-established patterns for contractor sites. Differentiators are trend-dependent but well-reasoned for this market and price point. |
| Architecture | HIGH | App Router patterns verified against official Next.js docs. Server/Client island boundary approach is canonical. Framer Motion patterns MEDIUM (training knowledge, not doc-verified). |
| Pitfalls | HIGH for Next.js | Next.js-specific pitfalls verified against official docs. Tailwind v4 and Framer Motion specifics are MEDIUM (based on training knowledge of breaking changes). |

**Overall confidence:** HIGH

### Gaps to Address

- **Material Calculator data model:** The coverage formulas per material type (cubic feet/yard per product category) need to be defined before Phase 5 can be spec'd. This is content/business knowledge, not a technical gap. Resolve with client input during phase planning.
- **Real photo availability:** The entire visual strategy depends on high-quality project photography. Placeholder system is designed for swap-readiness, but the launch timeline should account for photo delivery. If photos are unavailable at launch, the gallery page will be visually weak.
- **Form backend future state:** UI-only contact form is fine for v1, but the form component should be built with a clear hook point for adding server action or API route later. This is noted in architecture but not designed in detail.
- **Framer Motion exact version:** Framer Motion rebranded to `motion` package. Both `framer-motion` and `motion` import paths work, but the exact latest patch version should be verified at install time. The `LazyMotion` pattern works in both.
- **Next.js 14 vs 15+ decision:** If the team has a hard constraint on Next.js 14 (CI pinning, existing infra), several features are unavailable (React 19, Turbopack default). The codemod path is low-risk, but the decision needs explicit confirmation before the foundation phase.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (verified 2026-02-16) — App Router patterns, metadata API, next/font, next/image, sitemap.ts, robots.ts, Tailwind v4 PostCSS setup
- Tailwind CSS official docs (verified 2026-02-16) — v4 configuration, @theme block, PostCSS adapter, Next.js integration

### Secondary (MEDIUM confidence)
- Framer Motion documentation — LazyMotion, domAnimation bundle, AnimatePresence, whileInView patterns
- Next.js Bundle Analyzer — bundle audit approach
- Web.dev Core Web Vitals documentation — LCP, CLS, TTI guidance
- WCAG 2.1 AA contrast requirements — color contrast ratios verified for brand palette

### Tertiary (MEDIUM — domain knowledge)
- Landscaping and contractor website UX conventions — table stakes features, anti-features, conversion patterns
- Local business marketing website patterns — premium positioning signals, typography pairings, visual identity conventions

---

*Research completed: 2026-02-18*
*Ready for roadmap: yes*
