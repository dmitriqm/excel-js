module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  extends: ['eslint:recommended', 'google'],
  rules: {
    semi: 0,
    'comma-dangle': 0,
    'require-jsdoc': 0,
    'object-curly-spacing': 0,
    'quote-props': 0,
    'linebreak-style': 0,
    'space-before-function-paren': 0,
    'operator-linebreak': 0
  },
}
