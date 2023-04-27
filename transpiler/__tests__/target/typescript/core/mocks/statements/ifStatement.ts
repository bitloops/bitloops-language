import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { IfStatementBuilderDirector } from '../../builders/statement/ifStatementDirector.js';

type TestCase = {
  description: string;
  ifStatement: IfStatementNode;
  output: string;
};

export const VALID_IF_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'test simple equality if statement',
    ifStatement: new IfStatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'b'),
      [
        new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 2),
        new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test2', 3),
      ],
    ),
    output: 'if (a === b) { const test = 2; const test2 = 3; }',
  },
  {
    description: 'test simple inequality if statement',
    ifStatement: new IfStatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'b', '!='),
      [
        new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 2),
        new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test2', 3),
      ],
    ),
    output: 'if (a !== b) { const test = 2; const test2 = 3; }',
  },
  {
    description: 'test if statement with &&',
    ifStatement: new IfStatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildANDExpression(
        new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'b'),
        new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'c', '!='),
      ),
      [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 2)],
    ),
    output: 'if (a === b && a !== c) { const test = 2; }',
  },
  {
    description: 'test if else statement',
    ifStatement: new IfStatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'b'),
      [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 2)],
      [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 3)],
    ),
    output: 'if (a === b) { const test = 2; } else { const test = 3; }',
  },
  {
    description: 'nested if else inside else clause',
    ifStatement: new IfStatementBuilderDirector().buildIfStatement(
      new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'b'),
      [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 2)],
      [
        new IfStatementBuilderDirector().buildIfStatement(
          new ExpressionBuilderDirector().buildVariableEqualityExpression('a', 'c'),
          [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 3)],
          [new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('test', 4)],
        ),
      ],
    ),
    output:
      'if (a === b) { const test = 2; } else { if (a === c) { const test = 3; } else { const test = 4; } }',
  },
];
