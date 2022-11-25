export const packageJSONTemplate = {
  name: '',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  engines: {
    node: '> 16.13.0',
  },
  scripts: {
    'build:public': 'cd public/app && npm run build',
    'start:public': 'cd public/app && npm run start',
    build: 'rimraf ./dist && tsc',
    'start:dev': 'nodemon ',
    start: 'node dist/index',
    test: 'jest --coverage',
    'test:dev': 'jest --watchAll',
    testWithCoverage: 'jest --coverage',
    'prettier-format': "prettier --config .prettierrc 'src/**/*.ts' --write",
  },
  husky: {
    hooks: {
      'pre-commit': 'npm run build',
      'pre-push': 'npm run build',
    },
  },
  keywords: [],
  dependencies: {
    '@types/bcrypt-nodejs': '0.0.31',
    compression: '^1.7.4',
    dompurify: '^2.3.8',
    dotenv: '^16.0.1',
    helmet: '^5.1.0',
    jsdom: '^20.0.0',
    morgan: '^1.10.0',
    uuid: '^8.3.2',
    validator: '^13.7.0',
  },
  devDependencies: {
    '@types/dompurify': '^2.3.3',
    // '@types/jest': '^28.1.3',
    '@types/jsdom': '^20.0.0',
    '@types/node': '^18.0.0',
    '@types/randomatic': '^3.1.3',
    '@types/validator': '^13.7.4',
    // '@typescript-eslint/eslint-plugin': '^5.30.6',
    // '@typescript-eslint/parser': '^5.30.6',
    // 'env-cmd': '^10.1.0',
    // eslint: '^8.19.0',
    // 'eslint-config-prettier': '^8.5.0',
    // 'eslint-plugin-prettier': '^4.2.1',
    nodemon: '^2.0.20',
    husky: '^8.0.1',
    // jest: '^28.1.3',
    // 'jest-cucumber': '^3.0.1',
    // 'jest-extended': '^3.0.1',
    // 'jest-ts-auto-mock': '^2.1.0',
    prettier: '^2.7.1',
    rimraf: '^3.0.2',
    // 'ts-auto-mock': '^3.6.2',
    // 'ts-jest': '^28.0.7',
    'ts-node': '^10.8.1',
    // ttypescript: '^1.5.13',
    typescript: '^4.7.4',
  },
};
