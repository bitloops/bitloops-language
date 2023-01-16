import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { BitloopsPrimaryTypeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { ExpressionBuilderDirector } from '../../builders/expression.js';
import { ReturnStatementBuilderDirector } from '../../builders/statement/returnDirector.js';
import { StatementBuilderDirector } from '../../builders/statement/statementDirector.js';
import { VariableDeclarationBuilderDirector } from '../../builders/statement/variableDeclaration.js';

type TestCase = {
  description: string;
  statement: StatementNode;
  output: string;
};

export const VALID_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'return a string',
    statement: new ReturnStatementBuilderDirector().buildReturn(
      new ExpressionBuilderDirector().buildStringLiteralExpression('test'),
    ),
    output: "return 'test'",
  },
  {
    description: 'return ok something',
    statement: new ReturnStatementBuilderDirector().buildReturnOK(
      new ExpressionBuilderDirector().buildStringLiteralExpression('test'),
    ),
    output: "return ok('test')",
  },
  {
    description: 'return error',
    statement: new ReturnStatementBuilderDirector().buildReturnError(
      new ExpressionBuilderDirector().buildInt32LiteralExpression(42),
    ),
    output: 'return fail(42)',
  },
  {
    description: 'break statement',
    statement: new StatementBuilderDirector().buildBreakStatement(),
    output: 'break',
  },
  {
    description: 'a variable declaration',
    statement: new VariableDeclarationBuilderDirector().buildVarDeclaration(
      'c',
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
      new BitloopsPrimaryTypeDirector().buildPrimitivePrimaryType('bool'),
    ),

    output: 'let c: boolean = true',
  },
];
