import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';

import { ForOfStatementNode } from '../../nodes/statements/ForOfStatementNode.js';
import { StatementListNode } from '../../nodes/statements/StatementList.js';
import { IBuilder } from '../IBuilder.js';

export class ForOfStatementNodeBuilder implements IBuilder<ForOfStatementNode> {
  private forOfStatementNode: ForOfStatementNode;
  private identifierNode: IdentifierNode;
  private expressionNode: ExpressionNode;
  private statementListNode?: StatementListNode;

  constructor(metadata: TNodeMetadata) {
    this.forOfStatementNode = new ForOfStatementNode(metadata);
  }

  public withIdentifier(identifierNode: IdentifierNode): ForOfStatementNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withOfExpression(expressionNode: ExpressionNode): ForOfStatementNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public withStatementList(statementListNode: StatementListNode): ForOfStatementNodeBuilder {
    this.statementListNode = statementListNode;
    return this;
  }

  public build(): ForOfStatementNode {
    this.forOfStatementNode.addChild(this.identifierNode);
    this.forOfStatementNode.addChild(this.expressionNode);
    if (this.statementListNode) {
      this.forOfStatementNode.addChild(this.statementListNode);
    }
    this.forOfStatementNode.buildObjectValue();

    return this.forOfStatementNode;
  }
}
