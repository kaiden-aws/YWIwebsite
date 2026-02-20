---
phase: 09-seo-and-performance
plan: 01
subsystem: seo
tags: [next-metadata, open-graph, seo, title-template, metadataBase]

# Dependency graph
requires:
  - phase: 08-contact-page
    provides: All six page files exist and ready for metadata exports
provides:
  - Shared metadata constants module (siteConfig, sharedOpenGraph)
  - Per-page SEO metadata exports with unique titles, descriptions, and OG tags
  - Root layout title.template and metadataBase for URL resolution
affects: [09-02-seo-and-performance, 10-pre-launch]

# Tech tracking
tech-stack:
  added: []
  patterns: [title.template with %s pattern, sharedOpenGraph spread for OG consistency, metadataBase for absolute URL resolution, siteConfig centralized constants]

key-files:
  created: [src/lib/metadata.ts]
  modified: [src/app/layout.tsx, src/app/page.tsx, src/app/about/page.tsx, src/app/services/page.tsx, src/app/products/page.tsx, src/app/gallery/page.tsx, src/app/contact/page.tsx]

key-decisions:
  - "Used title.absolute for homepage to avoid double branding from template pattern"
  - "Spread sharedOpenGraph in every page to prevent OG shallow merge losing siteName/locale"
  - "Used VERCEL_PROJECT_PRODUCTION_URL env var with yardweasels.ca fallback for siteConfig.url"

patterns-established:
  - "sharedOpenGraph spread: every page.tsx openGraph must spread sharedOpenGraph to retain siteName and locale"
  - "metadata constants: import siteConfig/sharedOpenGraph from @/lib/metadata for consistent values"
  - "title.template: child pages set title string, root layout appends ' | Yard Weasels Inc.' automatically"

requirements-completed: [SEO-01, SEO-02, SEO-03]

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 9 Plan 01: SEO Metadata Summary

**Per-page SEO metadata with location-specific titles, descriptions, and Open Graph tags across all six pages using shared constants and Next.js title template**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T15:24:03Z
- **Completed:** 2026-02-20T15:26:27Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Created shared metadata constants module with siteConfig and sharedOpenGraph for DRY metadata
- Upgraded root layout with metadataBase, title.template, keywords, and openGraph
- Added unique metadata exports to all 6 pages with location-specific titles and descriptions
- Every page has og:title, og:description, og:url, og:image, og:site_name, and og:locale
- Verified heading hierarchy (SEO-03): one h1 per page confirmed, no changes needed

## Task Commits

Each task was committed atomically:

1. **Task 1: Create shared metadata constants and upgrade root layout metadata** - `cf0ea8f` (feat)
2. **Task 2: Add per-page metadata exports to all six pages** - `748701b` (feat)

## Files Created/Modified
- `src/lib/metadata.ts` - Shared siteConfig and sharedOpenGraph constants
- `src/app/layout.tsx` - Root metadata with metadataBase, title.template, keywords, openGraph
- `src/app/page.tsx` - Homepage metadata with absolute title and full OG tags
- `src/app/about/page.tsx` - About page metadata with team/story description
- `src/app/services/page.tsx` - Services page metadata with service keywords
- `src/app/products/page.tsx` - Products page metadata with material keywords
- `src/app/gallery/page.tsx` - Gallery page metadata with project showcase description
- `src/app/contact/page.tsx` - Contact page metadata with phone number and CTA

## Decisions Made
- Used `title.absolute` for homepage to prevent double branding (homepage needs full branded title, not template)
- Every page spreads `sharedOpenGraph` into its openGraph to prevent OG shallow merge losing siteName/locale
- Used `process.env.VERCEL_PROJECT_PRODUCTION_URL` with `'https://yardweasels.ca'` fallback for portable deployment
- Referenced placeholder OG image paths (og-default.jpg, og-about.jpg, etc.) -- real images needed before launch

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All pages have complete SEO metadata -- ready for Plan 02 (sitemap, robots.txt, and performance optimization)
- OG image files (og-default.jpg, og-about.jpg, etc.) will need to be created before launch
- metadataBase is set and working -- sitemap and robots.ts can reference siteConfig.url

## Self-Check: PASSED

All 8 files verified present. Both commit hashes (cf0ea8f, 748701b) confirmed in git log.

---
*Phase: 09-seo-and-performance*
*Completed: 2026-02-20*
