/** Canonical Escape from Tarkov assets (Supabase SEO library). */
export const TARKOV_MEDIA_URLS = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/17b9a1bf-b085-4c30-aa99-c77f87181cc5/1794657911814-dba7kv-gritty-scoped-industrial-corridor.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650317179-029shn-images-4.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650297199-l2nifr-images-1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794650282570-d0xc5g-first-person-warehouse-esp-encounter.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/17b9a1bf-b085-4c30-aa99-c77f87181cc5/1794424763252-8qceyr-tactical-warehouse-sightline.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/1242b160-0414-44df-95cc-e45319c48f50/1793307655446-h9o00o-screenshot-7.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/1242b160-0414-44df-95cc-e45319c48f50/1793307645544-ubqn4k-screenshot-6.webp',
] as const;

/** Local optimized PNG bases (optional — npm run media:tarkov). */
export const TARKOV_LOCAL_IMAGES = [
  '/images/tarkov/tarkov-screenshot-1.png',
  '/images/tarkov/tarkov-screenshot-2.png',
  '/images/tarkov/tarkov-screenshot-3.png',
] as const;

export const HERO_VIDEO =
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/tarkov/ab1988f6-6996-419f-9473-af87100f8454/1793263670273-v320nr-escape-from-sarkov-high-quality.mp4';

/** Poster for hero video (also used on mobile). */
export const HERO_VIDEO_POSTER = TARKOV_MEDIA_URLS[3];

export const PRIMARY_HERO_IMAGE = '/images/gameplay/tarkov-map-hack.png';

/** Stable Supabase cover per blog slug. */
export function tarkovBlogImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const index = hash % TARKOV_MEDIA_URLS.length;
  return TARKOV_MEDIA_URLS[index]!;
}

/** @deprecated Use tarkovBlogImageForSlug */
export function tarkovCoverForSlug(slug: string): string {
  return tarkovBlogImageForSlug(slug);
}