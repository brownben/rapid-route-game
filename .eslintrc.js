module.exports = {
  extends: ['alloy', 'alloy/vue'],

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },

  globals: {
    document: false,
    navigator: false,
    window: false,
    global: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },

  rules: {
    camelcase: ['error', { properties: 'never' }],
    radix: 'off',
    complexity: 'off',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'no-console': 'warn',
    'no-lonely-if': 'error',
    'no-plusplus': 'error',
    'no-unneeded-ternary': 'error',
    'no-ternary': 'error',
    'no-useless-return': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-await': 'error',
    'sort-vars': 'error',
    'max-params': ['error', { max: 4 }],
    'vue/component-tags-order': [
      'error',
      { order: ['template', 'script', 'style'] },
    ],
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: false,
      },
    ],
  },
}
