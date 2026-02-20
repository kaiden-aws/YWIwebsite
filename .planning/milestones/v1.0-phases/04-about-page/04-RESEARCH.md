# Phase 4: About Page - Research

**Researched:** 2026-02-18
**Domain:** Interior page composition — hero section, content sections, values grid, team cards, differentiator list (Next.js App Router + Tailwind v4 + Motion)
**Confidence:** HIGH

## Summary

Phase 4 builds the About page from the existing placeholder stub (`src/app/about/page.tsx`) into a full trust-building page with five distinct sections: (1) a page hero with "Our Story" headline and background image placeholder, (2) a company story section about Fergus roots and client types, (3) a values grid with four values and decorative icons, (4) a team section with placeholder member cards, and (5) a "Why Choose Yard Weasels" differentiator section highlighting five competitive advantages including the licensed backflow preventor testing credential.

This is the first interior (non-homepage) page build. The technical challenge is modest compared to Phase 3 — there are no new interactive client-side components needed. Every section on the About page can be a Server Component wrapped in the existing `AnimatedSection` for scroll-triggered animations. The page hero is simpler than the homepage hero: no parallax, no scroll indicator — just a styled banner with a background image placeholder, headline, and optional subtext. All data (team members, values, differentiators) can be defined as static TypeScript arrays in `lib/data/about.ts` or directly in the section components, since this data is page-specific and not shared.

The codebase already provides every building block needed: `AnimatedSection` for scroll animations, `ImagePlaceholder` for photos, `GrainOverlay` for textured sections, the `cn()` utility, and `lucide-react` for icons. No new dependencies need to be installed. The main work is composing these existing primitives into well-structured, content-rich sections with the correct copy and styling.

**Primary recommendation:** Build the About page as a Server Component `page.tsx` that imports section components from `components/sections/about/`. Create a `lib/data/about.ts` for team members and values data. Use `lucide-react` icons for the values grid. No `'use client'` components are needed beyond the existing `AnimatedSection` wrapper. Follow the exact section composition pattern established in the homepage `page.tsx`.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABOUT-01 | Hero with "Our Story" headline and background image placeholder | Interior page hero pattern: full-width section with `ImagePlaceholder` as background, forest green overlay, `font-display` headline. Simpler than homepage hero — no parallax or scroll indicator needed. Use `GrainOverlay` for texture consistency. |
| ABOUT-02 | Company story section — placeholder text about Fergus roots, community, and serving residential/commercial/municipal clients | Server Component with `AnimatedSection` wrapper. Split or full-width layout. Content references existing `AboutTeaser` copy for tone consistency but expands with more detail. Max-width constrained prose. |
| ABOUT-03 | Values grid (Quality, Integrity, Community, Craftsmanship) with decorative icons | 2x2 or 4-column responsive grid. Each value card has a `lucide-react` icon, value name in `font-display`, and a brief description. Icons: `Award` (Quality), `Shield` (Integrity), `Users` (Community), `Hammer` (Craftsmanship). Data in `lib/data/about.ts`. |
| ABOUT-04 | Team section with placeholder cards (photo, name, role) | Grid of team member cards using `ImagePlaceholder` with `aspectRatio="portrait"` for headshots. Name in `font-display`, role in body text. Data in `lib/data/about.ts`. Staggered `AnimatedSection` delay for entrance animation. |
| ABOUT-05 | "Why Choose Yard Weasels" differentiator section listing five specific advantages including licensed backflow preventor testing | Styled list or card grid with 5 differentiators: knowledgeable crew, friendly team, top quality products, design-to-build, licensed backflow preventor testing. Each with icon and description. Can use `CheckCircle` or similar lucide icon for visual consistency. |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | 16.1.6 | App Router, Server Components, page routing | Already installed. About page route exists at `app/about/page.tsx`. |
| `motion` | ^12.34.2 | `AnimatedSection` wrapper uses `m.div` + `whileInView` | Already installed. No new Motion features needed for this phase. |
| `lucide-react` | ^0.574.0 | Decorative icons for values grid and differentiator section | Already installed. Tree-shakeable icons. Used in Header, BackToTop, ScrollIndicator. |
| Tailwind CSS v4 | ^4 | Layout utilities, responsive grid, spacing, colors | Already configured with brand tokens in `@theme`. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `clsx` + `tailwind-merge` | Already installed | `cn()` utility for conditional class composition | Any component with conditional or merged styles |
| `@/components/ui/AnimatedSection` | Existing | Scroll-triggered fade-in/slide-up wrapper | Wrap every About page section for entrance animations |
| `@/components/ui/ImagePlaceholder` | Existing | Styled placeholder boxes for future photos | Hero background, team member headshots |
| `@/components/ui/GrainOverlay` | Existing | Grain texture overlay for visual depth | Hero section and optionally the differentiator section |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `lucide-react` icons for values | Inline SVG custom icons | Lucide is already installed and tree-shakes. Custom SVGs add maintenance. Use lucide. |
| Separate section component files | All sections inline in `page.tsx` | Separate files match established project pattern (Phase 3 used `components/sections/`). Keeps files focused and reusable. Use separate files. |
| Static data in `lib/data/about.ts` | Data inline in components | Static data files match project convention (`services.ts`, `products.ts`, etc.). Centralizes content. Use data file. |
| Interior hero with parallax | Simple banner hero | Parallax adds complexity for diminishing returns on an interior page. Homepage parallax is the "wow" moment. Interior pages use simpler, faster-loading heroes. Use simple banner. |

**Installation:**
```bash
# No new dependencies needed
# Everything required is already installed:
# - motion (AnimatedSection uses m.div)
# - lucide-react (icons for values and differentiators)
# - clsx + tailwind-merge (cn utility)
```

## Architecture Patterns

### Recommended Project Structure (Phase 4 additions)
```
src/
├── app/
│   └── about/
│       └── page.tsx                # REPLACE: Server Component assembling about sections
│
├── components/
│   └── sections/
│       └── about/                  # NEW directory for About page sections
│           ├── AboutHero.tsx       # Server Component — page hero banner
│           ├── CompanyStory.tsx    # Server Component — Fergus roots narrative
│           ├── ValuesGrid.tsx      # Server Component — 4 values with icons
│           ├── TeamSection.tsx     # Server Component — team member cards
│           └── WhyChooseUs.tsx     # Server Component — 5 differentiators
│
├── lib/
│   └── data/
│       └── about.ts               # NEW — team members, values, differentiators
```

### Pattern 1: Interior Page Hero (Simpler Than Homepage)
**What:** A styled banner section with a background image placeholder, colored overlay, headline, and optional subtext. No parallax, no scroll indicator.
**When to use:** All interior pages (About, Services, Products, Gallery, Contact) need a hero that establishes context without the cinematic treatment of the homepage.
**Why simpler:** The homepage hero is the site's showstopper moment with parallax + grain + scroll indicator. Interior heroes should be visually consistent but faster to load and less complex. They orient the visitor ("you're on the About page") rather than creating a cinematic first impression.
**Example:**
```typescript
// components/sections/about/AboutHero.tsx — Server Component
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function AboutHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="About — YWI team working on a landscaping project"
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Our Story
        </h1>
        <p className="text-lg text-cream/80 max-w-2xl mx-auto">
          Building outdoor spaces and community connections across Centre Wellington since day one.
        </p>
      </div>
    </section>
  )
}
```
**Source:** Pattern derived from existing project conventions. The homepage `HeroSection.tsx` uses a wrapper pattern; interior pages use a simpler inline approach since no parallax is needed.

### Pattern 2: Values Grid with Icon Cards
**What:** A 2x2 (mobile) / 4-column (desktop) grid of cards, each containing a decorative icon, a value name, and a brief description.
**When to use:** Displaying a small set of organizational values or feature highlights.
**Example:**
```typescript
// Pattern for values grid
import { Award, Shield, Users, Hammer } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const values = [
  { icon: Award, name: 'Quality', description: '...' },
  { icon: Shield, name: 'Integrity', description: '...' },
  { icon: Users, name: 'Community', description: '...' },
  { icon: Hammer, name: 'Craftsmanship', description: '...' },
]

// Render
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
  {values.map((value, index) => (
    <AnimatedSection key={value.name} delay={index * 0.1}>
      <div className="text-center p-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage/20 mb-4">
          <value.icon className="w-7 h-7 text-forest" />
        </div>
        <h3 className="font-display text-lg text-forest mb-2">{value.name}</h3>
        <p className="text-charcoal/70 text-sm leading-relaxed">{value.description}</p>
      </div>
    </AnimatedSection>
  ))}
</div>
```
**Note:** The `lucide-react` icon components accept `className` for sizing and coloring. The circular icon container (`rounded-full bg-sage/20`) creates visual consistency with the earthy palette.

### Pattern 3: Team Member Cards
**What:** A responsive grid of team cards, each with a portrait image placeholder, name, and role.
**When to use:** Team sections with placeholder or real headshot photos.
**Example:**
```typescript
// Pattern for team cards
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import AnimatedSection from '@/components/ui/AnimatedSection'

const teamMembers = [
  { name: 'Team Member Name', role: 'Position', image: 'Team — [Name] headshot' },
  // ...
]

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
  {teamMembers.map((member, index) => (
    <AnimatedSection key={member.name} delay={index * 0.1}>
      <div className="text-center">
        <ImagePlaceholder
          label={member.image}
          aspectRatio="portrait"
          className="rounded-xl mb-4"
        />
        <h3 className="font-display text-lg text-forest">{member.name}</h3>
        <p className="text-charcoal/60 text-sm">{member.role}</p>
      </div>
    </AnimatedSection>
  ))}
</div>
```
**Note:** `ImagePlaceholder` already supports `aspectRatio="portrait"` (3:4 ratio), which is ideal for headshots. The team data should be in `lib/data/about.ts` since team members may change and centralizing data is the project convention.

### Pattern 4: Differentiator List with Icons
**What:** A styled section listing competitive advantages, each with an icon and description.
**When to use:** "Why Choose Us" or "Our Advantages" sections.
**Example:**
```typescript
// Pattern for differentiator section
import { CheckCircle } from 'lucide-react'

const differentiators = [
  { title: 'Knowledgeable Crew', description: '...' },
  { title: 'Friendly, Approachable Team', description: '...' },
  { title: 'Top Quality Products', description: '...' },
  { title: 'Design-to-Build Service', description: '...' },
  { title: 'Licensed Backflow Preventor Testing', description: '...' },
]

<div className="space-y-6">
  {differentiators.map((item) => (
    <div key={item.title} className="flex gap-4 items-start">
      <CheckCircle className="w-6 h-6 text-terracotta flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-display text-lg text-forest mb-1">{item.title}</h3>
        <p className="text-charcoal/70 leading-relaxed">{item.description}</p>
      </div>
    </div>
  ))}
</div>
```
**Note:** The backflow preventor testing credential is specifically called out in the requirements. This is a legal differentiator in Ontario — licensed backflow testing is required for irrigation systems, and not all landscapers hold this certification. The description for this differentiator should highlight the licensing aspect explicitly.

### Pattern 5: Server Component Page Composition
**What:** The `about/page.tsx` remains a Server Component (no `'use client'`) that imports and renders section components. This matches the homepage pattern.
**Example:**
```typescript
// app/about/page.tsx — Server Component (NO 'use client')
import AboutHero from '@/components/sections/about/AboutHero'
import CompanyStory from '@/components/sections/about/CompanyStory'
import ValuesGrid from '@/components/sections/about/ValuesGrid'
import TeamSection from '@/components/sections/about/TeamSection'
import WhyChooseUs from '@/components/sections/about/WhyChooseUs'

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <CompanyStory />
      <ValuesGrid />
      <TeamSection />
      <WhyChooseUs />
    </div>
  )
}
```
**Key:** Page uses `<div>` not `<section>` or `<main>` as the root wrapper, per the established convention ("Root layout owns the single `<main>` element -- all page components use `<div>` to avoid nesting").

### Anti-Patterns to Avoid
- **`'use client'` on page.tsx or section components:** None of the About page sections need client-side hooks. `AnimatedSection` is the only client component, used as a child wrapper. Keep everything server-rendered.
- **Using `motion.div` instead of `m.div`:** The project uses `LazyMotion strict` mode. Always import `m` from `motion/react`.
- **Parallax on the interior hero:** The homepage owns the parallax hero. Interior page heroes should be simple, fast-loading banner sections. Adding parallax here dilutes the homepage's impact and adds unnecessary complexity.
- **Hardcoding team/values data in components:** Follow the `lib/data/` convention. Even though this data is About-page-specific, centralizing it makes content updates easier and keeps components focused on presentation.
- **Using `<main>` as root element in page.tsx:** Root layout already wraps `{children}` in `<main>`. Page components must use `<div>`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered animations | Custom IntersectionObserver | Existing `AnimatedSection` component | Already built and tested. Uses `m.div` + `whileInView` with `viewport={{ once: true }}`. |
| Image placeholders | Custom placeholder generation | Existing `ImagePlaceholder` component | Supports `label`, `aspectRatio` (video/square/portrait/wide), `className`. Already built in Phase 1. |
| Grain texture overlay | Canvas/WebGL noise generation | Existing `GrainOverlay` component | SVG `feTurbulence` as data URL. Zero JS. Already built in Phase 1. |
| Class merging | Manual string concatenation | Existing `cn()` utility | `clsx` + `tailwind-merge`. Already built in Phase 1. |
| Decorative icons | Custom SVG icon set | `lucide-react` | Already installed (v0.574.0). Tree-shakeable. Over 1000 icons available. |
| Page transition | Custom route change animation | Existing `PageTransitionWrapper` | AnimatePresence + FrozenRouter. Already in root layout. |

**Key insight:** Phase 4 is a composition phase, not a primitives phase. Every UI primitive needed already exists. The work is writing content, structuring sections, and composing existing building blocks into a cohesive page.

## Common Pitfalls

### Pitfall 1: Hero Content Hidden Behind Sticky Header
**What goes wrong:** The About page hero content starts at `top: 0`, but the sticky header occupies ~64-80px, so the top portion of the hero is obscured.
**Why it happens:** Interior page heroes don't use `min-h-screen` + centered flexbox like the homepage hero. The content starts at the top of the section.
**How to avoid:** Use generous top padding on the hero section (`py-32 md:py-40` or `pt-32 pb-20 md:pt-40 md:pb-24`). The header is approximately 64px on mobile and 80px on desktop. With `py-32` (128px), there is plenty of clearance. Alternatively, use `pt-36 md:pt-44` to specifically account for the header height.
**Warning signs:** "Our Story" headline partially hidden behind the header on load.

### Pitfall 2: Inconsistent Section Spacing
**What goes wrong:** Sections have different padding values, creating a visually uneven page rhythm.
**Why it happens:** Each section component sets its own `py-*` value without following a consistent pattern.
**How to avoid:** Use the established section padding convention from the homepage: `py-20 md:py-28 px-6`. Apply this consistently to every section. The hero can have different padding since it's a special banner element.
**Warning signs:** Some sections feel cramped while others feel spacious.

### Pitfall 3: Values Grid Icon Inconsistency
**What goes wrong:** Icons have different visual weights, sizes, or styling, making the grid look unbalanced.
**Why it happens:** Lucide icons have varying visual weights. Some are filled, some are outlined, some have more detail.
**How to avoid:** Choose icons from the same style family (all outline, or all with similar stroke weight). Set consistent sizing (`w-7 h-7`) and use a uniform container (`w-14 h-14 rounded-full bg-sage/20`) for all icons. Test the four chosen icons side-by-side to ensure visual balance.
**Warning signs:** One icon appears heavier or larger than others in the grid.

### Pitfall 4: Team Section with Unknown Number of Members
**What goes wrong:** The grid layout breaks or looks awkward with a team count that doesn't fill the grid evenly (e.g., 3 members in a 4-column grid, or 5 members).
**Why it happens:** CSS Grid with fixed columns leaves empty cells when the item count doesn't divide evenly.
**How to avoid:** Choose a team member count that fills the grid cleanly. For a 4-column desktop layout, use 4 or 8 members. For a 3-column layout, use 3 or 6. Alternatively, use `justify-items-center` or flexbox centering to distribute incomplete rows attractively. Since these are placeholder team members, the count is designer's choice — pick a number that works with the grid.
**Warning signs:** Last row has a single orphaned card pushed to the left.

### Pitfall 5: Differentiator Section Missing Backflow Credential Detail
**What goes wrong:** The "Licensed Backflow Preventor Testing" differentiator is listed but not explained, so visitors don't understand why it matters.
**Why it happens:** Treating all five differentiators as equal when one (backflow testing) is a specific technical credential.
**How to avoid:** Give the backflow testing differentiator a description that explains: (a) what backflow preventor testing is, (b) why it matters (legal requirement for irrigation in Ontario), and (c) that YWI is licensed to perform it. This is a genuine competitive differentiator against unlicensed competitors.
**Warning signs:** Backflow testing listed as a bullet point with no context for why it's special.

### Pitfall 6: About Page Not Using `<div>` Root
**What goes wrong:** Using `<section>` or `<main>` as the page root causes invalid HTML nesting since root layout wraps children in `<main>`.
**Why it happens:** Natural instinct to use semantic elements at the page level.
**How to avoid:** Follow the established convention: page components use `<div>` as root. Each section component can use `<section>` for semantic HTML within the page.
**Warning signs:** HTML validation errors about nested `<main>` elements.

## Code Examples

### Lucide React Icon Usage (Verified in Codebase)
```typescript
// Existing usage pattern from HeaderClient.tsx and BackToTop.tsx
import { Menu, Phone } from 'lucide-react'
import { ArrowUp } from 'lucide-react'
import { X } from 'lucide-react'
import { ChevronDown } from 'lucide-react'

// Icons accept className for sizing and color
<Phone className="w-4 h-4" />
<ArrowUp className="w-5 h-5" />

// For values grid, recommended icons:
import { Award, Shield, Users, Hammer } from 'lucide-react'
// Alternatives if visual weight doesn't match:
// Award → Trophy, Medal, Star
// Shield → ShieldCheck
// Users → Heart, Handshake
// Hammer → Wrench, PenTool
```
**Source:** Verified from existing codebase files: `HeaderClient.tsx`, `BackToTop.tsx`, `MobileDrawer.tsx`, `ScrollIndicator.tsx`.

### About Data File Structure
```typescript
// lib/data/about.ts
import type { LucideIcon } from 'lucide-react'
import { Award, Shield, Users, Hammer } from 'lucide-react'

export interface Value {
  icon: LucideIcon
  name: string
  description: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export interface Differentiator {
  title: string
  description: string
}

export const values: Value[] = [
  {
    icon: Award,
    name: 'Quality',
    description: 'We use premium materials and proven techniques to deliver results that stand the test of time.',
  },
  {
    icon: Shield,
    name: 'Integrity',
    description: 'Honest pricing, clear communication, and doing what we say we will — every time.',
  },
  {
    icon: Users,
    name: 'Community',
    description: 'Proudly rooted in Fergus and committed to the neighbourhoods we serve across Centre Wellington.',
  },
  {
    icon: Hammer,
    name: 'Craftsmanship',
    description: 'Every project receives the same care and attention to detail, from design through final walkthrough.',
  },
]

export const teamMembers: TeamMember[] = [
  // Placeholder team — exact count should fill grid cleanly (4 or 3)
  { id: 'member-1', name: 'Team Member', role: 'Owner / Lead Designer', image: 'Team — Owner headshot' },
  { id: 'member-2', name: 'Team Member', role: 'Project Manager', image: 'Team — Project manager headshot' },
  { id: 'member-3', name: 'Team Member', role: 'Lead Installer', image: 'Team — Lead installer headshot' },
  { id: 'member-4', name: 'Team Member', role: 'Irrigation Specialist', image: 'Team — Irrigation specialist headshot' },
]

export const differentiators: Differentiator[] = [
  {
    title: 'Knowledgeable Crew',
    description: 'Our team brings years of hands-on experience across residential, commercial, and municipal projects.',
  },
  {
    title: 'Friendly, Approachable Team',
    description: 'We believe great work starts with great communication. Our crew is easy to work with from day one.',
  },
  {
    title: 'Top Quality Products',
    description: 'We source and stock premium landscape materials at our retail yard — the same products we use on our own projects.',
  },
  {
    title: 'Design-to-Build Service',
    description: 'From initial consultation through final installation, one team handles your entire project seamlessly.',
  },
  {
    title: 'Licensed Backflow Preventor Testing',
    description: 'We hold the required certification for backflow preventor testing on irrigation systems — a credential many landscapers lack. This means your irrigation project stays fully compliant with Ontario regulations.',
  },
]
```
**Note:** The `LucideIcon` type import allows typing icon components in the `Value` interface. This is a pattern supported by lucide-react for passing icon components as data. The team member count (4) fills a 4-column grid cleanly on desktop and a 2-column grid on mobile.

### Section Padding Convention (From Existing Sections)
```typescript
// Established padding values from Phase 3 sections:
// ServicesPreview: py-20 md:py-28 px-6 bg-white
// AboutTeaser:     py-20 md:py-28 px-6
// ProductsBanner:  py-20 md:py-28 px-6 bg-forest
// ProjectShowcase: py-20 md:py-28 px-6 bg-white
// TestimonialCarousel: py-20 md:py-28 px-6
// CTABanner:       py-20 md:py-28 px-6 bg-terracotta

// Convention: py-20 md:py-28 px-6, max-w-7xl mx-auto for content container
// Alternate backgrounds for visual rhythm: cream (default) → white → forest → cream → etc.
```

### About Page Hero (Full Example)
```typescript
// components/sections/about/AboutHero.tsx
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import GrainOverlay from '@/components/ui/GrainOverlay'

export default function AboutHero() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          label="About — YWI team working on a landscaping project"
          className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
        />
      </div>
      <GrainOverlay />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
          Our Story
        </h1>
        <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
          Rooted in Fergus. Committed to craftsmanship. Building outdoor spaces that inspire.
        </p>
      </div>
    </section>
  )
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Large hero with parallax on all pages | Parallax reserved for homepage; interior pages use simple banner heroes | Industry pattern | Reduces load time and complexity on interior pages. Preserves homepage impact. |
| Team photos as circular crops | Full portrait cards with rounded corners | Design trend | Rectangular portraits show more personality and fit modern card layouts better. |
| Values as icon + single word | Values as icon + name + description | Content strategy | Brief descriptions help visitors understand what each value means in practice, not just as a buzzword. |
| Generic "About Us" hero | Industry-specific imagery and contextual subtext | Always | An About hero that says "landscaping team at work" is more trust-building than a generic nature photo. |

**Deprecated/outdated:**
- Nothing specific to this phase. All existing codebase patterns remain current.

## Open Questions

1. **Team member count and names**
   - What we know: Requirements say "placeholder cards with photo placeholder, name, and role." The actual team members are not specified.
   - What's unclear: How many team members to show, and whether to use real names or generic "Team Member" placeholders.
   - Recommendation: Use 4 placeholder team members with generic names and realistic roles (Owner, Project Manager, Lead Installer, Irrigation Specialist). This fills a 4-column grid cleanly and represents the likely team structure. The owner will replace with real names and photos.

2. **Company story content depth**
   - What we know: ABOUT-02 says "placeholder text about Fergus roots, community, and serving residential/commercial/municipal clients." The `AboutTeaser` on the homepage already has 2 paragraphs of similar content.
   - What's unclear: How much more detailed the About page story should be compared to the homepage teaser.
   - Recommendation: Write 3-4 paragraphs that expand on the homepage teaser. Cover: origin story (founding in Fergus), growth (from residential to commercial and municipal), community ties, and the retail materials yard as a local resource. This gives the page substance while remaining placeholder-ready for real copy.

3. **Section background alternation pattern**
   - What we know: The homepage alternates between cream (default bg), white, forest, and terracotta backgrounds for visual rhythm.
   - What's unclear: What background pattern to use for the About page's 5 sections.
   - Recommendation: Hero (forest with image overlay) -> Story (cream/default) -> Values (white) -> Team (cream/default) -> Why Choose Us (forest or sage-tinted). This creates visual rhythm without making the page feel fragmented.

## Sources

### Primary (HIGH confidence)
- Existing codebase analysis: all `components/sections/`, `components/ui/`, `lib/data/`, `app/page.tsx`, `app/about/page.tsx`, `app/layout.tsx` — patterns verified by reading source files directly
- `lucide-react` usage verified in codebase: `HeaderClient.tsx` (Menu, Phone), `BackToTop.tsx` (ArrowUp), `MobileDrawer.tsx` (X), `ScrollIndicator.tsx` (ChevronDown)
- `ImagePlaceholder` component API verified: accepts `label`, `aspectRatio` (video/square/portrait/wide), `className`
- `AnimatedSection` component API verified: accepts `children`, `className`, `delay`
- Section padding convention extracted from 6 existing homepage sections: `py-20 md:py-28 px-6`
- Page composition pattern verified from `app/page.tsx`: Server Component importing section components

### Secondary (MEDIUM confidence)
- `lucide-react` icon availability: `Award`, `Shield`, `Users`, `Hammer`, `CheckCircle` are standard lucide icons. Verified through project's installed version (^0.574.0) which includes all standard icons.
- `LucideIcon` type export: lucide-react exports a `LucideIcon` TypeScript type for typing icon components in data structures. This is a documented pattern.

### Tertiary (LOW confidence)
- None. This phase relies entirely on established codebase patterns and installed dependencies. No external research was needed.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — No new dependencies. Everything already installed and verified in codebase.
- Architecture: HIGH — Server Component page + section composition pattern is identical to Phase 3 homepage. Interior page hero is simpler (no parallax). All section components are Server Components.
- Pitfalls: HIGH — Header overlap, section spacing, and grid layout pitfalls are well-understood from Phase 3 experience. Icon consistency is the only new concern.
- Content structure: MEDIUM — Team member count and company story depth are content decisions, not technical risks. Defaults are reasonable and easy to change.

**Research date:** 2026-02-18
**Valid until:** 2026-03-18 (stable — no rapidly changing dependencies or patterns)
