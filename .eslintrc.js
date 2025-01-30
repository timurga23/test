module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  rules: {
    'no-unused-vars': 'off', // отключаем базовое правило
    '@typescript-eslint/no-unused-vars': 'off', // отключаем правило typescript
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  extends: ['plugin:prettier/recommended'],
};
