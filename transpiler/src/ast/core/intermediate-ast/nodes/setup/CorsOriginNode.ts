import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class CorsOriginNode extends IntermediateASTNode {
  private static classNodeName = 'origin';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TCorsOrigin, metadata, CorsOriginNode.classNodeName);
  }
}
