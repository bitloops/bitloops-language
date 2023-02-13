import { DomainEventIdentifierNode } from '../../nodes/DomainEvent/DomainEventIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventIdentifierNodeBuilder implements IBuilder<DomainEventIdentifierNode> {
  private domainEventIdentifierNode: DomainEventIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventIdentifierNode = new DomainEventIdentifierNode(metadata);
  }

  public withName(identifierName: string): DomainEventIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): DomainEventIdentifierNode {
    this.domainEventIdentifierNode.buildLeafValue(this.name);

    return this.domainEventIdentifierNode;
  }
}
