import { IntegrationEventHandlerIdentifierNode } from '../../nodes/integration-event/IntegrationEventHandlerIdentifierNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class IntegrationEventHandlerIdentifierNodeBuilder
  implements IBuilder<IntegrationEventHandlerIdentifierNode>
{
  private integrationEventHandlerIdentifierNode: IntegrationEventHandlerIdentifierNode;
  private name: string;

  constructor(metadata?: TNodeMetadata) {
    this.integrationEventHandlerIdentifierNode = new IntegrationEventHandlerIdentifierNode(
      metadata,
    );
  }

  public withName(identifierName: string): IntegrationEventHandlerIdentifierNodeBuilder {
    this.name = identifierName;
    return this;
  }

  public build(): IntegrationEventHandlerIdentifierNode {
    this.integrationEventHandlerIdentifierNode.buildLeafValue(this.name);

    return this.integrationEventHandlerIdentifierNode;
  }
}
