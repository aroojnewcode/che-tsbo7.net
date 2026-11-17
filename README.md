# cheatsark.com (Ark: Survival Ascended Hacks)

Static marketing site for **Ark: Survival Ascended** PC hacks — built with [Astro](https://astro.build).

**Canonical domain:** `https://cheatsark.com`

## Develop

```bash
npm install
npm run dev
```

## Build / deploy

```bash
npm run env:init   # once — INDEXNOW_KEY in .env
npm run build
npm run deploy
```

Set `PUBLIC_GA_MEASUREMENT_ID` in `.env` and Cloudflare build variables for GA4.

See `docs/SEO-DEPLOY.md` for IndexNow, HTTPS, and legacy URL redirects to the Ark product hub.