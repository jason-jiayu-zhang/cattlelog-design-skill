---
name: cattlelog-token-sync
description: "Sync Cattlelog design tokens from Figma variables into tokens.json, design.md and the DESIGN.md prose, and detect drift between them. ACTIVATE when the user says tokens/colors/spacing are out of sync with Figma, asks to pull the latest palette or variables from Figma, or asks whether the token files agree with each other. Requires the Figma MCP tools to pull from Figma."
---

# Cattlelog Token Sync

Figma is the authority. This skill pulls its variables and makes the repo's token files match, one reviewable diff at a time. It never writes to Figma.

| File | Role | Auto-updated by `--write` |
|------|------|---------------------------|
| `cattlelog-design-skill/resources/tokens.json` | machine-readable tokens (read by the audit) | Yes |
| `design.md` (repo root) frontmatter | compact token sheet (`colors`, `spacing`, `rounded`) | Yes |
| `cattlelog-design-skill/references/DESIGN.md` prose | `` `blue-500` `#6DAEDF` `` mentions and the GE table | Yes (exact `name` + `hex` pairs only) |
| a CSS / Tailwind variables file (`--css=`) | the app's actual variables | **No.** Report only; update by hand |

Scope: colors (all groups), spacing and rounded. Typography, shadows and motion tokens are not Figma-synced by this script (motion isn't a Figma variable at all).

## Workflow

1. **Get the Figma variables.** You need the file key (ask the user for the Figma URL if you don't have it). Per the Figma MCP instructions: `create_session` for the file, then `get_variable_defs` for the variables page/node. Save the result as JSON (e.g. `$TMPDIR/figma-vars.json`). Either shape works:
   - flat, straight from the tool: `{"Color/Primitives/blue-500": "#6DAEDF", "Miscellaneous/Gen. Ed./AH": "#E11D48", ...}`
   - structured: `{"colors": {"blue-500": "#6DAEDF"}, "spacing": {"4": 16}, "rounded": {"md": 8}}`

   Names are normalized (last path segment, lower-case; `Gen. Ed./AH` becomes `ge-ah`). Entries that don't map to a known token family are listed as ignored, never added silently.
2. **Dry run.** From this skill's directory:
   ```bash
   node scripts/sync.mjs --figma=<figma-vars.json> [--css=src/styles/tokens.css]
   ```
   It prints per-file drift (`+` added, `~` changed, `-` not in Figma) and exits 1 if anything drifted. Show the user this report.
3. **Apply** after they agree: add `--write`. Adds and changes are applied; removals are report-only unless `--prune`, which is refused if the Figma export has under 80% of the repo's tokens (a partial export would otherwise delete real tokens).
4. **Update the CSS variables by hand** from the report (the script never edits app code).
5. **Check propagation.** If a hex value changed, search the codebase for the old value (raw hex copies won't update on their own) and run the `cattlelog-design-audit` skill. If tokens were added, tell the user: new tokens need a Tailwind theme entry before components can use them.
6. **Review `git diff`.** Each changed token should appear in `tokens.json`, `design.md`, and wherever DESIGN.md mentions it.

## Consistency check without Figma

```bash
node scripts/sync.mjs --check [--css=...]
```
Compares `tokens.json` against `design.md`, DESIGN.md prose and any CSS file. Run it after any manual token edit, and in CI to stop the files drifting apart. Exit 1 means drift.

## Rules

- **Don't invent tokens.** A Figma name that doesn't match a known family (`blue|gold|black|green|lime|yellow|orange|red|pink|surface|accent|ge`) is reported, not added. If design wants a new family, add it to `COLOR_NAME` in `sync.mjs` deliberately.
- **Large diffs deserve a pause.** If `--write` would touch more than a handful of tokens, summarise the changes and confirm before applying. A palette-wide change affects every screen.
- **Call out semantic fallout.** Changing a token that DESIGN.md prescribes for contrast (e.g. `blue-700` button fill, `black-600` secondary text) can break documented pairings: run `node ../cattlelog-design-audit/scripts/contrast.mjs --documented` after syncing colors.
