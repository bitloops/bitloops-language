import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { RouterArgumentsNode } from './RouterArgumentsNode.js';
import { RouterControllersNode } from './RouterControllersNode.js';

export class RouterExpressionNode extends IntermediateASTNode {
  private static classNodeName = 'routerExpression';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterExpression, metadata, RouterExpressionNode.classNodeName);
  }

  public getRouterControllers(): RouterControllersNode {
    const children = this.getChildren();
    const routerControllers = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TRouterControllers,
    );
    if (!routerControllers) {
      throw new Error('Router controllers not found');
    }
    return routerControllers as RouterControllersNode;
  }

  public getRouterArgumentsNode(): RouterArgumentsNode {
    const children = this.getChildren();
    const routerArgs = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TRouterArguments,
    );
    if (!routerArgs) {
      throw new Error('Router arguments not found');
    }
    return routerArgs as RouterArgumentsNode;
  }
}
