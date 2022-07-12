const merge = require('just-merge')
const preset = require('config/eslint-preset')

module.exports = merge(preset, {
  rules: {
    '@next/next/no-html-link-for-pages': 'off'
  }
})
