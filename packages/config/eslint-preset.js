module.exports = {
  extends: ['next', 'prettier'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/', 'challenges/*/'],
    },
  },
  plugins: ['react-hooks'],
  rules: {
    'react/jsx-key': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
}

