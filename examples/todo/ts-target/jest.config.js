// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  // testRegex: './src/.*\\.(test|spec)?\\.(ts|ts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.steps.ts', '**/*.test.ts', '**/*.spec.ts'],
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
    setupFiles: ['<rootDir>config.ts'],
  },
  setupFilesAfterEnv: ['jest-extended/all'],
};
