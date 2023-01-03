import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RestServerRouterPrefixNode extends IntermediateASTNode {
  private static classNodeName = 'routerPrefix';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TRouterPrefix, metadata, RestServerRouterPrefixNode.classNodeName);
  }
}
