import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths(), react()],

  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './setupTests.ts'
  }
})
