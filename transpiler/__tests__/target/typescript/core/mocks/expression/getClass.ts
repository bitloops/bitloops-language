import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';

export const VALID_GET_CLASS_TEST_CASES = [
  {
    description: 'Get class of variable',
    expression: new ExpressionBuilderDirector().buildGetClassExpression(
      new ExpressionBuilderDirector().buildIdentifierExpression('result'),
    ),
    output: 'result.constructor',
  },
];
