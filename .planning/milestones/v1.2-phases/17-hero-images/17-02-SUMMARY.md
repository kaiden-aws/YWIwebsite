---
phase: 17-hero-images
plan: 02
subsystem: ui
tags: [next-image, hero, interior-pages, image-replacement]

# Dependency graph
requires:
  - phase: 16-image-infrastructure
    provides: "public/images/heroes/ directory structure and image path convention"
provides:
  - "5 interior page hero components using next/image with real photograph backgrounds"
  - "5 sample hero photographs in public/images/heroes/ (about, services, products, gallery, contact)"
  - "Dark overlay pattern (bg-forest/60) for text readability over hero images"
affects: [20-image-optimization]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hero image pattern: next/image fill mode + priority + object-cover + dark overlay"
    - "Dark overlay: absolute div with bg-forest/60 over image, under GrainOverlay and content"

key-files:
  created:
    - public/images/heroes/about-hero.jpg
    - public/images/heroes/services-hero.jpg
    - public/images/heroes/products-hero.jpg
    - public/images/heroes/gallery-hero.jpg
    - public/images/heroes/contact-hero.jpg
  modified:
    - src/components/sections/about/AboutHero.tsx
    - src/components/sections/services/ServicesHero.tsx
    - src/components/sections/products/ProductsHero.tsx
    - src/components/sections/gallery/GalleryHero.tsx
    - src/components/sections/contact/ContactHero.tsx

key-decisions:
  - "Used bg-forest/60 dark overlay for text readability (60% opacity balances image visibility with text contrast)"
  - "All hero images use quality={80} for good visual quality with reasonable file size"

patterns-established:
  - "Interior hero pattern: Image fill + priority + sizes=100vw + object-cover + bg-forest/60 overlay + GrainOverlay"

requirements-completed: [HERO-02, HERO-03, HERO-04, HERO-05, HERO-06]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 17 Plan 02: Interior Page Heroes Summary

**All 5 interior page heroes replaced from ImagePlaceholder to next/image with real photographs, priority loading, and dark overlay for text readability**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-21T01:17:11Z
- **Completed:** 2026-02-21T01:19:14Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Downloaded 5 contextually relevant sample hero photographs from Unsplash (all 1920px+ wide, valid JPEGs)
- Replaced ImagePlaceholder with next/image in all 5 interior hero components (About, Services, Products, Gallery, Contact)
- Added dark overlay (bg-forest/60) for text readability over photographic backgrounds
- Build passes with zero TypeScript errors, zero ImagePlaceholder imports remaining

## Task Commits

Each task was committed atomically:

1. **Task 1: Download 5 sample hero images for interior pages** - `0d9fa32` (feat)
2. **Task 2: Replace ImagePlaceholder with next/image in all 5 interior hero components** - `f338d83` (feat)

## Files Created/Modified
- `public/images/heroes/about-hero.jpg` - Garden/landscaping scene (1920x1080, 552KB)
- `public/images/heroes/services-hero.jpg` - Outdoor construction work (1920x1306, 426KB)
- `public/images/heroes/products-hero.jpg` - Landscape materials (1920x1440, 870KB)
- `public/images/heroes/gallery-hero.jpg` - Completed landscape project (1920x1080, 574KB)
- `public/images/heroes/contact-hero.jpg` - Welcoming garden scene (1920x1280, 460KB)
- `src/components/sections/about/AboutHero.tsx` - next/image with about-hero.jpg, priority loading
- `src/components/sections/services/ServicesHero.tsx` - next/image with services-hero.jpg, priority loading
- `src/components/sections/products/ProductsHero.tsx` - next/image with products-hero.jpg, priority loading
- `src/components/sections/gallery/GalleryHero.tsx` - next/image with gallery-hero.jpg, priority loading
- `src/components/sections/contact/ContactHero.tsx` - next/image with contact-hero.jpg, priority loading

## Decisions Made
- Used bg-forest/60 (60% opacity) dark overlay for text readability -- balances showing the photo while keeping white hero text legible
- All hero images use quality={80} for good visual quality with reasonable file size
- Downloaded from Unsplash as sample stock photos; owner will replace with real business photos before launch

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Re-downloaded products-hero.jpg after invalid download**
- **Found during:** Task 1 (Download hero images)
- **Issue:** Initial Unsplash URL for products-hero.jpg returned HTML redirect instead of JPEG image data
- **Fix:** Downloaded from alternative Unsplash URL, verified file type with `file` command
- **Files modified:** public/images/heroes/products-hero.jpg
- **Verification:** `file` command confirms valid JPEG image data, 1920x1440, 870KB
- **Committed in:** 0d9fa32 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor download retry. No scope creep.

## Issues Encountered
None beyond the products-hero.jpg download retry documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 5 interior page heroes now display real photographs
- Images are sample stock photos -- owner should replace with actual business photos before launch
- Image optimization (compression, WebP/AVIF) can be handled in Phase 20

## Self-Check: PASSED

All 10 created/modified files verified present. Both task commits (0d9fa32, f338d83) verified in git log.

---
*Phase: 17-hero-images*
*Completed: 2026-02-20*
