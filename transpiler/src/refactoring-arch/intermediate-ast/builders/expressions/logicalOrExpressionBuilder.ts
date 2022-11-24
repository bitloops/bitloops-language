import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../builders/IBuilder.js';
import { LogicalOrExpressionNode } from '../../nodes/Expression/logicalOrExpression.js';

export class LogicalOrExpressionBuilder implements IBuilder<LogicalOrExpressionNode> {
  public readonly NAME = 'orExpression';

  private logicalOrExpressionNode: LogicalOrExpressionNode;
  private LeftexpressionNode: LeftExpressionNode;
  private RightexpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.logicalOrExpressionNode = new LogicalOrExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): LogicalOrExpressionBuilder {
    this.LeftexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): LogicalOrExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalOrExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalOrExpressionNode {
    this.logicalOrExpressionNode.addChild(this.LeftexpressionNode);
    this.logicalOrExpressionNode.addChild(this.operator);
    this.logicalOrExpressionNode.addChild(this.RightexpressionNode);
    this.logicalOrExpressionNode.buildObjectValue();

    return this.logicalOrExpressionNode;
  }
}
