const baseConfig = require('./jest.config');
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...baseConfig,
  coverageDirectory: '.coverage',
  collectCoverage: true
};