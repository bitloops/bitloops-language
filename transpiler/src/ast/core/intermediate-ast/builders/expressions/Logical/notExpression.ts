import { NotExpressionNode } from '../../../nodes/Expression/NotExpression.js';
import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../../IBuilder.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';

export class NotExpressionNodeBuilder implements IBuilder<NotExpressionNode> {
  // public readonly NAME = 'MethodCallExpression';

  private NotExpressionNode: NotExpressionNode;
  private expressionNode: ExpressionNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.NotExpressionNode = new NotExpressionNode(nodeMetadata);
  }

  public withExpression(expressionNode: ExpressionNode): NotExpressionNodeBuilder {
    this.expressionNode = expressionNode;
    return this;
  }

  public build(): NotExpressionNode {
    this.NotExpressionNode.addChild(this.expressionNode);
    this.NotExpressionNode.buildObjectValue();

    return this.NotExpressionNode;
  }
}
