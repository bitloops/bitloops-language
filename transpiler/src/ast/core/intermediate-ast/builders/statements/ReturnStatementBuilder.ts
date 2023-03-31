import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnStatementNode } from '../../nodes/statements/ReturnStatementNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReturnStatementNodeBuilder implements IBuilder<ReturnStatementNode> {
  private returnStatementNode: ReturnStatementNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.returnStatementNode = new ReturnStatementNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): ReturnStatementNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): ReturnStatementNode {
    if (this.expressionNode) {
      this.returnStatementNode.addChild(this.expressionNode);
      this.returnStatementNode.buildObjectValue();
    } else {
      this.returnStatementNode.buildLeafValue(null);
    }

    return this.returnStatementNode;
  }
}
