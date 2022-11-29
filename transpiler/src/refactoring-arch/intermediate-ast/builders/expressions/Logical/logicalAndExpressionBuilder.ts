import { ExpressionNode } from '../../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../IBuilder.js';
import { LogicalAndExpressionNode } from '../../../nodes/Expression/Logical/LogicalAndExpression.js';

export class LogicalAndExpressionBuilder implements IBuilder<LogicalAndExpressionNode> {
  public readonly NAME = 'andExpression';

  private logicalAndExpressionNode: LogicalAndExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.logicalAndExpressionNode = new LogicalAndExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): LogicalAndExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): LogicalAndExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalAndExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalAndExpressionNode {
    this.logicalAndExpressionNode.addChild(this.leftExpressionNode);
    this.logicalAndExpressionNode.addChild(this.operator);
    this.logicalAndExpressionNode.addChild(this.rightExpressionNode);
    this.logicalAndExpressionNode.buildObjectValue();

    return this.logicalAndExpressionNode;
  }
}
