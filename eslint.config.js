import tseslint from 'typescript-eslint'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**',
      '.next/**',
      '**/*.test.*',
      'dist/**',
      '.turbo/**',
      'coverage/**'
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]
