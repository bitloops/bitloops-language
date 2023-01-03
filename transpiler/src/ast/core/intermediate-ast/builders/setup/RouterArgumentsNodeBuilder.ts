import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RouterArgumentsNode } from '../../nodes/setup/RouterArgumentsNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterArgumentsNodeBuilder implements IBuilder<RouterArgumentsNode> {
  private routerArgumentsNode: RouterArgumentsNode;
  private serverType: any; // TODO ServerTypeNode

  constructor(metadata?: TNodeMetadata) {
    this.routerArgumentsNode = new RouterArgumentsNode(metadata);
  }

  public withServerType(serverType: any): RouterArgumentsNodeBuilder {
    this.serverType = serverType;
    return this;
  }

  public build(): RouterArgumentsNode {
    this.routerArgumentsNode.addChild(this.serverType);

    this.routerArgumentsNode.buildObjectValue();

    return this.routerArgumentsNode;
  }
}
