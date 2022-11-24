import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';

export class RightExpressionBuilder implements IBuilder<RightExpressionNode> {
  public readonly NAME = 'right';

  private RightExpressionNode: RightExpressionNode;
  private expressionNode: ExpressionNode;

  constructor() {
    this.RightExpressionNode = new RightExpressionNode();
  }

  public withExpression(expressionNode: ExpressionNode): RightExpressionBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): RightExpressionNode {
    this.RightExpressionNode.addChild(this.expressionNode);
    this.RightExpressionNode.buildObjectValue();

    return this.RightExpressionNode;
  }
}
