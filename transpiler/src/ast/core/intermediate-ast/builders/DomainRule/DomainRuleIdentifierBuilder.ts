import { DomainRuleIdentifierNode } from '../../nodes/DomainRule/DomainRuleIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainRuleIdentifierBuilder implements IBuilder<DomainRuleIdentifierNode> {
  private identifierNode: DomainRuleIdentifierNode;
  private name: string;

  constructor(nodeMetadata: TNodeMetadata) {
    this.identifierNode = new DomainRuleIdentifierNode(nodeMetadata);
  }

  public withName(name: string): DomainRuleIdentifierBuilder {
    this.name = name;
    return this;
  }

  public build(): DomainRuleIdentifierNode {
    this.identifierNode.buildLeafValue(this.name);

    return this.identifierNode;
  }
}
