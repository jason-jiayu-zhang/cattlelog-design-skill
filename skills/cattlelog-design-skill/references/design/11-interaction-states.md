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
