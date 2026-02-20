---
phase: 05-services-page
plan: 01
subsystem: ui
tags: [next.js, tailwind, server-components, data-layer]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "Design tokens, ImagePlaceholder, GrainOverlay, AnimatedSection"
  - phase: 03-homepage
    provides: "ServicesPreview component reading from services.ts"
provides:
  - "Expanded services.ts with 6 services, details field, featured flag"
  - "ServicesHero component for interior services page"
  - "Homepage backward compatibility via featured filter"
affects: [05-services-page plan 02, services page assembly]

# Tech tracking
tech-stack:
  added: []
  patterns: ["featured flag for filtering shared data across pages", "interior hero reuse pattern"]

key-files:
  created:
    - src/components/sections/services/ServicesHero.tsx
  modified:
    - src/lib/data/services.ts
    - src/components/sections/ServicesPreview.tsx

key-decisions:
  - "Kept original 3 services as featured: true for homepage, new 3 as featured: false"
  - "Renamed residential-landscaping to residential-maintenance per requirements"
  - "Array order matches services page display order: Design & Build first, Snow Removal last"

patterns-established:
  - "Featured flag pattern: shared data file with boolean to filter subsets per page context"
  - "Interior hero reuse: copy AboutHero pattern with different headline/subtitle/image label"

requirements-completed: [SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07]

# Metrics
duration: 2min
completed: 2026-02-19
---

# Phase 5 Plan 1: Services Data & Hero Summary

**Expanded services.ts from 3 to 6 entries with details/imageLabel/featured fields, updated homepage filter, and created ServicesHero component**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-19T02:52:04Z
- **Completed:** 2026-02-19T02:53:33Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Expanded Service interface with details, imageLabel, and featured fields
- Added 3 new services (Landscape Design & Build, Irrigation & Lighting, Snow Removal) with requirement-specific content
- Updated homepage ServicesPreview to filter by featured flag, preserving 3-card layout
- Created ServicesHero Server Component matching the established interior hero pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand services data file with all 6 services** - `9e62e51` (feat)
2. **Task 2: Update ServicesPreview filter and create ServicesHero** - `7cdd876` (feat)

## Files Created/Modified
- `src/lib/data/services.ts` - Expanded from 3 to 6 services with details, imageLabel, featured fields
- `src/components/sections/ServicesPreview.tsx` - Added featured filter before map to preserve homepage 3-card layout
- `src/components/sections/services/ServicesHero.tsx` - Interior page hero with "Our Services" headline, forest bg, grain overlay

## Decisions Made
- Kept Residential Maintenance, Commercial Landscaping, Municipal Projects as the 3 featured homepage services -- broadest categories for most visitors
- Renamed residential-landscaping to residential-maintenance to match updated service name
- Array order follows requirements order: Design & Build, Residential, Commercial, Municipal, Irrigation, Snow Removal

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Services data layer complete with all 6 entries ready for Plan 02 card grid consumption
- ServicesHero ready for page assembly
- ServicesPreview homepage backward compatibility confirmed via build
- Plan 02 can proceed to build ServiceCardGrid, ServicesContact, and assemble the full services page

## Self-Check: PASSED

All files verified present. All commits verified in git log.

---
*Phase: 05-services-page*
*Completed: 2026-02-19*
