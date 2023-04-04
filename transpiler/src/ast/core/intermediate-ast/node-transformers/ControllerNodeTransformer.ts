import { ControllerBusDependenciesNodeBuilder } from '../builders/controllers/ControllerBusDependenciesNodeBuilder.js';
import { ControllerNode } from '../nodes/controllers/ControllerNode.js';
import { NodeModelToTargetASTTransformer } from './index.js';

export class ControllerNodeTransformer extends NodeModelToTargetASTTransformer<ControllerNode> {
  run(): void {
    this.addBuiltinBusDependencies();
  }

  private addBuiltinBusDependencies(): void {
    const extraDependencies = this.node.getExtraDependenciesNode();
    if (!extraDependencies) {
      const eventBusDependenciesNode = new ControllerBusDependenciesNodeBuilder()
        .withCommandBus()
        .withQueryBus()
        .build();
      this.node.addChild(eventBusDependenciesNode);
    }
  }
}
