# Requirements: Yard Weasels Inc. Website

**Defined:** 2026-02-20
**Core Value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.

## v1.2 Requirements

Requirements for milestone v1.2 Real Images. Each maps to roadmap phases.

### Hero Images

- [ ] **HERO-01**: Home page hero displays a real landscaping project photo as full-viewport parallax background
- [ ] **HERO-02**: About page hero displays a real team/project photo as full-width background
- [ ] **HERO-03**: Services page hero displays a real crew/project photo as full-width background
- [ ] **HERO-04**: Products page hero displays a real retail yard/materials photo as full-width background
- [ ] **HERO-05**: Gallery page hero displays a real completed project photo as full-width background
- [ ] **HERO-06**: Contact page hero displays a real office/team photo as full-width background

### Service Images

- [ ] **SERV-01**: Each of the 6 service cards displays a relevant photo matching its service type (Design & Build, Residential, Commercial, Municipal, Irrigation, Snow Removal)

### Product Images

- [ ] **PROD-01**: Each of the 7 product category cards displays a relevant photo for its material type (Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed)

### Project/Gallery Images

- [ ] **PROJ-01**: Each of the 10 gallery projects displays a relevant landscaping photo matching its category and description
- [ ] **PROJ-02**: Gallery lightbox displays the full-size project image with next/image optimization

### Team Images

- [ ] **TEAM-01**: Each of the 4 team member cards displays a professional portrait-style photo

### Infrastructure

- [ ] **INFRA-01**: All images stored locally in `public/images/` organized by type (heroes/, services/, products/, projects/, team/)
- [ ] **INFRA-02**: Data files (services.ts, products.ts, projects.ts, about.ts) updated with real image paths replacing label strings
- [ ] **INFRA-03**: All 15 components use `next/image` instead of ImagePlaceholder
- [ ] **INFRA-04**: ImagePlaceholder component removed from codebase
- [ ] **INFRA-05**: All images use appropriate `next/image` props (sizes, priority, fill, alt text from current labels)

## Future Requirements

None planned — this milestone is focused solely on image replacement.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Image CMS / upload system | Static images for now, owner provides photos later |
| Responsive art direction (different crops per breakpoint) | Single image per slot sufficient for v1.2 |
| WebP/AVIF manual conversion | next/image handles format optimization automatically |
| Image lazy loading library | next/image handles lazy loading natively |
| Blur placeholder generation | Can add in future if needed, not required for sample images |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | Phase 17 | Pending |
| HERO-02 | Phase 17 | Pending |
| HERO-03 | Phase 17 | Pending |
| HERO-04 | Phase 17 | Pending |
| HERO-05 | Phase 17 | Pending |
| HERO-06 | Phase 17 | Pending |
| SERV-01 | Phase 18 | Pending |
| PROD-01 | Phase 18 | Pending |
| PROJ-01 | Phase 19 | Pending |
| PROJ-02 | Phase 19 | Pending |
| TEAM-01 | Phase 18 | Pending |
| INFRA-01 | Phase 16 | Pending |
| INFRA-02 | Phase 16 | Pending |
| INFRA-03 | Phase 20 | Pending |
| INFRA-04 | Phase 20 | Pending |
| INFRA-05 | Phase 20 | Pending |

**Coverage:**
- v1.2 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-02-20*
*Last updated: 2026-02-20 after roadmap creation*
