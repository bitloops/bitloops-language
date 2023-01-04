import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class CorsOptionsNode extends IntermediateASTNode {
  private static classNodeName = 'corsOptions';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TCorsOptions, metadata, CorsOptionsNode.classNodeName);
  }
}
