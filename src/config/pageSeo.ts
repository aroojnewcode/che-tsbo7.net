/**
 * Unique titles/descriptions per route — all Escape from Tarkov-focused, no duplicate SERP copy.
 * Titles ~50–60 chars; descriptions ~140–155 chars.
 */

import { BLOG_PAGE_SEO } from './pageSeoBlog';
import { FORUM_PAGE_SEO } from './forumSeo';
import type { PageSeoEntry } from './pageSeoTypes';

export type { PageSeoEntry } from './pageSeoTypes';

const CORE_PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Tarkov Cheats 2026 | EFT Hacks — Undetected ESP & Aimbot',
    description:
      'Buy undetected Tarkov cheats & EFT hacks—Escape from Tarkov ESP, loot ESP, 2D radar, soft aim, triggerbot & no recoil. Lite, Pro, Elite; external loader.',
    h1: 'Escape From Tarkov Hacks & Cheats – ESP, Aimbot & Radar',
  },
  '/products/tarkov-hacks/': {
    title: 'Buy Tarkov Cheats | EFT Hacks Hub — Lite, Pro, Elite',
    description:
      'Best-value Escape from Tarkov cheat tiers on PC—undetected ESP, radar, aimbot, HWID spoofer, Cloud DMA & utilities. Instant portal delivery after checkout.',
    h1: 'Escape From Tarkov Hacks & Cheats – Lite, Pro & Elite',
  },
  '/products/tarkov-hacks/lite/': {
    title: 'Tarkov Lite Cheats | EFT ESP, 2D Radar & Wallhack Tools',
    description:
      'Lite EFT cheats: PMC & scav ESP, loot ESP, container highlights, 2D radar & FOV—visual awareness without aimbot. Stream-proof external loader on BSG/Steam.',
  },
  '/products/tarkov-hacks/pro/': {
    title: 'Tarkov Pro Cheats | EFT Aimbot, Silent Soft Aim & No Recoil',
    description:
      'Pro EFT hacks: undetected aimbot, soft aim, triggerbot-style fire assist, RCS & full Lite ESP/radar—combat-ready Tarkov cheats with secure checkout.',
  },
  '/products/tarkov-hacks/elite/': {
    title: 'Best Tarkov Elite Cheats 2026 | Full EFT ESP & Aim Suite',
    description:
      'Elite EFT cheats: skeleton ESP, boss & exfil awareness, aimbot, loot route assist, Skin Changer & fast wipe/patch updates for Labs, Customs & Streets.',
  },
  '/products/tarkov-hacks/hwid-spoofer/': {
    title: 'Tarkov HWID Spoofer | EFT HWID Ban Reset After BattlEye',
    description:
      'EFT HWID spoofer after hardware bans—rotate disk, MAC & GPU IDs, pair with undetected status checks & BSG launcher setup. Portal guide & Discord support.',
  },
  '/products/tarkov-hacks/ugc/': {
    title: 'Escape from Tarkov UGC Recovery Tool | Steam & Ban Appeals',
    description:
      'UGC appeal workspace for platform holds, BattlEye bans and server restrictions—document cases, track status and rebuild account access with structured workflows.',
  },
  '/products/tarkov-hacks/unlock-all/': {
    title: 'Unlock All & Skin Changer | Local Cosmetics',
    description:
      'Unlock All and Skin Changer for local weapon and clothing previews on PC—client-side cosmetics without market purchases; standalone or with Elite tier.',
  },
  '/products/tarkov-hacks/cloud-dma/': {
    title: 'DMA Cheats Tarkov | Cloud DMA vs Second-PC Radar Path',
    description:
      'Cloud DMA for EFT—remote hardware access, compatibility checks & onboarding vs local software ESP/radar. Sold separately from Lite, Pro & Elite cheats.',
  },
  '/products/tarkov-hacks/utilities/': {
    title: 'Compare Hack Utilities | HWID Spoofer & UGC',
    description:
      'Utility comparison for PC—HWID Spoofer vs UGC recovery use cases, feature lists and product pages. Skin Changer details live on Unlock All.',
  },
  '/blog/': {
    title: 'EFT Cheat Guides 2026 | Tarkov ESP, Aimbot & BattlEye',
    description:
      'Buy guides for undetected Tarkov cheats—ESP, loot filters, 2D radar, aimbot, HWID bans, wipe patches & external loader setup before checkout on PC.',
    h1: 'Escape from Tarkov hack & cheat buy guides',
  },
  '/forum/': {
    title: 'Escape from Tarkov Player Discussions | Hacks, ESP & Gameplay Tips',
    description:
      'Escape from Tarkov community forum for player discussions on ESP, radar, patches, maps, loadouts, account safety, and third-party tool compatibility.',
    h1: 'Escape from Tarkov Player Discussions – Hacks, ESP & Gameplay Tips',
  },
  '/forum/choose-tier/': {
    title: 'Choose Escape from Tarkov Hacks Tier | Lite, Pro or Elite',
    description:
      'Pick Lite, Pro or Elite by feature set—awareness-only vs aimbot and full Elite suite—then follow secure checkout on hackstarkov.com.',
    h1: 'How to choose the right Escape from Tarkov hacks tier to buy',
  },
  '/reviews/': {
    title: 'Escape from Tarkov Hacks Reviews | Buyer Ratings & Feedback',
    description:
      'Read verified Escape from Tarkov Hacks reviews for Elite ESP and aimbot, HWID Spoofer, UGC recovery and Skin Changer—real buyer ratings before you checkout.',
    h1: 'Escape from Tarkov Hacks reviews — ESP, aimbot & spoofer',
  },
  '/faq/': {
    title: 'EFT Cheats FAQ | Undetected Status, Wipe & BattlEye Risk',
    description:
      'Tarkov cheat FAQ: undetected status banner, BSG launcher vs Steam, wipe updates, instant delivery, HWID bans & Lite vs Pro vs Elite—before you buy EFT hacks.',
    h1: 'Escape From Tarkov Hacks & Cheats – Buying FAQ',
  },
  '/terms/': {
    title: 'Escape from Tarkov Hacks Terms of Sale | License & Refunds',
    description:
      'Legal terms for purchasing Escape from Tarkov hack licenses on hackstarkov.com—delivery, personal-use limits, refunds, BattlEye risk and acceptable product use.',
  },
  '/about/': {
    title: 'About Escape from Tarkov Hacks Store | Loader Updates & Help',
    description:
      'Meet the hackstarkov.com team—Lite, Pro and Elite tiers, utilities, patch-day loader updates and Discord help after checkout on Steam PC.',
    h1: 'About our Escape from Tarkov Hacks store',
  },
  '/support/': {
    title: 'Escape from Tarkov Hacks Discord Support | Loader Help Tickets',
    description:
      'Discord support for loader errors, HWID Spoofer setup and checkout—open a ticket with your order ID, issue type and screenshots for fast help.',
  },
  '/privacy/': {
    title: 'Privacy Policy | Data, Cookies & Your Rights',
    description:
      'Privacy policy for hackstarkov.com—cookies, analytics, Discord ticket data, checkout partners, retention and your rights when browsing or purchasing.',
  },
  '/go/tarkov/': {
    title: 'Buy Escape from Tarkov Cheats | Secure Checkout 2026',
    description:
      'Indexable checkout gateway for undetected Tarkov cheats and EFT hacks—Lite, Pro and Elite tiers. Continue to secure partner checkout with instant key delivery.',
    h1: 'Escape from Tarkov cheats — secure checkout',
  },
  '/go/skin-changer/': {
    title: 'Skin Changer Checkout | Escape from Tarkov Unlock All',
    description:
      'Secure checkout for Escape from Tarkov Skin Changer and Unlock All utility—local cosmetic previews after purchase on PC.',
    h1: 'Skin Changer — secure checkout',
  },
  '/go/hwid-spoofer/': {
    title: 'HWID Spoofer Checkout | Escape from Tarkov BattlEye',
    description:
      'Secure checkout for Escape from Tarkov HWID Spoofer after hardware flags—portal setup and Discord support after payment.',
    h1: 'HWID Spoofer — secure checkout',
  },
  '/go/ugc/': {
    title: 'UGC Recovery Checkout | Escape from Tarkov Appeals',
    description:
      'Secure checkout for UGC recovery and ban appeal tooling—structured workflows after purchase on hackstarkov.com.',
    h1: 'UGC recovery — secure checkout',
  },
  '/go/cloud-dma/': {
    title: 'Cloud DMA Checkout | Escape from Tarkov Hardware Path',
    description:
      'Secure checkout for Cloud DMA remote hardware access for EFT—sold separately from Lite, Pro and Elite software tiers.',
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
