import { ExpressionBuilderDirector } from '../../builders/expression.js';

export const VALID_INSTANCE_OF_TEST_CASES = [
  {
    description: 'Instanceof expression',
    expression: new ExpressionBuilderDirector().buildInstanceOfWithIdentifierExpression(
      'result',
      'TestClassName',
    ),
    output: 'result instanceof TestClassName',
  },
  {
    description: 'Instanceof Error expression',
    expression: new ExpressionBuilderDirector().buildInstanceOfWithIdentifierExpression(
      'result',
      'Error',
    ),
    output: 'result.isFail()',
  },
];
