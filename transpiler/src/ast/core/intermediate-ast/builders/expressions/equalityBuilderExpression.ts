import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { EqualityExpressionNode } from '../../nodes/Expression/equalityExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../IBuilder.js';

export class EqualityExpressionBuilder implements IBuilder<EqualityExpressionNode> {
  public readonly NAME = 'equalityExpression';

  private equalityExpressionNode: EqualityExpressionNode;
  private LeftexpressionNode: LeftExpressionNode;
  private RightexpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.equalityExpressionNode = new EqualityExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): EqualityExpressionBuilder {
    this.LeftexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): EqualityExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): EqualityExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): EqualityExpressionNode {
    this.equalityExpressionNode.addChild(this.LeftexpressionNode);
    this.equalityExpressionNode.addChild(this.operator);
    this.equalityExpressionNode.addChild(this.RightexpressionNode);
    this.equalityExpressionNode.buildObjectValue();

    return this.equalityExpressionNode;
  }
}
