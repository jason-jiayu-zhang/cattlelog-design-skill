#!/usr/bin/env node
// Cattlelog design audit: deterministic, dependency-free checks.
// Rules mirror skills/cattlelog-design-skill (SKILL.md "Mandatory Rules" + references/DESIGN.md).
// Colors come from the design skill's resources/tokens.json so nothing is duplicated here.
//
// Usage: node audit.mjs [paths...] [--json] [--min-severity=error|warn|review] [--tokens=path]
// Exit code: 1 if any `error` findings, else 0.
// Suppress: add `audit-ignore` on the line, or `audit-ignore-next-line` on the line above.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split('=')[1];
const asJson = args.includes('--json');
const minSev = flag('min-severity') ?? 'review';
const tokensPath =
  flag('tokens') ?? path.resolve(here, '../../cattlelog-design-skill/resources/tokens.json');
const targets = args.filter((a) => !a.startsWith('--'));
if (!targets.length) targets.push('.');

const SEV = { error: 3, warn: 2, review: 1 };
const EXTS = new Set(['.css', '.scss', '.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.mdx']);
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', '.turbo', 'fixtures', '.claude',
]);
// Files that legitimately define raw token values.
const TOKEN_FILE = /(^|[\\/])(tailwind\.config\.[cm]?[jt]s|tokens?\.(css|scss|[cm]?[jt]s))$/i;

// ---------- tokens ----------
const hexToToken = new Map(); // "#RRGGBB" -> token name
const tokenNames = new Set();
try {
  const t = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  for (const group of ['primitives', 'surfaces', 'accents', 'generalEducation']) {
    for (const [name, val] of Object.entries(t.colors?.[group] ?? {})) {
      if (typeof val !== 'string' || !val.startsWith('#')) continue;
      tokenNames.add(name);
      if (!hexToToken.has(val.toUpperCase())) hexToToken.set(val.toUpperCase(), name);
    }
  }
} catch (e) {
  console.error(`audit: cannot read tokens at ${tokensPath}: ${e.message}`);
  process.exit(2);
}
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function nearestToken(hex) {
  const [r, g, b] = rgb(hex);
  let best = null, bd = Infinity;
  for (const [h, n] of hexToToken) {
    const [r2, g2, b2] = rgb(h);
    const d = (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2;
    if (d < bd) { bd = d; best = n; }
  }
  return best;
}
function hex6(h) {
  h = h.toUpperCase();
  if (h.length === 4 || h.length === 5) h = '#' + [...h.slice(1, 4)].map((c) => c + c).join('');
  return h.slice(0, 7);
}

// ---------- rule data ----------
const SPACING_OK = new Set(['0', '1', '2', '3', '4', '6', '8', '10', '16', '24']); // 4..96px
const Z_OK = new Set([-10, 0, 10, 100, 200, 300, 400, 500, 600]);
const NON_BRAND_HUES = 'slate|gray|zinc|neutral|stone|amber|emerald|teal|sky|indigo|violet|purple|fuchsia|rose|cyan';
const COLOR_UTIL = 'bg|text|border|ring|outline|fill|stroke|from|to|via|divide|placeholder|accent|caret|decoration|shadow';
const BRAND_HUES = 'blue|gold|black|green|lime|yellow|orange|red|pink|surface|accent|ge';

const findings = [];
function add(file, line, severity, rule, message, fix) {
  findings.push({ file, line, severity, rule, message, fix });
}

// ---------- per-file checks ----------
function auditFile(file, text) {
  const lines = text.split('\n');
  const isToken = TOKEN_FILE.test(file);
  const isStyle = /\.(css|scss)$/.test(file);
  const ignored = (i) => /audit-ignore(?!-next)/.test(lines[i]) || (i > 0 && /audit-ignore-next-line/.test(lines[i - 1]));

  lines.forEach((ln, i) => {
    if (ignored(i)) return;
    const L = i + 1;

    // colors/raw-hex  (skip token-definition files and url()/entity-ish matches)
    if (!isToken) {
      for (const m of ln.matchAll(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g)) {
        if (/^\s*(\/\/|\*|\/\*)/.test(ln) && !/[:=]/.test(ln)) continue; // pure comment
        const prev = ln[m.index - 1];
        if (prev && /[\w&]/.test(prev)) continue; // anchors / HTML entities
        const h = hex6('#' + m[1]);
        const exact = hexToToken.get(h);
        add(file, L, 'error', 'color/raw-hex',
          `Raw hex ${m[0]}.`,
          exact ? `Use token \`${exact}\`.` : `No exact token; nearest is \`${nearestToken(h)}\`. Confirm with design before adding colors.`);
      }
      if (/\b(rgba?|hsla?)\(/.test(ln) && !/var\(/.test(ln))
        add(file, L, 'warn', 'color/raw-function', 'Raw rgb()/hsl() color.', 'Use a Cattlelog token (shadows: use shadow-subtle/fair/heavy).');
    }

    // colors/off-palette-tailwind
    for (const m of ln.matchAll(new RegExp(`(?<![\\w-])(${COLOR_UTIL})-(${NON_BRAND_HUES})-(\\d{2,3})\\b`, 'g'))) {
      add(file, L, 'error', 'color/off-palette', `Default Tailwind color \`${m[0]}\` is not a Cattlelog token.`, 'Use a token from design.md (e.g. black-*, blue-*, gold-*, surface-*).');
    }
    for (const m of ln.matchAll(new RegExp(`(?<![\\w-])(${COLOR_UTIL})-(blue|gold|black|green|lime|yellow|orange|red|pink)-(\\d{2,4})\\b`, 'g'))) {
      const name = `${m[2]}-${m[3]}`;
      if (!tokenNames.has(name))
        add(file, L, 'error', 'color/unknown-shade', `\`${m[0]}\`: shade ${name} is not in the Cattlelog scale.`, 'Pick an existing shade from design.md.');
    }

    // theme/dark-mode
    if (/(?<![\w-])dark:/.test(ln) || /prefers-color-scheme:\s*dark/.test(ln) || /data-theme\s*=\s*["']?dark/.test(ln))
      add(file, L, 'error', 'theme/dark-mode', 'Dark-mode styling. Cattlelog is light-mode only.', 'Remove the dark variant / theme toggle.');

    // layout/spacing
    for (const m of ln.matchAll(/(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-\[[^\]]+\]/g))
      add(file, L, 'error', 'layout/arbitrary-spacing', `Arbitrary spacing \`${m[0]}\`.`, 'Use the 4/8/12/16/24/32/40/64/96 scale (e.g. p-4, gap-6).');
    for (const m of ln.matchAll(/(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?![\w.\[-])/g))
      if (!SPACING_OK.has(m[1]))
        add(file, L, 'warn', 'layout/off-scale-spacing', `\`${m[0]}\` is ${Number(m[1]) * 4}px, off the spacing scale.`, 'Round to 4, 8, 12, 16, 24, 32, 40, 64 or 96px (Tailwind 1,2,3,4,6,8,10,16,24).');
    if (isStyle || /style=|css`|styled\./.test(ln))
      for (const m of ln.matchAll(/\b(?:padding|margin|gap)(?:-\w+)?\s*:\s*(\d+)px/g))
        if (![0, 4, 8, 12, 16, 24, 32, 40, 64, 96].includes(Number(m[1])))
          add(file, L, 'warn', 'layout/off-scale-spacing', `${m[0]} is off the spacing scale.`, 'Use 4/8/12/16/24/32/40/64/96px.');

    // typography
    for (const m of ln.matchAll(/(?<![\w-])(text-\[[\d.]+(?:px|rem|em)\]|tracking-\[[^\]]+\]|leading-\[[^\]]+\])/g))
      add(file, L, 'error', 'type/arbitrary', `Arbitrary type value \`${m[1]}\`.`, 'Use the Figtree scale (Heading 1 through Subtext); no custom letter-spacing.');
    if (/letter-spacing\s*:/.test(ln) && !/letter-spacing\s*:\s*(0|normal)\b/.test(ln))
      add(file, L, 'warn', 'type/letter-spacing', 'Custom letter-spacing.', 'Remove; the type scale defines spacing.');
    if (/font-family\s*:/.test(ln) && !/figtree|inherit|var\(/i.test(ln))
      add(file, L, 'warn', 'type/font-family', 'Font family other than Figtree.', 'Use Figtree.');

    // a11y/focus
    if ((/outline-none|outline:\s*(none|0)\b/.test(ln)) && !/focus-visible|ring-/.test(ln))
      add(file, L, 'error', 'a11y/focus-ring-removed', 'Focus outline removed with no :focus-visible replacement on this line.',
        'Pair with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500` (or a :focus-visible rule).');

    // layout/z-index
    for (const m of ln.matchAll(/(?<![\w-])(-?)z-\[(-?\d+)\]|(?<![\w-])(-?)z-(\d+)\b|z-index\s*:\s*(-?\d+)/g)) {
      const n = m[2] != null ? Number(m[1] + m[2]) : m[4] != null ? Number(m[3] + m[4]) : Number(m[5]);
      if (!Z_OK.has(n))
        add(file, L, 'error', 'layout/z-index', `z-index ${n} is not on the scale.`, 'Use -10, 0, 10, 100 (dropdown), 200 (sticky nav), 300 (overlay), 400 (modal), 500 (toast), 600 (tooltip).');
    }

    // a11y/dialog
    if (/role=["']dialog["']/.test(ln)) {
      const tag = ln.slice(Math.max(0, ln.lastIndexOf('<', ln.indexOf('role="dialog"') + 1)));
      const ctx = lines.slice(Math.max(0, i - 4), i + 6).join(' ');
      if (!/aria-modal/.test(ctx)) add(file, L, 'error', 'a11y/dialog-aria-modal', 'role="dialog" without aria-modal="true".', 'Add aria-modal="true".');
      if (!/aria-labelledby|aria-label=/.test(ctx)) add(file, L, 'warn', 'a11y/dialog-label', 'role="dialog" without aria-labelledby.', 'Reference the dialog title id.');
      void tag;
    }

    // a11y/clickable-div
    if (/<(div|span|li|td)\b[^>]*\bonClick\b/.test(ln) && !/\brole=/.test(ln))
      add(file, L, 'warn', 'a11y/clickable-div', 'Non-interactive element with onClick and no role.', 'Use <button>/<a>, or add role, tabIndex and key handlers.');
  });

  // img aspect-ratio: scan whole tags (may span lines)
  for (const m of text.matchAll(/<(img|Image)\b[^>]*?>/gs)) {
    const line = text.slice(0, m.index).split('\n').length;
    if (ignored(line - 1)) continue;
    if (!/aspect/i.test(m[0]))
      add(file, line, 'warn', 'layout/img-aspect-ratio', `<${m[1]}> has no aspect-ratio.`, 'Declare aspect-ratio on the image or its container (1/1 avatars, 16/9 banners). If the parent already does, add `audit-ignore`.');
  }

  // overlays should portal: only flag files that clearly define an overlay
  const overlay = /role=["'](tooltip|listbox|menu)["']|\b(Tooltip|Popover|Dropdown)\b\s*(=|\()/.test(text);
  if (overlay && /\.(jsx|tsx|vue|svelte)$/.test(file) && !/createPortal|Portal\b|popover=["']|<Teleport/.test(text))
    add(file, 1, 'review', 'overlay/portal', 'Tooltip/Popover/Dropdown defined without a portal.', 'Render via createPortal to document.body (DESIGN.md Section 12.1).');

  // focus trap: dialogs/modals should trap focus
  if (/role=["']dialog["']|\bModal\b/.test(text) && /\.(jsx|tsx|vue|svelte)$/.test(file) &&
      !/focus-trap|FocusTrap|useFocusTrap|FocusScope|<dialog|showModal|inert\b|@radix-ui\/react-dialog|@headlessui|react-aria/.test(text))
    add(file, 1, 'review', 'a11y/focus-trap', 'Dialog/modal with no visible focus-trap mechanism.', 'Trap focus, wrap Tab, restore focus to the trigger on close (DESIGN.md Section 3).');
}

// ---------- walk ----------
const files = [];
function walk(p) {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(p)) && p !== targets.find((t) => path.resolve(t) === path.resolve(p))) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  } else if (EXTS.has(path.extname(p))) files.push(p);
}
targets.forEach(walk);

let sawCss = false, sawGutter = false;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  if (/\.(css|scss)$/.test(f)) sawCss = true;
  if (/scrollbar-gutter\s*:\s*stable/.test(text)) sawGutter = true;
  auditFile(path.relative(process.cwd(), f) || f, text);
}
if (sawCss && !sawGutter)
  add('(project)', 0, 'warn', 'layout/scrollbar-gutter', 'No `scrollbar-gutter: stable` found in any stylesheet.',
    'Add `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }` at the root.');

// ---------- report ----------
const shown = findings
  .filter((f) => SEV[f.severity] >= SEV[minSev])
  .sort((a, b) => SEV[b.severity] - SEV[a.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const counts = { error: 0, warn: 0, review: 0 };
shown.forEach((f) => counts[f.severity]++);

if (asJson) {
  console.log(JSON.stringify({ filesScanned: files.length, counts, findings: shown }, null, 2));
} else {
  for (const f of shown)
    console.log(`${f.file}:${f.line}  ${f.severity.toUpperCase().padEnd(6)} ${f.rule}\n    ${f.message}\n    -> ${f.fix}`);
  console.log(`\n${files.length} files scanned: ${counts.error} errors, ${counts.warn} warnings, ${counts.review} to review manually.`);
}
process.exit(counts.error ? 1 : 0);
