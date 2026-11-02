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
