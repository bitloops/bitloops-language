import { IdentifierNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/identifier/IdentifierBuilder.js';
import { ConstDeclarationNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/constDeclaration.js';
import { ConditionNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ConditionBuilder.js';
import { ElseStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ElseStatements.js';
import { IfStatementBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/IfStatementBuilder.js';
import { ThenStatementsNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ifStatement/ThenStatements.js';
import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { ConstDeclarationNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ConstDeclarationNode.js';
import { IfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ifStatement/IfStatementNode.js';
import { StatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/Statement.js';
import { ArgumentListDirector } from '../argumentList.js';
import { ExpressionBuilderDirector } from '../expression.js';

export class StatementBuilderDirector {
  buildConstDeclarationThisUseCaseExecute(identifier: string): ConstDeclarationNode {
    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildThisExpression(),
          'useCase',
        ),
        'execute',
      ),
      new ArgumentListDirector().buildArgumentListWithArgs([]),
    );
    return this.buildConstDeclaration(identifier, expression);
  }

  buildConstDeclarationWithAwaitThisUseCaseExecute(identifier: string): ConstDeclarationNode {
    const expression = new ExpressionBuilderDirector().buildMethodCallExpression(
      new ExpressionBuilderDirector().buildMemberDotExpression(
        new ExpressionBuilderDirector().buildMemberDotExpression(
          new ExpressionBuilderDirector().buildModifiedThisExpression('await this'),
          'useCase',
        ),
        'execute',
      ),
      new ArgumentListDirector().buildArgumentListWithArgs([]),
    );
    return this.buildConstDeclaration(identifier, expression);
  }

  buildConstDeclaration(identifier: string, expression: ExpressionNode): ConstDeclarationNode {
    return new ConstDeclarationNodeBuilder()
      .withIdentifier(new IdentifierNodeBuilder().withName(identifier).build())
      .withExpression(expression)
      .build();
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
