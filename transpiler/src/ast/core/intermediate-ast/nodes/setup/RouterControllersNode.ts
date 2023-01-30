import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { RouterControllerNode } from './RouterControllerNode.js';

export class RouterControllersNode extends IntermediateASTNode {
  private static classNodeName = 'routerControllers';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterControllers, metadata, RouterControllersNode.classNodeName);
  }

  public getRouterControllerNodes(): RouterControllerNode[] {
    const routerControllerNodes = this.getChildren();

    return routerControllerNodes as RouterControllerNode[];
  }
}
