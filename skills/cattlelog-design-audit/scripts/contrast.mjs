#!/usr/bin/env node
// WCAG contrast checker for Cattlelog tokens.
//
//   node contrast.mjs <fg> <bg>                 one pair (token names or #hex)
//   node contrast.mjs --matrix <fgPrefix> <bgPrefix> [--min=4.5]
//                                               every fg-* on every bg-*, e.g. `--matrix black blue`
//   node contrast.mjs --documented              the pairings DESIGN.md prescribes (exit 1 on any FAIL)
//
// Thresholds: 4.5:1 normal text, 3:1 large text (24px, or 18.66px bold) and UI/icons.
import { loadTokens, hex6, DEFAULT_TOKENS_PATH } from './lib/tokens.mjs';
import { ratio, verdict } from './lib/contrast.mjs';

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split('=')[1];
const pos = args.filter((a) => !a.startsWith('--'));
const T = loadTokens(flag('tokens') ?? DEFAULT_TOKENS_PATH);

function resolve(x) {
  if (/^#[0-9a-f]{3,8}$/i.test(x)) return hex6(x);
  const h = T.nameToHex.get(x);
  if (!h) { console.error(`contrast: unknown token "${x}"`); process.exit(2); }
  return h;
}
const row = (fg, bg) => {
  const r = ratio(resolve(fg), resolve(bg));
  return { fg, bg, r, v: verdict(r) };
};
const show = ({ fg, bg, r, v }) => console.log(`${fg.padEnd(14)} on ${bg.padEnd(14)} ${r.toFixed(2).padStart(6)}:1  ${v}`);

if (args.includes('--documented')) {
  // [fg, bg, note] pairings stated in DESIGN.md Section 1, 7, 8, 11.
  const pairs = [
    ['black-1000', 'blue-50', 'primary text on page'],
    ['black-1000', 'black-0', 'primary text on card'],
    ['black-600', 'black-0', 'secondary text (lightest allowed for copy)'],
    ['black-600', 'blue-50', 'secondary text on page'],
    ['black-0', 'blue-700', 'primary button'],
    ['black-0', 'blue-800', 'brand chrome / primary hover'],
    ['black-0', 'blue-900', 'primary active'],
    ['blue-700', 'black-0', 'secondary button / links'],
    ['blue-800', 'black-0', 'link hover'],
    ['black-400', 'black-200', 'disabled button (exempt: disabled)'],
    ['red-500', 'black-0', 'red indicator/icon on white (design rule: never text)'],
    ['green-500', 'black-0', 'green indicator/icon on white (design rule: never text)'],
    ['black-0', 'red-500', 'rating badge score on red'],
    ['black-1000', 'yellow-500', 'text on yellow-500'],
    ['black-1000', 'orange-500', 'text on orange-500'],
    ['black-1000', 'lime-500', 'text on lime-500'],
    ['black-0', 'green-500', 'rating badge score on green'],
    ['black-0', 'black-900', 'tooltip'],
  ];
  for (let n = 1; n <= 10; n++)
    if (T.nameToHex.has(`surface-${n}`) && T.nameToHex.has(`accent-${n}`))
      pairs.push([`accent-${n}`, `surface-${n}`, 'chip / legend pair']);
  let fails = 0;
  for (const [fg, bg, note] of pairs) {
    const x = row(fg, bg);
    const exempt = /exempt/.test(note);
    if (x.v === 'FAIL' && !exempt) fails++;
    console.log(`${x.v === 'FAIL' && !exempt ? 'x' : ' '} ${fg.padEnd(12)} on ${bg.padEnd(12)} ${x.r.toFixed(2).padStart(6)}:1  ${x.v.padEnd(18)} ${note}`);
  }
  console.log(`\n${pairs.length} documented pairs checked, ${fails} fail 3:1. Pairs under 4.5:1 are for large text/UI only.`);
  process.exit(fails ? 1 : 0);
}

if (args.includes('--matrix')) {
  const [fp, bp] = pos;
  const min = Number(flag('min') ?? 0);
  if (!fp || !bp) { console.error('usage: contrast.mjs --matrix <fgPrefix> <bgPrefix> [--min=4.5]'); process.exit(2); }
  const names = [...T.nameToHex.keys()];
  const fgs = names.filter((n) => n.startsWith(fp)), bgs = names.filter((n) => n.startsWith(bp));
  const rows = fgs.flatMap((f) => bgs.map((b) => row(f, b))).filter((x) => x.r >= min).sort((a, b) => b.r - a.r);
  rows.forEach(show);
  console.log(`\n${rows.length} pairs${min ? ` at or above ${min}:1` : ''}.`);
  process.exit(0);
}

if (pos.length !== 2) {
  console.error('usage: contrast.mjs <fg> <bg> | --matrix <fgPrefix> <bgPrefix> | --documented');
  process.exit(2);
}
const x = row(pos[0], pos[1]);
show(x);
process.exit(x.v === 'FAIL' ? 1 : 0);
