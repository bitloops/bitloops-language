export default {
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      {
        // SWC options
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2021',
        },
      },
    ],
  },
  testRegex: '(__tests__\\/)(.*)(test|spec|steps)(\\.)(m)?ts$',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(m)?js$': '$1',
  },
  // Other Jest options
};
