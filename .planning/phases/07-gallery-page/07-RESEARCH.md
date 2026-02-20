# Phase 7: Gallery Page - Research

**Researched:** 2026-02-19
**Domain:** Gallery page with filterable masonry grid, hover overlays, lightbox modal with keyboard navigation (Next.js App Router + Tailwind v4 + Motion for React)
**Confidence:** HIGH

## Summary

Phase 7 builds the Gallery page from the existing placeholder stub (`src/app/gallery/page.tsx`) into a full project showcase with four functional layers: (1) a page hero following the established interior hero pattern, (2) filter tabs (All, Residential, Commercial, Hardscaping, Irrigation) that refilter the grid without page reload, (3) a masonry grid of 8-12 project image placeholders with hover overlays showing project name and category, and (4) a lightbox modal that opens on image click with previous/next navigation, keyboard controls (ESC to close, arrow keys to navigate), and focus trapping.

The existing `src/lib/data/projects.ts` already defines a `Project` interface with `id`, `name`, `category` (typed as a union of `'Residential' | 'Commercial' | 'Hardscaping' | 'Irrigation'`), `image`, and `featured` fields. It currently contains 6 projects. This file needs expansion to 8-12 projects to satisfy GALL-01 while preserving backward compatibility with the homepage `ProjectShowcase` component (which uses the same data with a `featured` flag to select items for its grid).

The primary technical challenges in this phase are: (a) smooth filter transitions without flicker, (b) a lightbox modal with proper accessibility (focus trap, keyboard navigation), and (c) a visually interesting masonry layout. The filter transitions and lightbox modal both require `'use client'` components. The critical finding from research is that the project currently uses `LazyMotion` with `domAnimation`, which does NOT include layout animations. For truly smooth position-based filter transitions (where items glide to new positions), the MotionProvider would need to be upgraded to `domMax` (+10kb bundle). However, excellent filter transitions can be achieved using `AnimatePresence` with opacity/scale enter/exit animations (which ARE in `domAnimation`), combined with CSS Grid for the masonry layout. This approach avoids any bundle size increase while delivering smooth, flicker-free transitions.

**Primary recommendation:** Build the Gallery page as a Server Component that imports section components from `components/sections/gallery/`. Use `AnimatePresence` with opacity/scale animations for filter transitions (no `domMax` upgrade needed). Implement the masonry layout using CSS Grid with varied `row-span` values (not CSS `columns`, which would break the filter animation pattern). Build the lightbox as a custom modal with manual focus trapping, keyboard event handlers, and body scroll locking. Expand `projects.ts` to 10 items with balanced category distribution.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| GALL-01 | Filterable masonry grid of 8-12 project image placeholders | Expand existing `projects.ts` from 6 to 10 items. CSS Grid with `grid-auto-rows` and varied `row-span` values creates masonry-like layout. `AnimatePresence` wraps filtered items for enter/exit animations. Each item is a `m.div` with `initial`, `animate`, `exit` props for opacity/scale transitions. |
| GALL-02 | Filter tabs: All, Residential, Commercial, Hardscaping, Irrigation | `useState` holds active filter. Filter tabs are buttons styled as tab bar. Filtering is done client-side by filtering the `projects` array. The category union type `'Residential' \| 'Commercial' \| 'Hardscaping' \| 'Irrigation'` already matches the required filter tabs exactly. "All" shows all projects. |
| GALL-03 | Hover overlay on images showing project name and category | Identical pattern to `ProjectShowcase` and `ProductCategoryGrid`: CSS-only `group`/`group-hover` with `opacity-0 group-hover:opacity-100 transition-opacity`. Always visible on mobile (touch accessibility), hover-reveal on desktop via `md:opacity-0 md:group-hover:opacity-100`. Project data already has `name` and `category` fields. |
| GALL-04 | Lightbox modal on click with prev/next navigation and keyboard support (ESC, arrows) | Custom lightbox component using `AnimatePresence` for modal enter/exit. `useEffect` with `keydown` listener for ESC (close), ArrowLeft (prev), ArrowRight (next). Prev/next buttons rendered inside the modal. State tracks `selectedIndex` into the currently filtered array. No external lightbox library needed -- the project's existing motion patterns (`MobileDrawer`, `BackToTop`) provide the template. |
| GALL-05 | Smooth filter transitions (AnimatePresence, no flicker on filter change) | `AnimatePresence` with `mode="popLayout"` or default `"sync"` mode wraps the filtered grid items. Each item uses `initial={{ opacity: 0, scale: 0.9 }}`, `animate={{ opacity: 1, scale: 1 }}`, `exit={{ opacity: 0, scale: 0.9 }}` for smooth enter/exit. Items must have stable `key={project.id}` so React/Motion correctly identifies which items enter and exit. Staggered entrance delays (`transition={{ delay: index * 0.05 }}`) add visual polish. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 16.1.6 | App Router, Server Components, `Link` for CTAs | Already installed. Gallery route exists at `app/gallery/page.tsx`. |
| `react` | 19.2.3 | `useState` for filter state and lightbox state, `useEffect` for keyboard events, `useCallback` for stable handlers | Already installed. Filter + lightbox are the primary interactive components. |
| `motion` | ^12.34.2 | `AnimatePresence` for filter enter/exit animations and lightbox modal animation, `m` for animated elements | Already installed. Used via `LazyMotion` + `domAnimation`. Filter animations use `AnimatePresence` + opacity/scale (included in `domAnimation`). |
| Tailwind CSS v4 | ^4 | CSS Grid masonry layout, responsive columns, hover overlays, filter tab styling | Already configured with brand tokens in `@theme`. Grid uses `grid-cols-2 md:grid-cols-3` with `row-span` variants. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional class composition | Active filter tab styling, lightbox button states |
| `@/components/ui/AnimatedSection` | Existing | Scroll-triggered fade-in/slide-up wrapper | Wrap the hero and any static sections |
| `@/components/ui/ImagePlaceholder` | Existing | Styled placeholder boxes for project images | Each gallery grid item |
| `@/components/ui/GrainOverlay` | Existing | Grain texture overlay for hero | Gallery hero section |
| `@/lib/data/projects` | Existing | Project array with category, name, image | Gallery grid data source; needs expansion from 6 to 10 items |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid masonry with `row-span` | CSS `columns-*` utility | CSS columns creates true masonry flow (top-to-bottom per column), but breaks when used with `AnimatePresence` filtering because column flow is incompatible with position-based animations. CSS Grid + `row-span` gives masonry-like visual variety while keeping items in a grid that animates properly. |
| `AnimatePresence` opacity/scale | `layout` prop with `domMax` | The `layout` prop creates smoother position-based animations where items glide to new positions. However, it requires upgrading `MotionProvider` from `domAnimation` to `domMax` (+10kb bundle). The opacity/scale approach delivers excellent visual results without any bundle increase. Recommend deferring `domMax` unless the visual quality is insufficient. |
| Custom lightbox | `yet-another-react-lightbox`, `react-image-lightbox` | External libraries add bundle weight and styling constraints. The lightbox requirements are straightforward (prev/next/close/keyboard). The project already has `AnimatePresence` modal patterns (`MobileDrawer`). A custom lightbox is 80-120 lines and fully controllable. |
| External focus trap library (`focus-trap-react`) | Manual focus trap implementation | `focus-trap-react` is a well-tested library, but adds a dependency for a single modal. A manual focus trap using `querySelectorAll('[tabindex], button, a')` and keydown Tab interception is ~20 lines and sufficient for the lightbox's simple DOM (close button, prev button, next button). |
| Masonry with JS layout (`react-masonry-css`) | CSS Grid with varied `row-span` | JS-based masonry libraries add a dependency and use DOM measurement to position items. For image placeholders (which have predictable heights), CSS Grid with pre-assigned `row-span` values achieves the visual variety without any JS overhead. |

**Installation:**
```bash
# No new dependencies needed
# Everything required is already installed:
# - react (useState, useEffect, useCallback, useRef)
# - motion (AnimatePresence, m from motion/react)
# - clsx + tailwind-merge (cn utility)
# - next/link (built-in)
```

## Architecture Patterns

### Recommended Project Structure (Phase 7 additions)
```
src/
├── app/
│   └── gallery/
│       └── page.tsx                    # REPLACE: Server Component assembling gallery sections
│
├── components/
│   └── sections/
│       └── gallery/                    # NEW directory for Gallery page sections
│           ├── GalleryHero.tsx         # Server Component — page hero banner
│           ├── GalleryGrid.tsx         # CLIENT Component — filter tabs + masonry grid + lightbox
│           └── GalleryLightbox.tsx     # CLIENT Component — lightbox modal (child of GalleryGrid)
│
├── lib/
│   └── data/
│       └── projects.ts                # EXPAND: add 4 more projects (6 → 10), preserve existing
```

### Pattern 1: Interior Page Hero (Established in Phase 4/5/6)
**What:** A styled banner section with background image placeholder, colored overlay, headline, and subtext.
**When to use:** All interior pages. Phases 4, 5, and 6 all use this identical pattern.
**Example:**
```typescript
// components/sections/gallery/GalleryHero.tsx — Server Component
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function GalleryHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="Gallery — Completed landscape project showcase"
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Our Work
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          Browse our portfolio of completed residential, commercial, hardscaping,
          and irrigation projects across Centre Wellington.
        </p>
      </div>
    </section>
  )
}
```
**Source:** Direct adaptation of `ProductsHero.tsx`, `ServicesHero.tsx`, and `AboutHero.tsx` patterns verified in codebase.

### Pattern 2: Filterable Grid with AnimatePresence
**What:** A client component managing filter state and rendering a grid of items with animated enter/exit transitions using `AnimatePresence` and the `m` component from `motion/react`.
**When to use:** The gallery masonry grid that refilters on tab click.
**Key design decisions:**
- The filter tabs and grid are a SINGLE `'use client'` component (`GalleryGrid`) because filter state drives grid rendering.
- Filter state is `useState<string>('All')`. Filtering is `projects.filter(p => filter === 'All' || p.category === filter)`.
- Each grid item must have `key={project.id}` (NOT array index) so `AnimatePresence` correctly tracks which items enter/exit.
- Use `AnimatePresence` with default `mode="sync"` -- items animate in and out simultaneously for the snappiest feel.
- Each item uses `m.div` with `initial`, `animate`, `exit` for opacity/scale transitions.
- Stagger entrance delays: `transition={{ delay: index * 0.05 }}` for a cascading reveal effect.
**Example:**
```typescript
// components/sections/gallery/GalleryGrid.tsx — CLIENT Component
'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { projects, type Project } from '@/lib/data/projects'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { cn } from '@/lib/utils/cn'
import GalleryLightbox from './GalleryLightbox'

const FILTERS = ['All', 'Residential', 'Commercial', 'Hardscaping', 'Irrigation'] as const

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
                activeFilter === filter
                  ? 'bg-forest text-cream'
                  : 'bg-sage/20 text-charcoal hover:bg-sage/40'
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          <AnimatePresence mode="sync">
            {filtered.map((project, index) => (
              <m.div
                key={project.id}
                layout={false}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  'group relative overflow-hidden rounded-lg cursor-pointer',
                  project.featured ? 'row-span-2' : 'row-span-1'
                )}
                onClick={() => setLightboxIndex(index)}
              >
                <ImagePlaceholder
                  label={project.image}
                  className="!aspect-auto h-full w-full !rounded-none"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/60 transition-opacity duration-300
                  md:opacity-0 md:group-hover:opacity-100 flex items-end p-4 md:p-6">
                  <div>
                    <span className="text-cream font-display text-lg md:text-xl">
                      {project.name}
                    </span>
                    <span className="text-cream/70 text-sm block">
                      {project.category}
                    </span>
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <GalleryLightbox
          images={filtered}
          selectedIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
          onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null)}
        />
      </div>
    </section>
  )
}
```

### Pattern 3: Lightbox Modal with Keyboard Navigation and Focus Trap
**What:** A modal overlay displaying a full-screen image with close button, prev/next arrows, keyboard controls (ESC, left/right arrows), and focus trapping.
**When to use:** When any gallery image is clicked.
**Key design decisions:**
- The lightbox is a separate component (`GalleryLightbox`) receiving props from `GalleryGrid`. It does NOT need its own `'use client'` directive if it is only imported by a client component.
- Uses `AnimatePresence` for modal enter/exit animation (backdrop fade + content scale/fade).
- Keyboard events handled via `useEffect` with a `keydown` listener on `document`.
- Focus trap implemented manually: on open, store the previously focused element and focus the modal container. On tab, loop focus within modal-focusable elements (close button, prev button, next button). On close, restore focus to the trigger element.
- Body scroll lock: set `document.body.style.overflow = 'hidden'` on open, restore on close.
- Image counter displayed: "3 / 10" format.
**Example:**
```typescript
// components/sections/gallery/GalleryLightbox.tsx
import { useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import type { Project } from '@/lib/data/projects'

interface GalleryLightboxProps {
  images: Project[]
  selectedIndex: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function GalleryLightbox({
  images, selectedIndex, onClose, onPrev, onNext
}: GalleryLightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Keyboard handler
  useEffect(() => {
    if (selectedIndex === null) return

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
        case 'Tab':
          // Focus trap: loop focus within modal
          if (!modalRef.current) return
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [tabindex]:not([tabindex="-1"])'
          )
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onClose, onPrev, onNext])

  // Body scroll lock + focus management
  useEffect(() => {
    if (selectedIndex !== null) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      // Focus the modal after animation
      requestAnimationFrame(() => modalRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  const current = selectedIndex !== null ? images[selectedIndex] : null

  return (
    <AnimatePresence>
      {current && selectedIndex !== null && (
        <m.div
          ref={modalRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`${current.name} — ${current.category}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/90" onClick={onClose} />

          {/* Content */}
          <m.div
            className="relative z-10 w-full max-w-5xl mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close lightbox"
              className="absolute -top-12 right-0 text-cream/80 hover:text-cream p-2"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <ImagePlaceholder
              label={current.image}
              aspectRatio="video"
              className="!rounded-lg w-full"
            />

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-cream font-display text-xl">{current.name}</p>
              <p className="text-cream/60 text-sm">{current.category}</p>
              <p className="text-cream/40 text-xs mt-1">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>

            {/* Prev/Next */}
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12
                text-cream/80 hover:text-cream p-2"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12
                text-cream/80 hover:text-cream p-2"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
```

### Pattern 4: Server Component Page Composition
**What:** The `gallery/page.tsx` is a Server Component (no `'use client'`) that imports and renders section components in order.
**Example:**
```typescript
// app/gallery/page.tsx — Server Component (NO 'use client')
import GalleryHero from '@/components/sections/gallery/GalleryHero'
import GalleryGrid from '@/components/sections/gallery/GalleryGrid'

export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <GalleryGrid />
    </div>
  )
}
```
**Key:** Page uses `<div>` as root wrapper. Root layout owns `<main>`. Client component (`GalleryGrid`) is imported into a Server Component page.

### Pattern 5: Masonry Grid Layout with CSS Grid
**What:** A CSS Grid layout that simulates masonry by using `grid-auto-rows` for a fixed row height and `row-span-2` on selected items to create visual variety.
**When to use:** The gallery grid where items should have varying heights for visual interest.
**Key design decisions:**
- True CSS masonry (via CSS `columns`) is incompatible with `AnimatePresence` animations because column flow removes items from normal document flow.
- CSS Grid with `auto-rows-[200px]` (or similar) creates a regular row grid. Items with `row-span-2` are twice as tall, creating visual variety.
- The `featured` flag on projects already determines which items are "large" -- reuse this for `row-span-2`.
- Responsive: `grid-cols-2 md:grid-cols-3` adjusts column count by viewport (satisfies RESP-04).
**Example:**
```typescript
// Masonry-like CSS Grid
<div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
  {filtered.map(project => (
    <m.div
      key={project.id}
      className={cn(
        'overflow-hidden rounded-lg',
        project.featured ? 'row-span-2' : 'row-span-1'
      )}
    >
      {/* content */}
    </m.div>
  ))}
</div>
```

### Anti-Patterns to Avoid
- **Using `layout` prop with `domAnimation`:** The project's `MotionProvider` uses `LazyMotion features={domAnimation}` which does NOT include layout animations. Using the `layout` prop will silently fail or produce no animation. Either upgrade to `domMax` or use opacity/scale transitions only.
- **Using CSS `columns` for the filterable grid:** CSS columns (`columns-2 md:columns-3`) create a nice masonry flow but are incompatible with `AnimatePresence` because items flow top-to-bottom within columns rather than as individually addressable grid cells. Items cannot animate in/out properly.
- **`'use client'` on page.tsx:** Only `GalleryGrid.tsx` (and its child `GalleryLightbox.tsx`) need `'use client'`. The hero and page.tsx are Server Components.
- **Using array index as key for filtered items:** `key={index}` causes AnimatePresence to fail -- it cannot distinguish which items left and which remained. Always use `key={project.id}`.
- **Forgetting body scroll lock in lightbox:** Without `document.body.style.overflow = 'hidden'`, the page scrolls behind the lightbox modal on mobile.
- **Not restoring focus on lightbox close:** Accessibility requires returning focus to the element that triggered the modal opening.
- **Using `<main>` as root element:** Root layout wraps children in `<main>`. Page components use `<div>`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver | Existing `AnimatedSection` component | Already built. Uses `m.div` + `whileInView`. |
| Image placeholders | Custom placeholder divs | Existing `ImagePlaceholder` component | Supports `label`, `aspectRatio`, `className`. Built in Phase 1. |
| Grain texture overlay | Canvas/WebGL noise | Existing `GrainOverlay` component | SVG `feTurbulence`. Zero JS. Built in Phase 1. |
| Class merging | Manual string concatenation | Existing `cn()` utility | `clsx` + `tailwind-merge`. Built in Phase 1. |
| Modal enter/exit animation | Manual DOM manipulation | `AnimatePresence` from `motion/react` | Already used in `MobileDrawer`, `BackToTop`, `PageTransitionWrapper`. Well-established pattern. |
| Filter transition animation | CSS transitions on display/visibility | `AnimatePresence` from `motion/react` | CSS cannot animate elements being added/removed from DOM. AnimatePresence solves this. |
| Lightbox icons (X, chevrons) | Custom SVGs or emoji | `lucide-react` `X`, `ChevronLeft`, `ChevronRight` | Already installed. Used throughout the project (`MobileDrawer`, `HeaderClient`, etc.). |

**Key insight:** This phase's complexity is concentrated in the interactivity layer (filter + lightbox), but the building blocks already exist in the codebase. The `AnimatePresence` pattern from `MobileDrawer` directly translates to the lightbox. The hover overlay pattern from `ProjectShowcase` and `ProductCategoryGrid` directly translates to gallery items. The new work is wiring these patterns together with filter state management and keyboard accessibility.

## Common Pitfalls

### Pitfall 1: Layout Animations Silently Failing with domAnimation
**What goes wrong:** Developer adds `layout` prop to grid items expecting smooth position animations, but nothing happens because `domAnimation` does not include layout animation support.
**Why it happens:** The `layout` prop requires `domMax` features. With `domAnimation`, it is silently ignored.
**How to avoid:** Do NOT use the `layout` prop unless the `MotionProvider` is upgraded to `domMax`. Use `AnimatePresence` with opacity/scale transitions instead, which are fully supported by `domAnimation`.
**Warning signs:** Items appear/disappear without smooth position transitions; adding `layout` prop has no visible effect.

### Pitfall 2: Filter Animation Flicker from Key Misuse
**What goes wrong:** On filter change, all items flash/flicker instead of smoothly transitioning.
**Why it happens:** Using `key={index}` instead of `key={project.id}` causes React to remount ALL items on every filter change (indices shift when items are removed). AnimatePresence cannot track items properly.
**How to avoid:** Always use `key={project.id}` for items inside `AnimatePresence`. This gives each item a stable identity across re-renders.
**Warning signs:** All items flash simultaneously on filter change; exit animations don't play.

### Pitfall 3: Lightbox Not Trapping Focus
**What goes wrong:** User opens lightbox, presses Tab, and focus escapes to the background page elements (header nav links, other buttons).
**Why it happens:** The lightbox modal does not intercept Tab key events to loop focus within itself.
**How to avoid:** Implement a focus trap: on Tab, check if focus is at the first or last focusable element inside the modal. If so, wrap around. The lightbox has exactly 3 focusable elements (close, prev, next), making the trap straightforward.
**Warning signs:** Tab key moves focus to header or footer while lightbox is open.

### Pitfall 4: Scroll Position Visible Behind Lightbox
**What goes wrong:** On mobile, the page behind the lightbox is scrollable while the modal is open, or the scroll position jumps.
**Why it happens:** Body scroll is not locked when the lightbox opens.
**How to avoid:** Set `document.body.style.overflow = 'hidden'` when the lightbox opens and restore it to `''` when it closes. Use a cleanup function in `useEffect` to ensure restoration even on unmount.
**Warning signs:** Page scrolls behind the lightbox overlay on mobile touch.

### Pitfall 5: Hover Overlay Not Visible on Touch Devices
**What goes wrong:** Mobile users never see the project name and category because the hover overlay requires a mouse.
**Why it happens:** `:hover` is unreliable on touch devices.
**How to avoid:** Use the established mobile-visibility pattern: `md:opacity-0 md:group-hover:opacity-100` makes the overlay always visible on small screens (where touch is primary) and hover-triggered on desktop. This is the same pattern already used by `ProductCategoryGrid`.
**Warning signs:** Mobile users see gallery images with no identifying information.

### Pitfall 6: Breaking Homepage ProjectShowcase
**What goes wrong:** Changes to `projects.ts` break the homepage `ProjectShowcase` component.
**Why it happens:** `ProjectShowcase` imports from the same `projects` array and uses `project.id`, `project.name`, `project.category`, `project.image`, and `project.featured`. Adding or renaming fields, or changing the `category` union type, breaks the homepage.
**How to avoid:** Changes to `projects.ts` must be additive only. New projects can be added to the array. New fields can be added to the interface. The `featured` flag controls which items appear on the homepage. New items should have `featured: false` so the homepage stays unchanged.
**Warning signs:** Homepage ProjectShowcase section breaks or shows unwanted new items.

### Pitfall 7: Lightbox Navigation Out of Bounds
**What goes wrong:** Clicking prev on the first image or next on the last image causes an error or shows undefined.
**Why it happens:** Index goes to -1 or beyond array length without wrapping.
**How to avoid:** Use modular arithmetic for wrapping: `(index - 1 + length) % length` for prev, `(index + 1) % length` for next. This creates a seamless loop.
**Warning signs:** Console error about accessing undefined array element; blank lightbox display.

## Code Examples

### Filter State Management
```typescript
// Filter state drives which projects appear in the grid
const FILTERS = ['All', 'Residential', 'Commercial', 'Hardscaping', 'Irrigation'] as const

const [activeFilter, setActiveFilter] = useState<string>('All')

const filtered = activeFilter === 'All'
  ? projects
  : projects.filter(p => p.category === activeFilter)

// Filter tabs
{FILTERS.map(filter => (
  <button
    key={filter}
    onClick={() => setActiveFilter(filter)}
    className={cn(
      'px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
      activeFilter === filter
        ? 'bg-forest text-cream'
        : 'bg-sage/20 text-charcoal hover:bg-sage/40'
    )}
  >
    {filter}
  </button>
))}
```

### AnimatePresence Filter Animation
```typescript
// Each filtered item animates in/out with opacity and scale
<AnimatePresence mode="sync">
  {filtered.map((project, index) => (
    <m.div
      key={project.id}  // MUST use stable ID, not index
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Grid item content */}
    </m.div>
  ))}
</AnimatePresence>
```

### Keyboard Event Handler for Lightbox
```typescript
// Handles ESC, left arrow, right arrow
useEffect(() => {
  if (selectedIndex === null) return

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        onPrev()
        break
      case 'ArrowRight':
        onNext()
        break
    }
  }

  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [selectedIndex, onClose, onPrev, onNext])
```

### Manual Focus Trap
```typescript
// Focus trap for lightbox modal: loop Tab within close/prev/next buttons
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Tab' && modalRef.current) {
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}
```

### Expanding Projects Data
```typescript
// New projects to add to projects.ts (additive only — do not modify existing 6)
// Goal: 10 total with balanced category distribution
// Existing: 2 Residential, 1 Commercial, 2 Hardscaping, 1 Irrigation
// Adding: 1 Residential, 1 Commercial, 1 Hardscaping, 1 Irrigation

{
  id: 'fergus-garden-redesign',
  name: 'Fergus Garden Redesign',
  category: 'Residential',
  image: 'Project — Full garden redesign with native plantings',
  featured: false,
},
{
  id: 'elora-plaza-maintenance',
  name: 'Elora Plaza Grounds',
  category: 'Commercial',
  image: 'Project — Commercial plaza landscape maintenance',
  featured: false,
},
{
  id: 'outdoor-kitchen-patio',
  name: 'Outdoor Kitchen & Patio',
  category: 'Hardscaping',
  image: 'Project — Outdoor kitchen with stone patio',
  featured: false,
},
{
  id: 'sports-field-irrigation',
  name: 'Sports Field Irrigation System',
  category: 'Irrigation',
  image: 'Project — Sports field sprinkler system installation',
  featured: false,
},
```

### Section Background Alternation
```typescript
// Established background alternation for the Gallery page:
// GalleryHero:   bg-forest    (dark — hero)
// GalleryGrid:   default/cream (light — browsing area, filter tabs, grid)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| External lightbox libraries (PhotoSwipe, Lightbox2) | Custom React lightbox with Motion animations | React ecosystem shift 2022+ | No jQuery dependency. Motion animations match the rest of the site. Full control over UX and accessibility. |
| CSS `columns` masonry | CSS Grid with `row-span` for masonry-like effect | Ongoing — true CSS masonry still not standardized | CSS `columns` has ordering issues (top-to-bottom flow). CSS Grid + `row-span` provides visual variety with natural left-to-right reading order. True CSS masonry (via `masonry-template-rows`) is still behind flags in Firefox only. |
| Framer Motion `layout` prop for filter grids | AnimatePresence opacity/scale for lightweight bundles | Motion v12 optimization | `layout` requires `domMax` bundle. `AnimatePresence` with opacity/scale works with lighter `domAnimation` bundle. The visual difference is position interpolation (smooth glide) vs. crossfade (items fade out/in). Both are professional-quality transitions. |
| JavaScript masonry libraries (Masonry.js, Isotope) | CSS-only layouts | 2020+ | No JS dependency for layout. CSS Grid is performant and sufficient for predictable-height placeholders. JS masonry is only needed for truly variable-height content with unknown dimensions at render time. |

**Deprecated/outdated:**
- `framer-motion` package name: The package is now `motion` (import from `motion/react`). This project already uses the current name.
- CSS Masonry Level 3 (`masonry-template-rows`): Proposed but not standardized. Firefox has experimental support behind a flag. Not usable in production. Apple's WebKit proposed `item-flow` as an alternative in March 2025, but it has no browser implementation yet.

## Open Questions

1. **Should MotionProvider be upgraded to domMax?**
   - What we know: `domAnimation` (~15kb) supports AnimatePresence and opacity/scale transitions. `domMax` (~25kb) adds layout animations and drag gestures.
   - What's unclear: Whether the opacity/scale filter transitions will satisfy the "smooth transition" requirement (GALL-05) or whether position-based layout animations are needed.
   - Recommendation: Start with `domAnimation` (no changes) and use `AnimatePresence` opacity/scale. This delivers flicker-free filter transitions. If visual quality is insufficient during review, upgrade to `domMax` as a targeted change (modify one line in `MotionProvider`). The +10kb cost is modest but should be justified by need.

2. **Lightbox navigation: should it wrap around or stop at ends?**
   - What we know: The requirements specify "previous/next navigation arrows" but don't specify wrap behavior.
   - What's unclear: Whether pressing Next on the last image should wrap to the first, or whether the Next button should be disabled/hidden.
   - Recommendation: Wrap around (circular navigation). This is the standard lightbox behavior and prevents dead-end UX. Users can browse continuously without hitting a wall.

3. **Should gallery items be clickable on mobile or only the lightbox icon?**
   - What we know: GALL-04 says "clicking a gallery image opens a lightbox modal." On mobile, the hover overlay is always visible.
   - What's unclear: Whether tapping anywhere on the card should open the lightbox, or only a specific "expand" icon.
   - Recommendation: Make the entire card clickable (`onClick` on the grid item `m.div`). This is the expected behavior on both desktop and mobile. The cursor changes to `cursor-pointer` to signal interactivity.

4. **How many featured (large) items should the gallery have?**
   - What we know: The `featured` flag on projects determines `row-span-2` (large) vs `row-span-1` (regular). Currently 2 of 6 items are featured. With 10 items, the ratio matters for layout balance.
   - What's unclear: The ideal number of featured items for 10 total in a 3-column grid.
   - Recommendation: Keep 2-3 featured items for visual variety without overwhelming the grid. The existing 2 featured items (Riverside Patio & Pergola, Natural Stone Retaining Wall) plus potentially 1 new one provides good balance.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis: all files in `components/sections/`, `components/ui/`, `lib/data/projects.ts`, `app/gallery/page.tsx`, `app/layout.tsx`, `providers/MotionProvider.tsx` -- patterns verified by reading source files directly
- `projects.ts` verified: contains `Project` interface with `id`, `name`, `category` (union type), `image`, `featured` fields and 6 entries
- `MotionProvider.tsx` verified: uses `LazyMotion features={domAnimation}` with `strict` mode
- `MobileDrawer.tsx` verified: establishes `AnimatePresence` modal pattern with backdrop + panel animations
- `ProductCategoryGrid.tsx` verified: establishes hover overlay pattern with `md:opacity-0 md:group-hover:opacity-100`
- `ProjectShowcase.tsx` verified: establishes gallery grid with hover overlay, imports same `projects` data
- Motion official docs: `domAnimation` includes animations, variants, exit animations, tap/hover/focus gestures; `domMax` adds layout animations and drag gestures ([motion.dev/docs/react-lazy-motion](https://motion.dev/docs/react-lazy-motion), [motion.dev/docs/react-reduce-bundle-size](https://motion.dev/docs/react-reduce-bundle-size))

### Secondary (MEDIUM confidence)
- Motion `AnimatePresence` for filter grids: `mode="sync"` animates items in/out simultaneously; `mode="popLayout"` pairs with `layout` prop for position animations -- verified across [motion.dev/docs](https://motion.dev/docs/react-animate-presence), [Maxime Heckel's blog](https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/), and [StaticMania Next.js guide](https://staticmania.com/blog/animate-layout-in-next.js-using-motions-layout-prop)
- CSS `columns` vs CSS Grid for masonry: CSS columns flow top-to-bottom, not left-to-right, and are incompatible with `AnimatePresence` item animations -- verified across [CSS-Tricks](https://css-tricks.com/making-a-masonry-layout-that-works-today/), [Cruip](https://cruip.com/masonry-layouts-with-tailwind-css/), [Smashing Magazine](https://www.smashingmagazine.com/2025/05/masonry-css-should-grid-evolve-stand-aside-new-module/)
- Focus trap patterns for React modals: manual implementation using `querySelectorAll` and Tab key interception is standard for simple modals -- verified across [UXPin](https://www.uxpin.com/studio/blog/how-to-build-accessible-modals-with-focus-traps/), [FreeCodeCamp](https://www.freecodecamp.org/news/designing-keyboard-accessibility-for-complex-react-experiences/), [Medium/CStech](https://medium.com/cstech/achieving-focus-trapping-in-a-react-modal-component-3f28f596f35b)

### Tertiary (LOW confidence)
- CSS Masonry specification status: Apple proposed `item-flow` in March 2025 as alternative to `masonry-template-rows`. Neither is standardized or available in production browsers. This does not affect our approach (we use CSS Grid + row-span). -- [Smashing Magazine](https://www.smashingmagazine.com/2025/05/masonry-css-should-grid-evolve-stand-aside-new-module/)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. Everything already installed and verified in codebase.
- Architecture: HIGH -- Server Component page + section composition is identical to Phases 4-6. Hero and grid patterns have direct precedents. The lightbox modal follows the established `AnimatePresence` modal pattern from `MobileDrawer`.
- Filter transitions: HIGH -- `AnimatePresence` with opacity/scale is a well-documented pattern within the already-installed `domAnimation` feature set. The only uncertainty is whether `layout` prop (requiring `domMax`) will be needed for visual quality.
- Lightbox implementation: HIGH -- Keyboard events, focus trap, body scroll lock, and AnimatePresence modal animation are standard React patterns with clear implementation paths. The modal has exactly 3 focusable elements, making the focus trap trivial.
- Pitfalls: HIGH -- Critical pitfall (`layout` prop silently failing with `domAnimation`) identified through research. All other pitfalls have established solutions from earlier phases.

**Research date:** 2026-02-19
**Valid until:** 2026-03-19 (stable -- Motion v12 and Tailwind v4 are both mature)
