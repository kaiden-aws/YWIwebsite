# Requirements: Yard Weasels Inc. Website

**Defined:** 2026-02-18
**Core Value:** When someone lands on this site, they immediately think "these people are serious professionals" — the design quality communicates trust, craftsmanship, and premium service before a single word is read.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation & Design System

- [x] **FNDN-01**: Site uses Next.js 15+ with App Router, TypeScript, deployed to Vercel
- [x] **FNDN-02**: Tailwind CSS v4 configured with CSS-based `@theme` block (not v3 syntax)
- [x] **FNDN-03**: Color palette defined as CSS variables: forest green (#1a3a2a), cream (#f5f0e8), terracotta (#c4703f), charcoal (#2a2a2a), sage (#8fa98a)
- [x] **FNDN-04**: Editorial typography pairing loaded via `next/font`: DM Serif Display (headings) + Plus Jakarta Sans (body)
- [x] **FNDN-05**: Framer Motion configured with LazyMotion + domAnimation to minimize bundle size
- [x] **FNDN-06**: Reusable AnimatedSection wrapper for scroll-triggered fade-in/slide-up animations
- [x] **FNDN-07**: Image placeholder system — styled colored boxes with descriptive labels, easy to swap for real photos
- [x] **FNDN-08**: Grain/noise texture overlay available for hero sections
- [x] **FNDN-09**: Spacing system uses generous whitespace with consistent 8px base scale
- [x] **FNDN-10**: All pages server-rendered by default; client components only where interactivity is needed

### Navigation & Layout

- [x] **NAV-01**: Sticky header that becomes translucent with blur effect on scroll
- [x] **NAV-02**: Logo on left (text "YARD WEASELS" + placeholder for mascot image)
- [x] **NAV-03**: Phone number (519-843-5489) visible in header on desktop
- [x] **NAV-04**: "Get a Quote" CTA button in nav (terracotta color)
- [x] **NAV-05**: Mobile hamburger menu with smooth slide-in drawer animation
- [x] **NAV-06**: Active page indicator on current nav link
- [x] **NAV-07**: Multi-column footer: company info, quick links, services, contact info
- [x] **NAV-08**: Footer shows both addresses (office + retail yard), phone, hours (Mon-Fri 8-5), social icons, copyright 2026
- [x] **NAV-09**: Back-to-top button appears after scrolling, smooth scroll to top
- [x] **NAV-10**: Smooth page transitions between routes via AnimatePresence

### Homepage

- [x] **HOME-01**: Full-viewport hero with parallax background image placeholder and grain texture overlay
- [x] **HOME-02**: Hero headline "Crafting Outdoor Spaces That Inspire" in bold serif, subtext about Fergus Ontario
- [x] **HOME-03**: Two hero CTAs: "Get a Free Quote" (terracotta) and "View Our Work" (outlined)
- [x] **HOME-04**: Subtle scroll-down indicator animation at bottom of hero
- [x] **HOME-05**: Services preview — 3-column card layout (Residential, Commercial, Municipal) with image placeholders, hover lift effect
- [x] **HOME-06**: About teaser — split layout with image placeholder left, "Rooted in Fergus" headline and intro text right
- [x] **HOME-07**: Featured products banner — horizontal scrolling or grid of 7 product categories with retail yard address
- [x] **HOME-08**: Project showcase — masonry/asymmetric grid of 4-6 image placeholders with hover overlay showing project name
- [x] **HOME-09**: Testimonials — carousel with 3 placeholder testimonials, quotation mark decoration, star ratings, auto-advance
- [x] **HOME-10**: CTA banner — full-width with background texture, "Ready to Transform Your Outdoor Space?", quote button + phone number
- [x] **HOME-11**: All homepage sections have staggered scroll-triggered fade-in/slide-up animations

### About Page

- [x] **ABOUT-01**: Hero with "Our Story" headline and background image placeholder
- [x] **ABOUT-02**: Company story section — placeholder text about Fergus roots, community, and serving residential/commercial/municipal clients
- [x] **ABOUT-03**: Values grid (Quality, Integrity, Community, Craftsmanship) with decorative icons
- [x] **ABOUT-04**: Team section with placeholder cards (photo, name, role)
- [x] **ABOUT-05**: "Why Choose Yard Weasels" differentiator section: knowledgeable crew, friendly team, top quality products, design-to-build, licensed backflow preventor testing

### Services Page

- [ ] **SERV-01**: Hero with "Our Services" headline
- [ ] **SERV-02**: Landscape Design & Build card — Pavestone, Concrete, Retaining Walls, Pool Scapes, Garden Structures, design consultation to completion
- [ ] **SERV-03**: Residential Maintenance card — lawn care, garden maintenance, seasonal cleanup
- [ ] **SERV-04**: Commercial Landscaping card — property maintenance, curb appeal, professional grounds keeping
- [ ] **SERV-05**: Municipal Projects card — community-level landscape projects, public spaces
- [ ] **SERV-06**: Irrigation & Landscape Lighting card — design/install/maintain systems, licensed backflow testing, programmable controllers, lighting design
- [ ] **SERV-07**: Snow Removal card — lot/drive clearing, salting, walkway shovelling, snow hauling, contract/per-visit/hourly pricing
- [ ] **SERV-08**: Each service has image placeholder, detailed description, and "Get a Quote" CTA
- [ ] **SERV-09**: Bottom CTA: "Not sure what you need? Let's talk." with contact link

### Products Page

- [ ] **PROD-01**: Hero with "Quality Materials, Delivered" headline
- [ ] **PROD-02**: Product category grid — visually rich cards for: Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed
- [ ] **PROD-03**: Each product card has image placeholder, name, brief description, hover reveals "Contact for Pricing"
- [ ] **PROD-04**: Interactive Material Calculator — inputs: Length (ft), Width (ft), Depth (in); output: cubic yards needed
- [ ] **PROD-05**: Calculator has product type dropdown adjusting calculation display
- [ ] **PROD-06**: Calculator has input validation (min/max limits, inline error messages)
- [ ] **PROD-07**: "Request Delivery Quote" CTA below calculator results
- [ ] **PROD-08**: Info section: "Can't find what you're looking for? We source hard-to-find materials."
- [ ] **PROD-09**: Retail yard callout with address (6470 Beatty Line N) and hours

### Gallery Page

- [ ] **GALL-01**: Filterable masonry grid of 8-12 project image placeholders
- [ ] **GALL-02**: Filter tabs: All, Residential, Commercial, Hardscaping, Irrigation
- [ ] **GALL-03**: Hover overlay on images showing project name and category
- [ ] **GALL-04**: Lightbox modal on click with prev/next navigation and keyboard support (ESC, arrows)
- [ ] **GALL-05**: Smooth filter transitions (AnimatePresence, no flicker on filter change)

### Contact Page

- [ ] **CONT-01**: Split layout — contact form left, info panel right
- [ ] **CONT-02**: Form fields: Name, Email, Phone, Service Interest dropdown (Residential, Commercial, Municipal, Snow Removal, Irrigation, Products/Materials, Other), Message
- [ ] **CONT-03**: Polished form styling with floating labels or clean input design
- [ ] **CONT-04**: Client-side form validation with inline error messages
- [ ] **CONT-05**: Form is UI-only (no backend submission) with success state
- [ ] **CONT-06**: Contact info panel: both addresses, phone, hours
- [ ] **CONT-07**: Google Maps placeholder (styled map area or iframe placeholder)
- [ ] **CONT-08**: Bottom section: "Prefer to talk? Call us directly at 519-843-5489"

### SEO & Performance

- [ ] **SEO-01**: Per-page metadata exports with title, description, and Open Graph tags
- [ ] **SEO-02**: Location-specific keywords in metadata ("Fergus, Ontario", "Centre Wellington")
- [ ] **SEO-03**: Semantic HTML with proper heading hierarchy (one h1 per page)
- [ ] **SEO-04**: Sitemap generation via `app/sitemap.ts`
- [ ] **SEO-05**: Robots.txt via `app/robots.ts`
- [ ] **SEO-06**: Hero images marked with `priority={true}` for LCP optimization
- [ ] **SEO-07**: All images have alt text placeholders and `sizes` prop for responsive loading
- [ ] **SEO-08**: Core Web Vitals optimized — Lighthouse performance score target 90+

### Accessibility

- [ ] **A11Y-01**: All interactive elements have visible focus states
- [ ] **A11Y-02**: Icon-only buttons have `aria-label` (hamburger, close, social icons, back-to-top)
- [ ] **A11Y-03**: Color contrast meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [ ] **A11Y-04**: Gallery lightbox has focus trap and keyboard navigation
- [ ] **A11Y-05**: Reduced motion support via `prefers-reduced-motion` media query

### Responsiveness

- [ ] **RESP-01**: Mobile-first design — genuinely polished on phone, not just "it works"
- [ ] **RESP-02**: All layouts adapt gracefully across mobile, tablet, and desktop breakpoints
- [ ] **RESP-03**: Touch targets minimum 44px on mobile
- [ ] **RESP-04**: Gallery masonry adjusts column count by viewport width

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Backend & Integration

- **BACK-01**: Contact form submits to email via server action or API route
- **BACK-02**: Form submission confirmation email to user
- **BACK-03**: Google Analytics or Plausible analytics integration
- **BACK-04**: Google Search Console integration and verification

### Content Management

- **CMS-01**: Headless CMS for content editing (Sanity, Payload, or Contentlayer)
- **CMS-02**: Blog / news section with SEO-optimized posts

### Advanced Features

- **ADV-01**: Testimonials pulled from Google Business API
- **ADV-02**: Online booking / consultation scheduling
- **ADV-03**: Cookie consent banner (when analytics added)

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / online ordering | Bulk material pricing is variable; "contact for pricing" is appropriate |
| Real-time chat widget | JS weight; goes unmanned; phone number is primary contact |
| Customer login / project portal | Over-engineering for v1; no validated need |
| Multi-language support | Fergus is English-speaking market |
| Social media feed embeds | Third-party embeds slow page; feeds go stale |
| Price lists / rate sheets | Pricing varies; published rates create expectation problems |
| Autoplay video hero | Heavy bandwidth; kills Core Web Vitals |
| Infinite scroll gallery | Breaks "I've seen all work" mental model |
| Mobile app | Web-first; defer indefinitely |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FNDN-01 | Phase 1 | Complete |
| FNDN-02 | Phase 1 | Complete |
| FNDN-03 | Phase 1 | Complete |
| FNDN-04 | Phase 1 | Complete |
| FNDN-05 | Phase 1 | Complete |
| FNDN-06 | Phase 1 | Complete |
| FNDN-07 | Phase 1 | Complete |
| FNDN-08 | Phase 1 | Complete |
| FNDN-09 | Phase 1 | Complete |
| FNDN-10 | Phase 1 | Complete |
| NAV-01 | Phase 2 | Complete |
| NAV-02 | Phase 2 | Complete |
| NAV-03 | Phase 2 | Complete |
| NAV-04 | Phase 2 | Complete |
| NAV-05 | Phase 2 | Complete |
| NAV-06 | Phase 2 | Complete |
| NAV-07 | Phase 2 | Complete |
| NAV-08 | Phase 2 | Complete |
| NAV-09 | Phase 2 | Complete |
| NAV-10 | Phase 2 | Complete |
| HOME-01 | Phase 3 | Complete |
| HOME-02 | Phase 3 | Complete |
| HOME-03 | Phase 3 | Complete |
| HOME-04 | Phase 3 | Complete |
| HOME-05 | Phase 3 | Complete |
| HOME-06 | Phase 3 | Complete |
| HOME-07 | Phase 3 | Complete |
| HOME-08 | Phase 3 | Complete |
| HOME-09 | Phase 3 | Complete |
| HOME-10 | Phase 3 | Complete |
| HOME-11 | Phase 3 | Complete |
| ABOUT-01 | Phase 4 | Complete |
| ABOUT-02 | Phase 4 | Complete |
| ABOUT-03 | Phase 4 | Complete |
| ABOUT-04 | Phase 4 | Complete |
| ABOUT-05 | Phase 4 | Complete |
| SERV-01 | Phase 5 | Pending |
| SERV-02 | Phase 5 | Pending |
| SERV-03 | Phase 5 | Pending |
| SERV-04 | Phase 5 | Pending |
| SERV-05 | Phase 5 | Pending |
| SERV-06 | Phase 5 | Pending |
| SERV-07 | Phase 5 | Pending |
| SERV-08 | Phase 5 | Pending |
| SERV-09 | Phase 5 | Pending |
| PROD-01 | Phase 6 | Pending |
| PROD-02 | Phase 6 | Pending |
| PROD-03 | Phase 6 | Pending |
| PROD-04 | Phase 6 | Pending |
| PROD-05 | Phase 6 | Pending |
| PROD-06 | Phase 6 | Pending |
| PROD-07 | Phase 6 | Pending |
| PROD-08 | Phase 6 | Pending |
| PROD-09 | Phase 6 | Pending |
| GALL-01 | Phase 7 | Pending |
| GALL-02 | Phase 7 | Pending |
| GALL-03 | Phase 7 | Pending |
| GALL-04 | Phase 7 | Pending |
| GALL-05 | Phase 7 | Pending |
| CONT-01 | Phase 8 | Pending |
| CONT-02 | Phase 8 | Pending |
| CONT-03 | Phase 8 | Pending |
| CONT-04 | Phase 8 | Pending |
| CONT-05 | Phase 8 | Pending |
| CONT-06 | Phase 8 | Pending |
| CONT-07 | Phase 8 | Pending |
| CONT-08 | Phase 8 | Pending |
| SEO-01 | Phase 9 | Pending |
| SEO-02 | Phase 9 | Pending |
| SEO-03 | Phase 9 | Pending |
| SEO-04 | Phase 9 | Pending |
| SEO-05 | Phase 9 | Pending |
| SEO-06 | Phase 9 | Pending |
| SEO-07 | Phase 9 | Pending |
| SEO-08 | Phase 9 | Pending |
| A11Y-01 | Phase 10 | Pending |
| A11Y-02 | Phase 10 | Pending |
| A11Y-03 | Phase 10 | Pending |
| A11Y-04 | Phase 10 | Pending |
| A11Y-05 | Phase 10 | Pending |
| RESP-01 | Phase 10 | Pending |
| RESP-02 | Phase 10 | Pending |
| RESP-03 | Phase 10 | Pending |
| RESP-04 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 84 total (note: initial count of 62 in traceability header was incorrect; actual count is 84)
- Mapped to phases: 84
- Unmapped: 0

---
*Requirements defined: 2026-02-18*
*Last updated: 2026-02-18 after roadmap creation — full traceability added*
