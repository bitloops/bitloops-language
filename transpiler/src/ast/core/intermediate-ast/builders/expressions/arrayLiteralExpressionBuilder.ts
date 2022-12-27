import { ArrayLiteralExpressionNode } from '../../nodes/Expression/ArrayLiteralExpression.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class ArrayLiteralExpressionNodeBuilder implements IBuilder<ArrayLiteralExpressionNode> {
  public readonly NAME = 'MethodCallExpression';

  private arrayLiteralNode: ArrayLiteralExpressionNode;
  private arrayElements: ExpressionNode[];

  constructor(metadata?: TNodeMetadata) {
    this.arrayLiteralNode = new ArrayLiteralExpressionNode(metadata);
  }

  public withArrayElements(expressions: ExpressionNode[]): ArrayLiteralExpressionNodeBuilder {
    this.arrayElements = expressions;
    return this;
  }

  public build(): ArrayLiteralExpressionNode {
    this.arrayElements.forEach((element) => {
      this.arrayLiteralNode.addChild(element);
    });

    this.arrayLiteralNode.buildArrayValue();

    return this.arrayLiteralNode;
  }
}
