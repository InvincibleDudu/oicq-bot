module.exports = {
   env: {
      browser: true,
      commonjs: true,
      es2021: true
   },
   extends: 'standard-with-typescript',
   overrides: [],
   parserOptions: {
      ecmaVersion: 'latest',
      project: ['./tsconfig.json'] // Specify it only for TypeScript files
   },
   rules: {
      indent: ['error', 3, { SwitchCase: 1 }],
      'comma-dangle': ['error', { arrays: 'only-multiline', objects: 'only-multiline' }],
      'multiline-ternary': 'off',
      'array-callback-return': 'off',
      '@typescript-eslint/indent': ['error', 3],
      '@typescript-eslint/explicit-function-return-type': 'off'
   }
}
