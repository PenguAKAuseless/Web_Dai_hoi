{
    "name": "attendance_dh_app",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.0.3",
        "exceljs": "^4.4.0",
        "express": "^4.18.2",
        "express-session": "^1.17.3",
        "pg": "^8.7.3",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-router-dom": "^6.3.0",
        "react-chartjs-2": "^5.0.1",
        "chart.js": "^4.0.1",
        "firebase": "^9.6.1" // Added Firebase dependency
    },
    "devDependencies": {
        "vite": "^6.0.0",
        "@vitejs/plugin-react": "^4.0.0"
    },
    "scripts": {
        "backend": "node backend/server.js",
        "start": "vite frontend",
        "build": "vite build frontend",
        "serve": "vite preview frontend"
    }
}