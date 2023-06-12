import { ExpressionNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/Expression/ExpressionNode.js';
import { IdentifierNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/identifier/IdentifierNode.js';
import { ForOfStatementNodeBuilder } from '../../../../../../src/ast/core/intermediate-ast/builders/statements/ForOfStatementNodeBuilder.js';
import { StatementListNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/StatementList.js';
import { ForOfStatementNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/statements/ForOfStatementNode.js';

export class ForOfStatementBuilderDirector {
  buildForOfStatement(
    expression: ExpressionNode,
    statementList: StatementListNode,
    identifier: IdentifierNode,
  ): ForOfStatementNode {
    const forNode = new ForOfStatementNodeBuilder(null)
      .withIdentifier(identifier)
      .withOfExpression(expression)
      .withStatementList(statementList)
      .build();

    return forNode;
  }
}
