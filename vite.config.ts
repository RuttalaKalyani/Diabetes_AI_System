
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Simplified configuration to avoid process.cwd() issues and adhere to GenAI environment rules
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
});
