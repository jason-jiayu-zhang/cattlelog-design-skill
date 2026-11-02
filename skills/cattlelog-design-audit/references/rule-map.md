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
| `a11y/contrast` | error / warn | Rule 1, DESIGN §1 | `bg-<token>` and `text-<token>` on one line: error below 3:1, warn below 4.5:1 unless the line looks like large text |
| `color/status-text` | warn | DESIGN §1 | `text-red-500` / `text-green-500`: status colors are for icons, borders and indicators, never text. Heuristic: white text on a red/green fill (the Rating Badge score) is allowed, so dismiss it there. |
| `a11y/low-contrast-text` | warn / review | Rule 1, DESIGN §1 | `text-<token>` with no background on the line that is under 4.5:1 on white (warn under 3:1, review 3-4.5:1) |
| `motion/transition-all` | warn | Rule 7, DESIGN §4.3 | `transition-all` / `transition: all` |
| `motion/arbitrary-duration` | error | Rule 7 | `duration-[420ms]` |
| `motion/off-scale-duration` | warn | Rule 7, DESIGN §4.2 | Tailwind `duration-N`, CSS `transition`/`animation` times, or Framer `duration:` not in the `motion.duration` tokens (75/150/200/300/1500ms) |
| `motion/custom-easing` | warn | Rule 7 | `ease-[...]`, `cubic-bezier()` |
| `motion/decorative-loop` | warn | Rule 7, DESIGN §4.1 | `animate-bounce`, `animate-ping`, `animate-spin` |
| `motion/layout-property` | warn | Rule 7, DESIGN §14 | Transition on width/height/top/left/right/bottom/margin/padding/inset |
| `motion/reduced-motion` | warn | Rule 7, DESIGN §4.5 | Motion used but no `prefers-reduced-motion` / `motion-reduce:` / `useReducedMotion` anywhere (project-level) |
| `border/hairline` | warn | DESIGN §1, §17 | `border border-black-200` (1px) on a non-input line; should be `border-hairline` (0.5px) |
| `border/colored-fill` | review | DESIGN §17 | Neutral `border-black-*` on the same line as a colored `bg-` fill (`surface-*`, `blue-100+`, `gold-*`, status) |
| `icon/emoji` | warn | DESIGN §17 | Emoji inside a button, link, tab or labelled control |
| `icon/ai-sparkle` | warn | DESIGN §17 | Lucide `Sparkles`, `Stars`, `Wand`, `WandSparkles` imports (`Star` is allowed for ratings) |
| `icon/mixed-stroke` | warn | DESIGN §17 | More than one `strokeWidth` among a file's Lucide icons |
| `icon/mixed-size` | review | DESIGN §17 | More than two distinct icon `size` values in one file |
| `icon/squeezed` | review | DESIGN §17 | Lucide icon in a flex context with no `shrink-0` / `flex-none` |
| `layout/flex-1-control` | review | DESIGN §17 | `flex-1` on a button, chip or badge |
| `motion/will-change` | review | DESIGN §4, §17 | Any `will-change`; allowed only on the one element mid-animation |

## Manual checks (not in the script)

| Area | Source | How to check |
|------|--------|--------------|
| Text/background contrast beyond one-line pairs | Rule 1, DESIGN §1 | The script only sees token pairs on the same line. For pairs split across wrappers or lines, use `node scripts/contrast.mjs <fg> <bg>` (or `--matrix`, or `--documented` for the pairs DESIGN.md prescribes). 4.5:1 normal text, 3:1 large text and UI. Light fills take dark text. |
| Does the motion earn its place? | DESIGN §4.1 | Each animation must explain a change (something appeared, moved, was confirmed). Enters ease-out and are slower than exits; one loud animation at a time; stagger capped at 5 items. |
| Reduced-motion actually degrades | DESIGN §4.5 | Movement drops to instant or opacity-only; skeleton pulse stops. |
| Focus trapping and restoration | Rule 4, DESIGN §3 | Read the overlay implementation: Tab wraps, Shift+Tab wraps, focus returns to the trigger on close. |
| ARIA wiring | Rule 5, DESIGN §3 | `aria-controls`/`aria-labelledby` ids resolve; combobox `aria-expanded` toggles; live regions use `polite`/`assertive` as specified; roving tabindex. |
| Interactive states | SKILL.md checklist, DESIGN §11 | Buttons/links have hover, active, focus and disabled states. |
| Skeletons and motion | DESIGN §4 | Skeleton mirrors content structure; alternating pulse durations. |
| Truncation | DESIGN §3 | `break-words` plus explicit `line-clamp`; tooltip/`title` on ellipsis. |
| Optical centering | DESIGN §17 | Labels in pills, badges and icon buttons look centered; `text-box: trim-both cap alphabetic` applied where they don't. |
| Nested radii | DESIGN §17 | Outer radius = inner radius + padding between them. |
| Spacing details | DESIGN §17 | No text touching a neighbor, no near-tangent edges, controls 8px+ from edges above, columns on one grid template, no icon squeezed by long text. |
| Changing numbers | DESIGN §17 | Counts, ratings and GPA use `tabular-nums`. |
| Button and overlay motion | DESIGN §4.4 | Idle/pending/done share one slot and never resize; popovers hold their anchor and don't drift while opening. |
| Semantic tokens | SKILL.md checklist | Prefer semantic tokens (`bg-surface-base`, `text-primary`) over primitives. |
| Aspect ratio via wrapper | Rule 3 | Dismiss `layout/img-aspect-ratio` when a parent declares a rigid ratio. |

## Known limitations

- Line-based regexes. A class split across string concatenations or built dynamically (`` `p-${n}` ``) is invisible to the script.
- Token-definition files (`tailwind.config.*`, `tokens.*`) are skipped for raw hex, since that's where hex values belong.
- `fixtures/`, `node_modules/`, `dist/`, `build/`, `.next/` and similar directories are skipped.
- Spacing checks use the Tailwind default 4px unit.
- Comment-only lines are ignored. Contrast pairs are only checked when exactly one `bg-` and one `text-` token appear on the same line (hover/dark/other prefixed variants are not paired).
- Motion durations come from `tokens.json` -> `motion.duration`, which is consolidated from DESIGN.md values and is not Figma-verified.
- A CSS custom property whose name is a token (`--blue-500: #6DAEDF`) is exempt from `color/raw-hex`.
