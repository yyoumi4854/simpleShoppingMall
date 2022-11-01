import { defineConfig } from 'vite'
import { reactRouterPlugin } from 'vite-plugin-next-react-router';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRouterPlugin()],
})