import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

export class ErrorParametersNode extends IntermediateASTNode {
  private static NAME = 'parameters';
  constructor(metadata?: TNodeMetadata) {
    /* 🔧 TODO: correct types */
    super(BitloopsTypesMapping.TExpression, metadata, ErrorParametersNode.NAME);
  }
}
