import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import path from 'path'
import fs from 'fs'

function registerComponents() {
    const componentsDir = path.resolve(__dirname, './src/components');
    const partials = {};
    
    fs.readdirSync(componentsDir).forEach(folder => {
      const hbsPath = path.join(componentsDir, folder, `${folder}.hbs`);
      if (fs.existsSync(hbsPath)) {
        partials[folder] = fs.readFileSync(hbsPath, 'utf-8');
      }
    });
    
    return partials;
  }

export default defineConfig({
    root: "./src",
    css: {
        postcss: './postcss.config.js'
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true
    },
    server: {
        port: 3000
    },
    plugins: [
        handlebars({
            partialDirectory: './src/components',
            partials: registerComponents(),
        })
    ],
    assetsInclude: ['**/*.hbs'],
    optimizeDeps: {
        include: ['handlebars']
    }
})