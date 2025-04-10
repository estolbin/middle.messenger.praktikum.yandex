import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
    root: "./src",
    plugins: [handlebars({
        context: {
            title: "Hello, world!",
        }
    })]
})