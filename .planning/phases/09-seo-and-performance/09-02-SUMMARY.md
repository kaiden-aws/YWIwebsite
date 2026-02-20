---
phase: 09-seo-and-performance
plan: 02
subsystem: seo
tags: [sitemap, robots, next-image, lighthouse, lcp, metadata]

# Dependency graph
requires:
  - phase: 09-seo-and-performance/01
    provides: "Shared metadata constants and per-page SEO metadata exports"
  - phase: 01-foundation
    provides: "ImagePlaceholder component and AnimatedSection wrapper"
provides:
  - "sitemap.xml route handler listing all 6 pages"
  - "robots.txt route handler with allow-all and sitemap reference"
  - "ImagePlaceholder priority prop for LCP hero image migration"
  - "SEO-07 migration guide documenting label-to-alt and sizes patterns"
  - "Lighthouse 90+ performance verification on deployed build"
affects: [10-accessibility-responsiveness]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Next.js MetadataRoute.Sitemap", "Next.js MetadataRoute.Robots", "data-priority attribute for migration tracking"]

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/components/ui/ImagePlaceholder.tsx
    - src/components/sections/HeroSection.tsx
    - src/components/sections/HeroParallax.tsx
    - src/components/sections/about/AboutHero.tsx
    - src/components/sections/services/ServicesHero.tsx
    - src/components/sections/products/ProductsHero.tsx
    - src/components/sections/gallery/GalleryHero.tsx
    - src/components/sections/contact/ContactHero.tsx

key-decisions:
  - "Used Next.js MetadataRoute types for type-safe sitemap and robots generation"
  - "Added data-priority attribute to ImagePlaceholder for migration tracking without runtime impact"
  - "Documented sizes patterns per component context (hero 100vw, grid 33vw) in migration guide JSDoc"

patterns-established:
  - "MetadataRoute pattern: export default function returning typed metadata object for sitemap/robots"
  - "Migration-ready props: add future-use props (priority) with data attributes so migration is prop-rename not refactor"

requirements-completed: [SEO-04, SEO-05, SEO-06, SEO-07, SEO-08]

# Metrics
duration: 4min
completed: 2026-02-20
---

# Phase 9 Plan 02: SEO Infrastructure Summary

**Sitemap.xml and robots.txt route handlers for crawler access, hero image priority props for LCP migration, and Lighthouse 90+ verified on deployed preview**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-20T15:30:00Z
- **Completed:** 2026-02-20T15:38:19Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Created sitemap.ts listing all 6 pages with canonical URLs, change frequencies, and priorities
- Created robots.ts with allow-all rule and sitemap reference using siteConfig base URL
- Added priority prop to ImagePlaceholder with data-priority attribute for LCP migration readiness
- Added priority={true} to all 7 hero component ImagePlaceholder usages (above-fold only)
- Documented complete migration guide in ImagePlaceholder JSDoc (label-to-alt, sizes patterns, priority usage)
- Verified every ImagePlaceholder call site has a non-empty label prop
- Lighthouse desktop performance score 90+ confirmed on deployed Vercel preview

## Task Commits

Each task was committed atomically:

1. **Task 1: Create sitemap.ts and robots.ts route handlers** - `c1ac29d` (feat)
2. **Task 2: Add image priority comments in hero components and document ImagePlaceholder migration** - `83cba1d` (feat)
3. **Task 3: Verify Lighthouse performance score on deployed preview** - checkpoint:human-verify (approved)

## Files Created/Modified
- `src/app/sitemap.ts` - MetadataRoute.Sitemap handler listing all 6 pages with URLs, lastModified, changeFrequency, and priority
- `src/app/robots.ts` - MetadataRoute.Robots handler with allow-all rule and sitemap URL
- `src/components/ui/ImagePlaceholder.tsx` - Added priority prop, data-priority attribute, and SEO-07 migration guide JSDoc
- `src/components/sections/HeroSection.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/HeroParallax.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/about/AboutHero.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/services/ServicesHero.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/products/ProductsHero.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/gallery/GalleryHero.tsx` - Added priority={true} to hero ImagePlaceholder
- `src/components/sections/contact/ContactHero.tsx` - Added priority={true} to hero ImagePlaceholder

## Decisions Made
- Used Next.js MetadataRoute types for type-safe sitemap and robots generation (standard Next.js pattern)
- Added data-priority attribute to ImagePlaceholder for migration tracking without runtime impact
- Documented sizes patterns per component context (hero 100vw, grid 33vw) in migration guide JSDoc
- Only marked above-fold hero ImagePlaceholders with priority={true}, not all ImagePlaceholders on each page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All SEO requirements (SEO-01 through SEO-08) are now complete
- Phase 9 is fully done -- ready for Phase 10 (Accessibility, Responsiveness, and Launch Polish)
- ImagePlaceholder migration guide is documented and ready for when real photos replace placeholders

## Self-Check: PASSED

All files verified present, all commits verified in git log.

---
*Phase: 09-seo-and-performance*
*Completed: 2026-02-20*
