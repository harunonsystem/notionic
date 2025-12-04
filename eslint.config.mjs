import nextPlugin from 'eslint-config-next'

const eslintConfig = [
  ...nextPlugin,
  {
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
    files: ['lib/gtag.ts'],
    rules: {
      'no-unused-vars': 'off'
    }
  },
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
  }
]

export default eslintConfig
