import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterControllerNode extends IntermediateASTNode {
  private static classNodeName = 'routerController';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterController, metadata, RouterControllerNode.classNodeName);
  }
}
