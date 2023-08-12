import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            "/wander": "http://127.0.0.1:4200",
            "/lig": "http://127.0.0.1:4200",
        }
    }
});
