import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ControllerResolversNode } from '../../nodes/setup/ControllerResolversNode.js';
import { ControllerResolverNode } from '../../nodes/setup/ControllerResolverNode.js';

export class ControllerResolversNodeBuilder implements IBuilder<ControllerResolversNode> {
  private controllerResolversNode: ControllerResolversNode;
  private controllerResolverBinds: ControllerResolverNode[];

  constructor(nodeMetadata?: TNodeMetadata) {
    this.controllerResolversNode = new ControllerResolversNode(nodeMetadata);
  }

  public withControllerResolvers(
    controllerResolverBinds: ControllerResolverNode[],
  ): ControllerResolversNodeBuilder {
    this.controllerResolverBinds = controllerResolverBinds;
    return this;
  }

  public build(): ControllerResolversNode {
    for (const controllerResolverBind of this.controllerResolverBinds) {
      this.controllerResolversNode.addChild(controllerResolverBind);
    }
    this.controllerResolversNode.buildArrayValue();

    return this.controllerResolversNode;
  }
}
