import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@renovera/landing-ui": "C:/Users/lucas/Documents/Codex/2026-08-21/im/Renovera-IT-Control-Center/shared-ui/renovera-landing-ui.js" } },
});
