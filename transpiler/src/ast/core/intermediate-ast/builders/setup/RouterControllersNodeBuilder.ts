import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RouterControllerNode } from '../../nodes/setup/RouterControllerNode.js';
import { RouterControllersNode } from '../../nodes/setup/RouterControllersNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterControllersNodeBuilder implements IBuilder<RouterControllersNode> {
  private routerControllersNode: RouterControllersNode;
  private routerControllerNodes: RouterControllerNode[];

  constructor(metadata?: TNodeMetadata) {
    this.routerControllersNode = new RouterControllersNode(metadata);
  }

  public withControllers(
    routerControllerNodes: RouterControllerNode[],
  ): RouterControllersNodeBuilder {
    this.routerControllerNodes = routerControllerNodes;
    return this;
  }

  public build(): RouterControllersNode {
    if (this.routerControllerNodes) {
      this.routerControllerNodes.forEach((routerControllerNode) => {
        this.routerControllersNode.addChild(routerControllerNode);
      });
    }
    this.routerControllersNode.buildArrayValue();

    return this.routerControllersNode;
  }
}
