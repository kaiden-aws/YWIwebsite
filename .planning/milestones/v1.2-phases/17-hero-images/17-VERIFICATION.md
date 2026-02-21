---
phase: 17-hero-images
verified: 2026-02-20T01:35:00Z
status: passed
score: 12/12 must-haves verified
re_verification: false
---

# Phase 17: Hero Images Verification Report

**Phase Goal:** Every page opens with a real landscaping photograph as the hero background instead of a colored placeholder box
**Verified:** 2026-02-20T01:35:00Z
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth                                                                              | Status     | Evidence                                                                                  |
|----|------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------|
| 1  | Home page hero displays a real landscaping photo as full-viewport parallax background | VERIFIED | `HeroParallax.tsx` uses `next/image` with `src="/images/heroes/home-hero.jpg"`, `fill`, `priority`; `home-hero.jpg` is valid 1920x1080 JPEG (302KB) |
| 2  | Home page hero image loads immediately without lazy loading delay (priority)        | VERIFIED   | `priority` prop present on line 34 of `HeroParallax.tsx`                                  |
| 3  | No layout shift occurs when the hero image loads                                    | VERIFIED   | All 6 hero components use `fill` mode inside `absolute inset-0` parent — CLS-safe pattern |
| 4  | Parallax scroll effect still works on the hero background                           | VERIFIED   | `m.div` with `style={{ y }}` via `useTransform(scrollYProgress, [0,1], ['0%','50%'])` wraps image |
| 5  | Reduced motion preference still disables parallax                                   | VERIFIED   | `useReducedMotion()` sets y range to `['0%','0%']` when active                            |
| 6  | About page hero displays a real team/project photo as full-width background          | VERIFIED   | `AboutHero.tsx` uses `next/image` with `src="/images/heroes/about-hero.jpg"`, `fill`, `priority`; `about-hero.jpg` is valid 1920x1080 JPEG (552KB) |
| 7  | Services page hero displays a real crew/project photo as full-width background       | VERIFIED   | `ServicesHero.tsx` uses `next/image` with `src="/images/heroes/services-hero.jpg"`, `fill`, `priority`; `services-hero.jpg` is valid 1920x1306 JPEG (426KB) |
| 8  | Products page hero displays a real retail yard/materials photo as full-width background | VERIFIED | `ProductsHero.tsx` uses `next/image` with `src="/images/heroes/products-hero.jpg"`, `fill`, `priority`; `products-hero.jpg` is valid 1920x1440 JPEG (870KB) |
| 9  | Gallery page hero displays a real completed project photo as full-width background   | VERIFIED   | `GalleryHero.tsx` uses `next/image` with `src="/images/heroes/gallery-hero.jpg"`, `fill`, `priority`; `gallery-hero.jpg` is valid 1920x1080 JPEG (574KB) |
| 10 | Contact page hero displays a real office/team photo as full-width background         | VERIFIED   | `ContactHero.tsx` uses `next/image` with `src="/images/heroes/contact-hero.jpg"`, `fill`, `priority`; `contact-hero.jpg` is valid 1920x1280 JPEG (460KB) |
| 11 | All interior hero images load without layout shift                                   | VERIFIED   | All 5 interior heroes use `fill` inside `absolute inset-0` div — CLS-safe pattern         |
| 12 | All interior hero images use priority loading                                        | VERIFIED   | `priority` prop confirmed on line 13 of each of the 5 interior hero components            |

**Score:** 12/12 truths verified

---

### Required Artifacts

#### Plan 17-01 Artifacts (HERO-01)

| Artifact                                          | Provides                                     | Exists | Substantive                                      | Wired                                          | Status   |
|---------------------------------------------------|----------------------------------------------|--------|--------------------------------------------------|------------------------------------------------|----------|
| `src/components/sections/HeroParallax.tsx`        | Parallax hero with next/image                | Yes    | 45 lines, real implementation — `Image`, `fill`, `priority`, `useReducedMotion`, `useTransform` | Imported and used in `HeroSection.tsx` which is used in `src/app/page.tsx` | VERIFIED |
| `public/images/heroes/home-hero.jpg`              | Home page hero photograph                    | Yes    | Valid JPEG, 1920x1080, 302KB                     | Referenced by `src` prop in `HeroParallax.tsx` | VERIFIED |

#### Plan 17-02 Artifacts (HERO-02 through HERO-06)

| Artifact                                              | Provides                              | Exists | Substantive                                   | Wired                                               | Status   |
|-------------------------------------------------------|---------------------------------------|--------|-----------------------------------------------|-----------------------------------------------------|----------|
| `src/components/sections/about/AboutHero.tsx`         | About hero with next/image background | Yes    | 35 lines, `Image` fill+priority+overlay       | Imported and used in `src/app/about/page.tsx`       | VERIFIED |
| `src/components/sections/services/ServicesHero.tsx`   | Services hero with next/image         | Yes    | 35 lines, `Image` fill+priority+overlay       | Imported and used in `src/app/services/page.tsx`    | VERIFIED |
| `src/components/sections/products/ProductsHero.tsx`   | Products hero with next/image         | Yes    | 35 lines, `Image` fill+priority+overlay       | Imported and used in `src/app/products/page.tsx`    | VERIFIED |
| `src/components/sections/gallery/GalleryHero.tsx`     | Gallery hero with next/image          | Yes    | 35 lines, `Image` fill+priority+overlay       | Imported and used in `src/app/gallery/page.tsx`     | VERIFIED |
| `src/components/sections/contact/ContactHero.tsx`     | Contact hero with next/image          | Yes    | 35 lines, `Image` fill+priority+overlay       | Imported and used in `src/app/contact/page.tsx`     | VERIFIED |
| `public/images/heroes/about-hero.jpg`                 | About page hero photograph            | Yes    | Valid JPEG, 1920x1080, 552KB                  | Referenced by `src` prop in `AboutHero.tsx`         | VERIFIED |
| `public/images/heroes/services-hero.jpg`              | Services page hero photograph         | Yes    | Valid JPEG, 1920x1306, 426KB                  | Referenced by `src` prop in `ServicesHero.tsx`      | VERIFIED |
| `public/images/heroes/products-hero.jpg`              | Products page hero photograph         | Yes    | Valid JPEG, 1920x1440, 870KB                  | Referenced by `src` prop in `ProductsHero.tsx`      | VERIFIED |
| `public/images/heroes/gallery-hero.jpg`               | Gallery page hero photograph          | Yes    | Valid JPEG, 1920x1080, 574KB                  | Referenced by `src` prop in `GalleryHero.tsx`       | VERIFIED |
| `public/images/heroes/contact-hero.jpg`               | Contact page hero photograph          | Yes    | Valid JPEG, 1920x1280, 460KB                  | Referenced by `src` prop in `ContactHero.tsx`       | VERIFIED |

---

### Key Link Verification

| From                          | To                                | Via                   | Status  | Details                                                              |
|-------------------------------|-----------------------------------|-----------------------|---------|----------------------------------------------------------------------|
| `HeroParallax.tsx`            | `/images/heroes/home-hero.jpg`    | `next/image src` prop | WIRED   | `src="/images/heroes/home-hero.jpg"` on line 31; image file confirmed valid JPEG |
| `AboutHero.tsx`               | `/images/heroes/about-hero.jpg`   | `next/image src` prop | WIRED   | `src="/images/heroes/about-hero.jpg"` on line 10                    |
| `ServicesHero.tsx`            | `/images/heroes/services-hero.jpg`| `next/image src` prop | WIRED   | `src="/images/heroes/services-hero.jpg"` on line 10                 |
| `ProductsHero.tsx`            | `/images/heroes/products-hero.jpg`| `next/image src` prop | WIRED   | `src="/images/heroes/products-hero.jpg"` on line 10                 |
| `GalleryHero.tsx`             | `/images/heroes/gallery-hero.jpg` | `next/image src` prop | WIRED   | `src="/images/heroes/gallery-hero.jpg"` on line 10                  |
| `ContactHero.tsx`             | `/images/heroes/contact-hero.jpg` | `next/image src` prop | WIRED   | `src="/images/heroes/contact-hero.jpg"` on line 10                  |
| `HeroSection.tsx`             | `HeroParallax.tsx`                | import + JSX usage    | WIRED   | `import HeroParallax from '@/components/sections/HeroParallax'`; `<HeroParallax>` on lines 8 and 39 |
| `src/app/page.tsx`            | `HeroSection.tsx`                 | import + JSX usage    | WIRED   | `import HeroSection from '@/components/sections/HeroSection'`; `<HeroSection />` on line 32 |

---

### Requirements Coverage

| Requirement | Source Plan | Description                                                                | Status    | Evidence                                                                                  |
|-------------|-------------|----------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------------------|
| HERO-01     | 17-01       | Home page hero displays a real landscaping project photo as full-viewport parallax background | SATISFIED | `HeroParallax.tsx` uses `next/image` fill + parallax `m.div` + `home-hero.jpg` (1920x1080 JPEG) wired through `HeroSection.tsx` to `src/app/page.tsx` |
| HERO-02     | 17-02       | About page hero displays a real team/project photo as full-width background | SATISFIED | `AboutHero.tsx` uses `next/image` fill + priority + `about-hero.jpg` (1920x1080 JPEG), wired to `src/app/about/page.tsx` |
| HERO-03     | 17-02       | Services page hero displays a real crew/project photo as full-width background | SATISFIED | `ServicesHero.tsx` uses `next/image` fill + priority + `services-hero.jpg` (1920x1306 JPEG), wired to `src/app/services/page.tsx` |
| HERO-04     | 17-02       | Products page hero displays a real retail yard/materials photo as full-width background | SATISFIED | `ProductsHero.tsx` uses `next/image` fill + priority + `products-hero.jpg` (1920x1440 JPEG), wired to `src/app/products/page.tsx` |
| HERO-05     | 17-02       | Gallery page hero displays a real completed project photo as full-width background | SATISFIED | `GalleryHero.tsx` uses `next/image` fill + priority + `gallery-hero.jpg` (1920x1080 JPEG), wired to `src/app/gallery/page.tsx` |
| HERO-06     | 17-02       | Contact page hero displays a real office/team photo as full-width background | SATISFIED | `ContactHero.tsx` uses `next/image` fill + priority + `contact-hero.jpg` (1920x1280 JPEG), wired to `src/app/contact/page.tsx` |

All 6 requirement IDs from plan frontmatter are accounted for. No orphaned requirements found in REQUIREMENTS.md.

---

### Anti-Patterns Found

None. No TODO, FIXME, placeholder comments, empty implementations, or stub handlers found in any of the 6 hero components.

Note: `ImagePlaceholder` is still present in other non-hero section components (`GalleryGrid.tsx`, `GalleryLightbox.tsx`, `ProductCategoryGrid.tsx`, `TeamSection.tsx`, `AboutTeaser.tsx`, `ServicesPreview.tsx`, `ServiceCardGrid.tsx`, `ProjectShowcase.tsx`, `ProductsBanner.tsx`). These are outside Phase 17 scope and expected to be addressed in a later migration phase.

---

### Human Verification Required

The following items cannot be verified programmatically:

#### 1. Visual photograph quality — home page

**Test:** Open http://localhost:3000 in a browser and scroll the page.
**Expected:** The hero background shows a real landscaping/outdoor photograph (not a colored box), and the image moves at a slower rate than the foreground text as you scroll (parallax effect).
**Why human:** Visual quality and parallax motion feel cannot be verified via static code analysis.

#### 2. Visual photograph quality — interior pages

**Test:** Open http://localhost:3000/about, /services, /products, /gallery, and /contact.
**Expected:** Each page hero shows a contextually relevant real photograph behind the dark overlay and white heading text. Text remains readable over the image.
**Why human:** Visual appearance, image-to-content contextual fit, and text readability over specific photos cannot be verified programmatically.

#### 3. Absence of cumulative layout shift (CLS) at runtime

**Test:** Use Chrome DevTools Performance panel or Lighthouse on the home page hero.
**Expected:** CLS score of 0 (or near-zero) for the hero section. No visible jump as the page loads.
**Why human:** CLS is a runtime metric; `fill` mode with an absolute-positioned parent is the correct preventive pattern but runtime measurement confirms actual behavior.

---

### Scope Observation

All hero components use sample stock photographs (from picsum.photos and Unsplash) as documented in both SUMMARY files. This is expected and acceptable per plan specification — plans explicitly note the owner will replace with actual business project photos before launch. The phase goal is achieved: real images replace colored placeholder boxes. The photos are photographically valid and meet the technical requirements.

---

_Verified: 2026-02-20T01:35:00Z_
_Verifier: Claude (gsd-verifier)_
