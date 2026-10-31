# Rule → Check Map

Maps each design-skill rule to how it is audited. `Script` rows are implemented in `scripts/audit.mjs`; `Manual` rows need reading the code (or running the app). Rule text itself is not repeated here, so follow the source column.

## Script checks

| Rule id | Severity | Source rule | What it flags |
|---------|----------|-------------|---------------|
| `color/raw-hex` | error | SKILL.md Rule 1 | Any hex literal outside token-definition files. Suggests the exact token, or the nearest one. |
| `color/raw-function` | warn | Rule 1 | `rgb()/rgba()/hsl()/hsla()` without `var()` |
| `color/off-palette` | error | Rule 1 | Default Tailwind hues Cattlelog doesn't use (slate, gray, zinc, neutral, stone, amber, emerald, teal, sky, indigo, violet, purple, fuchsia, rose, cyan) |
| `color/unknown-shade` | error | Rule 1 | A brand hue with a shade not in `tokens.json` (e.g. `blue-100`) |
| `theme/dark-mode` | error | Rule 1 | `dark:`, `prefers-color-scheme: dark`, `data-theme="dark"` |
| `layout/arbitrary-spacing` | error | Rule 2 | `p-[21px]`, `gap-[10px]`, etc. |
| `layout/off-scale-spacing` | warn | Rule 2 | Tailwind numerics or CSS px not in 4/8/12/16/24/32/40/64/96 |
| `type/arbitrary` | error | Rule 2 | `text-[13px]`, `tracking-[...]`, `leading-[...]` |
| `type/letter-spacing` | warn | Rule 2 | CSS `letter-spacing` other than 0/normal |
| `type/font-family` | warn | Rule 2 | `font-family` without Figtree |
| `layout/img-aspect-ratio` | warn | Rule 3 | `<img>`/`<Image>` tag with no `aspect` in the tag. A wrapper may supply it, so verify. |
| `layout/scrollbar-gutter` | warn | Rule 3 | No `scrollbar-gutter: stable` in any scanned stylesheet (project-level) |
| `overlay/portal` | review | Rule 4, DESIGN §12.1 | Tooltip/Popover/Dropdown file with no portal |
| `a11y/focus-trap` | review | Rule 4, DESIGN §3 | Dialog/modal file with no recognizable focus-trap mechanism |
| `a11y/focus-ring-removed` | error | Rule 5 | `outline-none` / `outline: none` with no `focus-visible` or `ring-` on the same line (check for a rule elsewhere in the stylesheet before reporting) |
| `a11y/dialog-aria-modal` | error | Rule 5, DESIGN §3 | `role="dialog"` without `aria-modal` nearby |
| `a11y/dialog-label` | warn | DESIGN §3 | `role="dialog"` without `aria-labelledby`/`aria-label` |
| `a11y/clickable-div` | warn | Rule 5 | `onClick` on div/span/li/td with no `role` |
| `layout/z-index` | error | DESIGN §9 | z-index not in -10, 0, 10, 100, 200, 300, 400, 500, 600 |

## Manual checks (not in the script)

| Area | Source | How to check |
|------|--------|--------------|
| Text/background contrast | Rule 1, DESIGN §1 | Resolve each pair to hex via `tokens.json` and compute the ratio: 4.5:1 normal text, 3:1 large text and UI. Light fills take dark text. |
| Focus trapping and restoration | Rule 4, DESIGN §3 | Read the overlay implementation: Tab wraps, Shift+Tab wraps, focus returns to the trigger on close. |
| ARIA wiring | Rule 5, DESIGN §3 | `aria-controls`/`aria-labelledby` ids resolve; combobox `aria-expanded` toggles; live regions use `polite`/`assertive` as specified; roving tabindex. |
| Interactive states | SKILL.md checklist, DESIGN §11 | Buttons/links have hover, active, focus and disabled states. |
| Skeletons and motion | DESIGN §4 | Skeleton mirrors content structure; alternating pulse durations. |
| Truncation | DESIGN §3 | `break-words` plus explicit `line-clamp`; tooltip/`title` on ellipsis. |
| Semantic tokens | SKILL.md checklist | Prefer semantic tokens (`bg-surface-base`, `text-primary`) over primitives. |
| Aspect ratio via wrapper | Rule 3 | Dismiss `layout/img-aspect-ratio` when a parent declares a rigid ratio. |

## Known limitations

- Line-based regexes. A class split across string concatenations or built dynamically (`` `p-${n}` ``) is invisible to the script.
- Token-definition files (`tailwind.config.*`, `tokens.*`) are skipped for raw hex, since that's where hex values belong.
- `fixtures/`, `node_modules/`, `dist/`, `build/`, `.next/` and similar directories are skipped.
- Spacing checks use the Tailwind default 4px unit.
