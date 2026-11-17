/**
 * Remove flat / dark backgrounds from navbar logo source → ark-gun.webp
 * Usage: node scripts/prepare-gun-image.mjs [inputPath]
 */
import sharp from 'sharp';
import { existsSync, renameSync, unlinkSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const defaultInput = path.join(root, 'public/images/brand/ark-gun.png');
const restoreInput = path.join(root, 'public/images/brand/ark-gun-restore.png');
const cliInput = process.argv[2];
const input = cliInput
  ? path.resolve(root, cliInput)
  : existsSync(restoreInput)
    ? restoreInput
    : defaultInput;
const outPng = path.join(root, 'public/images/brand/ark-gun.png');
const outWebp = path.join(root, 'public/images/brand/ark-gun.webp');
const tmpPng = path.join(root, 'public/images/brand/ark-gun.transparent.tmp.png');

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

const saturation = (r, g, b) => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
};

const cornerColors = [
  sample(0, 0),
  sample(width - 1, 0),
  sample(0, height - 1),
  sample(width - 1, height - 1),
];

const dist = (a, b) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);

const isBackgroundPixel = (r, g, b) => {
  const sat = saturation(r, g, b);
  const avg = (r + g + b) / 3;
  const minCorner = Math.min(...cornerColors.map((c) => dist([r, g, b], c)));

  if (sat < 0.14 && avg > 100 && avg < 250) return true;
  if (minCorner < 45) return true;
  if (sat < 0.08 && avg > 80) return true;
  if (avg < 32 && sat < 0.2) return true;
  return false;
};

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackgroundPixel(r, g, b)) data[i + 3] = 0;
  }
}

const pngBuffer = await sharp(data, { raw: { width, height, channels } })
  .trim({ threshold: 1 })
  .png()
  .toBuffer();

try {
  if (existsSync(outPng)) unlinkSync(outPng);
} catch {
  /* ignore */
}
await sharp(pngBuffer).toFile(tmpPng);
renameSync(tmpPng, outPng);
await sharp(pngBuffer).webp({ lossless: true, alphaQuality: 100 }).toFile(outWebp);

console.log('Wrote', path.relative(root, outPng));
console.log('Wrote', path.relative(root, outWebp));