import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html}',
          '**/*.{woff2,woff,ttf,otf}',
          '**/*.{json,webmanifest,ico,png,svg}'
        ]
      },
      manifest: {
        name: 'Gym Tools',
        short_name: 'Gym Tools',
        description: 'Essential tools for your gym sessions',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0f0f1a',
        background_color: '#0f0f1a',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
