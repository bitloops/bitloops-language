import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class RightExpressionBuilder implements IBuilder<RightExpressionNode> {
  public readonly NAME = 'right';

  private rightExpressionNode: RightExpressionNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.rightExpressionNode = new RightExpressionNode(metadata);
  }

  public withExpression(expressionNode: ExpressionNode): RightExpressionBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): RightExpressionNode {
    this.rightExpressionNode.addChild(this.expressionNode);
    this.rightExpressionNode.buildObjectValue();

    return this.rightExpressionNode;
  }
}
