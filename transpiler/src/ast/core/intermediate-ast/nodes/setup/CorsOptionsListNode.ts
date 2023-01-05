import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class CorsOptionsListNode extends IntermediateASTNode {
  private static classNodeName = 'corsOptions';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TCorsOptionsList, metadata, CorsOptionsListNode.classNodeName);
  }
}
