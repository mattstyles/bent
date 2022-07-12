const transpileTargets = require('./transpileTargets.config')

const createTranspileModulesPlugin = require('next-transpile-modules')
const withTM = createTranspileModulesPlugin(transpileTargets)

function chain(...args) {
  return (conf) =>
    args.reduce((conf, fn) => {
      return fn(conf)
    }, conf)
}

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    reactRoot: true,
  },
}

const plugins = chain(withTM)
module.exports = plugins(config)

