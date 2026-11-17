import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

const siteOrigin = (process.env.SITE_ORIGIN || 'https://cheatsark.com').replace(/\/$/, '');

export default defineConfig({
  site: siteOrigin,
  trailingSlash: 'always',
  /** Legacy URLs → 301 via public/_redirects (scripts/emit-redirects.mjs + PATH_REDIRECTS). */
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
