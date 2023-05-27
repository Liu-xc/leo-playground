module.exports = {
  root: true,

  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      env: {
        browser: true,
        es2016: true
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'standard-with-typescript'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2016,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      plugins: ['react', 'react-hooks', '@typescript-eslint'],
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/space-before-function-paren': 'off'
      }
    }
  ]
}
