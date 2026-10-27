import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
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
]);

export default eslintConfig;
