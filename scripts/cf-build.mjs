import { spawnSync } from 'node:child_process';
import { loadDotEnv } from './load-dotenv.mjs';

loadDotEnv();

/** Cloudflare Builds: bake canonical URLs for cheatsark.com (override with SITE_ORIGIN / SITEMAP_ORIGIN in CI if needed). */
const productionOrigin = 'https://cheatsark.com';
process.env.SITE_ORIGIN ||= productionOrigin;
process.env.SITEMAP_ORIGIN ||= productionOrigin;

const result = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
