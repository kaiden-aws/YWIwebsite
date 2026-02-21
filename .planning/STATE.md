# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-20)

**Core value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.
**Current focus:** v1.2 Real Images — Phase 20: Component Migration Cleanup (COMPLETE)

## Current Position

Phase: 20 of 20 (Component Migration Cleanup)
Plan: 20-01 complete (1/1)
Status: Phase 20 execution complete — ImagePlaceholder deleted, all images audited
Last activity: 2026-02-20 — Phase 20 plan 01 executed (final plan)

Progress: [██████████] 100% (5/5 phases complete)

## Performance Metrics

**Velocity (v1.0):**
- Total plans completed: 24
- Total phases completed: 11 (including 7.1)
- Timeline: 2 days (2026-02-18 to 2026-02-20)

**Velocity (v1.1):**
- Total plans completed: 5
- Total phases completed: 5
- Total tasks: 10
- Timeline: 1 day (2026-02-20)

**Velocity (v1.2):**
- Total plans completed: 7
- Total phases completed: 5
- Phase 20-01: 1min, 2 tasks, 1 file

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.

- 17-01: Used sample photo from picsum.photos as interim hero; owner replaces before launch
- 17-01: next/image fill mode inside parallax m.div with priority loading pattern
- 17-02: bg-forest/60 dark overlay for text readability over hero photos (60% opacity)
- 17-02: All interior hero images use quality={80} for visual quality vs file size balance
- 18-01: Sample images from picsum.photos as interim service card images; owner replaces before launch
- 18-01: aspect-video wrapper div for fill-mode next/image in card layouts (below-fold, no priority)
- 18-02: Sample photos from picsum.photos as interim product images; owner replaces before launch
- 18-02: product.name used as alt text instead of product.image path string
- 18-03: Used picsum.photos random images as interim team portraits; owner replaces before launch
- 18-03: 3:4 portrait aspect ratio wrapper div for team member cards matching grid-cols-2/4 layout
- 18-03: Responsive sizes: 50vw/25vw for team grid, 100vw/50vw for about teaser
- 19-01: Sample images from picsum.photos as interim project photos; owner replaces before launch
- 19-01: GalleryGrid fill-mode Image relies on parent m.div relative+overflow-hidden with fixed auto-rows
- 19-01: GalleryLightbox needs aspect-video wrapper div; ProjectShowcase uses aspect-square wrapper
- 19-01: No priority prop on gallery/showcase images (below-fold content)
- 20-01: No code changes needed for audit — all 15 components already had correct props from phases 17-19

### Pending Todos

None.

### Blockers/Concerns

- Images are sample/stock — real owner photos needed before actual launch

## Session Continuity

Last session: 2026-02-20
Stopped at: Phase 20 complete — plan 20-01 executed (component migration cleanup). v1.2 Real Images milestone COMPLETE.
Resume file: None
