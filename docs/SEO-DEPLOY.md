# SEO & canonical host

## Canonical domain

Production canonical origin is **`https://hackstarkov.com`** (`src/config/site.ts`, `scripts/cf-build.mjs`, sitemap finalize).

1. Add **hackstarkov.com** (and `www` if used) as a **Custom Domain** on the Cloudflare Worker `h-ckstarkov-com` in the same account as the zone. Enable **Always Use HTTPS** and a **www → apex** redirect in the zone (Workers `_redirects` must use relative paths only).
2. When the zone is available, uncomment and set `[[routes]]` in `wrangler.toml` (see file comments).
3. In **Google Search Console**, use one **Domain** or **URL-prefix** property for `https://hackstarkov.com/` only.
4. Submit `https://hackstarkov.com/sitemap-index.xml` (also linked from `/robots.txt` on the live host).

Builds set `SITE_ORIGIN` and `SITEMAP_ORIGIN` to hackstarkov.com so sitemap `<loc>` values match HTML `<link rel="canonical">` on the custom domain.

## IndexNow

Set these in **Cloudflare Workers Builds → Variables** (or local `.env` via `npm run env:init`):

| Variable | Purpose |
|----------|---------|
| `SITE_ORIGIN` | `https://hackstarkov.com` |
| `SITEMAP_ORIGIN` | `https://hackstarkov.com` |
| `INDEXNOW_KEY` | 32-char hex; served at `https://hackstarkov.com/<key>.txt` |
| `INDEXNOW_HOST` | `hackstarkov.com` |
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 `G-XXXXXXXXXX` |

`INDEXNOW_KEY` triggers `scripts/indexnow.mjs` after build. `/go/*` are full HTML gateways (`src/pages/go/[slug].astro`) with self-canonical on hackstarkov.com — do not re-add Astro middleware or `serve.mjs` 302s to Zadeyo. HSTS is set in `src/worker.js` and `public/_headers`.

## Meta & structured data

- Per-route titles/descriptions: `src/config/pageSeo.ts`, `pageSeoBlog.ts`, `forumSeo.ts`
- Organization `sameAs`: `PUBLIC_ORG_SAME_AS` or default Discord invite from `src/config/site.ts`
