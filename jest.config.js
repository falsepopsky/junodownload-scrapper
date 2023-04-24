/** @type {import('jest').Config} */

export default {
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'text'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.m?[tj]s?$': '@swc/jest',
  },
  collectCoverageFrom: ['src/core/*.ts', '!src/**/*.d.ts', '!src/core/index.ts'],
};