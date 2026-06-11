import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ant-choice/',   // 👈 이거 추가 (핵심)
  server: {
    host: true,
  },
})
