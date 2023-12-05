/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
  setupFiles: [
    "jest-canvas-mock"
  ]
};