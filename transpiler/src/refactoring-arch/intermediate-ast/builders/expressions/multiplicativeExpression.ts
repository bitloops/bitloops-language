import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { IBuilder } from '../IBuilder.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { MultiplicativeExpressionNode } from '../../nodes/Expression/MultiplicativeExpression.js';

export class MultiplicativeExpressionBuilder implements IBuilder<MultiplicativeExpressionNode> {
  public readonly NAME = 'multiplicativeExpression';

  private MultiplicativeExpressionNode: MultiplicativeExpressionNode;
  private LeftExpressionNode: ExpressionNode;
  private RightExpressionNode: ExpressionNode;
  private operatorNode: OperatorNode;

  constructor() {
    this.MultiplicativeExpressionNode = new MultiplicativeExpressionNode();
  }

  public withLeftExpression(expressionNode: ExpressionNode): MultiplicativeExpressionBuilder {
    this.LeftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): MultiplicativeExpressionBuilder {
    this.RightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): MultiplicativeExpressionBuilder {
    this.operatorNode = operatorNode;
    return this;
  }
  public build(): MultiplicativeExpressionNode {
    this.MultiplicativeExpressionNode.addChild(this.LeftExpressionNode);
    this.MultiplicativeExpressionNode.addChild(this.operatorNode);
    this.MultiplicativeExpressionNode.addChild(this.RightExpressionNode);
    this.MultiplicativeExpressionNode.buildObjectValue();

    return this.MultiplicativeExpressionNode;
  }
}
