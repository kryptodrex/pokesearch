import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    extensions: ['.vue', '.js', '.json']
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-injects variables into every SCSS context (no manual @use needed).
        // _variables.scss must contain only variable declarations — no CSS output.
        additionalData: `@use "@/styling/variables" as *;`
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
