import { FlatCompat } from '@eslint/eslintrc';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@next/next/no-img-element': 'off'
    }
  },
  {
    ignores: [
      'node_modules/',
      'build/',
      '.next/',
      'dist/',
      '*.min.js',
      '*.min.mjs',
      'public/pdf.worker.min.js',
      '.vercel/',
      'coverage/',
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts'
    ]
  }
];

export default eslintConfig;
