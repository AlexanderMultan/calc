import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  base: './',
  server: {
    open: true,
  },
  plugins: [cssInjectedByJsPlugin()],
});
