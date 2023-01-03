import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RouterArgumentsNode extends IntermediateASTNode {
  private static classNodeName = 'routerArguments';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterArguments, metadata, RouterArgumentsNode.classNodeName);
  }
}
