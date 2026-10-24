// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://joaocnh.dev',
  integrations: [
    mdx(),
    sitemap(),
    react({ include: ['**/react/*'] }),
    svelte(),
    solid({ include: ['**/solid/*'] }),
  ],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
