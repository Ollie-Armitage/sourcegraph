// @ts-check

const config = require('../../jest.config.base')

const exportedConfig = {
  ...config,
  displayName: 'common',
  rootDir: __dirname,
  collectCoverage: false, // Collected through Puppeteer
  roots: ['<rootDir>'],
  verbose: true,
}

module.exports = exportedConfig
