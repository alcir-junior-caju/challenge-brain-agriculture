import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  entryPoints: ['src/**/*.ts', '!**/test/**'],
  outDir: 'dist',
  minify: true,
  clean: true
})
