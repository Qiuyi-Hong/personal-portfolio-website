# Web Awesome Icon Migration Design

**Date:** 2026-04-08
**Goal:** Replace all in-use Ionicons and service SVG icon assets with Font Awesome-backed `wa-icon` elements, while keeping the current layout and behavior intact in this static portfolio site.

---

## User-Approved Decisions

- **Migration target:** Strict replacement. The site should keep its current visual footprint as closely as possible.
- **Dependency model:** CDN-only. Web Awesome will be loaded from a CDN; no self-hosted icon bundle will be added to the repository.
- **Cleanup level:** Full cleanup. Ionicons should be removed from the page, and obsolete icon SVG files should be deleted when they are no longer used.

---

## Scope

**In scope:**

- Replacing all current `<ion-icon>` usages with `<wa-icon>` in `index.html`
- Replacing the four service icon SVG image usages with `<wa-icon>` in `index.html`
- Updating icon-specific CSS in `assets/css/style.css` so `wa-icon` inherits the current sizing, spacing, and color rules
- Removing the Ionicons dependency from `index.html`
- Deleting obsolete service icon SVG files from `assets/images/`

**Out of scope:**

- Visual redesign of sections, cards, navigation, or buttons
- Adding build tooling, npm dependencies, or bundling
- Changing JavaScript behavior in `assets/js/script.js`
- Reworking unrelated images such as profile photos, publication placeholders, logos, or favicon assets

---

## Existing Context

- The site is a static single-page portfolio served directly from HTML, CSS, and JavaScript.
- All page markup lives in `index.html`.
- The current icon surface is split between:
  - Inline `<ion-icon>` elements for controls, contact metadata, social links, actions, and portfolio overlays
  - Service-card SVG files in `assets/images/icon-dev.svg`, `assets/images/icon-design.svg`, `assets/images/icon-app.svg`, and `assets/images/icon-photo.svg`
- The existing JavaScript relies on `data-*` hooks and class toggling, not on icon elements.

---

## Architecture

### 1. Dependency model

The migration will use Web Awesome through its CDN install path:

- Add `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome/dist/styles/webawesome.css` in the document head
- Add `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome/dist/webawesome.loader.js` as a module script in the document head
- Remove the existing Ionicons module and nomodule script includes

This keeps the site aligned with its current no-build architecture and avoids introducing package management for a presentational change.

### 2. Markup strategy

The migration will use direct inline replacement.

- Every current `<ion-icon>` element becomes an explicit `<wa-icon>` element in `index.html`
- Every in-use service icon `<img>` element pointing at the four service SVG icons becomes a `<wa-icon>` element
- Existing surrounding wrappers such as `.icon-box`, `.service-icon-box`, `.project-item-icon-box`, `.download-cv-btn`, and `.featured-publication-icon` remain in place

This keeps the diff understandable and avoids introducing a custom icon-mapping runtime for a presentational migration.

### 3. Library usage rules

- Use standard Font Awesome-backed `wa-icon` names for interface and content icons
- Use `family="brands"` only for GitHub and LinkedIn
- Do not rely on Pro-only or kit-specific icons in the base implementation
- If an initially chosen icon name is unavailable from the public CDN path, substitute the closest stable public equivalent rather than adding a shim or fallback asset

---

## Icon Mapping

The mapping should follow the role of each icon in the UI, not simply mirror the old Ionicon name.

### Sidebar and shared UI

- Sidebar contact toggle chevron: `chevron-down`
- Email: `envelope`
- Phone: `phone`
- Location: `location-dot`
- GitHub social icon: `family="brands" name="github"`
- LinkedIn social icon: `family="brands" name="linkedin"`
- Google Scholar social icon: `book-open`
- Theme toggle sun icon: `sun`
- Theme toggle moon icon: `moon`

### About page service cards

These replace the four current SVG icon files.

- AI Engineering: `brain`
- Machine Learning: `chart-line`
- Data Science: `database`
- Energy Systems Research: `leaf`

### Featured publications

- Publication card leading icon: `file-lines`
- Publication external-link affordance: `up-right-from-square`

### Resume page

- Download CV button: `download`
- Education timeline title icon: `book-open`
- Experience timeline title icon: `briefcase`

### Portfolio page

- Mobile filter select chevron: `chevron-down`
- Project overlay icon: `eye`
- Publication overlay icon: `file-lines`

### Contact page

- Submit button icon: `paper-plane`

---

## CSS Changes

### 1. Base selector updates

The current reset and shared display selectors should be widened so `wa-icon` behaves like the existing inline icon elements.

This includes selectors such as the base display block reset currently applied to `ion-icon`.

### 2. Container-driven sizing

The current layout uses container styles to control icon appearance. That pattern should be preserved.

The implementation should keep icon sizing and alignment driven by these existing wrappers:

- `.icon-box`
- `.service-icon-box`
- `.featured-publication-icon`
- `.project-item-icon-box`
- `.download-cv-btn`
- Theme toggle icon classes

`wa-icon` should inherit `font-size` and `color` from those containers wherever possible.

### 3. Selector replacement

Replace or remove selectors that are currently specific to old icon elements.

Examples:

- Replace `ion-icon`-specific selectors with `wa-icon` equivalents where styling is still needed
- Replace `.service-icon-box img` rules with `.service-icon-box wa-icon`
- Remove Ionicon stroke-width rules, since they do not apply to `wa-icon`

### 4. Visual preservation

The migration should preserve:

- Existing spacing inside `.icon-box`
- Current button alignment in the CV download and contact form buttons
- Current overlay centering inside portfolio project and publication cards
- Current service-card alignment and weight
- Current theme-toggle icon swap behavior controlled by existing CSS classes

No new visual design language should be introduced during this migration.

---

## File-Level Plan

### `index.html`

- Add Web Awesome CDN stylesheet reference
- Add Web Awesome CDN loader script
- Replace all `<ion-icon>` tags with `<wa-icon>`
- Replace the four service icon `<img>` tags with `<wa-icon>`
- Remove Ionicons script includes

### `assets/css/style.css`

- Add `wa-icon` to shared reset/display selectors where needed
- Update icon-specific selectors to target `wa-icon`
- Replace service icon image selectors with `wa-icon` selectors
- Remove obsolete Ionicon-only rules

### `assets/js/script.js`

- No changes expected

### `assets/images/`

- Delete these obsolete files after migration:
  - `icon-app.svg`
  - `icon-design.svg`
  - `icon-dev.svg`
  - `icon-photo.svg`

`icon-quote.svg` and non-service image assets are not part of this migration unless a current reference is discovered during implementation.

---

## Error Handling

- If a selected public icon name fails to resolve through the CDN-backed `wa-icon` setup, replace it with the closest stable public icon rather than introducing a custom icon library registration.
- If a migrated icon renders with unexpected vertical alignment, fix the container or `wa-icon` sizing rule in CSS instead of changing surrounding markup.
- If a service icon needs a slightly different size to match the original card balance, adjust only the local `.service-icon-box wa-icon` styling.

---

## Validation

The implementation should verify the following areas in both dark and light themes:

- Sidebar contact metadata icons
- Sidebar social icons
- Sidebar contact-toggle chevron
- Theme toggle icons
- About page service icons
- Featured publication icons and external-link icons
- Resume download button icon
- Education and experience timeline heading icons
- Portfolio mobile filter chevron
- Portfolio project hover icons
- Portfolio publication hover icons
- Contact submit button icon

Behavioral regression checks:

- Sidebar expand/collapse still works
- Theme toggle still works and persists correctly
- Hash navigation still works
- Portfolio filtering still works
- Contact form validation still works

---

## Success Criteria

The migration is complete when all of the following are true:

- No `<ion-icon>` elements remain in `index.html`
- No Ionicons dependency scripts remain in `index.html`
- No in-use references remain to the deleted service icon SVG files
- All replaced icons render correctly with `wa-icon`
- Icon containers preserve their current spacing and alignment
- No JavaScript behavior regresses as a result of the icon swap
- The site remains a static HTML/CSS/JS project with no build step

---

## Implementation Notes

- This is a presentational migration, not a UI redesign.
- Semantic icon selection should improve clarity where the old glyph was generic, but the page should still feel visually familiar.
- Cleanup should be limited to the deprecated icon system and the obsolete service SVG files.