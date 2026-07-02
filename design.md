---
version: alpha
name: Cattlelog
description: Davis Cattlelog's design system for the course/professor discovery web app and its companion Chrome extension. Colors are sRGB hex. Full component anatomy and behavioral rules (ARIA, forms, data-viz, nav, tooltips/popovers, CSS performance) live in skills/cattlelog-design-skill/references/DESIGN.md.
colors:
  blue-50: "#F9FAFB"
  blue-200: "#EAF3FA"
  blue-300: "#C0DCF1"
  blue-400: "#97C5E8"
  blue-500: "#6DAEDF"
  blue-600: "#4397D5"
  blue-700: "#206192"
  blue-800: "#164263"
  blue-900: "#0E2A3F"
  blue-1000: "#050E15"
  gold-50: "#FFF5E5"
  gold-200: "#FFE2B3"
  gold-300: "#FFC363"
  gold-400: "#FFBA4D"
  gold-500: "#FFA71A"
  gold-600: "#E68D00"
  gold-700: "#B36E00"
  gold-800: "#804E00"
  gold-900: "#4D2F00"
  gold-1000: "#1A1000"
  black-0: "#FFFFFF"
  black-50: "#F2F2F2"
  black-200: "#D9D9D9"
  black-300: "#BFBFBF"
  black-400: "#A6A6A6"
  black-500: "#8C8C8C"
  black-600: "#737373"
  black-700: "#595959"
  black-800: "#404040"
  black-900: "#262626"
  black-1000: "#181818"
  green-500: "#3E8D40"
  lime-500: "#76AF50"
  yellow-500: "#E7C756"
  orange-500: "#E0A846"
  red-500: "#E05346"
  pink-500: "#D97575"
  pink-250: "#F5A0A2"
  surface-1: "#F3EEFF"
  surface-2: "#EFF8F8"
  surface-3: "#FEF2F2"
  surface-4: "#EFF6FF"
  surface-5: "#FFE5D5"
  surface-6: "#ECFEFF"
  surface-7: "#FDF4FF"
  surface-8: "#F1F5F9"
  surface-9: "#F0FDF4"
  surface-10: "#FFF7ED"
  accent-1: "#7C3AED"
  accent-2: "#6AC2A9"
  accent-3: "#B91C1C"
  accent-4: "#1D4ED8"
  accent-5: "#C2410C"
  accent-6: "#0E7490"
  accent-7: "#A21CAF"
  accent-8: "#0F172A"
  accent-9: "#15803D"
  accent-10: "#C2410C"
  ge-ah: "#E11D48"
  ge-ss: "#0284C7"
  ge-se: "#7C3AED"
  ge-acgh: "#D97706"
  ge-dd: "#DB2777"
  ge-ol: "#059669"
  ge-ql: "#2563EB"
  ge-sl: "#0891B2"
  ge-vl: "#CA8A04"
  ge-wc: "#EA580C"
  ge-we: "#16A34A"
typography:
  heading-1:
    fontFamily: Figtree
    fontSize: 64px
    fontWeight: 700
    lineHeight: 70.4px
    letterSpacing: -2px
  heading-1-mobile:
    fontFamily: Figtree
    fontSize: 36px
    fontWeight: 700
    lineHeight: 39.6px
    letterSpacing: -2px
  heading-2:
    fontFamily: Figtree
    fontSize: 48px
    fontWeight: 700
    lineHeight: 52.8px
    letterSpacing: -2px
  heading-2-mobile:
    fontFamily: Figtree
    fontSize: 30px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -2px
  heading-3:
    fontFamily: Figtree
    fontSize: 30px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -2px
  heading-3-mobile:
    fontFamily: Figtree
    fontSize: 24px
    fontWeight: 700
    lineHeight: 28.8px
    letterSpacing: -2px
  subheading-1:
    fontFamily: Figtree
    fontSize: 24px
    fontWeight: 700
    lineHeight: 31.2px
  subheading-1-mobile:
    fontFamily: Figtree
    fontSize: 20px
    fontWeight: 700
    lineHeight: 26px
  subheading-2:
    fontFamily: Figtree
    fontSize: 18px
    fontWeight: 600
    lineHeight: 25.2px
  subheading-2-mobile:
    fontFamily: Figtree
    fontSize: 16px
    fontWeight: 700
    lineHeight: 22.4px
  subheading-3:
    fontFamily: Figtree
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  subheading-3-mobile:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
  subheading-4:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
  subheading-4-mobile:
    fontFamily: Figtree
    fontSize: 13px
    fontWeight: 400
    lineHeight: 19.5px
  body:
    fontFamily: Figtree
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: -1px
  body-mobile:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: -1px
  subtext:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 19.6px
    letterSpacing: -2px
  subtext-mobile:
    fontFamily: Figtree
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16.8px
    letterSpacing: -2px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  6: 24px
  8: 32px
  10: 40px
  16: 64px
  24: 96px
  base: 4px
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.blue-500}"
    textColor: "{colors.black-0}"
    hoverBackgroundColor: "{colors.blue-600}"
    activeBackgroundColor: "{colors.blue-700}"
    disabledBackgroundColor: "{colors.black-200}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: 40px
  button-secondary:
    border: "2px solid {colors.blue-500}"
    textColor: "{colors.blue-500}"
    hoverBackgroundColor: "{colors.blue-50}"
    activeBackgroundColor: "{colors.blue-200}"
    disabledBorder: "2px solid {colors.black-200}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: 40px
  text-link:
    textColor: "{colors.blue-600}"
    hoverTextColor: "{colors.blue-700}"
    typography: "{typography.body}"
  input:
    backgroundColor: "{colors.black-0}"
    textColor: "{colors.black-1000}"
    border: "1px solid {colors.black-200}"
    hoverBorder: "1px solid {colors.black-400}"
    focusBorder: "1px solid {colors.blue-500}"
    disabledBackgroundColor: "{colors.black-50}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: 40px
  input-small:
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: 32px
  input-large:
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: 48px
  badge:
    backgroundColor: "{colors.blue-50}"
    textColor: "{colors.blue-800}"
    typography: "{typography.subtext}"
    rounded: "{rounded.full}"
    padding: "0 8px"
    height: 24px
  checkbox:
    size: 16px
    rounded: "{rounded.xs}"
    checkedBackgroundColor: "{colors.blue-500}"
    checkedBorderColor: "{colors.blue-500}"
  radio:
    size: 16px
    rounded: "{rounded.full}"
    checkedBackgroundColor: "{colors.blue-500}"
    checkedBorderColor: "{colors.blue-500}"
---

# Cattlelog

## Overview

Cattlelog is Davis Cattlelog's design system for the course/professor discovery web app and its companion Chrome extension. The aesthetic is friendly and academic-trustworthy — Cattlelog Blue as primary, Gold as accent, laid over high-contrast neutral surfaces. Accessibility and layout stability (zero CLS) are hard requirements, not nice-to-haves: this system exists specifically to stop hallucinated pixel values, colors, and animations from reaching production.

## Colors

Blue is primary — links, primary actions, and focus in most contexts. Gold is the accent — badges, highlights, glow states. Both run a `50`–`1000` scale with `500` as the brand base. Neutrals run `black-0` (white) through `black-1000`. Status: `green-500`/`lime-500` success, `yellow-500`/`orange-500` warning, `red-500`/`pink-500`/`pink-250` error/logo, `blue-500` info. Light mode uses `black-0`–`black-50` backgrounds with `black-900`/`black-1000` text and `blue-700`/`blue-800` for primary actions; dark mode uses `black-1000`/`blue-1000` backgrounds with `black-0`/`black-50` text and `blue-400`/`gold-400` for accents. Never use a raw hex code or a generic Tailwind palette class (e.g. `blue-500` from Tailwind's default palette, not this one) for structural UI — always reference the semantic token.

Two additional token families exist specifically for course/tag surfaces, both pulled directly from Figma and previously undocumented:
- `surface-1`…`surface-10` — soft pastel backgrounds for badge/card surfaces (each pairs with a same-numbered `accent-*` for text/icon on top of it).
- `ge-ah`, `ge-ss`, `ge-se`, `ge-acgh`, `ge-dd`, `ge-ol`, `ge-ql`, `ge-sl`, `ge-vl`, `ge-wc`, `ge-we` — one color per UC Davis General Education category tag (Arts & Humanities, Social Sciences, Science & Engineering, American Cultures/Governance/History, Domestic Diversity, Oral Literacy, Quantitative Literacy, Scientific Literacy, Visual Literacy, World Cultures, Writing Experience). Use these — not an arbitrary accent — whenever rendering a GE requirement badge on a course. Confirm the category-name expansion against the product spec before shipping copy that spells them out.

## Typography

Figtree sets everything — UI and body copy alike, no secondary typeface. The scale runs `heading-1` (64px) down to `subtext` (14px) on desktop, with a compressed `-mobile` variant of each token below `lg`. Line-heights are **not** 100% of font size — they range ~110–150% depending on level (see the exact px values above); treat the frontmatter as authoritative over any prose elsewhere that says otherwise. Note `subheading-2` is SemiBold (600) on desktop but steps up to Bold (700) on mobile — the one place desktop/mobile diverge in weight, not just size. Don't invent an intermediate size; pick the nearest token above.

## Layout

Spacing follows Tailwind's 4px-base scale (4, 8, 12, 16, 24, 32, 40, 64, 96px) — arbitrary pixel padding (`p-[21px]`) is forbidden. Breakpoints: `xs` <640px (4-col grid, 16px gap), `sm`–`md` 640–1024px (8-col, 768px container), `lg` 1024–1280px (12-col, 1024px container), `xl`–`2xl` ≥1280px (12-col, 1280px container cap — never wider). The app shell is a fixed CSS Grid (`auto 1fr auto` rows) with a sticky 64px/56px header; apply `overflow-x: hidden` on `html, body` and `scrollbar-gutter: stable` so a vertical scrollbar never triggers horizontal layout shift.

## Elevation & Depth

Three shadow steps: `shadow-subtle` (`0 1px 2px #0000001A, 0 1px 3px #0000001A`) for resting cards, `shadow-fair` (`0 2px 2px -2px #00000026, 0 2px 5px #00000026`) for hover, `shadow-heavy` (`0 4px 4px -4px #00000026, 0 4px 12px #00000026`) for popovers and toasts. Layering follows a strict 9-step z-index scale — never hand-roll a z-index: background `-10`, base content `0`, cards `10`, dropdowns/popovers `100`, sticky headers `200`, overlays `300`, modals `400`, toasts `500`, tooltips `600`.

## Motion

Motion should read as premium and functional, never decorative. Page transitions cross-fade with a `scale(0.98) → 1` lift. Hover/active state changes run `150–200ms ease-in-out`; overlay and skeleton cross-fades run `300ms` in / `150ms` out. Skeletons pulse between `black-100` and `black-200` on a strict `1.5s` cycle, staggered `75ms` per item in a list. Favoriting a course gets a spring bounce (`stiffness: 400, damping: 10`) — reserve physical, springy motion for that kind of rare micro-delight, not routine UI.

## Shapes

Radii: `4px` for checkboxes and skeleton blocks, `6px` for tooltips, `8px` for buttons/inputs/sidebar items, `12px` for popovers and error cards, `9999px` for badges and radios. Keep one radius family per view — don't mix.

## Components

Token composites for `button-primary`, `button-secondary`, `text-link`, `input` (+ `-small`/`-large`), `badge`, `checkbox`, and `radio` are above. Primary buttons are solid `blue-500`, stepping to `blue-600` on hover and `blue-700` on active (`scale-[0.98]`); disabled drops to a `black-200` fill with `black-400` text. Secondary buttons are `blue-500`-bordered and transparent, filling `blue-50` on hover. All overlay components — tooltips, popovers, dropdowns — render through React portals to `document.body` to escape parent `overflow`/z-index clipping, and use a flip/shift positioning engine to stay on-screen with a 16px viewport margin. Modals and popovers trap focus while open and restore it to the trigger element on close.

## Accessibility

Focus rings are custom everywhere — bare `outline-none` is banned; pair it with `outline-2 outline-offset-2 outline-gold-500` (or `blue-500` where gold clashes) on `:focus-visible`. Composite widgets (tablists, comboboxes) use roving `tabindex`. Use the real ARIA role for the real widget — `role="navigation"`/`"search"`/`"dialog"`/`"combobox"`/`"tablist"` with matching `aria-expanded`/`aria-selected`/`aria-controls` — never bare `div` semantics for something interactive. Dynamic content (filter counts, form errors) announces through `aria-live` (`polite` for updates, `assertive` for errors).

## Voice & Content

Keep the academic-utility tone: no marketing superlatives, no "please." Playful brand touches — the mascot "Cory the Cow," a cow-print hover flourish at 5% opacity — are reserved for empty states and long loading waits (>1000ms), not routine interactions.

## Do's and Don'ts

- Map every color to its semantic token; never a raw hex or a generic Tailwind palette class.
- Give every image and media container a fixed `aspect-ratio` before load — this is the CLS budget, no exceptions.
- Trap and restore focus on every modal, popover, and dropdown; render them via portals.
- Pick z-index and radius values only from the scales above.
- Don't use spinners for full-page loads — use skeletons that mirror the incoming layout.
- Don't remove a focus outline without shipping a visible custom replacement.

## Related Reference

- `skills/cattlelog-design-skill/references/DESIGN.md` — full component anatomy and behavioral rules (forms, data-viz, navigation, tooltip/popover anatomy, CSS performance) for depth this file intentionally doesn't cover.
- `skills/cattlelog-design-skill/resources/tokens.json` — machine-readable export of the same verified tokens (colors, typography, shadows), synced from Figma's "Color Palette", "Typography", and "Spacing & Elevation" pages.
