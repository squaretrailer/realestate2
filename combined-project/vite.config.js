import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';   // ✅ Add this import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),                             // ✅ Add the plugin
  ],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});