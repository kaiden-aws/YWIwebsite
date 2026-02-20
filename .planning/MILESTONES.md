# Milestones

## v1.0 MVP (Shipped: 2026-02-20)

**Delivered:** A premium 6-page marketing website for Yard Weasels Inc. with earthy luxury design, scroll animations, interactive calculator, filterable gallery with lightbox, validated contact form, per-page SEO, and WCAG AA accessibility.

**Phases completed:** 11 phases (1-10 + 7.1), 24 plans
**Files modified:** 151
**Lines of code:** 3,287 TypeScript/CSS
**Timeline:** 2 days (2026-02-18 → 2026-02-20)
**Git range:** feat(01-01) → feat(10-02)

**Key accomplishments:**
1. Next.js 16 + Tailwind v4 design system with DM Serif Display/Plus Jakarta Sans typography and reusable animation primitives (AnimatedSection, ImagePlaceholder, GrainOverlay)
2. Sticky nav with scroll blur, mobile hamburger drawer, multi-column footer with both addresses, back-to-top button, and AnimatePresence page transitions
3. Full homepage with hero parallax, services preview, about teaser, products banner, project showcase, testimonial carousel, and CTA banner — all server-rendered with minimal client JS
4. Five content pages (About, Services, Products, Gallery, Contact) each with dedicated data layers, hero sections, and page-specific interactive components
5. Interactive Material Calculator with validation and filterable masonry gallery with keyboard-navigable lightbox and focus trap
6. Per-page SEO metadata with Open Graph tags, sitemap/robots.txt, WCAG AA accessibility (focus states, contrast, ARIA, reduced motion), and 44px+ touch targets

**Tech debt carried forward:**
- PageTransitionWrapper uses internal Next.js API (LayoutRouterContext) — fragile on upgrades
- Six OG image files missing from public/ — social sharing previews show no image
- Contact form service dropdown not synced with services.ts canonical source
- Header CTA ~40px height — 4px below 44px touch target threshold
- MaterialCalculator depth 0.5in min: HTML-only validation
- Lightbox selectedIndex not reset on filter change
- Lighthouse 90+ needs human verification on deployed preview

---

