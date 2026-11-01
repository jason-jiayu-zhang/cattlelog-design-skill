// Shared token loader for the audit, audit-fix and token-sync scripts.
// Single source of truth: skills/cattlelog-design-skill/resources/tokens.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const DEFAULT_TOKENS_PATH = path.resolve(here, '../../../cattlelog-design-skill/resources/tokens.json');
export const COLOR_GROUPS = ['primitives', 'surfaces', 'accents', 'generalEducation'];

// Fallbacks used only if tokens.json has no `motion` block.
export const DEFAULT_MOTION = {
  duration: { press: 75, fast: 150, base: 200, enter: 300, ambient: 1500 },
};

/** Normalize #RGB / #RGBA / #RRGGBB / #RRGGBBAA to upper-case #RRGGBB (alpha dropped). */
export function hex6(h) {
  h = h.toUpperCase();
  if (h.length === 4 || h.length === 5) h = '#' + [...h.slice(1, 4)].map((c) => c + c).join('');
  return h.slice(0, 7);
}

export function loadTokens(tokensPath = DEFAULT_TOKENS_PATH) {
  const raw = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  const hexToToken = new Map();
  const nameToHex = new Map();
  for (const group of COLOR_GROUPS) {
    for (const [name, val] of Object.entries(raw.colors?.[group] ?? {})) {
      if (name.startsWith('$') || typeof val !== 'string' || !val.startsWith('#')) continue;
      const h = hex6(val);
      nameToHex.set(name, h);
      if (!hexToToken.has(h)) hexToToken.set(h, name);
    }
  }
  const durations = Object.values(raw.motion?.duration ?? DEFAULT_MOTION.duration).filter(Number.isFinite);
  return { raw, hexToToken, nameToHex, tokenNames: new Set(nameToHex.keys()), durations: new Set(durations), path: tokensPath };
}

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

export function nearestToken(tokens, hex) {
  const [r, g, b] = rgb(hex6(hex));
  let best = null, bd = Infinity;
  for (const [h, n] of tokens.hexToToken) {
    const [r2, g2, b2] = rgb(h);
    const d = (r - r2) ** 2 + (g - g2) ** 2 + (b - b2) ** 2;
    if (d < bd) { bd = d; best = n; }
  }
  return best;
}
