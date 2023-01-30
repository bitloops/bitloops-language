import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { GraphQLServerOptionsNode } from '../../nodes/setup/GraphQLServerOptionsNode.js';
import { GraphQLServerNode } from '../../nodes/setup/GraphQLServerNode.js';
import { ControllerResolversNode } from '../../nodes/setup/ControllerResolversNode.js';
import { IBuilder } from '../IBuilder.js';

export class GraphQLServerNodeBuilder implements IBuilder<GraphQLServerNode> {
  private graphQLServerNode: GraphQLServerNode;
  private controllerResolvers: ControllerResolversNode;
  private serverOptions: GraphQLServerOptionsNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, nodeMetadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.graphQLServerNode = new GraphQLServerNode(nodeMetadata);
  }

  public withControllerResolvers(
    controllerResolvers: ControllerResolversNode,
  ): GraphQLServerNodeBuilder {
    this.controllerResolvers = controllerResolvers;
    return this;
  }

  public withServerOptions(serverOptions: GraphQLServerOptionsNode): GraphQLServerNodeBuilder {
    this.serverOptions = serverOptions;
    return this;
  }

  public build(): GraphQLServerNode {
    this.intermediateASTTree.insertChild(this.graphQLServerNode);
    this.intermediateASTTree.insertChild(this.controllerResolvers);
    this.intermediateASTTree.insertSibling(this.serverOptions);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.graphQLServerNode.buildObjectValue();

    return this.graphQLServerNode;
  }
}
