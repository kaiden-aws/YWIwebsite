---
phase: 01-foundation-and-design-system
plan: 02
subsystem: ui
tags: [next-font, typography, framer-motion, lazy-motion, animated-section, image-placeholder, grain-overlay, ssr]

# Dependency graph
requires:
  - phase: 01-foundation-and-design-system/01
    provides: Next.js 16 project skeleton, Tailwind v4 @theme block with font variable references, cn() utility
provides:
  - DM Serif Display and Plus Jakarta Sans fonts via next/font with CSS variable injection
  - MotionProvider with LazyMotion + domAnimation strict mode for minimal bundle
  - AnimatedSection scroll-triggered fade-in/slide-up wrapper component
  - ImagePlaceholder server component with 4 aspect ratio options
  - GrainOverlay server component with SVG noise texture
  - Comprehensive test page demonstrating all Phase 1 primitives
affects: [01-03, all-subsequent-phases]

# Tech tracking
tech-stack:
  added: [next/font/google, motion/react LazyMotion]
  patterns: [lazy-motion-strict, m-component-tree-shaking, server-component-default, client-boundary-minimization]

key-files:
  created:
    - src/providers/MotionProvider.tsx
    - src/components/ui/AnimatedSection.tsx
    - src/components/ui/ImagePlaceholder.tsx
    - src/components/ui/GrainOverlay.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx

key-decisions:
  - "Import m from motion/react (not motion/react-m) for TypeScript compatibility with m.div pattern"
  - "Font CSS variables on html element (not body) so @theme var() references resolve correctly"
  - "LazyMotion strict mode to catch accidental full-bundle motion imports at runtime"

patterns-established:
  - "Client boundary minimization: only 2 files use 'use client' (MotionProvider, AnimatedSection)"
  - "Animation pattern: use m.div from motion/react with LazyMotion ancestor for tree-shaking"
  - "Server-first components: ImagePlaceholder and GrainOverlay are server components with no 'use client'"
  - "Font setup: next/font CSS variables on html element, @theme references via var()"

requirements-completed: [FNDN-04, FNDN-05, FNDN-06, FNDN-07, FNDN-08, FNDN-10]

# Metrics
duration: 3min
completed: 2026-02-19
---

# Phase 1 Plan 2: Typography, Motion Provider, and UI Primitives Summary

**DM Serif Display + Plus Jakarta Sans fonts via next/font, LazyMotion strict provider, and three reusable UI primitives (AnimatedSection, ImagePlaceholder, GrainOverlay) with comprehensive test page**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-19T00:13:49Z
- **Completed:** 2026-02-19T00:16:35Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Editorial typography configured with DM Serif Display (headings) and Plus Jakarta Sans (body) self-hosted via next/font with zero CLS
- MotionProvider with LazyMotion strict mode wraps the app for minimal Framer Motion bundle (~5KB vs ~34KB full)
- AnimatedSection component provides scroll-triggered fade-in/slide-up animations with staggered delay support
- ImagePlaceholder and GrainOverlay created as server components for maximum SSR performance
- Comprehensive test page demonstrates all Phase 1 primitives: colors, typography, animations, placeholders, and grain texture

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure editorial typography and MotionProvider in root layout** - `03577c4` (feat)
2. **Task 2: Build AnimatedSection, ImagePlaceholder, GrainOverlay components and test page** - `fcb833b` (feat)

## Files Created/Modified
- `src/providers/MotionProvider.tsx` - LazyMotion + domAnimation wrapper with strict mode (client component)
- `src/components/ui/AnimatedSection.tsx` - Scroll-triggered fade-in/slide-up wrapper using m.div (client component)
- `src/components/ui/ImagePlaceholder.tsx` - Styled placeholder box with 4 aspect ratios (server component)
- `src/components/ui/GrainOverlay.tsx` - CSS grain texture overlay using SVG feTurbulence (server component)
- `src/app/layout.tsx` - Updated with next/font imports, CSS variables on html, MotionProvider wrapping children
- `src/app/page.tsx` - Comprehensive test page demonstrating all Phase 1 design system primitives

## Decisions Made
- Imported `m` from `motion/react` instead of `motion/react-m` as specified in plan -- the `motion/react-m` module exports elements directly (e.g., `div`) rather than as `m.div`, causing TypeScript errors. The `m` export from `motion/react` is the correct lightweight alternative to `motion` that works with LazyMotion
- Font CSS variables injected on `<html>` element (not `<body>`) so that Tailwind v4 `@theme` block `var()` references can resolve through CSS inheritance

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed motion/react-m import path**
- **Found during:** Task 2 (AnimatedSection creation)
- **Issue:** Plan specified `import { m } from 'motion/react-m'` but this module does not export a named `m` -- it exports HTML elements directly (div, span, etc.) as named exports. TypeScript error TS2305.
- **Fix:** Changed import to `import { m } from 'motion/react'` which correctly exports the `m` proxy object for `m.div` usage with LazyMotion
- **Files modified:** src/components/ui/AnimatedSection.tsx
- **Verification:** `npx tsc --noEmit` passes cleanly, `npm run build` succeeds
- **Committed in:** fcb833b (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Import path correction necessary for TypeScript compilation. No scope creep.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All Phase 1 primitives complete: design tokens, typography, animations, placeholders, grain overlay
- Ready for Plan 01-03: any remaining Phase 1 work
- Client boundary is minimal (2 files) -- good foundation for SSR-first architecture
- All components verified working via production build (static generation)

## Self-Check: PASSED

All 6 claimed files verified present. Both task commits (03577c4, fcb833b) verified in git log.

---
*Phase: 01-foundation-and-design-system*
*Completed: 2026-02-19*
