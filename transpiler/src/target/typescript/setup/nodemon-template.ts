export const nodemonJSONTemplate = {
  watch: ['src', 'bin', 'test', 'scripts'],
  ext: '.ts,.js,.pug,.css',
  ignore: [],
  exec: 'ts-node ./src/index.ts',
};
