#!/usr/bin/env node
// Cattlelog audit-fix, code track. Applies ONLY unambiguous, mechanical fixes.
// Anything that needs a design decision is left alone and reported by the follow-up audit.
//
//   node fix.mjs <paths...>                  dry run: print the diff, change nothing
//   node fix.mjs <paths...> --write          apply, then re-run the audit on the same paths
//   options: --only=rule,rule  --remaining=out.json  --force  --tokens=path
//
// Fixable rules (all exact matches only; nothing is rounded or guessed):
//   color/raw-hex             `bg-[#6DAEDF]` -> `bg-blue-500`; in .css/.scss `#6DAEDF` -> `var(--blue-500)`
//   layout/arbitrary-spacing  `p-[16px]` / `gap-[1.5rem]` -> `p-4` / `gap-6` (only values on the scale)
//   a11y/focus-ring-removed   `outline-none` -> adds the :focus-visible gold ring
//   a11y/dialog-aria-modal    `role="dialog"` -> adds `aria-modal="true"`
//   theme/dark-mode           removes `dark:*` classes (the app is light-only)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { loadTokens, hex6, DEFAULT_TOKENS_PATH } from '../../cattlelog-design-audit/scripts/lib/tokens.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = path.resolve(here, '../../cattlelog-design-audit/scripts/audit.mjs');

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split('=')[1];
const write = args.includes('--write');
const force = args.includes('--force');
const only = flag('only')?.split(',');
const tokensPath = flag('tokens') ?? DEFAULT_TOKENS_PATH;
const targets = args.filter((a) => !a.startsWith('--'));
if (!targets.length) { console.error('usage: fix.mjs <paths...> [--write] [--only=rule,..] [--remaining=out.json]'); process.exit(2); }

const T = loadTokens(tokensPath);
const EXTS = new Set(['.css', '.scss', '.html', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.mdx']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage', '.turbo', 'fixtures', '.claude']);
const TOKEN_FILE = /(^|[\\/])(tailwind\.config\.[cm]?[jt]s|tokens?\.(css|scss|[cm]?[jt]s))$/i;
const PX_TO_TW = { 0: '0', 4: '1', 8: '2', 12: '3', 16: '4', 24: '6', 32: '8', 40: '10', 64: '16', 96: '24' };
const SPACING = 'p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me|gap|gap-x|gap-y|space-x|space-y';
const COLOR_UTIL = 'bg|text|border|ring|outline|fill|stroke|from|to|via|divide|decoration|caret|accent|placeholder|shadow';

const on = (rule) => !only || only.includes(rule);

/** Returns the fixed line and the list of rules that fired. */
function fixLine(ln, ctx) {
  const rules = [];
  let out = ln;
  const apply = (rule, re, fn) => {
    if (!on(rule)) return;
    const next = out.replace(re, (...m) => fn(...m) ?? m[0]);
    if (next !== out) { out = next; rules.push(rule); }
  };

  if (!ctx.isTokenFile) {
    // Tailwind arbitrary hex -> token utility (exact match only)
    apply('color/raw-hex', new RegExp(`(?<![\\w-])(${COLOR_UTIL})-\\[#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\]`, 'g'), (m, util, hx) => {
      const tok = T.hexToToken.get(hex6('#' + hx));
      return tok ? `${util}-${tok}` : null;
    });
    // CSS/SCSS hex -> var(--token) (skip token definitions and url())
    if (ctx.isStyle && !/^\s*--[\w-]+\s*:/.test(ln) && !/url\(/.test(ln))
      apply('color/raw-hex', /(?<![\w&#-])#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g, (m, hx, offset, str) => {
        // Never rewrite a custom-property definition (`--blue-500: #6DAEDF`), even mid-line: it would self-reference.
        const before = str.slice(0, offset);
        const decl = before.slice(Math.max(before.lastIndexOf(';'), before.lastIndexOf('{')) + 1);
        if (/^\s*--[\w-]+\s*:/.test(decl)) return null;
        const tok = T.hexToToken.get(hex6('#' + hx));
        return tok ? `var(--${tok})` : null;
      });
  }

  apply('layout/arbitrary-spacing', new RegExp(`(?<![\\w-])(-?)(${SPACING})-\\[(\\d+(?:\\.\\d+)?)(px|rem)\\]`, 'g'), (m, neg, prop, n, unit) => {
    const px = unit === 'rem' ? Number(n) * 16 : Number(n);
    const tw = PX_TO_TW[px];
    return tw === undefined ? null : `${neg}${prop}-${tw}`;
  });

  if (!/focus-visible|ring-/.test(out) && ctx.isMarkup)
    apply('a11y/focus-ring-removed', /(?<![\w-])outline-none(?![\w-])/g,
      () => 'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500');

  if (ctx.isMarkup && /role=["']dialog["']/.test(out) && !ctx.hasAriaModal)
    apply('a11y/dialog-aria-modal', /role=(["'])dialog\1/, (m) => `${m} aria-modal="true"`);

  if (ctx.isMarkup)
    apply('theme/dark-mode', /(?<=[\s"'`])dark:[^\s"'`]+\s?/g, () => '');

  return { out, rules };
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

const isDirty = (file) => {
  try {
    return execFileSync('git', ['status', '--porcelain', '--', path.basename(file)], { cwd: path.dirname(path.resolve(file)), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim().length > 0;
  } catch { return false; } // not a git repo / git missing
};

// ---------- run ----------
const tally = {};
let changedFiles = 0, skippedDirty = 0;
for (const file of files) {
  const rel = path.relative(process.cwd(), file) || file;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const isStyle = /\.(css|scss)$/.test(file);
  const ctx0 = { isStyle, isMarkup: !isStyle, isTokenFile: TOKEN_FILE.test(file) };
  const next = [...lines];
  const diffs = [];

  lines.forEach((ln, i) => {
    if (/audit-ignore(?!-next)/.test(ln) || (i > 0 && /audit-ignore-next-line/.test(lines[i - 1]))) return;
    if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(ln)) return;
    const around = lines.slice(Math.max(0, i - 4), i + 6).join(' ');
    const { out, rules } = fixLine(ln, { ...ctx0, hasAriaModal: /aria-modal/.test(around) });
    if (out !== ln) {
      next[i] = out;
      rules.forEach((r) => (tally[r] = (tally[r] ?? 0) + 1));
      diffs.push({ line: i + 1, rules, from: ln, to: out });
    }
  });

  if (!diffs.length) continue;
  changedFiles++;
  for (const d of diffs) console.log(`${rel}:${d.line}  ${d.rules.join(', ')}\n  - ${d.from.trim()}\n  + ${d.to.trim()}`);
  if (write) {
    if (isDirty(file) && !force) { skippedDirty++; console.log(`  ! ${rel} has uncommitted changes; skipped (commit/stash first, or pass --force)`); continue; }
    fs.writeFileSync(file, next.join('\n'));
  }
}

const total = Object.values(tally).reduce((a, b) => a + b, 0);
console.log(`\n${write ? 'Applied' : 'Would apply'} ${total} line fixes in ${changedFiles} files` +
  (Object.keys(tally).length ? ': ' + Object.entries(tally).map(([r, n]) => `${r} x${n}`).join(', ') : '.'));
if (skippedDirty) console.log(`${skippedDirty} file(s) skipped because they had uncommitted changes.`);
if (!write && total) console.log('Dry run only. Re-run with --write to apply.');

// ---------- follow-up audit: what still needs a human / Figma ----------
if (write) {
  const r = spawnSync('node', [AUDIT, ...targets, '--json', `--tokens=${tokensPath}`], { encoding: 'utf8' });
  try {
    const rep = JSON.parse(r.stdout);
    const byRule = {};
    rep.findings.forEach((f) => (byRule[f.rule] = (byRule[f.rule] ?? 0) + 1));
    console.log(`\nRemaining after fix: ${rep.counts.error} errors, ${rep.counts.warn} warnings, ${rep.counts.review} to review.`);
    Object.entries(byRule).forEach(([k, n]) => console.log(`  ${k} x${n}`));
    const out = flag('remaining');
    if (out) { fs.writeFileSync(out, JSON.stringify(rep, null, 2)); console.log(`Saved remaining findings to ${out} (feed to figma-prompts.mjs).`); }
  } catch { console.log('Could not parse follow-up audit output.'); }
}
