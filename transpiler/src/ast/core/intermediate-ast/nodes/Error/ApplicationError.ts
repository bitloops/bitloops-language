import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ApplicationErrorKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class ApplicationErrorNode extends IntermediateASTNode {
  private static NAME = ApplicationErrorKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainError, metadata, ApplicationErrorNode.NAME);
    this.nodeType = BitloopsTypesMapping.TApplicationError;
  }
}
