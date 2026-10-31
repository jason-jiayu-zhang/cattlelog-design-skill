# Scaffolding a New Component

Use this when asked to create a new Cattlelog component. Follow the steps in order; the goal is a component that passes `cattlelog-design-audit` on the first run.

## 1. Find the anatomy first
Read the matching `DESIGN.md` section **before** writing code. Don't design from memory.

| Component type | Read |
|---|---|
| Button, link, icon button | Section 11 |
| Input, select, checkbox, radio, toggle | Section 6 |
| Modal / dialog | Section 8, Section 3 (focus + ARIA) |
| Popover, dropdown, tooltip | Section 12 |
| Toast, chip, badge, rating | Section 8 |
| Card / list item / course page | Sections 2, 15 |
| Chart | Section 7 |
| Anything with motion | Section 4 (tokens + recipes) |

If the spec you need isn't there, or Figma holds a value that isn't in `design.md`/`tokens.json`, stop and flag it (Mandatory Rule 6). Don't invent.

## 2. Start from a template
Copy from `resources/templates/` and adapt imports to the repo's conventions:

| Template | Demonstrates |
|---|---|
| `Button.tsx` | Primary/secondary variants, all 5 interaction states, token-only colors, press/hover motion, custom focus ring, 44px mobile target |
| `Modal.tsx` | Native `<dialog>` (free focus trap + restoration), `role`/`aria-modal`/`aria-labelledby`, sizes 360/480/640, backdrop |
| `Popover.tsx` | Portal, flip/shift with 16px margin, focus manager, `aria-haspopup`/`aria-expanded`, `shadow-strong` |

Templates assume the Tailwind theme maps `design.md` (`colors`, `spacing`, `rounded`, `shadows`). Check the repo's Tailwind config first. If `rounded-button`, `rounded-xl` = 16px, or `shadow-strong` aren't defined, add them from `design.md` rather than using arbitrary values.

## 3. Required states and variants
Every interactive component implements, in order: Default, Hover, Focus (`:focus-visible`), Active, Disabled. Anything that loads data also needs a skeleton that mirrors the final layout, an empty state and an error state (Section 5). Mobile first: single column, 44px touch targets, 16px input text.

## 4. Accessibility minimums
- Native element first (`button`, `a`, `dialog`, `input`). Add ARIA roles only where no native element exists.
- Overlays: trap focus, restore focus to the trigger, close on Escape, portal tooltips/popovers/dropdowns.
- Icon-only controls: `aria-label`; decorative icons `aria-hidden="true"`; Lucide icons only.
- Never convey status by color alone.

## 5. Motion
Pick durations/easings from the Section 4.2 tokens, copy a recipe from 4.3, animate `transform`/`opacity` only, and add `motion-reduce:` handling. If you can't say what change the animation explains, don't add it.

## 6. Verify
Run the audit on the new files and fix everything it reports:

```bash
node skills/cattlelog-design-audit/scripts/audit.mjs <new-files>
```

Then walk the Output Checklist in `SKILL.md`. Contrast, focus-trap behavior and ARIA wiring are manual checks (see `cattlelog-design-audit/references/rule-map.md`).
