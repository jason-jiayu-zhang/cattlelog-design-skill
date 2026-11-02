## 17. Layout & Polish Details

Small rules that separate "correct" from "finished". Most can't be linted, so check them by eye at 390px and desktop.

### Spacing & alignment
- **Nested radii:** outer radius = inner radius + the padding between them. A `10px` button inset `2px` from its container wants a `12px` container. When the numbers don't land on a token (say, a `12px` card with a `10px` button inset `8px`), the corners look mismatched; either shrink the inner radius toward `4px` or increase the padding until the gap reads as deliberate. Don't invent an off-scale radius.
- **Text never touches a neighbor.** Use a fixed `gap-2` or `gap-3` between a label and its neighbor, not leftover `justify-between` space.
- **A control keeps 8px or more** from the field, rule or card edge above it.
- **No near-tangents.** Edges 1-3px apart read as an accident: align them exactly, or separate them by at least `8px`.
- **Title over subtitle reads as one item:** 4-6px between the lines, more air before the next record. Whitespace groups; never spread lines evenly to fill a card.
- **Columns share one grid template** with fixed tracks. Optional content (a badge, a trailing icon) keeps its track empty so the other rows don't shift.
- **A dot, badge or ring** sits inside the row's inset, never hanging off its edge.
- **Hover and selection fills are inset and rounded.** Put the negative margin on the list, not on each row.
- **Controls hug their content.** No `flex-1` on a button or chip to fill space; stretch the wrapper, or use `w-full` for a full-width mobile CTA.
- **Fixed-size parts don't shrink:** icons, avatars and badges in a flex row get `shrink-0`.

### Type
- **Center a label on its letters, not its line box.** Capitals sit low in a plain line box, so text in a pill, badge, chip, GE tag or icon button can read low. Use `text-box: trim-both cap alphabetic` (with a fallback of 1px optical padding on the top if unsupported).
- **Small text** (Subtext and below) keeps a line height of at least `1.3` and padding on every side.
- **Changing numbers** (ratings, GPA, counts, units) use `tabular-nums` so the width doesn't jitter.
- **A centered amount centers its digits;** a currency sign hangs off the left rather than shifting the figure.
- **Sentence case** for UI copy, except proper nouns and the GE codes.

### Color & states
- **Quiet is not faint.** Check text, borders and placeholders against the real surface behind them, not white.
- **A filled button keeps its own color under the pointer:** one step of its own scale (`blue-700` to `blue-800`), never a swap to gray.
- **Nothing translucent overlaps.** Stacked avatars, chips and cards use opaque fills.
- **Status colors stay distinct** across success, pending and disabled, and are never the only signal.

### Icons
- **Lucide only** (existing rule), plus: one size and one stroke width per surface, set once; all decorative icons `aria-hidden="true"`.
- **Emoji are content, never icons.** Don't use them as button, tab or menu glyphs.
- **No generic AI sparkle.** `Sparkles`, `Wand` and similar don't stand in for "AI". Show what the feature does with its own icon. (`Star` for ratings is fine.)
- **No hand-drawn SVG glyphs;** use Lucide, the supplied logo, or Cory artwork.

### Borders
- **Hairline default:** `0.5px solid black-200` on containers. In Tailwind add `borderWidth: { hairline: '0.5px' }` and write `border-hairline border-black-200`; don't write `border-[0.5px]`.
- **Only on white or near-white.** Cards on the `blue-50` page, popovers, tooltips and chips sit on `black-0` and take the hairline. A container with a colored fill (`surface-*`, `blue-*`, `gold-*`, status fills, GE colors) takes no neutral border; the fill gives the contrast. A colored border on a colored fill is only for state (error, selected, focus).
- **Controls keep their weight.** Inputs, the search bar, outlined buttons and checkboxes need a 3:1 boundary to be identifiable (WCAG 1.4.11), which `black-200` at any width does not reach on white, so they keep their documented widths and colors.
- **Don't double up.** A bordered container that also carries `shadow-fair` or stronger drops the border, or uses the shadow only on hover/elevation.
