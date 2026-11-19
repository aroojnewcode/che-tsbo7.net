const HSTS = 'max-age=31536000; includeSubDomains; preload';

/** Serve sitemap XML with a real application/xml content-type on every host. */
export default {
  async fetch(request, env) {
    const assets = env.ASSETS;
    const url = new URL(request.url);

    if (url.protocol === 'http:' && url.hostname === 'cheatsbo7.net') {
      const target = new URL(request.url);
      target.protocol = 'https:';
      if (target.hostname === 'www.cheatsbo7.net') {
        target.hostname = 'cheatsbo7.net';
      }
      return Response.redirect(target.toString(), 301);
    }

    if (url.hostname === 'www.cheatsbo7.net') {
      const target = new URL(request.url);
      target.protocol = 'https:';
      target.hostname = 'cheatsbo7.net';
      return Response.redirect(target.toString(), 301);
    }

    const path = url.pathname.replace(/\/$/, '') || '/';

    if (path === '/robots.txt') {
      const origin = `https://${url.host === 'www.cheatsbo7.net' ? 'cheatsbo7.net' : url.host}`;
      const body = `User-agent: *
Allow: /
Disallow: /go/

Sitemap: ${origin}/sitemap-index.xml
`;
      return new Response(body, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Strict-Transport-Security': HSTS,
        },
      });
    }

    const isSitemap =
      path === '/sitemap.xml' ||
      path === '/sitemap-index.xml' ||
      path === '/sitemap-pages.xml' ||
      path === '/sitemap-blog.xml' ||
      path === '/sitemap-forum.xml' ||
      path === '/sitemap-0.xml';

    if (!assets?.fetch) {
      return new Response('Site deploy incomplete (missing static assets). Re-run Cloudflare build.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Strict-Transport-Security': HSTS },
      });
    }

    if (isSitemap) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = path;
      const res = await assets.fetch(new Request(assetUrl, request));
      if (res.ok) {
        const headers = new Headers(res.headers);
        if (path.endsWith('.xml')) {
          headers.set('Content-Type', 'application/xml; charset=utf-8');
        } else {
          headers.set('Content-Type', 'text/plain; charset=utf-8');
        }
        headers.set('Strict-Transport-Security', HSTS);
        return new Response(res.body, { status: 200, headers });
      }
    }

    const assetResponse = await assets.fetch(request);
    const headers = new Headers(assetResponse.headers);
    headers.set('Strict-Transport-Security', HSTS);
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};