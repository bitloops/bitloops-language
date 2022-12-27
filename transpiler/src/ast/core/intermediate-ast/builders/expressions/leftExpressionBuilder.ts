import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class LeftExpressionBuilder implements IBuilder<LeftExpressionNode> {
  public readonly NAME = 'left';

  private leftExpressionNode: LeftExpressionNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.leftExpressionNode = new LeftExpressionNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): LeftExpressionBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): LeftExpressionNode {
    this.leftExpressionNode.addChild(this.expressionNode);
    this.leftExpressionNode.buildObjectValue();

    return this.leftExpressionNode;
  }
}
