import { DomainEventHandlerDeclarationNodeBuilder } from '../builders/DomainEventHandler/DomainEventHandlerDeclarationNodeBuilder.js';
import { DomainEventHandlerIdentifierNodeBuilder } from '../builders/DomainEventHandler/DomainEventHandlerIdentifierNodeBuilder.js';
import { EventHandlerBusDependenciesNodeBuilder } from '../builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { EventHandlerHandleMethodNodeBuilderDirector } from '../directors/EventHandlerHandleMethodNodeBuilderDirector.js';
import { DomainEventHandlerIdentifierNode } from '../nodes/DomainEventHandler/DomainEventHandlerIdentifierNode.js';
import { IntegrationEventNode } from '../nodes/integration-event/IntegrationEventNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class IntegrationEventNodeTransformer extends NodeModelToTargetASTTransformer<IntegrationEventNode> {
  run(): void {
    this.addDomainToIntegrationEventHandler();
  }

  private addDomainToIntegrationEventHandler(): void {
    const domainEventIdentifier = this.node.getInputDomainEventIdentifier();
    if (domainEventIdentifier) {
      const domainToIntegrationEventIdentifierNode =
        this.buildDomainToIntegrationEventIdentifier(domainEventIdentifier);

      const eventBusDependenciesNode = new EventHandlerBusDependenciesNodeBuilder()
        .withIntegrationEventBus()
        .build();

      const integrationEventIdentifier = this.node.getIntegrationEventIdentifier();
      const eventHandleNode =
        new EventHandlerHandleMethodNodeBuilderDirector().buildDomainToIntegrationEventHandleNode({
          domainEventIdentifier,
          integrationEventIdentifier,
          integrationEventEvaluationInputName: 'event',
          constIdentifierName: 'events',
          eventBusMethodCallName: 'publishMany',
          eventBusMemberDotName: 'eventBus',
        });

      new DomainEventHandlerDeclarationNodeBuilder(this.tree)
        .withIdentifier(domainToIntegrationEventIdentifierNode)
        .withHandleMethod(eventHandleNode)
        .withEventBusDependencies(eventBusDependenciesNode)
        .build();
    }
  }

  private buildDomainToIntegrationEventIdentifier(
    domainEventIdentifier: string,
  ): DomainEventHandlerIdentifierNode {
    const domainToIntegrationEventIdentifier = `${domainEventIdentifier}ToIntegrationEventHandler`;
    const domainToIntegrationEventIdentifierNode = new DomainEventHandlerIdentifierNodeBuilder()
      .withName(domainToIntegrationEventIdentifier)
      .build();
    return domainToIntegrationEventIdentifierNode;
  }
}
