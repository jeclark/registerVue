module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: ['standard', 'prettier'],
  // required to lint *.vue files
  plugins: ['html', 'prettier'],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'no-unused-vars': 0,
    'eol-last': 0,
    semi: [2, 'always', { omitLastInOneLineBlock: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        semi: true
      },
    ]
  },
  globals: {}
};
