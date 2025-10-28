import tseslint from 'typescript-eslint'
import next from '@next/eslint-plugin-next'

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '**/*.test.*',
      'dist/**',
      '.turbo/**',
      'coverage/**'
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@next/next': next
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn'
    }
  }
]
