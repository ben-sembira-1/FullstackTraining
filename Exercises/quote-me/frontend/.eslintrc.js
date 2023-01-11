module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'eslint:recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'file-progress'
  ],
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'file-progress/activate': 1
  },
  settings: {
    progress: {
      hide: false, // hides the progress with spinner. Print's a static `Linting...` text
      successMessage: 'Lint done...'
    }
  }
}
