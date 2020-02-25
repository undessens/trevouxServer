module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     '@typescript-eslint/type-annotation-spacing':'warn',
     '@typescript-eslint/no-var-requires':'warn',
     "@typescript-eslint/member-delimiter-style":'warn',
      "@typescript-eslint/no-empty-function":'warn',
      "no-unreachable":"warn",
  }
}
