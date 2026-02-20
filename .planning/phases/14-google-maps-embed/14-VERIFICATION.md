---
phase: 14-google-maps-embed
verified: 2026-02-20T23:15:00Z
status: human_needed
score: 4/4 must-haves verified (automated)
re_verification: false
human_verification:
  - test: "Visit /contact in a browser and confirm the Google Maps iframe loads and renders a map centered near 6470 Beatty Line N, Fergus, Ontario"
    expected: "An interactive map tile appears with a location pin visible near the retail yard address — not a blank frame or error"
    why_human: "The keyless embed URL (maps.google.com/maps?output=embed) has been known to be rate-limited or blocked by Google in some regions/browsers. Cannot verify the remote URL actually resolves to a valid map tile programmatically."
  - test: "On the Contact page, attempt to pan and zoom the embedded map"
    expected: "Map responds to drag (pan) and scroll/pinch (zoom) gestures"
    why_human: "Interactive behavior requires a live browser environment — cannot verify from static code inspection"
  - test: "Resize browser to 375px width (mobile) and check the map area"
    expected: "Map spans the full column width and maintains a 4:3 aspect ratio with no overflow or collapsed height"
    why_human: "Responsive layout rendering requires visual inspection in a browser"
---

# Phase 14: Google Maps Embed Verification Report

**Phase Goal:** Embed interactive Google Map on Contact page showing retail yard location
**Verified:** 2026-02-20T23:15:00Z
**Status:** human_needed (all automated checks passed; visual/interactive behavior needs browser confirmation)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Contact page displays an embedded Google Map centered on 6470 Beatty Line N, Fergus, Ontario | ? NEEDS HUMAN | iframe src contains `6470+Beatty+Line+N,+Fergus,+Ontario,+Canada&z=14` at line 71 — correct address and zoom. Whether Google renders the tile requires a browser. |
| 2 | Map is interactive — visitors can pan, zoom, and see a pin at the retail yard location | ? NEEDS HUMAN | `allowFullScreen` present; keyless embed URL used. Interactivity cannot be verified without a live browser. |
| 3 | Map renders at appropriate dimensions on both mobile (full-width, 4:3 aspect) and desktop | ? NEEDS HUMAN | Container `aspect-[4/3]` class present at line 69; `width="100%"` `height="100%"` on iframe. Visual rendering requires browser. |
| 4 | Map does not degrade Lighthouse performance — loads lazily when scrolled into view | ✓ VERIFIED | `loading="lazy"` attribute confirmed at line 75. No JS bundle added. Component remains a Server Component (no `'use client'`). Build output confirms static prerender of `/contact`. |

**Score:** 1/4 truths fully verified automatically; 3/4 have correct implementation but require browser confirmation. No failures detected.

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/components/sections/contact/ContactInfoPanel.tsx` | Google Maps iframe embed replacing placeholder | ✓ VERIFIED | File exists (83 lines), contains substantive iframe implementation. No placeholder text, no stubs, no `TODO`/`FIXME`. |

### Level 1 — Exists

`src/components/sections/contact/ContactInfoPanel.tsx` — present.

### Level 2 — Substantive (not a stub)

- Contains `<iframe>` element (line 70)
- No "Interactive map coming soon" text
- No "Map Placeholder" comment
- No `return null`, `return {}`, or empty handler patterns
- Anti-pattern scan: NONE FOUND

### Level 3 — Wired

- Imported by `src/app/contact/page.tsx` at line 5
- Used at `src/app/contact/page.tsx` line 35: `<ContactInfoPanel />`
- Component is not orphaned — it is rendered on the live `/contact` route

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/components/sections/contact/ContactInfoPanel.tsx` | Google Maps embed URL | iframe `src` attribute with retail yard address query | ✓ VERIFIED | `src="https://maps.google.com/maps?q=6470+Beatty+Line+N,+Fergus,+Ontario,+Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"` — matches pattern `maps\.google\.com.*output=embed`. URL includes correct address and zoom level 14. |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| MAPS-01 | 14-01-PLAN.md | Contact page embeds a Google Map showing the retail yard location (6470 Beatty Line N, Fergus) | ✓ SATISFIED | iframe embed present in ContactInfoPanel.tsx with exact retail yard address. Commit `adc48ab` documents implementation. REQUIREMENTS.md traceability table marks MAPS-01 as Complete for Phase 14. |

**Orphaned requirements check:** No additional requirements mapped to Phase 14 in REQUIREMENTS.md beyond MAPS-01. Coverage complete.

---

## Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | None found |

Scan covered: `TODO`, `FIXME`, `XXX`, `HACK`, `PLACEHOLDER`, `placeholder`, `coming soon`, `return null`, `return {}`, `return []`, `=> {}`.

---

## Build Verification

`npx next build` completed successfully. The `/contact` route is statically prerendered as a Server Component. No TypeScript errors, no new npm dependencies added.

---

## Human Verification Required

### 1. Map Tile Actually Renders

**Test:** Open `/contact` in a browser (dev server or production build) and observe the map area below the contact info.
**Expected:** An interactive Google Maps tile appears, centered near 6470 Beatty Line N, Fergus, Ontario, with a location pin visible.
**Why human:** The keyless Google Maps embed URL (`maps.google.com/maps?output=embed`) makes a runtime request to Google's servers. Code inspection confirms the URL is correct, but whether Google serves a valid map tile (vs. a blank frame or CORS block) can only be confirmed in a browser.

### 2. Map Interactivity (Pan and Zoom)

**Test:** On the Contact page, click and drag the map to pan; use scroll wheel or pinch to zoom.
**Expected:** Map responds fluidly to both gestures. Users can navigate around the Fergus area.
**Why human:** Interactive behavior of a third-party iframe cannot be verified from static analysis.

### 3. Responsive Rendering at Mobile Width

**Test:** Open browser DevTools, set viewport to 375px wide, navigate to `/contact`.
**Expected:** The map fills the full column width and maintains a visible 4:3 aspect ratio (no collapsed or zero-height area).
**Why human:** Tailwind `aspect-[4/3]` with `width="100%" height="100%"` is the correct pattern, but layout rendering in a live browser is required to confirm no unexpected CSS conflicts.

---

## Gaps Summary

No gaps found in the automated verification. The implementation is complete and correct:

- Placeholder replaced with a substantive iframe embed
- Correct retail yard address in the embed URL (`6470 Beatty Line N, Fergus, Ontario`)
- `loading="lazy"` present for Lighthouse safety
- `title` attribute present for accessibility
- `allowFullScreen` and `referrerPolicy="no-referrer-when-downgrade"` present (standard for Google embeds)
- Component remains a Server Component (no `'use client'`)
- No new npm dependencies
- Build passes cleanly
- Component is properly wired into the `/contact` page

The three human verification items are confirmation steps, not gaps. If the map tile renders correctly in a browser, the phase goal is fully achieved.

---

_Verified: 2026-02-20T23:15:00Z_
_Verifier: Claude (gsd-verifier)_
