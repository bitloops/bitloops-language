import { AdditiveExpressionNode } from '../../nodes/Expression/AdditiveExpression.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class AdditiveExpressionBuilder implements IBuilder<AdditiveExpressionNode> {
  public readonly NAME = 'additiveExpression';

  private AdditiveExpressionNode: AdditiveExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor(metadata?: TNodeMetadata) {
    this.AdditiveExpressionNode = new AdditiveExpressionNode(metadata);
  }

  public withLeftExpression(expressionNode: LeftExpressionNode): AdditiveExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: RightExpressionNode): AdditiveExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): AdditiveExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): AdditiveExpressionNode {
    this.AdditiveExpressionNode.addChild(this.leftExpressionNode);
    this.AdditiveExpressionNode.addChild(this.operator);
    this.AdditiveExpressionNode.addChild(this.rightExpressionNode);
    this.AdditiveExpressionNode.buildObjectValue();

    return this.AdditiveExpressionNode;
  }
}
