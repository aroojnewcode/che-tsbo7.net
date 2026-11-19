const HSTS = 'max-age=31536000; includeSubDomains; preload';

/** Minimal edge wrapper: HTTPS/www redirects, then static assets from dist/. */
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.protocol === 'http:' && (url.hostname === 'cheatsbo7.net' || url.hostname === 'www.cheatsbo7.net')) {
        const target = new URL(request.url);
        target.protocol = 'https:';
        target.hostname = 'cheatsbo7.net';
        return Response.redirect(target.toString(), 301);
      }

      if (url.hostname === 'www.cheatsbo7.net') {
        const target = new URL(request.url);
        target.protocol = 'https:';
        target.hostname = 'cheatsbo7.net';
        return Response.redirect(target.toString(), 301);
      }

      const assets = env.ASSETS;
      if (!assets?.fetch) {
        return new Response('Deploy incomplete: static assets missing. Re-run the Cloudflare build.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }

      const response = await assets.fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Strict-Transport-Security', HSTS);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Worker error';
      return new Response(`Site temporarily unavailable (${message}).`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
  },
};