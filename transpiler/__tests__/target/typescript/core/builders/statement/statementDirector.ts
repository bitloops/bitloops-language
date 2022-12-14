import { ConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { ElseStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ElseStatements.js';
import { IfStatementBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/IfStatementBuilder.js';
import { ThenStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ThenStatements.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ConstDeclarationBuilderDirector } from './constDeclaration.js';

export class StatementBuilderDirector {
  /**
   *  const {identifier} = [await]? this.useCase.execute();
   */
  buildConstDeclarationThisUseCaseExecute(
    identifier: string,
    options?: { await: boolean },
  ): ConstDeclarationNode {
    return new ConstDeclarationBuilderDirector().buildConstDeclarationThisUseCaseExecute(
      identifier,
      options,
    );
  }

  buildIfStatement(
    condition: ExpressionNode,
    thenStatements: StatementNode[],
    elseStatements?: StatementNode[],
  ): IfStatementNode {
    const conditionNode = new ConditionNodeBuilder(null).withExpression(condition).build();
    const thenStatementsNode = new ThenStatementsNodeBuilder(null)
      .withStatements(thenStatements)
      .build();
    const elseStatementsNode = elseStatements
      ? new ElseStatementsNodeBuilder(null).withStatements(elseStatements).build()
      : null;
    const ifNode = new IfStatementBuilder(null)
      .withCondition(conditionNode)
      .withThenStatements(thenStatementsNode);

    if (elseStatementsNode) {
      ifNode.withElseStatements(elseStatementsNode);
    }
    return ifNode.build();
  }
}
