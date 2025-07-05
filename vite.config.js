import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses for Render compatibility
    port: 5173, // Optional: Render sets $PORT, but this is a safe default
  },
})
