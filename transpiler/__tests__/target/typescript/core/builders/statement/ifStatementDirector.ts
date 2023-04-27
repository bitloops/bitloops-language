import { ConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { ElseStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ElseStatements.js';
import { IfStatementBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/IfStatementBuilder.js';
import { ThenStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ThenStatements.js';
import { StatementListNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/StatementListNodeBuilder.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ExpressionBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/expressionNodeBuilderDirector.js';
import { ReturnStatementBuilderDirector } from '../../../../../../src/ast/core/intermediate-ast/directors/returnNodeBuilderDirector.js';

export class IfStatementBuilderDirector {
  buildIfStatement(
    condition: ExpressionNode,
    thenStatements: StatementNode[],
    elseStatements?: StatementNode[],
  ): IfStatementNode {
    const conditionNode = new ConditionNodeBuilder(null).withExpression(condition).build();
    const thenStatementsNode = new ThenStatementsNodeBuilder(null)
      .withStatements(new StatementListNodeBuilder(null).withStatements(thenStatements).build())
      .build();
    const elseStatementsNode = elseStatements
      ? new ElseStatementsNodeBuilder(null)
          .withStatements(new StatementListNodeBuilder(null).withStatements(elseStatements).build())
          .build()
      : null;
    const ifNode = new IfStatementBuilder(null)
      .withCondition(conditionNode)
      .withThenStatements(thenStatementsNode);

    if (elseStatementsNode) {
      ifNode.withElseStatements(elseStatementsNode);
    }
    return ifNode.build();
  }

  buildIfTrueReturnExpression(expr: ExpressionNode): IfStatementNode {
    return this.buildIfStatement(
      new ExpressionBuilderDirector().buildBooleanLiteralExpression(true),
      [new ReturnStatementBuilderDirector().buildReturn(expr)],
    );
  }
}
