#!/usr/bin/env node
// Cattlelog audit-fix, Figma track. Turns audit findings into paste-ready prompts for a Figma AI agent.
// This script only generates text. It never touches Figma.
//
//   node figma-prompts.mjs <audit.json>            prompts for categories that have findings
//   node figma-prompts.mjs --generic               the full Figma-side audit pack, no findings needed
//   options: --mode=fix|report (default fix)   --file=<figma url>   --scope="Course Page"   --out=prompts.md
//
// <audit.json> is the output of `audit.mjs --json` or `fix.mjs --write --remaining=out.json`.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const mode = flag('mode') ?? 'fix';
const generic = args.includes('--generic');
const fileUrl = flag('file');
const scopeName = flag('scope');
const input = args.find((a) => !a.startsWith('--'));
if (!generic && !input) { console.error('usage: figma-prompts.mjs <audit.json> | --generic  [--mode=fix|report] [--file=url] [--scope=name] [--out=file]'); process.exit(2); }
if (!['fix', 'report'].includes(mode)) { console.error('--mode must be fix or report'); process.exit(2); }

const findings = generic ? [] : (JSON.parse(fs.readFileSync(input, 'utf8')).findings ?? []);

// Each category: which audit rules feed it, and what to ask Figma's agent to do.
const CATS = [
  {
    id: 'color', title: 'Colors not bound to variables',
    rules: ['color/raw-hex', 'color/raw-function', 'color/off-palette', 'color/unknown-shade'],
    task: 'Find fills, strokes and effects that use raw color values (not bound to a color variable) or colors outside the Cattlelog palette. Bind each to the Cattlelog color variable whose value matches EXACTLY (variables: blue-*, gold-*, black-*, green/lime/yellow/orange/red/pink-500, surface-1..10, accent-1..10, ge-*). Where a hint names the variable, use it.',
  },
  {
    id: 'spacing', title: 'Spacing off the 4/8/12/16/24/32/40/64/96 scale',
    rules: ['layout/arbitrary-spacing', 'layout/off-scale-spacing'],
    task: 'Check auto layout padding, item spacing (gap) and margins/offsets. The only allowed values are 4, 8, 12, 16, 24, 32, 40, 64 and 96px. Where a hint gives the intended scale value, set it. Where a value is between two scale steps, do not round: report the node and the two nearest steps.',
  },
  {
    id: 'type', title: 'Typography off the Figtree scale',
    rules: ['type/arbitrary', 'type/letter-spacing', 'type/font-family'],
    task: 'Check text layers. Every one must use a Figtree text style from the type scale (Heading 1-3, Subheading 1-4, Body, Subtext; desktop and mobile variants). Apply the matching style only if size and weight match exactly; remove custom letter-spacing. Otherwise report the node with its current size/weight/font.',
  },
  {
    id: 'contrast', title: 'Contrast failures',
    rules: ['a11y/contrast', 'a11y/low-contrast-text'],
    task: 'Check text/fill pairs. Normal text needs 4.5:1, large text (24px, or 18.66px bold) and UI/icons 3:1. Fix only with the documented pairings: white (black-0) on dark fills (blue-700 and darker, accent-*), black-1000 on light fills (yellow/orange/lime, gold, surface-*, blue-300 and lighter); secondary text no lighter than black-600. If no documented pairing resolves it, report the pair and its ratio instead of choosing a new color.',
  },
  {
    id: 'states', title: 'Missing focus / interaction states',
    rules: ['a11y/focus-ring-removed'],
    task: 'Every interactive component needs variants for Default, Hover, Focus, Active and Disabled. The Focus variant shows a 2px outline in variable gold-500 with a 2px offset (blue-500 only where gold clashes). Add any missing state variant to the existing component by duplicating Default; do not create new standalone components.',
  },
  {
    id: 'image', title: 'Images without fixed aspect ratios',
    rules: ['layout/img-aspect-ratio'],
    task: 'Image and media frames must have a fixed aspect ratio: 1:1 for avatars, 16:9 for banners, matching the component spec. Lock the ratio and set the image fill to Fill (cover) so the frame cannot resize with its content.',
  },
  {
    id: 'motion', title: 'Prototype motion off the motion tokens',
    rules: ['motion/off-scale-duration', 'motion/arbitrary-duration', 'motion/custom-easing', 'motion/decorative-loop'],
    task: 'Check prototype interactions and animations. Durations must be 75, 150, 200 or 300ms (skeleton pulses 1500ms). Easing: ease-out for things entering, ease-in for things leaving, ease-in-out for color/hover. Remove bounce/spring easings except on the favorite action, and any looping decorative animation. Report anything you cannot map to a token.',
  },
  {
    id: 'theme', title: 'Dark-mode variants',
    rules: ['theme/dark-mode'],
    task: 'Cattlelog is light-mode only. Find dark variable modes, dark variants or dark frames for these components and report them. In fix mode, remove only dark variants that are not referenced by other components.',
  },
];
// Generic-only: no code finding maps to these, but the Figma side should still be checked.
const GENERIC_EXTRA = [
  {
    id: 'touch', title: 'Mobile touch targets',
    task: 'On mobile frames, every interactive element must have a hit area of at least 44px tall (icon buttons: 24px icon inside a 44px area). Inputs use 16px text. Resize hit areas or padding to meet this using scale values; report anything that would change the visual layout.',
  },
];

const guard = (scope) => `You are working in${fileUrl ? ` the Figma file ${fileUrl}` : ' the open Figma file'}. Scope: ${scope}.
Rules:
- Use only existing variables and styles from the Cattlelog design system. Never create new variables or styles.
- If no existing variable or style matches EXACTLY, do NOT pick a close one. Leave the node unchanged and list it in your report with its name, the current value, and the nearest existing variable.
- Do not edit anything outside the scope. Do not rename layers, detach instances or delete components.`;

const outro = (m) =>
  m === 'report'
    ? '\nMode: REPORT ONLY. Make no changes to the file. Return a table of: node name, property, current value, expected variable/value.'
    : '\nMake the changes, then return a report with two tables: nodes changed (name, property, before -> after) and nodes skipped (name, reason).';

const compOf = (f) => path.basename(f.file, path.extname(f.file));
const scopeFor = (hints) => {
  if (scopeName) return `the "${scopeName}" page/frames`;
  if (!hints.length) return 'my current selection';
  const comps = [...new Set(hints.map(compOf))];
  return `these components/frames (find them by name): ${comps.join(', ')}`;
};
// Off-scale spacing has no single right answer (up or down?), so give the observation but no suggested value.
const hint = (f) => f.rule === 'layout/off-scale-spacing'
  ? `- ${compOf(f)} (${f.file}:${f.line}): ${f.message} (no single fix; report both neighbouring scale steps)`
  : `- ${compOf(f)} (${f.file}:${f.line}): ${f.message} -> ${f.fix}`;

const blocks = [];
const used = new Set();
const consider = generic ? [...CATS, ...GENERIC_EXTRA] : CATS;
for (const c of consider) {
  const hits = generic ? [] : findings.filter((f) => c.rules.includes(f.rule));
  if (!generic && !hits.length) continue;
  hits.forEach((f) => used.add(f.rule));
  const evidence = hits.length
    ? `\nHints from the code audit (use these to locate nodes; the code value is the evidence, the design system is the authority):\n${hits.map(hint).join('\n')}\n`
    : '';
  blocks.push({
    title: c.title, count: hits.length,
    text: `${guard(scopeFor(hits))}\n\nTask: ${c.task}\n${evidence}${outro(mode)}`,
  });
}

const codeOnly = {};
findings.filter((f) => !used.has(f.rule)).forEach((f) => (codeOnly[f.rule] = (codeOnly[f.rule] ?? 0) + 1));

let md = `# Figma prompts (${generic ? 'generic audit pack' : 'from code audit findings'}, mode: ${mode})\n\n`;
md += generic
  ? 'Select the frames to check in Figma, then paste each prompt into the Figma AI agent. Review its report before accepting changes.\n\n'
  : 'Paste each prompt into the Figma AI agent. Review its report before accepting changes. After design changes land, re-sync tokens (`cattlelog-token-sync`) and re-run the audit.\n\n';
if (!blocks.length) md += '_No Figma-addressable findings._\n\n';
blocks.forEach((b, i) => {
  md += `## ${i + 1}. ${b.title}${b.count ? ` (${b.count} finding${b.count > 1 ? 's' : ''})` : ''}\n\n\`\`\`text\n${b.text}\n\`\`\`\n\n`;
});
if (Object.keys(codeOnly).length) {
  md += '## Code-only findings (no Figma prompt)\n\nThese are implementation issues; fix them in the repo.\n\n';
  Object.entries(codeOnly).sort().forEach(([r, n]) => (md += `- \`${r}\` x${n}\n`));
}

const out = flag('out');
if (out) { fs.writeFileSync(out, md); console.log(`Wrote ${blocks.length} prompts to ${out}`); } else process.stdout.write(md);
