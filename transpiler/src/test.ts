import { transpiler } from './index.js';

const input = `
CommandHandler ACommandHandler() {
    execute(command: AddTodoCommand):  (OK(string), Errors()){
        const title = TitleVO.create({ title: command.title });
    }
}
`;

const input2 = `Command AddTodoCommand {
    string title;
}`;
transpiler.bitloopsCodeToIntermediateModel({
  core: [
    {
      fileContents: input,
      fileName: 'test',
      fileId: 'test',
      boundedContext: 'hello',
      module: 'world',
    },
    {
      fileContents: input2,
      fileName: 'test2',
      fileId: 'test2',
      boundedContext: 'hello',
      module: 'world',
    },
  ],
  setup: [
    {
      fileContents: 'Config.setLanguage(TypeScript-Nest);',
      fileId: 'config',
    },
  ],
});
