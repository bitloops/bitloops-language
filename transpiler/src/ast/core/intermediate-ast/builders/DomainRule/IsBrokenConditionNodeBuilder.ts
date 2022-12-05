import { IsBrokenConditionNode } from '../../nodes/DomainRule/IsBrokenConditionNode.js';
import { ExpressionNode } from '../../nodes/Expression/ExpressionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IsBrokenConditionNodeBuilder implements IBuilder<IsBrokenConditionNode> {
  private isBrokenConditionNode: IsBrokenConditionNode;
  private expression: ExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.isBrokenConditionNode = new IsBrokenConditionNode(metadata);
  }

  public withExpression(expression: ExpressionNode): IsBrokenConditionNodeBuilder {
    this.expression = expression;
    return this;
  }

  public build(): IsBrokenConditionNode {
    this.isBrokenConditionNode.addChild(this.expression);

    this.isBrokenConditionNode.buildObjectValue();

    return this.isBrokenConditionNode;
  }
}
