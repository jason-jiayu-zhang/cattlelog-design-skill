## 15. Course Page Pattern

A reference composition; build it from the tokens above, not from raw pixel values.

- **Frame:** prebuilt Header, then a `blue-50` body with a single 1080px content column (desktop), then the prebuilt Footer. Sections are separated using the spacing scale.
- **Hero:** "Back to Courses" link (Lucide `arrow-left`, Body in `blue-800`); rating badge (64px) beside the course code (Subheading 1, Bold) and title (Subheading 2, `black-600`); description in Body (`black-600`); then actions: "Review Course" (primary) and "Compare Course" (secondary), `gap-4`.
- **Meta row:** GE chips, quarter chip, and units text separated by 3px dot dividers; below it a Live Enrollment row with OPEN and WAITLIST counts (count in SemiBold, label in Subtext; a zero count is `red-500`).
- **Search bar:** full column width, `50px` tall, `black-0`, `1px black-200` border, `8px` radius.
- **Data cards (Grade Distributions, GPA Trends, Professor Reviews):** `black-0`, `0.5px black-200` border, `8px` radius, `p-4`, `gap-3`. Header row: title (Subheading 2) with a "View More…" link and chevron on the right, then a divider. A legend chip (`surface-1` with a series dot, name, and average value plus unit) precedes the chart. Charts follow Section 7.
- **Professor reviews:** header (rating badge, name in SemiBold, department in Subtext `black-600`, add/bookmark/expand icon buttons); aggregated trait chips; each student review is a `p-3` block with an "Anonymous Student" plus term meta line, uppercase Subtext stat labels (QUALITY, DIFFICULTY, GRADE) each followed by its value, review body in Body (clamped to 3 lines) and an underlined "Read more…" link; a "View More" control loads additional reviews.
- **Sidebar (368px):** collapsible sections: quarter professor list (48px rating badges, name, trait chips, add and bookmark buttons, "previous quarters" control), Professor Timeline, Prerequisites (collapsed by default).
- **Mobile:** one column. Hero actions become full-width stacked buttons. Cards stack at full width; the sidebar sections follow the cards as accordions; charts scroll horizontally if needed; review text uses the mobile Body size with 44px "Read more" and "View More" hit areas.
