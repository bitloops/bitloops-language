import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { MethodCallExpressionNode } from '../../nodes/Expression/MethodCallExpression.js';
import { IBuilder } from '../IBuilder.js';

export class MethodCallNodeBuilder implements IBuilder<MethodCallExpressionNode> {
  public readonly NAME = 'MethodCallExpression';

  private methodCallExpressionNode: MethodCallExpressionNode;
  private expression: ExpressionNode;
  private argumentListNode?: ArgumentListNode;

  constructor() {
    this.methodCallExpressionNode = new MethodCallExpressionNode();
  }

  public withExpression(expr: ExpressionNode): MethodCallNodeBuilder {
    this.expression = expr;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): MethodCallNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): MethodCallExpressionNode {
    this.methodCallExpressionNode.addChild(this.expression);
    this.methodCallExpressionNode.addChild(this.argumentListNode);

    this.methodCallExpressionNode.buildObjectValue();

    return this.methodCallExpressionNode;
  }
}
