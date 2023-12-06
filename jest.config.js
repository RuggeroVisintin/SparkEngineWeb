/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
  setupFiles: [
    "jest-canvas-mock"
  ],
  setupFilesAfterEnv: ["jest-extended/all"],
  globals: {
    'ts-jest': {
      tsConfig: './test/unit/tsconfig.json'
    }
  }
};