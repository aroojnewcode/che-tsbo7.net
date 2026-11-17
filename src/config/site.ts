export const SITE_DOMAIN = 'cheatsark.com';
/** Canonical HTTPS origin for sitemaps, IndexNow, and Search Console — must match the live Worker custom domain. */
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const CANONICAL_SITE_ORIGIN = SITE_URL;
/** Site mark (favicon + footer). Regenerate: npm run brand:icons */
export const SITE_LOGO = '/logo.svg';
/** Navbar corner mark (BrandGun). Regenerate: npm run brand:gun */
export const SITE_GUN_IMAGE = '/images/brand/ark-gun.webp';
/** Forum sidebar community mark (Ark: Survival Ascended emblem). */
export const FORUM_LOGO = '/images/brand/forum-logo.png';
export const PRODUCT_BASE = '/products/ark-hacks/';
export const TITLE_PREFIX = 'Ark: Survival Ascended Hacks';
export const SUPPORT_EMAIL = `support@${SITE_DOMAIN}`;
/** Discord invite for support tickets. Override with PUBLIC_DISCORD_URL. */
export const DISCORD_URL =
  (typeof import.meta !== 'undefined' && (import.meta.env.PUBLIC_DISCORD_URL as string | undefined)?.trim()) ||
  'https://discord.gg/Vu85F8auQS';
