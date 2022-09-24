import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';
import eslint from 'vite-plugin-eslint';
import path from 'path';

const pwaConfig = VitePWA({
  registerType: 'prompt',
  strategies: 'injectManifest',
  srcDir: 'src',
  filename: 'sw.ts',
  devOptions: {
    enabled: true,
    type: 'module',
  },
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
