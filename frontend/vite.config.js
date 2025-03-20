import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Default Vite port
        open: true,  // Auto-opens in browser
    },
    build: {
        outDir: "dist", // Firebase uses "dist" as the public directory
        emptyOutDir: true,
    }
});