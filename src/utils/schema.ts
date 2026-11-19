import type { FaqItem } from '../i18n/types';
import { SITE_LOGO, SITE_URL, SUPPORT_EMAIL } from '../config/site';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';
import { productPlanPriceRange } from '../data/productPricing';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_ORIGIN}/#website`,
    name: 'Call of Duty: Black Ops 7 Hacks',
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description:
      'Shop undetected Call of Duty: Black Ops 7 hacks for PC—player ESP, loot ESP, soft aim, no recoil and stream-proof overlays at cheatsbo7.net.',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: 'Call of Duty: Black Ops 7 Hacks',
    url: `${SITE_ORIGIN}/`,
    logo: absoluteAssetUrl(SITE_LOGO),
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Call of Duty: Black Ops 7 Hacks',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Call of Duty: Black Ops 7 Hacks',
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: { '@type': 'CollectionPage', name: 'Call of Duty: Black Ops 7 Hacks Community Forum', url: canonicalUrl('/forum/') },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

const productOfferSeller = {
  '@type': 'Organization' as const,
  name: 'Call of Duty: Black Ops 7 Hacks',
};

function productOffersBlock(productSlug: string, checkoutUrl: string) {
  const resolvedUrl = offerUrl(checkoutUrl);
  const { low, high, count } = productPlanPriceRange(productSlug);
  const common = {
    url: resolvedUrl,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: productOfferSeller,
  };

  if (count === 1) {
    return {
      '@type': 'Offer',
      ...common,
      price: String(low),
    };
  }

  return {
    '@type': 'AggregateOffer',
    ...common,
    lowPrice: String(low),
    highPrice: String(high),
    offerCount: count,
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  productSlug: string;
  image?: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: 'Call of Duty: Black Ops 7 Hacks',
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers: productOffersBlock(input.productSlug, input.offerUrl),
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
  productSlug?: string;
}) {
  const slugMatch = input.url.replace(/\/$/, '').match(/\/([^/]+)$/);
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    productSlug: input.productSlug ?? slugMatch?.[1] ?? 'lite',
    image: input.image,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'Call of Duty: Black Ops 7 Hacks',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Call of Duty: Black Ops 7 Hacks',
      logo: {
        '@type': 'ImageObject',
        url: absoluteAssetUrl(SITE_LOGO),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}

/** Plain text for FAQ JSON-LD (strip HTML from linked answers). */
export function faqAnswerPlainText(htmlOrText: string, htmlOverride?: string): string {
  const raw = htmlOverride?.trim() ? htmlOverride : htmlOrText;
  return raw.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
