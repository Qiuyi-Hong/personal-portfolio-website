# Project Guidelines

## Overview

Static personal portfolio website (HTML/CSS/JS) — no build tools, no frameworks. Served as-is.

## Architecture

Single-page app with sidebar + main content. Five "pages" toggled via JS (About, Resume, Portfolio, Blog, Contact). All markup lives in `index.html`; styling in `assets/css/style.css`; behavior in `assets/js/script.js`.

### Key files

| File                   | Role                                                          |
| ---------------------- | ------------------------------------------------------------- |
| `index.html`           | ~700 lines, all page sections as `<article>` elements         |
| `assets/css/style.css` | ~1,200 lines, CSS custom properties, 5 responsive breakpoints |
| `assets/js/script.js`  | ~155 lines, vanilla ES6+, no dependencies                     |

## Code Style

### HTML

- Semantic HTML5 (`<article>`, `<section>`, `<header>`)
- Use `data-*` attributes as JS hooks (not classes) — e.g. `data-sidebar`, `data-nav-link`, `data-filter-item`
- Images below the fold use `loading="lazy"`

### CSS

- Custom properties defined in `:root` for colors (`--jet`, `--onyx`, `--orange-yellow-crayola`), font sizes (`--fs-1` to `--fs-8`), font weights (`--fw-300` to `--fw-600`), shadows, and transitions
- BEM-inspired class naming: `.service-item`, `.service-item-title`
- Responsive breakpoints: 450px, 580px, 768px, 1024px, 1250px
- Glassmorphism via `backdrop-filter: blur()` on navbar
- Gradient borders via `::before` pseudo-elements on cards

### JavaScript

- Vanilla JS only — no libraries or module bundler
- camelCase variables and functions: `sidebarBtn`, `elementToggleFunc()`
- DOM selection via `data-*` attributes: `document.querySelector("[data-sidebar]")`
- State managed through `.active` class toggling via `classList`
- All code is global scope — avoid naming collisions when adding features

## Conventions

- **No build step**: Do not introduce npm, bundlers, or preprocessors unless explicitly asked
- **Single-file architecture**: One CSS file, one JS file — do not split without asking
- **CDN dependencies**: Ionicons 5.5.2 (ES module), Google Fonts (Poppins 300–600)
- **Icons**: Use Ionicons `<ion-icon name="...">` for UI icons; SVG files in `assets/images/` for service icons

## Known Issues

- `data-selecct-value` typo in both HTML and JS — intentionally matched; fix both if correcting
- Contact form has `action="#"` — no backend handler; form validation UI works but doesn't submit
- Placeholder content throughout (lorem ipsum, dummy testimonials/logos)
