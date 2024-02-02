const baseConfig = require('./jest.config');
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...baseConfig,
  coverageDirectory: '.coverage',
  coverageReporters: ['text', 'json-summary', 'json'],
  collectCoverage: true,
};