# Phase 5: Services Page - Research

**Researched:** 2026-02-18
**Domain:** Interior page composition -- service cards grid with detailed descriptions, image placeholders, CTA buttons, and bottom contact prompt (Next.js App Router + Tailwind v4 + Motion)
**Confidence:** HIGH

## Summary

Phase 5 builds the Services page from the existing placeholder stub (`src/app/services/page.tsx`) into a full service showcase with three distinct zones: (1) a page hero with "Our Services" headline following the established interior hero pattern, (2) a grid of six service cards each containing an image placeholder, a detailed description specific to that service, and a "Get a Quote" CTA button, and (3) a bottom CTA section prompting uncertain visitors to make contact with "Not sure what you need? Let's talk." and a link to the contact page.

The existing `src/lib/data/services.ts` data file currently contains only three services (Residential, Commercial, Municipal) with short descriptions used by the homepage `ServicesPreview` component. This file must be expanded to include all six services with significantly richer data -- the three new services are Landscape Design & Build, Irrigation & Landscape Lighting, and Snow Removal. Each service requires a detailed multi-sentence description covering specific offerings. Two services have special content requirements: (a) the Snow Removal card must mention contract, per-visit, and hourly pricing options, and (b) the Irrigation card must mention licensed backflow testing. The data file expansion must preserve backward compatibility with the existing homepage `ServicesPreview` component, which reads from the same `services` array.

The codebase provides every building block needed: `AnimatedSection` for scroll animations, `ImagePlaceholder` for photos, `GrainOverlay` for textured hero, the `cn()` utility, and `Link` from `next/link` for CTAs. No new dependencies are required. The About page (Phase 4) established the interior page pattern perfectly -- Server Component page importing section components from a `components/sections/services/` directory, data stored in `lib/data/services.ts`, and the simple banner hero format with `py-32 md:py-40`.

**Primary recommendation:** Expand `lib/data/services.ts` with all six services and richer type definitions (adding a `details` field for extended descriptions and a `slug` field for anchoring). Build the Services page as a Server Component that imports section components from `components/sections/services/`. Each service card uses `ImagePlaceholder` with `aspectRatio="video"`, a multi-paragraph description, and a terracotta "Get a Quote" `Link` button pointing to `/contact`. No `'use client'` boundaries are needed beyond the existing `AnimatedSection` wrapper.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SERV-01 | Hero with "Our Services" headline | Interior page hero pattern established in Phase 4: `py-32 md:py-40`, forest background, `ImagePlaceholder` as background, `GrainOverlay`, `h1` in `font-display text-cream`. Direct reuse of `AboutHero` pattern with different headline/subtext. |
| SERV-02 | Landscape Design & Build card -- Pavestone, Concrete, Retaining Walls, Pool Scapes, Garden Structures, design consultation to completion | New service entry in expanded `services.ts`. Card shows image placeholder, detailed description mentioning all six sub-services, and "Get a Quote" CTA. This service does NOT exist in current data file -- must be added. |
| SERV-03 | Residential Maintenance card -- lawn care, garden maintenance, seasonal cleanup | Existing "Residential Landscaping" entry needs renaming to "Residential Maintenance" with expanded description covering lawn care, garden maintenance, and seasonal cleanup. Must keep backward compat with homepage `ServicesPreview`. |
| SERV-04 | Commercial Landscaping card -- property maintenance, curb appeal, professional grounds keeping | Existing entry needs expanded description mentioning property maintenance, curb appeal, and professional grounds keeping. |
| SERV-05 | Municipal Projects card -- community-level landscape projects, public spaces | Existing entry needs expanded description covering community-level projects and public spaces. |
| SERV-06 | Irrigation & Landscape Lighting card -- design/install/maintain, licensed backflow testing, programmable controllers, lighting design | New service entry. Card description MUST specifically mention licensed backflow testing (Ontario regulatory credential), plus programmable controllers and lighting design. |
| SERV-07 | Snow Removal card -- lot/drive clearing, salting, walkway shovelling, snow hauling, contract/per-visit/hourly pricing | New service entry. Card description MUST specifically mention all four service types AND all three pricing options (contract, per-visit, hourly). |
| SERV-08 | Each service has image placeholder, detailed description, and "Get a Quote" CTA | Card component pattern: `ImagePlaceholder` top, description body, `Link` button to `/contact` with "Get a Quote" text. Applied uniformly to all six cards. |
| SERV-09 | Bottom CTA: "Not sure what you need? Let's talk." with contact link | Standalone section below the service cards grid. Similar to existing `CTABanner` but with different messaging. Uses forest or terracotta background, `Link` to `/contact`. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 16.1.6 | App Router, Server Components, `Link` for CTA buttons | Already installed. Services route exists at `app/services/page.tsx`. `Link` component used for "Get a Quote" and "Let's talk" CTAs. |
| `motion` | ^12.34.2 | `AnimatedSection` wrapper for scroll-triggered entrance animations | Already installed. Used to stagger service card entrances. No new Motion features needed. |
| `lucide-react` | ^0.574.0 | Optional decorative icons on service cards or section headers | Already installed. Not strictly required for this phase but available if cards benefit from category icons. |
| Tailwind CSS v4 | ^4 | Layout grid, responsive design, spacing, brand colors | Already configured with brand tokens in `@theme`. Grid layout for service cards. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional class composition | Any component with conditional or merged styles |
| `@/components/ui/AnimatedSection` | Existing | Scroll-triggered fade-in/slide-up wrapper | Wrap service cards and sections for staggered entrance animations |
| `@/components/ui/ImagePlaceholder` | Existing | Styled placeholder boxes for future service photos | Each service card image, hero background |
| `@/components/ui/GrainOverlay` | Existing | Grain texture overlay for visual depth | Hero section |
| `next/link` | Built-in | Client-side navigation for CTA buttons | "Get a Quote" buttons on each card, "Let's talk" link in bottom CTA |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Single `services.ts` expanded with all data | Separate `servicesPage.ts` data file | Single file is the project convention (`services.ts`, `products.ts`, `about.ts`). Adding a second data file for the same domain creates confusion. Use one file with richer types. |
| Responsive CSS Grid for service cards | Flexbox wrap layout | Grid gives precise column control (1 col mobile, 2 col tablet, 3 col desktop). Flexbox is less predictable with 6 items. Use Grid. |
| `Link` component for CTAs | `<a>` tags | `Link` enables client-side navigation and prefetching. All CTA destinations are internal routes (`/contact`). Use `Link`. |
| Separate section component files | All sections inline in page.tsx | Separate files match established project pattern from Phase 3 and Phase 4. Use separate files. |
| Adding `slug` field to service data | Using `id` field for anchoring | The existing `id` field can serve double duty, but a `slug` field is more explicit for URL anchoring. Either works -- use `id` since it already exists. |

**Installation:**
```bash
# No new dependencies needed
# Everything required is already installed:
# - motion (AnimatedSection uses m.div)
# - lucide-react (available for optional icons)
# - clsx + tailwind-merge (cn utility)
# - next/link (built-in)
```

## Architecture Patterns

### Recommended Project Structure (Phase 5 additions)
```
src/
├── app/
│   └── services/
│       └── page.tsx                    # REPLACE: Server Component assembling services sections
│
├── components/
│   └── sections/
│       └── services/                   # NEW directory for Services page sections
│           ├── ServicesHero.tsx         # Server Component — page hero banner
│           ├── ServiceCardGrid.tsx      # Server Component — grid of 6 service cards
│           └── ServicesContact.tsx      # Server Component — bottom "Not sure?" CTA
│
├── lib/
│   └── data/
│       └── services.ts                 # EXPAND: add 3 new services, richer descriptions
```

### Pattern 1: Interior Page Hero (Established in Phase 4)
**What:** A styled banner section with background image placeholder, colored overlay, headline, and subtext. No parallax, no scroll indicator.
**When to use:** All interior pages. Phase 4 (About) established this exact pattern.
**Example:**
```typescript
// components/sections/services/ServicesHero.tsx — Server Component
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ServicesHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="Services — YWI crew working on a landscape project"
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          From design and installation to year-round maintenance, we bring
          craftsmanship to every project.
        </p>
      </div>
    </section>
  )
}
```
**Source:** Direct adaptation of `AboutHero.tsx` pattern verified in codebase.

### Pattern 2: Service Card with Image, Description, and CTA
**What:** A card component displaying a service with image placeholder at top, detailed description in body, and a prominent "Get a Quote" CTA button at bottom.
**When to use:** Each of the six service entries on the Services page.
**Key design decisions:**
- Cards should NOT be clickable links (unlike the homepage `ServicesPreview` cards which link to `/services`). On the Services page itself, the card IS the detail view. The CTA button is the only interactive element.
- Each card needs enough vertical space for 2-4 sentences of description. The card layout should use flex-col to push the CTA button to the bottom regardless of description length.
- The "Get a Quote" button links to `/contact` (the contact page is Phase 8, but the link should still work as a route).
**Example:**
```typescript
// Service card pattern within ServiceCardGrid.tsx
import Link from 'next/link'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import AnimatedSection from '@/components/ui/AnimatedSection'

// Single card
<AnimatedSection delay={index * 0.1}>
  <div className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-sm">
    <ImagePlaceholder
      label={service.image}
      aspectRatio="video"
    />
    <div className="flex flex-col flex-1 p-6">
      <h3 className="font-display text-xl md:text-2xl text-forest mb-3">
        {service.title}
      </h3>
      <p className="text-charcoal/70 leading-relaxed mb-6 flex-1">
        {service.description}
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center px-6 py-3 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors w-full sm:w-auto"
      >
        Get a Quote
      </Link>
    </div>
  </div>
</AnimatedSection>
```
**Critical detail:** The `flex flex-col h-full` on the card and `flex-1` on the description paragraph ensures all cards in a row have equal height with the CTA button aligned at the bottom, regardless of description length. This is essential when 6 cards have varying content lengths.

### Pattern 3: Expanded Data File with Backward Compatibility
**What:** Expanding `services.ts` to include all six services with richer descriptions while maintaining the existing `Service` interface that the homepage `ServicesPreview` component depends on.
**Strategy:** Add a `details` field (extended description for the services page) alongside the existing `description` field (short description used by homepage). Add an `imageLabel` field for the services page card image (distinct from the homepage preview image). The homepage `ServicesPreview` continues reading `description` and `image` unchanged.
**Example:**
```typescript
// lib/data/services.ts — expanded
export interface Service {
  id: string
  title: string
  description: string       // SHORT — used by homepage ServicesPreview
  details: string           // LONG — used by Services page cards
  image: string             // Homepage preview image label
  imageLabel: string        // Services page card image label
  href: string              // Link destination from homepage
}

export const services: Service[] = [
  {
    id: 'landscape-design-build',
    title: 'Landscape Design & Build',
    description: 'Custom hardscaping and landscape construction from concept to completion.',
    details: 'From Pavestone patios and concrete work to retaining walls, pool scapes, and garden structures — we handle every stage from design consultation to final installation. Our design-to-build approach means one team manages your entire project seamlessly.',
    image: 'Design & Build — Custom patio installation',
    imageLabel: 'Landscape Design & Build — Pavestone patio with retaining wall',
    href: '/services',
  },
  // ... remaining 5 services
]

// For homepage backward compatibility:
// ServicesPreview uses: service.title, service.description, service.image, service.href
// All those fields remain present on every entry.
```
**Source:** Pattern derived from existing `services.ts` interface and `ServicesPreview.tsx` usage.

### Pattern 4: Bottom CTA Section
**What:** A full-width section below the service cards that addresses visitors who are unsure which service they need, with a warm prompt and a link to the contact page.
**When to use:** Required by SERV-09. Similar to the existing `CTABanner` but with a softer, consultative tone.
**Example:**
```typescript
// components/sections/services/ServicesContact.tsx — Server Component
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ServicesContact() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Not sure what you need?
          </h2>
          <p className="font-display text-xl md:text-2xl text-cream/80 mb-8">
            Let&apos;s talk.
          </p>
          <p className="text-cream/70 mb-10 max-w-xl mx-auto">
            Every property is different. Tell us about your space and we will
            help you figure out the right approach.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </AnimatedSection>
    </section>
  )
}
```
**Source:** Pattern adapted from existing `CTABanner.tsx` which uses the same structure (full-width colored section, `GrainOverlay`, centered text, CTA button).

### Pattern 5: Server Component Page Composition
**What:** The `services/page.tsx` is a Server Component (no `'use client'`) that imports and renders section components in order. Identical to the About page composition pattern.
**Example:**
```typescript
// app/services/page.tsx — Server Component (NO 'use client')
import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceCardGrid from '@/components/sections/services/ServiceCardGrid'
import ServicesContact from '@/components/sections/services/ServicesContact'

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServiceCardGrid />
      <ServicesContact />
    </div>
  )
}
```
**Key:** Page uses `<div>` as root wrapper, not `<section>` or `<main>`. Root layout owns `<main>`.

### Anti-Patterns to Avoid
- **Making service cards clickable links:** On the Services page, the card IS the detail view. Do not wrap cards in `<Link>`. Only the "Get a Quote" button should be interactive. This differs from the homepage `ServicesPreview` where cards link to `/services`.
- **`'use client'` on page.tsx or section components:** No client-side interactivity needed. `AnimatedSection` is the only client component, used as a wrapper.
- **Modifying the existing `ServicesPreview` component:** The homepage component should continue working unchanged. All changes to `services.ts` must be additive (new fields, new entries) without changing the shape of existing fields.
- **Inconsistent CTA button styling:** All "Get a Quote" buttons should use the same terracotta style. The bottom "Contact Us" / "Let's talk" button can use the same style or a variation, but should be visually consistent with other CTA buttons across the site.
- **Using `<main>` as root element:** Root layout wraps children in `<main>`. Page components use `<div>`.
- **Hardcoding service data in components:** Follow the `lib/data/` convention. All service content belongs in `services.ts`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver | Existing `AnimatedSection` component | Already built. Uses `m.div` + `whileInView` with `viewport={{ once: true }}`. |
| Image placeholders | Custom placeholder divs | Existing `ImagePlaceholder` component | Supports `label`, `aspectRatio` (video/square/portrait/wide), `className`. Built in Phase 1. |
| Grain texture overlay | Canvas/WebGL noise | Existing `GrainOverlay` component | SVG `feTurbulence` as data URL. Zero JS. Built in Phase 1. |
| Class merging | Manual string concatenation | Existing `cn()` utility | `clsx` + `tailwind-merge`. Built in Phase 1. |
| Internal navigation links | `<a>` tags for internal routes | `next/link` `Link` component | Enables client-side navigation, prefetching. Built into Next.js. |
| Equal-height cards | JS height equalization | CSS `grid` + `flex-col` + `h-full` | CSS Grid with `h-full` flex-col cards naturally equalizes heights. Zero JS needed. |
| Page transition animation | Custom route change handler | Existing `PageTransitionWrapper` | AnimatePresence + FrozenRouter. Already in root layout. |

**Key insight:** Like Phase 4, this is a composition phase. Every UI primitive exists. The work is: (1) expanding the data file with detailed service content, (2) building a well-designed card layout that handles varying content lengths gracefully, and (3) composing existing building blocks into a cohesive page. The only novel concern is the equal-height card grid with 6 items of varying description length.

## Common Pitfalls

### Pitfall 1: Hero Content Hidden Behind Sticky Header
**What goes wrong:** The hero headline starts at `top: 0` but the sticky header occupies ~64-80px, obscuring content.
**Why it happens:** Interior page heroes don't use `min-h-screen` like the homepage.
**How to avoid:** Use `py-32 md:py-40` on the hero section (128-160px padding), matching the About page hero. This provides generous clearance above the headline.
**Warning signs:** "Our Services" headline partially hidden behind the header on load.

### Pitfall 2: Uneven Card Heights in the Grid
**What goes wrong:** Service cards have varying description lengths (Snow Removal and Irrigation need more text than Residential Maintenance). Cards appear different heights within the same row, breaking visual alignment.
**Why it happens:** Default card layout does not enforce equal height. The CTA button positions vary with content length.
**How to avoid:** Use CSS Grid for the card container (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`). Each card uses `flex flex-col h-full` with `flex-1` on the description paragraph. This ensures: (a) all cards in a row are the same height, and (b) CTA buttons align at the bottom. Verified pattern -- CSS Grid child items stretch to row height by default.
**Warning signs:** "Get a Quote" buttons at different vertical positions across cards in the same row.

### Pitfall 3: Breaking Homepage ServicesPreview
**What goes wrong:** Expanding `services.ts` changes the array shape or content, breaking the homepage `ServicesPreview` component that reads from the same data.
**Why it happens:** `ServicesPreview` maps over the full `services` array and expects exactly 3 items displayed in a 3-column grid.
**How to avoid:** Two strategies: (a) Add a `featured` boolean field and filter in `ServicesPreview` to only show featured services, or (b) Create a separate `servicesPageData` export for the full six services while keeping the existing `services` array for homepage use. Strategy (a) is cleaner because it maintains single-source-of-truth. The homepage `ServicesPreview` would filter to `services.filter(s => s.featured)` or slice to the first 3. Strategy (b) duplicates data. **Use strategy (a): add `featured: boolean` and update `ServicesPreview` to filter.**
**Warning signs:** Homepage shows 6 service cards instead of 3, or service cards have broken layout from new data fields.

### Pitfall 4: Missing Special Content in Snow Removal and Irrigation Cards
**What goes wrong:** The Snow Removal card omits pricing options or the Irrigation card omits backflow testing. These are explicit requirements (SERV-06, SERV-07).
**Why it happens:** Writing generic descriptions that cover the service broadly without mentioning the specific details called out in requirements.
**How to avoid:** Treat these as acceptance criteria. Snow Removal description MUST mention: contract pricing, per-visit pricing, hourly pricing, lot clearing, drive clearing, salting, walkway shovelling, and snow hauling. Irrigation description MUST mention: licensed backflow testing, programmable controllers, and lighting design. Write descriptions with a checklist.
**Warning signs:** Reading the card description and not finding the specific terms from the requirements.

### Pitfall 5: Service Card Grid Not Responsive
**What goes wrong:** Cards display in 3 columns on all viewports, or awkwardly on tablet widths.
**Why it happens:** Using a single `grid-cols-3` without responsive breakpoints.
**How to avoid:** Use responsive grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`. This gives: 1 column on mobile (stacked, full-width cards), 2 columns on tablet (3 rows of 2), 3 columns on desktop (2 rows of 3). Six cards divide evenly into all three layouts.
**Warning signs:** Cards too narrow on tablet or too wide on mobile.

### Pitfall 6: Bottom CTA Visually Merging with Last Service Card Row
**What goes wrong:** The "Not sure what you need?" section feels like part of the cards grid rather than a distinct page section.
**Why it happens:** No visual break between the cards section and the bottom CTA.
**How to avoid:** Use a contrasting background color for the bottom CTA (forest green or terracotta) with `GrainOverlay`, creating a clear visual break from the cards section (which uses cream or white background). The established pattern in the codebase is alternating section backgrounds for rhythm.
**Warning signs:** Bottom CTA blends into the card grid visually.

## Code Examples

### Expanded Services Data File
```typescript
// lib/data/services.ts — full expansion
export interface Service {
  id: string
  title: string
  description: string    // Short — homepage ServicesPreview
  details: string        // Long — Services page cards
  image: string          // Homepage preview image label
  imageLabel: string     // Services page card image label
  href: string           // Link from homepage cards
  featured: boolean      // Show on homepage ServicesPreview
}

export const services: Service[] = [
  {
    id: 'landscape-design-build',
    title: 'Landscape Design & Build',
    description: 'Custom hardscaping and landscape construction from concept to completion.',
    details: 'From Pavestone patios and concrete work to retaining walls, pool scapes, and garden structures — we handle every stage from design consultation to final installation. Our design-to-build approach means one team manages your entire project seamlessly.',
    image: 'Design & Build — Custom patio installation',
    imageLabel: 'Landscape Design & Build — Pavestone patio with retaining wall',
    href: '/services',
    featured: false,
  },
  {
    id: 'residential-maintenance',
    title: 'Residential Maintenance',
    description: 'Year-round lawn care, garden maintenance, and seasonal cleanup tailored to your home.',
    details: 'Keep your property looking its best all year. We provide professional lawn care, garden maintenance, and seasonal cleanup services tailored to the unique needs of your home and landscape.',
    image: 'Residential — Custom garden and patio design',
    imageLabel: 'Residential Maintenance — Well-maintained home garden',
    href: '/services',
    featured: true,
  },
  {
    id: 'commercial-landscaping',
    title: 'Commercial Landscaping',
    description: 'Professional grounds maintenance and landscape installations that elevate your business.',
    details: 'Make a lasting first impression with professional grounds keeping, property maintenance, and landscape installations designed to enhance your business curb appeal and create welcoming commercial spaces.',
    image: 'Commercial — Professional grounds maintenance',
    imageLabel: 'Commercial Landscaping — Professional office grounds',
    href: '/services',
    featured: true,
  },
  {
    id: 'municipal-projects',
    title: 'Municipal Projects',
    description: 'Large-scale public space improvements including parks, streetscapes, and community infrastructure.',
    details: 'We partner with municipalities on community-level landscape projects, from public parks and streetscapes to recreational areas and civic spaces. Our team has the equipment and experience to deliver projects built to endure.',
    image: 'Municipal — Public park and streetscape',
    imageLabel: 'Municipal Projects — Community park landscape',
    href: '/services',
    featured: true,
  },
  {
    id: 'irrigation-lighting',
    title: 'Irrigation & Landscape Lighting',
    description: 'Efficient irrigation systems and landscape lighting designed, installed, and maintained.',
    details: 'We design, install, and maintain irrigation systems with programmable controllers for efficient water management. Our team holds the licence for backflow preventor testing — a credential required under Ontario regulations that many landscapers lack. We also offer landscape lighting design to showcase your property after dark.',
    image: 'Irrigation — Sprinkler system in action',
    imageLabel: 'Irrigation & Lighting — Sprinkler system with landscape lights',
    href: '/services',
    featured: false,
  },
  {
    id: 'snow-removal',
    title: 'Snow Removal',
    description: 'Reliable snow clearing, salting, and hauling services to keep your property safe all winter.',
    details: 'Keep your property safe and accessible all winter. We provide parking lot and driveway clearing, salting, walkway shovelling, and snow hauling services. Flexible pricing options available including contract, per-visit, and hourly rates to suit your needs.',
    image: 'Snow Removal — Parking lot clearing',
    imageLabel: 'Snow Removal — Commercial lot plowing',
    href: '/services',
    featured: false,
  },
]
```
**Critical notes:**
- `featured: true` on the three original services (Residential, Commercial, Municipal) preserves the homepage 3-card layout.
- `details` field contains the rich descriptions for the Services page. Snow Removal mentions all three pricing types. Irrigation mentions licensed backflow testing and programmable controllers.
- `imageLabel` provides services-page-specific image descriptions that differ from the homepage preview `image` labels.

### Updated ServicesPreview Homepage Component
```typescript
// The only change needed in ServicesPreview.tsx:
// Filter to featured services instead of showing all
const featuredServices = services.filter(s => s.featured)

// Then map over featuredServices instead of services:
{featuredServices.map((service, index) => (
  // ... existing card markup unchanged
))}
```
**Source:** Verified `ServicesPreview.tsx` currently maps over entire `services` array. Adding filter preserves existing behavior when array grows from 3 to 6 items.

### Section Padding Convention (From Existing Sections)
```typescript
// Established padding values from Phase 3 and Phase 4:
// Hero:             py-32 md:py-40 px-6 bg-forest
// Content sections: py-20 md:py-28 px-6
// Max-width:        max-w-7xl mx-auto (for grids)
//                   max-w-4xl mx-auto (for prose/centered content)

// Background alternation for visual rhythm:
// Hero:        forest (dark)
// Cards grid:  cream (default body bg) or white
// Bottom CTA:  forest or terracotta (dark, contrasting)
```

### Service Card Equal-Height Grid Pattern
```typescript
// CSS Grid + Flexbox combination for equal-height cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  {services.map((service, index) => (
    <AnimatedSection key={service.id} delay={index * 0.1}>
      <div className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-sm">
        <ImagePlaceholder
          label={service.imageLabel}
          aspectRatio="video"
        />
        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-display text-xl md:text-2xl text-forest mb-3">
            {service.title}
          </h3>
          <p className="text-charcoal/70 leading-relaxed mb-6 flex-1">
            {service.details}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </AnimatedSection>
  ))}
</div>
```
**Key details:**
- `h-full` on card makes it fill Grid cell height
- `flex flex-col` + `flex-1` on description pushes CTA to bottom
- `gap-6 md:gap-8` matches existing spacing patterns
- `rounded-lg overflow-hidden bg-white shadow-sm` matches homepage card styling

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Service cards as clickable links to detail pages | Service cards with full detail and CTA on same page | Single-page per service type | Reduces page count. Visitor sees all info without navigating. CTA is the only action. |
| Short generic service descriptions | Detailed descriptions with specific offerings listed | Content strategy best practice | Helps visitors self-qualify ("is this the service I need?") before contacting. |
| Equal-column layouts with JS height equalization | CSS Grid + Flexbox auto-stretching | CSS Grid widespread support | Zero JS needed. Grid cells auto-stretch. Flexbox handles internal alignment. |
| Separate data files per page | Shared data files with display-context fields | Project convention | `featured` flag and `details` vs `description` fields let one data file serve multiple views. |

**Deprecated/outdated:**
- Nothing specific to this phase. All existing codebase patterns remain current.

## Open Questions

1. **Service card order on the page**
   - What we know: Requirements list services in this order: Design & Build, Residential, Commercial, Municipal, Irrigation, Snow Removal. The homepage shows Residential, Commercial, Municipal.
   - What's unclear: Should the services page follow the requirements order or group by season/type?
   - Recommendation: Follow the requirements order (Design & Build first, Snow Removal last). This puts the highest-value service first and the seasonal service last. The data array order in `services.ts` should reflect the desired display order on the services page.

2. **Homepage ServicesPreview which 3 services to feature**
   - What we know: Currently shows Residential, Commercial, Municipal. Requirements don't specify which 3 should appear on the homepage.
   - What's unclear: Whether to keep the current 3 or swap in Design & Build (arguably the highest-value service).
   - Recommendation: Keep Residential, Commercial, Municipal as featured. These are the three broadest service categories that cover the majority of visitors. Design & Build, Irrigation, and Snow Removal are more specialized. The `featured` flag allows easy changes later.

3. **Service card hover effects**
   - What we know: Homepage `ServicesPreview` cards have `hover:shadow-lg hover:-translate-y-2` lift effects because they are links. Services page cards are NOT links.
   - What's unclear: Should services page cards have any hover effect, or should they be static?
   - Recommendation: Minimal or no hover effect on the card body. The "Get a Quote" button should have its own hover state (bg color change, already handled by `hover:bg-terracotta-light`). Cards can have a subtle `hover:shadow-md` for polish, but the lift effect is unnecessary since cards aren't interactive targets.

4. **Section backgrounds for the Services page**
   - What we know: The page has 3 sections (hero, cards, bottom CTA). The hero uses forest green (established pattern). The bottom CTA needs a dark contrasting background.
   - What's unclear: What background to use for the cards section.
   - Recommendation: Hero (forest) -> Cards (cream/default body bg for maximum card contrast) -> Bottom CTA (forest or terracotta). Using cream for the cards section provides clean contrast for the white card backgrounds. Using forest for the bottom CTA creates visual bookending with the hero.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis: all files in `components/sections/`, `components/sections/about/`, `components/ui/`, `lib/data/`, `app/about/page.tsx`, `app/services/page.tsx`, `app/layout.tsx`, `app/page.tsx` -- patterns verified by reading source files directly
- `ServicesPreview.tsx` verified: maps over full `services` array, uses `service.title`, `service.description`, `service.image`, `service.href`
- `services.ts` verified: contains `Service` interface with `id`, `title`, `description`, `image`, `href` fields and 3 entries
- `ImagePlaceholder` API verified: accepts `label`, `aspectRatio` (video/square/portrait/wide), `className`
- `AnimatedSection` API verified: accepts `children`, `className`, `delay`
- `AboutHero.tsx` verified: establishes interior hero pattern with `py-32 md:py-40`, forest bg, `ImagePlaceholder` background, `GrainOverlay`
- `CTABanner.tsx` verified: establishes full-width CTA pattern with colored bg, `GrainOverlay`, centered text, button
- Section padding convention confirmed across 6+ sections: `py-20 md:py-28 px-6`
- Page composition pattern verified from `app/about/page.tsx`: Server Component importing section components, `<div>` root

### Secondary (MEDIUM confidence)
- CSS Grid equal-height behavior: Grid children stretch to fill row height by default (`align-items: stretch`). This is standard CSS Grid behavior, well-established across all modern browsers.
- `featured` flag pattern: Common data filtering pattern for showing subsets of data in different contexts. No external verification needed -- pure application logic.

### Tertiary (LOW confidence)
- None. This phase relies entirely on established codebase patterns and installed dependencies. No external research was needed.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. Everything already installed and verified in codebase.
- Architecture: HIGH -- Server Component page + section composition pattern is identical to Phase 4 About page. Interior hero, card grid, and CTA section all have direct precedents in the codebase.
- Pitfalls: HIGH -- Card height equalization, data backward compatibility, and responsive grid patterns are well-understood. The special content requirements (Snow Removal pricing, Irrigation backflow) are explicit and verifiable.
- Data expansion: HIGH -- The `services.ts` expansion strategy (add fields + `featured` flag) is straightforward and preserves backward compatibility.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (stable -- no rapidly changing dependencies or patterns)
