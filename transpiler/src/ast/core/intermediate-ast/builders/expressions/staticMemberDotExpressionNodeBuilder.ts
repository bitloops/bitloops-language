import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { StaticMemberDotExpressionNode } from '../../nodes/Expression/StaticMemberDotExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class StaticMethodCallExpressionNodeBuilder
  implements IBuilder<StaticMemberDotExpressionNode>
{
  private methodCallExpressionNode: StaticMemberDotExpressionNode;
  private identifier: IdentifierNode;
  private argumentListNode?: ArgumentListNode;
  private className: IdentifierNode;

  constructor(metadata?: TNodeMetadata) {
    this.methodCallExpressionNode = new StaticMemberDotExpressionNode(metadata);
  }

  public withIdentifier(identifier: IdentifierNode): StaticMethodCallExpressionNodeBuilder {
    this.identifier = identifier;
    return this;
  }

  public withClassName(className: IdentifierNode): StaticMethodCallExpressionNodeBuilder {
    this.className = className;
    return this;
  }

  public build(): StaticMemberDotExpressionNode {
    this.methodCallExpressionNode.addChild(this.identifier);
    this.methodCallExpressionNode.addChild(this.argumentListNode);
    this.methodCallExpressionNode.addChild(this.className);

    this.methodCallExpressionNode.buildObjectValue();

    return this.methodCallExpressionNode;
  }
}
