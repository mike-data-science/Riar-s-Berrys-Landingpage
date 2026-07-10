import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    fs: {
      allow: [
        'C:/Users/Mike/.gemini/antigravity-ide/brain/1afc9f8e-8a90-46fe-b05d-18957946fcc4',
        '.'
      ]
    }
  }
})
