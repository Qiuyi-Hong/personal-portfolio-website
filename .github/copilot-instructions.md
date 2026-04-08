# Project Guidelines

## Overview

Static personal portfolio website (HTML/CSS/JS) — no build tools, no frameworks. Served as-is. The current site is a CV-focused single-page portfolio with dark/light theme support, hash-based navigation, and real CV/publication content.

## Architecture

Single-page app with sidebar + main content. Four page articles are toggled via JS and URL hash routing: About, Resume, Portfolio, Contact. All markup lives in `index.html`; styling in `assets/css/style.css`; behavior in `assets/js/script.js`.

### Key files

| File                                                              | Role                                                                                                                                                                |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                                                      | ~1,040 lines; sidebar, navbar, four `<article>` pages, featured publications, CV download link, and filterable portfolio markup                                     |
| `assets/css/style.css`                                            | ~2,300 lines; CSS custom properties, dark/light theme rules, 5 responsive breakpoints, skill tag animation, publication/project card styles, and legacy blog styles |
| `assets/js/script.js`                                             | ~140 lines; theme persistence, mobile sidebar toggle, portfolio filtering, contact form validation, and hash-based page navigation                                  |
| `assets/CV/My_Resume_24_03_2026.pdf`                              | Downloadable CV linked from the Resume page                                                                                                                         |
| `docs/superpowers/specs/2026-04-07-portfolio-cv-update-design.md` | Recent design spec describing the CV refresh and structural changes                                                                                                 |

## Code Style

### HTML

- Semantic HTML5 (`<article>`, `<section>`, `<header>`)
- Use `data-*` attributes as JS hooks (not classes) — e.g. `data-sidebar`, `data-nav-link`, `data-filter-item`, `data-theme-btn`
- Article `id` values mirror `data-page` values (`about`, `resume`, `portfolio`, `contact`) for hash routing
- Portfolio filters depend on matching `data-filter-btn`, `data-select-item`, `data-filter-item`, and `data-category` values
- Images below the fold use `loading="lazy"`

### CSS

- Custom properties defined in `:root` for colors (`--jet`, `--onyx`, `--orange-yellow-crayola`), font sizes (`--fs-1` to `--fs-8`), font weights (`--fw-300` to `--fw-600`), shadows, and transitions
- Light theme overrides live under `[data-theme="light"]`
- BEM-inspired class naming remains common: `.service-item`, `.service-item-title`
- Responsive breakpoints: 450px, 580px, 768px, 1024px, 1250px
- Glassmorphism via `backdrop-filter: blur()` on navbar
- Gradient borders via `::before` pseudo-elements on cards
- Recent CV-related UI patterns include `.download-cv-btn`, `.skill-tag-list`, `.skill-tag`, `.featured-publications`, and `.project-img-placeholder`
- Resume skill tags animate when the Resume article gains `.active`

### JavaScript

- Vanilla JS only — no libraries or module bundler
- camelCase variables and functions: `sidebarBtn`, `elementToggleFunc()`, `activatePage()`
- DOM selection via `data-*` attributes: `document.querySelector("[data-sidebar]")`
- State is managed through `.active` class toggling and `data-theme` on `<body>`
- Theme selection persists in `localStorage`
- Page navigation updates `window.location.hash` and restores active pages on load / `hashchange`
- All code is global scope — avoid naming collisions when adding features

## Conventions

- **No build step**: Do not introduce npm, bundlers, or preprocessors unless explicitly asked
- **Single-file architecture**: One CSS file, one JS file — do not split without asking
- **CDN dependencies**: Ionicons 5.5.2 (ES module + `nomodule` fallback), Google Fonts (Poppins 300–600)
- **Icons**: Use Ionicons `<ion-icon name="...">` for UI icons; SVG files in `assets/images/` for service icons
- **CV asset path**: Keep the Resume download link aligned with `assets/CV/My_Resume_24_03_2026.pdf`
- **Specs**: Recent implementation specs live under `docs/superpowers/specs/`

## Known Issues

- `data-selecct-value` typo in both HTML and JS — intentionally matched; fix both or neither
- Contact form has `action="#"` — no backend handler; validation only enables/disables the submit button
- The Blog page has been removed from HTML and JS, but legacy blog CSS remains in `assets/css/style.css`
- Portfolio filtering assumes UI labels normalize to the same lowercase values used in `data-category`; keep those strings in sync when editing categories
