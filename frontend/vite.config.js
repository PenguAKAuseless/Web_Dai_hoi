import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        historyApiFallback: true, // Ensures React Router works correctly with SPA
    },
    base: '/', // Ensures React Router works correctly
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: undefined, // Ensures one bundle for SPA behavior
            },
        },
    },
});