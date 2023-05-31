import { ConditionNode } from './../../nodes/statements/ifStatement/ConditionNode.js';
import { IsBrokenConditionNode } from '../../nodes/DomainRule/IsBrokenConditionNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';
import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';

export class IsBrokenConditionNodeBuilder implements IBuilder<IsBrokenConditionNode> {
  private isBrokenConditionNode: IsBrokenConditionNode;
  private conditionNode: ConditionNode;
  private argumentList?: ArgumentListNode;

  constructor(metadata?: TNodeMetadata) {
    this.isBrokenConditionNode = new IsBrokenConditionNode(metadata);
  }

  public withExpression(conditionNode: ConditionNode): IsBrokenConditionNodeBuilder {
    this.conditionNode = conditionNode;
    return this;
  }

  public withArgumentList(argumentList: ArgumentListNode): IsBrokenConditionNodeBuilder {
    this.argumentList = argumentList;
    return this;
  }

  public build(): IsBrokenConditionNode {
    this.isBrokenConditionNode.addChild(this.conditionNode);

    if (this.argumentList) {
      this.isBrokenConditionNode.addChild(this.argumentList);
    }

    this.isBrokenConditionNode.buildObjectValue();

    return this.isBrokenConditionNode;
  }
}
