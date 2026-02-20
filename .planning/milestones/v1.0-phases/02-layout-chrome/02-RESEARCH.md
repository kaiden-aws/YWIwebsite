# Phase 2: Layout Chrome - Research

**Researched:** 2026-02-18
**Domain:** Sticky navigation header, mobile drawer, footer layout, back-to-top button, page transitions, active link detection (Next.js App Router + Tailwind v4 + Motion)
**Confidence:** HIGH

## Summary

Phase 2 wraps every page in shared navigation chrome: a sticky header with scroll-triggered translucent blur, a mobile hamburger drawer, a multi-column footer, a back-to-top button, and smooth page transitions. The architecture follows the "Nav shell (Server) + NavClient island (Client)" pattern established in the project's ARCHITECTURE.md. All interactive behavior (scroll detection, drawer toggle, active link highlighting) lives in thin `'use client'` leaf components while the structural markup stays server-rendered.

The critical technical decisions are: (1) scroll detection via `useEffect` + `window.scrollY` with a simple boolean threshold -- not useScroll from Motion which is heavier than needed, (2) `usePathname` from `next/navigation` for active link detection, (3) `AnimatePresence` from `motion/react` for the mobile drawer slide-in/out animation, (4) page transitions via the FrozenRouter + LayoutTransition pattern using `AnimatePresence` keyed to `useSelectedLayoutSegment`, and (5) `lucide-react` for UI icons (hamburger, close, phone, arrow-up) with inline SVGs for the small number of social media brand icons (since Lucide deprecated brand logos).

**Primary recommendation:** Build the nav as a Server Component shell (`Header.tsx`) that renders the logo, desktop links, phone number, and CTA button as static HTML, then embeds a `HeaderClient.tsx` island that owns scroll state (translucent blur), active link highlighting, and the mobile drawer. The footer is a pure Server Component. The back-to-top button is an independent client island. Page transitions wrap `{children}` in the root layout with a `PageTransitionWrapper` client component using AnimatePresence.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky header that becomes translucent with blur effect on scroll | `useEffect` + `window.scrollY` threshold toggles Tailwind classes: `sticky top-0 z-50` base, then `bg-cream/80 backdrop-blur-md` when scrolled. Transition via `transition-all duration-300`. See Architecture Pattern 1. |
| NAV-02 | Logo on left (text "YARD WEASELS" + placeholder for mascot image) | Static markup in Server Component. Text in `font-display` + small ImagePlaceholder for mascot. Wrapped in `<Link href="/">`. |
| NAV-03 | Phone number (519-843-5489) visible in header on desktop | `<a href="tel:5198435489">` with `hidden md:flex` to show only on desktop. Use `Phone` icon from `lucide-react`. |
| NAV-04 | "Get a Quote" CTA button in nav (terracotta color) | `<Link href="/contact">` styled with `bg-terracotta hover:bg-terracotta-light text-cream` Tailwind classes. Visible at all breakpoints. |
| NAV-05 | Mobile hamburger menu with smooth slide-in drawer animation | `lucide-react` `Menu` and `X` icons for toggle. `AnimatePresence` + `m.div` for slide-in from right. Overlay dismisses on click. `'use client'` component. See Architecture Pattern 3. |
| NAV-06 | Active page indicator on current nav link | `usePathname()` from `next/navigation` compares against link href. Active link gets `border-b-2 border-terracotta` (desktop) or `bg-forest/10 text-forest font-semibold` (mobile drawer). See Architecture Pattern 2. |
| NAV-07 | Multi-column footer: company info, quick links, services, contact info | Pure Server Component. 4-column grid on desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`), stacks on mobile. No client JS needed. |
| NAV-08 | Footer shows both addresses (office + retail yard), phone, hours (Mon-Fri 8-5), social icons, copyright 2026 | Static content in footer columns. Inline SVG components for Facebook/Instagram social icons (Lucide deprecated brand logos). `tel:` link for phone. |
| NAV-09 | Back-to-top button appears after scrolling, smooth scroll to top | Independent `'use client'` component. `useEffect` + scroll listener shows button after 400px scroll. `window.scrollTo({ top: 0, behavior: 'smooth' })`. Animate appearance with `AnimatePresence` + `m.button`. `ArrowUp` icon from `lucide-react`. |
| NAV-10 | Smooth page transitions between routes via AnimatePresence | FrozenRouter + LayoutTransition pattern wrapping `{children}` in root layout. `AnimatePresence mode="wait"` keyed to `useSelectedLayoutSegment`. Simple opacity fade (0 -> 1 -> 0). Uses internal Next.js `LayoutRouterContext`. See Architecture Pattern 4 and Common Pitfalls section. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `motion` | ^12.34.2 | AnimatePresence for drawer/page transitions, m components for animation | Already installed from Phase 1. AnimatePresence works with `domAnimation` (no `domMax` needed). Import `{ AnimatePresence, m }` from `motion/react`. |
| `next/navigation` | bundled | `usePathname`, `useSelectedLayoutSegment` for active link + page transition keying | Official Next.js hooks. Client Components only. No additional install. |
| `lucide-react` | 0.574.0 | UI icons: Menu, X, Phone, ArrowUp, MapPin, Clock, ChevronUp | Tree-shakeable, each icon ~1-2KB. Only ships icons actually imported. React 19 compatible. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Inline SVG components | N/A | Social media brand icons (Facebook, Instagram) | Lucide deprecated brand logos. 2-3 simple SVG path components are lighter than adding `react-icons` as a dependency. |
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional classes | Every component with dynamic styling (scroll state, active link, hover). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `useEffect` scroll listener | `useScroll` from Motion | `useScroll` adds ~2KB and provides `MotionValue` reactive system. Overkill for a boolean "scrolled past threshold" check. Plain `useEffect` is simpler and zero-cost. |
| FrozenRouter page transitions | `next-view-transitions` (View Transitions API) | View Transitions API is experimental in Next.js 16 (`experimental.viewTransition` flag). Browser support limited (no Firefox). FrozenRouter is a known working pattern, albeit using Next.js internals. |
| FrozenRouter page transitions | CSS `@view-transition` only | No JavaScript needed, but requires `experimental.viewTransition` in Next.js config and `<ViewTransition>` from React canary. Not stable. |
| `lucide-react` | `react-icons` | `react-icons` bundles from multiple icon sets (Font Awesome, etc.) but is larger. `lucide-react` is cleaner, more consistent, and already tree-shakeable. |
| `lucide-react` | `@heroicons/react` | Heroicons is excellent but has fewer icons. Lucide covers all needed UI icons (Menu, X, Phone, ArrowUp, MapPin, Clock, Mail). |
| Inline SVG social icons | `react-social-icons` | Adds a dependency for 2-3 icons. Inline SVGs are lighter and fully controllable. |

**Installation:**
```bash
npm install lucide-react
```

No other new dependencies needed -- `motion`, `clsx`, `tailwind-merge` are already installed from Phase 1.

## Architecture Patterns

### Recommended Project Structure (Phase 2 additions)
```
src/
├── app/
│   ├── layout.tsx           # Updated: adds Header, Footer, PageTransitionWrapper
│   ├── page.tsx             # Existing home page (unchanged)
│   ├── about/
│   │   └── page.tsx         # Placeholder — needed for nav link testing
│   ├── services/
│   │   └── page.tsx         # Placeholder — needed for nav link testing
│   ├── products/
│   │   └── page.tsx         # Placeholder — needed for nav link testing
│   ├── gallery/
│   │   └── page.tsx         # Placeholder — needed for nav link testing
│   └── contact/
│       └── page.tsx         # Placeholder — needed for nav link testing
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Server Component — nav shell with logo, links, phone, CTA
│   │   ├── HeaderClient.tsx     # 'use client' — scroll blur, active link, mobile drawer
│   │   ├── MobileDrawer.tsx     # 'use client' — AnimatePresence slide-in drawer
│   │   ├── Footer.tsx           # Server Component — multi-column footer
│   │   ├── BackToTop.tsx        # 'use client' — scroll-triggered back-to-top button
│   │   └── PageTransitionWrapper.tsx  # 'use client' — AnimatePresence page transitions
│   │
│   └── ui/                      # Existing from Phase 1
│       ├── AnimatedSection.tsx
│       ├── ImagePlaceholder.tsx
│       └── GrainOverlay.tsx
│
├── lib/
│   ├── data/
│   │   └── navigation.ts       # Nav link definitions: { label, href }[]
│   └── utils/
│       └── cn.ts                # Existing from Phase 1
│
└── providers/
    └── MotionProvider.tsx       # Existing from Phase 1
```

### Pattern 1: Sticky Header with Scroll-Triggered Blur

**What:** A fixed header that starts opaque and becomes translucent with backdrop blur after the user scrolls past a threshold.
**When to use:** NAV-01 requirement.
**Implementation:**

The header uses `sticky top-0` (not `fixed`) so it participates in document flow. A client component tracks scroll position and toggles classes.

```typescript
// src/components/layout/HeaderClient.tsx
'use client'

import { useState, useEffect } from 'react'

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }
    handleScroll() // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
```

Tailwind classes toggle based on `scrolled` state:
- **Not scrolled:** `bg-forest text-cream` (solid forest green background)
- **Scrolled:** `bg-forest/85 backdrop-blur-md text-cream` (translucent with blur)
- **Transition:** `transition-all duration-300`

**Critical detail:** The `{ passive: true }` option on the scroll listener is essential for performance -- it tells the browser the handler won't call `preventDefault()`, enabling optimized scroll handling.

### Pattern 2: Active Link Detection with usePathname

**What:** Highlight the current page's nav link with a visual indicator.
**When to use:** NAV-06 requirement.
**Implementation:**

```typescript
// Inside HeaderClient.tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'relative py-2 text-sm font-medium transition-colors',
        isActive
          ? 'text-cream after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta'
          : 'text-cream/70 hover:text-cream'
      )}
    >
      {children}
    </Link>
  )
}
```

**Why `usePathname` over `useSelectedLayoutSegment`:** For top-level nav links (`/`, `/about`, `/services`, etc.), `usePathname` provides the full path which is simpler to compare. `useSelectedLayoutSegment` returns only the segment one level below the layout -- useful for nested navigation but unnecessary for flat top-level nav. Use `usePathname` for the header, reserve `useSelectedLayoutSegment` for the page transition key.

**Source:** [Next.js usePathname docs](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

### Pattern 3: Mobile Drawer with AnimatePresence

**What:** A slide-in navigation drawer for mobile that animates in/out smoothly.
**When to use:** NAV-05 requirement.
**Implementation:**

```typescript
// src/components/layout/MobileDrawer.tsx
'use client'

import { AnimatePresence, m } from 'motion/react'
import { X } from 'lucide-react'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-charcoal/50"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <m.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 h-full w-[280px] bg-cream shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-charcoal" />
            </button>
            <nav className="mt-16 px-6">
              {children}
            </nav>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Critical detail:** `AnimatePresence` is imported from `motion/react` (same package as `m`). It is independent of the `domAnimation`/`domMax` feature loading -- `AnimatePresence` works with `domAnimation` which is what our `LazyMotion` provides. Verified by reading the Motion source code: AnimatePresence manages component presence lifecycle and does not depend on specific animation feature bundles.

**Critical detail:** The backdrop `onClick={onClose}` handles the "clicking outside dismisses" requirement. The close button handles explicit dismissal. Both are required by the success criteria.

### Pattern 4: Page Transitions with FrozenRouter

**What:** Smooth opacity fade between pages using AnimatePresence in the root layout.
**When to use:** NAV-10 requirement.
**Implementation:**

```typescript
// src/components/layout/PageTransitionWrapper.tsx
'use client'

import { useContext, useRef, useEffect } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useSelectedLayoutSegment } from 'next/navigation'

function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
    return () => { ref.current = undefined }
  })
  return ref.current
}

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context) || null
  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)
  const changed = segment !== prevSegment && segment !== undefined && prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </m.div>
    </AnimatePresence>
  )
}
```

**Usage in layout.tsx:**
```typescript
// src/app/layout.tsx (updated structure)
<body className="font-body text-charcoal bg-cream antialiased">
  <MotionProvider>
    <Header />
    <PageTransitionWrapper>
      {children}
    </PageTransitionWrapper>
    <Footer />
    <BackToTop />
  </MotionProvider>
</body>
```

**Why `initial={false}`:** Prevents the initial page load from animating in. Only subsequent navigations trigger the transition.

**Source:** [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) -- confirmed working as of Next.js 16.0.7.

### Pattern 5: Back-to-Top Button

**What:** A floating button that appears after scrolling and smoothly scrolls to the top.
**When to use:** NAV-09 requirement.
**Implementation:**

```typescript
// src/components/layout/BackToTop.tsx
'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-forest p-3 text-cream shadow-lg hover:bg-forest-light transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
```

### Pattern 6: Navigation Data Structure

**What:** Centralized nav link definitions used by both desktop and mobile navigation.
**When to use:** Any component rendering nav links.

```typescript
// src/lib/data/navigation.ts
export interface NavItem {
  label: string
  href: string
}

export const navLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const companyInfo = {
  name: 'Yard Weasels Inc.',
  phone: '519-843-5489',
  phoneHref: 'tel:5198435489',
  hours: 'Mon-Fri 8:00 AM - 5:00 PM',
  officeAddress: {
    label: 'Office',
    street: '7357 Wellington Rd 18',
    city: 'Fergus, Ontario',
  },
  retailYardAddress: {
    label: 'Retail Yard',
    street: '6470 Beatty Line N',
    city: 'Fergus, Ontario',
  },
  social: {
    facebook: 'https://facebook.com/yardweasels',
    instagram: 'https://instagram.com/yardweasels',
  },
  copyright: 2026,
} as const
```

**Key insight:** Centralizing this data ensures consistency between header, footer, and future contact page. Addresses, phone number, and hours appear in multiple places and must match.

### Anti-Patterns to Avoid

- **Putting scroll listeners in Server Components:** `useEffect` and `useState` require `'use client'`. Never add them to `Header.tsx` (Server) -- only in `HeaderClient.tsx` (Client).
- **Using `position: fixed` for the header instead of `sticky`:** `fixed` removes the element from document flow, causing content to jump under the header. `sticky top-0` preserves flow.
- **Importing the full `motion` component for animated elements:** Continue using `m` from `motion/react` inside `LazyMotion strict`. The project already enforces this.
- **Adding `'use client'` to the Footer:** The footer has zero interactivity. Keep it as a Server Component -- zero JS shipped.
- **Hardcoding nav links in multiple places:** Use `lib/data/navigation.ts` as single source of truth. Desktop nav, mobile drawer, and footer quick links all import from the same file.
- **Using `useRouter` for navigation detection:** `useRouter` does not expose the current pathname. Use `usePathname()` instead.
- **Wrapping the entire layout in a client component for page transitions:** Only the `PageTransitionWrapper` around `{children}` should be a client component. Header and Footer stay outside it as Server Components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position detection | Custom IntersectionObserver or RAF loop | `useEffect` + `window.addEventListener('scroll')` with `{ passive: true }` | Simple boolean threshold. IntersectionObserver is for element visibility, not scroll position. RAF loop wastes CPU. |
| Slide-in drawer animation | CSS transitions with manual class toggling | `AnimatePresence` + `m.div` with `initial`/`animate`/`exit` | AnimatePresence handles mount/unmount animation lifecycle -- CSS alone cannot animate elements being removed from the DOM. |
| Active link detection | Manual route matching with regex | `usePathname()` from `next/navigation` | Built into Next.js. Returns exact path string. Simple `===` comparison for top-level routes. |
| Icon components | Custom SVG files in `/public` or icon fonts | `lucide-react` for UI icons | Tree-shakeable, typed, consistent sizing. Each icon is a proper React component with `className` support. |
| Social media icons | Installing `react-icons` for 2-3 brand icons | Inline SVG components (Facebook, Instagram) | Adding `react-icons` (huge package) for 2 icons is wasteful. Simple `<svg>` components with brand paths are ~200 bytes each. |
| Page transition state management | Redux or context-based page state | FrozenRouter pattern with `LayoutRouterContext` | The problem is specifically about Next.js router context lifecycle during transitions. A generic state solution misses the root cause. |

**Key insight:** Phase 2 components are structurally simple -- the complexity is in correctly splitting Server/Client boundaries and handling scroll-linked behavior without polluting the server bundle.

## Common Pitfalls

### Pitfall 1: AnimatePresence Not Animating Exit

**What goes wrong:** The drawer or page transition disappears instantly instead of playing the exit animation.
**Why it happens:** `AnimatePresence` only detects exits of **direct children** with unique `key` props. If the animated `m.div` is nested inside another wrapper without a key, or if the key doesn't change, AnimatePresence cannot track the removal.
**How to avoid:**
- The conditional (`{isOpen && <m.div key="drawer">...}`) must be a direct child of `AnimatePresence`
- For page transitions, the `key={segment}` on `m.div` must actually change when navigating
- Never wrap the animated children in an extra `<div>` between AnimatePresence and the `m.div`
**Warning signs:** Component disappears instantly on close/navigation. No exit animation plays.

### Pitfall 2: FrozenRouter Using Next.js Internal API

**What goes wrong:** Build breaks after Next.js update because `next/dist/shared/lib/app-router-context.shared-runtime` moves or is renamed.
**Why it happens:** The `LayoutRouterContext` import is from Next.js internals, not the public API. It can change between versions.
**How to avoid:**
- Pin the exact Next.js version in `package.json` (currently `16.1.6`)
- Add a comment in `PageTransitionWrapper.tsx` noting the internal import and linking to the source discussion
- Consider this component a "fragile but functional" pattern -- test after any Next.js upgrade
- If/when Next.js ships stable `experimental.viewTransition`, migrate to that
**Warning signs:** TypeScript error on `LayoutRouterContext` import. Runtime "cannot read property of undefined" error.
**Mitigation:** The import path `next/dist/shared/lib/app-router-context.shared-runtime` has been stable from Next.js 13 through 16.0.7 (confirmed by community reports and Storybook integration using the same path). Risk is LOW for the current version but MEDIUM over time.

### Pitfall 3: Backdrop-Filter Not Visible on Sticky Header

**What goes wrong:** The translucent blur has no visible effect -- header looks either fully transparent or fully opaque.
**Why it happens:** `backdrop-filter: blur()` requires the element's background to be partially transparent. If `bg-forest` (fully opaque) is used, there's nothing to blur through. Conversely, if background is fully transparent, there's no colored tint visible.
**How to avoid:**
- Use `bg-forest/85` (85% opacity) when scrolled, not `bg-forest` (100% opacity)
- Ensure the header has `z-50` so it's above page content
- Test on actual content -- the blur is only visible when content scrolls behind the header
**Warning signs:** Header either looks solid green (too opaque) or invisible (too transparent). Blur not perceptible.

### Pitfall 4: Scroll Listener Causing Performance Jank

**What goes wrong:** Scrolling feels janky, especially on mobile.
**Why it happens:** Scroll handler triggers re-render on every scroll event, or handler calls `preventDefault()` blocking the browser's optimized scroll path.
**How to avoid:**
- Always pass `{ passive: true }` to `addEventListener('scroll', handler, { passive: true })`
- Only update state when the threshold is actually crossed (check `scrolled` vs current before `setScrolled`)
- Use a simple boolean state, not continuous numeric scroll values
**Warning signs:** FPS drops during scrolling. Chrome DevTools shows "Forced reflow" warnings.

### Pitfall 5: Mobile Drawer Not Dismissing on Navigation

**What goes wrong:** User taps a nav link in the drawer, page navigates but the drawer stays open.
**Why it happens:** The drawer `isOpen` state is not reset when `pathname` changes.
**How to avoid:**
- Add a `useEffect` watching `pathname` from `usePathname()` that calls `setIsOpen(false)` on change
- Alternatively, each nav link's `onClick` calls `onClose` in addition to navigation
**Warning signs:** Drawer stays open after navigating. User must manually close it.

### Pitfall 6: Page Transition Wrapping Header/Footer

**What goes wrong:** Header and footer fade in/out on every navigation, causing visual flicker.
**Why it happens:** `PageTransitionWrapper` wraps the entire body content including Header and Footer.
**How to avoid:**
- Structure layout.tsx so Header and Footer are **outside** the PageTransitionWrapper
- Only `{children}` (page content) goes inside the transition wrapper
**Warning signs:** Header/footer blink or fade on navigation.

## Code Examples

Verified patterns from official sources and community:

### Complete Header Server Component Shell

```typescript
// src/components/layout/Header.tsx
import Link from 'next/link'
import { navLinks, companyInfo } from '@/lib/data/navigation'
import HeaderClient from './HeaderClient'

export default function Header() {
  return (
    <HeaderClient>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-display text-xl text-cream">
          YARD WEASELS
        </span>
      </Link>

      {/* Desktop nav + phone + CTA are rendered by HeaderClient
          based on scroll state and pathname */}
    </HeaderClient>
  )
}
```

**Note:** The exact split between Server and Client markup is a design choice. The minimal approach: Header.tsx exports only data/structure, HeaderClient.tsx renders everything inside a `<header>` element with scroll-aware classes. The key constraint is that all hooks (`usePathname`, `useState`, `useEffect`) must live in the `'use client'` file.

### Footer Multi-Column Layout

```typescript
// src/components/layout/Footer.tsx (Server Component — no 'use client')
import Link from 'next/link'
import { navLinks, companyInfo } from '@/lib/data/navigation'

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Company Info */}
          {/* Column 2: Quick Links */}
          {/* Column 3: Services */}
          {/* Column 4: Contact Info (both addresses, phone, hours) */}
        </div>
      </div>
      {/* Bottom bar: copyright + social icons */}
      <div className="border-t border-cream/20 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/60">
            &copy; {companyInfo.copyright} {companyInfo.name}. All rights reserved.
          </p>
          {/* Social icons here */}
        </div>
      </div>
    </footer>
  )
}
```

### Inline Social Icon Component

```typescript
// Can live in Footer.tsx or a separate file
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}
```

### Updated Root Layout Structure

```typescript
// src/app/layout.tsx — updated for Phase 2
import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import MotionProvider from '@/providers/MotionProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import PageTransitionWrapper from '@/components/layout/PageTransitionWrapper'
import './globals.css'

// ... font configuration unchanged ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable}`}>
      <body className="font-body text-charcoal bg-cream antialiased">
        <MotionProvider>
          <Header />
          <PageTransitionWrapper>
            <main>{children}</main>
          </PageTransitionWrapper>
          <Footer />
          <BackToTop />
        </MotionProvider>
      </body>
    </html>
  )
}
```

**Critical detail:** Header and Footer are **outside** PageTransitionWrapper. Only the `<main>{children}</main>` transitions between pages.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `useRouter().pathname` (Pages Router) | `usePathname()` from `next/navigation` | Next.js 13 (App Router) | Client Component hook. Returns path string only (no query params). |
| Framer Motion `AnimatePresence` with Pages Router `_app.tsx` | FrozenRouter + LayoutTransition in App Router `layout.tsx` | Next.js 13+ | App Router's component lifecycle breaks naive AnimatePresence usage. FrozenRouter workaround stabilizes context during exit animations. |
| CSS position fixed + manual top offset | `sticky top-0` | Modern CSS (supported since 2017) | No need for scroll offset calculations. Element naturally participates in document flow. |
| Icon fonts (Font Awesome CDN) | Tree-shakeable React icon components (lucide-react) | 2020+ | No render-blocking font request. Only used icons ship in bundle. |
| `backdrop-filter` with vendor prefixes | `backdrop-blur-md` Tailwind utility | Tailwind v3+ / CSS standard | No prefixes needed in 2026. 97%+ browser support for `backdrop-filter`. |
| Experimental `viewTransition` API | Still experimental (React canary) | Next.js 16 | `experimental.viewTransition` exists in next.config.js but not production-ready. FrozenRouter is the pragmatic choice for now. |

**Deprecated/outdated:**
- `framer-motion` package name: Use `motion` package. Already correct in this project.
- `import { motion }` with LazyMotion: Use `import { m }` from `motion/react`. Already correct in this project.
- Lucide brand icons (Facebook, Instagram): Deprecated in lucide-react. Use inline SVG components instead.
- `useRouter().pathname` in App Router: Does not exist. Use `usePathname()` from `next/navigation`.

## Open Questions

1. **FrozenRouter stability across Next.js updates**
   - What we know: The `LayoutRouterContext` import from `next/dist/shared/lib/app-router-context.shared-runtime` is an internal API. It has been stable from Next.js 13 through 16.0.7. The Storybook framework also uses this exact path.
   - What's unclear: Whether Next.js 17 or a minor update will move or rename this export.
   - Recommendation: Use it for now. Pin Next.js version. Add a clear code comment. Monitor for `experimental.viewTransition` graduating to stable as a migration path. If the FrozenRouter proves too fragile during implementation, fall back to a simpler template.tsx-based fade that remounts (no exit animation, just entry).

2. **Header background color when not scrolled**
   - What we know: NAV-01 says "translucent with blur on scroll." It doesn't specify the non-scrolled state.
   - What's unclear: Should the header be fully opaque forest green at the top, then transition to translucent? Or should it always be translucent?
   - Recommendation: Start fully opaque (`bg-forest`) at scroll position 0, transition to translucent (`bg-forest/85 backdrop-blur-md`) after scrolling past 50px. This creates a visible state change that confirms the nav is "sticky." The planner can specify exact opacity values.

3. **Placeholder pages needed for navigation testing**
   - What we know: The nav links point to /about, /services, /products, /gallery, /contact. These routes must exist for link testing and active state verification.
   - What's unclear: How much content should placeholder pages have.
   - Recommendation: Create minimal placeholder `page.tsx` files with just a heading matching the page name. This keeps Phase 2 focused on chrome while enabling full navigation testing. Future phases will replace these with real content.

4. **Social media link URLs**
   - What we know: The footer requires social icon links. No specific URLs were provided in requirements.
   - What's unclear: The actual Facebook/Instagram URLs for Yard Weasels Inc.
   - Recommendation: Use placeholder URLs (`https://facebook.com/yardweasels`, `https://instagram.com/yardweasels`). Easy to update when real URLs are known.

## Sources

### Primary (HIGH confidence)
- [Next.js usePathname docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/functions/use-pathname) -- API, return values, Client Component requirement, code examples
- [Next.js useSelectedLayoutSegment docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment) -- API, active link detection, segment return values
- [Next.js template.tsx docs (v16.1.6)](https://nextjs.org/docs/app/api-reference/file-conventions/template) -- Re-render behavior on navigation, key prop, difference from layout.tsx
- [Next.js viewTransition experimental config (v16.1.6)](https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition) -- Experimental status, React canary requirement, not production-ready
- npm registry (verified 2026-02-18): `lucide-react@0.574.0`, `motion@12.34.2` (already installed)
- Motion source code (GitHub): AnimatePresence is independent of domAnimation/domMax feature loading -- works with either

### Secondary (MEDIUM confidence)
- [Solving Framer Motion Page Transitions in Next.js App Router](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) -- FrozenRouter pattern, confirmed working as of Next.js 16.0.7, complete implementation code
- [Build a Glassmorphic Navbar with TailwindCSS](https://www.braydoncoyer.dev/blog/build-a-glassmorphic-navbar-with-tailwindcss-backdrop-filter-and-backdrop-blur) -- backdrop-blur + bg-opacity pattern for translucent headers
- [Tailwind CSS backdrop-blur docs](https://tailwindcss.com/docs/backdrop-blur) -- Utility classes for backdrop-filter blur
- [Lucide React docs](https://lucide.dev/guide/packages/lucide-react) -- Tree-shakeable imports, React component API
- [Lucide icon deprecation issue #2792](https://github.com/lucide-icons/lucide/issues/2792) -- Confirmation that brand logos (Facebook, Instagram, Twitter) are deprecated
- [Next.js Discussion #42658](https://github.com/vercel/next.js/discussions/42658) -- Community discussion on App Router page transition approaches
- [Motion LazyMotion docs](https://motion.dev/docs/react-lazy-motion) -- domAnimation feature bundle, LazyMotion API
- [Motion reduce bundle size docs](https://motion.dev/docs/react-reduce-bundle-size) -- domAnimation (~6KB) vs domMax (~31KB), AnimatePresence adds ~1.4KB independently

### Tertiary (LOW confidence)
- `LayoutRouterContext` stability across Next.js versions -- Inferred from Storybook integration using same import path and community reports. No official Next.js commitment to maintaining this internal export.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries verified via npm. `motion` and `cn()` already installed. Only new dependency is `lucide-react` (verified 0.574.0). AnimatePresence + domAnimation compatibility verified via source code.
- Architecture: HIGH -- Server/Client component split follows project ARCHITECTURE.md patterns exactly. `usePathname` and `useSelectedLayoutSegment` verified against Next.js 16.1.6 official docs.
- Pitfalls: HIGH -- Scroll performance, AnimatePresence key requirements, backdrop-filter opacity, and drawer-on-navigation issues are well-documented. FrozenRouter fragility is MEDIUM confidence but has known mitigation.
- Page transitions: MEDIUM -- FrozenRouter is a community workaround using internal APIs. It works today but carries upgrade risk. Documented with clear mitigation path.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (30 days -- stable ecosystem; monitor Next.js minor releases for viewTransition API changes)
