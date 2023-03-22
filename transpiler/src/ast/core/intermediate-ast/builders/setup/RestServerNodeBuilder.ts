import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestServerNode } from '../../nodes/setup/RestServerNode.js';
import { ServerOptionsNode } from '../../nodes/setup/ServerOptionsNode.js';
import { ServerRoutesNode } from '../../nodes/setup/ServerRoutesNode.js';
import { IBuilder } from '../IBuilder.js';

export class RestServerNodeBuilder implements IBuilder<RestServerNode> {
  private restServerNode: RestServerNode;
  private routes: ServerRoutesNode;
  private serverOptions: ServerOptionsNode;
  private intermediateASTTree: IntermediateASTTree;

  constructor(intermediateASTTree: IntermediateASTTree, nodeMetadata?: TNodeMetadata) {
    this.intermediateASTTree = intermediateASTTree;
    this.restServerNode = new RestServerNode(nodeMetadata);
  }

  public withRoutes(routes: ServerRoutesNode): RestServerNodeBuilder {
    this.routes = routes;
    return this;
  }

  public withServerOptions(serverOptions: ServerOptionsNode): RestServerNodeBuilder {
    this.serverOptions = serverOptions;
    return this;
  }

  public build(): RestServerNode {
    this.intermediateASTTree.insertChild(this.restServerNode);
    this.intermediateASTTree.insertChild(this.routes);
    this.intermediateASTTree.insertSibling(this.serverOptions);
    this.intermediateASTTree.setCurrentNodeToRoot();

    this.restServerNode.buildObjectValue();

    return this.restServerNode;
  }
}
