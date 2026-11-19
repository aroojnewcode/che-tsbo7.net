/**
 * Smoke-check checkout + community URLs (status, no redirect loops).
 * Run: npm run seo:links
 */
import { loadDotEnv } from './load-dotenv.mjs';
import { CHECKOUT_URLS } from '../src/config/checkout-redirects.mjs';

loadDotEnv();

const DISCORD_URL = process.env.PUBLIC_DISCORD_URL?.trim() || 'https://discord.gg/Vu85F8auQS';
const TIMEOUT_MS = 15000;
const MAX_REDIRECTS = 8;

const urls = [...new Set([...Object.values(CHECKOUT_URLS), DISCORD_URL])];

async function checkUrl(url, chain = []) {
  if (chain.length > MAX_REDIRECTS) {
    return { url, ok: false, error: 'Redirect loop or too many redirects' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'User-Agent': 'cheatsbo7-seo-link-check/1.0' },
    });
    clearTimeout(timer);

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) return { url, ok: false, status: res.status, error: 'Redirect without Location' };
      const next = new URL(location, url).href;
      return checkUrl(next, [...chain, url]);
    }

    const ok = res.status >= 200 && res.status < 400;
    return { url, ok, status: res.status, final: res.url };
  } catch (err) {
    clearTimeout(timer);
    return { url, ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

const results = [];
for (const url of urls) {
  results.push(await checkUrl(url));
}

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  const mark = r.ok ? 'OK' : 'FAIL';
  const detail = r.status ? `HTTP ${r.status}` : r.error ?? '';
  console.log(`${mark}  ${r.url}  ${detail}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} URL(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} external URL(s) OK.`);