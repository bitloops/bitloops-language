// import { DomainEventHandlerDeclarationNodeBuilder } from '../builders/DomainEventHandler/DomainEventHandlerDeclarationNodeBuilder.js';
import { EventHandlerBusDependenciesNodeBuilder } from '../builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { IntegrationEventNode } from '../nodes/integration-event/IntegrationEventNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class IntegrationEventNodeTransformer extends NodeModelToTargetASTTransformer<IntegrationEventNode> {
  run(): void {
    this.addBuiltinBusDependencies();
  }

  private addBuiltinBusDependencies(): void {
    const eventBusDependenciesNode = new EventHandlerBusDependenciesNodeBuilder()
      .withCommandBus()
      .build();
    this.node.addChild(eventBusDependenciesNode);

    // const domainEventHandler = new DomainEventHandlerDeclarationNodeBuilder(this.tree).build();
  }
}
