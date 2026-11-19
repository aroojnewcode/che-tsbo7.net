import { CHECKOUT_URLS, BO7_CHECKOUT_URL } from './checkout-redirects.mjs';

/** Zadeyo affiliate checkout destinations. */
export const CHECKOUT = CHECKOUT_URLS;

/** All Get access / Buy CTAs use this URL. */
export const ZADEYO_CHECKOUT_URL = BO7_CHECKOUT_URL;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  bo7: 'bo7',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
  cloudDma: 'cloud-dma',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Zadeyo affiliate URL for visible “Get access” / buy CTAs (same tab — no target=_blank). */
export function checkoutPath(product: CheckoutProduct = 'bo7'): string {
  return CHECKOUT[product];
}

/** Internal /go/* path (blog links, bookmarks); 302 to Zadeyo via public/_redirects. */
export function checkoutRedirectPath(product: CheckoutProduct = 'bo7'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Alias used by /go/[slug] static redirect pages. */
export function checkoutExternalUrl(product: CheckoutProduct = 'bo7'): string {
  return CHECKOUT[product];
}

/** Default product checkout redirect (replaces legacy Discord CTAs). */
export const PRIMARY_CHECKOUT_PATH = checkoutPath('bo7');

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'unlock-all':
      return checkoutPath('skinChanger');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'cloud-dma':
      return checkoutPath('cloudDma');
    case 'lite':
    case 'pro':
    case 'elite':
    default:
      return checkoutPath('bo7');
  }
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  const normalized = href.startsWith('/') ? href : `/${href}`;
  const goMatch = normalized.match(/^\/go\/([^/]+)\/?$/);
  if (goMatch) {
    const product = CHECKOUT_SLUG_TO_PRODUCT[goMatch[1]];
    if (product) return checkoutPath(product);
  }

  if (!href.startsWith('http')) {
    return normalized;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}&`) || href.startsWith(`${url}?`)) {
      return checkoutPath(product);
    }
  }

  // Zadeyo affiliate / legacy product paths → internal checkout
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fskin-changer') || href.includes('/products/skin-changer')) {
    return checkoutPath('skinChanger');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (href.includes('%2Fproducts%2Fcloud-dma') || href.includes('/products/cloud-dma')) {
    return checkoutPath('cloudDma');
  }
  if (
    href.includes('%2Fproducts%2Fcall-of-duty-black-ops-7') ||
    href.includes('/products/call-of-duty-black-ops-7') ||
    href.includes('%2Fproducts%2Fblack-ops-7') ||
    href.includes('/products/black-ops-7')
  ) {
    return checkoutPath('bo7');
  }

  return href;
}
