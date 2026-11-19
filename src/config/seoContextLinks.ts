import { normalizeSeoPath } from './pageSeo';

export interface SeoContextLink {
  href: string;
  label: string;
}

const LINK_SETS: Record<string, SeoContextLink[]> = {
  '/': [
    { href: '/about/', label: 'Meet the cheatsbo7 store team' },
    { href: '/products/bo7-hacks/', label: 'Call of Duty Black Ops 7 cheats hub' },
    { href: '/products/bo7-hacks/lite/', label: 'Lite ESP and map hack tier listing' },
    { href: '/products/bo7-hacks/pro/', label: 'Pro aimbot and no recoil page' },
    { href: '/blog/bo7-esp-explained/', label: 'Player, enemy and loot ESP explained' },
    { href: '/blog/compare-bo7-cheats/', label: 'How to compare BO7 cheats before checkout' },
    { href: '/blog/ban-risk-official/', label: 'Ranked Play ban risk and rules' },
    { href: '/blog/buy-guide/', label: '2026 Call of Duty: Black Ops 7 checkout buy guide' },
    { href: '/blog/features/', label: 'Tier features module reference' },
    { href: '/forum/choose-tier/', label: 'Forum thread: choosing Lite vs Pro' },
    { href: '/sitemap.xml', label: 'XML sitemap index for crawlers' },
    { href: '/sitemap-pages.xml', label: 'Static pages XML sitemap listing' },
    { href: '/sitemap-blog.xml', label: 'Blog articles XML sitemap file' },
    { href: '/sitemap-forum.xml', label: 'Forum threads XML sitemap listing' },
  ],
  '/faq/': [
    { href: '/about/', label: 'About cheatsbo7 storefront page' },
    { href: '/products/bo7-hacks/', label: 'Call of Duty: Black Ops 7 hack tier comparison hub' },
    { href: '/blog/lite-vs-pro/', label: 'Written Lite versus Pro guide' },
    { href: '/blog/ricochet-patch/', label: 'Anti-cheat patch-day checklist post' },
    { href: '/support/', label: 'Discord loader support tickets' },
    { href: '/forum/ricochet-init/', label: 'Forum thread: Ricochet Anti-Cheat initialize errors' },
    { href: '/sitemap.xml', label: 'Full site XML sitemap index' },
    { href: '/sitemap-pages.xml', label: 'Help-center pages XML sitemap file' },
    { href: '/sitemap-forum.xml', label: 'Forum threads XML sitemap file' },
  ],
  '/about/': [
    { href: '/products/bo7-hacks/utilities/', label: 'HWID spoofer and UGC utilities hub' },
    { href: '/blog/stream-proof/', label: 'Stream-proof overlay setup for creators' },
    { href: '/forum/', label: 'Buyer forum Q&A archive' },
    { href: '/reviews/', label: 'Verified purchaser review hub' },
    { href: '/blog/buy-guide/', label: 'Checkout buy guide for Lite, Pro, Elite' },
    { href: '/sitemap-pages.xml', label: 'Static pages XML sitemap file' },
    { href: '/sitemap-forum.xml', label: 'Community threads XML sitemap file' },
    { href: '/sitemap.xml', label: 'Primary XML sitemap index URL' },
  ],
  '/products/bo7-hacks/': [
    { href: '/black-ops-7-cheats/', label: 'Call of Duty Black Ops 7 cheats hub URL' },
    { href: '/bo7-hacks/', label: 'Black Ops 7 hacks shortcut' },
    { href: '/blog/bo7-esp-explained/', label: 'Call of Duty Black Ops 7 ESP and wallhack guide' },
    { href: '/blog/aimbot-limits/', label: 'Call of Duty Black Ops 7 aimbot limits' },
    { href: '/blog/bo7-loot-esp/', label: 'Loot ESP, loot ESP and equipment tags' },
    { href: '/blog/compare-bo7-cheats/', label: 'Best Call of Duty Black Ops 7 cheats comparison' },
    { href: '/blog/ricochet-patch/', label: 'Call of Duty Black Ops 7 cheat status' },
    { href: '/blog/use-codes/', label: 'Call of Duty Black Ops 7 cheats setup' },
    { href: '/blog/ban-risk-official/', label: 'Ricochet Anti-Cheat and anti-cheat ban risk' },
    { href: '/products/bo7-hacks/cloud-dma/', label: 'Call of Duty Black Ops 7 DMA cheats option' },
    { href: '/status/', label: 'Live cheat status shortcut' },
    { href: '/setup/', label: 'Cheats setup shortcut' },
  ],
  '/products/bo7-hacks/cloud-dma/': [
    { href: '/products/bo7-hacks/', label: 'Software Call of Duty Black Ops 7 cheats hub' },
    { href: '/blog/compare-bo7-cheats/', label: 'DMA vs external loader comparison framework' },
    { href: '/blog/features/', label: 'ESP, radar and aimbot feature tiers' },
    { href: '/blog/ban-risk-official/', label: 'Ricochet Anti-Cheat risk on BO7' },
  ],
  '/blog/': [
    { href: '/blog/bo7-esp-explained/', label: 'BO7 ESP: player, enemy and loot overlays' },
    { href: '/blog/bo7-loot-esp/', label: 'Loot ESP and resource ESP presets' },
    { href: '/blog/aimbot-limits/', label: 'Aimbot features and realistic limits' },
    { href: '/blog/compare-bo7-cheats/', label: 'BO7 cheat comparison checklist' },
    { href: '/blog/aimbot/', label: 'Aimbot and no recoil setup guide' },
    { href: '/blog/buy-guide/', label: 'Lite, Pro, Elite checkout walkthrough' },
    { href: '/blog/features/', label: 'Hack features explained by tier' },
    { href: '/products/bo7-hacks/elite/', label: 'Elite full-suite product listing' },
    { href: '/forum/pre-install/', label: 'Forum thread: pre-install checklist' },
    { href: '/about/', label: 'Meet cheatsbo7 store background' },
    { href: '/sitemap-pages.xml', label: 'Marketing pages XML sitemap listing' },
    { href: '/sitemap-blog.xml', label: 'Blog posts XML sitemap file' },
  ],
  '/forum/': [
    { href: '/forum/choose-tier/', label: 'Choosing Lite vs Pro tier discussion' },
    { href: '/forum/esp-setup/', label: 'First-time ESP overlay calibration thread' },
    { href: '/blog/buy-guide/', label: 'Written checkout buy guide article' },
    { href: '/products/bo7-hacks/', label: 'Live tier comparison products hub' },
    { href: '/faq/', label: 'Pre-purchase FAQ answers index' },
    { href: '/sitemap-forum.xml', label: 'Forum discussions XML sitemap' },
    { href: '/sitemap-pages.xml', label: 'Static marketing pages sitemap' },
  ],
  '/forum/choose-tier/': [
    { href: '/blog/buy-guide/', label: 'Source article: 2026 checkout buy guide' },
    { href: '/blog/lite-vs-pro/', label: 'Lite versus Pro feature comparison' },
    { href: '/products/bo7-hacks/lite/', label: 'Lite tier product modules page' },
    { href: '/products/bo7-hacks/pro/', label: 'Pro tier combat modules page' },
    { href: '/products/bo7-hacks/elite/', label: 'Elite full-suite listing page' },
    { href: '/forum/', label: 'Return to buyer forum index' },
    { href: '/sitemap-forum.xml', label: 'All forum thread URLs sitemap' },
  ],
  '/blog/aimbot/': [
    { href: '/blog/bones/', label: 'Weapon bone select profile examples' },
    { href: '/blog/lite-vs-pro/', label: 'Lite vs Pro tier comparison write-up' },
    { href: '/products/bo7-hacks/pro/', label: 'Pro tier product and pricing page' },
    { href: '/forum/aim-smooth/', label: 'Smoothing aim settings discussion' },
    { href: '/forum/recoil-drill/', label: 'Recoil control drills discussion' },
    { href: '/sitemap-blog.xml', label: 'Blog XML sitemap listing' },
  ],
  '/blog/buy-guide/': [
    { href: '/blog/use-codes/', label: 'Portal unlock after payment guide' },
    { href: '/blog/elite/', label: 'Elite upgrade modules explainer' },
    { href: '/faq/', label: 'Pre-purchase FAQ index page' },
    { href: '/forum/choose-tier/', label: 'Forum thread: tier selection advice' },
    { href: '/products/bo7-hacks/', label: 'Live products hub with pricing' },
    { href: '/sitemap-blog.xml', label: 'Blog sitemap for all guides' },
  ],
  '/blog/features/': [
    { href: '/blog/esp/', label: 'Lite ESP and radar setup guide' },
    { href: '/blog/skins/', label: 'Skin Changer utility breakdown' },
    { href: '/products/bo7-hacks/unlock-all/', label: 'Unlock All cosmetics product page' },
    { href: '/forum/esp-setup/', label: 'ESP overlay calibration discussion' },
    { href: '/forum/esp-include/', label: 'ESP filter toggles discussion' },
    { href: '/about/', label: 'Meet cheatsbo7 editorial team page' },
    { href: '/sitemap-blog.xml', label: 'Blog XML sitemap index file' },
  ],
  '/blog/bones/': [
    { href: '/blog/aimbot/', label: 'Pro aimbot buyer configuration guide' },
    { href: '/forum/recoil-drill/', label: 'Per-weapon recoil drills discussion' },
    { href: '/products/bo7-hacks/pro/', label: 'Pro tier checkout listing page' },
    { href: '/forum/aim-smooth/', label: 'Aim smoothing presets discussion' },
    { href: '/sitemap-blog.xml', label: 'Blog articles sitemap URL' },
  ],
  '/blog/cheat-codes/': [
    { href: '/blog/console-cmds/', label: 'BO7 settings and keybind reference' },
    { href: '/blog/external/', label: 'External loader versus admin-only tools' },
    { href: '/products/bo7-hacks/lite/', label: 'Lite tier live-server ESP listing' },
    { href: '/forum/f1-console/', label: 'Forum: loader setup on live BO7 servers' },
    { href: '/forum/choose-tier/', label: 'Forum: tier pick before checkout' },
    { href: '/sitemap-blog.xml', label: 'Blog posts XML sitemap export' },
  ],
  '/blog/console-tips/': [
    { href: '/blog/cheat-codes/', label: 'Fake code lists versus loader article' },
    { href: '/blog/fov/', label: 'FOV tuning paired with ESP guide' },
    { href: '/products/bo7-hacks/', label: 'Live upload loader catalog' },
    { href: '/forum/spray-safe/', label: 'Spray control practice thread' },
    { href: '/blog/buy-guide/', label: '2026 checkout walkthrough article' },
    { href: '/sitemap-blog.xml', label: 'Blog XML sitemap for console guides' },
  ],
};

function slugFromPath(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? '';
}

function forumContextLinks(path: string): SeoContextLink[] {
  const slug = slugFromPath(path);
  const label = slug.replace(/-/g, ' ');
  return [
    { href: '/forum/', label: 'Buyer forum Q&A hub index' },
    { href: '/blog/buy-guide/', label: 'Checkout buy guide for all tiers' },
    { href: '/forum/lite-pro/', label: 'Lite versus Pro differences thread' },
    { href: '/forum/pre-install/', label: 'Pre-install checklist forum answers' },
    { href: '/products/bo7-hacks/', label: `Products hub related to ${label}` },
    { href: '/sitemap-forum.xml', label: 'Forum thread XML sitemap export' },
  ];
}

function blogContextLinks(path: string): SeoContextLink[] {
  const slug = slugFromPath(path);
  const label = slug.replace(/-/g, ' ');
  return [
    { href: '/blog/', label: 'Checkout and tier blog guides hub' },
    { href: '/blog/buy-guide/', label: 'Dedicated checkout buy guide post' },
    { href: '/blog/features/', label: 'Module features reference article' },
    { href: '/products/bo7-hacks/', label: `Tier listing for ${label} readers` },
    { href: '/sitemap-blog.xml', label: 'Blog posts XML sitemap file' },
  ];
}

const DEFAULT_LINKS: SeoContextLink[] = [
  { href: '/products/bo7-hacks/', label: 'Call of Duty: Black Ops 7 hack products directory' },
  { href: '/blog/', label: 'Checkout and tier blog guides hub' },
  { href: '/faq/', label: 'Tier and checkout FAQ index page' },
  { href: '/sitemap.xml', label: 'Site XML sitemap index file' },
  { href: '/sitemap-pages.xml', label: 'Static pages XML sitemap file' },
];

export function getSeoContextLinks(pathname: string): SeoContextLink[] {
  const path = normalizeSeoPath(pathname);
  if (LINK_SETS[path]) return LINK_SETS[path];
  if (path.startsWith('/forum/') && path !== '/forum/') return forumContextLinks(path);
  if (path.startsWith('/blog/') && path !== '/blog/') return blogContextLinks(path);
  return DEFAULT_LINKS;
}
