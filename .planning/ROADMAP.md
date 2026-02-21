# Roadmap: Yard Weasels Inc. Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-10 + 7.1 (shipped 2026-02-20)
- ✅ **v1.1 Polish & Maps** — Phases 11-15 (shipped 2026-02-20)
- 🚧 **v1.2 Real Images** — Phases 16-20 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-10 + 7.1) — SHIPPED 2026-02-20</summary>

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

<details>
<summary>✅ v1.1 Polish & Maps (Phases 11-15) — SHIPPED 2026-02-20</summary>

- [x] Phase 11: Page Transition Stabilization (1/1 plan) — completed 2026-02-20
- [x] Phase 12: Component Fixes (1/1 plan) — completed 2026-02-20
- [x] Phase 13: Launch Assets and Touch Targets (1/1 plan) — completed 2026-02-20
- [x] Phase 14: Google Maps Embed (1/1 plan) — completed 2026-02-20
- [x] Phase 15: Lighthouse Verification (1/1 plan) — completed 2026-02-20

</details>

### 🚧 v1.2 Real Images (In Progress)

**Milestone Goal:** Replace all colored-box image placeholders with real sample landscaping photos optimized via next/image, then remove the ImagePlaceholder component entirely.

- [x] **Phase 16: Image Infrastructure** - Directory structure and data model updates to support real image paths (completed 2026-02-21)
- [x] **Phase 17: Hero Images** - Real full-viewport hero photos for all 6 pages (completed 2026-02-21)
- [x] **Phase 18: Content Section Images** - Real photos for service cards, product cards, and team portraits (completed 2026-02-21)
- [x] **Phase 19: Gallery Project Images** - Real photos for all 10 gallery projects with lightbox optimization (completed 2026-02-21)
- [ ] **Phase 20: Component Migration and Cleanup** - Swap all ImagePlaceholder usages to next/image and remove the component

## Phase Details

### Phase 16: Image Infrastructure
**Goal**: Data models and file structure are ready to accept real images across the entire site
**Depends on**: Phase 15 (v1.1 complete)
**Requirements**: INFRA-01, INFRA-02
**Success Criteria** (what must be TRUE):
  1. A `public/images/` directory exists with subdirectories for each image type (heroes/, services/, products/, projects/, team/)
  2. Data files (services.ts, products.ts, projects.ts, about.ts) export an `image` field for each entry containing a valid path under `public/images/`
  3. TypeScript types for all data models include the image field with no type errors
**Plans**: 1 plan
Plans:
- [x] 16-01-PLAN.md — Directory structure and data model path updates

### Phase 17: Hero Images
**Goal**: Every page opens with a real landscaping photograph as the hero background instead of a colored placeholder box
**Depends on**: Phase 16
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06
**Success Criteria** (what must be TRUE):
  1. Home page hero displays a real landscaping project photo as a full-viewport parallax background
  2. About, Services, Products, Gallery, and Contact page heroes each display a real contextually relevant photo as full-width background
  3. All hero images load without layout shift (proper width/height or fill mode)
  4. Above-fold hero on the Home page loads with priority (no lazy loading delay)
**Plans**: 2 plans
Plans:
- [x] 17-01-PLAN.md — Home page parallax hero with next/image
- [x] 17-02-PLAN.md — Five interior page heroes with next/image

### Phase 18: Content Section Images
**Goal**: Service cards, product cards, and team portraits all show real photographs instead of placeholder boxes
**Depends on**: Phase 16
**Requirements**: SERV-01, PROD-01, TEAM-01
**Success Criteria** (what must be TRUE):
  1. Each of the 6 service cards displays a photo that visually matches its service type (e.g., irrigation card shows sprinkler work)
  2. Each of the 7 product category cards displays a photo of that material type (e.g., mulch card shows mulch)
  3. Each of the 4 team member cards displays a professional portrait-style photo
  4. All card images render at correct aspect ratios without distortion or overflow
**Plans**: 3 plans
Plans:
- [x] 18-01-PLAN.md — Service card images (6 service photos + ServiceCardGrid + ServicesPreview)
- [x] 18-02-PLAN.md — Product card images (7 product photos + ProductCategoryGrid + ProductsBanner)
- [x] 18-03-PLAN.md — Team portrait images (4 team portraits + TeamSection + AboutTeaser)

### Phase 19: Gallery Project Images
**Goal**: The gallery page displays real landscaping project photos in both the masonry grid and the lightbox viewer
**Depends on**: Phase 16
**Requirements**: PROJ-01, PROJ-02
**Success Criteria** (what must be TRUE):
  1. Each of the 10 gallery projects displays a real landscaping photo matching its category and description
  2. Clicking a gallery item opens the lightbox with the full-size project image rendered via next/image
  3. Gallery filtering still works correctly with real images (no broken references on category switch)
**Plans**: 1 plan
Plans:
- [x] 19-01-PLAN.md — Gallery project images (10 project photos + GalleryGrid + GalleryLightbox + ProjectShowcase)

### Phase 20: Component Migration and Cleanup
**Goal**: Every ImagePlaceholder usage is replaced with next/image, all images use proper optimization props, and the placeholder component is deleted
**Depends on**: Phase 17, Phase 18, Phase 19
**Requirements**: INFRA-03, INFRA-04, INFRA-05
**Success Criteria** (what must be TRUE):
  1. Zero imports of ImagePlaceholder exist anywhere in the codebase
  2. The file `src/components/ui/ImagePlaceholder.tsx` no longer exists
  3. Every next/image instance uses appropriate `sizes` prop (100vw for heroes, responsive breakpoints for grid cards)
  4. Every next/image instance has a descriptive `alt` attribute (derived from the former label prop)
  5. The site builds with zero TypeScript errors and zero broken images on any page
**Plans**: TBD

## Progress

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
| 11. Page Transition Stabilization | v1.1 | 1/1 | Complete | 2026-02-20 |
| 12. Component Fixes | v1.1 | 1/1 | Complete | 2026-02-20 |
| 13. Launch Assets and Touch Targets | v1.1 | 1/1 | Complete | 2026-02-20 |
| 14. Google Maps Embed | v1.1 | 1/1 | Complete | 2026-02-20 |
| 15. Lighthouse Verification | v1.1 | 1/1 | Complete | 2026-02-20 |
| 16. Image Infrastructure | v1.2 | 1/1 | Complete | 2026-02-21 |
| 17. Hero Images | v1.2 | Complete    | 2026-02-21 | 2026-02-21 |
| 18. Content Section Images | 3/3 | Complete    | 2026-02-21 | - |
| 19. Gallery Project Images | v1.2 | 1/1 | Complete | 2026-02-21 |
| 20. Component Migration and Cleanup | v1.2 | 0/? | Not started | - |

_Full v1.0 details archived to `.planning/milestones/v1.0-ROADMAP.md`_
_Full v1.1 details archived to `.planning/milestones/v1.1-ROADMAP.md`_
