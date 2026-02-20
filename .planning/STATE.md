# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-18)

**Core value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.
**Current focus:** Phase 10 complete — Accessibility and Responsiveness. All plans complete. Project finished.

## Current Position

Phase: 10 of 10 (Accessibility and Responsiveness)
Plan: 2 of 2 in current phase
Status: Complete
Last activity: 2026-02-20 — Completed 10-02-PLAN.md (Reduced motion, touch targets, mobile polish)

Progress: [████████████████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 23
- Average duration: 2 min
- Total execution time: 0.75 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3 | 8 min | 3 min |
| 02-layout-chrome | 2 | 4 min | 2 min |
| 03-homepage | 3 | 6 min | 2 min |
| 04-about-page | 2 | 3 min | 2 min |
| 05-services-page | 2 | 3 min | 2 min |
| 06-products-page | 2 | 4 min | 2 min |
| 07-gallery-page | 2 | 4 min | 2 min |
| 07.1-integration-fixes | 1 | 1 min | 1 min |
| 08-contact-page | 2 | 2 min | 1 min |
| 09-seo-and-performance | 2 | 6 min | 3 min |
| 10-accessibility-responsiveness | 2 | 5 min | 3 min |

**Recent Trend:**
- Last 5 plans: 08-02 (1 min), 09-01 (2 min), 09-02 (4 min), 10-01 (2 min), 10-02 (3 min)
- Trend: stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Research]: Upgrade to Next.js 15+ recommended over specified 14 (low migration risk, React 19, Turbopack)
- [Research]: Tailwind v4 requires CSS-based `@theme` config — must be correct in Phase 1 or everything breaks downstream
- [Research]: Use LazyMotion + domAnimation at root layout level to prevent Framer Motion bundle bloat
- [Research]: All page.tsx files must be Server Components — `'use client'` only at leaf interactive components
- [01-01]: Used src/ directory structure for cleaner separation (create-next-app default is root app/)
- [01-01]: Kept Tailwind default --spacing 0.25rem (4px base) — generous whitespace by convention not base override
- [01-01]: All design tokens exclusively in CSS @theme block (no v3 tailwind.config.js)
- [01-02]: Import m from motion/react (not motion/react-m) for TypeScript compatibility with m.div pattern
- [01-02]: Font CSS variables on html element (not body) so @theme var() references resolve correctly
- [01-02]: LazyMotion strict mode to catch accidental full-bundle motion imports at runtime
- [01-03]: All Phase 1 success criteria confirmed by owner visual inspection — no issues found
- [01-03]: Phase 1 complete — approved to proceed to Phase 2 (Layout Chrome)
- [02-01]: Header integrated into root layout.tsx so it appears on all pages automatically
- [02-01]: Used office address 8146 Sideroad 15 from PROJECT.md (not research file alternate)
- [02-02]: Footer is a pure Server Component with inline SVGs instead of lucide-react (zero client JS)
- [02-02]: FrozenRouter pattern uses Next.js internal LayoutRouterContext for exit animations
- [02-02]: Root layout owns the single `<main>` element — all page components use `<div>` to avoid nesting
- [03-01]: HeroParallax uses useReducedMotion to disable parallax for accessibility
- [03-01]: ScrollIndicator is a Server Component using CSS animate-bounce (no client JS)
- [03-01]: page.tsx replaced demo content with hero and comment placeholders for Plans 02/03
- [03-02]: All three section components are Server Components — AnimatedSection handles client-side animation as a child boundary
- [03-02]: Products banner uses GrainOverlay for consistent dark-section texture treatment
- [03-03]: TestimonialCarousel receives data via props from server page.tsx — keeps data server-side
- [03-03]: Only HeroParallax and TestimonialCarousel use 'use client' in sections/ — minimal client JS
- [04-01]: Interior page hero uses simple banner (py-32 md:py-40) not parallax — preserves homepage uniqueness
- [04-01]: All about section components are Server Components — zero new 'use client' boundaries
- [04-01]: Data file includes all Plan 02 data (teamMembers, differentiators) upfront for single-source-of-truth
- [04-02]: TeamSection uses cream default bg (no bg class) for alternation rhythm with white ValuesGrid above and forest WhyChooseUs below
- [04-02]: WhyChooseUs uses CheckCircle from lucide-react with terracotta accent for contrast on forest background
- [05-01]: Featured flag pattern on services.ts to filter homepage (3 featured) vs services page (all 6)
- [05-01]: Renamed residential-landscaping to residential-maintenance per requirements
- [05-01]: Services array order matches display order: Design & Build first, Snow Removal last
- [05-02]: Service cards are non-clickable containers -- only Get a Quote button links to /contact
- [05-02]: Used service.details (long description) for services page, not service.description (short homepage version)
- [05-02]: ServicesContact uses forest background to bookend with ServicesHero for visual closure
- [06-01]: CSS-only hover overlay: md:opacity-0 md:group-hover:opacity-100 keeps 'Contact for Pricing' always visible on mobile for touch accessibility
- [06-01]: Added subtitle to ProductCategoryGrid for additional context about pickup/delivery availability
- [06-02]: Inputs stored as strings to avoid NaN/0 display issues when user clears fields -- parsed to float only during validation/calculation
- [06-02]: Only MaterialCalculator uses 'use client' -- RetailYardCallout remains Server Component for zero client JS overhead
- [07-01]: CSS Grid with auto-rows and row-span-2 for featured items creates masonry-like visual variety without JS layout libraries
- [07-01]: AnimatePresence mode=sync for simultaneous enter/exit during filter changes -- snappiest feel
- [07-01]: layout={false} explicitly set on m.div to prevent silent failures with domAnimation feature set
- [07-01]: Lightbox state wired in GalleryGrid but component deferred to Plan 02
- [07-02]: GalleryLightbox omits 'use client' -- imported only by client component GalleryGrid
- [07-02]: Circular navigation via modular arithmetic in useCallback handlers
- [07-02]: Lightbox navigates within filtered array, not full projects array -- prev/next respects active filter
- [07.1-01]: GalleryLightbox now has explicit 'use client' -- no longer relying on parent client boundary
- [07.1-01]: Footer imports services from canonical services.ts -- no more hardcoded label drift
- [07.1-01]: ProductsBanner uses Link (not button+router.push) for /products CTA -- stays Server Component
- [08-01]: Used terracotta accent for info panel icons to match project-wide icon color convention
- [08-01]: Map placeholder uses sage/20 bg with MapPin icon and address text -- clearly reads as future map area
- [08-02]: ContactForm follows MaterialCalculator useState pattern for consistency across project forms
- [08-02]: Success state uses min-h-[400px] to prevent layout shift when form is replaced
- [09-01]: Used title.absolute for homepage to avoid double branding from template pattern
- [09-01]: Spread sharedOpenGraph in every page to prevent OG shallow merge losing siteName/locale
- [09-01]: Used VERCEL_PROJECT_PRODUCTION_URL env var with yardweasels.ca fallback for siteConfig.url
- [09-02]: Used Next.js MetadataRoute types for type-safe sitemap and robots generation
- [09-02]: Added data-priority attribute to ImagePlaceholder for migration tracking without runtime impact
- [09-02]: Documented sizes patterns per component context (hero 100vw, grid 33vw) in migration guide JSDoc
- [10-01]: terracotta-dark (#9d5428) gives 4.96:1 on cream and 5.6:1 on white -- meets WCAG AA for normal text
- [10-01]: CTABanner subtitle uses font-semibold to qualify as bold large text (3:1 WCAG threshold) rather than changing color
- [10-01]: focus-visible with full-opacity forest ring replaces focus:ring-forest/30 for stronger keyboard indication
- [10-01]: A11Y-02 confirmed already satisfied -- all icon-only buttons have aria-labels in existing codebase
- [10-01]: outline (not box-shadow) used for global focus indicator because outline is preserved in Windows High Contrast Mode
- [10-02]: motion-reduce Tailwind variant used alongside globals.css @media rule for defense-in-depth on animate-bounce
- [10-02]: Carousel dot buttons use 44px flex wrapper with inner visual span to expand hit area without changing dot appearance
- [10-02]: Lightbox prev/next use left-2/right-2 on mobile with translate-x-0 to stay inside viewport at 375px
- [10-02]: Footer social icons use inline-flex min-w/min-h 44px pattern keeping icon visually at 20px

### Pending Todos

None yet.

### Blockers/Concerns

- [Pre-Phase 1]: RESOLVED — Used Next.js 16.1.6 (latest stable) via create-next-app@latest
- [Pre-Phase 6]: Material Calculator coverage formula per material type needs values defined before Phase 6 planning
- [Pre-launch]: Real project photos from owner needed to replace placeholders before site goes live

## Session Continuity

Last session: 2026-02-20
Stopped at: Completed 10-02-PLAN.md (Reduced motion, touch targets, mobile polish) -- All phases complete
Resume file: None
