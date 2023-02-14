import { EventHandlerBusDependenciesNodeBuilder } from '../builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { IntegrationEventHandlerDeclarationNode } from '../nodes/integration-event/IntegrationEventHandlerDeclarationNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class IntegrationEventHandlerNodeTransformer extends NodeModelToTargetASTTransformer<IntegrationEventHandlerDeclarationNode> {
  run(): void {
    this.addBuiltinBusDependencies();
  }

  private addBuiltinBusDependencies(): void {
    const eventBusDependenciesNode = new EventHandlerBusDependenciesNodeBuilder()
      .withCommandBus()
      .build();
    this.node.addChild(eventBusDependenciesNode);
  }
}
