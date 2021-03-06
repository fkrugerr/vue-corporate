module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['error', 80, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignorePattern: 'class=',
      ignoreTemplateLiterals: false,
    }],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 6,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
