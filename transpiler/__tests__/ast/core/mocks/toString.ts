import { ExpressionBuilderDirector } from '../builders/expressionDirector.js';

export const validToStringExpressions = [
  {
    description: 'ToString with identifier',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression {result.toString()}',
    expression: new ExpressionBuilderDirector().buildIdentifierExpression('result'),
  },
  {
    description: 'ToString with memberDotExpression',
    fileId: 'testFile.bl',
    inputBLString: 'JestTestExpression {result.props.toString()}',
    expression: new ExpressionBuilderDirector().buildMemberExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('result'),
      'props',
    ),
  },
];
