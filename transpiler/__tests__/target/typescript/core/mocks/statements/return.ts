import { ReturnErrorStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnErrorStatementNode.js';
import { ReturnOKStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnOKStatementNode.js';
import { ReturnStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnStatementNode.js';
import { ArgumentDirector } from '../../builders/argument.js';
import { ArgumentListDirector } from '../../builders/argumentList.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';

type TestCase = {
  description: string;
  return: ReturnStatementNode | ReturnOKStatementNode | ReturnErrorStatementNode;
  output: string;
};

export const VALID_RETURN_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'return a string',
    return: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildStringLiteralExpression('test'),
    ),
    output: "return 'test'",
  },
  {
    description: 'return a boolean',
    return: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
    ),
    output: 'return true',
  },
  {
    description: 'return a number',
    return: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
    ),
    output: 'return 42',
  },
  {
    description: 'return an identifier',
    return: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildIdentifierExpression('frog'),
    ),
    output: 'return frog',
  },
  {
    description: 'return empty',
    return: new ReturnStatementBuilderDirector().buildEmptyReturn(),
    output: 'return',
  },
  {
    description: 'return a function call',
    return: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('multiply'),
        new ArgumentListDirector().buildArgumentListWithArgs([
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
          ),
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildStringLiteralExpression('a'),
          ),
        ]),
      ),
    ),
    output: "return multiply(2, 'a')",
  },
];

// | {"returnOK":{"expression":{"classInstantiation":{"className":"Name","argumentDependencies":[{"value":"props","type":"variable"}]}}}}                                                      | return ok(new Name(props)) |

export const VALID_RETURN_OK_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'return ok a string',
    return: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildStringLiteralExpression('test'),
    ),
    output: "return ok('test')",
  },
  {
    description: 'return ok a boolean',
    return: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
    ),
    output: 'return ok(true)',
  },
  {
    description: 'return ok a number',
    return: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
    ),
    output: 'return ok(42)',
  },
  {
    description: 'return ok an identifier',
    return: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildIdentifierExpression('frog'),
    ),
    output: 'return ok(frog)',
  },
  {
    description: 'return ok a function call',
    return: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('multiply'),
        new ArgumentListDirector().buildArgumentListWithArgs([
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
          ),
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildStringLiteralExpression('a'),
          ),
        ]),
      ),
    ),
    output: "return ok(multiply(2, 'a'))",
  },
];

export const VALID_RETURN_ERROR_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'return error a string',
    return: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildStringLiteralExpression('test'),
    ),
    output: "return fail('test')",
  },
  {
    description: 'return error a boolean',
    return: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
    ),
    output: 'return fail(true)',
  },
  {
    description: 'return error a number',
    return: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
    ),
    output: 'return fail(42)',
  },
  {
    description: 'return error an identifier',
    return: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildIdentifierExpression('frog'),
    ),
    output: 'return fail(frog)',
  },
  {
    description: 'return error a function call',
    return: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildMethodCallExpression(
        new ExpressionBuilderDirector().buildIdentifierExpression('multiply'),
        new ArgumentListDirector().buildArgumentListWithArgs([
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
          ),
          new ArgumentDirector().buildArgument(
            new ExpressionBuilderDirector().buildStringLiteralExpression('a'),
          ),
        ]),
      ),
    ),
    output: "return fail(multiply(2, 'a'))",
  },
];
