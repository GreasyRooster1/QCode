import { defineConfig } from 'vite'
import { resolve } from 'path';
import path from 'path';

export default defineConfig({
    // Root directory (where index.html is located)
    root: './src',

    // Base public path when served in production
    base: '/',

    build: {
        // Output directory for the production build
        outDir: 'artifact',
        // Options for the underlying Rollup bundler
        rollupOptions: {
            input: {
                main: resolve(__dirname, '/index.html'),
                login: resolve(__dirname, '/login.html'),
                adminLogin: resolve(__dirname, '/adminLogin.html'),
                adminConsole: resolve(__dirname, '/adminConsole.html'),
                editor: resolve(__dirname, '/editor.html'),
                editProfile: resolve(__dirname, '/editProfile.html'),
                exec: resolve(__dirname, '/exec.html'),
                lessons: resolve(__dirname, '/lessons.html'),
                shareBoard: resolve(__dirname, '/shareBoard.html'),
                sharedProject: resolve(__dirname, '/sharedProject.html'),
            },
        }
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/'),
            '@style': path.resolve(__dirname, '/style'),
            '@js': path.resolve(__dirname, '/js'),
        },
    },

    server: {
        // Port to run the dev server on
        port: 3000,
        // Open the browser automatically
        open: true
    }
})
