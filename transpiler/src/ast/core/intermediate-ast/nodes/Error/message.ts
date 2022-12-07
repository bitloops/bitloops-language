import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorMessageNode extends IntermediateASTNode {
  private static NAME = 'message';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TErrorMessage, metadata, ErrorMessageNode.NAME);
  }
}
