import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import path from 'path';

const manifest: Partial<ManifestOptions> = {
  name: 'Rigel',
  short_name: 'Rigel',
  description: 'La WebApp de los profesores de Bolivia.',
  lang: 'es',
  start_url: '/',
  display: 'standalone',
  theme_color: '#0894b3',
  icons: [
    {
      src: '/logo.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'logo.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any mascable',
    },
  ],
};

const pwaConfig = VitePWA({
  registerType: 'autoUpdate',
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  devOptions: {
    enabled: true,
    type: 'module',
  },
  manifest,
});

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
  plugins: [solidPlugin(), eslint(), pwaConfig],
  server: {
    port: 3030,
  },
  build: {
    target: 'esnext',
  },
});
