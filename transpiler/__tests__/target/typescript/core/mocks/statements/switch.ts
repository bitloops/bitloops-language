import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { SwitchStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/SwitchStatement/SwitchStatementNode.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ConstDeclarationBuilderDirector } from '../../builders/statement/constDeclaration.js';
import { SwitchStatementBuilderDirector } from '../../builders/statement/switchDirector.js';

type TestCase = {
  description: string;
  switchStatement: SwitchStatementNode;
  output: string;
};

export const VALID_SWITCH_STATEMENT_TEST_CASES: TestCase[] = [
  {
    description: 'test standard switch case statement',
    switchStatement: new SwitchStatementBuilderDirector().buildSwitchStatement(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      [
        {
          expression: new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
          statementList: new StatementListNodeBuilder(null)
            .withStatements([
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 1),
            ])
            .build(),
        },
        {
          expression: new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
          statementList: new StatementListNodeBuilder(null)
            .withStatements([
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 2),
            ])
            .build(),
        },
      ],
      new StatementListNodeBuilder(null)
        .withStatements([
          new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 3),
        ])
        .build(),
    ),
    output: 'switch(a) {case 1: {const a = 1;} case 2: {const a = 2;} default: {const a = 3;}}',
  },
  {
    description: 'test switchstatement with 2 statements per case',
    switchStatement: new SwitchStatementBuilderDirector().buildSwitchStatement(
      new ExpressionBuilderDirector().buildIdentifierExpression('a'),
      [
        {
          expression: new ExpressionBuilderDirector().buildInt32LiteralExpression(1),
          statementList: new StatementListNodeBuilder(null)
            .withStatements([
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 1),
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('b', 1),
            ])
            .build(),
        },
        {
          expression: new ExpressionBuilderDirector().buildInt32LiteralExpression(2),
          statementList: new StatementListNodeBuilder(null)
            .withStatements([
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 2),
              new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('b', 2),
            ])
            .build(),
        },
      ],
      new StatementListNodeBuilder(null)
        .withStatements([
          new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('a', 3),
          new ConstDeclarationBuilderDirector().buildIntegerExpressionConstDeclaration('b', 3),
        ])
        .build(),
    ),
    output:
      'switch(a) {case 1: {const a = 1;const b = 1;} case 2: {const a = 2;const b = 2;} default: {const a = 3;const b = 3;}}',
  },
];
