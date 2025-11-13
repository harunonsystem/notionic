import path from 'node:path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
})

const config = [
  js.configs.recommended,

  ...compat.config({
    extends: ['next/core-web-vitals']
  }),

  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      '.git/**',
      '.history/**',
      'coverage/**',
      '*.d.ts'
    ]
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  },

  {
    files: ['**/*.test.{js,jsx,ts,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off'
    }
  },

  {
    files: ['setupTests.ts'],
    languageOptions: {
      globals: {
        IntersectionObserverCallback: 'readonly',
        IntersectionObserverInit: 'readonly',
        IntersectionObserverEntry: 'readonly'
      }
    }
  },

  {
    files: ['lib/gtag.ts'],
    rules: {
      'no-unused-vars': 'off'
    }
  }
]

export default config
