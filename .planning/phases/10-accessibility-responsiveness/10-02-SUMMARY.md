---
phase: 10-accessibility-responsiveness
plan: 02
subsystem: ui
tags: [accessibility, reduced-motion, touch-targets, responsive, mobile, tailwind, 375px]

# Dependency graph
requires:
  - phase: 10-accessibility-responsiveness
    plan: 01
    provides: MotionConfig reducedMotion="user", global focus-visible, prefers-reduced-motion CSS rule for animate-bounce
  - phase: 03-homepage
    provides: ScrollIndicator with animate-bounce, ServicesPreview with hover transforms, TestimonialCarousel with dot navigation
  - phase: 02-layout-chrome
    provides: HeaderClient with hamburger button, MobileDrawer with close button, Footer with social icons
  - phase: 07-gallery-page
    provides: GalleryLightbox with close/prev/next buttons, GalleryGrid with masonry grid
provides:
  - CSS reduced motion support for all non-Framer animations (bounce, hover transforms, smooth scroll)
  - 44px+ touch targets on all interactive elements for mobile accessibility
  - Lightbox prev/next buttons repositioned inside viewport at 375px
  - Footer social icons with adequate touch targets
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns: [motion-reduce Tailwind variant for CSS transform overrides, window.matchMedia for JS scroll behavior, min-w/min-h 44px flex wrapper for touch targets without visual change]

key-files:
  created: []
  modified:
    - src/components/sections/ScrollIndicator.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/layout/BackToTop.tsx
    - src/components/sections/TestimonialCarousel.tsx
    - src/components/layout/HeaderClient.tsx
    - src/components/layout/MobileDrawer.tsx
    - src/components/sections/gallery/GalleryLightbox.tsx
    - src/components/layout/Footer.tsx

key-decisions:
  - "motion-reduce Tailwind variant used alongside globals.css @media rule for defense-in-depth on animate-bounce"
  - "Carousel dot buttons use 44px flex wrapper with inner visual span to expand hit area without changing dot appearance"
  - "Lightbox prev/next use left-2/right-2 on mobile with translate-x-0 to stay inside viewport at 375px"
  - "Footer social icons use inline-flex min-w/min-h 44px pattern keeping icon visually at 20px"

patterns-established:
  - "Touch target pattern: min-w-[44px] min-h-[44px] flex wrapper around small visual indicator for accessible hit areas"
  - "Reduced motion pattern: motion-reduce:hover:translate-y-0 to neutralize hover transforms on reduced motion"
  - "JS scroll pattern: check window.matchMedia('(prefers-reduced-motion: reduce)').matches for behavior: auto vs smooth"
  - "Mobile lightbox pattern: responsive positioning (left-2 md:left-0, translate-x-0 md:-translate-x-14) for buttons that need to be reachable at 375px"

requirements-completed: [A11Y-05, RESP-01, RESP-02, RESP-03, RESP-04]

# Metrics
duration: 3min
completed: 2026-02-20
---

# Phase 10 Plan 02: Reduced Motion, Touch Targets, and Mobile Polish Summary

**CSS reduced motion support for bounce/hover/scroll animations, 44px+ touch targets on all interactive elements, and lightbox button repositioning for 375px mobile**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-20T16:39:41Z
- **Completed:** 2026-02-20T16:42:12Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- ScrollIndicator bounce, ServicesPreview hover transforms, and BackToTop smooth scroll all respect prefers-reduced-motion via Tailwind motion-reduce variant and JS matchMedia check
- All interactive elements (carousel dots, hamburger, drawer close, lightbox controls, footer social icons) meet 44px+ touch target minimum on mobile
- Gallery lightbox prev/next buttons repositioned inside viewport at 375px using responsive left-2/right-2 on mobile with full translate on desktop
- Gallery grid confirmed at grid-cols-2 on mobile and grid-cols-3 on desktop -- no changes needed

## Task Commits

Each task was committed atomically:

1. **Task 1: CSS reduced motion support for non-Framer animations** - `81b26b9` (feat)
2. **Task 2: Touch target expansion and mobile responsiveness polish** - `b0fdf0d` (feat)

## Files Created/Modified

- `src/components/sections/ScrollIndicator.tsx` - Added motion-reduce:animate-none to bounce element
- `src/components/sections/ServicesPreview.tsx` - Added motion-reduce:hover:translate-y-0 on card Link and motion-reduce:group-hover:translate-x-0 on arrow span
- `src/components/layout/BackToTop.tsx` - Added prefers-reduced-motion matchMedia check for instant vs smooth scroll
- `src/components/sections/TestimonialCarousel.tsx` - Restructured dot buttons with 44px flex wrapper around visual dot span
- `src/components/layout/HeaderClient.tsx` - Hamburger button p-2 to p-3, CTA button py-2 to py-2.5
- `src/components/layout/MobileDrawer.tsx` - Close button p-2 to p-3
- `src/components/sections/gallery/GalleryLightbox.tsx` - Close/prev/next buttons p-2 to p-3, prev/next repositioned with left-2/right-2 on mobile
- `src/components/layout/Footer.tsx` - Social icon links wrapped with inline-flex min-w/min-h 44px touch targets

## Decisions Made

- **motion-reduce defense-in-depth:** Used Tailwind motion-reduce:animate-none on ScrollIndicator alongside the globals.css @media rule from Plan 01, providing component-level and global-level reduced motion coverage
- **Dot button restructure:** Carousel dots use outer button with min-w/min-h 44px and inner span for visual dot -- expands hit area without changing the 12px visual dot size
- **Lightbox mobile positioning:** Prev/next buttons use left-2 md:left-0 and -translate-x-0 md:-translate-x-14 to stay inside viewport at 375px while maintaining desktop offset positioning
- **Footer social icons:** Used inline-flex with min-w/min-h 44px on the anchor tag itself rather than wrapping in a container -- simpler markup, same touch target result

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All accessibility and responsiveness requirements complete (A11Y-01 through A11Y-05, RESP-01 through RESP-04)
- Phase 10 is the final phase -- the entire project is now complete
- All 10 phases successfully executed with full WCAG AA compliance, responsive layouts, and reduced motion support

## Self-Check: PASSED

All 8 modified files verified present on disk. Both task commits (81b26b9, b0fdf0d) verified in git log.

---
*Phase: 10-accessibility-responsiveness*
*Plan: 02*
*Completed: 2026-02-20*
