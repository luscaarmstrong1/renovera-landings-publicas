import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@renovera/landing-ui": fileURLToPath(new URL("../../packages/landing-ui/renovera-landing-ui.js", import.meta.url)) } },
});
