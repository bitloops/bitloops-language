import { ExpressionBuilderDirector } from '../../builders/expressionDirector.js';
import { ReturnErrorStatementBuilder } from '../../builders/statement/returnErrorStatementBuilder.js';

export const validReturnErrorStatementCases = [
  {
    description: 'return error statement with identifier expression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestReturnStatement { return Error(testVariable) }',
    expected: new ReturnErrorStatementBuilder()
      .withExpression(new ExpressionBuilderDirector().buildIdentifierExpression('testVariable'))
      .build(),
  },
];
