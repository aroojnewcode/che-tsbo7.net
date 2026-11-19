/**
 * Strip light checkerboard / flat backgrounds from brand source PNG.
 * Usage: node scripts/prepare-brand-source.mjs [inputPath]
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const defaultSrc = path.join(root, 'public/brand/bo7-favicon-source.png');
const input = process.argv[2] || process.env.BRAND_ICON_SOURCE || defaultSrc;
const out = path.join(root, 'public/brand/bo7-favicon-source.png');

if (!existsSync(input)) {
  console.error('Missing input:', input);
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const sample = (x, y) => {
  const i = (y * width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
};

const corners = [sample(0, 0), sample(width - 1, 0), sample(0, height - 1), sample(width - 1, height - 1)];
const bg = corners
  .reduce((acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b], [0, 0, 0])
  .map((v) => Math.round(v / corners.length));

const colorDist = (r, g, b) => Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2);

const isNeutralBg = (r, g, b) => {
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const avg = (r + g + b) / 3;
  if (colorDist(r, g, b) < 42) return true;
  if (spread < 22 && avg > 165) return true;
  return false;
};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isNeutralBg(r, g, b)) data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels } }).png().toFile(out);

console.log('Wrote transparent brand source:', path.relative(root, out));