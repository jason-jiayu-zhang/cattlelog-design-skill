---
name: cattlelog-design-audit-fix
description: "Fix violations found by cattlelog-design-audit, in two tracks: (1) mechanical code fixes in the repo, and (2) paste-ready prompts for Figma's AI agent to fix the matching screens in Figma. ACTIVATE when the user asks to fix, clean up, auto-fix or remediate design-system violations, or to generate Figma fix prompts. Requires cattlelog-design-audit."
---

# Cattlelog Design Audit Fix

Fixing has two halves, because drift lives in two places:

| Track | Where | How | Applies changes? |
|-------|-------|-----|------------------|
| **Code** | the repo | `scripts/fix.mjs` | Only with `--write`, only for exact mechanical fixes |
| **Figma** | the design file | `scripts/figma-prompts.mjs` | No. It generates prompts you paste into Figma's AI agent |

Both read the same audit output and both follow Mandatory Rule 6 of the design skill: **if there's no exact token, flag it, never guess.** Run commands from this skill's directory; both scripts depend on `../cattlelog-design-audit/scripts/`.

## Workflow

1. **Audit first.** `node ../cattlelog-design-audit/scripts/audit.mjs <paths>`. Don't fix blind.
2. **Code track, dry run.** `node scripts/fix.mjs <paths>` prints every line it would change as a `-`/`+` diff. Show the user this diff.
3. **Apply** with `--write` after the user agrees (or they've asked you to just fix it). It refuses files with uncommitted changes (`--force` overrides, but ask first) so the fix is always one reviewable diff. Add `--remaining=remaining.json` to save what's left.
4. **Read the "remaining" list.** Each leftover is either a decision for the user (see below) or a Figma-side issue.
5. **Figma track.** `node scripts/figma-prompts.mjs remaining.json --file=<figma url>` writes one prompt per category with evidence from the code. Use `--mode=report` first if the user wants to see what Figma's agent finds before it changes anything. `--generic` outputs the full Figma-side audit pack with no code findings needed.
6. **Verify.** Re-run the audit. If tokens changed in Figma, run `cattlelog-token-sync` before re-auditing.

## What the code track fixes (and only this)

| Rule | Fix | Condition |
|------|-----|-----------|
| `color/raw-hex` | `bg-[#6DAEDF]` -> `bg-blue-500`; CSS `#206192` -> `var(--blue-700)` | Exact hex match to a token. Never touches `--token: #hex` definitions or token files |
| `layout/arbitrary-spacing` | `p-[16px]` -> `p-4`, `gap-[1.5rem]` -> `gap-6` | Value is exactly on the 4/8/12/16/24/32/40/64/96 scale |
| `a11y/focus-ring-removed` | appends the `focus-visible` gold ring after `outline-none` | Tailwind class strings in markup |
| `a11y/dialog-aria-modal` | adds `aria-modal="true"` | `role="dialog"` in markup |
| `theme/dark-mode` | deletes `dark:*` classes | Markup only |

It skips comment lines and anything marked `audit-ignore`.

## What it deliberately does NOT fix (decisions for the user)

Present these as a short list with the options; don't pick for them.
- **Hex with no exact token** (`#123456`): nearest token is a suggestion only. Options: bind a new Figma variable, or use the nearest token.
- **Off-scale spacing / z-index / duration** (`mt-5`, `z-50`, `duration-500`): rounding up or down is a design choice.
- **Contrast failures:** the fix is a different color pair; needs a choice.
- **`transition-all`, layout-property transitions:** which property should animate depends on intent.
- **Missing focus trap / portal / `aria-labelledby` / clickable divs:** structural; do these as a normal edit with the user.
- **`prefers-color-scheme: dark` blocks and CSS `outline: none`:** need to be read in context.

## Figma prompts: what they contain

Eight categories: unbound colors, off-scale spacing, typography, contrast, missing focus/interaction states, image aspect ratios, prototype motion, dark-mode variants (plus mobile touch targets in `--generic`). Every prompt:
- names the scope (component names from the findings, or `--scope="Course Page"`, or "my current selection"),
- carries the code evidence as location hints, and says the design system, not the code, is the authority,
- forbids creating new variables/styles and forbids "close enough" matches (report instead),
- ends by requiring a changed/skipped report.

Findings that are pure implementation issues (ARIA, focus trap, z-index, `transition-all`, reduced-motion block) are listed as "code-only" and get no Figma prompt.

If the Figma MCP tools are connected and the user would rather you apply the design fixes directly than hand off prompts, say so; that is a separate, explicit step (load the `figma:figma-use` skill first).

## Report back

After a code fix: files changed, fixes by rule, and the remaining findings split into "needs your decision", "needs Figma" and "code-only, needs a manual edit". After a Figma prompt run: which prompt files/sections were generated and what each expects the agent to report.
