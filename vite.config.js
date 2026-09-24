import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'project-pdf-resources',
    writeBundle(options) {
      for (const directory of ['cmaps', 'standard_fonts', 'wasm']) {
        cpSync(resolve('node_modules/pdfjs-dist', directory), resolve(options.dir, 'pdfjs', directory), { recursive: true });
      }
    }
  }],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        login: resolve(process.cwd(), 'login.html'),
        features: resolve(process.cwd(), 'features.html'),
        pricing: resolve(process.cwd(), 'pricing.html'),
        video: resolve(process.cwd(), 'video.html'),
        demo: resolve(process.cwd(), 'demo.html'),
        dashboard: resolve(process.cwd(), 'dashboard.html'),
        passport: resolve(process.cwd(), 'passport.html')
      }
    }
  }
});
