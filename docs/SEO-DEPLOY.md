# SEO & canonical host

## Canonical domain

Production canonical origin is **`https://cheatsark.com`** (`src/config/site.ts`, `scripts/cf-build.mjs`, sitemap finalize).

1. Add **cheatsark.com** (and `www` if used) as a **Custom Domain** on the Cloudflare Worker `cheatsark-com` in the same account as the zone. Enable **Always Use HTTPS** and a **www → apex** redirect in the zone (Workers `_redirects` must use relative paths only).
2. When the zone is available, uncomment and set `[[routes]]` in `wrangler.toml` (see file comments).
3. In **Google Search Console**, use one **Domain** or **URL-prefix** property for `https://cheatsark.com/` only.
4. Submit `https://cheatsark.com/sitemap-index.xml` (also linked from `/robots.txt` on the live host).

Builds set `SITE_ORIGIN` and `SITEMAP_ORIGIN` to cheatsark.com so sitemap `<loc>` values match HTML `<link rel="canonical">` on the custom domain.

`npm run build` runs `scripts/emit-redirects.mjs`, which generates **`public/_redirects`** from `PATH_REDIRECTS` in `scripts/redirects.mjs` (301 + slash variants). Legacy Astro HTML redirect stubs are not used in production—edge 301s only.

`/go/*` checkout gateway pages stay indexable but are **omitted from the sitemap** (`src/config/sitemap.ts`).

## IndexNow

Set these in **Cloudflare Workers Builds → Variables** (or local `.env` via `npm run env:init`):

| Variable | Purpose |
|----------|---------|
| `SITE_ORIGIN` | `https://cheatsark.com` |
| `SITEMAP_ORIGIN` | `https://cheatsark.com` |
| `INDEXNOW_KEY` | 32-char hex; served at `https://cheatsark.com/<key>.txt` |
| `INDEXNOW_HOST` | `cheatsark.com` |
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 `G-XXXXXXXXXX` |

`INDEXNOW_KEY` triggers `scripts/indexnow.mjs` after build. `/go/*` are full HTML gateways (`src/pages/go/[slug].astro`) with self-canonical on cheatsark.com — do not re-add Astro middleware or `serve.mjs` 302s to Zadeyo. HSTS is set in `src/worker.js` and `public/_headers`.

## Meta & structured data

- Per-route titles/descriptions: `src/config/pageSeo.ts`, `pageSeoBlog.ts`, `forumSeo.ts`
- Organization `sameAs`: `PUBLIC_ORG_SAME_AS` or default Discord invite from `src/config/site.ts`
