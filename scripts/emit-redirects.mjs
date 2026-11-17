/**
 * Emit Cloudflare Workers / Pages _redirects from PATH_REDIRECTS (301 + slash pairs).
 * Run before astro build so public/_redirects is copied into dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { PATH_REDIRECTS } from './redirects.mjs';

const root = process.cwd();

/** Ensure target has trailing slash when it is an internal path (matches site trailingSlash: always). */
function normalizeTarget(target) {
  if (!target.startsWith('/')) return target;
  if (target === '/') return target;
  return target.endsWith('/') ? target : `${target}/`;
}

/** For each source path, emit with and without trailing slash (except file-like paths). */
function expandSources(from) {
  const out = new Set([from]);
  if (from === '/') return out;
  const skip = /\.[a-z0-9]+$/i.test(from);
  if (skip) return out;
  if (from.endsWith('/')) out.add(from.slice(0, -1) || '/');
  else out.add(`${from}/`);
  return out;
}

/** Canonical path key (trailing slash) so we skip no-op / redirect-loop rules. */
function pathKey(path) {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

function buildRedirectLines() {
  const lines = new Set();

  for (const [from, to] of PATH_REDIRECTS) {
    const target = normalizeTarget(to);
    const targetKey = pathKey(target);
    for (const source of expandSources(from)) {
      if (pathKey(source) === targetKey) continue;
      lines.add(`${source} ${target} 301`);
    }
  }

  return [...lines].sort((a, b) => a.localeCompare(b));
}

const body = `${buildRedirectLines().join('\n')}\n`;
const publicPath = path.join(root, 'public', '_redirects');
fs.mkdirSync(path.dirname(publicPath), { recursive: true });
fs.writeFileSync(publicPath, body, 'utf8');

const distPath = path.join(root, 'dist', '_redirects');
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.writeFileSync(distPath, body, 'utf8');
}

console.log(`Emitted ${body.split('\n').filter(Boolean).length} redirect rule(s) → public/_redirects`);