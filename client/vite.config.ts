import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
        port: 3000,
        host: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@store": path.resolve(__dirname, "src/store"),
            "@api": path.resolve(__dirname, "src/api"),
        },
    },
});
