import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { MultiplicativeExpressionNode } from '../../nodes/Expression/MultiplicativeExpression.js';

export class MultiplicativeExpressionBuilder implements IBuilder<MultiplicativeExpressionNode> {
  public readonly NAME = 'MultiplicativeExpression';

  private MultiplicativeExpressionNode: MultiplicativeExpressionNode;
  private LeftexpressionNode: ExpressionNode;
  private RightexpressionNode: ExpressionNode;
  private operatorNode: OperatorNode;

  constructor() {
    this.MultiplicativeExpressionNode = new MultiplicativeExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): MultiplicativeExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): MultiplicativeExpressionBuilder {
    this.RightexpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): MultiplicativeExpressionBuilder {
    this.operatorNode = operatorNode;
    return this;
  }
  public build(): MultiplicativeExpressionNode {
    this.MultiplicativeExpressionNode.addChild(this.LeftexpressionNode);
    this.MultiplicativeExpressionNode.addChild(this.operatorNode);
    this.MultiplicativeExpressionNode.addChild(this.RightexpressionNode);
    this.MultiplicativeExpressionNode.buildObjectValue();

    return this.MultiplicativeExpressionNode;
  }
}
