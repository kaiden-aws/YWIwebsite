# Roadmap: Yard Weasels Inc. Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-10 + 7.1 (shipped 2026-02-20)
- **v1.1 Polish & Maps** — Phases 11-15 (in progress)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-10 + 7.1) — SHIPPED 2026-02-20</summary>

- [x] Phase 1: Foundation and Design System (3/3 plans) — completed 2026-02-19
- [x] Phase 2: Layout Chrome (3/3 plans) — completed 2026-02-19
- [x] Phase 3: Homepage (3/3 plans) — completed 2026-02-19
- [x] Phase 4: About Page (2/2 plans) — completed 2026-02-19
- [x] Phase 5: Services Page (2/2 plans) — completed 2026-02-19
- [x] Phase 6: Products Page (2/2 plans) — completed 2026-02-20
- [x] Phase 7: Gallery Page (2/2 plans) — completed 2026-02-20
- [x] Phase 7.1: Integration Fixes (1/1 plan) — completed 2026-02-20
- [x] Phase 8: Contact Page (2/2 plans) — completed 2026-02-20
- [x] Phase 9: SEO and Performance (2/2 plans) — completed 2026-02-20
- [x] Phase 10: Accessibility and Responsiveness (2/2 plans) — completed 2026-02-20

</details>

### v1.1 Polish & Maps

- [x] **Phase 11: Page Transition Stabilization** - Replace fragile internal Next.js API with stable page transition approach (completed 2026-02-20)
- [x] **Phase 12: Component Fixes** - Fix data sync, validation, and state bugs across three components (completed 2026-02-20)
- [ ] **Phase 13: Launch Assets and Touch Targets** - Generate OG images and fix header CTA sizing
- [ ] **Phase 14: Google Maps Embed** - Add interactive map to Contact page for retail yard location
- [ ] **Phase 15: Lighthouse Verification** - Verify 90+ scores across all categories on deployed preview

## Phase Details

### Phase 11: Page Transition Stabilization
**Goal**: Page transitions work reliably without depending on internal Next.js APIs that could break on upgrades
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: STAB-01
**Success Criteria** (what must be TRUE):
  1. Pages transition with exit/enter animations when navigating between routes
  2. No imports of internal Next.js modules (LayoutRouterContext or similar private APIs)
  3. Page transitions continue working after a clean `next build` with zero warnings about internal APIs
**Plans**: 1 plan
Plans:
- [ ] 11-01-PLAN.md — Replace FrozenRouter with template.tsx-based page transitions

### Phase 12: Component Fixes
**Goal**: Three interactive components behave correctly with proper data sourcing, validation, and state management
**Depends on**: Phase 11
**Requirements**: STAB-02, STAB-03, STAB-04
**Success Criteria** (what must be TRUE):
  1. Contact form service dropdown lists all services from services.ts and stays in sync if services data changes
  2. MaterialCalculator depth field rejects values below 0.5 inches via JavaScript validation with user-visible error feedback (not just HTML min attribute)
  3. Switching gallery filter category resets lightbox to the first image of the new filtered set (no stale index from previous category)
**Plans**: 1 plan
Plans:
- [x] 12-01-PLAN.md — Fix contact form data sourcing, calculator depth validation, and gallery lightbox stale index

### Phase 13: Launch Assets and Touch Targets
**Goal**: Social sharing previews display branded images and all interactive elements meet accessibility touch target standards
**Depends on**: Phase 12
**Requirements**: LNCH-01, LNCH-02
**Success Criteria** (what must be TRUE):
  1. Sharing any of the 6 pages on social media (Twitter, Facebook, LinkedIn) shows a branded OG preview image instead of a blank/generic preview
  2. OG image files exist in public/ and are referenced in each page's metadata
  3. Header CTA button measures 44px or taller on mobile viewports
**Plans**: TBD

### Phase 14: Google Maps Embed
**Goal**: Visitors can see and interact with a map showing the retail yard location directly on the Contact page
**Depends on**: Phase 13
**Requirements**: MAPS-01
**Success Criteria** (what must be TRUE):
  1. Contact page displays an embedded Google Map centered on 6470 Beatty Line N, Fergus, Ontario
  2. Map is interactive (pan, zoom) and shows a pin/marker at the retail yard address
  3. Map renders responsively at appropriate dimensions on both mobile and desktop
  4. Map does not degrade Lighthouse performance score (lazy-loaded or deferred)
**Plans**: TBD

### Phase 15: Lighthouse Verification
**Goal**: Deployed site meets quality bar of 90+ across all Lighthouse categories, confirming all v1.1 changes maintain production standards
**Depends on**: Phase 14
**Requirements**: LNCH-03
**Success Criteria** (what must be TRUE):
  1. Lighthouse Performance score is 90+ on deployed Vercel preview
  2. Lighthouse Accessibility score is 90+ on deployed Vercel preview
  3. Lighthouse Best Practices score is 90+ on deployed Vercel preview
  4. Lighthouse SEO score is 90+ on deployed Vercel preview
**Plans**: TBD

## Progress

**Execution Order:** 11 -> 12 -> 13 -> 14 -> 15

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation and Design System | v1.0 | 3/3 | Complete | 2026-02-19 |
| 2. Layout Chrome | v1.0 | 3/3 | Complete | 2026-02-19 |
| 3. Homepage | v1.0 | 3/3 | Complete | 2026-02-19 |
| 4. About Page | v1.0 | 2/2 | Complete | 2026-02-19 |
| 5. Services Page | v1.0 | 2/2 | Complete | 2026-02-19 |
| 6. Products Page | v1.0 | 2/2 | Complete | 2026-02-20 |
| 7. Gallery Page | v1.0 | 2/2 | Complete | 2026-02-20 |
| 7.1 Integration Fixes | v1.0 | 1/1 | Complete | 2026-02-20 |
| 8. Contact Page | v1.0 | 2/2 | Complete | 2026-02-20 |
| 9. SEO and Performance | v1.0 | 2/2 | Complete | 2026-02-20 |
| 10. Accessibility and Responsiveness | v1.0 | 2/2 | Complete | 2026-02-20 |
| 11. Page Transition Stabilization | 1/1 | Complete    | 2026-02-20 | - |
| 12. Component Fixes | v1.1 | 1/1 | Complete | 2026-02-20 |
| 13. Launch Assets and Touch Targets | v1.1 | 0/? | Not started | - |
| 14. Google Maps Embed | v1.1 | 0/? | Not started | - |
| 15. Lighthouse Verification | v1.1 | 0/? | Not started | - |

_Full v1.0 details archived to `.planning/milestones/v1.0-ROADMAP.md`_
