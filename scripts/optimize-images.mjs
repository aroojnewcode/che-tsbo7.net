import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const dirs = [
  'public/images/gameplay',
  'public/images/product',
  'public/images/blog',
  'public/images/bo7',
];

const force = process.env.OPTIMIZE_IMAGES === '1' || process.env.OPTIMIZE_IMAGES === 'true';

function isUpToDate(pngPath, webpPath) {
  if (!fs.existsSync(webpPath)) return false;
  if (!fs.existsSync(pngPath)) return true;
  if (force) return false;
  return fs.statSync(webpPath).mtimeMs >= fs.statSync(pngPath).mtimeMs;
}

async function optimizeDir(relativeDir) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((file) => /\.png$/i.test(file) && !/-\d+\.webp$/i.test(file));
  let wrote = 0;
  let skipped = 0;

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.png$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      if (isUpToDate(input, output)) {
        skipped += 1;
        continue;
      }
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      wrote += 1;
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }

  if (skipped > 0) {
    console.log(`Skipped ${skipped} up-to-date derivative(s) in ${relativeDir}`);
  }
}

for (const dir of dirs) {
  await optimizeDir(dir);
}

console.log('Image optimization complete.');