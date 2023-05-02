import { LeftExpressionNode } from '../../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../IBuilder.js';
import { LogicalXorExpressionNode } from '../../../nodes/Expression/Logical/logicalXorExpressionNode.js';
import { TNodeMetadata } from '../../../nodes/IntermediateASTNode.js';

export class LogicalXorExpressionBuilder implements IBuilder<LogicalXorExpressionNode> {
  public readonly NAME = 'orExpression';

  private logicalXorExpressionNode: LogicalXorExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.logicalXorExpressionNode = new LogicalXorExpressionNode(nodeMetadata);
  }

  public withLeftExpression(expressionNode: LeftExpressionNode): LogicalXorExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: RightExpressionNode): LogicalXorExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalXorExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalXorExpressionNode {
    this.logicalXorExpressionNode.addChild(this.leftExpressionNode);
    if (this.operator) {
      this.logicalXorExpressionNode.addChild(this.operator);
    }
    this.logicalXorExpressionNode.addChild(this.rightExpressionNode);
    this.logicalXorExpressionNode.buildObjectValue();

    return this.logicalXorExpressionNode;
  }
}
