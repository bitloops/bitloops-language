import { ConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { ElseStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ElseStatements.js';
import { IfStatementBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/IfStatementBuilder.js';
import { ThenStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ThenStatements.js';
import { ReturnOKStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ReturnOkStatamentNodeBuilder.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { ReturnOKStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ReturnOKStatementNode.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { EvaluationBuilderDirector } from '../evaluation.js';
import { ExpressionBuilderDirector } from '../expression.js';
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
    thenStatements: StatementListNode,
    elseStatements?: StatementListNode,
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

  buildReturnOKStatement(expression: ExpressionNode): ReturnOKStatementNode {
    return new ReturnOKStatementNodeBuilder().withExpression(expression).build();
  }

  buildExpressionEntityEvaluationWithIdentifier(
    entityName: string,
    identifierName: string,
  ): ExpressionNode {
    const expressionProps = new ExpressionBuilderDirector().buildIdentifierExpression(
      identifierName,
    );
    return new ExpressionBuilderDirector().buildEvaluationExpression(
      new EvaluationBuilderDirector().buildEntityEvaluationWithExpression(
        entityName,
        expressionProps,
      ),
    );
  }
}
