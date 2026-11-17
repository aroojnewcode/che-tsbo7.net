const HSTS = 'max-age=31536000; includeSubDomains; preload';

/** Serve sitemap XML with a real application/xml content-type on every host. */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.protocol === 'http:' && url.hostname === 'cheatsark.com') {
      const target = new URL(request.url);
      target.protocol = 'https:';
      if (target.hostname === 'www.cheatsark.com') {
        target.hostname = 'cheatsark.com';
      }
      return Response.redirect(target.toString(), 301);
    }

    if (url.hostname === 'www.cheatsark.com') {
      const target = new URL(request.url);
      target.protocol = 'https:';
      target.hostname = 'cheatsark.com';
      return Response.redirect(target.toString(), 301);
    }

    const path = url.pathname.replace(/\/$/, '') || '/';

    if (path === '/robots.txt') {
      const origin = `https://${url.host === 'www.cheatsark.com' ? 'cheatsark.com' : url.host}`;
      const body = `User-agent: *
Allow: /

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

    if (isSitemap) {
      const assetUrl = new URL(request.url);
      assetUrl.pathname = path;
      const res = await env.ASSETS.fetch(new Request(assetUrl, request));
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

    const assetResponse = await env.ASSETS.fetch(request);
    const headers = new Headers(assetResponse.headers);
    headers.set('Strict-Transport-Security', HSTS);
    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    });
  },
};