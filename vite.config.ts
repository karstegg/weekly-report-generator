import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Only use base path in production for GitHub Pages
  base: mode === 'production' ? '/weekly-report-generator/' : '/',
}))
