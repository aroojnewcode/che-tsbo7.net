import fs from 'node:fs';
import path from 'node:path';
import { PATH_REDIRECTS } from './redirects.mjs';

const root = process.cwd();

/** Paths that 301 at the edge (no static HTML). */
const redirectSources = new Set();
for (const [from] of PATH_REDIRECTS) {
  redirectSources.add(from);
  redirectSources.add(from.endsWith('/') && from !== '/' ? from.slice(0, -1) : `${from}/`);
}
const dist = path.join(root, 'dist');

function walkHtml(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (ent.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

function urlPathFromFile(file) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function resolveInternal(href) {
  let p = href.split('#')[0].split('?')[0];
  if (!p.startsWith('/')) return null;
  if (p !== '/' && !p.endsWith('/') && !/\.\w{2,5}$/i.test(p)) p = `${p}/`;
  const disk = path.join(dist, p.replace(/^\//, ''), 'index.html');
  const disk404 = path.join(dist, p.replace(/^\//, ''));
  if (fs.existsSync(disk) || fs.existsSync(disk404)) return true;
  if (p === '/rss.xml' && fs.existsSync(path.join(dist, 'rss.xml'))) return true;
  return false;
}

const files = walkHtml(dist);
const report = {
  pageCount: files.length,
  canonical: { ok: 0, http: [], wrongHost: [], missing: [] },
  robots: { indexable: 0, noindex: [] },
  https: { mixedContentLinks: [] },
  schema: { withJsonLd: 0, without: [] },
  links: { brokenInternal: [] },
  sitemap: {},
};

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const page = urlPathFromFile(file);

  const can = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!can) report.canonical.missing.push(page);
  else if (can[1].startsWith('http://')) report.canonical.http.push({ page, href: can[1] });
  else if (!can[1].startsWith('https://cheatsark.com')) report.canonical.wrongHost.push({ page, href: can[1] });
  else report.canonical.ok += 1;

  if (/name="robots" content="noindex/i.test(html)) report.robots.noindex.push(page);
  else report.robots.indexable += 1;

  const ldCount = (html.match(/application\/ld\+json/g) ?? []).length;
  if (ldCount > 0) report.schema.withJsonLd += 1;
  else report.schema.without.push(page);

  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const h = m[1];
    if (h.startsWith('http://') && !h.includes('w3.org')) {
      report.https.mixedContentLinks.push({ page, href: h });
    }
    if (h.startsWith('/') && !h.startsWith('//')) {
      const bare = h.split('#')[0].split('?')[0];
      const normalized =
        bare !== '/' && !bare.endsWith('/') && !/\.\w{2,5}$/i.test(bare) ? `${bare}/` : bare;
      if (!redirectSources.has(bare) && !redirectSources.has(normalized) && !resolveInternal(h)) {
        report.links.brokenInternal.push({ page, href: h });
      }
    }
  }
}

const seen = new Set();
report.links.brokenInternal = report.links.brokenInternal.filter((x) => {
  const k = `${x.page}|${x.href}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const sitemapPath = path.join(root, 'public', 'sitemap-0.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  report.sitemap.urlCount = locs.length;
  report.sitemap.httpUrls = locs.filter((u) => u.startsWith('http://'));
  report.sitemap.redirectStubPaths = locs.filter(
    (u) =>
      u.includes('/arcraider') ||
      u.includes('/eac-error') ||
      u.includes('/eac-patch') ||
      u.includes('/contact/') ||
      u.includes('/go/arc-raiders'),
  );
  const htmlPaths = new Set(files.map(urlPathFromFile));
  report.sitemap.inSitemapNotBuilt = locs
    .map((u) => {
      try {
        return new URL(u).pathname;
      } catch {
        return '';
      }
    })
    .filter((p) => p && !htmlPaths.has(p));
  report.sitemap.builtNotInSitemap = [...htmlPaths].filter(
    (p) => p !== '/404.html' && !p.includes('404') && !locs.some((loc) => new URL(loc).pathname === p),
  );
}

console.log(JSON.stringify(report, null, 2));