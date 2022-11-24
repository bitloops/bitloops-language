import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../../builders/IBuilder.js';
import { LogicalXorExpressionNode } from '../../nodes/Expression/logicalXorExpressionNode.js';

export class LogicalXorExpressionBuilder implements IBuilder<LogicalXorExpressionNode> {
  public readonly NAME = 'orExpression';

  private logicalXorExpressionNode: LogicalXorExpressionNode;
  private LeftexpressionNode: LeftExpressionNode;
  private RightexpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.logicalXorExpressionNode = new LogicalXorExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): LogicalXorExpressionBuilder {
    this.LeftexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): LogicalXorExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): LogicalXorExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): LogicalXorExpressionNode {
    this.logicalXorExpressionNode.addChild(this.LeftexpressionNode);
    this.logicalXorExpressionNode.addChild(this.operator);
    this.logicalXorExpressionNode.addChild(this.RightexpressionNode);
    this.logicalXorExpressionNode.buildObjectValue();

    return this.logicalXorExpressionNode;
  }
}
