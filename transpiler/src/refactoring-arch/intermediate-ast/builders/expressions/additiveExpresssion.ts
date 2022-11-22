import { AdditiveExpressionNode } from '../../nodes/Expression/AdditiveExpression.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { IBuilder } from '../IBuilder.js';

export class AdditiveExpressionBuilder implements IBuilder<AdditiveExpressionNode> {
  public readonly NAME = 'additiveExpression';

  private AdditiveExpressionNode: AdditiveExpressionNode;
  private LeftexpressionNode: ExpressionNode;
  private RightexpressionNode: ExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.AdditiveExpressionNode = new AdditiveExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): AdditiveExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): AdditiveExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): AdditiveExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): AdditiveExpressionNode {
    this.AdditiveExpressionNode.addChild(this.LeftexpressionNode);
    this.AdditiveExpressionNode.addChild(this.operator);
    this.AdditiveExpressionNode.addChild(this.RightexpressionNode);
    this.AdditiveExpressionNode.buildObjectValue();

    return this.AdditiveExpressionNode;
  }
}
