import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.ts']},
  {languageOptions: { globals: globals.node }},
  {ignores: ['node_modules/', 'jest.config.js', 'build/']},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      quotes: ['error', 'single']
    },
  },
];
