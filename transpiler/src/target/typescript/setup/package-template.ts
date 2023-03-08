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
    'start:dev': 'nodemon',
    start: 'node dist/index',
    test: 'jest --coverage',
    'test:dev': 'jest --watchAll',
    testWithCoverage: 'jest --coverage',
    'prettier-format': "prettier --config .prettierrc 'src/**/*.ts' --write",
  },
  keywords: [],
  dependencies: {
    dotenv: '^16.0.1',
    uuid: '^8.3.2',
  },
  devDependencies: {
    '@types/node': '^18.0.0',
    '@typescript-eslint/eslint-plugin': '^5.30.6',
    '@typescript-eslint/parser': '^5.30.6',
    'env-cmd': '^10.1.0',
    eslint: '^8.19.0',
    'eslint-config-prettier': '^8.5.0',
    'eslint-plugin-prettier': '^4.2.1',
    nodemon: '^2.0.20',
    prettier: '^2.7.1',
    rimraf: '^3.0.2',
    'ts-node': '^10.8.1',
    typescript: '^4.7.4',
  },
};

export const BL_BOILERPLATE_CORE = {
  '@bitloops/bl-boilerplate-core': '^0.0.6',
};
export const BL_BOILERPLATE_REST_FASTIFY = {
  '@bitloops/bl-boilerplate-infra-rest-fastify': '^0.0.3',
};

export const BL_BOILERPLATE_INFRA_DB_MONGO = {
  '@bitloops/bl-boilerplate-infra-mongo': '*',
};
