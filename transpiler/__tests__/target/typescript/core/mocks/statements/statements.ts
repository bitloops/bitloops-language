import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { BitloopsPrimaryTypeNodeDirector } from '../../builders/bitloopsPrimaryTypeDirector.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ReturnStatementBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/returnNodeBuilderDirector.js';
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
      new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bool'),
    ),

    output: 'let c: boolean = true',
  },
  {
    description: 'a variable declaration without expression',
    statement: new VariableDeclarationBuilderDirector().buildVariableDeclarationWithoutExpression(
      'noExpression',
      new BitloopsPrimaryTypeNodeDirector().buildPrimitivePrimaryType('bool'),
    ),

    output: 'let noExpression: boolean = null',
  },
];
