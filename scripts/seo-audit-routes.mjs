import fs from 'node:fs';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

function walkHtml(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walkHtml(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const routePrefix =
  /^\/(?:blog|forum|products|go|faq|support|about|privacy|terms|reviews|cheats|contact|$)/;
const hrefs = new Set();

for (const file of walkHtml(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]+)"/g)) {
    let h = m[1];
    if (!routePrefix.test(h === '/' ? '/' : h)) continue;
    if (!h.endsWith('/') && !path.extname(h)) h = `${h}/`;
    hrefs.add(h);
  }
}

const missing = [];
for (const h of hrefs) {
  const indexPath = h === '/' ? path.join(dist, 'index.html') : path.join(dist, h.slice(1), 'index.html');
  if (!fs.existsSync(indexPath)) missing.push(h);
}

console.log(JSON.stringify({ checked: hrefs.size, missing }, null, 2));