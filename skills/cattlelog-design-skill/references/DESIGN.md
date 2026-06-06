# Davis Cattlelog - Design System & UI Guidelines

This document serves as the single source of truth for all UI, UX, styling, accessibility, and motion guidelines across the Davis Cattlelog web app and its companion Chrome extension. All values are derived from our central Figma brand identity.

## 1. Visual Identity & Color System

The Davis Cattlelog leverages a cohesive palette heavily indexing on our distinct brand blues and golds, contrasted against accessible neutral blacks.

### Brand Colors (Cattlelog Blue & Gold)
**Cattlelog Blue (Primary):**
- `blue-50`: `#F9FAFB`
- `blue-200`: `#EAF3FA`
- `blue-300`: `#C0DCF1`
- `blue-400`: `#97C5E8`
- `blue-500`: `#6DAEDF` (Brand Base)
- `blue-600`: `#4397D5`
- `blue-700`: `#206192`
- `blue-800`: `#164263`
- `blue-900`: `#0E2A3F`
- `blue-1000`: `#050E15`

**Cattlelog Gold (Accent):**
- `gold-50`: `#FFF5E5`
- `gold-200`: `#FFE2B3`
- `gold-300`: `#FFC363`
- `gold-400`: `#FFBA4D`
- `gold-500`: `#FFA71A` (Accent Base)
- `gold-600`: `#E68D00`
- `gold-700`: `#B36E00`
- `gold-800`: `#804E00`
- `gold-900`: `#4D2F00`
- `gold-1000`: `#1A1000`

### Neutral Palette
- `black-0`: `#FFFFFF`
- `black-50`: `#F2F2F2`
- `black-200`: `#D9D9D9`
- `black-300`: `#BFBFBF`
- `black-400`: `#A6A6A6`
- `black-500`: `#8C8C8C`
- `black-600`: `#737373`
- `black-700`: `#595959`
- `black-800`: `#404040`
- `black-900`: `#262626`
- `black-1000`: `#181818` (Primary Text/Background)

### Semantic & Status Colors
- **Success:** `green-500` (`#3E8D40`) / `lime-500` (`#76AF50`)
- **Warning:** `yellow-500` (`#E7C756`) / `orange-500` (`#E0A846`)
- **Error/Destructive:** `red-500` (`#E05346`) / `pink-500` (`#D97575`)
- **Info:** `blue-500` (`#6DAEDF`)

### Contrast Grid & Usage Rules
- **Light Mode:** Use `black-0` to `black-50` for backgrounds. Primary text must be `black-900` or `black-1000` to meet WCAG AAA guidelines. `blue-700` and `blue-800` for primary actions.
- **Dark Mode:** Use `black-1000` or `blue-1000` for backgrounds. Primary text must be `black-50` or `black-0`. Utilize `blue-400` and `gold-400` for vibrant accents and interactable elements.
- **Badges/Tags:** Use `-50` or `-200` variants for backgrounds with `-800` or `-900` variants for text (e.g., a Professor Badge uses `blue-200` bg with `blue-800` text).

### Shadows / Elevation
- `shadow-subtle`: Box shadow `0px 1px 2px #0000001A`, `0px 1px 3px #0000001A`
- `shadow-fair`: Box shadow `0px 2px 2px -2px #00000026`, `0px 2px 5px #00000026`
- `shadow-heavy`: Box shadow `0px 4px 4px -4px #00000026`, `0px 4px 12px #00000026`

---

## 2. Layout & Device Responsiveness

Cattlelog relies on a fluid grid system mapped to CSS Grid/Flexbox and Tailwind CSS standards. It mandates a deterministic structural shell to prevent horizontal overflow and guarantee visual density.

### Primary Shell Grid Architecture
The global application shell (`#root` or `#app`) MUST implement the following CSS Grid architecture:
- **CSS Grid Setup:** `display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh;`
- **Main Axis:** `grid-template-columns: minmax(0, 1fr);`
- **App Bar (Header):** Fixed `height: 64px;` (desktop) / `56px` (mobile). Must utilize `position: sticky; top: 0; z-index: 200; backdrop-filter: blur(12px);`.
- **Content Viewport:** `padding-top: var(--header-height);`.

### Responsive Breakpoint Tokenization & Grid Structure
- **Mobile (`xs`):** `< 640px`
  - Container: `width: 100%; max-width: 100%;`
  - Grid: 4 columns, `gap: 16px`
  - Paddings: `padding-inline: clamp(16px, 4vw, 24px);`
- **Tablet (`sm` to `md`):** `640px` to `< 1024px`
  - Container: `max-width: 768px`
  - Grid: 8 columns, `gap: 16px`
  - Paddings: `padding-inline: 24px;`
- **Desktop (`lg`):** `1024px` to `< 1280px`
  - Container: `max-width: 1024px`
  - Grid: 12 columns, `gap: 24px`
  - Paddings: `padding-inline: 32px;`
- **Widescreen (`xl` to `2xl`):** `>= 1280px`
  - Container: `max-width: 1280px` (Strictly enforced limit to prevent infinite widening)
  - Grid: 12 columns, `gap: 32px`
  - Paddings: `padding-inline: 64px;`

### Fluid Container Rule & Safe Areas
Content inside `.container` classes must NOT exceed the max container width tokens above, maintaining centered alignment with `margin-inline: auto`.
- Apply `padding-bottom: env(safe-area-inset-bottom);` for iOS safe areas.
- **Horizontal Overflow Zero Tolerance:** Apply `overflow-x: hidden;` to `html, body` explicitly.

### Responsive Layout Patterns
- **Mobile Experience:** 
  - Single-column stacked layouts for on-the-go viewing.
  - Search bar must be sticky (`sticky top-[var(--header-height)]`) to ensure immediate access.
  - Deep filters must be placed inside collapsible accordion menus or bottom-sheet drawers (`role="dialog"`).
  - Horizontal scrolling for data tables must include visual affordances (CSS mask-image fade-out: `mask-image: linear-gradient(to right, #000 80%, transparent);`) and `scroll-snap-type: x mandatory`.
- **Tablet/Desktop Experience:**
  - Utilize Split Panes for Discovery: fixed search/filter pane on the left (`width: 320px`, `flex-shrink: 0`), infinite scroll grid results on the right (`flex-grow: 1`).
  - Course Comparison pages should utilize side-by-side card layouts using `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));`.

---

## 3. Readability & Web Accessibility (a11y)

### Typography Stack
Our primary brand font is **Figtree**. The hierarchy is explicitly defined below to prevent cognitive fatigue.

*Desktop / General Hierarchy:*
- **Heading 1:** Bold (700), 64px, Line Height 100%, Tracking -2px
- **Heading 2:** Bold (700), 48px, Line Height 100%, Tracking -2px
- **Heading 3:** Bold (700), 30px, Line Height 100%, Tracking -2px
- **Subheading 1:** Bold (700), 24px, Line Height 100%, Tracking 0px
- **Subheading 2:** Bold (700), 18px, Line Height 100%, Tracking 0px
- **Subheading 3:** Regular (400), 16px, Line Height 100%, Tracking 0px
- **Subheading 4:** Regular (400), 14px, Line Height 100%, Tracking 0px
- **Body:** Regular (400), 16px, Line Height 100%, Tracking -1px
- **Subtext:** Regular (400), 14px, Line Height 100%, Tracking -2px

*Mobile Hierarchy:*
- **Heading 1:** Bold 36px
- **Heading 2:** Bold 30px
- **Heading 3:** Bold 24px
- **Subheading 1:** Bold 20px
- **Subheading 2:** Bold 16px
- **Subheading 3:** Regular 14px
- **Subheading 4:** Regular 13px
- **Body:** Regular 14px
- **Subtext:** Regular 12px

### Strict Focus Management Strategy
- **Focus Rings:** Browser default focus rings are strictly banned (`outline-none`). Implement custom `:focus-visible` globally on all interactive elements to prevent mouse-click focus rings.
  - Standard focus ring: `outline outline-2 outline-offset-2 outline-gold-500` (or `blue-500` where gold clashes).
  - Inner focus ring (for constrained spaces like table cells): `ring-2 ring-inset ring-gold-500`.
- **Focus Trapping:** Modals, dialogs, and bottom sheets MUST trap focus within their container while open. Tabbing past the last interactive element must wrap to the first interactive element.
- **Focus Restoration:** Upon closing a modal, dialog, or dropdown, focus MUST be programmatically returned to the element that originally triggered the overlay.
- **Roving Tabindex:** For composite widgets (like custom toolbars, tablists, or complex comboboxes), implement a roving `tabindex`. Only the currently active element should have `tabindex="0"`; the rest must have `tabindex="-1"`. Arrow keys map strictly to focus movement within the composite widget.
- **Skip Links:** Provide a visually hidden "Skip to Content" (`sr-only focus:not-sr-only`) anchor at the absolute top of the DOM to bypass repetitive navigation.

### Strict ARIA & Accessibility Roles Map
- **Navigation (`role="navigation"`):** Must be applied to all primary navigation containers. Use `aria-label="Primary Navigation"` for main headers and `aria-label="Pagination"` for list navigations.
- **Search Regions (`role="search"`):** The global search wrapper must have `role="search"`. The internal input must include `aria-label="Search courses or professors"` and `aria-autocomplete="list"`.
- **Modals & Dialogs (`role="dialog"`):** All overlays must use `role="dialog"`, include `aria-modal="true"`, and be labelled by `aria-labelledby` referencing the dialog's title ID.
- **ComboBox/Dropdowns (`role="combobox"`):** All custom select inputs must implement `role="combobox"`, with `aria-expanded` strictly toggling between `true`/`false`. The listbox must have `role="listbox"`, and items within must have `role="option"` with `aria-selected` tracking selection state.
- **Tabs (`role="tablist"`, `role="tab"`, `role="tabpanel"`):** Tabbed interfaces must rigorously map `aria-controls` from the tab to the panel ID, and `aria-labelledby` from the panel to the tab ID.
- **Live Regions (`aria-live`):** Dynamic data updates (e.g., filter results count changes) must announce silently to screen readers using `aria-live="polite"` on a visually hidden (`sr-only`) container. Form errors must use `aria-live="assertive"`.
- **Screen Reader Optimization:** Virtualized lists (e.g., `React Virtual`) MUST apply `aria-setsize` and `aria-posinset` dynamically. All interactive SVGs/icons must have `aria-hidden="true"` accompanied by `sr-only` descriptive text.

---

## 4. Motion Design, Animations & Micro-interactions

Motion should feel deliberate, premium, and inherently functional. Unnecessary movement is discouraged.

### Page Transitions
- Utilize **React 19 View Transitions API** (or Framer Motion fallback) for navigating between the Landing Page, Home Page, and Professor Pages.
- Use a slight cross-fade and scale-up (`scale(0.98)` to `scale(1)`) to create a continuous depth effect, matching the modern, snappy personality.

### Search Interactions
- The `CourseSearchBar` must transition smoothly when focused: expand its width dynamically or drop down a blurred overlay (`backdrop-blur-md`) over the background content to isolate the search experience.
- Input should have a micro-delay (`150ms`) expanding into its active state.

### Async Loading States & Skeleton Constraints
- **Skeleton Screens:** Do NOT use spinners for full-page loads. Use skeleton placeholders that trace the exact layout of the incoming data.
- **Skeleton Pulse Animation:** Must use a localized pulse animation (`animate-pulse`). Keyframes must alternate strictly between `bg-black-100` (opacity 1) and `bg-black-200` (opacity 0.6) with exactly a `1.5s` duration, ease-in-out curve.
- **Placeholder Widths & Sizing:**
  - Header placeholders: Fixed height of `32px` (`h-8`), width randomized deterministically between `40%` and `60%` (e.g., `w-[45%]`).
  - Text line placeholders: Fixed height of `16px` (`h-4`). 
  - For multi-line paragraphs, the last line must always be exactly `w-[70%]` or `w-[80%]` to simulate natural ragged right text. Never use `w-full` for all lines.
  - Border radius on all text skeletons must strictly be `4px` (`rounded`).
- **Staggered Fade-Ins:**
  - Skeletons rendering multiple cards (e.g., list views) MUST stagger their entrance or pulse phase. Delay each subsequent card skeleton by exactly `75ms` (`animation-delay: 75ms`, `150ms`, `225ms`) to create a cascading loading effect.
  - Upon data resolution, the transition from skeleton to actual content must use an explicit cross-fade: content fades in with `duration-300` `ease-out`, while skeleton fades out over `duration-150` `ease-in`.
- **Mascot Integration:** For deeper processing states exceeding `1000ms`, utilize the brand mascot ("Cory the Cow") dynamically (e.g., walking or chewing cud) centered in the viewport with a `150ms` delay before appearance to prevent flash-of-loading state.

### Micro-delights
- **Favoriting a Course:** Trigger a distinct elastic scale bounce (e.g., Framer Motion `spring` physics: `stiffness: 400, damping: 10`) on the star/heart icon.
- **Rating Components:** Stars should highlight progressively on hover.
- **Premium Glows:** Highly-rated courses/professors should receive a subtle pulse or radial glow (`shadow-gold-300/30`) on hover to draw attention visually.

---

## 5. Niche & Often-Missed Dashboard UI Details

### CLS (Cumulative Layout Shift) Protection
- **Skeleton Heights:** Charts, especially Grade Distribution visualizations, must pre-allocate standard `min-height` parameters before the async data returns.
- **Scrollbar Architecture:**
  - **Global Gutter:** Apply `scrollbar-gutter: stable` (or `overflow-y: scroll`) at the `<html/>` or `<body/>` root to explicitly prevent horizontal Cumulative Layout Shift (CLS) when dynamic content triggers a vertical scrollbar.
  - **Custom Scrollbars:** Default browser scrollbars must be visually suppressed or stylized to match the brand. WebKit pseudo-elements (`::-webkit-scrollbar`, `::-webkit-scrollbar-thumb`) must be customized using `black-200` for track and `black-400` (hover `black-500`) for thumb.
  - **Hide Scrollbar Rule:** For nested horizontal scrolling (like pill filter lists), explicitly hide the scrollbar (`scrollbar-width: none` & `::-webkit-scrollbar { display: none; }`) to maintain a clean UI, but ensure affordances (gradient masks/arrows) remain.
- **Scroll Snap Rules:**
  - **Horizontal Carousels:** Must enforce `snap-x` and `snap-mandatory` on the scrolling container. Child items must enforce `snap-center` or `snap-start` to ensure the view strictly rests on complete items, preventing halfway crops.
  - **Overscroll Behavior:** Set `overscroll-behavior: contain` on nested scrolling regions (e.g., side panels or dropdowns) to prevent scroll chaining (accidentally scrolling the main page when reaching the end of the dropdown).

### State Visualizations
- **Empty States Anatomy:** 
  - **Container:** Must use `flex flex-col items-center justify-center` with `min-h-[300px]` and a `padding` of exactly `64px` (`p-16`).
  - **Illustration:** Strict dimensions of `160px` by `160px`. Must use a desaturated brand illustration (e.g., Cory the Cow looking confused), opactiy strictly set to `60%`.
  - **Heading (Text):** Must use Heading 3 (`text-[30px] font-bold leading-tight tracking-tight`) mapped to `black-900`. Margin top strictly `24px` (`mt-6`).
  - **Description (Text):** Must use Body (`text-[16px] font-normal leading-relaxed`) mapped to `black-600`. Max width must be constrained to `400px` (`max-w-[400px]`), aligned `text-center`. Margin top strictly `12px` (`mt-3`).
  - **Call-to-Action:** Secondary button array (e.g., "Clear Filters") strictly separated by `16px` (`gap-4`), placed exactly `32px` (`mt-8`) below the description.
- **Error States (404/500/Boundary):** 
  - Do not expose raw stack traces. 
  - Must render a standardized ErrorCard component.
  - **Card Container:** `max-w-[480px] w-full p-8 rounded-xl border border-red-200 bg-red-50`.
  - **Error Title:** Heading 3, `text-red-700`.
  - **Error Code:** Must be visible in Subtext (`14px`) `text-red-500 font-mono mt-2`.
  - **Fallback Action:** "Return Home" or "Try Again" button using `bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 mt-6`.
- **Offline / Network Interruption:** Implement a subtle sticky banner (`bg-yellow-500 text-black-900 h-[40px] flex items-center justify-center text-[14px] font-bold shadow-subtle z-500`) at the top of the viewport when `navigator.onLine` is false.

### Thematic Flourishes
- While adhering to strict academic utility, incorporate playful brand touches. Hover states on secondary buttons might slide in a subtle cow print pattern at 5% opacity.
- Tooltips and small floating labels should be snappy (`100ms` duration) with no bounce, preserving a highly functional tone.

---

## 6. Form Controls Anatomy

### Text Inputs & Selects
- **Height Definitions:** Medium `40px` (Default), Large `48px`, Small `32px`.
- **Padding:** `0px 12px` strictly.
- **Border:** `1px solid black-200` (Light Mode), `1px solid black-800` (Dark Mode).
- **Border Radius:** `8px` (`rounded-lg`).
- **Typography:** Body Regular 16px to prevent iOS auto-zoom on focus.
- **States:**
  - *Hover:* Border darkens to `black-400`.
  - *Focus:* Border transforms to `blue-500`, accompanied by a `0 0 0 2px blue-200` outer box-shadow.
  - *Disabled:* Background `black-50`, Text `black-400`, Cursor `not-allowed`.

### Checkboxes & Radios
- **Size:** Exactly `16x16px`.
- **Border Radius:** `4px` for checkboxes, `50%` for radios.
- **Checked State:** Background `blue-500`, Border `blue-500`, SVG Checkmark `black-0`.

---

## 7. Data Visualization Tokens

### Chart & Graph Colors
To guarantee visual consistency in grade distributions and analytic graphs:
- **Sequential (Blue Scale):** `blue-300` -> `blue-500` -> `blue-700` -> `blue-900`.
- **Diverging (Bad to Good):** `red-500` -> `black-200` -> `green-500`.
- **Categorical (Max 5 items):**
  1. `blue-500`
  2. `gold-500`
  3. `green-500`
  4. `#8A4285` (Brand Purple Extension)
  5. `orange-500`
- **Tooltips (Data viz):** Background `black-900`, Text `black-0`, Padding `8px 12px`, Border-radius `4px`, `pointer-events: none`, Z-index `600`.

---

## 8. Status & Feedback Elements

### Toasts / Snackbars
- **Dimensions:** Width `min(300px, calc(100vw - 32px))`, max `400px`.
- **Padding:** `16px` uniform.
- **Border Radius:** `8px`.
- **Elevation:** `shadow-heavy`.
- **Motion:** Slide in from bottom-right (`transform: translateY(100%)` to `0`, Opacity `0` to `1` over `200ms` ease-out).
- **Anatomy (Success):** Left border `4px solid green-500`, Background `black-0`, Icon `green-500`.

### Badges / Tags
- **Dimensions:** Height `24px`.
- **Padding:** `0 8px`.
- **Typography:** Subtext Regular 14px or Mobile Subtext 12px Bold.
- **Border Radius:** `9999px` (Pill format).
- **Colors:** Derived from semantic scale. Default: `blue-50` background, `blue-800` text.

---

## 9. Z-Index Scale

### Strict Layering Architecture
Never use arbitrary z-index values (e.g., `99999`). Adhere to the following deterministic scale:
- **Background Elements:** `-10`
- **Base Content:** `0`
- **Elevated Content (Cards):** `10`
- **Dropdowns / Popovers:** `100`
- **Sticky Headers / Navbars:** `200`
- **Overlays / Backdrops:** `300`
- **Modals / Dialogs:** `400`
- **Toasts / Notifications:** `500`
- **Tooltips:** `600`

---

## 10. Navigation Anatomy

### 10.1 Top Navigation (Topnav) Pattern
- **Dimensions:** 
  - Fixed Height: `64px` across all breakpoints.
  - Border Bottom: `1px solid black-200` (Light) / `1px solid black-800` (Dark).
  - Background: `rgba(255, 255, 255, 0.8)` with `backdrop-blur-md` (Light) / `rgba(24, 24, 24, 0.8)` with `backdrop-blur-md` (Dark).
- **Positioning:** Strictly `sticky top-0` with `z-index: 200`.
- **Layout Constraints:**
  - Standard Grid Container: `max-w-[1280px] mx-auto`.
  - Padding X: `16px` (Mobile), `24px` (Tablet), `32px` (Desktop).
  - Flexbox Layout: `flex items-center justify-between`.
- **Anatomical Regions:**
  - **Left (Brand):** Logo lockup. Logo height `32px`, max-width `140px`. Padding right `24px`.
  - **Center (Search/Nav):** Search bar or primary link list (`flex gap-6`). Links must use Body Regular 16px.
  - **Right (Utility):** Profile, Theme Toggle, Notifications. Fixed gap `16px`. Icon sizes `24px`.

### 10.2 Sidebar Navigation (Desktop Only)
- **Visibility:** Visible only at `lg` breakpoint and above (`hidden lg:flex`).
- **Dimensions:**
  - Fixed Width: `240px` (Expanded) / `72px` (Collapsed).
  - Height: `calc(100vh - 64px)` (Starts below Topnav).
  - Border Right: `1px solid black-200` (Light) / `1px solid black-800` (Dark).
- **Padding:** `24px 16px`.
- **Item Anatomy:**
  - Height: `40px` per item.
  - Border Radius: `8px`.
  - Padding: `0 12px`.
  - Icon: Left-aligned, `20px` width/height.
  - Text: Body Regular 16px, `margin-left: 12px`.
- **Selected State:**
  - Background: `blue-50` (Light) / `blue-900` (Dark).
  - Text/Icon Color: `blue-700` (Light) / `blue-200` (Dark).
  - Indicator: Left border pseudo-element (`width: 4px`, `height: 20px`, `background: blue-500`, `border-radius: 0 4px 4px 0`, absolutely positioned at `left: 0`).

---

## 11. Interaction State Machine

### 11.1 Global State Hierarchy
All interactive elements (buttons, links, list items) MUST strictly follow this state precedence, from lowest to highest:
1. `Default`
2. `Hover` (`:hover`)
3. `Focus` (`:focus-visible`)
4. `Active` (`:active`)
5. `Disabled` (`:disabled` or `aria-disabled="true"`)

### 11.2 State Mutators
- **Hover:**
  - *Transform:* Background lightness decreases by ~5-10% (Light mode) or increases by ~5-10% (Dark mode). E.g., `blue-500` -> `blue-600` on hover.
  - *Cursor:* `pointer`.
  - *Transition:* `transition-colors duration-200 ease-in-out`.
- **Active (Pressed):**
  - *Transform:* Scale down slightly (`scale-95`). Background becomes darker (Light mode) or lighter (Dark mode). E.g., `blue-600` -> `blue-700`.
  - *Transition:* `duration-75 ease-out`.
- **Focus:**
  - *Visual Override:* Applies custom focus ring (`outline-2 outline-offset-2 outline-gold-500`).
  - *Note:* Focus state stacks with Hover/Active visually (e.g., ring persists during click).
- **Disabled:**
  - *Visual Override:* Opacity drops to `50%` OR background converts to `black-50` / text to `black-400`.
  - *Interactivity:* `pointer-events-none`, cursor `not-allowed`.
  - *Accessibility:* Must use `disabled` attribute for form inputs, or `aria-disabled="true"` for divs/anchors mimicking buttons. No `:hover` or `:active` styles should trigger.

### 11.3 Specific Component States
**Primary Button:**
- Default: `bg-blue-500 text-black-0`
- Hover: `bg-blue-600 shadow-md`
- Active: `bg-blue-700 scale-[0.98]`
- Disabled: `bg-black-200 text-black-400 opacity-70`

**Secondary/Outline Button:**
- Default: `border-2 border-blue-500 text-blue-500 bg-transparent`
- Hover: `bg-blue-50`
- Active: `bg-blue-100 scale-[0.98]`
- Disabled: `border-black-200 text-black-400`

**Text Links:**
- Default: `text-blue-600 underline-offset-4 decoration-transparent`
- Hover: `text-blue-700 decoration-blue-700 underline`
- Focus: Adds global focus ring on top.
