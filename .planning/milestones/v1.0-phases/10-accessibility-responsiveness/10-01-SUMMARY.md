---
phase: 10-accessibility-responsiveness
plan: 01
subsystem: ui
tags: [accessibility, wcag-aa, focus-visible, reduced-motion, aria, contrast, tailwind]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: CSS @theme tokens, MotionProvider with LazyMotion
  - phase: 03-homepage
    provides: TestimonialCarousel, CTABanner, ServicesPreview, AboutTeaser, ProjectShowcase
  - phase: 07-gallery-page
    provides: GalleryLightbox with role="dialog" and aria-modal
  - phase: 08-contact-page
    provides: ContactForm with validation and error states
  - phase: 06-products-page
    provides: MaterialCalculator with validation and error states
provides:
  - Global focus-visible keyboard outline (terracotta) on all interactive elements
  - --color-terracotta-dark (#9d5428) token for WCAG AA contrast on cream/white
  - MotionConfig reducedMotion="user" wrapping entire app
  - prefers-reduced-motion CSS for scroll-behavior and CSS animations
  - WCAG AA color contrast compliance across all components
  - focus-visible form input rings (keyboard-only, full opacity)
  - Lightbox backdrop aria-hidden for screen reader isolation
affects: [10-02-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns: [focus-visible over focus for keyboard-only indicators, terracotta-dark for small text on cream, charcoal/70 for secondary text, red-700 for error text on cream]

key-files:
  created: []
  modified:
    - src/app/globals.css
    - src/providers/MotionProvider.tsx
    - src/components/sections/CTABanner.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/sections/AboutTeaser.tsx
    - src/components/sections/ProjectShowcase.tsx
    - src/components/sections/contact/ContactForm.tsx
    - src/components/sections/products/MaterialCalculator.tsx
    - src/components/sections/TestimonialCarousel.tsx
    - src/components/sections/gallery/GalleryLightbox.tsx
    - src/components/sections/about/TeamSection.tsx
    - src/components/sections/about/ValuesGrid.tsx

key-decisions:
  - "terracotta-dark (#9d5428) gives 4.96:1 on cream and 5.6:1 on white -- meets WCAG AA for normal text"
  - "CTABanner subtitle uses font-semibold to qualify as bold large text (3:1 threshold) rather than changing color"
  - "focus-visible:ring with full-opacity forest color replaces focus:ring-forest/30 for stronger keyboard indication"
  - "charcoal/70 replaces charcoal/60 for all secondary text (5.12:1 vs 3.83:1 on cream)"
  - "red-700 replaces red-600/500 for all error text (5.8:1 on cream vs 4.26:1)"
  - "A11Y-02 confirmed satisfied by existing codebase -- all icon-only buttons already have aria-labels"

patterns-established:
  - "focus-visible pattern: use *:focus-visible global rule with outline (not box-shadow) for Windows High Contrast Mode"
  - "Contrast pattern: text-terracotta-dark for small accent text on cream/white, text-terracotta only on dark backgrounds or as large bold text"
  - "Error text pattern: text-red-700 for all form error messages on cream backgrounds"
  - "Secondary text pattern: text-charcoal/70 (not /60) for body text on cream/white backgrounds"

requirements-completed: [A11Y-01, A11Y-02, A11Y-03, A11Y-04]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 10 Plan 01: Accessibility Infrastructure Summary

**Global focus-visible outlines, WCAG AA contrast fixes across 10 components, MotionConfig reduced-motion provider, and lightbox ARIA polish**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T16:34:21Z
- **Completed:** 2026-02-20T16:36:48Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Global `*:focus-visible` outline rule with terracotta color provides visible keyboard navigation on every interactive element, with `:focus:not(:focus-visible)` suppressing outlines on mouse click
- All normal-sized text across the site now meets WCAG AA 4.5:1 contrast ratio -- terracotta-dark for accent links, charcoal/70 for secondary text, red-700 for error messages
- MotionConfig `reducedMotion="user"` wraps entire app, automatically disabling transform animations for users who prefer reduced motion
- Form inputs use `focus-visible` instead of `focus` with full-opacity forest ring color for stronger keyboard indication
- Gallery lightbox backdrop has `aria-hidden="true"` to prevent screen readers from reading behind the dialog

## Task Commits

Each task was committed atomically:

1. **Task 1: Global focus-visible outline, terracotta-dark token, MotionConfig provider, and reduced-motion CSS** - `8c6bf5f` (feat)
2. **Task 2: Fix color contrast failures across all components and polish lightbox ARIA** - `c0f107d` (fix)

## Files Created/Modified

- `src/app/globals.css` - Added *:focus-visible outline, :focus:not(:focus-visible) suppression, --color-terracotta-dark token, prefers-reduced-motion media query
- `src/providers/MotionProvider.tsx` - Wrapped LazyMotion in MotionConfig reducedMotion="user"
- `src/components/sections/CTABanner.tsx` - Changed text-cream/80 to text-cream + font-semibold for WCAG bold large text threshold
- `src/components/sections/ServicesPreview.tsx` - Changed "Learn More" text-terracotta to text-terracotta-dark
- `src/components/sections/AboutTeaser.tsx` - Changed "Our Story" link to text-terracotta-dark with hover:text-terracotta
- `src/components/sections/ProjectShowcase.tsx` - Changed "View All Projects" link to text-terracotta-dark with hover:text-terracotta
- `src/components/sections/contact/ContactForm.tsx` - Changed red-600/500 to red-700, border-red-500 to border-red-700, focus to focus-visible
- `src/components/sections/products/MaterialCalculator.tsx` - Same red and focus fixes as ContactForm, plus text-charcoal/60 to /70 on result text
- `src/components/sections/TestimonialCarousel.tsx` - Changed author role text-charcoal/60 to text-charcoal/70
- `src/components/sections/gallery/GalleryLightbox.tsx` - Added aria-hidden="true" to backdrop div
- `src/components/sections/about/TeamSection.tsx` - Changed subtitle and role text-charcoal/60 to text-charcoal/70
- `src/components/sections/about/ValuesGrid.tsx` - Changed subtitle text-charcoal/60 to text-charcoal/70

## Decisions Made

- **terracotta-dark (#9d5428)** gives 4.96:1 on cream and 5.6:1 on white -- meets WCAG AA for normal text without being too dark
- **CTABanner subtitle** uses font-semibold rather than color change -- at 18px bold, it qualifies as "large text" per WCAG, needing only 3:1 (cream on terracotta is 3.23:1)
- **A11Y-02 confirmed already satisfied** -- audit of existing codebase shows all icon-only buttons (hamburger, close, social icons, back-to-top, lightbox arrows) already have aria-label attributes; no changes needed
- **focus-visible:ring with full-opacity** forest color replaces the previous focus:ring-forest/30 pattern for stronger, more visible keyboard indication
- **outline (not box-shadow)** used for global focus indicator because outline is preserved in Windows High Contrast Mode

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Accessibility infrastructure complete -- focus indicators, contrast compliance, reduced motion, and ARIA all in place
- Ready for Plan 02 (responsive breakpoints, mobile navigation polish, touch targets)
- All four A11Y requirements (A11Y-01 through A11Y-04) satisfied by this plan

## Self-Check: PASSED

All 12 modified files verified present on disk. Both task commits (8c6bf5f, c0f107d) verified in git log.

---
*Phase: 10-accessibility-responsiveness*
*Plan: 01*
*Completed: 2026-02-20*
