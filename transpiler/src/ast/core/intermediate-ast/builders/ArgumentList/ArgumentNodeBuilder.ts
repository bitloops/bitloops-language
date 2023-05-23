import { ArgumentNode } from '../../nodes/ArgumentList/ArgumentNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArgumentNodeBuilder implements IBuilder<ArgumentNode> {
  private argumentNode: ArgumentNode;
  private expressionNode: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.argumentNode = new ArgumentNode(metadata);
  }

  public withExpression(expression: ExpressionNode): ArgumentNodeBuilder {
    this.expressionNode = expression;
    return this;
  }

  public build(): ArgumentNode {
    this.argumentNode.addChild(this.expressionNode);
    this.argumentNode.buildObjectValue();

    return this.argumentNode;
  }
}
