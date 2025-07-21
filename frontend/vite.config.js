import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  server: {
    open: true,
    port: 8082,
    host: 'localhost',
  },
});
