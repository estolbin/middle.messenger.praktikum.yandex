import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'



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
            partialDirectory: resolve(__dirname, './src/components'),
        })
    ],
    assetsInclude: ['**/*.hbs'],
    optimizeDeps: {
        include: ['handlebars']
    }
})
