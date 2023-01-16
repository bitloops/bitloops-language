import { IBuilder } from '../IBuilder.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { ParenthesizedExpressionNode } from '../../nodes/Expression/ParenthesizedExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class ParenthesizedExpressionNodeBuilder implements IBuilder<ParenthesizedExpressionNode> {
  private parenthesizedExpressionNode: ParenthesizedExpressionNode;
  private expression: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.parenthesizedExpressionNode = new ParenthesizedExpressionNode(metadata);
  }

  public withExpression(expr: ExpressionNode): ParenthesizedExpressionNodeBuilder {
    this.expression = expr;
    return this;
  }

  public build(): ParenthesizedExpressionNode {
    this.parenthesizedExpressionNode.addChild(this.expression);
    this.parenthesizedExpressionNode.buildObjectValue();

    return this.parenthesizedExpressionNode;
  }
}
