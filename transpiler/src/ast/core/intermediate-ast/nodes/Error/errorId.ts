import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorIdNode extends IntermediateASTNode {
  private static NAME = 'errorId';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorId, metadata, ErrorIdNode.NAME);
  }
}
