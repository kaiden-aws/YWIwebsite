# Phase 8: Contact Page - Research

**Researched:** 2026-02-19
**Domain:** React form handling, client-side validation, split-layout contact pages
**Confidence:** HIGH

## Summary

Phase 8 builds a Contact page with a split layout: contact form on the left and an info panel on the right (stacking vertically on mobile). The form is **UI-only** (no backend submission) — CONT-05 explicitly states no network request. On valid submission, a success confirmation replaces or overlays the form. The info panel displays both addresses, phone, hours, and a styled map placeholder area.

This phase is straightforward because the project already has strong precedents. The MaterialCalculator component (`src/components/sections/products/MaterialCalculator.tsx`) establishes the exact pattern for form state management, validation, inline errors, and input styling. The Footer and `companyInfo` from `navigation.ts` already contain all the contact data needed for the info panel. No new dependencies are required.

**Primary recommendation:** Use the MaterialCalculator's `useState` + validate-on-submit pattern for the contact form. Split the page into two plans: (1) page layout, hero, info panel, and map placeholder as server components, and (2) the contact form as a single `'use client'` component with validation and success state.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Split layout — contact form left, info panel right | Use CSS Grid `grid-cols-1 lg:grid-cols-2` with gap, matching the project's responsive pattern. Stacks vertically on mobile by default. |
| CONT-02 | Form fields: Name, Email, Phone, Service Interest dropdown (7 options), Message | 5 fields. Service Interest options: Residential, Commercial, Municipal, Snow Removal, Irrigation, Products/Materials, Other. Use text inputs for Name/Email/Phone, `<select>` for dropdown (matches MaterialCalculator pattern), `<textarea>` for Message. |
| CONT-03 | Polished form styling with floating labels or clean input design | Use clean input design consistent with MaterialCalculator: `px-4 py-3 rounded-lg border border-charcoal/20 focus:border-forest focus:ring-2 focus:ring-forest/30`. Floating labels are optional — the project uses standard label-above-input. Keep consistency. |
| CONT-04 | Client-side form validation with inline error messages | Validate on submit (not on change). Required fields: Name, Email, Message. Email regex check. Inline `<p role="alert">` below each field with `text-red-600`, matching MaterialCalculator's exact error pattern. |
| CONT-05 | Form is UI-only (no backend submission) with success state | On valid submit: `setSubmitted(true)` to show success message. No `fetch`, no server action. Success state shows confirmation text without navigating away. |
| CONT-06 | Contact info panel: both addresses, phone, hours | Import `companyInfo` from `@/lib/data/navigation`. Display officeAddress, retailYardAddress, phone, hours. All data already exists in the canonical data file. |
| CONT-07 | Google Maps placeholder (styled map area or iframe placeholder) | A styled `div` with a map-like appearance (sage/forest background, pin icon, "Map loading..." or address text). No actual Google Maps embed needed — placeholder only. |
| CONT-08 | Bottom section: "Prefer to talk? Call us directly at 519-843-5489" | A full-width CTA section below the split layout. Use forest background with GrainOverlay, matching ServicesContact pattern. Phone number links to `tel:5198435489`. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React 19 | 19.2.3 | Component framework, useState for form state | Already installed, project standard |
| Next.js | 16.1.6 | App Router, page routing, server components | Already installed, project standard |
| Tailwind CSS | v4 | Styling via utility classes, @theme tokens | Already installed, project standard |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.574.0 | Icons (MapPin, Phone, Clock, Mail) for info panel | Already installed, used across project |
| motion | 12.34.2 | AnimatedSection wrapper for scroll-triggered animations | Already installed, used on all pages |
| clsx + tailwind-merge | via cn() | Conditional class merging | Already installed, used across project |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual validation | react-hook-form + zod | Overkill for 5 fields, no backend submission, adds bundle weight. Manual validation matches existing MaterialCalculator pattern. |
| Floating labels | Standard label-above-input | Floating labels require extra CSS complexity and can have accessibility issues. Standard labels match existing project convention. |
| Google Maps embed | Styled placeholder div | Requirements say "placeholder" — no iframe needed for v1. Avoids API key management and third-party JS. |

**Installation:**
```bash
# No new packages needed — all dependencies already installed
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/contact/
│   └── page.tsx                        # Server Component — composes sections
├── components/sections/contact/
│   ├── ContactHero.tsx                 # Server Component — hero banner
│   ├── ContactLayout.tsx               # Server Component — split layout wrapper
│   ├── ContactForm.tsx                 # 'use client' — form with validation + success state
│   ├── ContactInfoPanel.tsx            # Server Component — addresses, phone, hours, map
│   └── ContactCallout.tsx              # Server Component — "Prefer to talk?" CTA
└── lib/data/
    └── navigation.ts                   # Already has companyInfo (addresses, phone, hours)
```

### Pattern 1: Page Composition (Server Component Page)
**What:** Page file imports and composes section components, all Server Components except the form.
**When to use:** Every page in this project follows this pattern.
**Example:**
```typescript
// src/app/contact/page.tsx
import ContactHero from '@/components/sections/contact/ContactHero'
import ContactLayout from '@/components/sections/contact/ContactLayout'
import ContactCallout from '@/components/sections/contact/ContactCallout'

export default function ContactPage() {
  return (
    <div>
      <ContactHero />
      <ContactLayout />
      <ContactCallout />
    </div>
  )
}
```

### Pattern 2: Form State Management (from MaterialCalculator)
**What:** useState for form values (as strings), useState for errors, validate-on-submit, inline error display.
**When to use:** This is the established form pattern in this project.
**Example:**
```typescript
// Matches MaterialCalculator pattern exactly
interface ContactFormState {
  name: string
  email: string
  phone: string
  serviceInterest: string
  message: string
}

interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const [form, setForm] = useState<ContactFormState>({
  name: '',
  email: '',
  phone: '',
  serviceInterest: 'residential',
  message: '',
})
const [errors, setErrors] = useState<ContactFormErrors>({})
const [submitted, setSubmitted] = useState(false)
```

### Pattern 3: Interior Page Hero (from AboutHero / GalleryHero)
**What:** Standard hero banner with forest background, GrainOverlay, ImagePlaceholder, centered h1 + subtitle.
**When to use:** Every interior page uses this exact pattern.
**Example:**
```typescript
<section className="relative py-32 md:py-40 px-6 bg-forest overflow-hidden">
  <div className="absolute inset-0">
    <ImagePlaceholder
      label="Contact — Yard Weasels office and team"
      className="!aspect-auto h-full w-full !rounded-none !bg-forest-light/30"
    />
  </div>
  <GrainOverlay />
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
      Get in Touch
    </h1>
    <p className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto">
      Ready to start your project? We&apos;d love to hear from you.
    </p>
  </div>
</section>
```

### Pattern 4: Split Layout with Responsive Stacking
**What:** CSS Grid two-column on desktop, single-column stacking on mobile.
**When to use:** The contact page split layout (CONT-01).
**Example:**
```typescript
<section className="py-20 md:py-28 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      {/* Left: Contact Form */}
      <ContactForm />
      {/* Right: Info Panel */}
      <ContactInfoPanel />
    </div>
  </div>
</section>
```

### Pattern 5: Success State (UI-Only Submission)
**What:** Replace form with success confirmation on valid submit.
**When to use:** CONT-05 requires no network request, just visual confirmation.
**Example:**
```typescript
if (submitted) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/20 mb-6">
        <CheckCircle className="w-8 h-8 text-forest" />
      </div>
      <h3 className="font-display text-2xl text-forest mb-3">
        Message Sent!
      </h3>
      <p className="text-charcoal/70 max-w-md mx-auto">
        Thank you for reaching out. We&apos;ll get back to you within one business day.
      </p>
    </div>
  )
}
```

### Anti-Patterns to Avoid
- **Don't use `<form action={serverAction}>`:** CONT-05 requires UI-only, no backend. Do not use React 19 server actions or any `action` prop.
- **Don't validate on every keystroke:** Matches MaterialCalculator convention — validate on submit only. Avoids annoying the user while typing.
- **Don't clear fields on validation error:** CONT-04 explicitly says "without clearing other fields." Only show error messages; preserve all input values.
- **Don't add `'use client'` to the page or layout:** Only ContactForm needs it. Info panel, hero, callout are all Server Components.
- **Don't hardcode addresses/phone:** Import from `companyInfo` in `navigation.ts` — single source of truth matching Footer.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email validation | Custom regex from scratch | Standard email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | Simple pattern catches 99% of invalid emails. Full RFC 5322 compliance is overkill for a contact form with no backend. |
| Contact info data | Hardcoded strings in components | `companyInfo` from `@/lib/data/navigation.ts` | Already canonical source used by Footer. Prevents data drift. |
| Scroll animations | Custom intersection observer | `AnimatedSection` wrapper component | Already built, tested, used on every page section. |
| Conditional classes | Manual string concatenation | `cn()` utility (`clsx` + `tailwind-merge`) | Project standard. Handles conditional and merge conflicts. |

**Key insight:** The entire form pattern (state, validation, error display, input styling) already exists in MaterialCalculator. The contact form is structurally the same — just different fields and a success state instead of a calculation result.

## Common Pitfalls

### Pitfall 1: Form Doesn't Preserve Input on Validation Error
**What goes wrong:** User fills 4 of 5 fields, submits, form clears all fields and only shows errors.
**Why it happens:** Resetting form state alongside error state, or using uncontrolled inputs.
**How to avoid:** Use controlled inputs (value + onChange on every field). Validation only sets error state — never touches form state.
**Warning signs:** Form values disappear after clicking submit.

### Pitfall 2: Dropdown Has No Default/Placeholder
**What goes wrong:** Service Interest dropdown pre-selects the first option, making it look like the user chose it.
**Why it happens:** `<select>` defaults to first `<option>`.
**How to avoid:** Add a disabled placeholder option: `<option value="" disabled>Select a service...</option>` and initialize state with `''`. Note: if Service Interest is not marked required, this is fine as-is. If it is required, validate that value is not empty.
**Warning signs:** Analytics (future) show most inquiries are "Residential" because it was the default.

### Pitfall 3: Missing aria-describedby / aria-invalid on Inputs
**What goes wrong:** Screen readers don't announce error messages alongside their fields.
**Why it happens:** Forgetting to add the accessibility attributes that link input to error message.
**How to avoid:** Every input with a potential error gets `aria-describedby={errors.field ? 'field-error-id' : undefined}` and `aria-invalid={!!errors.field}`, matching MaterialCalculator.
**Warning signs:** Accessibility audit flags form errors as not associated with inputs.

### Pitfall 4: Success State Causes Layout Shift
**What goes wrong:** Form disappears and success message is much shorter, causing the page to jump.
**Why it happens:** Success confirmation has less content than the form.
**How to avoid:** Give the success state a `min-h` that approximates the form height, or use padding to keep the area visually stable.
**Warning signs:** Page visually jumps when user submits a valid form.

### Pitfall 5: Textarea Not Vertically Resizable
**What goes wrong:** Users can't resize the message textarea, making long messages awkward.
**Why it happens:** Default textarea behavior varies; some resets prevent resizing.
**How to avoid:** Use `resize-y` class on textarea, set sensible `rows={5}` default.
**Warning signs:** Users complain about small message area.

## Code Examples

Verified patterns from the existing project codebase:

### Input Field with Inline Error (from MaterialCalculator)
```typescript
// Source: src/components/sections/products/MaterialCalculator.tsx
<div>
  <label
    htmlFor="contact-name"
    className="block text-sm font-medium text-charcoal mb-1"
  >
    Name <span className="text-red-500">*</span>
  </label>
  <input
    id="contact-name"
    type="text"
    value={form.name}
    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
    aria-describedby={errors.name ? 'contact-name-error' : undefined}
    aria-invalid={!!errors.name}
    className={cn(
      'w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-forest/30',
      errors.name
        ? 'border-red-500'
        : 'border-charcoal/20 focus:border-forest'
    )}
  />
  {errors.name && (
    <p id="contact-name-error" role="alert" className="text-sm text-red-600 mt-1">
      {errors.name}
    </p>
  )}
</div>
```

### Select Dropdown (from MaterialCalculator)
```typescript
// Source: src/components/sections/products/MaterialCalculator.tsx
<select
  id="contact-service"
  value={form.serviceInterest}
  onChange={(e) => setForm((prev) => ({ ...prev, serviceInterest: e.target.value }))}
  className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30 transition-colors bg-white"
>
  <option value="" disabled>Select a service...</option>
  <option value="residential">Residential</option>
  <option value="commercial">Commercial</option>
  <option value="municipal">Municipal</option>
  <option value="snow-removal">Snow Removal</option>
  <option value="irrigation">Irrigation</option>
  <option value="products-materials">Products / Materials</option>
  <option value="other">Other</option>
</select>
```

### CTA Section (from ServicesContact)
```typescript
// Source: src/components/sections/services/ServicesContact.tsx
<section className="relative py-20 md:py-28 px-6 bg-forest overflow-hidden">
  <GrainOverlay />
  <AnimatedSection className="relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
        Prefer to talk?
      </h2>
      <p className="text-cream/80 text-lg mb-8">
        Call us directly at{' '}
        <a href={companyInfo.phoneHref} className="text-cream underline font-medium">
          {companyInfo.phone}
        </a>
      </p>
    </div>
  </AnimatedSection>
</section>
```

### Validation Function Pattern
```typescript
// Adapted from MaterialCalculator validate() pattern
function validate(): ContactFormErrors {
  const newErrors: ContactFormErrors = {}

  if (!form.name.trim()) {
    newErrors.name = 'Name is required'
  }

  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!form.message.trim()) {
    newErrors.message = 'Message is required'
  }

  // Phone and Service Interest are optional — no validation needed
  return newErrors
}
```

### Info Panel Contact Data (from navigation.ts)
```typescript
// Source: src/lib/data/navigation.ts
import { companyInfo } from '@/lib/data/navigation'

// companyInfo.phone → '519-843-5489'
// companyInfo.phoneHref → 'tel:5198435489'
// companyInfo.hours → 'Mon-Fri 8:00 AM - 5:00 PM'
// companyInfo.officeAddress → { label: 'Office', street: '8146 Sideroad 15', city: 'Fergus, Ontario' }
// companyInfo.retailYardAddress → { label: 'Retail Yard', street: '6470 Beatty Line N', city: 'Fergus, Ontario' }
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `onChange` validation (validate per keystroke) | Validate on submit only | Established project convention | Less annoying UX; matches MaterialCalculator |
| `react-hook-form` for all forms | useState for simple forms | N/A — project convention | No extra dependency for 5 fields |
| Google Maps iframe embed | Styled placeholder div | v1 decision (CONT-07) | Avoids API key, third-party JS, privacy concerns |
| Server actions for form submission | UI-only with success state | v1 decision (CONT-05) | Backend submission deferred to v2 (BACK-01) |

**Deprecated/outdated:**
- Server actions for this form: Explicitly out of scope per CONT-05. Backend submission is v2 (BACK-01).
- Google Maps API: Not needed for v1. CONT-07 says "placeholder."

## Open Questions

1. **Which fields are required?**
   - What we know: CONT-04 says "required field empty" triggers errors. CONT-02 lists Name, Email, Phone, Service Interest, Message.
   - What's unclear: Are ALL 5 fields required, or just a subset? Phone and Service Interest are commonly optional on contact forms.
   - Recommendation: Make Name, Email, and Message required. Keep Phone and Service Interest optional. This is the most user-friendly approach and aligns with industry convention. The planner can adjust if the owner specifies differently.

2. **Map placeholder styling**
   - What we know: CONT-07 says "styled map area or iframe placeholder."
   - What's unclear: How elaborate should the map placeholder be?
   - Recommendation: A sage/forest-tinted rectangle with a MapPin icon, the office address text, and rounded corners. Simple, on-brand, clearly indicates "map goes here." Can be swapped for a real embed in v2.

## Sources

### Primary (HIGH confidence)
- Existing project codebase: `MaterialCalculator.tsx` — form state, validation, error display patterns
- Existing project codebase: `navigation.ts` — `companyInfo` data structure (addresses, phone, hours)
- Existing project codebase: `AboutHero.tsx`, `GalleryHero.tsx` — interior page hero pattern
- Existing project codebase: `ServicesContact.tsx` — CTA bottom section pattern
- Existing project codebase: `Footer.tsx` — contact info rendering pattern

### Secondary (MEDIUM confidence)
- React 19 documentation — `useState` for controlled form inputs (standard, unchanged from React 18)
- HTML `<select>` specification — disabled placeholder option for dropdown default

### Tertiary (LOW confidence)
- None. All findings are verified from existing project code or well-established web standards.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies, all patterns exist in codebase
- Architecture: HIGH — follows identical structure to all other page phases (4, 5, 6, 7)
- Pitfalls: HIGH — all identified pitfalls are standard form UX issues with known solutions

**Research date:** 2026-02-19
**Valid until:** 2026-03-19 (stable — no external dependencies or fast-moving APIs involved)
