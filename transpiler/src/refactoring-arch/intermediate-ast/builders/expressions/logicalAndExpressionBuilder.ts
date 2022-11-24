import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../builders/IBuilder.js';
import { LogicalAndExpressionNode } from '../../nodes/Expression/LogicalAndExpression.js';

export class LogicalAndExpressionBuilder implements IBuilder<LogicalAndExpressionNode> {
  public readonly NAME = 'andExpression';

  private logicalAndExpressionNode: LogicalAndExpressionNode;
  private LeftexpressionNode: LeftExpressionNode;
  private RightexpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.logicalAndExpressionNode = new LogicalAndExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): LogicalAndExpressionBuilder {
    this.LeftexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): LogicalAndExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalAndExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalAndExpressionNode {
    this.logicalAndExpressionNode.addChild(this.LeftexpressionNode);
    this.logicalAndExpressionNode.addChild(this.operator);
    this.logicalAndExpressionNode.addChild(this.RightexpressionNode);
    this.logicalAndExpressionNode.buildObjectValue();

    return this.logicalAndExpressionNode;
  }
}
