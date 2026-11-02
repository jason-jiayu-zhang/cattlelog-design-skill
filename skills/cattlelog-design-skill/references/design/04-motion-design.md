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
  - Skeletons trace the incoming layout exactly. `black-200` fill, pulsing opacity over `1.5s` ease-in-out (`animate-pulse`). (`black-50` is ~1.1:1 on white and vanishes at the pulse low; use it only for a skeleton sitting on a `black-200` surface.)
  - Header placeholders `32px` tall at 40-60% width; text lines `16px` tall; the last line of a paragraph is `70%` or `80%` wide; radius `4px`.
  - Stagger list skeletons by `75ms` per item.
  - Content fades in (`300ms ease-out`) as the skeleton fades out (`150ms ease-in`).
  - **Swap in place.** Skeleton and content share one grid cell (`Loadable` in `resources/templates/Skeleton.tsx`), so each bar sits where its words will land and nothing shifts on arrival.
  - **Only data loads.** Titles, column heads, labels and nav are real from the first frame; a skeleton over chrome reads as a page that hasn't loaded at all.
  - **Rows resolve whole, top to bottom** (75ms apart: avatar, name, meta and badge together), so the eye reads down the list once. The pulse stops the moment a row resolves.
  - **Refreshes keep their data.** Skeletons are for first load only; never flash a populated view back to placeholders.
- **Every change moves.** A label becoming a pill, a menu replaced in one frame, or a number that jumps all count as popping. Fade, slide or roll it.
- **Button states share one slot.** Keep the button mounted and put idle, pending and done in one grid cell, sized to the longest, so it never resizes or shifts neighbors on click. Press feedback first, then the result; change state only after the action completes.
- **An open surface holds its anchor.** Popovers, menus and dropdowns stay pinned by the edge they opened from; size and position them before their first frame and reserve height for the longest list so they never drift or resize while opening.
- **Overlays close where they opened:** keep the last position so the exit animates from the same place.
- **Interrupted animations retarget** from their current position instead of snapping to the start.
- **A new row carries the rows below it:** animate the container's height, not just the entering item.
- **A moving edge never slices text:** fade before and after a height change, or clip only whole rows.
- **Feedback starts on input.** Hover, press and focus respond at their token speed; don't delay them for effect.
- **Long waits (> 1000ms):** show the mascot, "Cory the Cow", centered after a `150ms` delay to avoid flicker.
- **Micro-interactions:** favoriting uses a spring bounce (`stiffness: 400, damping: 10`); ratings highlight progressively on hover; tooltips fade/scale over `150ms`, no bounce.

### 4.5 Reduced motion (required)
Add this once in the global stylesheet. It turns movement into instant changes and stops the skeleton pulse (the skeleton stays a static `black-200` block):

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
