## 14. CSS Performance

- **Containment:** `contain: content` on deeply nested list items (infinite results).
- **Content visibility:** `content-visibility: auto` on heavy below-the-fold blocks (review lists, charts), always with `contain-intrinsic-size` (e.g. `0 400px`).
- **will-change:** only `opacity` and `transform`, only on actively animating elements, removed after the animation. Never on layout properties.
- Prefer `transform: translate3d()` for compositing on complex DOM.
