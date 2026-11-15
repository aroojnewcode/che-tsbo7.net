import { defineMiddleware } from 'astro:middleware';

/** /go/* checkout gateways are static pages (see pages/go/[slug].astro); no server redirects. */
export const onRequest = defineMiddleware((_context, next) => next());