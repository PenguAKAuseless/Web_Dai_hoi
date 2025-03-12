import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    define: {
        "import.meta.env.VITE_API_BASE_URL": JSON.stringify("https://web-dai-hoi.onrender.com"),
    },
    server: {
        port: 5173, // Default Vite port
        open: true,  // Auto-opens in browser
    },
    build: {
        outDir: "dist", // Firebase uses "dist" as the public directory
        emptyOutDir: true,
    }
});