import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  root: './src',
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
        input: {
            main: resolve(__dirname, './src/index.html'),
        }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
    }),
  ],
  assetsInclude: ['**/*.hbs'],
  optimizeDeps: {
    include: ['handlebars'],
  },
});
