import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**',
      '.next/**',
      '**/*.test.*',
      'dist/**',
      '.turbo/**'
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        fetch: 'readonly'
      }
    },
    rules: {
      // ESLint is minimal - Biome handles the heavy lifting
    }
  }
]
