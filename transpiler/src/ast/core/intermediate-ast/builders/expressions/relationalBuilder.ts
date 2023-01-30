import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { LeftExpressionNode } from '../../nodes/Expression/leftExpressionNode.js';
import { OperatorNode } from '../../nodes/Expression/OperatorNode.js';
import { RelationalExpressionNode } from '../../nodes/Expression/relationalExpressionNode.js';
import { RightExpressionNode } from '../../nodes/Expression/rightExpression.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class RelationalExpressionBuilder implements IBuilder<RelationalExpressionNode> {
  public readonly NAME = 'relationalExpression';

  private RelationalExpressionNode: RelationalExpressionNode;
  private leftExpressionNode: LeftExpressionNode;
  private rightExpressionNode: RightExpressionNode;
  private operator: OperatorNode;

  constructor(metadata?: TNodeMetadata) {
    this.RelationalExpressionNode = new RelationalExpressionNode(metadata);
  }

  public withLeftExpression(expressionNode: ExpressionNode): RelationalExpressionBuilder {
    this.leftExpressionNode = expressionNode;
    return this;
  }
  public withRightExpression(expressionNode: ExpressionNode): RelationalExpressionBuilder {
    this.rightExpressionNode = expressionNode;
    return this;
  }
  public withOperator(operatorNode: OperatorNode): RelationalExpressionBuilder {
    this.operator = operatorNode;
    return this;
  }

  public build(): RelationalExpressionNode {
    this.RelationalExpressionNode.addChild(this.leftExpressionNode);
    this.RelationalExpressionNode.addChild(this.operator);
    this.RelationalExpressionNode.addChild(this.rightExpressionNode);
    this.RelationalExpressionNode.buildObjectValue();

    return this.RelationalExpressionNode;
  }
}
