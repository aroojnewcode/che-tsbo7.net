/** Canonical Ark: Survival Ascended assets (Supabase SEO library). */
export const ARK_MEDIA_URLS = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852570326-tbem7u-ark-img1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852559334-gep7dc-ark-img-4.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/225f6a30-6122-4c29-9cf0-e9e2b7459c9b/1794852546453-nlklqv-ark-img-3.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736837817-eseqbq-arkascendedwalls-thumb-webp-87d2c3faf249975aae2e59773b657d25.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736831740-u4az35-moonlit-dinosaur-base-hud.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736795808-prsvti-humanoid-runner-in-annotated-island-jungle.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736759165-qwadin-tropical-dino-tracked-forest-cove.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/ark-ascended/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1793736751614-e7yjp6-images-1.webp',
] as const;

export interface HeroCarouselSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

/** Homepage hero carousel — Ark Ascended Supabase shots. */
export const HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    src: ARK_MEDIA_URLS[0],
    alt: 'Ark Survival Ascended cheats overlay on jungle combat with tribe ESP',
    caption: 'Tribe awareness',
    captionDesc: 'Player ESP and threat readouts on The Island.',
  },
  {
    src: ARK_MEDIA_URLS[1],
    alt: 'Ark Survival Ascended ESP highlighting players and dinosaurs in PvP',
    caption: 'Combat ESP',
    captionDesc: 'See tribes and threats before you engage.',
  },
  {
    src: ARK_MEDIA_URLS[2],
    alt: 'Ark Survival Ascended resource and dino tracking overlay in the wild',
    caption: 'Wild tracking',
    captionDesc: 'Dino and resource awareness for ASA farms.',
  },
  {
    src: ARK_MEDIA_URLS[3],
    alt: 'Ark Survival Ascended wallhack-style overlay on base structures',
    caption: 'Base awareness',
    captionDesc: 'Structure and player awareness for raids.',
  },
  {
    src: ARK_MEDIA_URLS[4],
    alt: 'Moonlit Ark Survival Ascended base with cheat HUD elements',
    caption: 'Night raids',
    captionDesc: 'Readable overlays after dark.',
  },
  {
    src: ARK_MEDIA_URLS[5],
    alt: 'Ark Survival Ascended runner in annotated island jungle with ESP',
    caption: 'Island jungle',
    captionDesc: 'Map context with ESP labels.',
  },
  {
    src: ARK_MEDIA_URLS[6],
    alt: 'Tropical forest cove in Ark Survival Ascended with dino tracking ESP',
    caption: 'Forest cove',
    captionDesc: 'Track wild dinos along the shoreline.',
  },
  {
    src: ARK_MEDIA_URLS[7],
    alt: 'Ark Survival Ascended gameplay screenshot with cheat overlay',
    caption: 'ASA overview',
    captionDesc: 'Undetected ESP and radar for official servers.',
  },
];

/** Local optimized PNG bases (optional — npm run media:ark). */
export const ARK_LOCAL_IMAGES = [
  '/images/ark/ark-screenshot-1.png',
  '/images/ark/ark-screenshot-2.png',
  '/images/ark/ark-screenshot-3.png',
] as const;

/** Default social / JSON-LD preview. */
export const PRIMARY_HERO_IMAGE = ARK_MEDIA_URLS[0];

/** Stable Supabase cover per blog slug. */
export function arkBlogImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const index = hash % ARK_MEDIA_URLS.length;
  return ARK_MEDIA_URLS[index]!;
}

/** @deprecated Use arkBlogImageForSlug */
export function arkCoverForSlug(slug: string): string {
  return arkBlogImageForSlug(slug);
}