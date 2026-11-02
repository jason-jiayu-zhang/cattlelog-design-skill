## 6. Form Controls

### Text Inputs
- **Heights:** Small `32px`, Medium `40px` (default), Large `48px`. Inline padding `px-16`. Radius `8px`.
- **Fill / border:** `blue-50` fill, `1px solid black-200`. Text is Body; **16px minimum on mobile** (prevents iOS zoom). Placeholder `black-600`.
- **Labels:** Subtext Bold above the field (`mb-1`), always visible (placeholders are not labels).
- **States:** Hover border `black-400`. Focus: `black-0` fill, border `blue-500`, plus a `0 0 0 2px blue-200` ring. Error: `1.5px pink-500` border on a `surface-3` fill, label and helper text in `pink-500`, helper text below the field linked with `aria-describedby`, plus `aria-invalid="true"`. Disabled: fill `black-50`, text `black-400`, `cursor: not-allowed`.

### Selects & Multi-select
- Standard select: `32px` tall, `6px` radius, `px-3`, chevron icon 16px.
- Multi-select tag field: `1px black-400` border, `8px` radius, leading search icon (20px), selected values as removable `surface-N` pills (`8px` radius, 8px dot, label, 12px close icon), trailing chevron (20px). Close buttons are keyboard focusable with `aria-label="Remove <value>"`.
- Type switcher ("Courses" | "Professors"): pill, `black-200` fill, 20px leading icon + label + chevron. A segmented toggle (36px tall pill, white track, active segment `blue-800` fill with white text) is used for two-way mode switches.

### Checkboxes, Radios & Toggles
- Checkbox / radio: exactly `18x18px`; checkbox radius `4px`, radio `50%`. Unchecked: `1.5px black-600` border. Checked: `blue-700` fill and border with a white check/dot.
- Toggle switch: `40x22px`; on = `blue-700`, off = `black-300`; label to its right with `gap-3`. Use `role="switch"` and `aria-checked`.
- On mobile, wrap each control and its label in a 44px-high row so the whole row is the hit area.
