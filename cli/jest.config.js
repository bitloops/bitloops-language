export default {
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      compiler: 'ttypescript',
    },
    setupFiles: ['<rootDir>config.js'],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec|steps))\\.(m)?ts$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.mts',
    '!src/**/*.d.ts',
    '!src/**/*.d.mts',
  ],
  setupFilesAfterEnv: ['jest-extended/all'],
  transform: {},
  // "extensionsToTreatAsEsm": [".ts"]
};
