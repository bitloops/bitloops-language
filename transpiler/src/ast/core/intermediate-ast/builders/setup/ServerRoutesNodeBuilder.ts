import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerRoutesNode } from '../../nodes/setup/ServerRoutesNode.js';
import { ServerRouteNode } from '../../nodes/setup/ServerRouteNode.js';

export class ServerRoutesNodeBuilder implements IBuilder<ServerRoutesNode> {
  private serverRoutesNode: ServerRoutesNode;
  private serverRoutes: ServerRouteNode[];

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverRoutesNode = new ServerRoutesNode(nodeMetadata);
  }

  public withServerRoutes(serverRoutes: ServerRouteNode[]): ServerRoutesNodeBuilder {
    this.serverRoutes = serverRoutes;
    return this;
  }

  public build(): ServerRoutesNode {
    for (const serverRoute of this.serverRoutes) {
      this.serverRoutesNode.addChild(serverRoute);
    }
    this.serverRoutesNode.buildArrayValue();

    return this.serverRoutesNode;
  }
}
