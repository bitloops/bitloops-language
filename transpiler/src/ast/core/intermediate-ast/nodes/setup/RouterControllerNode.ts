import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { RESTControllerIdentifierNode } from '../controllers/restController/RESTControllerIdentifierNode.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterControllerNode extends IntermediateASTNode {
  private static classNodeName = 'routerController';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterController, metadata, RouterControllerNode.classNodeName);
  }

  public getRouterControllerIdentifier(): RESTControllerIdentifierNode {
    const children = this.getChildren();
    const controllerIdentifier = children.find(
      (child) => child.getNodeType() === BitloopsTypesMapping.TRESTControllerIdentifier,
    );
    if (!controllerIdentifier) {
      throw new Error('Router controller identifier not found');
    }
    return controllerIdentifier as RESTControllerIdentifierNode;
  }
}
