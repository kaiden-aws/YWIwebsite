# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-20)

**Core value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.
**Current focus:** v1.1 Polish & Maps — Phase 14 (Google Maps Embed) complete, ready for Phase 15

## Current Position

Phase: 14 of 15 (Google Maps Embed)
Plan: 1 of 1 in current phase (COMPLETE)
Status: Phase 14 complete
Last activity: 2026-02-20 — Completed 14-01 Google Maps Embed

Progress: [#############################] 28/? plans (v1.0 complete, v1.1 phases 11-14 done)

## Performance Metrics

**Velocity (v1.0):**
- Total plans completed: 24
- Total phases completed: 11 (including 7.1)
- Timeline: 2 days (2026-02-18 to 2026-02-20)

**v1.1:**
- Phase 11: 1 plan, 2 tasks, 2min
- Phase 12: 1 plan, 3 tasks, 2min
- Phase 13: 1 plan, 2 tasks, 2min
- Phase 14: 1 plan, 1 task, 1min

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v1.0]: FrozenRouter uses internal Next.js API (LayoutRouterContext) — RESOLVED in Phase 11
- [v1.0]: Canonical data files (services.ts, products.ts) are single source of truth — Phase 12 enforces this for contact form
- [v1.1-P11]: Used template.tsx remount boundary + usePathname (public API) to replace FrozenRouter + LayoutRouterContext (internal API)
- [v1.1-P12]: Kept "Products / Materials" and "Other" as static dropdown options since they are not in services.ts but are valid contact reasons
- [v1.1-P13]: Used Next.js opengraph-image.tsx convention for auto-generated OG images instead of static files
- [v1.1-P13]: Used system serif/sans-serif fonts in Satori renderer to approximate site fonts without font file loading
- [v1.1-P14]: Used keyless Google Maps embed URL instead of Embed API v1 key for simplicity and no API key management

### Pending Todos

None.

### Blockers/Concerns

- [Pre-launch]: Real project photos from owner needed to replace placeholders before site goes live
- [Phase 15]: Lighthouse verification requires deployed Vercel preview — cannot be done locally

## Session Continuity

Last session: 2026-02-20
Stopped at: Completed 14-01-PLAN.md (Phase 14 complete, ready for Phase 15)
Resume file: None
