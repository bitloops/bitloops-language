import { ArgumentListNode } from '../../../nodes/ArgumentList/ArgumentListNode.js';
import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { MethodCallExpressionNode } from '../../../nodes/Expression/MethodCallExpression.js';
import { NameNode } from '../../../nodes/NameNode.js';
import { IBuilder } from '../../IBuilder.js';

export class ErrorEvaluationNodeBuilder implements IBuilder<MethodCallExpressionNode> {
  private methodCallExpressionNode: MethodCallExpressionNode;
  private name: NameNode;
  private argumentListNode?: ArgumentListNode;

  constructor() {
    this.methodCallExpressionNode = new MethodCallExpressionNode();
  }

  public withName(expr: ExpressionNode): ErrorEvaluationNodeBuilder {
    this.name = expr;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): ErrorEvaluationNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): MethodCallExpressionNode {
    this.methodCallExpressionNode.addChild(this.name);
    this.methodCallExpressionNode.addChild(this.argumentListNode);

    this.methodCallExpressionNode.buildObjectValue();

    return this.methodCallExpressionNode;
  }
}
