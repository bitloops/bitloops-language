import { DomainEventHandlerIdentifierNode } from '../../nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class DomainEventHandlerIdentifierNodeBuilder
  implements IBuilder<DomainEventHandlerIdentifierNode>
{
  private domainEventHandlerIdentifierNode: DomainEventHandlerIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventHandlerIdentifierNode = new DomainEventHandlerIdentifierNode(metadata);
  }

  public withName(identifierName: string): DomainEventHandlerIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): DomainEventHandlerIdentifierNode {
    this.domainEventHandlerIdentifierNode.buildLeafValue(this.name);

    return this.domainEventHandlerIdentifierNode;
  }
}
