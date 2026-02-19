# Phase 6: Products Page - Research

**Researched:** 2026-02-19
**Domain:** Products page with category grid, interactive Material Calculator with form validation, and retail yard callout (Next.js App Router + Tailwind v4 + React client state + Motion)
**Confidence:** HIGH

## Summary

Phase 6 builds the Products page from the existing placeholder stub (`src/app/products/page.tsx`) into a complete products showcase with four distinct zones: (1) a page hero with "Quality Materials, Delivered" headline following the established interior hero pattern, (2) a visually rich product category grid showing all seven products with hover-to-reveal "Contact for Pricing" prompts, (3) an interactive Material Calculator with length/width/depth inputs, product type dropdown, cubic yard output, input validation, and a "Request Delivery Quote" CTA, and (4) a retail yard callout section with the 6470 Beatty Line N address, hours, and a "hard-to-find materials" info block.

The existing `src/lib/data/products.ts` data file already contains all seven product categories (Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed) with `id`, `name`, `description`, and `image` fields. This data is also consumed by the homepage `ProductsBanner` component, so any changes must preserve backward compatibility. The products data file needs minor expansion -- no structural overhaul is required.

The Material Calculator is the only genuinely new technical challenge in this phase. It requires a `'use client'` component with `useState` for form inputs, inline validation with error messages, a cubic yards calculation formula, and a product type dropdown. The cubic yards formula is straightforward: `(length_ft * width_ft * (depth_in / 12)) / 27`. The calculator must block calculation when inputs are invalid (empty or out-of-range), show per-field inline errors, and display a "Request Delivery Quote" CTA below the result. This makes it the most interactive component built so far -- more complex than the `TestimonialCarousel` (which uses `useState` for index tracking) but still manageable as a single client component with local state. No form library is needed; native React `useState` with manual validation is sufficient for three numeric inputs and one dropdown.

The retail yard address (`6470 Beatty Line N`) and hours are already defined in `src/lib/data/navigation.ts` as `companyInfo.retailYardAddress` and `companyInfo.hours`. These should be imported rather than hardcoded.

**Primary recommendation:** Build the Products page as a Server Component that imports four section components from `components/sections/products/`. The product category grid and retail yard callout are Server Components using existing building blocks. The Material Calculator is the sole `'use client'` component, using `useState` for three numeric inputs plus a product type dropdown, with inline validation and a simple cubic yards formula. No new dependencies are needed.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PROD-01 | Hero with "Quality Materials, Delivered" headline | Interior page hero pattern established in Phase 4/5: `py-32 md:py-40`, forest background, `ImagePlaceholder` as background, `GrainOverlay`, `h1` in `font-display text-cream`. Direct reuse of `ServicesHero`/`AboutHero` pattern with different headline/subtext. |
| PROD-02 | Product category grid -- visually rich cards for: Aggregates, Mulch, Fertilizer, Natural Stone, Topsoil, Interlock, Seed | All seven products already defined in `src/lib/data/products.ts`. Grid uses `ImagePlaceholder` with `aspectRatio="square"` for each card. Larger cards than the homepage `ProductsBanner` grid -- likely `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` or similar. Cards need richer visual treatment than the homepage compact version. |
| PROD-03 | Each product card has image placeholder, name, brief description, hover reveals "Contact for Pricing" | Product data already has `name`, `description`, and `image` fields. Hover overlay requires a CSS-only approach: `group` on the card, `opacity-0 group-hover:opacity-100 transition-opacity` on the overlay element. No `'use client'` needed -- pure CSS hover state. |
| PROD-04 | Interactive Material Calculator -- inputs: Length (ft), Width (ft), Depth (in); output: cubic yards needed | `'use client'` component with `useState` for `length`, `width`, `depth` (all numbers). Formula: `(length * width * (depth / 12)) / 27 = cubic yards`. Display result rounded to 2 decimal places. This is the phase's primary technical work. |
| PROD-05 | Calculator has product type dropdown adjusting calculation display | Add a `<select>` dropdown populated from the products array (or a subset of bulk materials). The selected product type labels the result (e.g., "You need X cubic yards of Mulch"). The dropdown does NOT change the formula -- cubic yards is cubic yards regardless of material. It contextualizes the output for the delivery quote request. |
| PROD-06 | Calculator has input validation (min/max limits, inline error messages) | Validate each field: required (non-empty), numeric (positive number), within reasonable range (e.g., length/width 0.1-1000 ft, depth 0.5-36 in). Show inline error text below each input in red/terracotta. Disable or hide the "Calculate" button when any field has errors. No external validation library needed -- manual checks on change or submit. |
| PROD-07 | "Request Delivery Quote" CTA below calculator results | `Link` to `/contact` styled as terracotta button, appears below the calculated result. Only visible after a successful calculation (or always visible with the result area). |
| PROD-08 | Info section: "Can't find what you're looking for? We source hard-to-find materials." | Simple text block, likely within or near the retail yard callout section. Server Component, no interactivity. Uses `AnimatedSection` for scroll entrance. |
| PROD-09 | Retail yard callout with address (6470 Beatty Line N) and hours | Import `companyInfo` from `@/lib/data/navigation`. Display `companyInfo.retailYardAddress.street`, `companyInfo.retailYardAddress.city`, and `companyInfo.hours`. Styled as a distinct callout section, potentially with forest/sage background for visual separation. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 16.1.6 | App Router, Server Components, `Link` for CTA buttons | Already installed. Products route exists at `app/products/page.tsx`. `Link` used for "Request Delivery Quote" CTA. |
| `react` | 19.2.3 | `useState` for calculator form state, event handlers | Already installed. Calculator is the first component in this project requiring multi-field form state. |
| `motion` | ^12.34.2 | `AnimatedSection` wrapper for scroll-triggered entrance animations | Already installed. Used to stagger product card entrances and animate section reveals. |
| Tailwind CSS v4 | ^4 | Layout grid, responsive design, spacing, brand colors, hover states | Already configured with brand tokens in `@theme`. Grid for product cards, form styling for calculator. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional class composition | Calculator input error states, product card hover classes |
| `@/components/ui/AnimatedSection` | Existing | Scroll-triggered fade-in/slide-up wrapper | Wrap product cards and page sections |
| `@/components/ui/ImagePlaceholder` | Existing | Styled placeholder boxes for product images | Each product card image |
| `@/components/ui/GrainOverlay` | Existing | Grain texture overlay for hero and dark sections | Hero section, possibly retail yard callout |
| `@/lib/data/navigation` | Existing | `companyInfo.retailYardAddress`, `companyInfo.hours` | Retail yard callout section |
| `@/lib/data/products` | Existing | Product array with all 7 categories | Product grid and calculator dropdown |
| `next/link` | Built-in | Client-side navigation for CTA buttons | "Request Delivery Quote" button, any product-related CTAs |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual `useState` + validation | `react-hook-form` + `zod` | Overkill for 3 numeric inputs + 1 dropdown. Form libraries add bundle weight and complexity. The calculator has no async submission, no nested fields, no dynamic field lists. Manual state is simpler and lighter. |
| CSS-only hover for "Contact for Pricing" | `'use client'` + `useState` for hover state | CSS `group-hover` is zero JS, works perfectly for hover overlays. No reason to use React state for this. |
| Product type changes calculation formula | Product type labels the result only | All bulk materials use the same cubic yards formula (volume = L x W x D). Product type just contextualizes the output for the quote request. Different coverage rates per material would add unjustified complexity -- the calculator provides an estimate, not a precise order quantity. |
| Separate calculator page/modal | Inline calculator section on Products page | Keeping the calculator on the same page reduces friction. User browses products, calculates needs, and requests a quote all in one flow. |

**Installation:**
```bash
# No new dependencies needed
# Everything required is already installed:
# - react (useState for calculator)
# - motion (AnimatedSection)
# - clsx + tailwind-merge (cn utility)
# - next/link (built-in)
```

## Architecture Patterns

### Recommended Project Structure (Phase 6 additions)
```
src/
├── app/
│   └── products/
│       └── page.tsx                    # REPLACE: Server Component assembling products sections
│
├── components/
│   └── sections/
│       └── products/                   # NEW directory for Products page sections
│           ├── ProductsHero.tsx        # Server Component — page hero banner
│           ├── ProductCategoryGrid.tsx  # Server Component — 7 product cards with hover
│           ├── MaterialCalculator.tsx   # CLIENT Component — interactive calculator
│           └── RetailYardCallout.tsx   # Server Component — address, hours, hard-to-find info
│
├── lib/
│   └── data/
│       └── products.ts                # MINOR EXPANSION: possibly add calculator-specific data
```

### Pattern 1: Interior Page Hero (Established in Phase 4/5)
**What:** A styled banner section with background image placeholder, colored overlay, headline, and subtext. No parallax, no scroll indicator.
**When to use:** All interior pages. Phase 4 (About) and Phase 5 (Services) both use this exact pattern.
**Example:**
```typescript
// components/sections/products/ProductsHero.tsx — Server Component
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function ProductsHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="Products — Retail yard with bulk landscape materials"
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Quality Materials, Delivered
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          Premium landscape supplies for every project — from aggregates
          and mulch to natural stone and seed.
        </p>
      </div>
    </section>
  )
}
```
**Source:** Direct adaptation of `ServicesHero.tsx` and `AboutHero.tsx` patterns verified in codebase.

### Pattern 2: Product Card with Hover "Contact for Pricing" Overlay
**What:** A product card that displays image, name, and description normally, but on hover reveals a "Contact for Pricing" prompt overlaid on the image area. Uses CSS-only `group`/`group-hover` -- no client JS needed.
**When to use:** Each of the seven product entries on the Products page.
**Key design decisions:**
- The cards should feel richer and more spacious than the compact homepage `ProductsBanner` cards.
- "Contact for Pricing" appears on hover as an overlay rather than displaying a static price (per PROD-03 and the project's explicit out-of-scope decision: "E-commerce / online ordering -- products page is informational + contact for pricing").
- Cards are NOT clickable links. The hover overlay is informational, directing users to call or use the contact form.
- On mobile (touch devices), the hover state won't work. The "Contact for Pricing" text should either be always visible on mobile or use a tap-to-reveal approach. Simplest: always show the text on mobile, use hover overlay on desktop. This can be achieved with `md:opacity-0 md:group-hover:opacity-100` on the overlay (hidden by default on desktop, always visible on mobile).
**Example:**
```typescript
// Product card pattern within ProductCategoryGrid.tsx — Server Component
<div className="group relative rounded-lg overflow-hidden bg-white shadow-sm">
  <div className="relative">
    <ImagePlaceholder
      label={product.image}
      aspectRatio="square"
    />
    {/* Hover overlay */}
    <div className="absolute inset-0 flex items-center justify-center
      bg-forest/80 transition-opacity duration-300
      md:opacity-0 md:group-hover:opacity-100">
      <p className="text-cream font-medium text-lg">Contact for Pricing</p>
    </div>
  </div>
  <div className="p-4 md:p-5">
    <h3 className="font-display text-lg md:text-xl text-forest mb-2">
      {product.name}
    </h3>
    <p className="text-charcoal/70 text-sm leading-relaxed">
      {product.description}
    </p>
  </div>
</div>
```

### Pattern 3: Material Calculator (Client Component)
**What:** An interactive calculator with three numeric inputs (Length, Width, Depth), a product type dropdown, inline validation errors, a calculated cubic yards result, and a "Request Delivery Quote" CTA.
**When to use:** Single instance on the Products page between the product grid and the retail yard callout.
**Key design decisions:**
- This is the ONLY `'use client'` component introduced in this phase.
- Uses `useState` for form state -- no form library needed.
- Validation runs on change (or on a "Calculate" button click). Inline error messages appear below each input.
- The result area appears only after a successful calculation.
- The formula is universal: `(length_ft * width_ft * (depth_in / 12)) / 27 = cubic_yards`.
- Product type dropdown does NOT change the formula. It labels the result for context (e.g., "You need approximately 2.47 cubic yards of Mulch").
- Input constraints: Length (0.1-1000 ft), Width (0.1-1000 ft), Depth (0.5-36 in). These are reasonable for residential/commercial landscaping projects.
**Example:**
```typescript
// components/sections/products/MaterialCalculator.tsx — CLIENT Component
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products } from '@/lib/data/products'
import { cn } from '@/lib/utils/cn'

interface FormState {
  length: string
  width: string
  depth: string
  productType: string
}

interface FormErrors {
  length?: string
  width?: string
  depth?: string
}

export default function MaterialCalculator() {
  const [form, setForm] = useState<FormState>({
    length: '',
    width: '',
    depth: '',
    productType: products[0].id,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [result, setResult] = useState<number | null>(null)

  function validate(): FormErrors {
    const newErrors: FormErrors = {}
    const length = parseFloat(form.length)
    const width = parseFloat(form.width)
    const depth = parseFloat(form.depth)

    if (!form.length || isNaN(length)) {
      newErrors.length = 'Length is required'
    } else if (length < 0.1 || length > 1000) {
      newErrors.length = 'Length must be between 0.1 and 1,000 ft'
    }

    if (!form.width || isNaN(width)) {
      newErrors.width = 'Width is required'
    } else if (width < 0.1 || width > 1000) {
      newErrors.width = 'Width must be between 0.1 and 1,000 ft'
    }

    if (!form.depth || isNaN(depth)) {
      newErrors.depth = 'Depth is required'
    } else if (depth < 0.5 || depth > 36) {
      newErrors.depth = 'Depth must be between 0.5 and 36 inches'
    }

    return newErrors
  }

  function handleCalculate() {
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setResult(null)
      return
    }

    const length = parseFloat(form.length)
    const width = parseFloat(form.width)
    const depth = parseFloat(form.depth)
    const cubicYards = (length * width * (depth / 12)) / 27
    setResult(Math.round(cubicYards * 100) / 100)
  }

  const selectedProduct = products.find(p => p.id === form.productType)

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-forest text-center mb-4">
          Material Calculator
        </h2>
        <p className="text-charcoal/70 text-center max-w-xl mx-auto mb-12">
          Estimate how much material you need for your project.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Length input */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Length (ft)
            </label>
            <input
              type="number"
              value={form.length}
              onChange={e => setForm(prev => ({ ...prev, length: e.target.value }))}
              className={cn(
                'w-full px-4 py-3 rounded-lg border transition-colors',
                errors.length
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-charcoal/20 focus:border-forest focus:ring-forest'
              )}
              placeholder="e.g. 20"
              min="0.1"
              max="1000"
              step="0.1"
            />
            {errors.length && (
              <p className="mt-1 text-sm text-red-600">{errors.length}</p>
            )}
          </div>
          {/* Width and Depth follow same pattern */}
        </div>

        {/* Product type dropdown */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-charcoal mb-2">
            Product Type
          </label>
          <select
            value={form.productType}
            onChange={e => setForm(prev => ({ ...prev, productType: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border border-charcoal/20 ..."
          >
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Calculate button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-forest hover:bg-forest-light text-cream font-medium rounded-lg transition-colors"
        >
          Calculate
        </button>

        {/* Result */}
        {result !== null && (
          <div className="mt-8 p-6 bg-sage/10 rounded-lg text-center">
            <p className="text-charcoal/70 mb-2">You need approximately</p>
            <p className="font-display text-3xl md:text-4xl text-forest mb-2">
              {result} cubic yards
            </p>
            <p className="text-charcoal/60 mb-6">
              of {selectedProduct?.name}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-terracotta hover:bg-terracotta-light text-cream font-medium rounded-lg transition-colors"
            >
              Request Delivery Quote
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
```
**Critical implementation note:** Store input values as strings in state (not numbers) to avoid issues with controlled inputs clearing to `0` instead of empty when the user deletes text. Parse to `parseFloat()` only during validation and calculation.

### Pattern 4: Retail Yard Callout with Hard-to-Find Materials
**What:** A section displaying the retail yard address, business hours, and a "Can't find what you're looking for? We source hard-to-find materials." message.
**When to use:** Bottom of the Products page, providing location and contact context after browsing products and calculating needs.
**Example:**
```typescript
// components/sections/products/RetailYardCallout.tsx — Server Component
import Link from 'next/link'
import { companyInfo } from '@/lib/data/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function RetailYardCallout() {
  return (
    <section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
      <GrainOverlay />
      <AnimatedSection className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
            Visit Our Retail Yard
          </h2>
          <p className="text-cream/80 text-lg mb-2">
            {companyInfo.retailYardAddress.street}, {companyInfo.retailYardAddress.city}
          </p>
          <p className="text-cream/60 mb-10">
            {companyInfo.hours}
          </p>

          <div className="bg-cream/10 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8">
            <p className="font-display text-xl text-cream mb-2">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <p className="text-cream/70">
              We source hard-to-find materials. Contact us with your project
              needs and we&apos;ll track down exactly what you need.
            </p>
          </div>

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
**Source:** Combines `ServicesContact.tsx` CTA pattern with `companyInfo` import pattern from `ProductsBanner.tsx` and `Footer.tsx`.

### Pattern 5: Server Component Page Composition
**What:** The `products/page.tsx` is a Server Component (no `'use client'`) that imports and renders section components in order.
**Example:**
```typescript
// app/products/page.tsx — Server Component (NO 'use client')
import ProductsHero from '@/components/sections/products/ProductsHero'
import ProductCategoryGrid from '@/components/sections/products/ProductCategoryGrid'
import MaterialCalculator from '@/components/sections/products/MaterialCalculator'
import RetailYardCallout from '@/components/sections/products/RetailYardCallout'

export default function ProductsPage() {
  return (
    <div>
      <ProductsHero />
      <ProductCategoryGrid />
      <MaterialCalculator />
      <RetailYardCallout />
    </div>
  )
}
```
**Key:** Page uses `<div>` as root wrapper. Root layout owns `<main>`. Client component (`MaterialCalculator`) is imported into a Server Component page -- Next.js handles the client boundary automatically.

### Anti-Patterns to Avoid
- **Using a form library for 3 inputs:** `react-hook-form` or `formik` would add unnecessary bundle weight. The calculator has 3 numeric inputs and 1 dropdown. Manual `useState` is cleaner and lighter.
- **`'use client'` on page.tsx or Server Components:** Only `MaterialCalculator.tsx` needs `'use client'`. All other components are Server Components.
- **Hardcoding the retail yard address:** Use `companyInfo.retailYardAddress` from `@/lib/data/navigation.ts`. This is already the established pattern (`Footer.tsx`, `ProductsBanner.tsx`).
- **Using JavaScript for hover effects:** The "Contact for Pricing" hover overlay is pure CSS (`group`/`group-hover`). No need for `onMouseEnter`/`onMouseLeave` handlers.
- **Different formulas per product type:** All bulk materials use the same volume formula. Introducing per-material coverage factors adds complexity without validated business value. The calculator gives an estimate; customers call for exact quantities.
- **Using `<main>` as root element:** Root layout wraps children in `<main>`. Page components use `<div>`.
- **Modifying the existing `ProductsBanner` component:** The homepage component should continue working unchanged. Any changes to `products.ts` must be additive.
- **Using `type="number"` with step="any" without string state:** Store numeric inputs as strings to avoid UX issues where deleting all text shows `0` instead of empty. Parse to float only for validation/calculation.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver | Existing `AnimatedSection` component | Already built. Uses `m.div` + `whileInView` with `viewport={{ once: true }}`. |
| Image placeholders | Custom placeholder divs | Existing `ImagePlaceholder` component | Supports `label`, `aspectRatio` (video/square/portrait/wide), `className`. Built in Phase 1. |
| Grain texture overlay | Canvas/WebGL noise | Existing `GrainOverlay` component | SVG `feTurbulence` as data URL. Zero JS. Built in Phase 1. |
| Class merging | Manual string concatenation | Existing `cn()` utility | `clsx` + `tailwind-merge`. Built in Phase 1. |
| Internal navigation links | `<a>` tags for internal routes | `next/link` `Link` component | Enables client-side navigation, prefetching. Built into Next.js. |
| Hover overlay effect | JS mouse event handlers | CSS `group`/`group-hover` classes | Pure CSS, zero JS, performant. Tailwind `group` variant is the standard approach. |
| Form validation library | Custom validation framework | Inline `validate()` function | Three numeric fields + range checks. A function with `if` statements is clearer than any abstraction. |
| Number formatting | Custom locale formatting | `Math.round(n * 100) / 100` or `toFixed(2)` | Two decimal places is all that is needed. No locale-sensitive formatting required for cubic yards. |
| Retail yard address data | Hardcoded strings | `companyInfo` from `@/lib/data/navigation` | Already defined. Used by Footer and ProductsBanner. Single source of truth. |

**Key insight:** This phase introduces the project's first interactive form (the Material Calculator), but it is deliberately small in scope -- three numeric inputs and one dropdown. The complexity is in getting the UX details right (inline validation, clear error states, conditional result display) rather than in any technical challenge. Every other aspect of this phase is pure composition using existing building blocks.

## Common Pitfalls

### Pitfall 1: Controlled Number Input UX Issues
**What goes wrong:** Using `number` state type causes inputs to show `0` when the user clears the field, or `NaN` when non-numeric text is pasted.
**Why it happens:** `parseFloat('')` returns `NaN`; storing `NaN` in state breaks the input. Storing `0` makes it impossible to clear the field.
**How to avoid:** Store input values as `string` in state (e.g., `length: ''`). Only parse to `parseFloat()` during validation and calculation. Use `type="number"` on the `<input>` for mobile numeric keyboard, but keep state as string.
**Warning signs:** User can't clear an input field; field shows `0` or `NaN` after deleting text.

### Pitfall 2: Product Card Hover Not Working on Mobile
**What goes wrong:** The "Contact for Pricing" overlay uses `group-hover`, which does not trigger on touch devices. Mobile users never see the pricing prompt.
**Why it happens:** `:hover` is unreliable on touch devices. Some mobile browsers trigger `:hover` on tap, others don't.
**How to avoid:** Use responsive visibility: on mobile (`< md`), always show the "Contact for Pricing" text (e.g., as a footer inside the card or always-visible overlay). On desktop (`md:` and up), use `md:opacity-0 md:group-hover:opacity-100` for the hover reveal. This way, mobile users always see the information, and desktop users get the interactive hover effect.
**Warning signs:** Mobile users see product cards with no pricing information or call-to-action.

### Pitfall 3: Calculator Result Not Clearing on Invalid Re-submission
**What goes wrong:** User gets a valid result, then changes an input to an invalid value, and the old result still displays alongside the new error messages.
**Why it happens:** The result state is not cleared when validation fails.
**How to avoid:** In the `handleCalculate` function, set `setResult(null)` before or during error handling. Only set a new result value when all inputs pass validation. This ensures the result area disappears when inputs become invalid.
**Warning signs:** Stale result displayed alongside red error messages.

### Pitfall 4: Hero Content Hidden Behind Sticky Header
**What goes wrong:** The hero headline starts at `top: 0` but the sticky header occupies ~64-80px, obscuring content.
**Why it happens:** Interior page heroes don't use `min-h-screen` like the homepage.
**How to avoid:** Use `py-32 md:py-40` on the hero section (128-160px padding), matching the About and Services page heroes. This provides generous clearance above the headline.
**Warning signs:** "Quality Materials, Delivered" headline partially hidden behind the header on load.

### Pitfall 5: Breaking Homepage ProductsBanner
**What goes wrong:** Changes to `products.ts` break the homepage `ProductsBanner` component that imports from the same file.
**Why it happens:** `ProductsBanner` reads `product.id`, `product.name`, and `product.image` from the `products` array. If field names or the array structure change, the homepage breaks.
**How to avoid:** Any changes to `products.ts` must be additive only. Add new fields if needed (they won't affect existing consumers), but never rename or remove existing fields. The `Product` interface already has `id`, `name`, `description`, and `image` -- these must remain unchanged.
**Warning signs:** Homepage ProductsBanner section breaks or shows wrong data.

### Pitfall 6: Validation Error Messages Not Accessible
**What goes wrong:** Screen readers don't announce validation errors when they appear, leaving keyboard/screen reader users unaware of issues.
**How to avoid:** Use `aria-describedby` on inputs linking to their error message elements. Add `role="alert"` or `aria-live="polite"` on error message elements so they are announced when they appear. This is a Phase 10 (Accessibility) concern but good to build correctly from the start.
**Warning signs:** No audible feedback when validation errors appear while using a screen reader.

### Pitfall 7: Calculator Section Feels Disconnected from Products
**What goes wrong:** The calculator section looks like a separate tool rather than part of the products page flow.
**Why it happens:** No visual connection between the product grid and the calculator.
**How to avoid:** Use a clear introductory line like "Estimate how much material you need" and place the product type dropdown prominently so it ties the calculator back to the product catalog. The dropdown should contain only bulk material product types that make sense for cubic yard calculations (Aggregates, Mulch, Topsoil, potentially Natural Stone -- but not Fertilizer, Interlock, or Seed which are sold differently). However, the requirements (PROD-05) specify "product type dropdown" without restricting it, so include all products but acknowledge that cubic yards is most relevant for bulk materials.

## Code Examples

### Cubic Yards Formula
```typescript
// The standard formula for converting dimensional inputs to cubic yards:
// 1 cubic yard = 27 cubic feet
// Depth is in inches, must convert to feet first

function calculateCubicYards(
  lengthFt: number,
  widthFt: number,
  depthIn: number
): number {
  const depthFt = depthIn / 12
  const cubicFeet = lengthFt * widthFt * depthFt
  const cubicYards = cubicFeet / 27
  return Math.round(cubicYards * 100) / 100
}

// Examples:
// 20ft x 10ft x 3in = 1.85 cubic yards
// 50ft x 50ft x 4in = 30.86 cubic yards
// 10ft x 10ft x 2in = 0.62 cubic yards
```
**Source:** Standard volumetric conversion. 1 yard = 3 feet. 1 cubic yard = 27 cubic feet. 1 foot = 12 inches.

### Input Validation Pattern
```typescript
// Validation function for calculator inputs
interface FormErrors {
  length?: string
  width?: string
  depth?: string
}

function validate(form: { length: string; width: string; depth: string }): FormErrors {
  const errors: FormErrors = {}

  // Length validation
  if (!form.length.trim()) {
    errors.length = 'Length is required'
  } else {
    const val = parseFloat(form.length)
    if (isNaN(val) || val <= 0) {
      errors.length = 'Enter a valid positive number'
    } else if (val > 1000) {
      errors.length = 'Maximum length is 1,000 ft'
    }
  }

  // Width validation — same pattern as length
  if (!form.width.trim()) {
    errors.width = 'Width is required'
  } else {
    const val = parseFloat(form.width)
    if (isNaN(val) || val <= 0) {
      errors.width = 'Enter a valid positive number'
    } else if (val > 1000) {
      errors.width = 'Maximum width is 1,000 ft'
    }
  }

  // Depth validation — in inches, different range
  if (!form.depth.trim()) {
    errors.depth = 'Depth is required'
  } else {
    const val = parseFloat(form.depth)
    if (isNaN(val) || val <= 0) {
      errors.depth = 'Enter a valid positive number'
    } else if (val > 36) {
      errors.depth = 'Maximum depth is 36 inches'
    }
  }

  return errors
}
```

### CSS-Only Hover Overlay for Product Cards
```typescript
// Pure CSS hover effect using Tailwind group variant
// No 'use client' needed — Server Component compatible

<div className="group relative rounded-lg overflow-hidden bg-white shadow-sm
  hover:shadow-md transition-shadow">
  <div className="relative">
    <ImagePlaceholder label={product.image} aspectRatio="square" />
    {/* Overlay: always visible on mobile, hover-reveal on desktop */}
    <div className="absolute inset-0 flex items-center justify-center
      bg-forest/80 transition-opacity duration-300
      md:opacity-0 md:group-hover:opacity-100">
      <span className="text-cream font-medium text-lg">
        Contact for Pricing
      </span>
    </div>
  </div>
  <div className="p-4 md:p-5">
    <h3 className="font-display text-lg md:text-xl text-forest mb-1">
      {product.name}
    </h3>
    <p className="text-charcoal/70 text-sm leading-relaxed">
      {product.description}
    </p>
  </div>
</div>
```

### Form Input with Error State
```typescript
// Reusable input pattern for the calculator
// Uses cn() for conditional error styling

<div>
  <label
    htmlFor="calc-length"
    className="block text-sm font-medium text-charcoal mb-2"
  >
    Length (ft)
  </label>
  <input
    id="calc-length"
    type="number"
    inputMode="decimal"
    value={form.length}
    onChange={e => setForm(prev => ({ ...prev, length: e.target.value }))}
    className={cn(
      'w-full px-4 py-3 rounded-lg border bg-white transition-colors',
      'focus:outline-none focus:ring-2',
      errors.length
        ? 'border-red-500 focus:ring-red-500/30'
        : 'border-charcoal/20 focus:border-forest focus:ring-forest/30'
    )}
    placeholder="e.g. 20"
    min="0.1"
    max="1000"
    step="0.1"
    aria-describedby={errors.length ? 'calc-length-error' : undefined}
    aria-invalid={errors.length ? true : undefined}
  />
  {errors.length && (
    <p id="calc-length-error" className="mt-1 text-sm text-red-600" role="alert">
      {errors.length}
    </p>
  )}
</div>
```

### Section Background Alternation
```typescript
// Established background alternation for visual rhythm on the Products page:
// ProductsHero:         bg-forest     (dark — hero)
// ProductCategoryGrid:  default/cream  (light — product browsing)
// MaterialCalculator:   bg-white       (light — form section, slight contrast from cream)
// RetailYardCallout:    bg-forest      (dark — bookend with hero, strong CTA closure)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Calculator as separate page/modal | Calculator inline on products page | UX best practice | Single-page flow: browse products -> calculate needs -> request quote. No navigation friction. |
| Product cards with static price display | "Contact for Pricing" on hover | Business requirement | Bulk material pricing is variable. Publishing prices creates expectation problems. Hover-to-reveal adds interactivity without commitment. |
| Form validation via submit-then-show-errors | Inline validation on calculate click | Modern UX | Errors appear next to the relevant field immediately. No scrolling to find what's wrong. |
| Controlled number inputs with numeric state | String state parsed to numbers on validate | React best practice | Avoids `NaN` and `0` display issues when users clear inputs. Cleaner UX. |

**Deprecated/outdated:**
- Nothing specific to this phase. The React `useState` pattern, CSS `group-hover` feature, and cubic yards formula are all stable and well-established.

## Open Questions

1. **Calculator product type dropdown: all 7 products or filtered subset?**
   - What we know: PROD-05 says "product type dropdown adjusting calculation display." Some products (Fertilizer, Interlock, Seed) are not typically sold by the cubic yard. The requirement does not restrict which products appear.
   - What's unclear: Whether including Fertilizer/Interlock/Seed in a cubic yards calculator is confusing to users.
   - Recommendation: Include all 7 products in the dropdown. The calculator provides a volume estimate. Even for products not traditionally measured in cubic yards, the volume approximation is useful. The result is an estimate that the customer discusses with YWI when requesting a delivery quote. Filtering would require making assumptions about which products are "bulk" materials.

2. **Calculator should validate on button click, on input change, or on blur?**
   - What we know: PROD-06 says "inline validation errors" and "does not allow calculation to proceed with invalid data."
   - What's unclear: The exact trigger for validation. On-change validation can be aggressive (showing errors while still typing). On-blur is gentler. On-click is simplest.
   - Recommendation: Validate on "Calculate" button click. This is the least disruptive UX -- the user fills in all fields, clicks Calculate, and sees either a result or specific error messages. After the first click, optionally clear errors when the user corrects a field (re-validate on subsequent clicks). Do NOT validate on every keystroke.

3. **Product data file changes needed**
   - What we know: The existing `products.ts` has all 7 products with `id`, `name`, `description`, `image` fields. The homepage `ProductsBanner` consumes this data.
   - What's unclear: Whether any additional fields are needed for the Products page grid cards.
   - Recommendation: The existing data is sufficient. The Products page cards use `name`, `description`, `image` (for `ImagePlaceholder` label). No new fields are required. If product cards need different or longer descriptions on the Products page versus the homepage, a `details` field could be added (same pattern as `services.ts`), but the current descriptions are already product-specific and appropriate length for both contexts. Defer adding a `details` field unless the planner identifies a need.

4. **Material Calculator heading level**
   - What we know: The page has one `h1` ("Quality Materials, Delivered" in the hero). Sections use `h2`.
   - What's unclear: Whether the calculator section heading should be `h2` (matching other sections) or treated differently.
   - Recommendation: Use `h2` for "Material Calculator" heading, consistent with other section headings on the page. Proper heading hierarchy: `h1` (hero) -> `h2` (Product Categories, Material Calculator, Visit Our Retail Yard).

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis: all files in `components/sections/services/`, `components/sections/about/`, `components/sections/`, `components/ui/`, `lib/data/`, `app/products/page.tsx`, `app/services/page.tsx`, `app/about/page.tsx`, `app/layout.tsx`, `app/page.tsx` -- patterns verified by reading source files directly
- `products.ts` verified: contains `Product` interface with `id`, `name`, `description`, `image` fields and 7 entries
- `navigation.ts` verified: contains `companyInfo.retailYardAddress` with `street: '6470 Beatty Line N'`, `city: 'Fergus, Ontario'` and `companyInfo.hours: 'Mon-Fri 8:00 AM - 5:00 PM'`
- `ProductsBanner.tsx` verified: imports from `@/lib/data/products` and `@/lib/data/navigation`, uses `product.id`, `product.name`, `product.image`, `companyInfo.retailYardAddress`
- `ImagePlaceholder` API verified: accepts `label`, `aspectRatio` (video/square/portrait/wide), `className`
- `AnimatedSection` API verified: accepts `children`, `className`, `delay`
- `ServicesHero.tsx` / `AboutHero.tsx` verified: establishes interior hero pattern with `py-32 md:py-40`, forest bg, `ImagePlaceholder` background, `GrainOverlay`
- `TestimonialCarousel.tsx` verified: establishes `'use client'` pattern with `useState`, imported by Server Component page via props
- `ServiceCardGrid.tsx` verified: establishes card grid pattern with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `AnimatedSection` stagger, `ImagePlaceholder`
- Cubic yards formula: standard volumetric conversion (1 cubic yard = 27 cubic feet, 1 foot = 12 inches)

### Secondary (MEDIUM confidence)
- CSS `group-hover` pattern: standard Tailwind feature for parent-triggered hover states. Well-documented and widely used. Works on all modern browsers for pointer devices.
- Touch device hover fallback: `:hover` is unreliable on touch devices. The `md:opacity-0 md:group-hover:opacity-100` pattern (always visible on mobile, hover on desktop) is a widely established responsive approach.
- React controlled input string-state pattern: storing numeric input values as strings to avoid `NaN`/`0` display issues is a well-known React pattern documented across multiple sources.

### Tertiary (LOW confidence)
- None. This phase relies entirely on established codebase patterns, standard React state management, CSS features, and a straightforward mathematical formula. No external research was needed beyond the existing codebase.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. Everything already installed and verified in codebase.
- Architecture: HIGH -- Server Component page + section composition is identical to Phase 4/5. Interior hero, card grid, and CTA callout all have direct precedents. The only new element is the Material Calculator client component.
- Calculator implementation: HIGH -- Three numeric inputs, one dropdown, simple formula, inline validation. Pattern is similar to `TestimonialCarousel` in complexity (both use `useState`, both are isolated client components). The cubic yards formula is mathematically unambiguous.
- Pitfalls: HIGH -- Controlled input UX, mobile hover fallback, and homepage backward compatibility are well-understood concerns with clear solutions.

**Research date:** 2026-02-19
**Valid until:** 2026-03-19 (stable -- no rapidly changing dependencies or patterns)
