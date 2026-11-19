/**
 * Unique titles/descriptions per route — all Call of Duty: Black Ops 7-focused, no duplicate SERP copy.
 * Titles ~50–60 chars; descriptions ~140–155 chars.
 */

import { BLOG_PAGE_SEO } from './pageSeoBlog';
import { FORUM_PAGE_SEO } from './forumSeo';
import type { PageSeoEntry } from './pageSeoTypes';

export type { PageSeoEntry } from './pageSeoTypes';

const CORE_PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Black Ops 7 Cheats & BO7 Hacks | ESP, Aimbot, Undetected',
    description:
      'Black Ops 7 cheats and BO7 hacks—cod Black Ops 7 ESP, wallhack, aimbot, 2D radar. Undetected status, Lite & Pro tiers, Steam/Battle.net PC, patch-day updates.',
    h1: 'Call of Duty: Black Ops 7 Hacks & Cheats – ESP, Aimbot & Radar',
  },
  '/products/bo7-hacks/': {
    title: 'Buy Black Ops 7 Cheats | Compare Lite vs Pro BO7 Hacks',
    description:
      'Buy Black Ops 7 cheats—compare Lite vs Pro, best BO7 cheats 2026 pricing. Player ESP, loot ESP, aimbot, setup guide and undetected cheat status on one hub.',
    h1: 'Buy Black Ops 7 Cheats – Lite, Pro & Elite BO7 Hacks',
  },
  '/products/bo7-hacks/lite/': {
    title: 'Black Ops 7 ESP & Wallhack | Skeleton ESP & 2D Radar',
    description:
      'BO7 ESP and Black Ops 7 wallhack on Lite—player ESP, skeleton ESP, loot ESP, radar hack overlay, stream proof options. Check undetected status before checkout.',
  },
  '/products/bo7-hacks/pro/': {
    title: 'Black Ops 7 Aimbot | Smoothing, FOV & Humanized Aim',
    description:
      'Black Ops 7 aimbot on Pro—soft aim, bone select, visibility check, FOV smoothing, no recoil and no spread plus full Lite ESP for multiplayer and Ranked.',
  },
  '/products/bo7-hacks/elite/': {
    title: 'Best BO7 Elite Cheats 2026 | Full BO7 ESP & Aim Suite',
    description:
      'Elite BO7 cheats: skeleton ESP, scorestreak & objective awareness, aimbot, objective route assist, Skin Changer & fast patch updates for multiplayer and Zombies.',
  },
  '/products/bo7-hacks/hwid-spoofer/': {
    title: 'Black Ops 7 HWID Spoofer | BO7 HWID Ban Reset',
    description:
      'Black Ops 7 HWID spoofer after Ricochet bans—BO7 hwid ban reset, disk, MAC and GPU IDs. Pair with undetected cheat status; Steam, Battle.net and Windows 11 setup.',
  },
  '/products/bo7-hacks/ugc/': {
    title: 'Call of Duty: Black Ops 7 UGC Recovery Tool | Steam & Ban Appeals',
    description:
      'UGC appeal workspace for platform holds, Ricochet Anti-Cheat bans and server restrictions—document cases, track status and rebuild account access with structured workflows.',
  },
  '/products/bo7-hacks/unlock-all/': {
    title: 'Black Ops 7 Skin Changer & Unlock All Utility',
    description:
      'Black Ops 7 skin changer and unlock all—local weapon and clothing previews on PC. Client-side cosmetics; standalone utility or bundled with Elite tier.',
  },
  '/products/bo7-hacks/cloud-dma/': {
    title: 'Black Ops 7 DMA Cheat | BO7 Cloud DMA vs Loader',
    description:
      'Black Ops 7 DMA cheat and BO7 cloud DMA vs external loader—compare hardware path to software ESP, radar and aimbot on Lite/Pro before you buy.',
  },
  '/products/bo7-hacks/utilities/': {
    title: 'Compare Hack Utilities | HWID Spoofer & UGC',
    description:
      'Utility comparison for PC—HWID Spoofer vs UGC recovery use cases, feature lists and product pages. Skin Changer details live on Unlock All.',
  },
  '/blog/': {
    title: 'Black Ops 7 Cheats Setup Guide & BO7 Hacks Tips 2026',
    description:
      'How to get Black Ops 7 cheats—loader download, setup guide, external vs internal cheats, TPM and Ricochet patch notes. Undetected ESP, aimbot and HWID help.',
    h1: 'Call of Duty: Black Ops 7 Cheats & Hacks – Guides, Tips & Updates',
  },
  '/forum/': {
    title: 'Call of Duty: Black Ops 7 Player Discussions | Hacks, ESP & Gameplay Tips',
    description:
      'Call of Duty: Black Ops 7 community forum for player discussions on ESP, radar, patches, maps, loadouts, account safety, and third-party tool compatibility.',
    h1: 'Call of Duty: Black Ops 7 Forum – Player Discussions, Questions & Tips',
  },
  '/forum/choose-tier/': {
    title: 'Choose Call of Duty: Black Ops 7 Hacks Tier | Lite, Pro or Elite',
    description:
      'Pick Lite, Pro or Elite by feature set—awareness-only vs aimbot and full Elite suite—then follow secure checkout on cheatsbo7.net.',
    h1: 'How to choose the right Call of Duty: Black Ops 7 hacks tier to buy',
  },
  '/reviews/': {
    title: 'Call of Duty: Black Ops 7 Hacks Reviews | Buyer Ratings & Feedback',
    description:
      'Read verified Call of Duty: Black Ops 7 Hacks reviews for Elite ESP and aimbot, HWID Spoofer, UGC recovery and Skin Changer—real buyer ratings before you checkout.',
    h1: 'Call of Duty: Black Ops 7 Hacks reviews — ESP, aimbot & spoofer',
  },
  '/faq/': {
    title: 'Black Ops 7 Cheats FAQ | Ricochet & Undetected Status',
    description:
      'Black Ops 7 cheats FAQ—is it safe, ban risk, Ricochet anti-cheat, undetected status, patch day cheats, Steam/Battle.net, Lite vs Pro and HWID spoofer answers.',
    h1: 'Black Ops 7 Cheats FAQ – Pricing, Features & Buying Questions',
  },
  '/terms/': {
    title: 'Call of Duty: Black Ops 7 Hacks Terms of Sale | License & Refunds',
    description:
      'Legal terms for purchasing Call of Duty: Black Ops 7 hack licenses on cheatsbo7.net—delivery, personal-use limits, refunds, Ricochet Anti-Cheat risk and acceptable product use.',
  },
  '/about/': {
    title: 'About Call of Duty: Black Ops 7 Hacks Store | Loader Updates & Help',
    description:
      'Meet the cheatsbo7.net team—Lite, Pro and Elite tiers, utilities, patch-day loader updates and Discord help after checkout on Steam PC.',
    h1: 'About our Call of Duty: Black Ops 7 Hacks store',
  },
  '/support/': {
    title: 'Call of Duty: Black Ops 7 Hacks Discord Support | Loader Help Tickets',
    description:
      'Discord support for loader errors, HWID Spoofer setup and checkout—open a ticket with your order ID, issue type and screenshots for fast help.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Data, Cookies & Your Rights',
    description:
      'Privacy policy for cheatsbo7.net—cookies, analytics, Discord ticket data, checkout partners, retention and your rights when browsing or purchasing.',
  },
  '/go/bo7/': {
    title: 'Buy Black Ops 7 Cheats | Best BO7 Hacks Checkout 2026',
    description:
      'Buy Black Ops 7 cheats—undetected BO7 hacks checkout for Lite and Pro. Secure partner payment, instant key delivery and loader portal access after purchase.',
    h1: 'Call of Duty: Black Ops 7 cheats — secure checkout',
  },
  '/go/skin-changer/': {
    title: 'Skin Changer Checkout | Call of Duty: Black Ops 7 Unlock All',
    description:
      'Secure checkout for Call of Duty: Black Ops 7 Skin Changer and Unlock All utility—local cosmetic previews after purchase on PC.',
    h1: 'Skin Changer — secure checkout',
  },
  '/go/hwid-spoofer/': {
    title: 'HWID Spoofer Checkout | Call of Duty: Black Ops 7 Ricochet Anti-Cheat',
    description:
      'Secure checkout for Call of Duty: Black Ops 7 HWID Spoofer after hardware flags—portal setup and Discord support after payment.',
    h1: 'HWID Spoofer — secure checkout',
  },
  '/go/ugc/': {
    title: 'UGC Recovery Checkout | Call of Duty: Black Ops 7 Appeals',
    description:
      'Secure checkout for UGC recovery and ban appeal tooling—structured workflows after purchase on cheatsbo7.net.',
    h1: 'UGC recovery — secure checkout',
  },
  '/go/cloud-dma/': {
    title: 'Cloud DMA Checkout | Call of Duty: Black Ops 7 Hardware Path',
    description:
      'Secure checkout for Cloud DMA remote hardware access for BO7—sold separately from Lite, Pro and Elite software tiers.',
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
