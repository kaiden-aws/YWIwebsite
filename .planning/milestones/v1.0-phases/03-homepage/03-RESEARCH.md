# Phase 3: Homepage - Research

**Researched:** 2026-02-18
**Domain:** Full-viewport parallax hero, scroll-triggered section animations, testimonial carousel, masonry project grid, CTA patterns (Next.js App Router + Tailwind v4 + Motion)
**Confidence:** HIGH

## Summary

Phase 3 transforms the current placeholder homepage into a premium, agency-quality landing page for Yard Weasels Inc. The page has 7 distinct sections: (1) full-viewport hero with parallax background, grain overlay, headline, CTAs, and scroll indicator, (2) services preview as 3-column cards, (3) about teaser with split layout, (4) products banner showing 7 categories, (5) project showcase as an asymmetric grid, (6) testimonial carousel with auto-advance, and (7) full-width CTA banner.

The technical challenge is implementing all of this while maintaining server-side rendering (page.tsx must remain a Server Component), using the existing `LazyMotion` + `domAnimation` setup (no `domMax` needed), and following the established pattern of thin `'use client'` leaf components. The parallax hero requires `useScroll` + `useTransform` from `motion/react` -- these are standalone hooks that work independently of the LazyMotion feature bundle, so no migration to `domMax` is needed. The testimonial carousel is the only truly interactive component (auto-advance timer + manual controls), requiring its own `'use client'` file. Everything else can use the existing `AnimatedSection` wrapper for scroll-triggered animations.

**Primary recommendation:** Build the page as a Server Component (`page.tsx`) that imports 7 section components. Only 2 need `'use client'`: the hero parallax wrapper (for `useScroll`/`useTransform`) and the testimonial carousel (for `useState`/`useEffect` auto-advance). All other sections are either pure Server Components or wrapped in the existing `AnimatedSection` client wrapper. Create static data files in `lib/data/` for services, products, testimonials, and projects.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Full-viewport hero with parallax background image placeholder and grain texture overlay | `useScroll` + `useTransform` from `motion/react` create parallax Y-translation on `m.div`. `GrainOverlay` component already exists from Phase 1. Hero uses `min-h-screen` for full viewport. `ImagePlaceholder` with custom styling serves as background placeholder. |
| HOME-02 | Hero headline "Crafting Outdoor Spaces That Inspire" in bold serif, subtext about Fergus Ontario | `font-display` class (DM Serif Display) for headline, `font-body` for subtext. Both fonts already configured in layout.tsx and globals.css `@theme`. |
| HOME-03 | Two hero CTAs: "Get a Free Quote" (terracotta) and "View Our Work" (outlined) | Terracotta button: `bg-terracotta hover:bg-terracotta-light text-cream`. Outlined button: `border-2 border-cream text-cream hover:bg-cream/10`. Link to `/contact` and `/gallery` respectively. Pattern matches existing header CTA styling. |
| HOME-04 | Subtle scroll-down indicator animation at bottom of hero | CSS `animate-bounce` from Tailwind on a chevron-down icon (`ChevronDown` from `lucide-react`). Pure CSS animation -- no Motion JS needed. Can be Server Component. |
| HOME-05 | Services preview -- 3-column card layout (Residential, Commercial, Municipal) with image placeholders, hover lift effect | `grid md:grid-cols-3 gap-8` layout. Hover lift via `hover:-translate-y-2 transition-transform`. `ImagePlaceholder` for images. Service data from `lib/data/services.ts`. Wrap each card in `AnimatedSection` with staggered delays for HOME-11. |
| HOME-06 | About teaser -- split layout with image placeholder left, "Rooted in Fergus" headline and intro text right | `grid md:grid-cols-2 gap-12 items-center` layout. `ImagePlaceholder` on left, text content on right. Server Component wrapped in `AnimatedSection`. |
| HOME-07 | Featured products banner -- horizontal scrolling or grid of 7 product categories with retail yard address | `flex overflow-x-auto` for horizontal scroll on mobile, or `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` for responsive grid. Product data from `lib/data/products.ts`. Include `companyInfo.retailYardAddress` from existing `navigation.ts`. |
| HOME-08 | Project showcase -- masonry/asymmetric grid of 4-6 image placeholders with hover overlay showing project name | CSS Grid with `col-span-*` and `row-span-*` for asymmetric layout. Hover overlay: `group` + `group-hover:opacity-100` pattern with absolute-positioned overlay div. `ImagePlaceholder` for images. Static data from `lib/data/projects.ts`. |
| HOME-09 | Testimonials -- carousel with 3 placeholder testimonials, quotation mark decoration, star ratings, auto-advance | `'use client'` `TestimonialCarousel` component with `useState` for active slide index, `useEffect` + `setTimeout` for auto-advance (reset on manual interaction). `AnimatePresence` for slide transitions. Star ratings as inline SVGs or lucide `Star` icon. Testimonial data from `lib/data/testimonials.ts`. |
| HOME-10 | CTA banner -- full-width with background texture, "Ready to Transform Your Outdoor Space?", quote button + phone number | Full-width section with `bg-forest` or `bg-terracotta` + `GrainOverlay`. `companyInfo.phone` and `companyInfo.phoneHref` from existing `navigation.ts`. Link to `/contact`. Server Component. |
| HOME-11 | All homepage sections have staggered scroll-triggered fade-in/slide-up animations | Existing `AnimatedSection` component with `delay` prop handles this. Use `delay={0}`, `delay={0.15}`, `delay={0.3}` pattern for staggered children within each section. Pattern already proven in Phase 1 test page. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` | ^12.34.2 | `useScroll`, `useTransform` for parallax; `AnimatePresence` for carousel transitions; `m` components | Already installed. All hooks available from `motion/react`. Works with existing `LazyMotion` + `domAnimation` setup. |
| `lucide-react` | ^0.574.0 | Icons: `ChevronDown` (scroll indicator), `Star` (ratings), `Phone` (CTA), `ArrowRight` (CTAs) | Already installed from Phase 2. Tree-shakeable. |
| Tailwind CSS v4 | ^4 | Layout utilities, responsive grid, hover effects, scroll-snap | Already configured with brand tokens in `@theme`. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional class composition | Every component with dynamic or conditional styles |
| `@/components/ui/AnimatedSection` | Existing | Scroll-triggered fade-in/slide-up wrapper | Wrap every homepage section for HOME-11 animations |
| `@/components/ui/GrainOverlay` | Existing | Grain texture overlay | Hero section (HOME-01) and CTA banner (HOME-10) |
| `@/components/ui/ImagePlaceholder` | Existing | Styled placeholder boxes for future images | Hero background, service cards, about teaser, project showcase |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `useScroll` + `useTransform` parallax | CSS `background-attachment: fixed` | CSS fixed backgrounds don't work on iOS Safari. Motion hooks provide cross-browser parallax with smooth easing and are already in the bundle. Use Motion. |
| Hand-built testimonial carousel | `embla-carousel-react` or `swiper` | External carousel libraries add 10-30KB. This project has only 3 slides with simple cross-fade. A 30-line `useState` + `AnimatePresence` component is lighter and matches existing animation patterns. Don't add a library. |
| CSS `columns` masonry | CSS Grid with `col-span`/`row-span` | CSS columns flow top-to-bottom (newspaper layout), which is unexpected for a project showcase. CSS Grid with spanning gives intentional control over the asymmetric layout. Use Grid. |
| `domMax` feature bundle | Keep `domAnimation` | `useScroll` and `useTransform` are standalone hooks -- they work independently of the LazyMotion feature bundle. `domAnimation` (which includes `animation`, `exit`, `inView`, `tap`, `focus`, `hover`) is sufficient. `domMax` adds `pan`, `drag`, `layout` which are not needed. Keep `domAnimation`. |

**Installation:**
```bash
# No new dependencies needed
# Everything required is already installed:
# - motion (useScroll, useTransform, AnimatePresence, m)
# - lucide-react (ChevronDown, Star, Phone, ArrowRight)
# - clsx + tailwind-merge (cn utility)
```

## Architecture Patterns

### Recommended Project Structure (Phase 3 additions)
```
src/
├── app/
│   └── page.tsx                    # REPLACE: Server Component assembling all sections
│
├── components/
│   └── sections/                   # NEW directory for page section components
│       ├── HeroSection.tsx         # Server Component shell
│       ├── HeroParallax.tsx        # 'use client' — useScroll + useTransform for parallax
│       ├── ScrollIndicator.tsx     # Server Component — CSS-only bounce animation
│       ├── ServicesPreview.tsx     # Server Component (AnimatedSection wraps children)
│       ├── AboutTeaser.tsx         # Server Component
│       ├── ProductsBanner.tsx      # Server Component
│       ├── ProjectShowcase.tsx     # Server Component
│       ├── TestimonialCarousel.tsx # 'use client' — useState, useEffect, AnimatePresence
│       └── CTABanner.tsx           # Server Component
│
├── lib/
│   └── data/
│       ├── navigation.ts           # EXISTING — companyInfo for phone, addresses
│       ├── services.ts             # NEW — Residential, Commercial, Municipal card data
│       ├── products.ts             # NEW — 7 product categories
│       ├── testimonials.ts         # NEW — 3 placeholder testimonials
│       └── projects.ts             # NEW — 4-6 showcase project entries
```

### Pattern 1: Hero Parallax with useScroll + useTransform
**What:** A `'use client'` wrapper that tracks scroll position of the hero section and translates a background element at a slower rate, creating a parallax depth effect.
**When to use:** Full-viewport hero sections with background images.
**Critical detail:** `useScroll` and `useTransform` are standalone Motion hooks. They create and transform MotionValues which are applied via `style` prop. They do NOT require `domMax` — they work with `domAnimation` or even without `LazyMotion` at all. The `style` prop on `m.div` is always available (it's a React prop passthrough, not a Motion feature).
**Example:**
```typescript
// components/sections/HeroParallax.tsx
'use client'

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Background moves at 50% of scroll speed (parallax)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Parallax background layer */}
      <m.div
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        {/* ImagePlaceholder or future real image goes here */}
      </m.div>
      {/* Foreground content (children) stays static */}
      <div className="relative z-20">
        {children}
      </div>
    </section>
  )
}
```
**Source:** Verified via `motion/react` exports check — `useScroll`, `useTransform` are exported functions. Pattern based on [olivier larose parallax tutorial](https://blog.olivierlarose.com/tutorials/background-image-parallax) and [Motion docs](https://motion.dev/docs/react-scroll-animations).

### Pattern 2: Testimonial Carousel with Auto-Advance
**What:** A `'use client'` component that cycles through testimonials automatically, pausing on user interaction, with `AnimatePresence` for smooth slide transitions.
**When to use:** Any carousel with a small fixed number of items and auto-advance.
**Example:**
```typescript
// components/sections/TestimonialCarousel.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'

interface Testimonial {
  quote: string
  author: string
  role: string
  rating: number
}

export default function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  // Auto-advance every 5 seconds, reset on manual interaction
  useEffect(() => {
    if (isPaused) return
    const timer = setTimeout(next, 5000)
    return () => clearTimeout(timer)
  }, [current, isPaused, next])

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <m.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Testimonial content with star ratings */}
        </m.div>
      </AnimatePresence>
      {/* Dot indicators for manual navigation */}
    </div>
  )
}
```
**Key detail:** Use `setTimeout` (not `setInterval`) with `current` in the dependency array. This resets the timer on every manual navigation. `useCallback` for `next` prevents stale closures.

### Pattern 3: Asymmetric Project Grid with CSS Grid
**What:** A CSS Grid layout using `col-span-*` and `row-span-*` for an intentional asymmetric arrangement, with hover overlays.
**When to use:** Project showcase grids where you want visual variety (not a uniform grid).
**Example:**
```typescript
// Asymmetric grid layout pattern
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {/* Large featured item */}
  <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-lg">
    <ImagePlaceholder label="Featured project" aspectRatio="square" />
    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
      <span className="text-cream font-display text-xl">Project Name</span>
    </div>
  </div>
  {/* Smaller items */}
  <div className="group relative overflow-hidden rounded-lg">
    <ImagePlaceholder label="Project 2" aspectRatio="square" />
    <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
      <span className="text-cream font-display">Project Name</span>
    </div>
  </div>
  {/* ... more items */}
</div>
```

### Pattern 4: Server Component Page with Client Islands
**What:** The homepage `page.tsx` remains a Server Component that imports and composes section components. Only `HeroParallax` and `TestimonialCarousel` need `'use client'`.
**Why:** Server-rendering the full page HTML is a success criterion (SC #5). Keeping `page.tsx` as a Server Component ensures `curl` returns complete HTML, not a loading shell.
**Example:**
```typescript
// app/page.tsx — Server Component (NO 'use client')
import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import AboutTeaser from '@/components/sections/AboutTeaser'
import ProductsBanner from '@/components/sections/ProductsBanner'
import ProjectShowcase from '@/components/sections/ProjectShowcase'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import CTABanner from '@/components/sections/CTABanner'
import { testimonials } from '@/lib/data/testimonials'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesPreview />
      <AboutTeaser />
      <ProductsBanner />
      <ProjectShowcase />
      <TestimonialCarousel testimonials={testimonials} />
      <CTABanner />
    </div>
  )
}
```

### Anti-Patterns to Avoid
- **`'use client'` on page.tsx:** Kills SSR. The page must be a Server Component. Only leaf interactive components get `'use client'`.
- **Using `motion.div` instead of `m.div`:** The project uses `LazyMotion strict` mode. Using `motion.div` will throw an error. Always use `m.div`, `m.button`, etc. from `motion/react`.
- **Adding `domMax` for parallax:** `useScroll` and `useTransform` are standalone hooks that don't require the Motion feature bundle. The `style` prop on `m.div` is always available. Switching to `domMax` would add ~5KB for no benefit.
- **`setInterval` for carousel:** Creates timer drift and doesn't reset on user interaction. Use `setTimeout` with the current slide index in the dependency array.
- **CSS `background-attachment: fixed`:** Broken on iOS Safari, causes paint issues. Use Motion `useScroll` + `useTransform` instead.
- **Adding external carousel library:** 3 slides with simple cross-fade does not justify `embla-carousel` or `swiper`. Hand-build with `AnimatePresence`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered fade-in | Custom Intersection Observer code | Existing `AnimatedSection` component | Already built and tested in Phase 1. Uses `m.div` + `whileInView` with `viewport={{ once: true }}`. |
| Grain texture overlay | Custom canvas/WebGL noise | Existing `GrainOverlay` component | SVG `feTurbulence` filter as data URL. Zero JS. Already built in Phase 1. |
| Image placeholders | Custom placeholder generation | Existing `ImagePlaceholder` component | Accepts `label`, `aspectRatio`, `className`. Already built in Phase 1. |
| Class name merging | Manual string concatenation | Existing `cn()` utility | `clsx` + `tailwind-merge`. Already built in Phase 1. |
| Company contact data | Hardcoded strings in components | Existing `companyInfo` from `navigation.ts` | Phone, addresses, hours, social links already centralized. Import and use. |

**Key insight:** Phase 3 builds heavily on Phase 1 and 2 foundations. Most UI primitives already exist. The new work is composing them into semantic sections with specific content and adding exactly 2 new client interactions (parallax + carousel).

## Common Pitfalls

### Pitfall 1: Parallax Breaking LazyMotion Strict Mode
**What goes wrong:** Using `motion.div` (full Motion component) instead of `m.div` inside a `LazyMotion strict` tree throws an error: "motion component used in strict mode but outside LazyMotion."
**Why it happens:** `LazyMotion strict` mode enforces that only the tree-shakeable `m` component is used, preventing accidental full-bundle imports.
**How to avoid:** Always import `{ m }` from `motion/react` for animated elements. The `useScroll` and `useTransform` hooks are NOT affected by strict mode -- they are standalone and return MotionValues, not components.
**Warning signs:** Build error mentioning "motion" component in strict mode, or runtime error about missing features.

### Pitfall 2: Parallax Target Ref Not Working
**What goes wrong:** `useScroll({ target: ref })` returns `scrollYProgress` stuck at 0 or 1.
**Why it happens:** The `ref` is not attached to the correct element, or the element doesn't have explicit height. `useScroll` needs a `target` element with defined dimensions to calculate progress.
**How to avoid:** Ensure the hero section has `min-h-screen` or explicit height, and the `ref` is attached to the outermost container of the parallax section. The `offset` option `['start start', 'end start']` means: "start tracking when the element's start meets the viewport's start, stop when the element's end meets the viewport's start."
**Warning signs:** Parallax not moving, or moving in wrong direction.

### Pitfall 3: Carousel Timer Stale Closure
**What goes wrong:** Auto-advance timer always navigates to slide 1 instead of incrementing.
**Why it happens:** `setInterval` captures the initial `current` value via closure. If `current` isn't in the dependency array, the callback always sees the stale initial value.
**How to avoid:** Use `setTimeout` (not `setInterval`) inside `useEffect` with `current` in the dependency array. Use `setCurrent(prev => (prev + 1) % length)` functional update to avoid stale state.
**Warning signs:** Carousel always jumps to the same slide instead of advancing sequentially.

### Pitfall 4: Hero Content Hidden Behind Header
**What goes wrong:** The hero section content is partially obscured by the sticky header.
**Why it happens:** The header is `sticky top-0 z-50` (64px on mobile, 80px on desktop). If the hero content starts at `top: 0`, the first ~80px is hidden.
**How to avoid:** The hero is full-viewport (`min-h-screen`) with centered content (`flex items-center justify-center`), so this isn't an issue -- content is vertically centered within the viewport. BUT the scroll indicator at the bottom of the hero needs to account for the footer-area clearance. Test visually.
**Warning signs:** Top of hero text cut off by header.

### Pitfall 5: Horizontal Scroll Products Banner Inaccessible
**What goes wrong:** Horizontal scroll container (`overflow-x-auto`) is not keyboard-navigable and has no visual scroll affordance.
**Why it happens:** Horizontal scroll containers require `tabindex="0"` for keyboard focus and `role="region"` + `aria-label` for screen readers. Without visual indicators, users don't know to scroll.
**How to avoid:** Add `tabindex={0}` and `aria-label="Product categories"` to the scroll container. Consider adding left/right fade-out gradients at edges to hint at scrollable content. On desktop, a grid layout may be better than horizontal scroll.
**Warning signs:** Can't tab to or scroll the products banner with keyboard.

### Pitfall 6: Page Source Not Containing Full HTML (SSR Violation)
**What goes wrong:** Success Criterion #5 requires full page HTML in source. If `page.tsx` is accidentally marked `'use client'`, the page source will be empty or contain a loading skeleton.
**Why it happens:** Adding `'use client'` to page.tsx turns it into a client component. Or importing a client component incorrectly can "infect" the tree.
**How to avoid:** NEVER add `'use client'` to `page.tsx`. Only `HeroParallax.tsx` and `TestimonialCarousel.tsx` should have `'use client'`. Verify by running `curl http://localhost:3000` and checking that section HTML is present.
**Warning signs:** `view-source:` in browser shows empty body or loading state.

## Code Examples

### Scroll-Down Indicator (CSS-only bounce)
```typescript
// components/sections/ScrollIndicator.tsx — Server Component (no 'use client')
import { ChevronDown } from 'lucide-react'

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
      <div className="animate-bounce">
        <ChevronDown className="h-8 w-8 text-cream/60" />
      </div>
    </div>
  )
}
```
**Note:** `animate-bounce` is a built-in Tailwind CSS animation. No Motion JS needed. Server-rendered.

### Star Rating Component
```typescript
// Inline within TestimonialCarousel — no separate file needed for 3 testimonials
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-terracotta' : 'text-charcoal/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
```
**Note:** Inline SVG star is lighter than importing `Star` from lucide-react for a repeated element. `aria-label` for accessibility.

### Quotation Mark Decoration
```typescript
// Decorative quotation mark for testimonial cards
<span className="font-display text-6xl text-terracotta/20 leading-none select-none" aria-hidden="true">
  {'\u201C'}
</span>
```
**Note:** Unicode left double quotation mark `\u201C` in the display font. `aria-hidden="true"` because it's decorative. `select-none` prevents accidental selection.

### Service Card with Hover Lift
```typescript
// Within ServicesPreview section
<div className="group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
  <ImagePlaceholder label="Residential Landscaping" aspectRatio="video" />
  <div className="p-6">
    <h3 className="font-display text-xl text-forest mb-2">Residential</h3>
    <p className="text-charcoal/70 text-sm leading-relaxed">
      Design, build, and maintain beautiful outdoor spaces for your home.
    </p>
    <span className="inline-block mt-4 text-terracotta font-medium text-sm group-hover:translate-x-1 transition-transform">
      Learn More &rarr;
    </span>
  </div>
</div>
```

### Staggered Section Animation (HOME-11)
```typescript
// Pattern for any section with multiple child elements
import AnimatedSection from '@/components/ui/AnimatedSection'

// Parent section
<AnimatedSection className="py-20 px-6">
  <div className="mx-auto max-w-7xl">
    <h2 className="font-display text-3xl md:text-4xl text-forest mb-12">
      Our Services
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      <AnimatedSection delay={0}>
        {/* Card 1 */}
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        {/* Card 2 */}
      </AnimatedSection>
      <AnimatedSection delay={0.3}>
        {/* Card 3 */}
      </AnimatedSection>
    </div>
  </div>
</AnimatedSection>
```
**Note:** This pattern is already used on the current placeholder homepage. Nested `AnimatedSection` components work because each independently uses `whileInView` with `viewport={{ once: true }}`.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package (v12.34.2) | 2024 | Import from `motion/react` not `framer-motion`. Package name changed but API is identical. |
| `useViewportScroll()` | `useScroll()` | Framer Motion v6+ | `useViewportScroll` is deprecated. `useScroll()` (no args) tracks page scroll. `useScroll({ target })` tracks element scroll. |
| CSS `background-attachment: fixed` | Motion `useScroll` + `useTransform` | Ongoing | CSS fixed backgrounds broken on iOS Safari since 2016. Motion-based parallax works everywhere. |
| External carousel libraries (Swiper, Slick) | Hand-built with `AnimatePresence` for small carousels | 2023+ | For 3-5 slide carousels, external libraries are overkill. `AnimatePresence` + `useState` is lighter and more customizable. |
| `motion.div` (full component) | `m.div` (tree-shakeable) | Framer Motion v4+ | `LazyMotion` + `m` components reduce bundle from ~34KB to ~4.6KB. This project uses `strict` mode. |
| CSS `columns` for masonry | CSS Grid with `col-span`/`row-span` | Stable | True CSS masonry (`masonry-template-rows`) is still not standardized. CSS Grid spanning is the reliable approach for asymmetric layouts. |

**Deprecated/outdated:**
- `useViewportScroll()`: Replaced by `useScroll()`. Still exported for backwards compatibility but should not be used.
- `import { m } from 'motion/react-m'`: The Phase 1 research noted this path for TypeScript compatibility, but the actual codebase uses `import { m } from 'motion/react'` which works correctly. Continue using `motion/react`.

## Open Questions

1. **Products banner: horizontal scroll vs grid?**
   - What we know: HOME-07 says "horizontal scrolling or grid of 7 product categories." Both are valid.
   - What's unclear: Which UX pattern is more appropriate for this premium site context.
   - Recommendation: Use responsive grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`) on desktop and `overflow-x-auto flex` on mobile. Grid is more premium-feeling. Horizontal scroll is a mobile fallback. Planner can decide.

2. **Parallax intensity on mobile?**
   - What we know: Parallax effects can be disorienting on small screens and consume GPU resources on low-end mobile devices.
   - What's unclear: Whether to disable or reduce parallax on mobile.
   - Recommendation: Use `useReducedMotion()` from `motion/react` to disable parallax entirely when user prefers reduced motion. On mobile, reduce parallax range (e.g., `['0%', '25%']` instead of `['0%', '50%']`) or keep it subtle. This aligns with A11Y-05 (prefers-reduced-motion support) even though that's Phase 10.

3. **Header interaction with full-viewport hero**
   - What we know: Header is `sticky top-0 z-50`. Hero is `min-h-screen`. The header sits on top of the hero.
   - What's unclear: Should the header start transparent on the homepage and become opaque on scroll (common pattern for hero-first pages)?
   - Recommendation: The header already has scroll-based transparency (`bg-forest/85 backdrop-blur-md` when scrolled, `bg-forest` when not). This works well with the hero. No changes to Phase 2 header needed.

## Sources

### Primary (HIGH confidence)
- `motion/react` package exports verification (runtime check) -- confirmed `useScroll`, `useTransform`, `useSpring`, `useReducedMotion`, `m`, `AnimatePresence`, `domAnimation`, `domMax` all available from `motion/react`
- `domAnimation` feature keys verified: `renderer`, `animation`, `exit`, `inView`, `tap`, `focus`, `hover` -- NO `drag`, `pan`, `layout` (those are `domMax` only)
- Existing codebase analysis: `AnimatedSection`, `GrainOverlay`, `ImagePlaceholder`, `MotionProvider`, `Header`, `Footer`, `navigation.ts` -- all patterns verified by reading source files
- [Motion docs: React scroll animations](https://motion.dev/docs/react-scroll-animations)
- [Motion docs: useScroll](https://motion.dev/docs/react-use-scroll)
- [Motion docs: useTransform](https://motion.dev/docs/react-use-transform)
- [Motion docs: LazyMotion bundle reduction](https://motion.dev/docs/react-reduce-bundle-size)

### Secondary (MEDIUM confidence)
- [Olivier Larose: Background image parallax with Framer Motion](https://blog.olivierlarose.com/tutorials/background-image-parallax) -- Code pattern for `useScroll` + `useTransform` parallax verified against Motion API
- [Samuel Kraft: Spring-based Parallax guide](https://samuelkraft.com/blog/spring-parallax-framer-motion-guide) -- Confirms `useReducedMotion` accessibility pattern
- [Cruip: Masonry Layouts with Tailwind CSS](https://cruip.com/masonry-layouts-with-tailwind-css/) -- CSS Grid vs CSS Columns comparison
- [Tailwind CSS: Animation utilities](https://tailwindcss.com/docs/animation) -- `animate-bounce` for scroll indicator

### Tertiary (LOW confidence)
- CSS native masonry (`masonry-template-rows`) standardization status -- conflicting proposals from different browser vendors, not safe to use in production as of Feb 2026

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. All tools already installed and verified in codebase.
- Architecture: HIGH -- Server Component page + client island pattern is established from Phase 1/2. Section component structure matches ARCHITECTURE.md recommendations.
- Parallax implementation: HIGH -- `useScroll`/`useTransform` exports verified via runtime check. Code pattern verified against multiple tutorials. Works with existing `LazyMotion` + `domAnimation`.
- Carousel implementation: HIGH -- `useState` + `useEffect` + `AnimatePresence` pattern is well-established. No external dependency needed.
- Pitfalls: HIGH -- LazyMotion strict mode behavior verified. Carousel timer patterns well-documented.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (stable — no rapidly changing dependencies)
