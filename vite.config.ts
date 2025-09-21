// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // base can be omitted for root-domain deploys
  plugins: [react()],
})
