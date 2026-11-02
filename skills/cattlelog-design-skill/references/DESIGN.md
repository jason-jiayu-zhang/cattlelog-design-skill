# Davis Cattlelog - Design System & UI Guidelines

Single source of truth for UI, UX, styling, accessibility, and motion across the Davis Cattlelog web app and its companion Chrome extension. Values are verified against the Cattlelog Figma file. The app is **light-mode only**: do not build dark-mode variants, `dark:` classes, or theme toggles.

Figma-bound variables and the values in this file are the only verified values. See SKILL.md rule 6 for what to do when a design shows something that isn't here.

## How to use this file

This is an index. Read **only the section file you need** before writing code; don't load them all. Section numbers below are the ones cited across the skill, the audit and the templates ("DESIGN.md Section 4.3" means `design/04-motion-design.md`, subsection 4.3).

| § | Topic | File | ~Tokens |
|---|-------|------|---------|
| 1 | Visual Identity & Color System | `design/01-visual-identity-and-color-system.md` | 1396 |
| 2 | Layout & Device Responsiveness | `design/02-layout-and-device-responsiveness.md` | 618 |
| 3 | Readability & Web Accessibility (a11y) | `design/03-readability-and-web-accessibility.md` | 743 |
| 4 | Motion Design | `design/04-motion-design.md` | 2130 |
| 5 | States, Scrolling & Layout Stability | `design/05-states-scrolling-and-layout-stability.md` | 399 |
| 6 | Form Controls | `design/06-form-controls.md` | 454 |
| 7 | Data Visualization | `design/07-data-visualization.md` | 313 |
| 8 | Status & Feedback | `design/08-status-and-feedback.md` | 652 |
| 9 | Z-Index Scale | `design/09-z-index-scale.md` | 53 |
| 10 | Navigation | `design/10-navigation.md` | 116 |
| 11 | Interaction States | `design/11-interaction-states.md` | 347 |
| 12 | Tooltips & Popovers | `design/12-tooltips-and-popovers.md` | 266 |
| 13 | Images, Icons & Assets | `design/13-images-icons-and-assets.md` | 273 |
| 14 | CSS Performance | `design/14-css-performance.md` | 121 |
| 15 | Course Page Pattern | `design/15-course-page-pattern.md` | 555 |
| 16 | Logo & Voice | `design/16-logo-and-voice.md` | 179 |
| 17 | Layout & Polish Details | `design/17-layout-and-polish-details.md` | 1057 |

Tokens for colors, type, spacing, radii and component composites live in `design.md` and `../resources/tokens.json`, not here.
