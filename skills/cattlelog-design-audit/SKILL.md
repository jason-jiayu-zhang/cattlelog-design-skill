---
name: cattlelog-design-audit
description: "Audit existing Davis Cattlelog UI code against the Cattlelog design system. ACTIVATE when the user asks to audit, review, lint, check, or verify UI/components/pages for design-system compliance, token usage, accessibility, color contrast, motion/animation, or layout stability. For building or changing UI, use cattlelog-design-skill instead."
---

# Cattlelog Design Audit

Check existing code against the rules in `cattlelog-design-skill`. This skill **reports by default and does not edit files**. To fix violations (in the repo, or in Figma via generated prompts), hand off to `cattlelog-design-audit-fix`. If the audit shows the palette itself has drifted from Figma, use `cattlelog-token-sync`.

The rules and tokens live in the design skill, not here:
- Rules: `../cattlelog-design-skill/SKILL.md` ("Mandatory Rules") and `../cattlelog-design-skill/references/DESIGN.md`
- Tokens: `../cattlelog-design-skill/resources/tokens.json` (the script reads this directly)

## Workflow

1. **Scope.** Audit the paths the user names; otherwise the files changed on the current branch (`git diff --name-only main...HEAD`), otherwise `src/`.
2. **Run the script** (deterministic checks, same result every run):
   ```bash
   node <this-skill-dir>/scripts/audit.mjs <paths...>            # human-readable
   node <this-skill-dir>/scripts/audit.mjs <paths...> --json     # machine-readable
   ```
   For contrast questions the script can't see (pairs split across wrappers), use the contrast checker:
   ```bash
   node <this-skill-dir>/scripts/contrast.mjs black-1000 blue-50        # one pair
   node <this-skill-dir>/scripts/contrast.mjs --matrix black blue       # every black-* on every blue-*
   node <this-skill-dir>/scripts/contrast.mjs --documented              # the pairings DESIGN.md prescribes
   ```
   Exit code is 1 if there are any `error` findings. Suppress a known-good line with `audit-ignore` on it, or `audit-ignore-next-line` above it, and mention any suppressions you see.
3. **Do the judgment checks** the script can't (see `references/rule-map.md`, "Manual"): whether each animation earns its place and degrades under reduced motion, contrast of pairs the script couldn't pair, focus trap and focus restoration behavior, ARIA correctness (`aria-controls`/`aria-labelledby` wiring, roving tabindex, live regions), skeleton structure and pulse timing, and whether a wrapper already supplies an image's aspect-ratio. Read the relevant `DESIGN.md` section before judging.
4. **Triage `REVIEW` and `WARN` findings.** The script is heuristic there, so open the code and confirm or dismiss each one. Never present an unverified heuristic as a confirmed violation.
5. **Report** in the format below.

## Severity

| Level | Meaning | Script behavior |
|-------|---------|-----------------|
| `error` | Unambiguous violation of a Mandatory Rule | exit 1 |
| `warn` | Likely violation, needs a quick look | exit 0 |
| `review` | Heuristic flag; human/model judgment required | exit 0 |

## Report format

Lead with one summary line: files scanned, then counts of confirmed errors, warnings and manual findings. Then group by severity, one entry per finding:

```
path/to/file.tsx:42  ERROR  color/raw-hex
  Raw hex #6DAEDF.  ->  Use token `blue-500`.
```

Each entry has `file:line`, severity, rule id, what is wrong, and the exact token or value to use instead. Report manual findings (anything you found beyond the script) in the same format and mark them `manual`. If the audit is clean, say so and list what was checked and what was not.

## Limits

State plainly what an audit did not cover: runtime behavior (focus trapping, keyboard flow), rendered contrast, and anything outside the scanned paths. A clean script run is not an accessibility sign-off.
