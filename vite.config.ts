import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  base: '/',               // correct for a custom domain
  plugins: [react(), tailwind()],
  build: {
    assetsDir: 'assets',   // make sure CSS/JS go to /assets
    sourcemap: false
  }
})

