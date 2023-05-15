import { transpiler } from './index.js';

const input = `
CommandHandler ACommandHandler {
    execute():  (OK(string), Errors()){

    }
}
`;
transpiler.bitloopsCodeToIntermediateModel({
  core: [
    {
      fileContents: input,
      fileName: 'test',
      fileId: 'test',
      boundedContext: 'hello',
      module: 'world',
    },
  ],
});
