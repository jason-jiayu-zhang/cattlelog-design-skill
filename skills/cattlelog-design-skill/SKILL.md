---
name: cattlelog-design-skill
description: "Design system, UI/UX guidelines, and aesthetics for the Davis Cattlelog web app. ACTIVATE this skill whenever the user asks to create, modify, debug, or design UI components for Cattlelog."
---

# Cattlelog Design Skill

Build deterministic, highly accessible, and visually stunning UI components for the Davis Cattlelog web app. This system strictly prohibits the hallucination of pixel values, colors, or animations.

## Mandatory Rules

These address the most common causes of visual inconsistency and layout breakages. Violating any of these produces a rejected build.

#### 1. Colors: Never use primitive hex codes
Do not use raw colors like `#6DAEDF` or generic tailwind classes like `blue-500` for structural elements.
**ALWAYS map primitives to semantic tokens** for deterministic light/dark mode rendering.
- `bg-surface-base`: Light Mode `black-0` | Dark Mode `black-1000`
- `text-primary`: Light Mode `black-1000` | Dark Mode `black-0`
- *See DESIGN.md Section 1 for the full map.*

#### 2. Typography & Layout: Use Rem-based 8pt scales
- **Spacing**: Use standard flex/grid gaps (`gap-4`, `gap-6`, `p-4`). Arbitrary pixel padding (e.g., `p-[21px]`) is forbidden.
- **Typography**: Adhere to the established Figtree scale (Heading 1 through Subtext). Do not invent intermediate font sizes.

#### 3. Image & Layout Stability: Prevent CLS
- Images and containers MUST declare a rigid `aspect-ratio` (e.g. `1/1` for avatars, `16/9` for banners).
- To prevent horizontal layout jumping, the root must apply `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }`.

#### 4. Component Overlays: Trap Focus and Use Portals
- Modals, Popovers, and Dropdowns MUST trap focus within their container while open.
- **React Portals:** All Tooltips, Popovers, and Dropdowns MUST be rendered via React Portals to prevent z-index clipping.

#### 5. Accessibility: Custom Focus Rings and ARIA
- Browser default focus rings are strictly banned (`outline-none`). Implement custom `:focus-visible` parameters (e.g., `outline-2 outline-offset-2 outline-gold-500`).
- Use the strict ARIA roles map: `role="navigation"`, `role="search"`, `role="dialog"`, etc. Do not rely on generic `div` semantics for interactive widgets.

---

## Token Lookup

For colors, typography, spacing, radii, and component token composites, read `/design.md` (repo root) first — it's a compact, machine-parseable token sheet in the same format as Vercel's `design.md`. Only fall back to `references/DESIGN.md` below for anatomy and behavioral rules it doesn't cover.

## Reference Files

For detailed patterns, read the relevant section in `references/DESIGN.md` BEFORE writing code:

| Topic | Reference |
|-------|-----------|
| Colors & Semantic Tokens | `references/DESIGN.md` (Section 1) |
| Grid, Shell Architecture, & Layout | `references/DESIGN.md` (Section 2) |
| Typography, Truncation & Accessibility | `references/DESIGN.md` (Section 3) |
| Motion, Skeletons & Micro-interactions | `references/DESIGN.md` (Section 4) |
| Empty States, Errors & Scrollbars | `references/DESIGN.md` (Section 5) |
| Form Controls Anatomy | `references/DESIGN.md` (Section 6) |
| Data Visualization Colors | `references/DESIGN.md` (Section 7) |
| Toasts, Badges & Feedback | `references/DESIGN.md` (Section 8) |
| Z-Index Scale | `references/DESIGN.md` (Section 9) |
| Navigation (Topnav/Sidebar) | `references/DESIGN.md` (Section 10) |
| Interaction State Machine | `references/DESIGN.md` (Section 11) |
| Tooltips & Popovers | `references/DESIGN.md` (Section 12) |
| Image & Asset Optimization | `references/DESIGN.md` (Section 13) |
| CSS Performance Rules | `references/DESIGN.md` (Section 14) |

---

## Output Checklist

Verify EVERY item before delivering UI code:

- [ ] Used semantic color tokens (`bg-surface-base`, `text-primary`) instead of primitives.
- [ ] Layout adheres to the 8pt scale (e.g., `gap-4`, `p-6`) without arbitrary pixels.
- [ ] Focus rings are custom (`:focus-visible`) and default outlines are removed.
- [ ] Z-index values are selected from the 10-step scale (0, 10, 100, 200, etc.).
- [ ] Skeletons mimic content structure and use the mandated alternating pulse durations.
- [ ] Modals and dialogs use explicit ARIA tags (`role="dialog"`, `aria-modal="true"`).
- [ ] Buttons and links implement Hover, Active, Focus, and Disabled states.
- [ ] Text truncation applies `break-words` and `line-clamp` explicitly.
- [ ] Images enforce a strict `aspect-ratio` to prevent layout shifts.
