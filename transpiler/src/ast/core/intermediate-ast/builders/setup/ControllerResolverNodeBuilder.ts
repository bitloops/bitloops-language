import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ControllerResolverNode } from '../../nodes/setup/ControllerResolverNode.js';
import { ArgumentListNode } from '../../nodes/ArgumentList/ArgumentListNode.js';
import { BoundedContextModuleNode } from '../../nodes/setup/BoundedContextModuleNode.js';
import { GraphQLControllerIdentifierNode } from '../../nodes/controllers/graphql/GraphQLControllerIdentifierNode.js';

export class ControllerResolverNodeBuilder implements IBuilder<ControllerResolverNode> {
  private controllerResolverNode: ControllerResolverNode;
  private className: GraphQLControllerIdentifierNode;
  private boundedContextModuleNode: BoundedContextModuleNode;
  private methodArgumentsNode: ArgumentListNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.controllerResolverNode = new ControllerResolverNode(nodeMetadata);
  }

  public withClassName(
    instanceName: GraphQLControllerIdentifierNode,
  ): ControllerResolverNodeBuilder {
    this.className = instanceName;
    return this;
  }

  public withBoundedContextModule(
    boundedContextModuleNode: BoundedContextModuleNode,
  ): ControllerResolverNodeBuilder {
    this.boundedContextModuleNode = boundedContextModuleNode;
    return this;
  }

  public withMethodArguments(methodArgumentsNode: ArgumentListNode): ControllerResolverNodeBuilder {
    this.methodArgumentsNode = methodArgumentsNode;
    return this;
  }

  public build(): ControllerResolverNode {
    this.controllerResolverNode.addChild(this.className);
    this.controllerResolverNode.addChild(this.boundedContextModuleNode);
    this.controllerResolverNode.addChild(this.methodArgumentsNode);

    this.controllerResolverNode.buildObjectValue();

    return this.controllerResolverNode;
  }
}
