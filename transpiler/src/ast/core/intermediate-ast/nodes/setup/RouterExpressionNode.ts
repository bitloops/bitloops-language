import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
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
}
