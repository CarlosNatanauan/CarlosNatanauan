// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuyacarlos.is-a.dev',  // ✅ This tells Astro your site’s canonical URL
  vite: {
    plugins: [tailwindcss()]
  },
  devToolbar: {
    enabled: false // 🚀 disables the Astro Dev Toolbar in dev mode
  }  
});
