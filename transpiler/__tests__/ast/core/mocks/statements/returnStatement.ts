import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ReturnStatementBuilder } from '../../builders/statement/returnStatementBuilder.js';

export const validReturnStatementCases = [
  {
    description: 'return statement with string literal expression',
    fileId: 'testFile.bl',
    inputBLString: "JestTestReturnStatement { return 'something' }",
    expected: new ReturnStatementBuilder()
      .withExpression(new ExpressionBuilderDirector().buildStringLiteralExpression('something'))
      .build(),
  },
  {
    description: 'return statement with identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestReturnStatement { return testVariable }',
    expected: new ReturnStatementBuilder()
      .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('testVariable'))
      .build(),
  },
  {
    description: 'empty return statement',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestReturnStatement { return; }',
    expected: new ReturnStatementBuilder().build(),
  },
];
