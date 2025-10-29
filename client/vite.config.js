import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuration corrigée pour Render (erreur react/jsx-runtime)
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Empêche Vite/Rollup de tenter de résoudre "react/jsx-runtime"
      external: ['react/jsx-runtime'],
    },
  },
})
