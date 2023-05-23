import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { EqualityExpressionNode } from '../../nodes/Expression/equalityExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';

export class EqualityExpressionBuilder implements IBuilder<EqualityExpressionNode> {
  public readonly NAME = 'equalityExpression';

  private equalityExpressionNode: EqualityExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor(metadata?: TNodeMetadata) {
    this.equalityExpressionNode = new EqualityExpressionNode(metadata);
  }

  public withLeftExpression(expressionNode: LeftExpressionNode): EqualityExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: RightExpressionNode): EqualityExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): EqualityExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): EqualityExpressionNode {
    this.equalityExpressionNode.addChild(this.leftExpressionNode);
    this.equalityExpressionNode.addChild(this.operator);
    this.equalityExpressionNode.addChild(this.rightExpressionNode);
    this.equalityExpressionNode.buildObjectValue();

    return this.equalityExpressionNode;
  }
}
