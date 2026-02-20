# Yard Weasels Inc. (YWI) — Website

## What This Is

A premium, production-ready 6-page marketing website for Yard Weasels Inc., a landscaping company based in Fergus, Ontario. Built with Next.js 16, Tailwind v4, and Framer Motion — featuring earthy luxury design (forest green, cream, terracotta), editorial typography, cinematic scroll animations, an interactive Material Calculator, filterable gallery with keyboard-navigable lightbox, validated contact form, per-page SEO with Open Graph, and WCAG AA accessibility. The site serves residential, commercial, and municipal clients and showcases their full range of services.

## Core Value

When someone lands on this site, they immediately think "these people are serious professionals" — the design quality and attention to detail must communicate trust, craftsmanship, and premium service before a single word is read.

## Requirements

### Validated

- ✓ 6-page website: Home, About, Services, Products, Gallery, Contact — v1.0
- ✓ Premium "earthy luxury" visual design — deep forest greens, warm cream, terracotta accents — v1.0
- ✓ Editorial typography pairing (DM Serif Display + Plus Jakarta Sans) — v1.0
- ✓ Full-viewport hero sections with parallax, grain texture overlays, scroll-triggered animations — v1.0
- ✓ Sticky nav with blur-on-scroll, mobile hamburger drawer, phone number + CTA in header — v1.0
- ✓ Homepage: hero, services preview, about teaser, products banner, project showcase, testimonials, CTA — v1.0
- ✓ About page: company story, values grid, team section, "Why Choose YWI" differentiators — v1.0
- ✓ Services page: 6 detailed service cards with individual descriptions and CTAs — v1.0
- ✓ Products page: 7-category grid + interactive Material Calculator with validation — v1.0
- ✓ Gallery page: filterable masonry grid with lightbox, keyboard nav, focus trap — v1.0
- ✓ Contact page: validated form with success state + info panel + map placeholder — v1.0
- ✓ Multi-column footer with office + retail yard addresses, phone, hours, social icons — v1.0
- ✓ Framer Motion scroll-triggered animations on all sections — v1.0
- ✓ Smooth page transitions via AnimatePresence — v1.0
- ✓ Image placeholders styled as colored boxes with descriptive labels — v1.0
- ✓ Fully responsive mobile-first design with 44px+ touch targets — v1.0
- ✓ WCAG AA accessibility: focus states, ARIA labels, contrast, reduced motion — v1.0
- ✓ SEO: per-page metadata, Open Graph, sitemap, robots.txt — v1.0
- ✓ Performance: server-rendered pages, minimal client JS, Core Web Vitals optimized — v1.0
- ✓ Deploys to Vercel — v1.0

### Active

(None yet — define with `/gsd:new-milestone`)

### Out of Scope

- Backend form submission / email integration — UI only for now, wired up later
- CMS or admin panel — static content, owner updates through code
- E-commerce / online ordering — products page is informational + "contact for pricing"
- Blog / news section — not validated need yet
- Booking/scheduling system — users call or submit contact form
- Real-time chat widget — JS weight, goes unmanned
- Multi-language support — Fergus is English-speaking market
- User accounts / login — no validated need
- Mobile app — web-first, defer indefinitely

## Context

Shipped v1.0 with 3,287 LOC TypeScript/CSS across 151 files.
Tech stack: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion 12, TypeScript.
All 84 requirements satisfied across 11 phases. 7 tech debt items deferred (see MILESTONES.md).
Image placeholders in place — real project photos from owner needed before launch.

- YWI is an established landscaping company in Fergus, Ontario
- Two locations: office (8146 Sideroad 15) and retail yard (6470 Beatty Line N)
- Services: design/build, maintenance, irrigation, lighting, snow removal, material sales
- Licensed for backflow preventor testing on irrigation systems (differentiator)
- Phone: 519-843-5489 | Hours: Mon-Fri 8:00 AM – 5:00 PM

## Constraints

- **Tech stack**: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion 12, TypeScript — no component libraries, all custom UI
- **Design**: No generic template look — must feel agency-built
- **Typography**: DM Serif Display (headings) + Plus Jakarta Sans (body) via next/font
- **Color palette**: Forest green (#1a3a2a), cream (#f5f0e8), terracotta (#c4703f), charcoal (#2a2a2a), sage (#8fa98a) — all as CSS variables
- **Performance**: Server-rendered where possible, client components only for interactivity
- **Deployment**: Vercel-compatible

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 (upgraded from 14) | React 19, Turbopack, latest features | ✓ Good — stable, fast dev server |
| Tailwind CSS v4 with CSS @theme | Utility-first, v4 requires CSS-based config | ✓ Good — clean token system |
| Framer Motion with LazyMotion strict | Best React animation lib, domAnimation minimizes bundle | ✓ Good — smooth animations, small bundle |
| UI-only contact form | Ship faster, wire up backend later | ✓ Good — deferred to v2 |
| No CMS | Keep it simple for v1 | ✓ Good — owner has dev updating content |
| Google Fonts (DM Serif + Plus Jakarta Sans) | Free, performant, editorial feel | ✓ Good — zero layout shift with next/font |
| src/ directory structure | Cleaner separation (create-next-app default) | ✓ Good |
| Server Components by default | Minimal client JS, only interactive leaves use 'use client' | ✓ Good — only 4 client components |
| FrozenRouter for page transitions | AnimatePresence exit animations need frozen route | ⚠️ Revisit — uses internal Next.js API |
| CSS-only hover overlays (products, gallery) | No client JS for hover effects, always-visible on mobile | ✓ Good |
| Canonical data files (services.ts, products.ts, etc.) | Single source of truth, consumed by multiple components | ✓ Good — Phase 7.1 proved value |

---
*Last updated: 2026-02-20 after v1.0 milestone*
