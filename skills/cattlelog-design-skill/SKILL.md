---
name: cattlelog-design-skill
description: "Design system, UI/UX guidelines, and aesthetics for the Davis Cattlelog web app. ACTIVATE this skill whenever the user asks to create, modify, debug, or design UI components for Cattlelog."
---

# Cattlelog Design Skill

Build deterministic, highly accessible, and visually stunning UI components for the Davis Cattlelog web app. This system strictly prohibits the hallucination of pixel values, colors, or animations.

## Mandatory Rules

These address the most common causes of visual inconsistency and layout breakages. Violating any of these produces a rejected build.

#### 1. Colors: Never use raw hex codes or generic palette classes
Do not use raw colors like `#6DAEDF` or generic Tailwind classes like `blue-500` from Tailwind's default palette. Use the Cattlelog tokens in `design.md` (e.g. `blue-700`, `black-1000`, `surface-1`, `ge-ah`).
- The app is **light-mode only**. Do not add dark-mode variants, `dark:` classes or theme toggles.
- Text/background pairs must meet WCAG AA (4.5:1 normal, 3:1 large and UI). Light fills take dark text.
- *See DESIGN.md Section 1 for the full palette and contrast rules.*

#### 2. Typography & Layout: Use the defined scales
- **Spacing**: Use only the spacing scale (4, 8, 12, 16, 24, 32, 40, 64, 96px, e.g. `gap-4`, `p-6`). Arbitrary pixel padding (e.g., `p-[21px]`) is forbidden.
- **Typography**: Adhere to the established Figtree scale (Heading 1 through Subtext). Do not invent intermediate font sizes or set custom letter-spacing.

#### 3. Image & Layout Stability: Prevent CLS
- Images and containers MUST declare a rigid `aspect-ratio` (e.g. `1/1` for avatars, `16/9` for banners).
- To prevent horizontal layout jumping, the root must apply `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }`.

#### 4. Component Overlays: Trap Focus and Use Portals
- Modals, Popovers, and Dropdowns MUST trap focus within their container while open.
- **React Portals:** All Tooltips, Popovers, and Dropdowns MUST be rendered via React Portals to prevent z-index clipping.

#### 5. Accessibility: Custom Focus Rings and ARIA
- Browser default focus rings are strictly banned (`outline-none`). Implement custom `:focus-visible` parameters (e.g., `outline-2 outline-offset-2 outline-gold-500`).
- Use the strict ARIA roles map: `role="navigation"`, `role="search"`, `role="dialog"`, etc. Do not rely on generic `div` semantics for interactive widgets.

#### 6. Off-token values: flag, don't guess
Figma sometimes contains raw, unbound values (a hex with no variable, an odd radius, a one-off font size). When a value you need isn't in `design.md` or `resources/tokens.json`:
- Never copy the raw value into code, and never silently "round" it to a token that looks similar.
- Use an existing token only if the difference is imperceptible (same hue, within about one scale step); otherwise stop, name the node and the value, and ask whether to bind a new token in Figma or use an existing one.
- Only values bound to Figma variables, or already listed in the token files, count as verified. Label anything else "unverified".

#### 7. Motion: tokens, transform/opacity only, reduced-motion
- Durations are 75 / 150 / 200 / 300ms (1500ms for skeleton pulses only); easing is `ease-out` (enter), `ease-in` (exit) or `ease-in-out` (color/hover). No arbitrary `duration-[...]` or custom `cubic-bezier`.
- Animate `transform` and `opacity` only. Never `transition-all`; name the property (`transition-colors`, `transition-shadow`, ...).
- Every animation must explain a change. No decorative loops (`animate-bounce`, `animate-ping`, page-load spinners); only skeletons and the Cory mascot loop.
- The global `prefers-reduced-motion` block is required, and movement degrades to instant or opacity-only.
- Copy a recipe from DESIGN.md Section 4.3 instead of inventing timing. *Motion tokens are consolidated from documented values, not Figma variables.*

#### 8. Loading: skeleton first by default
Any component or page that fetches data ships with a skeleton state unless it falls under an exception below. Start from `resources/templates/Skeleton.tsx` (`Skeleton` + `Loadable`).
- **Use a skeleton for:** lists, cards, course pages, tables, charts and images that arrive from async data on first load.
- **Skip it for:** data already in memory, tiny inline values (use a fixed-width `Skeleton` only if they would shift layout), user-initiated actions (pending state on the button instead), refreshes that already have data (keep the stale data, never flash back to a skeleton), and waits over 1000ms (Cory, per Section 4.4).
- **Only data is skeletonized.** Headings, labels, column heads, nav and other known chrome render for real from the first frame.
- **Same geometry, same cell.** Each placeholder matches the width and height of the content it stands for and swaps in place (`Loadable`), so nothing moves. List rows resolve top to bottom, 75ms apart, each row whole.
- *See DESIGN.md Section 4.4.*

#### 9. Polish details
Spacing, nested radii, label centering, icon consistency and button-state slots live in DESIGN.md Section 17 and the motion additions in Section 4.4. Check them by eye at 390px and desktop; the audit flags only the mechanical ones (emoji icons, AI sparkles, mixed icon strokes, unshrinkable icons, `flex-1` controls, `will-change`).

---

## Building a New Component

When asked to create a component, follow `references/COMPONENT-SCAFFOLD.md`: read the matching DESIGN.md section, start from a template in `resources/templates/` (`Button.tsx`, `Modal.tsx`, `Popover.tsx`, `Skeleton.tsx`), implement all states, then verify with the `cattlelog-design-audit` skill.

---

## Token Lookup

For colors, typography, spacing, radii, and component token composites, read `design.md` (in this skill's folder, next to this SKILL.md; the repo root has a symlink to it) first — it's a compact, machine-parseable token sheet in the same format as Vercel's `design.md`. Only fall back to the section files below for anatomy and behavioral rules it doesn't cover.

## Reference Files

For detailed patterns, read the matching section file (index: `references/DESIGN.md`) BEFORE writing code. Load only the file you need:

| Topic | Reference |
|-------|-----------|
| Colors, Contrast, GE tags & Shadows | `references/design/01-visual-identity-and-color-system.md` |
| Grids, Shell & Responsive/Mobile Layout | `references/design/02-layout-and-device-responsiveness.md` |
| Typography, Truncation & Accessibility | `references/design/03-readability-and-web-accessibility.md` |
| Motion tokens, recipes, Skeletons, Reduced motion | `references/design/04-motion-design.md` |
| New component procedure & templates | `references/COMPONENT-SCAFFOLD.md` |
| Empty States, Errors & Scrollbars | `references/design/05-states-scrolling-and-layout-stability.md` |
| Form Controls Anatomy | `references/design/06-form-controls.md` |
| Data Visualization Colors | `references/design/07-data-visualization.md` |
| Toasts, Modals, Chips & Rating Badge | `references/design/08-status-and-feedback.md` |
| Z-Index Scale | `references/design/09-z-index-scale.md` |
| Navigation (Header/Footer are prebuilt) | `references/design/10-navigation.md` |
| Interaction State Machine | `references/design/11-interaction-states.md` |
| Tooltips & Popovers | `references/design/12-tooltips-and-popovers.md` |
| Images, Lucide Icons & Assets | `references/design/13-images-icons-and-assets.md` |
| CSS Performance Rules | `references/design/14-css-performance.md` |
| Course Page Pattern (incl. mobile) | `references/design/15-course-page-pattern.md` |
| Layout & Polish Details (nested radii, label centering, icons) | `references/design/17-layout-and-polish-details.md` |
| Logo & Voice | `references/design/16-logo-and-voice.md` |

---

## Output Checklist

Verify EVERY item before delivering UI code:

- [ ] Only Cattlelog tokens: no raw hexes, no generic Tailwind palette classes, no dark-mode code.
- [ ] Any off-token Figma value was flagged, not guessed.
- [ ] Text/background pairs meet WCAG AA; color is never the only signal.
- [ ] Spacing, radius, type and z-index come from the defined scales.
- [ ] Layout works on mobile first: single column, 44px touch targets, 16px input text.
- [ ] Focus rings are custom (`:focus-visible`); overlays trap and restore focus and use portals.
- [ ] Modals/dialogs carry `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [ ] Buttons and links implement Hover, Active, Focus and Disabled states; one primary per view.
- [ ] Shadows use `shadow-subtle` / `shadow-fair` / `shadow-strong`.
- [ ] Anything that loads data has a skeleton (Rule 8) that mirrors content structure, wrapped in `Loadable`; chrome is not skeletonized; images declare `aspect-ratio`.
- [ ] Text truncation applies `break-words` and `line-clamp` explicitly.
- [ ] Polish (Section 17): nested radii add up, labels optically centered, one icon size/stroke per surface, no emoji or sparkle icons.
- [ ] Icons are Lucide only; header and footer are the prebuilt components.
- [ ] Motion uses duration/easing tokens, animates only `transform`/`opacity`, has no `transition-all` and no new loops, and respects `prefers-reduced-motion`.
