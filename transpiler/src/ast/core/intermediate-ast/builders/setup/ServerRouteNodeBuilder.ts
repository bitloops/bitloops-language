import { IBuilder } from '../IBuilder.js';
import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { ServerRouteNode } from '../../nodes/setup/ServerRouteNode.js';
import { IdentifierNode } from '../../nodes/identifier/IdentifierNode.js';
import { RestServerRouterPrefixNode } from '../../nodes/setup/RestServerRouterPrefixNode.js';

export class ServerRouteNodeBuilder implements IBuilder<ServerRouteNode> {
  private serverRouteNode: ServerRouteNode;
  private instanceName: IdentifierNode;
  private routerPrefix: RestServerRouterPrefixNode;

  constructor(nodeMetadata?: TNodeMetadata) {
    this.serverRouteNode = new ServerRouteNode(nodeMetadata);
  }

  public withInstanceName(instanceName: IdentifierNode): ServerRouteNodeBuilder {
    this.instanceName = instanceName;
    return this;
  }

  public withRouterPrefix(routerPrefix: RestServerRouterPrefixNode): ServerRouteNodeBuilder {
    this.routerPrefix = routerPrefix;
    return this;
  }

  public build(): ServerRouteNode {
    this.serverRouteNode.addChild(this.instanceName);
    this.serverRouteNode.addChild(this.routerPrefix);

    this.serverRouteNode.buildObjectValue();

    return this.serverRouteNode;
  }
}
