## 13. Images, Icons & Assets

### Aspect ratios (prevent CLS)
Declare `aspect-ratio` on every image/container: avatars `1/1` with `border-radius: 50%` (max 128px), banners `16/9` or `21/9`, thumbnails `4/3` or `3/2`.

### Fit & rendering
- `object-fit: cover; object-position: center` unless showing an uncropped chart (`contain`). Background images use `cover`/`center`.
- Above-the-fold media: `fetchpriority="high"`, no lazy loading. Below the fold: `loading="lazy" decoding="async"`. Serve WebP/AVIF in `<picture>` with a jpeg/png fallback.

### Icons
- **Lucide is the only icon library** (`lucide.dev`). Do not mix in Material Symbols, Font Awesome, Heroicons or hand-drawn icons; if Lucide lacks an icon, ask.
- Sizes: `12px` (inline dismiss), `16px` (chevrons/inline), `20px` (controls, inputs), `24px` (actions, nav). Keep the Lucide default stroke width (2).
- Icons use `currentColor` and a `viewBox`; decorative icons are `aria-hidden="true"`; icon-only buttons carry an `aria-label`.
- Illustrations (Cory) are SVG; don't hard-code colors in SVGs that should follow text color.
