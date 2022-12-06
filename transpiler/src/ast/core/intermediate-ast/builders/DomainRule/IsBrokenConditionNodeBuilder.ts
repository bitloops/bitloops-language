import { ConditionNode } from './../../nodes/statements/ifStatement/ConditionNode.js';
import { IsBrokenConditionNode } from '../../nodes/DomainRule/IsBrokenConditionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IsBrokenConditionNodeBuilder implements IBuilder<IsBrokenConditionNode> {
  private isBrokenConditionNode: IsBrokenConditionNode;
  private conditionNode: ConditionNode;

  constructor(metadata?: TNodeMetadata) {
    this.isBrokenConditionNode = new IsBrokenConditionNode(metadata);
  }

  public withExpression(conditionNode: ConditionNode): IsBrokenConditionNodeBuilder {
    this.conditionNode = conditionNode;
    return this;
  }

  public build(): IsBrokenConditionNode {
    this.isBrokenConditionNode.addChild(this.conditionNode);

    this.isBrokenConditionNode.buildObjectValue();

    return this.isBrokenConditionNode;
  }
}
