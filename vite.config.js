import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // for Vue 3
// import { createVuePlugin as vue } from "vite-plugin-vue2"; // for Vue 2

const path = require("path");
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  define: {
    "process.env": {},
  },
});