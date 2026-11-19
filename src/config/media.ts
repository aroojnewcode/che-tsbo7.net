/** Canonical Black Ops 7 hero & blog imagery (Supabase seo-media-library). */
export const BO7_SUPABASE_IMAGES = [
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794749070764-3pn03s-warehouse-garage-assault-hud.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794749015068-1kdjdw-images-1.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794748372966-jnxv0h-8a2255c48ae94bde7726e9e51389f472.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794748359408-mv6ahn-futuristic-plaza-iron-sight-showdown.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794748354840-e7krg3-tactical-garage-entrance-enemy-scan.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/a9f4c0ff-33ca-4a16-975b-30648c04cb8c/1794748322549-50ayrv-futuristic-diagnostics-lobby-under-fire.webp',
  'https://ooszazcwzmwhitdxwtom.supabase.co/storage/v1/object/public/seo-media-library/black-ops/7a5973f7-2cf8-4de3-90ea-2060bf036d16/1794600929135-81p7zm-7-2.webp',
] as const;

/** Pool for blog cards, article heroes, and OG fallbacks — hash-stable per slug. */
export const BO7_MEDIA_URLS: readonly string[] = [...BO7_SUPABASE_IMAGES];

export interface HeroCarouselSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

/** Homepage hero carousel — Black Ops 7 Supabase shots. */
export const HERO_CAROUSEL_SLIDES: HeroCarouselSlide[] = [
  {
    src: BO7_SUPABASE_IMAGES[0]!,
    alt: 'Call of Duty Black Ops 7 warehouse garage assault with ESP HUD overlay',
    caption: 'Garage assault HUD',
    captionDesc: 'Player ESP and combat readouts during a warehouse push.',
  },
  {
    src: BO7_SUPABASE_IMAGES[1]!,
    alt: 'Call of Duty Black Ops 7 multiplayer combat with cheat awareness overlay',
    caption: 'Multiplayer combat',
    captionDesc: 'Threat markers and lanes on a live BO7 firefight.',
  },
  {
    src: BO7_SUPABASE_IMAGES[2]!,
    alt: 'Call of Duty Black Ops 7 ranked match with squad and enemy ESP',
    caption: 'Squad awareness',
    captionDesc: 'Enemy and squad tags before you commit to a fight.',
  },
  {
    src: BO7_SUPABASE_IMAGES[3]!,
    alt: 'Call of Duty Black Ops 7 futuristic plaza iron-sight showdown with overlay',
    caption: 'Plaza showdown',
    captionDesc: 'Iron-sight range fights with readable ESP framing.',
  },
  {
    src: BO7_SUPABASE_IMAGES[4]!,
    alt: 'Call of Duty Black Ops 7 tactical garage entrance with enemy scan ESP',
    caption: 'Entrance scan',
    captionDesc: 'Pre-rotate intel at garage chokepoints.',
  },
  {
    src: BO7_SUPABASE_IMAGES[5]!,
    alt: 'Call of Duty Black Ops 7 diagnostics lobby under fire with BO7 cheat HUD',
    caption: 'Lobby under fire',
    captionDesc: 'Objective pressure with full awareness stack.',
  },
  {
    src: BO7_SUPABASE_IMAGES[6]!,
    alt: 'Call of Duty Black Ops 7 gameplay screenshot with undetected ESP overlay',
    caption: 'BO7 overview',
    captionDesc: 'ESP and radar tuned for Ranked and 6v6 playlists.',
  },
];

/** Optional local fallbacks when running `npm run media:bo7`. */
export const BO7_LOCAL_IMAGES = [
  '/images/bo7/bo7-screenshot-1.png',
  '/images/bo7/bo7-screenshot-2.png',
  '/images/bo7/bo7-screenshot-3.png',
] as const;

/** Default social / JSON-LD preview. */
export const PRIMARY_HERO_IMAGE = BO7_SUPABASE_IMAGES[0]!;

/** Stable cover per blog slug (cycles Supabase library). */
export function bo7BlogImageForSlug(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const index = hash % BO7_MEDIA_URLS.length;
  return BO7_MEDIA_URLS[index]!;
}

/** @deprecated Use bo7BlogImageForSlug */
export function bo7CoverForSlug(slug: string): string {
  return bo7BlogImageForSlug(slug);
}