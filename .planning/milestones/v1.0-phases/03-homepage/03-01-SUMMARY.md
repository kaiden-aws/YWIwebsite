---
phase: 03-homepage
plan: 01
subsystem: ui
tags: [hero, parallax, motion, useScroll, useTransform, data-files, server-component, scroll-indicator]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Tailwind @theme tokens, LazyMotion provider, GrainOverlay, ImagePlaceholder, cn utility"
  - phase: 02-layout-chrome
    provides: "Root layout with Header/Footer/PageTransitionWrapper, navigation data module"
provides:
  - "Full-viewport hero section with parallax background and grain overlay"
  - "HeroParallax client component with useScroll/useTransform and reduced-motion support"
  - "ScrollIndicator server component with CSS bounce animation"
  - "HeroSection server component composing hero content with headline and CTAs"
  - "4 typed static data files: services (3), products (7), testimonials (3), projects (6)"
affects: [03-homepage, 04-about-page, 05-services-products, 06-gallery-contact]

# Tech tracking
tech-stack:
  added: []
  patterns: [parallax with useScroll+useTransform on m.div, reduced-motion accessibility check, static typed data modules]

key-files:
  created:
    - src/components/sections/HeroParallax.tsx
    - src/components/sections/HeroSection.tsx
    - src/components/sections/ScrollIndicator.tsx
    - src/lib/data/services.ts
    - src/lib/data/products.ts
    - src/lib/data/testimonials.ts
    - src/lib/data/projects.ts
  modified:
    - src/app/page.tsx

key-decisions:
  - "HeroParallax uses useReducedMotion to disable parallax for accessibility"
  - "ScrollIndicator is a Server Component using CSS animate-bounce (no client JS)"
  - "page.tsx replaced demo content with hero and comment placeholders for Plans 02/03"

patterns-established:
  - "Parallax pattern: useScroll({target, offset}) + useTransform for background Y translation on m.div"
  - "Static data module pattern: typed interface + named export array in lib/data/"
  - "Section component pattern: server component shell importing thin client leaves"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04]

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 3 Plan 1: Hero Section & Data Files Summary

**Full-viewport parallax hero with grain overlay, serif headline, dual CTAs, bouncing scroll indicator, plus 4 typed data files for services, products, testimonials, and projects**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-19T01:46:42Z
- **Completed:** 2026-02-19T01:48:18Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Full-viewport hero with parallax background using useScroll + useTransform from motion/react
- "Crafting Outdoor Spaces That Inspire" headline in DM Serif Display with Fergus Ontario subline
- Two CTA buttons: terracotta "Get a Free Quote" (/contact) and outlined "View Our Work" (/gallery)
- Bouncing scroll indicator using CSS animate-bounce (zero client JS)
- 4 typed data files providing content for all subsequent homepage sections (19 total entries)
- Accessibility: useReducedMotion disables parallax movement when user prefers reduced motion

## Task Commits

Each task was committed atomically:

1. **Task 1: Create static data files for services, products, testimonials, and projects** - `c4a353e` (feat)
2. **Task 2: Build HeroParallax, ScrollIndicator, HeroSection, and wire into page.tsx** - `57147ca` (feat)

## Files Created/Modified
- `src/lib/data/services.ts` - 3 service entries (Residential, Commercial, Municipal) with Service interface
- `src/lib/data/products.ts` - 7 product categories with Product interface
- `src/lib/data/testimonials.ts` - 3 placeholder testimonials with 5-star ratings and Testimonial interface
- `src/lib/data/projects.ts` - 6 showcase projects across 4 categories with Project interface
- `src/components/sections/HeroParallax.tsx` - Client component: useScroll/useTransform parallax with reduced-motion support
- `src/components/sections/HeroSection.tsx` - Server component: hero composition with headline, CTAs, grain overlay, scroll indicator
- `src/components/sections/ScrollIndicator.tsx` - Server component: bouncing chevron-down at hero bottom
- `src/app/page.tsx` - Replaced Phase 1 demo page with hero section and placeholder comments for Plans 02/03

## Decisions Made
- HeroParallax uses useReducedMotion() from motion/react to completely disable parallax when user prefers reduced motion (accessibility-first approach)
- ScrollIndicator is a pure Server Component using Tailwind's animate-bounce CSS class rather than Motion JS (lighter, no hydration needed)
- page.tsx demo content fully replaced (not preserved) since Phase 1 design system test served its purpose and is no longer needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Hero section renders full-viewport with parallax, grain, headline, CTAs, and scroll indicator
- 4 data files ready for import by Plans 02 (ServicesPreview, AboutTeaser, ProductsBanner) and 03 (ProjectShowcase, TestimonialCarousel, CTABanner)
- src/components/sections/ directory established for all subsequent section components
- page.tsx has comment placeholders marking exact insertion points for Plans 02 and 03

## Self-Check: PASSED

All 8 files verified on disk. Both task commits (c4a353e, 57147ca) verified in git log.

---
*Phase: 03-homepage*
*Completed: 2026-02-19*
