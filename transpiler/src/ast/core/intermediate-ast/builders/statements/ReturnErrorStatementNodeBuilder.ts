import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ReturnErrorStatementNode } from '../../nodes/statements/ReturnErrorStatementNode.js';
import { IBuilder } from '../IBuilder.js';

export class ReturnErrorStatementNodeBuilder implements IBuilder<ReturnErrorStatementNode> {
  private returnErrorStatementNode: ReturnErrorStatementNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.returnErrorStatementNode = new ReturnErrorStatementNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): ReturnErrorStatementNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): ReturnErrorStatementNode {
    this.returnErrorStatementNode.addChild(this.expressionNode);

    this.returnErrorStatementNode.buildObjectValue();

    return this.returnErrorStatementNode;
  }
}
