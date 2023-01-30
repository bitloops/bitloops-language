import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class RestServerAPIPrefixNode extends IntermediateASTNode {
  private static classNodeName = 'apiPrefix';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TAPIPrefix, metadata, RestServerAPIPrefixNode.classNodeName);
  }
}
