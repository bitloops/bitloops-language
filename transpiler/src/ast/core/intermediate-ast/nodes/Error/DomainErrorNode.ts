import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { DomainErrorKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class DomainErrorNode extends IntermediateASTNode {
  private static NAME = DomainErrorKey;

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainError, metadata, DomainErrorNode.NAME);
    this.nodeType = BitloopsTypesMapping.TDomainError;
  }

  /* 🔧 TODO: implement getMessage and getErrorId methods */
  // getMessage(): ExpressionNode {
  //   return this.message;
  // }
  // getErrorID(): ExpressionNode {
  //   return this.errorId;
  // }
}
