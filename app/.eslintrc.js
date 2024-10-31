module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['prettier'],
  rules: {
    'import/order': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
  },
};
