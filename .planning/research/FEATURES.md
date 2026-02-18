# Feature Landscape

**Domain:** Premium landscaping / outdoor contractor marketing website
**Researched:** 2026-02-18
**Project:** Yard Weasels Inc. — Fergus, Ontario

---

## Confidence Note

Findings are based on deep knowledge of contractor and landscaping website conventions, UX best practices, and premium agency-built site patterns. Confidence: MEDIUM-HIGH for table stakes (well-established patterns), MEDIUM for differentiators (trend-dependent).

---

## Table Stakes

Features users expect when visiting a professional contractor/landscaping website. Missing any of these causes immediate trust erosion or abandonment.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear phone number in header | Landscaping customers want to call — it's the primary conversion action | Low | Sticky nav, always visible. YWI: 519-843-5489 |
| Services list with descriptions | Users need to confirm "they do what I need" in seconds | Low | Cards with icon/title/short description |
| Project photo gallery | Visual proof of quality — landscaping is a visual purchase decision | Medium | Must be filterable; quality matters more than quantity |
| Contact form | Captures leads outside business hours; fallback for users who won't call | Low | UI-only fine for v1; Name, Phone, Email, Service, Message |
| Business hours + address | Critical for retail materials yard — people plan trips | Low | Footer + Contact page; two locations |
| Mobile-responsive layout | >60% of local search traffic is mobile; Google ranks mobile-first | Medium | Must be genuinely polished, not just functional |
| Testimonials / reviews | Social proof; landscaping is high-trust, high-cost | Low | 3–6 is sufficient; named + project type |
| Service area statement | "Do you serve my area?" is a top-three user question | Low | Fergus, Centre Wellington; mentioned in hero or services |
| Clear calls-to-action | Users need to know next step at every scroll depth | Low | "Get a Free Quote" or "Request an Estimate" CTA |
| Fast page load | Core Web Vitals affect local SEO rank | Medium | Image optimization, lazy loading, minimal JS bundle |
| SSL / HTTPS | Browsers flag non-HTTPS as insecure; kills trust instantly | Low | Vercel provides automatically |
| Semantic HTML + meta tags | Local SEO — how people find the company | Low | Title, description, OG tags per page |
| Navigable structure | Find any page in <2 clicks | Low | Sticky nav, hamburger on mobile |
| Footer with contact info | Standard location for hours, address, phone, social | Low | Multi-column; two addresses |
| Hero with value statement | Above the fold: who, what, where | Low | "Professional landscaping in Fergus, Ontario" |
| About / company story | Establishes trust; "who am I hiring?" | Low | History, values, team |

---

## Differentiators

Features that separate premium sites from generic ones — what makes someone say "wow."

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cinematic scroll animations | Communicates craftsmanship before content is read | Medium | Framer Motion staggered fade/slide; parallax hero |
| Interactive Material Calculator | Unique utility; removes friction for material buyers | High | Products page: material + area → quantity estimate → CTA |
| Filterable gallery with lightbox | Lets prospects self-sort to their project type | Medium | Masonry grid, filter tabs, lightbox for full view |
| Earthy luxury visual identity | Most local landscaping sites are generic; editorial palette = premium positioning | Medium | Forest green / cream / terracotta — differentiated in this market |
| Full-viewport hero with parallax + grain texture | Agency-quality feel above fold; signals serious company in <3 seconds | Medium | Cinematic without video payload |
| Editorial typography pairing | Serif display + refined sans = elevated feel most local landscapers never achieve | Low | DM Serif Display + Plus Jakarta Sans |
| Testimonial carousel | More engaging than static quotes; visual variety on homepage | Low | Auto-advance with manual control; 3–6 testimonials |
| "Why Choose YWI" differentiator section | Explicitly states competitive advantages | Low | Grid on About page; licensed backflow, municipal experience, retail yard |
| Dual-location showcase | Retail materials yard is a real differentiator | Low | Products + Contact page; drives separate traffic intent |
| Smooth page transitions | Reinforces premium feel; app-quality experience | Medium | Framer Motion AnimatePresence |
| Project category showcase on homepage | Signals breadth without requiring navigation | Medium | Residential, commercial, municipal teaser grid |
| Municipal / commercial portfolio callout | Elevates perceived scale; homeowners trust companies that handle complex work | Low | Separate gallery filter tab; mention in services |
| Backflow preventor licensing callout | Legally required in Ontario; differentiates from unlicensed competitors | Low | Under Irrigation & Lighting on Services page |
| Styled image placeholder system | Easy asset swapping when real photos arrive | Low | Colored boxes with descriptive labels; build-phase utility |

---

## Anti-Features

Features to deliberately NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Online booking / scheduling | Landscaping quotes require site visits; nothing is bookable without consultation | Contact form + "Request a Free Estimate" CTA; phone prominent |
| E-commerce / cart for materials | Bulk material pricing is variable; online prices create liability | Calculator → "Contact for pricing" CTA |
| Real-time chat widget | JS weight; goes unmanned; hurts trust more than it helps for trade services | Phone number in sticky header |
| Blog / news section | Requires sustained commitment; empty blog is worse than no blog | Defer to v2 if owner commits to content |
| Customer login / project portal | Over-engineering for v1; no validated need | Contact form + phone for updates |
| Multi-language support | Fergus is English-speaking market; no evidence of demand | Single language |
| Social media feed embeds | Third-party embeds slow page; feeds go stale | Static social icons in footer |
| Price lists / rate sheets | Pricing varies too much; published rates create expectation problems | "Contact for a free quote" consistently |
| Autoplay full-bleed video hero | Heavy bandwidth; kills Core Web Vitals; often feels dated | Parallax still photography + grain texture overlay |
| Cookie consent / GDPR banner | No tracking cookies set; no EU traffic expected | Add only if analytics with cookies introduced later |
| Infinite scroll gallery | Breaks "I've seen all the work" mental model; harder to filter | Masonry grid with filter tabs and defined set |
| CMS / admin panel | Significant build complexity; owner has developer | Static content in v1 |
| Review aggregation widget | Render-blocking; API dependency; styling fights | Curated manual testimonials; link to Google Business |

---

## Feature Dependencies

```
Color palette CSS variables
  → Typography system (font imports + scale)
    → Layout primitives (nav, footer, page shells)
      → Homepage (hero, services preview, testimonials, CTA)
      → About page
      → Services page
      → Products page
          → Material Calculator (requires category data structure)
      → Gallery page
          → Filter system (requires category taxonomy)
              → Lightbox (requires filtered image set)
      → Contact page

Framer Motion setup
  → Scroll-triggered animations (all sections)
  → Page transitions (AnimatePresence at root)
  → Testimonial carousel (client component)

Responsive design system (breakpoints)
  → Mobile nav (hamburger drawer)
  → Masonry grid (responsive columns)
  → Calculator layout (stack on mobile)

SEO / meta layer
  → Per-page metadata
  → Open Graph tags

Image placeholder system
  → All pages (swap-ready for real assets)
```

**Critical path:** Color + Typography → Layout shells → Page content → Interactive components (Calculator, Gallery, Lightbox, Carousel) → Animation layer → SEO layer.

---

## MVP Recommendation

All table stakes features are in-scope and must ship. Build priority:

1. Sticky nav + mobile hamburger — blocks all page navigation testing
2. Homepage (hero + services preview + testimonials + CTA) — core conversion path; validates design direction
3. Gallery with filter + lightbox — most-visited non-home page; visual proof of quality
4. Contact page with form — conversion endpoint
5. Services page — scope confirmation for prospects
6. Material Calculator (Products page) — standout differentiator; unique to this site
7. About page — important but least likely to block leads if it ships last

**Defer with confidence:**
- Backend form submission — UI-only is the explicit brief
- CMS — static content works for v1
- Blog — only if owner commits to content cadence
- Real booking — not appropriate for this service model

---

## Feature Quality Bar: "Feels Like $15K Agency Build"

- **Above the fold**: Oversized serif headline, high-quality image treatment, single clear CTA — no info-dump
- **Whitespace is generous**: Local contractor sites over-pack; premium sites breathe
- **Photography is the hero**: Layout must be designed to showcase real photos; placeholders are properly sized and labeled
- **Typography has hierarchy**: Minimum 3 levels (display, section heading, body)
- **Interactions are intentional**: Hover states on all interactive elements; smooth animations
- **Footer is designed**: Multi-column with nav links, both addresses, phone, hours, social icons
- **Color palette is restrained**: Forest green / cream / terracotta — consistent, not random
- **Mobile is as polished as desktop**: Not just "it works" but "it feels great"
