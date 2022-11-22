import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { MethodCallExpressionNode } from '../../nodes/Expression/MethodCallExpression.js';
import { IdentifierNode } from '../../nodes/IdentifierNode.js';
import { OptionalNode } from '../../nodes/OptionalNode.js';
import { IBuilder } from '../IBuilder.js';

export class MethodCallNodeBuilder implements IBuilder<MethodCallExpressionNode> {
  public readonly NAME = 'MethodCallExpression';

  private methodCallExpressionNode: MethodCallExpressionNode;
  private identifierNode: IdentifierNode;
  private argumentListNode?: OptionalNode;

  constructor() {
    this.methodCallExpressionNode = new MethodCallExpressionNode();
  }

  public withName(identifierNode: IdentifierNode): MethodCallNodeBuilder {
    this.identifierNode = identifierNode;
    return this;
  }

  public withArgumentsList(argumentListNode: ArgumentListNode): MethodCallNodeBuilder {
    this.argumentListNode = argumentListNode;
    return this;
  }

  public build(): MethodCallExpressionNode {
    this.methodCallExpressionNode.addChild(this.identifierNode);
    this.methodCallExpressionNode.addChild(this.argumentListNode);

    this.methodCallExpressionNode.buildObjectValue();

    return this.methodCallExpressionNode;
  }
}
