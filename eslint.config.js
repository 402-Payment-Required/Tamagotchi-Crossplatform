const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const security = require('eslint-plugin-security');

module.exports = defineConfig([
  expoConfig,
  security.configs.recommended,
  {
    ignores: ['dist/*'],
  },
  {
    settings: {
      'import/resolver': {
        'babel-module': {
          root: ['./src'],
          alias: {
            '~': ['./src'],
            '@': ['./src'],
          },
        },
      },
    },
    rules: {
      'react/display-name': 'off',
      'import/no-unresolved': ['error', { ignore: ['^@/assets'] }],
    },
  },
]);
