/**
 * Download Supabase Escape from Tarkov assets → public PNGs, blog covers, hero video.
 * Run: node scripts/fetch-tarkov-media.mjs && node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const TARKOV_IMAGES = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/17b9a1bf-b085-4c30-aa99-c77f87181cc5/1794657911814-dba7kv-gritty-scoped-industrial-corridor.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650317179-029shn-images-4.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650297199-l2nifr-images-1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650282570-d0xc5g-first-person-warehouse-esp-encounter.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/17b9a1bf-b085-4c30-aa99-c77f87181cc5/1794424763252-8qceyr-tactical-warehouse-sightline.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/1242b160-0414-44df-95cc-e45319c48f50/1793307655446-h9o00o-screenshot-7.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/1242b160-0414-44df-95cc-e45319c48f50/1793307645544-ubqn4k-screenshot-6.webp',
];

const HERO_VIDEO_URL =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/ab1988f6-6996-419f-9473-af87100f8454/1793263670273-v320nr-escape-from-sarkov-high-quality.mp4';

const GAMEPLAY_MAP = [
  ['tarkov-map-hack.png', 6],
  ['tarkov-player-esp.png', 5],
  ['tarkov-scripts-combo.png', 0],
  ['tarkov-zoom-hack.png', 1],
  ['tarkov-skin-changer.png', 2],
  ['tarkov-loot-highlight.png', 3],
  ['tarkov-loot-assist.png', 4],
];

const PRODUCT_MAP = [
  ['awareness.png', 5],
  ['combat.png', 0],
  ['world.png', 6],
];

const BLOG_FILES = [
  'cheat-codes.png',
  'console-tips.png',
  'use-codes.png',
  'features.png',
  'console-cmds.png',
  'lite-vs-pro.png',
  'elite.png',
  'aimbot.png',
  'esp.png',
  'fov.png',
  'skins.png',
  'be-patch.png',
  'hwid.png',
  'buy-guide.png',
  'bones.png',
  'be-error.png',
  'external.png',
  'stream-proof.png',
];

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function writeCoverPng(buffer, destPath) {
  await sharp(buffer)
    .resize({ width: 1600, height: 900, fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 8, effort: 7 })
    .toFile(destPath);
}

const tarkovDir = path.join(root, 'public/images/tarkov');
const gameplayDir = path.join(root, 'public/images/gameplay');
const productDir = path.join(root, 'public/images/product');
const blogDir = path.join(root, 'public/images/blog');
const videoDir = path.join(root, 'public/videos');

for (const dir of [tarkovDir, gameplayDir, productDir, blogDir, videoDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const buffers = [];
for (let i = 0; i < TARKOV_IMAGES.length; i++) {
  const url = TARKOV_IMAGES[i];
  const file = `tarkov-screenshot-${i + 1}.png`;
  console.log('Downloading', file);
  const buf = await downloadBuffer(url);
  buffers.push(buf);
  await writeCoverPng(buf, path.join(tarkovDir, file));
}

for (const [outName, srcIndex] of GAMEPLAY_MAP) {
  await writeCoverPng(buffers[srcIndex], path.join(gameplayDir, outName));
  console.log('Gameplay', outName);
}

for (const [outName, srcIndex] of PRODUCT_MAP) {
  await writeCoverPng(buffers[srcIndex], path.join(productDir, outName));
  console.log('Product', outName);
}

for (let i = 0; i < BLOG_FILES.length; i++) {
  const srcIndex = i % buffers.length;
  if (BLOG_FILES[i] === 'bones.png' && fs.existsSync(path.join(blogDir, 'bones.png'))) {
    console.log('Blog skip (manual)', BLOG_FILES[i]);
    continue;
  }
  await writeCoverPng(buffers[srcIndex], path.join(blogDir, BLOG_FILES[i]));
  console.log('Blog', BLOG_FILES[i]);
}

console.log('Downloading hero video…');
const videoBuf = await downloadBuffer(HERO_VIDEO_URL);
const videoPath = path.join(videoDir, 'tarkov-hero.mp4');
fs.writeFileSync(videoPath, videoBuf);
console.log('Wrote', path.relative(root, videoPath));

const posterPath = path.join(videoDir, 'tarkov-hero-poster.jpg');
await sharp(buffers[5])
  .resize({ width: 1280, height: 800, fit: 'cover', position: 'centre' })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(posterPath);
console.log('Wrote', path.relative(root, posterPath));

console.log('Tarkov media import complete.');