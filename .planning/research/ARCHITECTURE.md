# Architecture Patterns

**Domain:** Premium multi-page marketing website (landscaping company)
**Project:** Yard Weasels Inc. (YWI) — ywiwebsite
**Researched:** 2026-02-18
**Overall confidence:** HIGH (Next.js App Router docs verified via official source; Framer Motion and Tailwind v4 patterns MEDIUM from training)

---

## Recommended Architecture

A flat App Router layout with a shared root layout, per-page server components, and surgically placed client islands for interactive elements. No route groups needed for a 6-page marketing site — keep the structure shallow and readable.

```
/
├── app/
│   ├── layout.tsx              ← Root layout (Server): <html>, fonts, metadata defaults, Nav, Footer
│   ├── page.tsx                ← Home (Server)
│   ├── about/
│   │   └── page.tsx            ← About (Server)
│   ├── services/
│   │   └── page.tsx            ← Services (Server)
│   ├── products/
│   │   └── page.tsx            ← Products (Server)
│   ├── gallery/
│   │   └── page.tsx            ← Gallery (Server)
│   ├── contact/
│   │   └── page.tsx            ← Contact (Server)
│   ├── not-found.tsx           ← 404 page
│   └── sitemap.ts              ← Generated sitemap for SEO
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             ← Nav shell (Server) + NavClient.tsx (Client: sticky/blur/drawer)
│   │   ├── NavClient.tsx       ← 'use client' — scroll state, mobile drawer toggle
│   │   ├── Footer.tsx          ← Footer (Server)
│   │   └── BackToTop.tsx       ← 'use client' — scroll-position visibility toggle
│   │
│   ├── sections/               ← Page section components (Server unless animated)
│   │   ├── Hero.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── AboutTeaser.tsx
│   │   ├── ProductsBanner.tsx
│   │   ├── ProjectShowcase.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTABanner.tsx
│   │
│   ├── ui/                     ← Reusable primitives
│   │   ├── AnimatedSection.tsx ← 'use client' — Framer Motion scroll-triggered wrapper
│   │   ├── ImagePlaceholder.tsx
│   │   ├── ServiceCard.tsx
│   │   └── SectionHeader.tsx
│   │
│   └── interactive/            ← Feature-level client components (all 'use client')
│       ├── MaterialCalculator.tsx
│       ├── TestimonialCarousel.tsx
│       ├── GalleryGrid.tsx     ← Filter state + lightbox orchestrator
│       ├── GalleryLightbox.tsx ← Portal-based lightbox
│       └── ContactForm.tsx
│
├── lib/
│   ├── data/
│   │   ├── services.ts         ← Static data: service definitions
│   │   ├── products.ts         ← Static data: product categories + calculator config
│   │   ├── testimonials.ts     ← Static data: testimonial copy
│   │   └── gallery.ts          ← Static data: gallery items + filter tags
│   └── utils/
│       ├── cn.ts               ← className merge utility (clsx + tailwind-merge)
│       └── metadata.ts         ← Shared metadata builder helper
│
├── styles/
│   └── globals.css             ← Tailwind v4 @import, CSS custom properties (color tokens, fonts)
│
└── public/
    ├── fonts/                  ← Self-hosted Google Fonts (optional, reduces FOUP)
    └── images/                 ← Placeholder/real assets
```

---

## Component Boundaries

| Component | Type | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `app/layout.tsx` | Server | Root HTML shell, font loading, global providers, Nav + Footer mount | All pages via `children` |
| `app/[page]/page.tsx` | Server | Page-level assembly — imports sections, exports `metadata` | Section components via props |
| `Nav.tsx` | Server | Nav structure, logo, desktop links | `NavClient.tsx` as child |
| `NavClient.tsx` | Client | Scroll detection (blur effect), mobile drawer open/close, active link highlight | None upward; receives nav items as props from Nav.tsx |
| `Footer.tsx` | Server | Static footer columns, addresses, hours, social links, copyright | None |
| `BackToTop.tsx` | Client | Watches scroll position, fades in/out, scrolls to top on click | None |
| `AnimatedSection.tsx` | Client | Framer Motion `whileInView` wrapper for scroll-triggered reveal | Wraps any Server Component children via `children` prop |
| `MaterialCalculator.tsx` | Client | Quantity input, material selection, coverage calculation, result display | `lib/data/products.ts` (imported statically) |
| `TestimonialCarousel.tsx` | Client | Slide state, keyboard nav, swipe gesture, auto-advance | `lib/data/testimonials.ts` (passed as props from Server parent) |
| `GalleryGrid.tsx` | Client | Filter state, filtered item list, triggers lightbox open | `GalleryLightbox.tsx` (renders as sibling/portal) |
| `GalleryLightbox.tsx` | Client | Full-screen image overlay, prev/next, keyboard ESC close | Controlled by GalleryGrid via props |
| `ContactForm.tsx` | Client | Form state, validation, submit handler stub | None external; self-contained |
| `lib/data/*.ts` | Static | Content arrays — services, products, gallery items, testimonials | Imported by Server pages or passed as props |
| `lib/utils/metadata.ts` | Server | `generateMetadata` helper to build per-page Open Graph + title | Used in each `page.tsx` |

**Critical boundary rule:** Server Components cannot import Client Components that use hooks — but Client Components can accept Server-rendered children via `children` prop. Use `AnimatedSection` as a thin client wrapper around server-rendered markup so animation JS stays minimal.

---

## Data Flow

Static marketing site — no database. All data is hardcoded TypeScript arrays in `lib/data/`.

```
lib/data/*.ts (static arrays)
    │
    ├── imported directly by Server page.tsx
    │       └── passed as props to Section components (Server)
    │               └── passed as props to Client interactive components
    │                       (TestimonialCarousel, GalleryGrid)
    │
    └── imported directly by Client components that need full data access
            (MaterialCalculator — needs all product configs client-side)

app/[page]/page.tsx (Server)
    │
    ├── exports metadata object → Next.js injects into <head>
    │
    └── renders Section components
            │
            ├── Static sections → pure Server Components (zero client JS)
            │
            └── Interactive sections → wrapped in AnimatedSection (Client)
                    or replaced with dedicated Client components
                    (MaterialCalculator, TestimonialCarousel, GalleryGrid, ContactForm)

NavClient.tsx (Client)
    │
    └── reads window.scrollY via useEffect → updates local state → applies CSS classes
            (blur, background opacity, active link)

GalleryGrid.tsx (Client)
    ├── local filter state (useState)
    └── derives filtered items from prop array → renders grid items
            └── on item click → sets lightbox open state + active image
                    └── GalleryLightbox renders as portal with AnimatePresence
```

**Key principle:** Pass data down from Server to Client as props. Never fetch inside client components for this static site — all content exists at build time.

---

## Patterns to Follow

### Pattern 1: AnimatedSection Wrapper (Scroll-triggered animations)

A thin `'use client'` wrapper using Framer Motion `whileInView` that accepts static server-rendered children. Keeps HTML server-rendered while adding scroll animation behavior.

```typescript
// components/ui/AnimatedSection.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

const variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
```

### Pattern 2: Nav Shell + Client Island

`Nav.tsx` (Server) renders nav structure and passes link config to `NavClient.tsx` (Client), which owns only scroll detection and drawer behavior.

### Pattern 3: Per-page Metadata Export

Each `page.tsx` exports a `metadata` object with page-specific title, description, Open Graph, and Twitter card data. Built into Next.js App Router — no extra library needed.

### Pattern 4: Static Data as TypeScript Constants

All site content lives in `lib/data/` as typed arrays. No CMS, no API calls.

### Pattern 5: CSS Custom Properties for Design Tokens (Tailwind v4)

All brand colors defined as CSS custom properties in `globals.css`, registered with Tailwind v4 via `@theme`. Color changes are site-wide from one file.

```css
/* styles/globals.css */
@import "tailwindcss";

@theme {
  --color-forest: #1a3a2a;
  --color-cream: #f5f0e8;
  --color-terracotta: #c4703f;
  --color-charcoal: #2a2a2a;
  --color-sage: #8fa98a;

  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why Bad | Instead |
|-------------|---------|---------|
| `'use client'` on page files | Turns entire page into client bundle, destroys CWV and SEO | Keep all `page.tsx` as Server Components; only specific interactive components are Client |
| Framer Motion in Server Components | `motion` uses hooks — build error in Server Components | Always wrap in `'use client'` file; use `AnimatedSection` wrapper pattern |
| Monolithic Client per page | Ships entire section HTML as JS unnecessarily | Surgical client islands — only Calculator, Gallery, Carousel, Form |
| Inline style overrides | Bypasses design system, theme changes require hunting through JSX | Use `@theme` tokens and utility classes (`text-forest`, `bg-cream`) |
| Prop drilling 3+ layers | Rigid components, unclear data relationships | Import from `lib/data/` in closest Server Component, pass minimal data to children |

---

## Build Order (Phase Dependencies)

```
FOUNDATION (build first — everything depends on these)
├── styles/globals.css → CSS tokens (colors, fonts, spacing scale)
├── lib/data/*.ts → all site content arrays
├── lib/utils/cn.ts → className utility (clsx + tailwind-merge)
├── app/layout.tsx → root HTML shell
└── components/ui/AnimatedSection.tsx → required by all animated sections

LAYOUT CHROME (build second — appears on every page)
├── components/layout/Nav.tsx + NavClient.tsx
└── components/layout/Footer.tsx

SHARED UI PRIMITIVES (build third — reused across pages)
├── components/ui/ImagePlaceholder.tsx
├── components/ui/SectionHeader.tsx
└── components/ui/ServiceCard.tsx

HOME PAGE (build fourth — most complex, sets visual language for all other pages)
├── depends on: all foundation + layout chrome + shared UI primitives
└── sections: Hero, ServicesPreview, AboutTeaser, ProductsBanner,
              ProjectShowcase, TestimonialsSection, CTABanner

SECONDARY PAGES + INTERACTIVE COMPONENTS (build in parallel after Home)
├── About → depends on: foundation, layout chrome, shared UI
├── Services → depends on: foundation, layout chrome, ServiceCard
├── Products → depends on: foundation, layout chrome, MaterialCalculator
├── Gallery → depends on: foundation, layout chrome, GalleryGrid + GalleryLightbox
└── Contact → depends on: foundation, layout chrome, ContactForm

SEO + POLISH (build last — requires all pages to exist)
├── Per-page metadata exports in each page.tsx
├── app/sitemap.ts → list of all routes
├── components/layout/BackToTop.tsx → independent, add to root layout
└── Smooth page transitions (AnimatePresence in layout.tsx)
```

**Critical path:** `globals.css` → `lib/data/` → `app/layout.tsx` → Nav/Footer → Home page. Everything else can proceed in parallel after this foundation layer is built and visually verified.
