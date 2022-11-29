import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RelationalExpressionNode } from '../../nodes/Expression/relationalExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../IBuilder.js';

export class RelationalExpressionBuilder implements IBuilder<RelationalExpressionNode> {
  public readonly NAME = 'relationalExpression';

  private RelationalExpressionNode: RelationalExpressionNode;
  private LeftexpressionNode: LeftExpressionNode;
  private RightexpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor() {
    this.RelationalExpressionNode = new RelationalExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): RelationalExpressionBuilder {
    this.LeftexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): RelationalExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): RelationalExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): RelationalExpressionNode {
    this.RelationalExpressionNode.addChild(this.LeftexpressionNode);
    this.RelationalExpressionNode.addChild(this.operator);
    this.RelationalExpressionNode.addChild(this.RightexpressionNode);
    this.RelationalExpressionNode.buildObjectValue();

    return this.RelationalExpressionNode;
  }
}
