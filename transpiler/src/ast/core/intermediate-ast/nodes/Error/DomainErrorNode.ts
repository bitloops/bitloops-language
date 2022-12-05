import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class DomainErrorNode extends IntermediateASTNode {
  // private static NAME = '';

  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TDomainError, metadata, '');
    this.nodeType = BitloopsTypesMapping.TDomainError;
  }
  setName(name: string): void {
    this.setClassNodeName(name);
  }

  /* 🔧 TODO: implement getMessage and getErrorId methods */
  // getMessage(): ExpressionNode {
  //   return this.message;
  // }
  // getErrorID(): ExpressionNode {
  //   return this.errorId;
  // }
}
