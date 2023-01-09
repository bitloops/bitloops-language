import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ControllerResolverBindNode } from '../../nodes/setup/ControllerResolverBindNode.js';
import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';

export class ControllerResolverBindNodeBuilder implements IBuilder<ControllerResolverBindNode> {
  private controllerResolverBindNode: ControllerResolverBindNode;
  private boundedContextModuleNode: BoundedContextModuleNode;
  private methodArgumentsNode: ArgumentListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.controllerResolverBindNode = new ControllerResolverBindNode(nodeMetadata);
  }

  public withBoundedContextModule(
    boundedContextModuleNode: BoundedContextModuleNode,
  ): ControllerResolverBindNodeBuilder {
    this.boundedContextModuleNode = boundedContextModuleNode;
    return this;
  }

  public withMethodArguments(
    methodArgumentsNode: ArgumentListNode,
  ): ControllerResolverBindNodeBuilder {
    this.methodArgumentsNode = methodArgumentsNode;
    return this;
  }
  public build(): ControllerResolverBindNode {
    this.controllerResolverBindNode.addChild(this.boundedContextModuleNode);
    this.controllerResolverBindNode.addChild(this.methodArgumentsNode);
    this.controllerResolverBindNode.buildObjectValue();

    return this.controllerResolverBindNode;
  }
}
