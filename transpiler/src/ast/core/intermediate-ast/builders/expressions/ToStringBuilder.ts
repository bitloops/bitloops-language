import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { ToStringNode } from '../../nodes/Expression/ToString.js';

export class ToStringBuilder implements IBuilder<ToStringNode> {
  private toStringNode: ToStringNode;
  private expression: ExpressionNode;

  constructor() {
    this.toStringNode = new ToStringNode();
  }

  public withExpression(expr: ExpressionNode): ToStringBuilder {
    this.expression = expr;
    return this;
  }

  public build(): ToStringNode {
    this.toStringNode.addChild(this.expression);
    this.toStringNode.buildObjectValue();

    return this.toStringNode;
  }
}
