## 5. States, Scrolling & Layout Stability

### Layout Shift (CLS) Protection
- Charts and other async regions pre-allocate `min-height` before data arrives.
- **Scrollbar gutter:** `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }`.
- **Custom scrollbars:** style `::-webkit-scrollbar` with a `black-200` track and `black-400` thumb (hover `black-500`). Hide scrollbars on nested horizontal pill lists (`scrollbar-width: none`) but keep a gradient/arrow affordance.
- **Scroll snap:** horizontal carousels use `snap-x snap-mandatory` with children `snap-start` or `snap-center`.
- **Overscroll:** `overscroll-behavior: contain` on nested scroll regions.

### Empty State
`flex flex-col items-center justify-center`, `min-h-[300px]`, `p-16` (64px). Illustration `160x160` (desaturated Cory), `60%` opacity. Heading: Heading 3 in `black-900`, `mt-6`. Description: Body in `black-600`, `max-w-[400px]`, centered, `mt-3`. Actions: secondary buttons with `gap-4`, `mt-8` below the description.

### Error State (404/500/boundary)
Never expose stack traces. Render the ErrorCard: `max-w-[480px] w-full p-8 rounded-xl` (12px), `surface-3` fill with a `1px red-500` border; title Heading 3 in `black-1000`; error code in Subtext monospace `red-500` (`mt-2`); a primary button ("Try Again" / "Return Home") `mt-6`. Structure is always Error Title, Error Description, Solution CTA, with the Cory emote illustration.

### Offline
When `navigator.onLine` is false show a sticky banner (`bg-yellow-500 text-black-1000 h-[40px]`, Subtext bold, `shadow-subtle`, `z-500`) at the top.
