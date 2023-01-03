import { TNodeMetadata } from '../../nodes/IntermediateASTNode.js';
import { RestRouterNode } from '../../nodes/setup/RestRouterNode.js';
import { RouterArgumentsNode } from '../../nodes/setup/RouterArgumentsNode.js';
import { RouterControllersNode } from '../../nodes/setup/RouterControllersNode.js';
import { RouterExpressionNode } from '../../nodes/setup/RouterExpressionNode.js';
import { IBuilder } from '../IBuilder.js';

export class RouterExpressionNodeBuilder implements IBuilder<RouterExpressionNode> {
  private restRouterNode: RestRouterNode;
  private routerArgumentsNode: RouterArgumentsNode;
  private routerControllersNode: RouterControllersNode;
  private routerExpressionNode: RouterExpressionNode;

  constructor(metadata?: TNodeMetadata) {
    this.routerExpressionNode = new RouterExpressionNode(metadata);
  }

  public withRestRouter(restRouterNode: RestRouterNode): RouterExpressionNodeBuilder {
    this.restRouterNode = restRouterNode;
    return this;
  }

  public withRouterArguments(
    routerArgumentsNode: RouterArgumentsNode,
  ): RouterExpressionNodeBuilder {
    this.routerArgumentsNode = routerArgumentsNode;
    return this;
  }

  public withRouterControllers(
    routerControllersNode: RouterControllersNode,
  ): RouterExpressionNodeBuilder {
    this.routerControllersNode = routerControllersNode;
    return this;
  }

  public build(): RouterExpressionNode {
    this.routerExpressionNode.addChild(this.restRouterNode);
    this.routerExpressionNode.addChild(this.routerArgumentsNode);
    this.routerExpressionNode.addChild(this.routerControllersNode);

    this.routerExpressionNode.buildObjectValue();

    return this.routerExpressionNode;
  }
}
