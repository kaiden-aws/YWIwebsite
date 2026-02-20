# Roadmap: Yard Weasels Inc. Website

## Overview

A premium multi-page marketing website for Yard Weasels Inc., built as a statically-rendered Next.js application with surgical client-side islands. The build order follows a strict dependency graph: design system tokens and data structures first, then shared layout chrome, then the homepage which sets the visual language, then the five secondary pages (About, Services, Products, Gallery, Contact) each delivered as complete, verifiable capabilities, and finally SEO metadata, accessibility, and performance polish applied across all completed pages. Each phase leaves the codebase in a demonstrably better state than it started.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Design System** - Next.js 15 project with Tailwind v4, color tokens, typography, Framer Motion, AnimatedSection, and image placeholder system
- [x] **Phase 2: Layout Chrome** - Sticky nav with phone/CTA/hamburger drawer, multi-column footer with both addresses, back-to-top, and page transitions
- [x] **Phase 3: Homepage** - Full homepage with hero, services preview, about teaser, products banner, project showcase, testimonial carousel, and CTA banner — establishes the visual language for all subsequent pages
- [x] **Phase 4: About Page** - Complete About page with company story, values grid, team section, and differentiator section
- [x] **Phase 5: Services Page** - Complete Services page with six detailed service cards, CTAs, and bottom contact prompt
- [ ] **Phase 6: Products Page** - Complete Products page with category grid, interactive Material Calculator with validation, and retail yard callout
- [x] **Phase 7: Gallery Page** - Filterable masonry gallery with lightbox, filter transitions, and keyboard navigation (completed 2026-02-20)
- [ ] **Phase 7.1: Integration Fixes** *(INSERTED — gap closure)* - Fix 3 integration issues from v1.0 audit: GalleryLightbox 'use client', Footer services import, ProductsBanner CTA link
- [ ] **Phase 8: Contact Page** - Split-layout contact page with validated UI-only form, info panel, and map placeholder
- [ ] **Phase 9: SEO and Performance** - Per-page metadata, Open Graph, sitemap, robots.txt, hero image priority, and Lighthouse 90+ target
- [ ] **Phase 10: Accessibility, Responsiveness, and Launch Polish** - WCAG AA audit, focus states, ARIA labels, reduced motion, mobile polish across all breakpoints

## Phase Details

### Phase 1: Foundation and Design System
**Goal**: The Next.js application runs locally and on Vercel with the correct Tailwind v4 configuration, brand CSS tokens, editorial typography, Framer Motion bundle strategy, reusable AnimatedSection wrapper, and image placeholder system — making every subsequent phase buildable on a solid, consistent base.
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03, FNDN-04, FNDN-05, FNDN-06, FNDN-07, FNDN-08, FNDN-09, FNDN-10
**Success Criteria** (what must be TRUE):
  1. Visiting the dev server shows the correct forest green, cream, and terracotta color palette applied via CSS variables — not default browser or Tailwind colors
  2. Headings render in DM Serif Display and body text in Plus Jakarta Sans with zero layout shift on load
  3. An AnimatedSection wrapping test content triggers a visible fade-in/slide-up when scrolled into view, while the page itself remains server-rendered
  4. Wrapping an element with the ImagePlaceholder component shows a styled colored box with a descriptive label instead of a broken image
  5. The app deploys to Vercel without errors, and page source confirms server-rendered HTML (not a client-side shell)
**Plans**: 3 plans in 3 waves

Plans:
- [x] 01-01-PLAN.md — Next.js 16 project scaffolding, Tailwind v4 @theme with brand color tokens, cn() utility
- [x] 01-02-PLAN.md — Editorial typography (DM Serif Display + Plus Jakarta Sans), LazyMotion provider, AnimatedSection, ImagePlaceholder, GrainOverlay, and test page
- [x] 01-03-PLAN.md — Human verification checkpoint for all Phase 1 success criteria

### Phase 2: Layout Chrome
**Goal**: Every page in the site has a fully functional sticky navigation header and multi-column footer, so that users can always see the company phone number, navigate between pages, and find both business addresses — regardless of which page they land on.
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06, NAV-07, NAV-08, NAV-09, NAV-10
**Success Criteria** (what must be TRUE):
  1. Scrolling down any page makes the nav header translucent with a blur effect — it stays visible but reads the content beneath it
  2. Clicking the hamburger icon on mobile opens a smooth slide-in drawer showing all nav links; clicking outside or the close button dismisses it
  3. The current page's nav link has a visible active indicator distinguishing it from other links
  4. The footer shows both business addresses (office and retail yard), phone number, business hours, social icon links, and copyright 2026
  5. After scrolling down, a back-to-top button appears and clicking it smoothly scrolls to the top; navigating between pages triggers the AnimatePresence page transition
**Plans**: 3 plans in 3 waves

Plans:
- [x] 02-01-PLAN.md — Complete header: navigation data, sticky scroll blur, desktop/mobile nav with drawer, active link indicator, placeholder pages
- [x] 02-02-PLAN.md — Multi-column footer, back-to-top button, page transition wrapper, and root layout integration
- [x] 02-03-PLAN.md — Human verification checkpoint for all Phase 2 success criteria

### Phase 3: Homepage
**Goal**: A visitor landing on the homepage immediately perceives a premium, agency-quality presentation of Yard Weasels Inc. — the hero communicates who they are and where they operate, services and past work are visible without scrolling far, social proof is present, and there is always a clear CTA within reach.
**Depends on**: Phase 2
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10, HOME-11
**Success Criteria** (what must be TRUE):
  1. The hero fills the full viewport with a parallax image placeholder and grain texture, displays "Crafting Outdoor Spaces That Inspire" in bold serif, includes a Fergus Ontario subline, and shows both CTA buttons and a scroll-down indicator
  2. Scrolling past the hero reveals services (3-column card preview), an about teaser with split layout, a products banner showing all 7 categories, and a project showcase grid — all with visible staggered fade-in/slide-up entrance animations
  3. A testimonial carousel auto-advances through 3 placeholder testimonials with star ratings and quotation mark decoration
  4. A full-width CTA banner appears near the bottom of the page with a textured background, the "Ready to Transform Your Outdoor Space?" headline, and both a quote button and phone number
  5. The entire page is server-rendered — page source contains the full homepage HTML, not a loading skeleton
**Plans**: 3 plans in 3 waves

Plans:
- [x] 03-01-PLAN.md — Hero section with parallax, grain overlay, headline, CTAs, scroll indicator, and all static data files
- [x] 03-02-PLAN.md — Services preview cards, about teaser split layout, and products banner with retail yard address
- [x] 03-03-PLAN.md — Project showcase grid, testimonial carousel with auto-advance, and CTA banner

### Phase 4: About Page
**Goal**: A potential client visiting the About page can learn the company's story, understand its values, see who is on the team, and read the specific differentiators that make Yard Weasels Inc. worth hiring — building trust before they ever contact the company.
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, ABOUT-04, ABOUT-05
**Success Criteria** (what must be TRUE):
  1. The About page has a hero with the "Our Story" headline and a background image placeholder
  2. Scrolling down reveals a company story section describing Fergus roots, community ties, and the range of clients served
  3. A values grid displays four values (Quality, Integrity, Community, Craftsmanship) each with a decorative icon
  4. A team section shows placeholder cards with photo placeholder, name, and role for each team member
  5. A "Why Choose Yard Weasels" section prominently lists the five differentiators including the licensed backflow preventor testing credential
**Plans**: 2 plans in 2 waves

Plans:
- [x] 04-01-PLAN.md — About page data layer, hero section, company story, and values grid
- [x] 04-02-PLAN.md — Team section and "Why Choose Yard Weasels" differentiators

### Phase 5: Services Page
**Goal**: A visitor who wants to understand what Yard Weasels Inc. offers can browse all six service areas with enough detail to self-qualify — knowing what the service covers, seeing a relevant image, and finding a clear way to request a quote.
**Depends on**: Phase 2
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06, SERV-07, SERV-08, SERV-09
**Success Criteria** (what must be TRUE):
  1. The Services page has a hero with the "Our Services" headline
  2. All six service cards are visible: Landscape Design & Build, Residential Maintenance, Commercial Landscaping, Municipal Projects, Irrigation & Landscape Lighting, and Snow Removal
  3. Each service card shows an image placeholder, a detailed description specific to that service, and a "Get a Quote" CTA button
  4. The Snow Removal card specifically mentions contract, per-visit, and hourly pricing options; the Irrigation card mentions licensed backflow testing
  5. A bottom section prompts uncertain visitors to make contact with "Not sure what you need? Let's talk." and a link to the contact page
**Plans**: 2 plans in 2 waves

Plans:
- [x] 05-01-PLAN.md — Services data expansion (6 services), homepage ServicesPreview backward compat, and ServicesHero component
- [x] 05-02-PLAN.md — ServiceCardGrid (all 6 cards), ServicesContact bottom CTA, and page assembly

### Phase 6: Products Page
**Goal**: A visitor interested in purchasing landscape materials can browse all product categories, calculate exactly how much material they need for their project, and easily request a delivery quote — reducing friction for the retail materials yard use case.
**Depends on**: Phase 2
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06, PROD-07, PROD-08, PROD-09
**Success Criteria** (what must be TRUE):
  1. The Products page has a hero with the "Quality Materials, Delivered" headline and shows a visually rich product category grid with all seven categories (Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed)
  2. Hovering over a product card reveals a "Contact for Pricing" prompt rather than displaying a price
  3. A Material Calculator accepts Length (ft), Width (ft), and Depth (in) inputs along with a product type selection and displays the resulting cubic yards needed
  4. The calculator shows inline validation errors for out-of-range or missing inputs and does not allow calculation to proceed with invalid data
  5. Below the calculator result, a "Request Delivery Quote" CTA is visible; the retail yard address (6470 Beatty Line N) and hours appear in a callout section
**Plans**: 2 plans in 2 waves

Plans:
- [ ] 06-01-PLAN.md — Products page hero and product category grid with CSS hover "Contact for Pricing" overlay
- [ ] 06-02-PLAN.md — Material Calculator with input validation, product dropdown, delivery quote CTA, retail yard callout, and page assembly

### Phase 7: Gallery Page
**Goal**: A prospective client can browse Yard Weasels Inc.'s completed projects, filter to the type of work they are considering, open individual photos in a full-screen lightbox, and navigate through them with keyboard or click controls — giving them the visual proof of quality needed to trust the company with their project.
**Depends on**: Phase 2
**Requirements**: GALL-01, GALL-02, GALL-03, GALL-04, GALL-05
**Success Criteria** (what must be TRUE):
  1. The Gallery page shows a masonry grid of 8-12 project image placeholders in a visually interesting layout
  2. Clicking a filter tab (All, Residential, Commercial, Hardscaping, Irrigation) refilters the grid with a smooth transition — no flicker, no full-page reload
  3. Hovering over any gallery image shows an overlay with the project name and category
  4. Clicking a gallery image opens a lightbox modal displaying the full image with previous/next navigation arrows
  5. While the lightbox is open, pressing ESC closes it, pressing the left/right arrow keys navigates between images, and focus is trapped inside the modal
**Plans**: 2 plans in 2 waves

Plans:
- [ ] 07-01-PLAN.md — Gallery hero, projects data expansion (6→10), filterable masonry grid with AnimatePresence transitions and hover overlays
- [ ] 07-02-PLAN.md — Lightbox modal with AnimatePresence, keyboard navigation (ESC, arrows), focus trap, and body scroll lock

### Phase 7.1: Integration Fixes *(INSERTED — gap closure)*
**Goal**: Fix the three cross-phase integration defects surfaced by the v1.0 milestone audit — a missing client directive, a hardcoded data mismatch, and a missing navigation link — so that all completed phases are clean before building the remaining pages.
**Depends on**: Phase 7
**Requirements**: Hardens GALL-04, NAV-07, NAV-08, HOME-07 (all already satisfied; these are quality fixes)
**Gap Closure**: Closes integration gaps and partial flow from v1.0 audit
**Success Criteria** (what must be TRUE):
  1. GalleryLightbox.tsx has a `'use client'` directive at the top of the file
  2. Footer services column imports from `services.ts` and labels match exactly (including "Irrigation & Landscape Lighting")
  3. ProductsBanner has a visible "View All Products" CTA link that navigates to `/products`
  4. The "Homepage → Products → Calculator → Contact" E2E flow works via the homepage ProductsBanner section (not just the nav bar)
**Plans**: 1 plan in 1 wave

Plans:
- [ ] 07.1-01-PLAN.md — Fix GalleryLightbox 'use client', Footer services import, and ProductsBanner CTA link

### Phase 8: Contact Page
**Goal**: A visitor ready to reach out to Yard Weasels Inc. can submit an inquiry with all relevant details, receive clear validation feedback if they miss anything, find both addresses and business hours at a glance, and locate the business on a map — all without any backend submission required.
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06, CONT-07, CONT-08
**Success Criteria** (what must be TRUE):
  1. The Contact page uses a split layout with the form on the left and an info panel on the right (stacks vertically on mobile)
  2. The form includes fields for Name, Email, Phone, Service Interest (dropdown with all 7 options), and Message — all with polished floating label or clean input styling
  3. Submitting the form with any required field empty or with an invalid email shows an inline error message next to the relevant field without clearing other fields
  4. Submitting a fully valid form shows a success state (confirmation message) without navigating away or making a network request
  5. The info panel displays both addresses, the phone number, business hours, and a styled map placeholder area
**Plans**: TBD

Plans:
- [ ] 08-01: Split-layout page structure, contact info panel, and map placeholder
- [ ] 08-02: Contact form with validation, success state, and "Prefer to talk?" callout

### Phase 9: SEO and Performance
**Goal**: Every page of the site has accurate, location-specific metadata and Open Graph tags that make it discoverable in local search, a sitemap and robots.txt are in place for crawler access, hero images load at maximum priority, and the site achieves a Lighthouse performance score of 90 or higher.
**Depends on**: Phases 3-8 (all pages must exist)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08
**Success Criteria** (what must be TRUE):
  1. Viewing page source for each of the six pages shows a unique `<title>` and `<meta name="description">` containing the page topic, "Fergus, Ontario", and a relevant keyword
  2. Each page's `<head>` includes Open Graph `og:title`, `og:description`, `og:url`, and `og:image` tags populated with page-specific content
  3. Visiting `/sitemap.xml` returns a valid XML sitemap listing all six pages with their canonical URLs
  4. Visiting `/robots.txt` returns a valid robots file allowing all crawlers and referencing the sitemap
  5. Running Lighthouse on the deployed production URL returns a Performance score of 90 or higher on desktop and 80 or higher on mobile
**Plans**: TBD

Plans:
- [ ] 09-01: Per-page metadata exports and Open Graph tags for all six pages
- [ ] 09-02: Sitemap.ts, robots.ts, hero image priority flags, image sizes props, and Lighthouse audit

### Phase 10: Accessibility, Responsiveness, and Launch Polish
**Goal**: Every user, regardless of their device, connection, or ability, can use the site without barriers — interactive elements are keyboard-navigable with visible focus states, icon-only buttons are labelled for screen readers, color contrast meets WCAG AA, the gallery lightbox traps focus correctly, users who prefer reduced motion see no animations, and every layout is genuinely polished on phone screens.
**Depends on**: Phases 3-9 (all pages and SEO must be complete)
**Requirements**: A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05, RESP-01, RESP-02, RESP-03, RESP-04
**Success Criteria** (what must be TRUE):
  1. Pressing Tab through any page shows a clearly visible focus ring on every interactive element (buttons, links, inputs, carousel controls, filter tabs)
  2. All icon-only buttons (hamburger, drawer close, social links, back-to-top, lightbox arrows) have an `aria-label` that screen reader tools announce correctly
  3. Checking foreground-to-background color contrast for all text on the site shows a minimum 4.5:1 ratio for normal text and 3:1 for large/bold text
  4. Setting the OS or browser to "Reduce Motion" causes all scroll animations and page transitions to be skipped or reduced to opacity-only fades — no movement
  5. Viewing the site on a 375px-wide phone screen shows every section looking intentionally designed: no horizontal scroll, no overflowing content, no tiny tap targets — touch targets measure at least 44px
**Plans**: TBD

Plans:
- [ ] 10-01: Focus states, ARIA labels, and color contrast audit across all pages
- [ ] 10-02: Reduced motion support, mobile polish audit, and touch target verification

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Design System | 3/3 | Complete | 2026-02-19 |
| 2. Layout Chrome | 3/3 | Complete | 2026-02-19 |
| 3. Homepage | 3/3 | Complete | 2026-02-19 |
| 4. About Page | 2/2 | Complete | 2026-02-19 |
| 5. Services Page | 0/2 | Not started | - |
| 6. Products Page | 0/2 | Not started | - |
| 7. Gallery Page | 0/2 | Complete    | 2026-02-20 |
| 7.1 Integration Fixes | 0/1 | Not started | - |
| 8. Contact Page | 0/2 | Not started | - |
| 9. SEO and Performance | 0/2 | Not started | - |
| 10. Accessibility, Responsiveness, and Launch Polish | 0/2 | Not started | - |
