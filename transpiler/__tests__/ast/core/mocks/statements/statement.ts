import { TStatement } from '../../../../../src/types.js';
import { StatementDirector } from '../../builders/statement/statementDirector.js';
import { ArgumentBuilderDirector } from '../../builders/argumentDirector.js';
import { ArgumentListBuilderDirector } from '../../builders/argumentListBuilderDirector.js';

type TestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  statement: TStatement;
};

export const validStatementTestCases: Array<TestCase> = [
  {
    description: 'valid value object evaluation',
    fileId: 'testFile.bl',
    inputBLString: "JestTestStatement { this.ok(response , 'Hello World!' ); }",
    statement: new StatementDirector().buildThisMethodCall(
      'ok',
      new ArgumentListBuilderDirector().buildArgumentListWithArgs([
        new ArgumentBuilderDirector().buildIdentifierArgument('response'),
        new ArgumentBuilderDirector().buildStringArgument('Hello World!'),
      ]),
    ),
  },
];
