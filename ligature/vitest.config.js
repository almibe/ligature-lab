import { defineConfig } from 'vite'

export default defineConfig({
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)', '**/*.test.res.js'],
    },
  })