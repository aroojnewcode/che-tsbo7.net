import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');
if (!fs.existsSync(dist)) {
  console.log(JSON.stringify({ error: 'dist missing — run npm run build first' }));
  process.exit(1);
}

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const htmlFiles = walkHtml(dist);
const broken = [];
const hrefSeen = new Set();

const report = {
  htmlPages: htmlFiles.length,
  noCanonical: [],
  httpCanonical: [],
  externalCanonical: [],
  noindex: [],
  indexable: [],
  noSchema: [],
  noDescription: [],
  noTitle: [],
  canonicalNotHttps: [],
  brokenInternalHrefs: [],
};

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  const can = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!can) report.noCanonical.push(rel);
  else {
    const u = can[1];
    if (u.startsWith('http://')) report.httpCanonical.push({ rel, u });
    if (!u.startsWith('https://')) report.canonicalNotHttps.push({ rel, u });
    if (u.includes('zadeyo.com')) report.externalCanonical.push({ rel, u });
  }

  const robots = html.match(/name="robots" content="([^"]+)"/);
  const noindex = robots?.[1]?.includes('noindex');
  if (noindex) report.noindex.push(rel);
  else report.indexable.push(rel);

  if (!html.includes('application/ld+json') && rel !== '404/index.html')
    report.noSchema.push(rel);

  if (!html.match(/<meta name="description" content="[^"]+"/)) report.noDescription.push(rel);
  if (!html.match(/<title>[^<]+<\/title>/)) report.noTitle.push(rel);

  const re = /href="(\/[^"#?]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    let h = m[1];
    if (!h.endsWith('/') && !path.extname(h)) h = `${h}/`;
    hrefSeen.add(h);
  }
}

for (const h of hrefSeen) {
  const indexPath = h === '/' ? path.join(dist, 'index.html') : path.join(dist, h.slice(1), 'index.html');
  const htmlPath = path.join(dist, `${h.slice(1)}.html`);
  const exists = fs.existsSync(indexPath) || fs.existsSync(htmlPath);
  if (!exists) report.brokenInternalHrefs.push(h);
}

const summary = {
  broken: report.brokenInternalHrefs.length,
  brokenList: report.brokenInternalHrefs,
  noSchema: report.noSchema,
  indexableCount: report.indexable.length,
  noindexCount: report.noindex.length,
};
console.log('AUDIT_SUMMARY', JSON.stringify(summary));
console.log(JSON.stringify(report, null, 2));