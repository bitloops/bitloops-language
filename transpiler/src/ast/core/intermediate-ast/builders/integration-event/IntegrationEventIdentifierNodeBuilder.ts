import { DTOIdentifierNode } from '../../nodes/DTO/DTOIdentifierNode.js';
import { IntegrationEventIdentifierNode } from '../../nodes/integration-event/IntegrationEventIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationEventIdentifierNodeBuilder
  implements IBuilder<IntegrationEventIdentifierNode>
{
  private integrationEventIdentifierNode: IntegrationEventIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.integrationEventIdentifierNode = new IntegrationEventIdentifierNode(metadata);
  }

  public withName(identifierName: string): IntegrationEventIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): DTOIdentifierNode {
    this.integrationEventIdentifierNode.buildLeafValue(this.name);

    return this.integrationEventIdentifierNode;
  }
}
