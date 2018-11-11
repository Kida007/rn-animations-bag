'use strict';

module.exports = {
  extends: 'airbnb',
  rules: {
    'class-methods-use-this': 1,
    'no-nested-ternary': 0,
    'consistent-return': 1,
    'function-paren-newline': 1,
    'react/prop-types': 0,
    'react/no-typos': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'no-use-before-define': 0,
    'no-console': 1,
    'no-else-return': 1,
    'no-param-reassign': 1,
    'no-underscore-dangle': ['error', { allow: ['_id', '__STATE'] }],
    'object-curly-newline': 0,
    'semi': ['error', 'always'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 0,
    'max-len': ['error', 100],
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', __dirname],
      },
    },
  },
};