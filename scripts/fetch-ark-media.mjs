/**
 * Download Supabase Ark: Survival Ascended assets → public PNGs and blog covers.
 * URLs mirror src/config/media.ts ARK_MEDIA_URLS (keep in sync).
 * Run: node scripts/fetch-ark-media.mjs && node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

/** @type {readonly string[]} */
const ARK_MEDIA_SOURCES = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852570326-tbem7u-ark-img1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852559334-gep7dc-ark-img-4.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852546453-nlklqv-ark-img-3.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736837817-eseqbq-arkascendedwalls-thumb-webp-87d2c3faf249975aae2e59773b657d25.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736831740-u4az35-moonlit-dinosaur-base-hud.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736795808-prsvti-humanoid-runner-in-annotated-island-jungle.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736759165-qwadin-tropical-dino-tracked-forest-cove.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736751614-e7yjp6-images-1.webp',
];

const GAMEPLAY_MAP = [
  ['ark-map-hack.png', 6],
  ['ark-player-esp.png', 5],
  ['ark-scripts-combo.png', 0],
  ['ark-zoom-hack.png', 1],
  ['ark-skin-changer.png', 2],
  ['ark-loot-highlight.png', 3],
  ['ark-loot-assist.png', 4],
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

const arkDir = path.join(root, 'public/images/ark');
const gameplayDir = path.join(root, 'public/images/gameplay');
const productDir = path.join(root, 'public/images/product');
const blogDir = path.join(root, 'public/images/blog');

for (const dir of [arkDir, gameplayDir, productDir, blogDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const buffers = [];
for (let i = 0; i < ARK_MEDIA_SOURCES.length; i++) {
  const url = ARK_MEDIA_SOURCES[i];
  const file = `ark-screenshot-${i + 1}.png`;
  console.log('Downloading', file);
  const buf = await downloadBuffer(url);
  buffers.push(buf);
  await writeCoverPng(buf, path.join(arkDir, file));
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

console.log('Ark: Survival Ascended media import complete.');