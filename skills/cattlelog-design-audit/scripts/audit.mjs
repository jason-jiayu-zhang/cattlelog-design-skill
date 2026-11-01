#!/usr/bin/env node
// Cattlelog design audit: deterministic, dependency-free checks.
// Rules mirror skills/cattlelog-design-skill (SKILL.md "Mandatory Rules" + references/DESIGN.md).
// Colors and motion durations come from the design skill's resources/tokens.json.
//
// Usage: node audit.mjs [paths...] [--json] [--min-severity=error|warn|review] [--tokens=path]
// Exit code: 1 if any `error` findings, else 0.
// Suppress: add `audit-ignore` on the line, or `audit-ignore-next-line` on the line above.

import fs from 'node:fs';
import path from 'node:path';
import { loadTokens, nearestToken, hex6, DEFAULT_TOKENS_PATH } from './lib/tokens.mjs';
import { ratio } from './lib/contrast.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split('=')[1];
const asJson = args.includes('--json');
const minSev = flag('min-severity') ?? 'review';
const tokensPath = flag('tokens') ?? DEFAULT_TOKENS_PATH;
const targets = args.filter((a) => !a.startsWith('--'));
if (!targets.length) targets.push('.');

const SEV = { error: 3, warn: 2, review: 1 };
const EXTS = new Set(['.css', '.scss', '.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.mdx']);
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', '.turbo', 'fixtures', '.claude',
]);
// Files that legitimately define raw token values.
const TOKEN_FILE = /(^|[\\/])(tailwind\.config\.[cm]?[jt]s|tokens?\.(css|scss|[cm]?[jt]s))$/i;

let T;
try { T = loadTokens(tokensPath); } catch (e) {
  console.error(`audit: cannot read tokens at ${tokensPath}: ${e.message}`);
  process.exit(2);
}
const { hexToToken, nameToHex, tokenNames, durations } = T;

// ---------- rule data ----------
const SPACING_OK = new Set(['0', '1', '2', '3', '4', '6', '8', '10', '16', '24']); // 4..96px
const Z_OK = new Set([-10, 0, 10, 100, 200, 300, 400, 500, 600]);
const NON_BRAND_HUES = 'slate|gray|zinc|neutral|stone|amber|emerald|teal|sky|indigo|violet|purple|fuchsia|rose|cyan';
const COLOR_UTIL = 'bg|text|border|ring|outline|fill|stroke|from|to|via|divide|placeholder|accent|caret|decoration|shadow';
const LAYOUT_PROPS = 'width|height|top|left|right|bottom|margin|padding|inset|max-height|min-height';
const NAMES_RE = [...tokenNames].sort((a, b) => b.length - a.length).join('|');
const BG_RE = new RegExp(`(?<![\\w:-])bg-(${NAMES_RE})(?![\\w/-])`, 'g');
const TEXT_RE = new RegExp(`(?<![\\w:-])text-(${NAMES_RE})(?![\\w/-])`, 'g');
const LARGE_TEXT = /(?<![\w:-])text-(xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b|heading|h1|h2|h3/;
const MOTION_USE = /transition|animation|@keyframes|animate-|framer-motion|motion\./;
const REDUCED = /prefers-reduced-motion|motion-reduce:|motion-safe:|useReducedMotion|reducedMotion/;

const findings = [];
function add(file, line, severity, rule, message, fix) {
  findings.push({ file, line, severity, rule, message, fix });
}
const fmtMs = (n) => `${Math.round(n * 100) / 100}ms`;
const allowedMs = [...durations].sort((a, b) => a - b).join('/');

// ---------- per-file checks ----------
function auditFile(file, text) {
  const lines = text.split('\n');
  const isToken = TOKEN_FILE.test(file);
  const isStyle = /\.(css|scss)$/.test(file);
  const ignored = (i) => /audit-ignore(?!-next)/.test(lines[i]) || (i > 0 && /audit-ignore-next-line/.test(lines[i - 1]));

  lines.forEach((ln, i) => {
    if (ignored(i)) return;
    if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(ln)) return; // comment-only line
    const L = i + 1;

    // ---- color/raw-hex (skip token-definition files)
    if (!isToken) {
      for (const m of ln.matchAll(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g)) {
        if (/^\s*(\/\/|\*|\/\*)/.test(ln) && !/[:=]/.test(ln)) continue; // pure comment
        const prev = ln[m.index - 1];
        if (prev && /[\w&]/.test(prev)) continue; // anchors / HTML entities
        // Defining a token as a CSS custom property (`--blue-500: #6DAEDF`) is where raw hex belongs.
        const def = ln.slice(0, m.index).match(/(?:^|[;{])\s*--([\w-]+)\s*:\s*$/);
        if (def && tokenNames.has(def[1])) continue;
        const h = hex6('#' + m[1]);
        const exact = hexToToken.get(h);
        add(file, L, 'error', 'color/raw-hex', `Raw hex ${m[0]}.`,
          exact ? `Use token \`${exact}\`.` : `No exact token; nearest is \`${nearestToken(T, h)}\`. Confirm with design before adding colors.`);
      }
      if (/\b(rgba?|hsla?)\(/.test(ln) && !/var\(/.test(ln))
        add(file, L, 'warn', 'color/raw-function', 'Raw rgb()/hsl() color.', 'Use a Cattlelog token (shadows: use shadow-subtle/fair/strong).');
    }

    // ---- color/off-palette-tailwind
    for (const m of ln.matchAll(new RegExp(`(?<![\\w-])(${COLOR_UTIL})-(${NON_BRAND_HUES})-(\\d{2,3})\\b`, 'g')))
      add(file, L, 'error', 'color/off-palette', `Default Tailwind color \`${m[0]}\` is not a Cattlelog token.`, 'Use a token from design.md (e.g. black-*, blue-*, gold-*, surface-*).');
    for (const m of ln.matchAll(new RegExp(`(?<![\\w-])(${COLOR_UTIL})-(blue|gold|black|green|lime|yellow|orange|red|pink)-(\\d{2,4})\\b`, 'g'))) {
      const name = `${m[2]}-${m[3]}`;
      if (!tokenNames.has(name))
        add(file, L, 'error', 'color/unknown-shade', `\`${m[0]}\`: shade ${name} is not in the Cattlelog scale.`, 'Pick an existing shade from design.md.');
    }

    // ---- theme/dark-mode
    if (/(?<![\w-])dark:/.test(ln) || /prefers-color-scheme:\s*dark/.test(ln) || /data-theme\s*=\s*["']?dark/.test(ln))
      add(file, L, 'error', 'theme/dark-mode', 'Dark-mode styling. Cattlelog is light-mode only.', 'Remove the dark variant / theme toggle.');

    // ---- layout/spacing
    for (const m of ln.matchAll(/(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-\[[^\]]+\]/g))
      add(file, L, 'error', 'layout/arbitrary-spacing', `Arbitrary spacing \`${m[0]}\`.`, 'Use the 4/8/12/16/24/32/40/64/96 scale (e.g. p-4, gap-6).');
    for (const m of ln.matchAll(/(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y)-(\d+(?:\.\d+)?)(?![\w.\[-])/g))
      if (!SPACING_OK.has(m[1]))
        add(file, L, 'warn', 'layout/off-scale-spacing', `\`${m[0]}\` is ${Number(m[1]) * 4}px, off the spacing scale.`, 'Round to 4, 8, 12, 16, 24, 32, 40, 64 or 96px (Tailwind 1,2,3,4,6,8,10,16,24).');
    if (isStyle || /style=|css`|styled\./.test(ln))
      for (const m of ln.matchAll(/\b(?:padding|margin|gap)(?:-\w+)?\s*:\s*(\d+)px/g))
        if (![0, 4, 8, 12, 16, 24, 32, 40, 64, 96].includes(Number(m[1])))
          add(file, L, 'warn', 'layout/off-scale-spacing', `${m[0]} is off the spacing scale.`, 'Use 4/8/12/16/24/32/40/64/96px.');

    // ---- typography
    for (const m of ln.matchAll(/(?<![\w-])(text-\[[\d.]+(?:px|rem|em)\]|tracking-\[[^\]]+\]|leading-\[[^\]]+\])/g))
      add(file, L, 'error', 'type/arbitrary', `Arbitrary type value \`${m[1]}\`.`, 'Use the Figtree scale (Heading 1 through Subtext); no custom letter-spacing.');
    if (/letter-spacing\s*:/.test(ln) && !/letter-spacing\s*:\s*(0|normal)\b/.test(ln))
      add(file, L, 'warn', 'type/letter-spacing', 'Custom letter-spacing.', 'Remove; the type scale defines spacing.');
    if (/font-family\s*:/.test(ln) && !/figtree|inherit|var\(/i.test(ln))
      add(file, L, 'warn', 'type/font-family', 'Font family other than Figtree.', 'Use Figtree.');

    // ---- a11y/focus
    if ((/outline-none|outline:\s*(none|0)\b/.test(ln)) && !/focus-visible|ring-/.test(ln))
      add(file, L, 'error', 'a11y/focus-ring-removed', 'Focus outline removed with no :focus-visible replacement on this line.',
        'Pair with `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500` (or a :focus-visible rule).');

    // ---- layout/z-index
    for (const m of ln.matchAll(/(?<![\w-])(-?)z-\[(-?\d+)\]|(?<![\w-])(-?)z-(\d+)\b|z-index\s*:\s*(-?\d+)/g)) {
      const n = m[2] != null ? Number(m[1] + m[2]) : m[4] != null ? Number(m[3] + m[4]) : Number(m[5]);
      if (!Z_OK.has(n))
        add(file, L, 'error', 'layout/z-index', `z-index ${n} is not on the scale.`, 'Use -10, 0, 10, 100 (dropdown), 200 (sticky nav), 300 (overlay), 400 (modal), 500 (toast), 600 (tooltip).');
    }

    // ---- a11y/dialog
    if (/role=["']dialog["']/.test(ln)) {
      const ctx = lines.slice(Math.max(0, i - 4), i + 6).join(' ');
      if (!/aria-modal/.test(ctx)) add(file, L, 'error', 'a11y/dialog-aria-modal', 'role="dialog" without aria-modal="true".', 'Add aria-modal="true".');
      if (!/aria-labelledby|aria-label=/.test(ctx)) add(file, L, 'warn', 'a11y/dialog-label', 'role="dialog" without aria-labelledby.', 'Reference the dialog title id.');
    }

    // ---- a11y/clickable-div
    if (/<(div|span|li|td)\b[^>]*\bonClick\b/.test(ln) && !/\brole=/.test(ln))
      add(file, L, 'warn', 'a11y/clickable-div', 'Non-interactive element with onClick and no role.', 'Use <button>/<a>, or add role, tabIndex and key handlers.');

    // ---- a11y/contrast (Tailwind token pairs on one line)
    if (!/disabled|placeholder/i.test(ln)) {
      const bgs = [...new Set([...ln.matchAll(BG_RE)].map((m) => m[1]))];
      const fgs = [...new Set([...ln.matchAll(TEXT_RE)].map((m) => m[1]))];
      if (bgs.length === 1 && fgs.length === 1) {
        const r = ratio(nameToHex.get(fgs[0]), nameToHex.get(bgs[0]));
        const pair = `text-${fgs[0]} on bg-${bgs[0]} = ${r.toFixed(2)}:1`;
        if (r < 3)
          add(file, L, 'error', 'a11y/contrast', `${pair} fails even the 3:1 large-text/UI minimum.`, 'Use dark text on light fills and white on dark fills (DESIGN §1). Check pairs with `contrast.mjs`.');
        else if (r < 4.5 && !LARGE_TEXT.test(ln))
          add(file, L, 'warn', 'a11y/contrast', `${pair}; below 4.5:1 for normal text.`, 'Darken the text or lighten the fill; 3:1 only applies to large text (24px, or 18.66px bold) and UI.');
      } else if (!bgs.length && fgs.length === 1) {
        const r = ratio(nameToHex.get(fgs[0]), '#FFFFFF');
        if (r < 4.5)
          add(file, L, r < 3 ? 'warn' : 'review', 'a11y/low-contrast-text',
            `text-${fgs[0]} is ${r.toFixed(2)}:1 on white (page is blue-50/white).`,
            'Readable copy needs 4.5:1 against its real background. If a parent supplies a darker fill, confirm the pair; otherwise use black-600 or darker.');
      }
    }

    // ---- motion
    if (/(?<![\w-])transition-all\b|transition\s*:\s*all\b/.test(ln))
      add(file, L, 'warn', 'motion/transition-all', '`transition: all` animates every property, including layout.',
        'Name the properties: `transition-colors`, `transition-shadow`, `transition-opacity`, `transition-transform`.');
    for (const m of ln.matchAll(/(?<![\w-])duration-\[[^\]]+\]/g))
      add(file, L, 'error', 'motion/arbitrary-duration', `Arbitrary duration \`${m[0]}\`.`, `Use a motion token: ${allowedMs}ms (duration-75/150/200/300).`);
    for (const m of ln.matchAll(/(?<![\w-])duration-(\d+)\b/g))
      if (!durations.has(Number(m[1])))
        add(file, L, 'warn', 'motion/off-scale-duration', `\`${m[0]}\` is not a motion token.`, `Use one of ${allowedMs}ms. UI feedback should be 75-300ms.`);
    if (/(?<![\w-])ease-\[|cubic-bezier\(/.test(ln))
      add(file, L, 'warn', 'motion/custom-easing', 'Custom easing curve.', 'Use ease-out (enter), ease-in (exit) or ease-in-out (color/ambient).');
    if (/(?<![\w-])animate-(bounce|ping|spin)\b/.test(ln))
      add(file, L, 'warn', 'motion/decorative-loop', 'Looping decorative animation.', 'Page loads use skeletons (`animate-pulse`), not spinners. Only skeletons and the Cory mascot loop.');
    if (new RegExp(`transition(?:-property)?\\s*:[^;]*\\b(${LAYOUT_PROPS})\\b`).test(ln) ||
        new RegExp(`(?<![\\w-])transition-\\[[^\\]]*\\b(${LAYOUT_PROPS})\\b`).test(ln))
      add(file, L, 'warn', 'motion/layout-property', 'Transition on a layout property (causes reflow and jank).', 'Animate `transform` and `opacity` only (DESIGN §14).');
    if (/\b(transition|animation)(-duration)?\s*:/.test(ln) && !/-delay/.test(ln)) {
      for (const m of ln.matchAll(/(?<![\w.#-])(\d*\.?\d+)(ms|s)\b/g)) {
        const ms = m[2] === 's' ? Number(m[1]) * 1000 : Number(m[1]);
        if (ms > 0.1 && !durations.has(ms))
          add(file, L, 'warn', 'motion/off-scale-duration', `CSS duration ${m[0]} (${fmtMs(ms)}) is not a motion token.`, `Use one of ${allowedMs}ms.`);
      }
    }
    if (/transition/.test(ln)) {
      for (const m of ln.matchAll(/\bduration\s*:\s*(\d*\.?\d+)\b/g)) {
        const ms = Number(m[1]) * 1000;
        if (Number(m[1]) <= 10 && !durations.has(ms))
          add(file, L, 'warn', 'motion/off-scale-duration', `Framer duration ${m[1]}s (${fmtMs(ms)}) is not a motion token.`, `Use one of ${allowedMs}ms (e.g. 0.2, 0.3).`);
      }
    }
  });

  // ---- img aspect-ratio: scan whole tags (may span lines)
  for (const m of text.matchAll(/<(img|Image)\b[^>]*?>/gs)) {
    const line = text.slice(0, m.index).split('\n').length;
    if (ignored(line - 1)) continue;
    if (!/aspect/i.test(m[0]))
      add(file, line, 'warn', 'layout/img-aspect-ratio', `<${m[1]}> has no aspect-ratio.`, 'Declare aspect-ratio on the image or its container (1/1 avatars, 16/9 banners). If the parent already does, add `audit-ignore`.');
  }

  // ---- overlays should portal: only flag files that clearly define an overlay
  const overlay = /role=["'](tooltip|listbox|menu)["']|\b(Tooltip|Popover|Dropdown)\b\s*(=|\()/.test(text);
  if (overlay && /\.(jsx|tsx|vue|svelte)$/.test(file) && !/createPortal|Portal\b|popover=["']|<Teleport/.test(text))
    add(file, 1, 'review', 'overlay/portal', 'Tooltip/Popover/Dropdown defined without a portal.', 'Render via createPortal to document.body (DESIGN.md Section 12).');

  // ---- focus trap: dialogs/modals should trap focus
  if (/role=["']dialog["']|\bModal\b/.test(text) && /\.(jsx|tsx|vue|svelte)$/.test(file) &&
      !/focus-trap|FocusTrap|useFocusTrap|FocusScope|FloatingFocusManager|<dialog|showModal|inert\b|@radix-ui\/react-dialog|@headlessui|react-aria/.test(text))
    add(file, 1, 'review', 'a11y/focus-trap', 'Dialog/modal with no visible focus-trap mechanism.', 'Trap focus, wrap Tab, restore focus to the trigger on close (DESIGN.md Section 3).');
}

// ---------- walk ----------
const files = [];
function walk(p) {
  let st;
  try { st = fs.statSync(p); } catch { return; }
  if (st.isDirectory()) {
    if (SKIP_DIRS.has(path.basename(p)) && !targets.some((t) => path.resolve(t) === path.resolve(p))) return;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  } else if (EXTS.has(path.extname(p))) files.push(p);
}
targets.forEach(walk);

let sawCss = false, sawGutter = false, sawMotion = false, sawReduced = false;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  if (/\.(css|scss)$/.test(f)) sawCss = true;
  if (/scrollbar-gutter\s*:\s*stable/.test(text)) sawGutter = true;
  if (MOTION_USE.test(text)) sawMotion = true;
  if (REDUCED.test(text)) sawReduced = true;
  auditFile(path.relative(process.cwd(), f) || f, text);
}
if (sawCss && !sawGutter)
  add('(project)', 0, 'warn', 'layout/scrollbar-gutter', 'No `scrollbar-gutter: stable` found in any stylesheet.',
    'Add `@supports (scrollbar-gutter: stable) { html { scrollbar-gutter: stable; } }` at the root.');
if (sawMotion && !sawReduced)
  add('(project)', 0, 'warn', 'motion/reduced-motion', 'Motion is used but no `prefers-reduced-motion` handling was found.',
    'Add the global reduced-motion block from DESIGN.md Section 4 and use `motion-reduce:` / `useReducedMotion` for movement.');

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
