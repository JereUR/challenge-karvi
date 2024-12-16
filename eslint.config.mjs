import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended'
  ),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn', // Cambia a "off" para deshabilitar completamente la regla
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true }
      ],
      semi: ['error', 'never']
    }
  }
]

export default eslintConfig
