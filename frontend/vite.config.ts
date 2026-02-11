import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 443,
        proxy: {
            '/api': {
                target: 'http://api.milliybrendagency.uz',
                changeOrigin: true,
            },
            '/uploads': {
                target: 'http://api.milliybrendagency.uz',
                changeOrigin: true,
            },
        },

    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
})
