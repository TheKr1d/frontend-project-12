import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5002,
    watch: {
      usePolling: true,
    },
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5002',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5002',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});