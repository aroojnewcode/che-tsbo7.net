# cheatsbo7.net (Call of Duty: Black Ops 7 Hacks)

Static marketing site for **Call of Duty: Black Ops 7** PC hacks — built with [Astro](https://astro.build).

**Canonical domain:** `https://cheatsbo7.net`

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

See `docs/SEO-DEPLOY.md` for IndexNow, HTTPS, and legacy URL redirects to the BO7 product hub.