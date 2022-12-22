import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { MethodCallExpressionNode } from '../../nodes/Expression/MethodCallExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class MethodCallExpressionNodeBuilder implements IBuilder<MethodCallExpressionNode> {
  private methodCallExpressionNode: MethodCallExpressionNode;
  private expression: ExpressionNode;
  private argumentListNode?: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.methodCallExpressionNode = new MethodCallExpressionNode(metadata);
  }

  public withExpression(expr: ExpressionNode): MethodCallExpressionNodeBuilder {
    this.expression = expr;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): MethodCallExpressionNodeBuilder {
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
