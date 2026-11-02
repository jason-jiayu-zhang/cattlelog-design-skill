## 3. Readability & Web Accessibility (a11y)

### Typography
Primary font is **Figtree** (no secondary typeface). Use only the tokens below; never invent an intermediate size. Apply each token's weight and line-height exactly as defined, and don't set custom letter-spacing.

*Desktop:*
- **Heading 1:** Bold 700, 64px / 70.4px (110%)
- **Heading 2:** Bold 700, 48px / 52.8px (110%)
- **Heading 3:** Bold 700, 30px / 36px (120%)
- **Subheading 1:** Bold 700, 24px / 31.2px (130%)
- **Subheading 2:** SemiBold 600, 18px / 25.2px (140%)
- **Subheading 3:** Regular 400, 16px / 24px (150%)
- **Subheading 4:** Regular 400, 14px / 21px (150%)
- **Body:** Regular 400, 16px / 24px (150%)
- **Subtext:** Regular 400, 14px / 19.6px (140%)

*Mobile:*
- **Heading 1:** Bold 36px / 39.6px; **Heading 2:** Bold 30px / 36px; **Heading 3:** Bold 24px / 28.8px
- **Subheading 1:** Bold 20px / 26px; **Subheading 2:** Bold 16px / 22.4px; **Subheading 3:** Regular 14px / 21px; **Subheading 4:** Regular 13px / 19.5px
- **Body:** Regular 14px / 21px; **Subtext:** Regular 12px / 16.8px

Never set readable copy smaller than Subtext.

### Content Truncation & Line-Clamp
- **Single line:** `truncate` (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap`) for names and short titles.
- **Multi-line:** `-webkit-line-clamp`. Card previews `line-clamp-3`; compact list items `line-clamp-2`.
- A truncated string must expose its full text via a native `title` or a tooltip.
- Always pair truncation with `break-words` so long tokens (URLs) don't break the grid.

### Focus Management
- Never use bare `outline-none`. Implement `:focus-visible` on every interactive element: `outline outline-2 outline-offset-2 outline-gold-500` (use `blue-500` where gold clashes). In tight spaces (table cells) use `ring-2 ring-inset ring-gold-500`.
- **Trap** focus inside modals, dialogs, popovers and bottom sheets; tabbing past the last element wraps to the first.
- **Restore** focus to the trigger on close.
- **Roving tabindex** for composite widgets (toolbars, tablists, comboboxes): one `tabindex="0"`, the rest `-1`, arrows move focus.
- **Skip link:** a visually hidden "Skip to Content" (`sr-only focus:not-sr-only`) at the top of the DOM.

### ARIA Roles
- Primary nav `role="navigation"` with `aria-label`; pagination `aria-label="Pagination"`.
- Global search wrapper `role="search"`; its input has `aria-label` and `aria-autocomplete="list"`.
- Overlays: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing at the title id.
- Custom selects: `role="combobox"` with `aria-expanded`; list `role="listbox"`; items `role="option"` with `aria-selected`.
- Tabs: `tablist`/`tab`/`tabpanel` with `aria-controls` and `aria-labelledby`.
- Live regions: result-count updates `aria-live="polite"` on an `sr-only` node; form errors `aria-live="assertive"`.
- Virtualized lists set `aria-setsize` and `aria-posinset`. Interactive icons are `aria-hidden="true"` with `sr-only` text.
