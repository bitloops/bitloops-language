import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';

export class LeftExpressionBuilder implements IBuilder<LeftExpressionNode> {
  public readonly NAME = 'left';

  private LeftExpressionNode: LeftExpressionNode;
  private expressionNode: ExpressionNode;

  constructor() {
    this.LeftExpressionNode = new LeftExpressionNode();
  }

  public withExpression(expressionNode: ExpressionNode): LeftExpressionBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): LeftExpressionNode {
    this.LeftExpressionNode.addChild(this.expressionNode);
    this.LeftExpressionNode.buildObjectValue();

    return this.LeftExpressionNode;
  }
}
