#!/usr/bin/env node
// Cattlelog token sync: keep Figma variables, tokens.json, design.md, DESIGN.md prose and (optionally)
// a CSS/Tailwind variables file in agreement. Figma is the authority.
//
//   node sync.mjs --figma=figma-vars.json            dry run: show drift, change nothing (exit 1 if drift)
//   node sync.mjs --figma=figma-vars.json --write    apply adds/changes to tokens.json + design.md (+ DESIGN.md prose)
//   node sync.mjs --check                            no Figma input: are the repo's own files consistent?
//   options: --css=path[,path]  --prune  --tokens=path --design-md=path --design-ref=path
//
// Scope: colors (all groups), spacing and rounded. Typography/shadows/motion are not Figma-synced here.
// The figma file is either {"colors":{name:hex},"spacing":{name:px},"rounded":{name:px}} or a flat
// {"Color/Primitives/blue-500":"#6DAEDF", ...} map straight from get_variable_defs (names are normalized).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COLOR_GROUPS, DEFAULT_TOKENS_PATH, hex6 } from '../../cattlelog-design-audit/scripts/lib/tokens.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(here, '../..');
const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const write = args.includes('--write');
const prune = args.includes('--prune');
const check = args.includes('--check');
const figmaPath = flag('figma');
const tokensPath = flag('tokens') ?? DEFAULT_TOKENS_PATH;
const designMdPath = flag('design-md') ?? [path.resolve(skillsDir, '../design.md'), path.resolve(skillsDir, 'cattlelog-design-skill/design.md')].find(fs.existsSync);
const designRefPath = flag('design-ref') ?? path.resolve(skillsDir, 'cattlelog-design-skill/references/DESIGN.md');
const cssPaths = (flag('css') ?? '').split(',').filter(Boolean);

if (!figmaPath && !check) { console.error('usage: sync.mjs --figma=<file.json> [--write] [--prune] [--css=a.css] | --check'); process.exit(2); }
if (!designMdPath || !fs.existsSync(designMdPath)) { console.error('sync: design.md not found; pass --design-md=path'); process.exit(2); }

const COLOR_NAME = /^(blue|gold|black|green|lime|yellow|orange|red|pink|surface|accent|ge)-[a-z0-9]+$/;
const groupOf = (n) => (n.startsWith('ge-') ? 'generalEducation' : n.startsWith('surface-') ? 'surfaces' : n.startsWith('accent-') ? 'accents' : 'primitives');
const slug = (s) => s.trim().toLowerCase().replace(/[\s_]+/g, '-');
const px = (v) => (v == null ? null : Number(String(v).replace('px', '')));

// ---------- load repo state ----------
const tokensRaw = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
const repoColors = new Map(); // name -> hex
for (const g of COLOR_GROUPS) for (const [k, v] of Object.entries(tokensRaw.colors?.[g] ?? {})) if (!k.startsWith('$') && /^#/.test(v)) repoColors.set(k, hex6(v));

const mdLines = fs.readFileSync(designMdPath, 'utf8').split('\n');
function blockRange(lines, key) {
  const s = lines.findIndex((l) => l === `${key}:`);
  if (s < 0) return null;
  let e = s + 1;
  while (e < lines.length && (/^\s/.test(lines[e]) || lines[e] === '')) e++;
  while (e > s + 1 && lines[e - 1] === '') e--;
  return [s + 1, e];
}
function readBlock(lines, key) {
  const r = blockRange(lines, key), out = new Map();
  if (!r) return out;
  for (let i = r[0]; i < r[1]; i++) {
    const m = lines[i].match(/^ {2}([\w-]+):\s*"?([^"\s]+)"?\s*$/);
    if (m) out.set(m[1], m[2]);
  }
  return out;
}
const mdColors = new Map([...readBlock(mdLines, 'colors')].map(([k, v]) => [k, hex6(v)]));
const mdSpacing = readBlock(mdLines, 'spacing');
const mdRounded = readBlock(mdLines, 'rounded');

// ---------- Figma input ----------
function loadFigma(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const out = { colors: new Map(), spacing: new Map(), rounded: new Map(), unmapped: [] };
  if (raw.colors || raw.spacing || raw.rounded) {
    for (const [k, v] of Object.entries(raw.colors ?? {})) COLOR_NAME.test(k) && /^#/.test(v) ? out.colors.set(k, hex6(v)) : out.unmapped.push(k);
    for (const [k, v] of Object.entries(raw.spacing ?? {})) out.spacing.set(k, px(v));
    for (const [k, v] of Object.entries(raw.rounded ?? {})) out.rounded.set(k, px(v));
    return out;
  }
  for (const [key, val] of Object.entries(raw)) {
    const last = slug(key.split('/').at(-1));
    const name = /gen\.?\s*-?ed/i.test(key) ? `ge-${last}` : last;
    if (typeof val === 'string' && /^#[0-9a-f]{3,8}$/i.test(val) && COLOR_NAME.test(name)) out.colors.set(name, hex6(val));
    else out.unmapped.push(key);
  }
  return out;
}
const figma = figmaPath ? loadFigma(figmaPath) : null;

// ---------- compare ----------
const drift = []; // {target, kind, name, from, to, auto}
const note = (target, kind, name, from, to, auto = true) => drift.push({ target, kind, name, from, to, auto });

function compareMaps(target, authority, actual, { autoAdd = true, norm = (x) => x } = {}) {
  for (const [k, v] of authority) {
    if (!actual.has(k)) note(target, 'added', k, null, v, autoAdd);
    else if (norm(actual.get(k)) !== norm(v)) note(target, 'changed', k, actual.get(k), v);
  }
  for (const k of actual.keys()) if (!authority.has(k)) note(target, 'removed', k, actual.get(k), null, false);
}

// CSS files (--css): `--blue-500: #hex` or Tailwind v4 `--color-blue-500: #hex`
const cssFiles = cssPaths.map((p) => {
  const text = fs.readFileSync(p, 'utf8');
  const vars = new Map();
  for (const m of text.matchAll(/--(?:color-)?([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\b/g)) if (COLOR_NAME.test(m[1])) vars.set(m[1], hex6(m[2]));
  return { p, text, vars };
});

// DESIGN.md prose: `name` `#HEX` (also inside table rows `| \`ge-ah\` | \`#E11D48\` |`)
const refText = fs.existsSync(designRefPath) ? fs.readFileSync(designRefPath, 'utf8') : '';
const PROSE = /`([a-z]+-[a-z0-9]+)`(\s*\|?\s*)`(#[0-9a-fA-F]{6})`/g;
const proseFound = new Map();
for (const m of refText.matchAll(PROSE)) if (COLOR_NAME.test(m[1])) proseFound.set(m[1], hex6(m[3]));

if (figma) {
  compareMaps('tokens.json', figma.colors, repoColors);
  compareMaps('design.md colors', figma.colors, mdColors);
  cssFiles.forEach((c) => compareMaps(`css ${path.relative(process.cwd(), c.p)}`, figma.colors, c.vars, { autoAdd: false }));
  // prose is only checked for tokens it mentions; it is not a full listing
  for (const [k, v] of proseFound) if (figma.colors.has(k) && figma.colors.get(k) !== v) note('DESIGN.md prose', 'changed', k, v, figma.colors.get(k));
  if (figma.spacing.size) {
    compareMaps('design.md spacing', figma.spacing, new Map([...mdSpacing].filter(([k]) => k !== 'base').map(([k, v]) => [k, px(v)])));
    const want = [...new Set(figma.spacing.values())].sort((a, b) => a - b);
    if (JSON.stringify(want) !== JSON.stringify(tokensRaw.spacing)) note('tokens.json spacing', 'changed', 'scale', tokensRaw.spacing?.join(','), want.join(','));
  }
  if (figma.rounded.size) compareMaps('design.md rounded', figma.rounded, new Map([...mdRounded].map(([k, v]) => [k, px(v)])));
} else {
  // --check: the repo's own files must agree with each other (tokens.json is the reference)
  compareMaps('design.md colors', repoColors, mdColors);
  cssFiles.forEach((c) => compareMaps(`css ${path.relative(process.cwd(), c.p)}`, repoColors, c.vars, { autoAdd: false }));
  for (const [k, v] of proseFound) if (repoColors.has(k) && repoColors.get(k) !== v) note('DESIGN.md prose', 'changed', k, v, repoColors.get(k));
}

// ---------- report ----------
const guardPrune = figma && prune && figma.colors.size < repoColors.size * 0.8;
const actionable = drift.filter((d) => d.kind !== 'removed' || (prune && !guardPrune && d.target.match(/tokens\.json|design\.md/)));
const label = { added: '+', changed: '~', removed: '-' };
for (const t of [...new Set(drift.map((d) => d.target))]) {
  console.log(`\n${t}`);
  for (const d of drift.filter((x) => x.target === t))
    console.log(`  ${label[d.kind]} ${d.name}: ${d.kind === 'added' ? d.to : d.kind === 'removed' ? `${d.from} (not in ${figma ? 'Figma' : 'reference'}${prune ? '' : '; kept, use --prune to remove'})` : `${d.from} -> ${d.to}`}${d.auto ? '' : '  [report only]'}`);
}
if (figma?.unmapped.length) console.log(`\nIgnored ${figma.unmapped.length} Figma entries that don't map to a color/spacing/rounded token:\n  ${figma.unmapped.slice(0, 15).join(', ')}${figma.unmapped.length > 15 ? ', ...' : ''}`);
if (guardPrune) console.log('\n! --prune refused: the Figma file has <80% of the repo tokens, so it looks like a partial export.');
console.log(`\n${drift.length ? `${drift.length} drift item(s)` : 'In sync'}${figma ? ` against ${path.basename(figmaPath)}` : ' (internal consistency)'}.`);

// ---------- write ----------
if (write && figma) {
  // tokens.json
  for (const d of actionable.filter((x) => x.target === 'tokens.json')) {
    const g = groupOf(d.name);
    tokensRaw.colors[g] ??= {};
    if (d.kind === 'removed') {
      for (const gg of COLOR_GROUPS) delete tokensRaw.colors[gg]?.[d.name];
    } else tokensRaw.colors[g][d.name] = d.to;
  }
  if (figma.spacing.size) tokensRaw.spacing = [...new Set(figma.spacing.values())].sort((a, b) => a - b);
  fs.writeFileSync(tokensPath, JSON.stringify(tokensRaw, null, 2) + '\n');

  // design.md blocks (edit lines in place; append new ones at the end of the block)
  const setBlock = (key, entries, fmt, removed = []) => {
    for (const [name, val] of entries) {
      const r = blockRange(mdLines, key);
      const idx = mdLines.findIndex((l, i) => i >= r[0] && i < r[1] && l.startsWith(`  ${name}:`));
      if (idx >= 0) mdLines[idx] = `  ${name}: ${fmt(val)}`; else mdLines.splice(r[1], 0, `  ${name}: ${fmt(val)}`);
    }
    for (const name of removed) {
      const r = blockRange(mdLines, key);
      const idx = mdLines.findIndex((l, i) => i >= r[0] && i < r[1] && l.startsWith(`  ${name}:`));
      if (idx >= 0) mdLines.splice(idx, 1);
    }
  };
  const pick = (target, kinds) => actionable.filter((d) => d.target === target && kinds.includes(d.kind));
  setBlock('colors', pick('design.md colors', ['added', 'changed']).map((d) => [d.name, d.to]), (v) => `"${v}"`, pick('design.md colors', ['removed']).map((d) => d.name));
  setBlock('spacing', pick('design.md spacing', ['added', 'changed']).map((d) => [d.name, d.to]), (v) => `${v}px`);
  setBlock('rounded', pick('design.md rounded', ['added', 'changed']).map((d) => [d.name, d.to]), (v) => `${v}px`);
  fs.writeFileSync(designMdPath, mdLines.join('\n'));

  // DESIGN.md prose: rewrite the stale hex that follows a token name, exact pattern only
  const prose = actionable.filter((d) => d.target === 'DESIGN.md prose');
  if (prose.length) {
    const want = new Map(prose.map((d) => [d.name, d.to]));
    fs.writeFileSync(designRefPath, refText.replace(PROSE, (m, name, sep) => (want.has(name) ? `\`${name}\`${sep}\`${want.get(name)}\`` : m)));
  }
  console.log('\nWrote tokens.json, design.md' + (prose.length ? ', DESIGN.md prose' : '') + '. CSS files are never auto-edited: update them from the report above.');
  console.log('Next: `git diff`, then run the design audit to catch code still using old values.');
} else if (drift.length && figma) console.log('Dry run only. Re-run with --write to apply (CSS and removals are report-only).');

process.exit(drift.length ? 1 : 0);
