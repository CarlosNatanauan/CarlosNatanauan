// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuyacarlos.is-a.dev',  // ✅ This tells Astro your site’s canonical URL
  // Emits sitemap-index.xml + sitemap-0.xml at build time, off `site` above.
  // public/robots.txt points crawlers at it.
  build: {
    // All CSS inlined into the document. Measured against the external-file
    // build: 59,756 bytes gzipped in one request, versus 60,911 across three
    // with two of them render-blocking. Smaller *and* fewer round trips —
    // gzip does better with the stylesheet inside the larger HTML stream.
    // The trade is that CSS is no longer cached separately between the two
    // pages, which is irrelevant at this size and at Pages' 600s max-age.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      // The 404 is marked noindex and is not a destination — it has no
      // business in a list of the site's pages.
      filter: (page) => !page.includes('/404'),
    }),
  ],
  // Warms the case study's HTML when a link to it is hovered. Not `viewport`:
  // that would pull the page down for everyone who merely scrolls past the
  // card, and it is the heaviest document on the site.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false // 🚀 disables the Astro Dev Toolbar in dev mode
  }  
});
