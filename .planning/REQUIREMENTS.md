# Requirements: Yard Weasels Inc. Website

**Defined:** 2026-02-20
**Core Value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.

## v1.1 Requirements

Requirements for v1.1 Polish & Maps. Each maps to roadmap phases.

### Stability & Correctness

- [x] **STAB-01**: Page transitions use a stable API instead of internal Next.js LayoutRouterContext
- [x] **STAB-02**: Contact form service dropdown is populated from services.ts canonical data
- [x] **STAB-03**: MaterialCalculator depth field validates minimum via JavaScript (not just HTML min attribute)
- [x] **STAB-04**: Gallery lightbox resets selectedIndex when filter category changes

### Launch Readiness

- [ ] **LNCH-01**: All 6 pages have OG image files in public/ for social sharing previews
- [ ] **LNCH-02**: Header CTA button meets 44px minimum touch target height
- [ ] **LNCH-03**: Lighthouse scores verified at 90+ across all categories on deployed preview

### Maps

- [ ] **MAPS-01**: Contact page embeds a Google Map showing the retail yard location (6470 Beatty Line N, Fergus)

## Future Requirements

None currently deferred.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real project photos | Owner needs to provide — not a code task |
| Backend form submission | Deferred to later milestone |
| Blog / news section | Not validated need |
| Office location map | Only retail yard requested for v1.1 |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| STAB-01 | Phase 11 | Complete |
| STAB-02 | Phase 12 | Complete |
| STAB-03 | Phase 12 | Complete |
| STAB-04 | Phase 12 | Complete |
| LNCH-01 | Phase 13 | Pending |
| LNCH-02 | Phase 13 | Pending |
| LNCH-03 | Phase 15 | Pending |
| MAPS-01 | Phase 14 | Pending |

**Coverage:**
- v1.1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0

---
*Requirements defined: 2026-02-20*
*Last updated: 2026-02-20 after roadmap creation*
