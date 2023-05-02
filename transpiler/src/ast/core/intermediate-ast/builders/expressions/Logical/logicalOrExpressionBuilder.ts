import { LeftExpressionNode } from '../../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../IBuilder.js';
import { LogicalOrExpressionNode } from '../../../nodes/Expression/Logical/logicalOrExpression.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';

export class LogicalOrExpressionBuilder implements IBuilder<LogicalOrExpressionNode> {
  public readonly NAME = 'orExpression';

  private logicalOrExpressionNode: LogicalOrExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.logicalOrExpressionNode = new LogicalOrExpressionNode(nodeMetadata);
  }

  public withLeftExpression(expressionNode: LeftExpressionNode): LogicalOrExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: RightExpressionNode): LogicalOrExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalOrExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalOrExpressionNode {
    this.logicalOrExpressionNode.addChild(this.leftExpressionNode);
    if (this.operator) {
      this.logicalOrExpressionNode.addChild(this.operator);
    }
    this.logicalOrExpressionNode.addChild(this.rightExpressionNode);
    this.logicalOrExpressionNode.buildObjectValue();

    return this.logicalOrExpressionNode;
  }
}
