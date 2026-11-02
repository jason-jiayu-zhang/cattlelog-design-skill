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
- **Borders:** containers (cards, popovers, tooltips, chips, data cards, chart gridlines) use a `0.5px black-200` hairline, and only on white or near-white surfaces (`black-0`, `blue-50`, `black-50`). Colored fills (`surface-*`, brand and status fills) take no neutral border; their fill already separates them. Interactive controls (inputs, outlined buttons, checkboxes) and status/state borders (focus, error, the toast bar) keep their own widths so they stay identifiable. See Section 17.
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
