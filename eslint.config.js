import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: { globals: globals.node },
    rules: {
      // Turn theses off
      'no-mixed-spaces-and-tabs': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // Warnings
      'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      indent: ['warn', 2, { SwitchCase: 1 }],
      'no-console': 'warn',
      'max-lines': ['warn', { max: 1000 }],

      // Errors
      'no-undef': 'error',
      'no-unreachable': 'error',
      eqeqeq: ['error', 'always'],
      quotes: ['error', 'single'],
      semi: ['error', 'always']
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
