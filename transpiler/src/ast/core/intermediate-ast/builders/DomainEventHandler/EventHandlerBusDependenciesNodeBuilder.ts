import { EventHandlerBusDependenciesNode } from '../../nodes/DomainEventHandler/EventHandlerBusDependenciesNode.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { IBuilder } from '../IBuilder.js';

export class EventHandlerBusDependenciesNodeBuilder
  implements IBuilder<EventHandlerBusDependenciesNode>
{
  private domainEventHandlerIdentifierNode: EventHandlerBusDependenciesNode;

  private commandBus: boolean;
  private queryBus: boolean;
  private integrationEventBus: boolean;

  constructor(metadata?: TNodeMetadata) {
    this.domainEventHandlerIdentifierNode = new EventHandlerBusDependenciesNode(metadata);
  }

  public withCommandBus(): EventHandlerBusDependenciesNodeBuilder {
    this.commandBus = true;
    return this;
  }

  public withQueryBus(): EventHandlerBusDependenciesNodeBuilder {
    this.queryBus = true;
    return this;
  }

  public withIntegrationEventBus(): EventHandlerBusDependenciesNodeBuilder {
    this.integrationEventBus = true;
    return this;
  }

  public build(): EventHandlerBusDependenciesNode {
    const value = {
      commandBus: this.commandBus ?? false,
      queryBus: this.queryBus ?? false,
      integrationEventBus: this.integrationEventBus ?? false,
    };
    this.domainEventHandlerIdentifierNode.buildLeafValue(value);

    return this.domainEventHandlerIdentifierNode;
  }
}
