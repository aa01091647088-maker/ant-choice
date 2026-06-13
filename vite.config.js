import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',      // ← 이걸로 변경
  server: {
    host: true,
  },
})