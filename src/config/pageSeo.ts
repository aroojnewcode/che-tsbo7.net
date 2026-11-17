/**
 * Unique titles/descriptions per route — all Ark: Survival Ascended-focused, no duplicate SERP copy.
 * Titles ~50–60 chars; descriptions ~140–155 chars.
 */

import { BLOG_PAGE_SEO } from './pageSeoBlog';
import { FORUM_PAGE_SEO } from './forumSeo';
import type { PageSeoEntry } from './pageSeoTypes';

export type { PageSeoEntry } from './pageSeoTypes';

const CORE_PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'ARK: Survival Ascended Cheats | ESP, Aimbot, Lite Pro Elite',
    description:
      'ARK: Survival Ascended hacks hub—player and dino ESP, loot ESP, 2D radar, soft aim and no recoil. Lite, Pro, Elite on PC with portal delivery and patch-day status.',
    h1: 'Ark: Survival Ascended Hacks & Cheats – ESP, Aimbot & Radar',
  },
  '/products/ark-hacks/': {
    title: 'ARK Survival Ascended Cheats | Lite, Pro & Elite Hub',
    description:
      'ARK Survival Ascended cheats and ark ascended hacks—compare Lite, Pro and Elite. Player ESP, dino ESP, loot ESP, aimbot, setup and cheat status guides on one hub.',
    h1: 'ARK: Survival Ascended Cheats – Choose Your Lite, Pro & Elite Plan',
  },
  '/products/ark-hacks/lite/': {
    title: 'ARK Survival Ascended ESP & Wallhack | Lite Radar Tier',
    description:
      'ARK Survival Ascended ESP and wallhack on Lite—player, dino and loot ESP, base and turret tags, 2D radar and streamproof overlay. Check cheat status before checkout.',
  },
  '/products/ark-hacks/pro/': {
    title: 'ARK Survival Ascended Aimbot | Pro Soft Aim & No Spread',
    description:
      'ARK Survival Ascended aimbot on Pro—prediction-style aim assist, bone select, no spread and no recoil, streamproof capture-safe overlay plus full Lite ESP.',
  },
  '/products/ark-hacks/elite/': {
    title: 'Best Ark Elite Cheats 2026 | Full ASA ESP & Aim Suite',
    description:
      'Elite ASA cheats: skeleton ESP, boss & obelisk awareness, aimbot, resource route assist, Skin Changer & fast wipe/patch updates for official and unofficial maps.',
  },
  '/products/ark-hacks/hwid-spoofer/': {
    title: 'Ark HWID Spoofer | ASA HWID Ban Reset After BattlEye',
    description:
      'ASA HWID spoofer after hardware bans—rotate disk, MAC & GPU IDs, pair with undetected status checks & Steam/Epic setup. Portal guide & Discord support.',
  },
  '/products/ark-hacks/ugc/': {
    title: 'Ark: Survival Ascended UGC Recovery Tool | Steam & Ban Appeals',
    description:
      'UGC appeal workspace for platform holds, BattlEye bans and server restrictions—document cases, track status and rebuild account access with structured workflows.',
  },
  '/products/ark-hacks/unlock-all/': {
    title: 'Unlock All & Skin Changer | Local Cosmetics',
    description:
      'Unlock All and Skin Changer for local weapon and clothing previews on PC—client-side cosmetics without market purchases; standalone or with Elite tier.',
  },
  '/products/ark-hacks/cloud-dma/': {
    title: 'ARK Survival Ascended DMA Cheats | Cloud DMA vs Loader',
    description:
      'ARK Survival Ascended DMA cheats path—Cloud DMA onboarding vs external ESP and radar on Lite/Pro. Compare hardware requirements before you buy DMA or software tiers.',
  },
  '/products/ark-hacks/utilities/': {
    title: 'Compare Hack Utilities | HWID Spoofer & UGC',
    description:
      'Utility comparison for PC—HWID Spoofer vs UGC recovery use cases, feature lists and product pages. Skin Changer details live on Unlock All.',
  },
  '/blog/': {
    title: 'ASA Cheat Guides 2026 | Ark ESP, Aimbot & BattlEye',
    description:
      'Buy guides for undetected Ark cheats—ESP, loot filters, 2D radar, aimbot, HWID bans, wipe patches & external loader setup before checkout on PC.',
    h1: 'ARK: Survival Ascended Cheats & Hacks – Guides, Tips & Updates',
  },
  '/forum/': {
    title: 'Ark: Survival Ascended Player Discussions | Hacks, ESP & Gameplay Tips',
    description:
      'Ark: Survival Ascended community forum for player discussions on ESP, radar, patches, maps, loadouts, account safety, and third-party tool compatibility.',
    h1: 'ARK: Survival Ascended Forum – Player Discussions, Questions & Tips',
  },
  '/forum/choose-tier/': {
    title: 'Choose Ark: Survival Ascended Hacks Tier | Lite, Pro or Elite',
    description:
      'Pick Lite, Pro or Elite by feature set—awareness-only vs aimbot and full Elite suite—then follow secure checkout on cheatsark.com.',
    h1: 'How to choose the right Ark: Survival Ascended hacks tier to buy',
  },
  '/reviews/': {
    title: 'Ark: Survival Ascended Hacks Reviews | Buyer Ratings & Feedback',
    description:
      'Read verified Ark: Survival Ascended Hacks reviews for Elite ESP and aimbot, HWID Spoofer, UGC recovery and Skin Changer—real buyer ratings before you checkout.',
    h1: 'Ark: Survival Ascended Hacks reviews — ESP, aimbot & spoofer',
  },
  '/faq/': {
    title: 'ARK ASA Anti-Cheat FAQ | BattlEye & Undetected Status',
    description:
      'BattlEye and ARK Survival Ascended anti-cheat FAQ—undetected status checks, wipe updates, HWID risk, setup and Lite vs Pro vs Elite before you buy cheats.',
    h1: 'Ark: Survival Ascended Hacks & Cheats – Buying FAQ',
  },
  '/terms/': {
    title: 'Ark: Survival Ascended Hacks Terms of Sale | License & Refunds',
    description:
      'Legal terms for purchasing Ark: Survival Ascended hack licenses on cheatsark.com—delivery, personal-use limits, refunds, BattlEye risk and acceptable product use.',
  },
  '/about/': {
    title: 'About Ark: Survival Ascended Hacks Store | Loader Updates & Help',
    description:
      'Meet the cheatsark.com team—Lite, Pro and Elite tiers, utilities, patch-day loader updates and Discord help after checkout on Steam PC.',
    h1: 'About our Ark: Survival Ascended Hacks store',
  },
  '/support/': {
    title: 'Ark: Survival Ascended Hacks Discord Support | Loader Help Tickets',
    description:
      'Discord support for loader errors, HWID Spoofer setup and checkout—open a ticket with your order ID, issue type and screenshots for fast help.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Data, Cookies & Your Rights',
    description:
      'Privacy policy for cheatsark.com—cookies, analytics, Discord ticket data, checkout partners, retention and your rights when browsing or purchasing.',
  },
  '/go/ark/': {
    title: 'Buy Ark: Survival Ascended Cheats | Secure Checkout 2026',
    description:
      'Indexable checkout gateway for undetected Ark cheats and ASA hacks—Lite, Pro and Elite tiers. Continue to secure partner checkout with instant key delivery.',
    h1: 'Ark: Survival Ascended cheats — secure checkout',
  },
  '/go/skin-changer/': {
    title: 'Skin Changer Checkout | Ark: Survival Ascended Unlock All',
    description:
      'Secure checkout for Ark: Survival Ascended Skin Changer and Unlock All utility—local cosmetic previews after purchase on PC.',
    h1: 'Skin Changer — secure checkout',
  },
  '/go/hwid-spoofer/': {
    title: 'HWID Spoofer Checkout | Ark: Survival Ascended BattlEye',
    description:
      'Secure checkout for Ark: Survival Ascended HWID Spoofer after hardware flags—portal setup and Discord support after payment.',
    h1: 'HWID Spoofer — secure checkout',
  },
  '/go/ugc/': {
    title: 'UGC Recovery Checkout | Ark: Survival Ascended Appeals',
    description:
      'Secure checkout for UGC recovery and ban appeal tooling—structured workflows after purchase on cheatsark.com.',
    h1: 'UGC recovery — secure checkout',
  },
  '/go/cloud-dma/': {
    title: 'Cloud DMA Checkout | Ark: Survival Ascended Hardware Path',
    description:
      'Secure checkout for Cloud DMA remote hardware access for ASA—sold separately from Lite, Pro and Elite software tiers.',
    h1: 'Cloud DMA — secure checkout',
  },
};

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  ...CORE_PAGE_SEO,
  ...BLOG_PAGE_SEO,
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  const path = normalizeSeoPath(pathname);
  return PAGE_SEO[path] ?? FORUM_PAGE_SEO[path];
}
