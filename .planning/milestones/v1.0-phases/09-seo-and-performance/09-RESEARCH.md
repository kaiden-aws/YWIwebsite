# Phase 9: SEO and Performance - Research

**Researched:** 2026-02-20
**Domain:** Next.js Metadata API, Sitemap/Robots generation, Lighthouse performance optimization
**Confidence:** HIGH

## Summary

This phase adds per-page SEO metadata, Open Graph tags, a programmatic sitemap, a robots.txt file, and performance optimizations to hit Lighthouse 90+ on desktop and 80+ on mobile. The project is built on Next.js 16.1.6 with App Router, and all six pages (Home, About, Services, Products, Gallery, Contact) currently exist but none have per-page metadata exports -- only the root `layout.tsx` has a global `Metadata` export. No `sitemap.ts` or `robots.ts` files exist. The site uses `ImagePlaceholder` components (styled colored divs) rather than `next/image`, so `priority` and `sizes` props apply only when real images are swapped in; however, the infrastructure must be prepared now. Heading hierarchy is already correct (one `h1` per page via hero components, `h2`/`h3` for subsections).

The primary approach uses Next.js's built-in Metadata API with a title template in the root layout, static `export const metadata` objects in each page file, a `sitemap.ts` route handler, and a `robots.ts` route handler. No additional libraries are needed -- everything is built into Next.js 16.

**Primary recommendation:** Use `title.template` in root layout metadata for consistent branding, add static `metadata` exports to each of the six page files with location-specific titles/descriptions/OG tags, create `app/sitemap.ts` and `app/robots.ts` using the `MetadataRoute` types, and add `metadataBase` to root layout for proper OG URL resolution. For performance, ensure fonts use `display: 'swap'` (already done), minimize client component boundaries (already minimal), and document the placeholder-to-real-image migration path with `priority` and `sizes` guidance.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Per-page metadata exports with title, description, and Open Graph tags | Next.js Metadata API: static `export const metadata: Metadata` in each `page.tsx` with `title`, `description`, and `openGraph` fields. Root layout uses `title.template` for consistent suffix pattern. |
| SEO-02 | Location-specific keywords in metadata ("Fergus, Ontario", "Centre Wellington") | Each page's `title` and `description` must include "Fergus, Ontario" and relevant service keywords. OG descriptions follow the same pattern. Keyword inclusion is manual -- no library needed. |
| SEO-03 | Semantic HTML with proper heading hierarchy (one h1 per page) | Already satisfied. Each page has exactly one `<h1>` in its hero component. Subsections use `<h2>` and `<h3>`. No changes needed -- verification only. |
| SEO-04 | Sitemap generation via `app/sitemap.ts` | Next.js `MetadataRoute.Sitemap` type. Create `src/app/sitemap.ts` exporting a default function returning array of URL objects with `url`, `lastModified`, `changeFrequency`, and `priority`. |
| SEO-05 | Robots.txt via `app/robots.ts` | Next.js `MetadataRoute.Robots` type. Create `src/app/robots.ts` exporting a default function returning `rules` and `sitemap` URL. |
| SEO-06 | Hero images marked with `priority={true}` for LCP optimization | Site uses `ImagePlaceholder` (divs, not `<Image>`). Document the pattern: when placeholders are replaced with `next/image`, hero images must have `priority={true}`. Add comments in hero components as implementation markers. |
| SEO-07 | All images have alt text placeholders and `sizes` prop for responsive loading | `ImagePlaceholder` has a `label` prop serving as future alt text. When migrated to `next/image`, the `label` maps to `alt` and `sizes` must be added. Document the migration path. |
| SEO-08 | Core Web Vitals optimized -- Lighthouse performance score target 90+ | The site is already well-architected for performance: Server Components by default, only 12 `'use client'` boundaries, LazyMotion with domAnimation, `next/font` with `display: 'swap'`. Primary risks are Framer Motion bundle size and font loading. Run Lighthouse to measure and address any gaps. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 16.1.6 (built-in) | Per-page metadata, OG tags, title templates | First-party API, zero dependencies, type-safe with `Metadata` type |
| Next.js `MetadataRoute.Sitemap` | 16.1.6 (built-in) | Programmatic sitemap generation | Convention-based file (`sitemap.ts`), auto-served at `/sitemap.xml` |
| Next.js `MetadataRoute.Robots` | 16.1.6 (built-in) | Programmatic robots.txt generation | Convention-based file (`robots.ts`), auto-served at `/robots.txt` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/image` (Image component) | 16.1.6 (built-in) | Optimized image loading with `priority` and `sizes` | When replacing `ImagePlaceholder` with real photos (pre-launch) |
| `next/og` (ImageResponse) | 16.1.6 (built-in) | Dynamic OG image generation | If dynamic OG images are needed per page (optional for v1) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Static `metadata` exports | `generateMetadata` function | Static is simpler for pages with no dynamic data; all YWI pages are static content |
| `sitemap.ts` code | Static `sitemap.xml` file | Code is easier to maintain when pages change; XML requires manual editing |
| Built-in OG image via metadata | `opengraph-image.tsx` with ImageResponse | ImageResponse generates dynamic images server-side; overkill for a static site with placeholder images |

**Installation:**
```bash
# No installation needed -- all APIs are built into Next.js 16
```

## Architecture Patterns

### Recommended Project Structure
```
src/app/
  layout.tsx          # Root metadata with metadataBase + title.template
  page.tsx            # Homepage metadata export
  sitemap.ts          # NEW: Sitemap generator
  robots.ts           # NEW: Robots.txt generator
  about/
    page.tsx          # About metadata export (added)
  services/
    page.tsx          # Services metadata export (added)
  products/
    page.tsx          # Products metadata export (added)
  gallery/
    page.tsx          # Gallery metadata export (added)
  contact/
    page.tsx          # Contact metadata export (added)
src/lib/
  metadata.ts         # NEW: Shared metadata constants (site URL, default OG image path, company name)
```

### Pattern 1: Title Template in Root Layout
**What:** Define a `title.template` in root layout so child pages only specify their unique title portion, and the company name is appended automatically.
**When to use:** Always for multi-page sites with consistent branding.
**Example:**
```typescript
// Source: Next.js official docs - generateMetadata
// src/app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yardweasels.ca'), // or Vercel URL
  title: {
    template: '%s | Yard Weasels Inc.',
    default: 'Yard Weasels Inc. | Professional Landscaping in Fergus, Ontario',
  },
  description: 'Premium landscaping services in Fergus, Ontario...',
  openGraph: {
    siteName: 'Yard Weasels Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}
```

### Pattern 2: Per-Page Static Metadata Export
**What:** Each `page.tsx` exports a `metadata` constant with page-specific title, description, and Open Graph fields.
**When to use:** For every page with unique content.
**Example:**
```typescript
// Source: Next.js official docs - generateMetadata
// src/app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Our Story in Fergus, Ontario',
  description: 'Learn about Yard Weasels Inc., a landscaping company rooted in Fergus, Ontario...',
  openGraph: {
    title: 'About Yard Weasels Inc.',
    description: 'Rooted in Fergus, Ontario. Committed to craftsmanship...',
    url: '/about',
    images: [{ url: '/og/about.jpg', width: 1200, height: 630, alt: 'Yard Weasels team' }],
  },
}
```

### Pattern 3: Metadata Merging Behavior
**What:** Next.js shallowly merges metadata from root layout down to page level. Child page metadata replaces parent fields at the same key level. If a page defines `openGraph`, it fully replaces the layout's `openGraph` -- individual OG fields are NOT inherited.
**When to use:** Understanding is critical to avoid missing OG fields on child pages.
**Example:**
```typescript
// Root layout defines openGraph.siteName and openGraph.locale
// Child page MUST repeat siteName and locale if it defines its own openGraph
// Solution: Use a shared constant or spread pattern

// src/lib/metadata.ts
export const siteConfig = {
  name: 'Yard Weasels Inc.',
  url: 'https://yardweasels.ca',
  ogImage: '/og-default.jpg',
} as const

export const sharedOpenGraph = {
  siteName: 'Yard Weasels Inc.',
  locale: 'en_CA',
  type: 'website' as const,
}
```

### Pattern 4: Sitemap Route Handler
**What:** `app/sitemap.ts` exports a default function returning `MetadataRoute.Sitemap` array.
**When to use:** Every production site needs a sitemap.
**Example:**
```typescript
// Source: Next.js official docs - sitemap
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yardweasels.ca'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]
}
```

### Pattern 5: Robots Route Handler
**What:** `app/robots.ts` exports a default function returning `MetadataRoute.Robots` object.
**When to use:** Every production site needs robots.txt.
**Example:**
```typescript
// Source: Next.js official docs - robots
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yardweasels.ca/sitemap.xml',
  }
}
```

### Anti-Patterns to Avoid
- **Defining `openGraph` only in root layout and expecting child pages to inherit fields:** OG metadata is shallowly merged. If a child page defines `openGraph`, it completely replaces the parent's OG object. Always spread shared OG constants.
- **Hardcoding the production URL in every file:** Use a single `siteConfig.url` constant or `metadataBase` to avoid mismatches when the domain changes.
- **Using `generateMetadata` for pages with no dynamic data:** Static `export const metadata` is simpler, has better build-time caching, and avoids runtime overhead. All six YWI pages have static content.
- **Adding `priority={true}` to every image:** Only the LCP image (hero/above-fold) should have `priority`. Adding it to below-fold images wastes bandwidth.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Meta tag injection | Manual `<meta>` tags in `<head>` | Next.js `Metadata` type export | Automatic deduplication, merging, and type safety |
| Sitemap XML generation | String template XML builder | `app/sitemap.ts` with `MetadataRoute.Sitemap` | Automatic XML serialization, correct headers, cached by default |
| Robots.txt generation | Static file in `public/` | `app/robots.ts` with `MetadataRoute.Robots` | Programmatic, can reference sitemap URL dynamically |
| OG image URLs | Manual absolute URL construction | `metadataBase` in root layout | Automatic URL composition from relative paths |
| Title concatenation | String template `${pageTitle} | Company` | `title.template: '%s | Company'` | Built-in template system with proper default/absolute overrides |

**Key insight:** Next.js 16 has first-class metadata support. Every SEO task in this phase maps to a built-in API. There is zero reason to use third-party SEO libraries or manual `<head>` manipulation.

## Common Pitfalls

### Pitfall 1: Open Graph Shallow Merge Surprise
**What goes wrong:** Developer sets `openGraph.siteName` and `openGraph.locale` in root layout, then defines `openGraph.title` and `openGraph.description` in a child page. The child page's output is missing `siteName` and `locale` because Next.js replaces the entire `openGraph` object.
**Why it happens:** Next.js metadata merging is shallow, not deep. Nested objects are fully replaced, not merged field-by-field.
**How to avoid:** Create a shared `sharedOpenGraph` constant in `src/lib/metadata.ts` and spread it into every page's `openGraph` field: `openGraph: { ...sharedOpenGraph, title: '...', description: '...' }`.
**Warning signs:** OG validator tools show missing `og:site_name` or `og:locale` on specific pages.

### Pitfall 2: Missing `metadataBase` Causes Build Warnings
**What goes wrong:** OG images defined with relative paths (like `/og-image.jpg`) generate warnings during build because Next.js cannot resolve them to absolute URLs.
**Why it happens:** `metadataBase` is not set in root layout. Open Graph requires absolute URLs for images.
**How to avoid:** Always set `metadataBase: new URL('https://yardweasels.ca')` in root `layout.tsx`. Use `process.env.VERCEL_PROJECT_PRODUCTION_URL` as fallback for preview deployments.
**Warning signs:** Build output shows metadata URL resolution warnings.

### Pitfall 3: Placeholder Images and Lighthouse LCP
**What goes wrong:** Lighthouse reports poor LCP because the "hero image" is actually a CSS-colored div (`ImagePlaceholder`), which isn't recognized as a meaningful image by the LCP heuristic. Or conversely, the LCP element is the large text headline, which loads fine.
**Why it happens:** The site currently uses `ImagePlaceholder` components (styled divs) instead of real images. Lighthouse LCP measurement targets the largest contentful element, which will be either the hero heading text or the colored placeholder div.
**How to avoid:** Accept current LCP behavior for placeholder state. Document that when real images are added, hero images MUST use `next/image` with `priority={true}` to preload them. Add `// SEO-06: Add priority={true} when replacing with next/image` comments in hero components.
**Warning signs:** LCP score drops significantly when real photos are added without `priority`.

### Pitfall 4: Framer Motion Bundle Affecting Performance Score
**What goes wrong:** Lighthouse performance score drops due to large JavaScript bundle from Framer Motion.
**Why it happens:** Even with `LazyMotion + domAnimation`, the animation library adds client-side JS weight.
**How to avoid:** Already mitigated: the project uses `LazyMotion` with `domAnimation` (not full `animate`), and `'use client'` boundaries are minimal (12 total). Verify bundle size with `next build` output. If needed, consider `@next/bundle-analyzer` to identify any oversized chunks.
**Warning signs:** Lighthouse "Reduce unused JavaScript" diagnostic flags motion-related chunks.

### Pitfall 5: Sitemap URL Mismatch with Production Domain
**What goes wrong:** Sitemap lists `https://yardweasels.ca/...` URLs but the site is deployed to `ywi-website.vercel.app` (or similar), causing search engine confusion.
**Why it happens:** Hardcoded base URL in sitemap doesn't match actual deployment domain.
**How to avoid:** Use a centralized `siteConfig.url` constant. Before launch, update to the final production domain. Consider using `process.env.VERCEL_PROJECT_PRODUCTION_URL` for dynamic resolution, but note this makes the sitemap dynamic (not statically cached).
**Warning signs:** Google Search Console reports URL mismatch between sitemap and canonical URLs.

### Pitfall 6: Lighthouse Mobile vs Desktop Score Gap
**What goes wrong:** Desktop Lighthouse scores 90+ but mobile scores 70-80.
**Why it happens:** Mobile Lighthouse simulates a slower CPU (4x throttle) and network (slow 4G). JavaScript execution and large CSS files have outsized impact on mobile.
**How to avoid:** Test mobile specifically. Common mobile-specific fixes: reduce total JS bundle, ensure no layout shift from fonts (already using `display: 'swap'`), verify no render-blocking resources. The 80+ mobile target in success criteria is realistic for a Framer Motion site.
**Warning signs:** Large gap (20+ points) between desktop and mobile performance scores.

## Code Examples

Verified patterns from official sources:

### Root Layout with Title Template and metadataBase
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/layout.tsx — metadata section only
import type { Metadata } from 'next'

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://yardweasels.ca'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Yard Weasels Inc.',
    default: 'Professional Landscaping in Fergus, Ontario | Yard Weasels Inc.',
  },
  description:
    'Premium landscaping design, build, maintenance, irrigation, snow removal, and quality materials serving Fergus, Ontario and Centre Wellington.',
  keywords: [
    'landscaping Fergus Ontario',
    'landscape design Centre Wellington',
    'snow removal Fergus',
    'irrigation Fergus Ontario',
    'landscaping materials Fergus',
  ],
  openGraph: {
    siteName: 'Yard Weasels Inc.',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Yard Weasels Inc. — Professional Landscaping' }],
  },
}
```

### Per-Page Metadata (About Page Example)
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/about/page.tsx — metadata export added above component
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us — Our Story in Fergus, Ontario',
  description:
    'Meet the Yard Weasels Inc. team. Rooted in Fergus, Ontario, we bring quality craftsmanship to residential, commercial, and municipal landscaping across Centre Wellington.',
  openGraph: {
    title: 'About Yard Weasels Inc. — Fergus, Ontario',
    description:
      'Rooted in Fergus, Ontario. Quality landscaping for residential, commercial, and municipal clients.',
    url: '/about',
    siteName: 'Yard Weasels Inc.',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/og-about.jpg', width: 1200, height: 630, alt: 'Yard Weasels Inc. team' }],
  },
}
```

### Sitemap Generator
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yardweasels.ca'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]
}
```

### Robots Generator
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yardweasels.ca/sitemap.xml',
  }
}
```

### Shared Metadata Constants
```typescript
// src/lib/metadata.ts
export const siteConfig = {
  name: 'Yard Weasels Inc.',
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://yardweasels.ca',
  description: 'Premium landscaping design, build, maintenance, irrigation, snow removal, and quality materials serving Fergus, Ontario and Centre Wellington.',
  ogImage: '/og-default.jpg',
} as const

export const sharedOpenGraph = {
  siteName: siteConfig.name,
  locale: 'en_CA',
  type: 'website' as const,
} as const
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next-seo` third-party library | Built-in Metadata API | Next.js 13.2+ | No external dependency needed; type-safe; automatic merging |
| Static `sitemap.xml` in `public/` | `app/sitemap.ts` route handler | Next.js 13.3+ | Programmatic generation; auto-cached; proper content-type headers |
| Static `robots.txt` in `public/` | `app/robots.ts` route handler | Next.js 13.3+ | Programmatic; can reference sitemap URL dynamically |
| Manual `<Head>` component | `export const metadata` / `generateMetadata` | Next.js 13.2+ | Declarative; merges with parent layouts; no client JS |
| `viewport` in metadata object | `generateViewport` / separate viewport export | Next.js 14+ | Viewport separated from metadata to prevent streaming conflicts |
| Metadata always in `<head>` | Streaming metadata (in `<body>` for dynamic pages) | Next.js 15.2+ | Faster TTFB; bots still get `<head>` metadata via htmlLimitedBots detection |

**Deprecated/outdated:**
- `next-seo` package: Unnecessary since Next.js 13.2; all functionality is built-in
- `viewport` and `themeColor` in `metadata` object: Deprecated since Next.js 14; use `generateViewport` instead
- `colorScheme` in `metadata` object: Deprecated since Next.js 14

## Open Questions

1. **Production domain URL**
   - What we know: The site deploys to Vercel, but no custom domain is confirmed yet. `yardweasels.ca` is a reasonable placeholder.
   - What's unclear: Whether the owner has purchased a domain, or if the site will launch on a Vercel subdomain initially.
   - Recommendation: Use a centralized `siteConfig.url` constant. Set it to `'https://yardweasels.ca'` as default with `VERCEL_PROJECT_PRODUCTION_URL` env var fallback. Easy to update at launch.

2. **Open Graph images for each page**
   - What we know: Real project photos are not yet available (placeholders are in use). OG images need to be 1200x630 for optimal social sharing.
   - What's unclear: Whether to generate placeholder OG images now or wait for real photos.
   - Recommendation: Reference placeholder OG image paths in metadata (e.g., `/og-default.jpg`). When real photos arrive, create proper 1200x630 OG images. For now, a single default OG image is sufficient. The `og:image` tags in metadata should point to `/og-default.jpg` with a note that this is a placeholder.

3. **Lighthouse score with current placeholder architecture**
   - What we know: The site is server-rendered, uses minimal client JS, and has no real images to slow down loading.
   - What's unclear: Exact Lighthouse score in current state. Placeholder divs are lightweight, so scores should be high. But Framer Motion client JS could impact mobile scores.
   - Recommendation: Run `next build` first, then Lighthouse audit on production build (`next start`). Address any specific diagnostics. The 90+ desktop / 80+ mobile targets are realistic for this architecture.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official docs: `generateMetadata` API reference — title templates, metadataBase, OpenGraph fields, metadata merging behavior (https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- Next.js 16.1.6 official docs: `sitemap.ts` file convention — MetadataRoute.Sitemap type, URL objects, auto-serving (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- Next.js 16.1.6 official docs: `robots.ts` file convention — MetadataRoute.Robots type, rules, sitemap reference (https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- Next.js 16.1.6 official docs: Metadata and OG images getting started guide — metadataBase, static vs dynamic, file-based metadata (https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- Next.js 16.1.6 official docs: Production checklist — performance optimizations, metadata/SEO, Core Web Vitals (https://nextjs.org/docs/app/guides/production-checklist)

### Secondary (MEDIUM confidence)
- Codebase audit: All 6 page files confirmed to have zero per-page metadata exports; only root layout.tsx has metadata
- Codebase audit: Heading hierarchy verified correct (one h1 per page in hero components)
- Codebase audit: 12 'use client' boundaries total, LazyMotion with domAnimation, next/font with display: 'swap'
- Codebase audit: No sitemap.ts, robots.ts, or opengraph-image files exist

### Tertiary (LOW confidence)
- Lighthouse score estimates: Based on architecture analysis, not actual measurement. Scores must be verified by running Lighthouse on production build.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All APIs are built into Next.js 16, verified against official docs
- Architecture: HIGH - Patterns are directly from Next.js documentation, verified for v16.1.6
- Pitfalls: HIGH - Metadata merging behavior and metadataBase requirement confirmed in official docs
- Performance: MEDIUM - Architecture analysis suggests 90+ is achievable, but actual Lighthouse score unverified

**Research date:** 2026-02-20
**Valid until:** 2026-03-20 (stable APIs, unlikely to change)
