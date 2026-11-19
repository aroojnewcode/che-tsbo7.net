/**
 * Product & hero screenshots — Black Ops 7 cheat gallery (Supabase library).
 * Optional local fallbacks: public/images/product/*.png via npm run media:bo7
 */

export interface GallerySlideConfig {
  id: string;
  /** Path under public/ (PNG source; WebP variants are generated at build). */
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

const productImage = (name: string) => `/images/product/${name}.png`;

/** Three unique BO7 shots — never duplicate src in one gallery. */
export const PRODUCT_GALLERY_SLIDES: GallerySlideConfig[] = [
  {
    id: 'awareness',
    src: productImage('awareness'),
    alt: 'Call of Duty Black Ops 7 player ESP highlighting squad members, enemy players and resources',
    caption: 'Player & resource ESP',
    captionDesc: 'Track squads, enemy players, streaks and lanes before you rotate or hold hardpoint.',
  },
  {
    id: 'combat',
    src: productImage('combat'),
    alt: 'Call of Duty Black Ops 7 combat overlay with aim assist during a PvP fight',
    caption: 'Combat assist',
    captionDesc: 'Aim smoothing, FOV limits and ESP together for CQB and mid-range fights.',
  },
  {
    id: 'world',
    src: productImage('world'),
    alt: 'Call of Duty Black Ops 7 tactical sightline with map-style awareness',
    caption: 'Map & objective awareness',
    captionDesc: 'Orientation on BO7 maps—see routes, objectives and hotspots before you rotate.',
  },
];

export type ProductGalleryId = (typeof PRODUCT_GALLERY_SLIDES)[number]['id'];

const slideById = new Map(PRODUCT_GALLERY_SLIDES.map((s) => [s.id, s]));

/** Pick slides by id; skips unknown ids and dedupes by src (no repeated image on one page). */
export function resolveProductGallery(ids: ProductGalleryId[]): GallerySlideConfig[] {
  const seen = new Set<string>();
  const out: GallerySlideConfig[] = [];
  for (const id of ids) {
    const slide = slideById.get(id);
    if (!slide || seen.has(slide.src)) continue;
    seen.add(slide.src);
    out.push(slide);
  }
  return out;
}

/** Default triple for tier pages (unique order per tier). */
export const PRODUCT_GALLERY_BY_TIER: Record<string, ProductGalleryId[]> = {
  lite: ['awareness', 'world', 'combat'],
  pro: ['combat', 'awareness', 'world'],
  elite: ['world', 'combat', 'awareness'],
  'hwid-spoofer': ['awareness', 'combat', 'world'],
  'cloud-dma': ['world', 'awareness', 'combat'],
  ugc: ['world', 'awareness', 'combat'],
  'unlock-all': ['combat', 'world', 'awareness'],
};

/** Home hero carousel — one pass through all unique slides. */
export const HERO_GALLERY_IDS: ProductGalleryId[] = ['awareness', 'combat', 'world'];
