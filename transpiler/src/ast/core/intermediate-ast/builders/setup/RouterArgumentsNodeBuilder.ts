import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RouterArgumentsNode } from '../../nodes/setup/RouterArgumentsNode.js';
import { ServerTypeIdentifierNode } from '../../nodes/setup/ServerTypeIdentifierNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterArgumentsNodeBuilder implements IBuilder<RouterArgumentsNode> {
  private routerArgumentsNode: RouterArgumentsNode;
  private serverType: ServerTypeIdentifierNode;

  constructor(metadata?: TNodeMetadata) {
    this.routerArgumentsNode = new RouterArgumentsNode(metadata);
  }

  public withServerType(serverType: ServerTypeIdentifierNode): RouterArgumentsNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): RouterArgumentsNode {
    this.routerArgumentsNode.addChild(this.serverType);

    this.routerArgumentsNode.buildObjectValue();

    return this.routerArgumentsNode;
  }
}
