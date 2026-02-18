# Yard Weasels Inc. (YWI) — Website

## What This Is

A premium, production-ready multi-page marketing website for Yard Weasels Inc., a landscaping company based in Fergus, Ontario. The site serves residential, commercial, and municipal clients and showcases their full range of services — from landscape design/build to irrigation, snow removal, and a retail materials yard. The design should feel like a $15,000 agency build: earthy luxury aesthetic, editorial typography, cinematic scroll animations, and polished mobile experience.

## Core Value

When someone lands on this site, they immediately think "these people are serious professionals" — the design quality and attention to detail must communicate trust, craftsmanship, and premium service before a single word is read.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 6-page website: Home, About, Services, Products, Gallery, Contact
- [ ] Premium "earthy luxury" visual design — deep forest greens, warm cream, terracotta accents
- [ ] Editorial typography pairing (serif display + refined sans-serif body)
- [ ] Full-viewport hero sections with parallax, grain texture overlays, scroll-triggered animations
- [ ] Sticky nav with blur-on-scroll, mobile hamburger drawer, phone number + CTA in header
- [ ] Homepage: hero, services preview, about teaser, products banner, project showcase, testimonials, CTA
- [ ] About page: company story, values grid, team section, "Why Choose YWI" differentiators
- [ ] Services page: detailed cards for Landscape Design & Build, Residential Maintenance, Commercial, Municipal, Irrigation & Lighting, Snow Removal
- [ ] Products page: category grid (Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed) + interactive Material Calculator
- [ ] Gallery page: filterable masonry grid with lightbox, filter tabs (All, Residential, Commercial, Hardscaping, Irrigation)
- [ ] Contact page: polished form (Name, Email, Phone, Service Interest, Message) + contact info panel + map placeholder
- [ ] Contact form is UI-only (validation + UX, no backend wiring yet)
- [ ] Multi-column footer with office + retail yard addresses, phone, hours, social icons, copyright 2026
- [ ] Framer Motion scroll-triggered animations (staggered fade-in/slide-up) on all sections
- [ ] Smooth page transitions
- [ ] Back-to-top button
- [ ] Image placeholders styled as colored boxes with descriptive labels for easy asset swapping
- [ ] Fully responsive mobile-first design — genuinely polished on phone
- [ ] Accessibility: proper heading hierarchy, focus states, alt text placeholders, sufficient contrast
- [ ] SEO: meta tags, semantic HTML, Open Graph tags per page
- [ ] Performance: lazy loading, minimal JS bundle, Core Web Vitals optimized
- [ ] Deploys to Vercel

### Out of Scope

- Backend form submission / email integration — UI only for now, wired up later
- CMS or admin panel — static content, owner updates through code
- E-commerce / online ordering — products page is informational + "contact for pricing"
- Blog / news section — not in v1
- Booking/scheduling system — users call or submit contact form
- Real-time chat widget
- Multi-language support
- User accounts / login

## Context

- YWI is an established landscaping company in Fergus, Ontario
- They have two locations: office (8146 Sideroad 15) and retail yard (6470 Beatty Line N)
- They serve residential, commercial, and municipal clients
- Services span design/build, maintenance, irrigation, lighting, snow removal, and material sales
- Licensed for backflow preventor testing on irrigation systems (differentiator)
- Owner has existing logo and project/team photos ready to drop into placeholders
- Deploying to Vercel
- Phone: 519-843-5489 | Hours: Mon-Fri 8:00 AM – 5:00 PM

## Constraints

- **Tech stack**: Next.js 14 (App Router), Tailwind CSS v4, Framer Motion, TypeScript — no component libraries, all custom UI
- **Design**: No generic template look, no stock photo vibes, no cookie-cutter layouts — must feel agency-built
- **Typography**: Serif display (DM Serif Display or Playfair Display) + sans-serif body (Plus Jakarta Sans or Outfit) from Google Fonts
- **Color palette**: Forest green (#1a3a2a), cream (#f5f0e8), terracotta (#c4703f), charcoal (#2a2a2a), sage (#8fa98a) — all as CSS variables
- **Performance**: Server-rendered where possible, client components only for interactivity (calculator, carousel, animations)
- **Deployment**: Vercel-compatible

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 14 App Router | Modern React framework, SSR by default, natural Vercel deployment | — Pending |
| Tailwind CSS v4 | Utility-first, fast iteration, built-in responsive | — Pending |
| Framer Motion for animations | Best React animation library, scroll-triggered + page transitions | — Pending |
| UI-only forms | Ship faster, wire up backend later | — Pending |
| No CMS | Keep it simple for v1, owner has dev updating content | — Pending |
| Google Fonts (serif + sans) | Free, performant, editorial feel without licensing issues | — Pending |

---
*Last updated: 2026-02-18 after initialization*
