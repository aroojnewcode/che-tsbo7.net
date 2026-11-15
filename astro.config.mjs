import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

const siteOrigin = (process.env.SITE_ORIGIN || 'https://hackstarkov.com').replace(/\/$/, '');

export default defineConfig({
  site: siteOrigin,
  trailingSlash: 'always',
  redirects: {
    '/products/arcraider-hacks/': '/products/tarkov-hacks/',
    '/blog/eac-patch/': '/blog/be-patch/',
    '/blog/eac-error/': '/blog/be-error/',
    '/forum/eac-init/': '/forum/be-init/',
    '/go/arc-raiders/': '/go/tarkov/',
    '/cheats/': '/products/tarkov-hacks/',
    '/cheats/lite/': '/products/tarkov-hacks/',
    '/cheats/pro/': '/products/tarkov-hacks/',
    '/cheats/elite/': '/products/tarkov-hacks/elite/',
    '/cheats/compare/': '/blog/lite-vs-pro/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
});
