import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ControllerResolversNode } from '../../nodes/setup/ControllerResolversNode.js';
import { ControllerResolverBindNode } from '../../nodes/setup/ControllerResolverBindNode.js';

export class ControllerResolversNodeBuilder implements IBuilder<ControllerResolversNode> {
  private controllerResolversNode: ControllerResolversNode;
  private controllerResolverBinds: ControllerResolverBindNode[];

  constructor(nodeMetadata?: TNodeMetadata) {
    this.controllerResolversNode = new ControllerResolversNode(nodeMetadata);
  }

  public withControllerResolvers(
    controllerResolverBinds: ControllerResolverBindNode[],
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
