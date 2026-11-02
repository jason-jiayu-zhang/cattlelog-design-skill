## 8. Status & Feedback

### Toasts
- **Placement:** top-right of the viewport (full-width minus 16px margins on mobile). Stack with `12px` gaps, newest on top; show at most 3 at once and queue the rest.
- **Size & look:** `360px` wide (`min(360px, calc(100vw - 32px))`), `p-4`, `8px` radius, `black-0` background, `shadow-strong`, `z-index: 500`.
- **Anatomy:** a `4px` left border in the status color (`green-500` success, `red-500` error, `yellow-500` warning, `blue-500` info), a Lucide status icon in that color, message text (Body, wraps), an optional one-line `DETAILS` expander, and a close button (24px).
- **Timing:** success `3s`, error `6s`; banners that demand action are sticky. Pause the timer on hover and keyboard focus; never auto-dismiss something the user is interacting with.
- **Motion:** slide in from the top-right edge with opacity `0` to `1` over `200ms` ease-out; reverse on exit.
- **Accessibility:** `role="status"` (polite) for success/info and `role="alert"` for errors. A toast is never the only path to an action; offer a persistent alternative.
- **Copy:** short and specific ("Course successfully bookmarked!", "Failed to submit review. Try again.").

### Modals / Dialogs
- Backdrop: `black-1000` at `25%` opacity (full screen). Container: `black-0`, `16px` radius, `24px` inner padding, `z-index: 400`.
- Sizes: Small `360px` (confirmations), Medium `480px` (default; forms, metadata), Large `640px` (comparison, configuration).
- Actions: primary on the trailing edge (bottom-right), secondary Cancel beside it. Escape closes; focus is trapped and restored.
- **Mobile:** modals become full-width bottom sheets with the same content and a visible close affordance.

### Chips, Badges & Rating Badge
- **Tag/GE chip:** `black-0` fill, `0.5px black-200` border, `8px` radius, `px-2 py-1`, an 8px colored dot (the tag's `ge-*` token) and a Subtext or Body label, `gap-1.5`.
- **Trait chip:** `black-50` fill, `8px` radius, `px-2 py-1`, Subtext Medium in `black-700`.
- **Quarter/term chip:** `blue-300` fill, `6px` radius, `black-1000` text.
- **Status badge:** pill (`9999px`), Subtext; pastel `surface-*` background with `accent-*` text.
- **Rating badge:** a rounded square (`8-12px` radius) with the score in Bold, filled by score: `green-500` high, `yellow-500` mid, `red-500` low. Text color follows the contrast rule (dark text on yellow; white on `red-500`/`green-500` is 4.55:1 / 4.53:1, which passes AA but with almost no margin, see Section 1). Sizes: 64px (page hero), 48px (list rows), 36px (inline). Always render the number so color is never the only signal.
