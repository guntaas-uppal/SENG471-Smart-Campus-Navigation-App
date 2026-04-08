// vite.config.js
// SCRUM-25: Vite build config with React plugin

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
