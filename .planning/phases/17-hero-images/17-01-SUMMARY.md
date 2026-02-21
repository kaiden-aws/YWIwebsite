---
phase: 17-hero-images
plan: 01
subsystem: ui
tags: [next-image, hero, parallax, images, performance]

# Dependency graph
requires:
  - phase: 16-image-infrastructure
    provides: "public/images/heroes/ directory and image path convention"
provides:
  - "Home page hero rendered via next/image with fill mode and priority loading"
  - "Real 1920x1080 hero photograph at public/images/heroes/home-hero.jpg"
affects: [20-component-migration]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hero images use next/image fill mode with absolute-positioned parent for parallax"
    - "Hero images load with priority prop (eager loading, high fetchpriority)"

key-files:
  created:
    - public/images/heroes/home-hero.jpg
  modified:
    - src/components/sections/HeroParallax.tsx

key-decisions:
  - "Used sample photo from picsum.photos as placeholder until owner provides real project photos"
  - "Removed wrapping div around image - next/image fill mode sizes via parent m.div"

patterns-established:
  - "Hero parallax pattern: next/image with fill inside m.div with absolute inset-0 -z-10"
  - "Hero image props: fill, priority, sizes='100vw', quality={85}, className='object-cover'"

requirements-completed: [HERO-01]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 17 Plan 01: Home Page Parallax Hero Summary

**Home page hero replaced with next/image fill mode inside parallax m.div, loading with priority and 100vw sizing**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-21T01:17:06Z
- **Completed:** 2026-02-21T01:18:54Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments
- Replaced ImagePlaceholder in HeroParallax.tsx with next/image using fill mode
- Added real 1920x1080 JPEG hero image to public/images/heroes/home-hero.jpg
- Hero loads with priority (no lazy loading delay) and sizes="100vw" for proper srcset
- Parallax scroll effect preserved via motion/react useTransform on parent m.div
- Zero build errors confirmed

## Task Commits

Each task was committed atomically:

1. **Task 1: Download sample hero image and replace ImagePlaceholder in HeroParallax** - `b55a765` (feat)

## Files Created/Modified
- `public/images/heroes/home-hero.jpg` - 1920x1080 sample hero photograph (to be replaced with real project photo)
- `src/components/sections/HeroParallax.tsx` - Replaced ImagePlaceholder with next/image fill mode, removed wrapping div

## Decisions Made
- Used sample photograph from picsum.photos as interim hero image; the plan explicitly notes the owner will replace with actual project photos later
- Removed the `<div className="h-full w-full">` wrapper that was around ImagePlaceholder -- next/image with fill sizes via the parent positioned element (m.div with absolute inset-0), making the extra wrapper unnecessary

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Unsplash direct download URLs returned HTML redirects instead of images; used picsum.photos as alternative free image source (plan allowed any real image file)

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Home page hero is complete with next/image and parallax
- Plan 17-02 (five interior page heroes) can proceed independently
- Owner should replace public/images/heroes/home-hero.jpg with a real project photo before launch

## Self-Check: PASSED

- FOUND: public/images/heroes/home-hero.jpg
- FOUND: src/components/sections/HeroParallax.tsx
- FOUND: .planning/phases/17-hero-images/17-01-SUMMARY.md
- FOUND: commit b55a765

---
*Phase: 17-hero-images*
*Completed: 2026-02-20*
