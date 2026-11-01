# Davis Cattlelog - Design System & UI Guidelines

Single source of truth for UI, UX, styling, accessibility, and motion across the Davis Cattlelog web app and its companion Chrome extension. Values are verified against the Cattlelog Figma file. The app is **light-mode only**: do not build dark-mode variants, `dark:` classes, or theme toggles.

Figma-bound variables and the values in this file are the only verified values. See SKILL.md rule 6 for what to do when a design shows something that isn't here.

## 1. Visual Identity & Color System

Cattlelog's palette is brand blue and gold over accessible neutral blacks.

### Brand Colors
**Cattlelog Blue (primary):** `blue-50` `#F9FAFB`, `blue-200` `#EAF3FA`, `blue-300` `#C0DCF1`, `blue-400` `#97C5E8`, `blue-500` `#6DAEDF`, `blue-600` `#4397D5`, `blue-700` `#206192`, `blue-800` `#164263`, `blue-900` `#0E2A3F`, `blue-1000` `#050E15`.

**Cattlelog Gold (accent):** `gold-50` `#FFF5E5`, `gold-200` `#FFE2B3`, `gold-300` `#FFC363`, `gold-400` `#FFBA4D`, `gold-500` `#FFA71A`, `gold-600` `#E68D00`, `gold-700` `#B36E00`, `gold-800` `#804E00`, `gold-900` `#4D2F00`, `gold-1000` `#1A1000`.

**Roles:** `blue-800` is the brand primary (page chrome, header/footer, active toggles, brand links). `blue-700` is the fill for primary buttons. `blue-50` is the page background and `black-0` is the card/surface color.

### Neutral Palette
`black-0` `#FFFFFF`, `black-50` `#F2F2F2`, `black-200` `#D9D9D9`, `black-300` `#BFBFBF`, `black-400` `#A6A6A6`, `black-500` `#8C8C8C`, `black-600` `#737373`, `black-700` `#595959`, `black-800` `#404040`, `black-900` `#262626`, `black-1000` `#181818` (primary text).

### Semantic & Status Colors
- **Success:** `green-500` `#38863A` / `lime-500` `#76AF50`
- **Warning:** `yellow-500` `#E7C756` / `orange-500` `#E0A846`
- **Error:** `red-500` `#CF473A` / `pink-500` `#D97575`
- **Info:** `blue-500` `#6DAEDF`
- **Logo pink:** `pink-500` / `pink-250` `#F5A0A2`

### Surface & Accent Palette
Pastel surfaces for chips, legend items and tags; each `surface-N` pairs with the same-numbered `accent-N` for text/icons/marks on top of it.
`surface-1` `#F3EEFF` / `accent-1` `#7C3AED`; `surface-2` `#EFF8F8` / `accent-2` `#2D7E67`; `surface-3` `#FEF2F2` / `accent-3` `#B91C1C`; `surface-4` `#EFF6FF` / `accent-4` `#1D4ED8`; `surface-5` `#FFE5D5` / `accent-5` `#C2410C`; `surface-6` `#ECFEFF` / `accent-6` `#0E7490`; `surface-7` `#FDF4FF` / `accent-7` `#A21CAF`; `surface-8` `#F1F5F9` / `accent-8` `#0F172A`; `surface-9` `#F0FDF4` / `accent-9` `#15803D`; `surface-10` `#FFF7ED` / `accent-10` `#C2410C`.

### General Education (GE) Colors
One color per UC Davis GE3 tag (Figma variables `Miscellaneous/Gen. Ed./*`). Use these for every GE chip dot, badge and filter. Tags split into **Topical Breadth** (3 tags) and **Core Literacies** (8 tags):

| Token | Hex | Tag | Group | Full name |
| --- | --- | --- | --- | --- |
| `ge-ah` | `#E11D48` | AH | Topical Breadth | Arts & Humanities |
| `ge-se` | `#7C3AED` | SE | Topical Breadth | Science & Engineering |
| `ge-ss` | `#0284C7` | SS | Topical Breadth | Social Sciences |
| `ge-we` | `#16A34A` | WE | Core: Words & Images | Writing Experience |
| `ge-ol` | `#059669` | OL | Core: Words & Images | Oral Literacy |
| `ge-vl` | `#CA8A04` | VL | Core: Words & Images | Visual Literacy |
| `ge-acgh` | `#D97706` | ACGH | Core: Civic & Cultural | American Cultures, Governance, & History |
| `ge-dd` | `#DB2777` | DD | Core: Civic & Cultural | Domestic Diversity |
| `ge-wc` | `#EA580C` | WC | Core: Civic & Cultural | World Cultures |
| `ge-ql` | `#2563EB` | QL | Core | Quantitative Literacy |
| `ge-sl` | `#0891B2` | SL | Core | Scientific Literacy |

GE filters mirror this grouping: a Topical Breadth section and a Core Literacies section.

### Color Usage & Contrast
- Surfaces: page `blue-50`, cards `black-0`, borders `black-200`, primary text `black-1000`, secondary text `black-600` or darker, brand actions `blue-700`, brand chrome `blue-800`.
- **Contrast is mandatory.** Normal text needs at least 4.5:1 and large text (24px, or 18.66px bold) at least 3:1 against its actual background; UI boundaries and icons need 3:1. Check the pairing, not the token: text lighter than `black-600` (e.g. `black-400`) is never used for readable copy, and blue lighter than `blue-700` is not used for body-size text on white.
- **Text on colored fills:** use white on dark fills (`blue-700` and darker, `accent-*`) and `black-1000` on light fills (`yellow-500`, `orange-500`, `lime-500`, gold, pastel `surface-*`, `blue-300` and lighter). Verify the pair when unsure.
- **`red-500` and `green-500` are for icons, borders, fills and indicators only, never a text color.** They clear 4.5:1 against white only narrowly (`red-500` 4.55:1, `green-500` 4.53:1), so there is no margin for opacity, tints or anti-aliasing: keep them off body text and use `black-1000`/`black-600` for any words, paired with an icon or dot in the status color. The one text-on-fill case is the Rating Badge score (Section 8), in white.
- Never use color alone to convey meaning: pair status color with an icon or text.
- **Badges/Tags:** pastel `surface-*` or `-50`/`-200` backgrounds with `-700` or darker text.

### Shadows / Elevation
Each token is two stacked layers:
- `shadow-subtle`: `0px 1px 3px 0px #0000001A, 0px 1px 1px -1px #0000001A`
- `shadow-fair`: `0px 2px 6px 0px #00000026, 0px 2px 2px -2px #00000026`
- `shadow-strong`: `0px 4px 12px 0px #00000026, 0px 4px 4px -4px #00000026`

Resting cards use `shadow-subtle` or a border; hover `shadow-fair`; popovers, dropdowns and toasts `shadow-strong`.

---

## 2. Layout & Device Responsiveness

A deterministic shell prevents horizontal overflow and layout shift.

### Shell
- Root: `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh; grid-template-columns: minmax(0, 1fr);`
- **Header and Footer are prebuilt components.** Use them as-is; never rebuild or restyle them. The header is sticky (`position: sticky; top: 0; z-index: 200`); expose its height as `--header-height` and offset sticky children by it.
- `overflow-x: hidden` on `html, body`; `padding-bottom: env(safe-area-inset-bottom)` for iOS.

### Grids (Figma layout grids)
| Breakpoint | Range | Grid | Gutter | Margin |
| --- | --- | --- | --- | --- |
| Mobile | `< 640px` | 4 columns | 16px | 16px |
| Tablet | `640px` to `< 1024px` | 8 columns | 24px | 32px |
| Desktop | `>= 1024px` | 12 columns | 32px (centered, 80px columns) or 64px (stretch) | auto (centered) / 24px (stretch) |

- Use the **centered** desktop grid for content pages (it caps width and centers); use **stretch** only for full-bleed app surfaces such as search/discovery panes.
- Content never exceeds the grid's width; center with `margin-inline: auto`. Content pages such as the Course Page use a fixed 1080px content column on a 1440px canvas.
- Spacing between elements comes only from the spacing scale (4, 8, 12, 16, 24, 32, 40, 64, 96).

### Responsive Patterns
- **Mobile (primary design target for readability):**
  - Single-column, stacked cards at full width; no side-by-side panels.
  - Search is sticky below the header. Filters live in a bottom-sheet drawer (`role="dialog"`) or collapsible accordions.
  - Secondary columns (professor lists, prerequisites) collapse below the main content as accordions.
  - Horizontally scrolling tables/charts show a fade affordance (`mask-image: linear-gradient(to right, #000 80%, transparent)`) and `scroll-snap-type: x mandatory`.
  - Touch targets are at least 44x44px (extend the hit area with padding if the visual is smaller), with at least 8px between adjacent targets.
  - Inputs use 16px text to prevent iOS auto-zoom. Use the `-mobile` type tokens.
- **Tablet/Desktop:**
  - Split panes for discovery: filter pane left (`width: 320px`, `flex-shrink: 0`), results right (`flex-grow: 1`).
  - Main content plus a narrow sidebar (368px) is acceptable on desktop; the sidebar stacks below the main column on tablet and mobile.
  - Course Comparison uses `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`.

---

## 3. Readability & Web Accessibility (a11y)

### Typography
Primary font is **Figtree** (no secondary typeface). Use only the tokens below; never invent an intermediate size. Apply each token's weight and line-height exactly as defined, and don't set custom letter-spacing.

*Desktop:*
- **Heading 1:** Bold 700, 64px / 70.4px (110%)
- **Heading 2:** Bold 700, 48px / 52.8px (110%)
- **Heading 3:** Bold 700, 30px / 36px (120%)
- **Subheading 1:** Bold 700, 24px / 31.2px (130%)
- **Subheading 2:** SemiBold 600, 18px / 25.2px (140%)
- **Subheading 3:** Regular 400, 16px / 24px (150%)
- **Subheading 4:** Regular 400, 14px / 21px (150%)
- **Body:** Regular 400, 16px / 24px (150%)
- **Subtext:** Regular 400, 14px / 19.6px (140%)

*Mobile:*
- **Heading 1:** Bold 36px / 39.6px; **Heading 2:** Bold 30px / 36px; **Heading 3:** Bold 24px / 28.8px
- **Subheading 1:** Bold 20px / 26px; **Subheading 2:** Bold 16px / 22.4px; **Subheading 3:** Regular 14px / 21px; **Subheading 4:** Regular 13px / 19.5px
- **Body:** Regular 14px / 21px; **Subtext:** Regular 12px / 16.8px

Never set readable copy smaller than Subtext.

### Content Truncation & Line-Clamp
- **Single line:** `truncate` (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`) for names and short titles.
- **Multi-line:** `-webkit-line-clamp`. Card previews `line-clamp-3`; compact list items `line-clamp-2`.
- A truncated string must expose its full text via a native `title` or a tooltip.
- Always pair truncation with `break-words` so long tokens (URLs) don't break the grid.

### Focus Management
- Never use bare `outline-none`. Implement `:focus-visible` on every interactive element: `outline outline-2 outline-offset-2 outline-gold-500` (use `blue-500` where gold clashes). In tight spaces (table cells) use `ring-2 ring-inset ring-gold-500`.
- **Trap** focus inside modals, dialogs, popovers and bottom sheets; tabbing past the last element wraps to the first.
- **Restore** focus to the trigger on close.
- **Roving tabindex** for composite widgets (toolbars, tablists, comboboxes): one `tabindex="0"`, the rest `-1`, arrows move focus.
- **Skip link:** a visually hidden "Skip to Content" (`sr-only focus:not-sr-only`) at the top of the DOM.

### ARIA Roles
- Primary nav `role="navigation"` with `aria-label`; pagination `aria-label="Pagination"`.
- Global search wrapper `role="search"`; its input has `aria-label` and `aria-autocomplete="list"`.
- Overlays: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title id.
- Custom selects: `role="combobox"` with `aria-expanded`; list `role="listbox"`; items `role="option"` with `aria-selected`.
- Tabs: `tablist`/`tab`/`tabpanel` with `aria-controls` and `aria-labelledby`.
- Live regions: result-count updates `aria-live="polite"` on an `sr-only` node; form errors `aria-live="assertive"`.
- Virtualized lists set `aria-setsize` and `aria-posinset`. Interactive icons are `aria-hidden="true"` with `sr-only` text.

---

## 4. Motion Design

Motion is deliberate and functional. Respect `prefers-reduced-motion`: replace movement with instant or opacity-only changes.

> **Status:** the motion tokens and recipes below consolidate values already documented in this file. They are *not* Figma variables, so treat them as unverified until design confirms (same caveat as the GE names). Machine-readable copy: `resources/tokens.json` -> `motion`.

### 4.1 Principles (read these before animating anything)
1. **Motion must explain a change.** Animate to show that something appeared, moved, or was confirmed. If removing the animation loses no information, remove it.
2. **Fast.** UI feedback is 75-300ms. Anything over 300ms feels slow; only skeleton pulses (1500ms) and the mascot run longer.
3. **Enter slower than exit.** Things arriving ease **out** (fast start, soft landing, 200-300ms). Things leaving ease **in** and are quicker (150ms). Color and hover changes ease **in-out**.
4. **Animate `transform` and `opacity` only.** They run on the GPU. `width`, `height`, `top`, `left`, `margin`, `padding` force layout every frame and cause jank and layout shift (Section 14). The one sanctioned exception is a disclosure/accordion panel, which may animate `grid-template-rows: 0fr` to `1fr`.
5. **One loud thing at a time.** Don't animate several unrelated elements at once. Lists stagger by `75ms` per item, and only the first 5 items (later ones appear with the group).
6. **No decorative loops.** The only infinite animations are skeleton pulses and the Cory mascot. No `animate-bounce`, `animate-ping` or spinners for page loads.
7. **Never rely on motion alone** to convey state; pair it with text, an icon or color.

### 4.2 Motion tokens
| Token | ms | Use |
| --- | --- | --- |
| `press` | 75 | `:active` press feedback (`scale-[0.98]`, `ease-out`) |
| `fast` | 150 | Tooltip fade/scale (enter and exit), popover/dropdown enter, other exits, search-focus delay, skeleton fade-out |
| `base` | 200 | Hover/color/shadow transitions, toast and overlay fades, default |
| `enter` | 300 | Content fade-in, page/section enters, long enters |
| `ambient` | 1500 | Skeleton pulse only |

Easings are Tailwind's built-ins: `ease-out` (enter), `ease-in` (exit), `ease-in-out` (color, hover, ambient). No custom `cubic-bezier`, no `linear` except the skeleton pulse. The one spring is the favorite bounce (below). Tooltips use `150ms` (`fast`) everywhere (Section 12).

### 4.3 Recipes (copy these, don't invent)
| Interaction | Classes / values |
| --- | --- |
| Hover color change | `transition-colors duration-200 ease-in-out` |
| Hover card lift | `transition-shadow duration-200 ease-in-out` (`shadow-subtle` to `shadow-fair`) |
| Press | `active:scale-[0.98] duration-75 ease-out` |
| Modal | backdrop opacity `0` to `1`; dialog opacity `0` to `1` with `scale(0.98)` to `1`; `200ms ease-out` in, `150ms ease-in` out |
| Popover / dropdown | opacity `0` to `1` with `scale(0.95)` to `1`, origin at the anchor, `150ms ease-out` in, `150ms ease-in` out |
| Toast | slide from the top-right edge with opacity `0` to `1`, `200ms ease-out`; reverse on exit (Section 8) |
| Content replacing skeleton | skeleton out `150ms ease-in`, content in `300ms ease-out` |
| List stagger | `75ms` delay per item, first 5 items only |
| Disclosure panel | `grid-template-rows: 0fr` to `1fr`, `200ms ease-out`, content `overflow-hidden` |

Never write `transition-all`. Name the property: `transition-colors`, `transition-shadow`, `transition-opacity`, `transition-transform`.

### 4.4 Specific behaviors

- **Page transitions:** cross-fade with `scale(0.98)` to `scale(1)` (View Transitions API, Framer Motion fallback).
- **Search focus:** the search bar expands or dims the background with `backdrop-blur-md`, with a `150ms` delay into the active state.
- **Skeletons (no spinners for page loads):**
  - Skeletons trace the incoming layout exactly. Pulse between `black-50` and `black-200` over `1.5s` ease-in-out (`animate-pulse`).
  - Header placeholders `32px` tall at 40-60% width; text lines `16px` tall; the last line of a paragraph is `70%` or `80%` wide; radius `4px`.
  - Stagger list skeletons by `75ms` per item.
  - Content fades in (`300ms ease-out`) as the skeleton fades out (`150ms ease-in`).
- **Long waits (> 1000ms):** show the mascot, "Cory the Cow", centered after a `150ms` delay to avoid flicker.
- **Micro-interactions:** favoriting uses a spring bounce (`stiffness: 400, damping: 10`); ratings highlight progressively on hover; tooltips fade/scale over `150ms`, no bounce.

### 4.5 Reduced motion (required)
Add this once in the global stylesheet. It turns movement into instant changes and stops the skeleton pulse (the skeleton stays a static `black-50` block):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
For JS-driven motion, read `useReducedMotion()` (Framer Motion) and drop the `scale`/`translate` parts, keeping an opacity fade at most. In Tailwind, add `motion-reduce:transition-none` to elements whose movement matters.

### 4.6 Motion anti-patterns
| Don't | Why | Do |
| --- | --- | --- |
| `transition-all` | Animates layout and paint properties, janks | Name the property |
| `duration-500`+, `duration-[Nms]` | Slow UI feels broken; arbitrary values drift | Use a motion token |
| Animating `width`/`height`/`top`/`left`/`margin` | Reflow every frame, layout shift | `transform` / `opacity` (or `grid-template-rows` for disclosures) |
| `animate-bounce`, `animate-ping`, page-load spinners | Decorative loops, distracting | Skeletons, then the Cory mascot after 1000ms |
| Springs everywhere | Reads as playful noise | Spring only on favoriting |
| Custom `cubic-bezier` | Inconsistent feel | `ease-out` / `ease-in` / `ease-in-out` |
| Parallax, scroll-jacking, autoplay | Accessibility and performance cost | Not used in Cattlelog |
| Motion with no reduced-motion path | Excludes users with vestibular disorders | Section 4.5 |

### 4.7 Motion checklist
- [ ] Does the animation explain a change? If not, delete it.
- [ ] Duration is a token (75/150/200/300), easing is `out`/`in`/`in-out`.
- [ ] Only `transform` and `opacity` animate; no `transition-all`.
- [ ] Enters ease-out and exits ease-in (and exits are shorter).
- [ ] Global reduced-motion block exists and the component degrades to instant/opacity-only.
- [ ] No new infinite animation.

---

## 5. States, Scrolling & Layout Stability

### Layout Shift (CLS) Protection
- Charts and other async regions pre-allocate `min-height` before data arrives.
- **Scrollbar gutter:** `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }`.
- **Custom scrollbars:** style `::-webkit-scrollbar` with a `black-200` track and `black-400` thumb (hover `black-500`). Hide scrollbars on nested horizontal pill lists (`scrollbar-width: none`) but keep a gradient/arrow affordance.
- **Scroll snap:** horizontal carousels use `snap-x snap-mandatory` with children `snap-start` or `snap-center`.
- **Overscroll:** `overscroll-behavior: contain` on nested scroll regions.

### Empty State
`flex flex-col items-center justify-center`, `min-h-[300px]`, `p-16` (64px). Illustration `160x160` (desaturated Cory), `60%` opacity. Heading: Heading 3 in `black-900`, `mt-6`. Description: Body in `black-600`, `max-w-[400px]`, centered, `mt-3`. Actions: secondary buttons with `gap-4`, `mt-8` below the description.

### Error State (404/500/boundary)
Never expose stack traces. Render the ErrorCard: `max-w-[480px] w-full p-8 rounded-xl` (12px), `surface-3` fill with a `1px red-500` border; title Heading 3 in `black-1000`; error code in Subtext monospace `red-500` (`mt-2`); a primary button ("Try Again" / "Return Home") `mt-6`. Structure is always Error Title, Error Description, Solution CTA, with the Cory emote illustration.

### Offline
When `navigator.onLine` is false show a sticky banner (`bg-yellow-500 text-black-1000 h-[40px]`, Subtext bold, `shadow-subtle`, `z-500`) at the top.

---

## 6. Form Controls

### Text Inputs
- **Heights:** Small `32px`, Medium `40px` (default), Large `48px`. Inline padding `px-16`. Radius `8px`.
- **Fill / border:** `blue-50` fill, `1px solid black-200`. Text is Body; **16px minimum on mobile** (prevents iOS zoom). Placeholder `black-600`.
- **Labels:** Subtext Bold above the field (`mb-1`), always visible (placeholders are not labels).
- **States:** Hover border `black-400`. Focus: `black-0` fill, border `blue-500`, plus a `0 0 0 2px blue-200` ring. Error: `1.5px pink-500` border on a `surface-3` fill, label and helper text in `pink-500`, helper text below the field linked with `aria-describedby`, plus `aria-invalid="true"`. Disabled: fill `black-50`, text `black-400`, `cursor: not-allowed`.

### Selects & Multi-select
- Standard select: `32px` tall, `6px` radius, `px-3`, chevron icon 16px.
- Multi-select tag field: `1px black-400` border, `8px` radius, leading search icon (20px), selected values as removable `surface-N` pills (`8px` radius, 8px dot, label, 12px close icon), trailing chevron (20px). Close buttons are keyboard focusable with `aria-label="Remove <value>"`.
- Type switcher ("Courses" | "Professors"): pill, `black-200` fill, 20px leading icon + label + chevron. A segmented toggle (36px tall pill, white track, active segment `blue-800` fill with white text) is used for two-way mode switches.

### Checkboxes, Radios & Toggles
- Checkbox / radio: exactly `18x18px`; checkbox radius `4px`, radio `50%`. Unchecked: `1.5px black-600` border. Checked: `blue-700` fill and border with a white check/dot.
- Toggle switch: `40x22px`; on = `blue-700`, off = `black-300`; label to its right with `gap-3`. Use `role="switch"` and `aria-checked`.
- On mobile, wrap each control and its label in a 44px-high row so the whole row is the hit area.

---

## 7. Data Visualization

- **Sequential:** `blue-300` to `blue-500` to `blue-700` to `blue-900`. **Diverging (bad to good):** `red-500` to `black-200` to `green-500`.
- **Categorical (max 5 series), in order:** `accent-1`, `accent-4`, `accent-9`, `accent-5`, `accent-6`. A single-series chart uses `accent-1`. Legend chips use the paired `surface-N` fill with an 8px dot in the series color.
- **Marks:** bars are narrow (about 8px wide) with a `2px` top radius, anchored to the baseline; lines are 2px strokes with small point dots. Gridlines are 1px `black-200`; axis labels use Subtext in `black-600`; y-axis ticks at 0/25/50/75/100% for percentage charts.
- **Tooltip:** `black-0` background, `1px black-200` border, `8px` radius, `p-3`, `pointer-events: none`, `z-index: 600`; bold title plus rows of dot + series name + value. Tooltips are also reachable by keyboard focus on the mark.
- **Accessibility:** every chart has a text summary or data-table alternative (`aria-label` plus a visually hidden table). Never rely on color alone: series are also distinguished by legend label.
- **Mobile:** keep tick labels legible (thin them out rather than shrinking text); let wide charts scroll horizontally inside their card with a fade affordance.

---

## 8. Status & Feedback

### Toasts
- **Placement:** top-right of the viewport (full-width minus 16px margins on mobile). Stack with `12px` gaps, newest on top; show at most 3 at once and queue the rest.
- **Size & look:** `360px` wide (`min(360px, calc(100vw - 32px))`), `p-4`, `8px` radius, `black-0` background, `shadow-strong`, `z-index: 500`.
- **Anatomy:** a `4px` left border in the status color (`green-500` success, `red-500` error, `yellow-500` warning, `blue-500` info), a Lucide status icon in that color, message text (Body, wraps), an optional one-line `DETAILS` expander, and a close button (24px).
- **Timing:** success `3s`, error `6s`; banners that demand action are sticky. Pause the timer on hover and keyboard focus; never auto-dismiss something the user is interacting with.
- **Motion:** slide in from the top-right edge with opacity `0` to `1` over `200ms` ease-out; reverse on exit.
- **Accessibility:** `role="status"` (polite) for success/info and `role="alert"` for errors. A toast is never the only path to an action; offer a persistent alternative.
- **Copy:** short and specific ("Course successfully bookmarked!", "Failed to submit review. Try again.").

### Modals / Dialogs
- Backdrop: `black-1000` at `25%` opacity (full screen). Container: `black-0`, `16px` radius, `24px` inner padding, `z-index: 400`.
- Sizes: Small `360px` (confirmations), Medium `480px` (default; forms, metadata), Large `640px` (comparison, configuration).
- Actions: primary on the trailing edge (bottom-right), secondary Cancel beside it. Escape closes; focus is trapped and restored.
- **Mobile:** modals become full-width bottom sheets with the same content and a visible close affordance.

### Chips, Badges & Rating Badge
- **Tag/GE chip:** `black-0` fill, `0.5px black-200` border, `8px` radius, `px-2 py-1`, an 8px colored dot (the tag's `ge-*` token) and a Subtext or Body label, `gap-1.5`.
- **Trait chip:** `black-50` fill, `8px` radius, `px-2 py-1`, Subtext Medium in `black-700`.
- **Quarter/term chip:** `blue-300` fill, `6px` radius, `black-1000` text.
- **Status badge:** pill (`9999px`), Subtext; pastel `surface-*` background with `accent-*` text.
- **Rating badge:** a rounded square (`8-12px` radius) with the score in Bold, filled by score: `green-500` high, `yellow-500` mid, `red-500` low. Text color follows the contrast rule (dark text on yellow; white on `red-500`/`green-500` is 4.55:1 / 4.53:1, which passes AA but with almost no margin, see Section 1). Sizes: 64px (page hero), 48px (list rows), 36px (inline). Always render the number so color is never the only signal.

---

## 9. Z-Index Scale

Never use arbitrary z-index values. Background `-10`, base `0`, cards `10`, dropdowns/popovers `100`, sticky headers `200`, overlays/backdrops `300`, modals `400`, toasts `500`, tooltips `600`.

---

## 10. Navigation

- **Header and Footer** are prebuilt components. Use them; do not recreate or restyle them.
- **In-page tabs / segmented controls:** follow the ARIA tabs map in Section 3; the active item uses `blue-800`.
- **Mobile:** primary navigation collapses into the header's menu; every nav target is at least 44px tall.
- **Collapsible sections (accordions):** the whole header row is the toggle, with `aria-expanded` and a chevron that rotates `180°`.

---

## 11. Interaction States

Every interactive element implements these states in this precedence: Default, Hover (`:hover`), Focus (`:focus-visible`), Active (`:active`), Disabled (`:disabled` or `aria-disabled="true"`).

- **Hover:** one step darker, cursor `pointer`, `transition-colors duration-200 ease-in-out`.
- **Active:** one more step darker, `scale-[0.98]`, `duration-75 ease-out`.
- **Focus:** the custom focus ring (Section 3); stacks visually with hover/active.
- **Disabled:** `pointer-events-none`, `cursor-not-allowed`, no hover/active styling; use the `disabled` attribute on form controls and `aria-disabled` on non-native controls.

### Buttons
Shared: height `40px` (minimum `44px` on mobile), `px-16`, radius `10px`, Body Regular.

**Primary** (one per view): default `bg-blue-700 text-black-0`; hover `bg-blue-800`; active `bg-blue-900`; disabled `bg-black-200 text-black-400`.

**Secondary:** default `bg-black-0 border border-blue-700 text-blue-700`; hover `bg-blue-50`; active `bg-blue-200`; disabled `border-black-200 text-black-400`. Never place a second solid accent color next to a primary.

**Text link:** default `text-blue-700 underline decoration-transparent underline-offset-4`; hover `text-blue-800 underline`. Links inside body copy are always underlined.

**Icon button:** 24px icon in a 44px hit area on mobile (32px on desktop); `aria-label` required.

---

## 12. Tooltips & Popovers

- **Portals:** all tooltips, popovers and dropdowns render via `createPortal` into `document.body`, positioned by a floating engine (e.g. `@floating-ui/react`) with `flip` and `shift` and a `16px` viewport margin.
- **Tooltip:** transient, non-interactive helper text only (no links or buttons). Shows on `mouseenter` and `focus` after `300ms`, hides immediately on `mouseleave`/`blur`. `black-900` background, `black-0` Subtext, `px-3 py-1.5`, `6px` radius, max width `200px`, `role="tooltip"` and `aria-describedby` on the trigger. Fade/scale `95%` to `100%` over `150ms`. Tooltips have no touch behavior; anything essential must be visible without hover.
- **Popover:** interactive content tied to an anchor; opens on click, closes on Escape or outside click. `black-0` background, `1px black-200` border, `shadow-strong`, `12px` radius, `p-4`. Moves focus in on open and back to the trigger on close. Trigger has `aria-haspopup="dialog"` and `aria-expanded`; popover is `role="dialog"`. On mobile a popover becomes a bottom sheet.

---

## 13. Images, Icons & Assets

### Aspect ratios (prevent CLS)
Declare `aspect-ratio` on every image/container: avatars `1/1` with `border-radius: 50%` (max 128px), banners `16/9` or `21/9`, thumbnails `4/3` or `3/2`.

### Fit & rendering
- `object-fit: cover; object-position: center` unless showing an uncropped chart (`contain`). Background images use `cover`/`center`.
- Above-the-fold media: `fetchpriority="high"`, no lazy loading. Below the fold: `loading="lazy" decoding="async"`. Serve WebP/AVIF in `<picture>` with a jpeg/png fallback.

### Icons
- **Lucide is the only icon library** (`lucide.dev`). Do not mix in Material Symbols, Font Awesome, Heroicons or hand-drawn icons; if Lucide lacks an icon, ask.
- Sizes: `12px` (inline dismiss), `16px` (chevrons/inline), `20px` (controls, inputs), `24px` (actions, nav). Keep the Lucide default stroke width (2).
- Icons use `currentColor` and a `viewBox`; decorative icons are `aria-hidden="true"`; icon-only buttons carry an `aria-label`.
- Illustrations (Cory) are SVG; don't hard-code colors in SVGs that should follow text color.

---

## 14. CSS Performance

- **Containment:** `contain: content` on deeply nested list items (infinite results).
- **Content visibility:** `content-visibility: auto` on heavy below-the-fold blocks (review lists, charts), always with `contain-intrinsic-size` (e.g. `0 400px`).
- **will-change:** only `opacity` and `transform`, only on actively animating elements, removed after the animation. Never on layout properties.
- Prefer `transform: translate3d()` for compositing on complex DOM.

---

## 15. Course Page Pattern

A reference composition; build it from the tokens above, not from raw pixel values.

- **Frame:** prebuilt Header, then a `blue-50` body with a single 1080px content column (desktop), then the prebuilt Footer. Sections are separated using the spacing scale.
- **Hero:** "Back to Courses" link (Lucide `arrow-left`, Body in `blue-800`); rating badge (64px) beside the course code (Subheading 1, Bold) and title (Subheading 2, `black-600`); description in Body (`black-600`); then actions: "Review Course" (primary) and "Compare Course" (secondary), `gap-4`.
- **Meta row:** GE chips, quarter chip, and units text separated by 3px dot dividers; below it a Live Enrollment row with OPEN and WAITLIST counts (count in SemiBold, label in Subtext; a zero count is `red-500`).
- **Search bar:** full column width, `50px` tall, `black-0`, `1px black-200` border, `8px` radius.
- **Data cards (Grade Distributions, GPA Trends, Professor Reviews):** `black-0`, `1px black-200` border, `8px` radius, `p-4`, `gap-3`. Header row: title (Subheading 2) with a "View More…" link and chevron on the right, then a divider. A legend chip (`surface-1` with a series dot, name, and average value plus unit) precedes the chart. Charts follow Section 7.
- **Professor reviews:** header (rating badge, name in SemiBold, department in Subtext `black-600`, add/bookmark/expand icon buttons); aggregated trait chips; each student review is a `p-3` block with an "Anonymous Student" plus term meta line, uppercase Subtext stat labels (QUALITY, DIFFICULTY, GRADE) each followed by its value, review body in Body (clamped to 3 lines) and an underlined "Read more…" link; a "View More" control loads additional reviews.
- **Sidebar (368px):** collapsible sections: quarter professor list (48px rating badges, name, trait chips, add and bookmark buttons, "previous quarters" control), Professor Timeline, Prerequisites (collapsed by default).
- **Mobile:** one column. Hero actions become full-width stacked buttons. Cards stack at full width; the sidebar sections follow the cards as accordions; charts scroll horizontally if needed; review text uses the mobile Body size with 44px "Read more" and "View More" hit areas.

---

## 16. Logo & Voice

- **Logo:** use the supplied lockup only. Minimum width 32px (mark) and 128px (full lockup); keep clear space of `1/4` the mark width. Approved backgrounds: `black-0`, `blue-800`, `gold-300`, `blue-300`. Never stretch, recolor or add effects. Mascot: "Cory" the cow in an astronaut helmet.
- **Voice:** empathetic and student-first (acknowledge registration stress), data-driven yet grounded (insight, not math homework), clever and witty but never goofy. Plain, direct copy: "Real grade distributions, decoded in seconds." not "Utilizing historical university databases to compile algorithmic GPA charts." Cow puns are occasional and subtle ("No bull, just data."), never forced into every label.
