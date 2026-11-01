---
version: alpha
name: Cattlelog
description: Davis Cattlelog's light-mode-only design system for the course/professor discovery web app and its companion Chrome extension. Colors are sRGB hex. Full component anatomy and behavioral rules (ARIA, forms, data-viz, toasts, tooltips/popovers, CSS performance) live in skills/cattlelog-design-skill/references/DESIGN.md.
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
  heading-1-mobile:
    fontFamily: Figtree
    fontSize: 36px
    fontWeight: 700
    lineHeight: 39.6px
  heading-2:
    fontFamily: Figtree
    fontSize: 48px
    fontWeight: 700
    lineHeight: 52.8px
  heading-2-mobile:
    fontFamily: Figtree
    fontSize: 30px
    fontWeight: 700
    lineHeight: 36px
  heading-3:
    fontFamily: Figtree
    fontSize: 30px
    fontWeight: 700
    lineHeight: 36px
  heading-3-mobile:
    fontFamily: Figtree
    fontSize: 24px
    fontWeight: 700
    lineHeight: 28.8px
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
  body-mobile:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
  subtext:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 400
    lineHeight: 19.6px
  subtext-mobile:
    fontFamily: Figtree
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16.8px
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
  button: 10px
  lg: 12px
  xl: 16px
  full: 9999px
shadows:
  subtle: "0px 1px 3px 0px #0000001A, 0px 1px 1px -1px #0000001A"
  fair: "0px 2px 6px 0px #00000026, 0px 2px 2px -2px #00000026"
  strong: "0px 4px 12px 0px #00000026, 0px 4px 4px -4px #00000026"
motion:
  duration-press: 75ms
  duration-fast: 150ms
  duration-base: 200ms
  duration-enter: 300ms
  duration-ambient: 1500ms
  easing-out: "cubic-bezier(0, 0, 0.2, 1)"
  easing-in: "cubic-bezier(0.4, 0, 1, 1)"
  easing-in-out: "cubic-bezier(0.4, 0, 0.2, 1)"
components:
  button-primary:
    backgroundColor: "{colors.blue-700}"
    textColor: "{colors.black-0}"
    hoverBackgroundColor: "{colors.blue-800}"
    activeBackgroundColor: "{colors.blue-900}"
    disabledBackgroundColor: "{colors.black-200}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
    height: 40px
  button-secondary:
    backgroundColor: "{colors.black-0}"
    border: "1px solid {colors.blue-700}"
    textColor: "{colors.blue-700}"
    hoverBackgroundColor: "{colors.blue-50}"
    activeBackgroundColor: "{colors.blue-200}"
    disabledBorder: "1px solid {colors.black-200}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.button}"
    padding: "10px 16px"
    height: 40px
  text-link:
    textColor: "{colors.blue-600}"
    hoverTextColor: "{colors.blue-700}"
    typography: "{typography.body}"
  input:
    backgroundColor: "{colors.blue-50}"
    textColor: "{colors.black-1000}"
    border: "1px solid {colors.black-200}"
    hoverBorder: "1px solid {colors.black-400}"
    focusBackgroundColor: "{colors.black-0}"
    focusBorder: "1px solid {colors.blue-500}"
    errorBorder: "1.5px solid {colors.pink-500}"
    errorBackgroundColor: "{colors.surface-3}"
    disabledBackgroundColor: "{colors.black-50}"
    disabledTextColor: "{colors.black-400}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: 40px
  input-small:
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: 32px
  input-large:
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: 48px
  chip-tag:
    backgroundColor: "{colors.black-0}"
    border: "0.5px solid {colors.black-200}"
    textColor: "{colors.black-1000}"
    typography: "{typography.subtext}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  chip-trait:
    backgroundColor: "{colors.black-50}"
    textColor: "{colors.black-700}"
    typography: "{typography.subtext}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  badge:
    backgroundColor: "{colors.surface-4}"
    textColor: "{colors.accent-4}"
    typography: "{typography.subtext}"
    rounded: "{rounded.full}"
    padding: "0 8px"
    height: 24px
  rating-badge:
    textColor: "{colors.black-0}"
    highBackgroundColor: "{colors.green-500}"
    midBackgroundColor: "{colors.yellow-500}"
    midTextColor: "{colors.black-1000}"
    lowBackgroundColor: "{colors.red-500}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.black-0}"
    border: "1px solid {colors.black-200}"
    rounded: "{rounded.md}"
    padding: 16px
  toast:
    backgroundColor: "{colors.black-0}"
    width: 360px
    rounded: "{rounded.md}"
    padding: 16px
    shadow: "{shadows.strong}"
  modal:
    backgroundColor: "{colors.black-0}"
    rounded: "{rounded.xl}"
    padding: 24px
  checkbox:
    size: 18px
    rounded: "{rounded.xs}"
    checkedBackgroundColor: "{colors.blue-700}"
    checkedBorderColor: "{colors.blue-700}"
  radio:
    size: 18px
    rounded: "{rounded.full}"
    checkedBackgroundColor: "{colors.blue-700}"
    checkedBorderColor: "{colors.blue-700}"
---

# Cattlelog

## Overview

Cattlelog is Davis Cattlelog's design system for the course/professor discovery web app and its companion Chrome extension. The aesthetic is friendly and academic-trustworthy: Cattlelog Blue as primary, Gold as accent, over high-contrast neutral surfaces. It is **light-mode only**. Accessibility and layout stability (zero CLS) are hard requirements.

## Colors

`blue-800` is the brand primary (chrome, active toggles, brand links); `blue-700` fills primary buttons; `blue-50` is the page background and `black-0` the card surface. Gold is the accent. Blue and gold each run a `50`-`1000` scale; neutrals run `black-0` to `black-1000`. Status: `green-500`/`lime-500` success, `yellow-500`/`orange-500` warning, `red-500`/`pink-500` error, `blue-500` info. Never use a raw hex or a generic Tailwind palette class for structural UI.

Contrast is mandatory: 4.5:1 for normal text, 3:1 for large text and UI boundaries, checked against the actual background. Use white text on dark fills and `black-1000` on light fills (`yellow-500`, `orange-500`, gold, pastels). Readable copy is never lighter than `black-600`.

Two further token families: `surface-1`..`surface-10` (pastel backgrounds, each paired with the same-numbered `accent-*` for marks and text), and `ge-*` (one color per UC Davis GE3 tag, grouped Topical Breadth: AH, SE, SS; Core Literacies: WE, OL, VL, ACGH, DD, WC, QL, SL).

## Typography

Figtree only. Scale runs `heading-1` (64px) to `subtext` (14px) with a `-mobile` variant of each below `lg`. Use tokens exactly as defined (size, weight, line-height); never invent an intermediate size, and don't set custom letter-spacing.

## Layout

Spacing scale: 4, 8, 12, 16, 24, 32, 40, 64, 96px; no arbitrary pixel padding. Figma grids: desktop 12-col (centered: 80px columns, 32px gutter; stretch: 64px gutter, 24px margin), tablet 8-col (24px gutter, 32px margin), mobile 4-col (16px gutter and margin). Breakpoints: mobile `<640px`, tablet `640-1023px`, desktop `>=1024px`. Header and Footer are prebuilt components: use, don't rebuild. Mobile rules: single column, 44px minimum touch targets, 16px input text, bottom-sheet modals/filters, sidebars collapse to accordions below content.

## Elevation & Depth

Three two-layer shadows (above): `subtle` for resting cards, `fair` for hover, `strong` for popovers, dropdowns and toasts. Z-index scale: background `-10`, base `0`, cards `10`, dropdowns/popovers `100`, sticky headers `200`, overlays `300`, modals `400`, toasts `500`, tooltips `600`.

## Motion

Premium and functional, never decorative; honor `prefers-reduced-motion`. Hover `200ms`, active `75ms`, overlay fades `150-300ms`. Skeletons (not spinners) pulse `black-50` to `black-200` on `1.5s`, staggered `75ms`.

Durations are the `motion` tokens above (75/150/200/300ms, plus 1500ms for skeletons); easings are `ease-out` for enters, `ease-in` for exits, `ease-in-out` for color and hover. Animate only `transform` and `opacity`, never `transition-all`, and never add a new infinite animation. Motion tokens are consolidated from documented values, not Figma variables. Recipes and anti-patterns: `references/DESIGN.md` Section 4.

## Shapes

Radii: `4px` checkboxes and skeletons, `6px` tooltips and small selects, `8px` inputs/cards/chips, `10px` buttons, `12px` popovers and error cards, `16px` modals, `9999px` badges and radios.

## Components

Token composites above: buttons (primary `blue-700`, secondary `black-0` fill with `blue-700` text and border), text link, inputs, chips, badge, rating badge, card, toast, modal, checkbox, radio. One primary button per view; never add a second solid accent beside it. Toasts: top-right, 360px, 12px stack gap, auto-dismiss 3s success / 6s error / sticky for banners. Modals: `black-1000` at 25% backdrop, 360/480/640px sizes, bottom sheets on mobile. Icons: Lucide only. Overlays render through portals with flip/shift positioning and a 16px viewport margin.

## Accessibility

Custom `:focus-visible` rings everywhere (bare `outline-none` is banned); trap and restore focus in overlays; roving `tabindex` for composites; real ARIA roles for real widgets; `aria-live` for dynamic updates; color is never the only signal.

## Voice & Content

Plain, direct, student-first copy; witty but never goofy; no marketing superlatives. Cory the Cow appears in empty/error states and long waits, not routine interactions.

## Do's and Don'ts

- Map every color to its token; never a raw hex or generic Tailwind palette class.
- If a design shows a value with no token, don't guess a nearest match: use an existing token only when the difference is imperceptible, otherwise flag it and ask.
- Give every image and media container a fixed `aspect-ratio` before load.
- Trap and restore focus on every modal, popover and dropdown; render them via portals.
- Pick z-index, radius and spacing only from the scales above.
- Don't build dark mode. Don't use spinners for page loads. Don't mix icon libraries.

## Related Reference

- `skills/cattlelog-design-skill/references/DESIGN.md` for full anatomy and behavioral rules.
- `skills/cattlelog-design-skill/resources/tokens.json` for the machine-readable export.
