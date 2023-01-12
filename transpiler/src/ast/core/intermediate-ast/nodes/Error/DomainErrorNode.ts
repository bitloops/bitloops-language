import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class DomainErrorNode extends ClassTypeNode {
  private static classType = ClassTypes.DomainError;
  private static classNodeName = 'DomainError';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: DomainErrorNode.classType,
      nodeType: BitloopsTypesMapping.TDomainError,
      metadata,
      classNodeName: DomainErrorNode.classNodeName,
    });
    this.nodeType = BitloopsTypesMapping.TDomainError;
  }
}
