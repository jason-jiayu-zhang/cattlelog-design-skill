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

Cattlelog relies on a fluid grid system mapped to Tailwind CSS standards, designed for dense academic data visualizations across devices.

### Grid Structure & Margins
- **Desktop (>= 1024px):** 12-column grid. Standard margins of `32px` to `64px`. Gutter width of `24px`.
- **Tablet (768px - 1023px):** 8-column grid. Standard margins of `24px` to `32px`. Gutter width of `16px`.
- **Mobile (< 768px):** 4-column grid. Standard margins of `16px`. Gutter width of `16px`.

### Responsive Layout Patterns
- **Mobile Experience:** 
  - Single-column stacked layouts for on-the-go viewing.
  - Search bar must be sticky (`sticky top-0`) to ensure immediate access.
  - Deep filters must be placed inside collapsible accordion menus or bottom-sheet drawers to conserve vertical space.
  - Horizontal scrolling for data tables must include visual affordances (fade-out masks or scroll indicators).
- **Tablet/Desktop Experience:**
  - Leverage screen real estate for dense information visualization.
  - Utilize Split Panes: fixed search/filter pane on the left, infinite scroll results on the right.
  - Course Comparison pages should utilize side-by-side card layouts.

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

### Keyboard Navigation & Focus Rules
- **Focus Rings:** Browser default focus rings are banned. Implement custom `:focus-visible` parameters on all interactive elements.
  - Use `outline-2 outline-offset-2 outline-gold-500` (or `blue-500` where gold clashes) to ensure keyboard-only navigation is extremely fluid and distinct.
- **Skip Links:** Provide a "Skip to Content" anchor for screen readers.

### Screen Reader Optimization
- Virtualized lists (e.g., using `React Virtual` for heavy course queries) MUST apply `aria-setsize` and `aria-posinset` dynamically, along with proper `role="list"` and `role="listitem"` tags so screen readers can parse gracefully without performance degradation.
- All interactive svgs/icons must have `aria-hidden="true"` accompanied by screen-reader only (`sr-only`) descriptive text.

---

## 4. Motion Design, Animations & Micro-interactions

Motion should feel deliberate, premium, and inherently functional. Unnecessary movement is discouraged.

### Page Transitions
- Utilize **React 19 View Transitions API** (or Framer Motion fallback) for navigating between the Landing Page, Home Page, and Professor Pages.
- Use a slight cross-fade and scale-up (`scale(0.98)` to `scale(1)`) to create a continuous depth effect, matching the modern, snappy personality.

### Search Interactions
- The `CourseSearchBar` must transition smoothly when focused: expand its width dynamically or drop down a blurred overlay (`backdrop-blur-md`) over the background content to isolate the search experience.
- Input should have a micro-delay (`150ms`) expanding into its active state.

### Async Loading States
- **Skeleton Screens:** Do NOT use spinners for full-page loads. Use skeleton placeholders that trace the exact layout of the incoming data.
- Skeletons should use a soft, localized pulse animation (`animate-pulse` mapping to `black-200`/`black-300`). 
- **Mascot Integration:** For deeper processing states, utilize the brand mascot ("Cory the Cow") dynamically, e.g., Cory walking or chewing cud during prolonged backend fetching via React Query.

### Micro-delights
- **Favoriting a Course:** Trigger a distinct elastic scale bounce (e.g., Framer Motion `spring` physics: `stiffness: 400, damping: 10`) on the star/heart icon.
- **Rating Components:** Stars should highlight progressively on hover.
- **Premium Glows:** Highly-rated courses/professors should receive a subtle pulse or radial glow (`shadow-gold-300/30`) on hover to draw attention visually.

---

## 5. Niche & Often-Missed Dashboard UI Details

### CLS (Cumulative Layout Shift) Protection
- **Skeleton Heights:** Charts, especially Grade Distribution visualizations, must pre-allocate standard `min-height` parameters before the async data returns.
- **Scrollbar Gutter:** Apply `scrollbar-gutter: stable` (or `overflow-y: scroll`) at the layout root. This strictly avoids horizontal content jumping when dynamic pagination or list filtering causes the vertical scrollbar to toggle on/off.

### State Visualizations
- **Empty States:** Searches yielding no results must render an illustrated "Empty State" component (e.g., Cory looking confused) with clear, actionable fallback buttons (e.g., "Clear Filters", "Browse All").
- **Error States (404/500):** Friendly, brand-aligned error pages. Do not expose raw stack traces.
- **Offline / Network Interruption:** Implement a subtle sticky banner (`bg-yellow-500 text-black-900`) at the top of the viewport when `navigator.onLine` is false.

### Thematic Flourishes
- While adhering to strict academic utility, incorporate playful brand touches. Hover states on secondary buttons might slide in a subtle cow print pattern at 5% opacity.
- Tooltips and small floating labels should be snappy (`100ms` duration) with no bounce, preserving a highly functional tone.
