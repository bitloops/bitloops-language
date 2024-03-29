import { EventHandlerBusDependenciesNodeBuilder } from '../builders/DomainEventHandler/EventHandlerBusDependenciesNodeBuilder.js';
import { DomainEventHandlerDeclarationNode } from '../nodes/DomainEventHandler/DomainEventHandlerDeclarationNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class DomainEventHandlerNodeTransformer extends NodeModelToTargetASTTransformer<DomainEventHandlerDeclarationNode> {
  run(): void {
    this.addBuiltinBusDependencies();
  }

  private addBuiltinBusDependencies(): void {
    const extraDependencies = this.node.getExtraDependenciesNode();
    if (!extraDependencies) {
      const eventBusDependenciesNode = new EventHandlerBusDependenciesNodeBuilder()
        .withCommandBus()
        .withPubSubIntegrationEventBus()
        .withIntegrationEventBus()
        .build();
      this.node.addChild(eventBusDependenciesNode);
    }
  }
}
