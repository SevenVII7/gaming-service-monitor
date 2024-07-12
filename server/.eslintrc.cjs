module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  plugins: ['prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    sourceType: 'module',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'prettier/prettier': [
      1,
      {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        bracketSpacing: true,
        trailingComma: 'none',
        printWidth: 100,
        htmlWhitespaceSensitivity: 'ignore',
        tabWidth: 2
      }
    ],
    'no-control-regex': 0
  }
}
