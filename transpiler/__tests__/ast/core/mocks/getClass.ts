import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const validGetClassExpressions = [
  {
    description: 'get Class with identifier',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression {result.getClass()}',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('result'),
  },
  {
    description: 'get Class with memberDotExpression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression {result.props.getClass()}',
    expression: new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('result'),
      'props',
    ),
  },
];
