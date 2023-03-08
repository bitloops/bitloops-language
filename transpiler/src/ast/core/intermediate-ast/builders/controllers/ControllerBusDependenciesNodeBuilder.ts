import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ControllerBusDependenciesNode } from '../../nodes/controllers/ControllerBusDependenciesNode.js';
import { IBuilder } from '../IBuilder.js';

export class ControllerBusDependenciesNodeBuilder
  implements IBuilder<ControllerBusDependenciesNode>
{
  private controllerBusDependenciesNode: ControllerBusDependenciesNode;

  private commandBus: boolean;
  private queryBus: boolean;

  constructor(metadata?: TNodeMetadata) {
    this.controllerBusDependenciesNode = new ControllerBusDependenciesNode(metadata);
  }

  public withCommandBus(): ControllerBusDependenciesNodeBuilder {
    this.commandBus = true;
    return this;
  }

  public withQueryBus(): ControllerBusDependenciesNodeBuilder {
    this.queryBus = true;
    return this;
  }

  public build(): ControllerBusDependenciesNode {
    const value = {
      commandBus: this.commandBus ?? false,
      queryBus: this.queryBus ?? false,
    };
    this.controllerBusDependenciesNode.buildLeafValue(value);

    return this.controllerBusDependenciesNode;
  }
}
