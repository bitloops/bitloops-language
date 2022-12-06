import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ReturnOkErrorTypeNode extends IntermediateASTNode {
  private static classNodeName = 'returnType';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TOkErrorReturnType, metadata, ReturnOkErrorTypeNode.classNodeName);
  }
}
