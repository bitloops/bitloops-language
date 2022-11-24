import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class ExpressionBuilder implements IBuilder<ExpressionNode> {
  private expressionWrapper: ExpressionNode;
  private concreteExpressionChild: ExpressionNode;

  constructor() {
    this.expressionWrapper = new ExpressionNode();
  }

  public withExpression(expr: ExpressionNode): ExpressionBuilder {
    this.concreteExpressionChild = expr;
    return this;
  }

  public build(): ExpressionNode {
    this.expressionWrapper.addChild(this.concreteExpressionChild);

    this.expressionWrapper.buildObjectValue();

    return this.expressionWrapper;
  }
}
