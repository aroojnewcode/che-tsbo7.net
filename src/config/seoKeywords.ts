/**
 * Target search phrases for Black Ops 7 — merged with competitor research + existing site terms.
 * Used for meta keywords and on-page synonym coverage.
 */
import { normalizeSeoPath } from './pageSeo';

/** Phrases you asked to add (kept alongside legacy lists below). */
const USER_REQUESTED_KEYWORDS = [
  'black ops 7 cheats',
  'black ops 7 hacks',
  'bo7 cheats',
  'bo7 hacks',
  'call of duty black ops 7 cheats',
  'call of duty black ops 7 hacks',
  'cod black ops 7 cheats',
  'black ops 7 aimbot',
  'bo7 aimbot',
  'black ops 7 soft aim',
  'black ops 7 no recoil',
  'bo7 no spread',
  'aimbot smoothing black ops 7',
  'aimbot FOV black ops 7',
  'bone select aimbot bo7',
  'visibility check aimbot bo7',
  'humanized aim black ops 7',
  'silent aim black ops 7',
  'black ops 7 esp',
  'bo7 esp',
  'black ops 7 wallhack',
  'bo7 wallhack',
  'black ops 7 skeleton esp',
  'black ops 7 loot esp',
  'bo7 loot esp',
  'black ops 7 radar hack',
  'bo7 radar overlay',
  'player esp black ops 7',
  '2d radar black ops 7',
  'undetected black ops 7 cheats',
  'undetected bo7 hacks',
  'bo7 undetected status',
  'black ops 7 cheats ricochet',
  'ricochet anti cheat black ops 7',
  'bo7 cheat status',
  'black ops 7 patch day cheats',
  'black ops 7 cheats after update',
  'buy black ops 7 cheats',
  'black ops 7 cheats lite vs pro',
  'lite vs pro bo7 cheats',
  'best black ops 7 cheats 2026',
  'best bo7 cheats',
  'compare black ops 7 cheats',
  'black ops 7 cheats price',
  'stream proof black ops 7 cheats',
  'bo7 stream proof',
  'obs proof bo7 esp',
  'discord screen share proof cheats bo7',
  'black ops 7 hwid spoofer',
  'bo7 hwid spoofer',
  'bo7 hwid ban',
  'black ops 7 hwid ban reset',
  'black ops 7 dma cheat',
  'bo7 cloud dma',
  'black ops 7 skin changer',
  'black ops 7 unlock all',
  'black ops 7 cheats steam',
  'black ops 7 cheats battle.net',
  'bo7 game pass pc cheats',
  'tpm 2.0 secure boot black ops 7',
  'black ops 7 cheat windows 11',
  'black ops 7 multiplayer cheats',
  'black ops 7 ranked cheats',
  'black ops 7 zombies esp',
  'bo7 zombies cheats',
  'hardpoint bo7 esp',
  'search and destroy bo7 cheats',
  'how to get black ops 7 cheats',
  'black ops 7 cheats setup guide',
  'black ops 7 loader download',
  'black ops 7 cheats faq',
  'is black ops 7 cheats safe',
  'black ops 7 cheat ban risk',
  'black ops 7 external cheats',
  'black ops 7 internal vs external cheats',
] as const;

const COMPETITOR_AND_FEATURE_KEYWORDS = [
  'Black Ops 7 cheats 2026',
  'Black Ops 7 hacks',
  'bo7 cheats',
  'bo7 hacks',
  'Black Ops 7 cheats undetected',
  'undetected bo7 cheats',
  'buy Black Ops 7 cheats',
  'best Black Ops 7 cheats 2026',
  'best bo7 cheats',
  'bo7 aimbot',
  'bo7 esp',
  'bo7 wallhack',
  'bo7 radar',
  '2d radar bo7',
  'radar cheat bo7',
  'silent aim bo7',
  'triggerbot bo7',
  'no sway',
  'rcs bo7',
  'bo7 chams',
  'visual only bo7 cheat',
  'loadout esp bo7',
  'objective esp bo7',
  'streak esp bo7',
  'scorestreak esp',
  'enemy player esp',
  'squad esp',
  'dma cheats bo7',
  'dma card bo7',
  'second pc radar',
  'external cheat bo7',
  'ricochet bypass bo7',
  'undetected status bo7',
  'bo7 hack status',
  'hwid ban bo7',
  'built in spoofer',
  'instant delivery bo7 cheat',
  'steam bo7 cheat',
  'battle.net bo7 cheat',
  'ranked bo7 cheats',
  'zombies bo7 cheats',
  'cheap Black Ops 7 cheats',
  'cheatsbo7',
] as const;

const SERP_PRIORITY_KEYWORDS = [
  'Black Ops 7 cheats',
  'Black Ops 7 hacks',
  'Black Ops 7 aimbot',
  'Black Ops 7 esp',
  'Black Ops 7 enemy esp',
  'Black Ops 7 loot esp',
  'Black Ops 7 dma cheats',
  'Black Ops 7 cheat status',
  'Black Ops 7 cheats setup',
  'Black Ops 7 cheats comparison',
  'ricochet anti cheat bo7',
  'undetected Black Ops 7 cheats',
  'best Black Ops 7 cheats',
  'wallhack Black Ops 7',
  'prediction aim bo7',
  'no spread Black Ops 7',
  'streamproof Black Ops 7',
  'Black Ops 7 cheats setup guide',
] as const;

const LEGACY_HACKS_KEYWORDS = [
  'Black Ops 7 hacks',
  'buy Black Ops 7 hacks',
  'undetected esp',
  'undetected aimbot',
  'Black Ops 7 hacks 2026',
  'lite pro elite',
  'bo7 lite hacks',
  'bo7 pro hacks',
  'bo7 elite hacks',
  'player esp',
  'loot esp',
  'skeleton esp',
  'fov hack',
  'soft aim',
  'bone select',
  'no recoil',
  'stream proof',
  'stream-proof overlay',
  'external loader',
  'bo7 hwid spoofer',
  'hwid spoofer',
  'ugc recovery',
  'skin changer',
  'unlock all',
  'cloud dma',
  'ricochet',
  'cheatsbo7.net',
] as const;

const ALL_KEYWORD_SET = [
  ...USER_REQUESTED_KEYWORDS,
  ...SERP_PRIORITY_KEYWORDS,
  ...COMPETITOR_AND_FEATURE_KEYWORDS,
  ...LEGACY_HACKS_KEYWORDS,
];

function uniqueKeywords(list: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const phrase of list) {
    const key = phrase.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(phrase.trim());
  }
  return out;
}

export const SITE_SEO_KEYWORDS = uniqueKeywords(ALL_KEYWORD_SET).join(', ');

/** Primary synonym line for JSON-LD / marketing copy. */
export const SITE_SEO_PHRASE =
  'Call of Duty: Black Ops 7 cheats, Black Ops 7 hacks, BO7 cheats, ESP and wallhack, aimbot, loot ESP, Ricochet Anti-Cheat status, undetected builds, Lite vs Pro';

/** Route-specific focus terms (merged with a short global tail). */
const ROUTE_KEYWORD_FOCUS: Record<string, readonly string[]> = {
  '/': [
    'black ops 7 cheats',
    'black ops 7 hacks',
    'bo7 cheats',
    'call of duty black ops 7 cheats',
    'undetected black ops 7 cheats',
    'black ops 7 esp',
    'black ops 7 aimbot',
  ],
  '/products/bo7-hacks/': [
    'buy black ops 7 cheats',
    'compare black ops 7 cheats',
    'lite vs pro bo7 cheats',
    'best black ops 7 cheats 2026',
    'black ops 7 cheats price',
  ],
  '/products/bo7-hacks/lite/': [
    'black ops 7 esp',
    'black ops 7 wallhack',
    'bo7 wallhack',
    'player esp black ops 7',
    'skeleton esp black ops 7',
    '2d radar black ops 7',
    'bo7 loot esp',
  ],
  '/products/bo7-hacks/pro/': [
    'black ops 7 aimbot',
    'bo7 aimbot',
    'humanized aim black ops 7',
    'visibility check aimbot bo7',
    'aimbot smoothing black ops 7',
    'black ops 7 no recoil',
    'bo7 no spread',
  ],
  '/products/bo7-hacks/hwid-spoofer/': [
    'black ops 7 hwid spoofer',
    'bo7 hwid spoofer',
    'bo7 hwid ban',
    'black ops 7 hwid ban reset',
  ],
  '/products/bo7-hacks/unlock-all/': [
    'black ops 7 skin changer',
    'black ops 7 unlock all',
  ],
  '/products/bo7-hacks/cloud-dma/': [
    'black ops 7 dma cheat',
    'bo7 cloud dma',
  ],
  '/faq/': [
    'black ops 7 cheats faq',
    'is black ops 7 cheats safe',
    'black ops 7 cheat ban risk',
    'ricochet anti cheat black ops 7',
    'tpm 2.0 secure boot black ops 7',
  ],
  '/blog/': [
    'black ops 7 cheats setup guide',
    'how to get black ops 7 cheats',
    'black ops 7 loader download',
  ],
  '/blog/stream-proof/': [
    'stream proof black ops 7 cheats',
    'obs proof bo7 esp',
    'discord screen share proof cheats bo7',
  ],
  '/blog/lite-vs-pro/': [
    'black ops 7 cheats lite vs pro',
    'lite vs pro bo7 cheats',
  ],
  '/blog/compare-bo7-cheats/': [
    'compare black ops 7 cheats',
    'best bo7 cheats',
  ],
  '/blog/ricochet-patch/': [
    'black ops 7 patch day cheats',
    'black ops 7 cheats after update',
    'bo7 cheat status',
  ],
  '/blog/use-codes/': [
    'black ops 7 cheats setup guide',
    'black ops 7 loader download',
  ],
  '/blog/esp/': [
    'black ops 7 esp',
    'black ops 7 wallhack',
    'bo7 radar overlay',
  ],
  '/blog/aimbot/': [
    'black ops 7 aimbot',
    'silent aim black ops 7',
    'bone select aimbot bo7',
  ],
  '/go/bo7/': [
    'buy black ops 7 cheats',
    'best black ops 7 cheats 2026',
  ],
};

const GLOBAL_META_TAIL = [
  'cod black ops 7 cheats',
  'bo7 hacks',
  'undetected bo7 hacks',
  'cheatsbo7.net',
] as const;

const META_KEYWORD_LIMIT = 28;

export function getMetaKeywordsForPath(pathname: string): string {
  const path = normalizeSeoPath(pathname);
  const focus = ROUTE_KEYWORD_FOCUS[path] ?? ROUTE_KEYWORD_FOCUS['/'];
  const merged = uniqueKeywords([...focus, ...GLOBAL_META_TAIL, ...USER_REQUESTED_KEYWORDS.slice(0, 6)]);
  return merged.slice(0, META_KEYWORD_LIMIT).join(', ');
}