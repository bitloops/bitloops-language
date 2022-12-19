import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class ApplicationErrorNode extends ClassTypeNode {
  private static classType = ClassTypes.ApplicationError;
  private static classNodeName = 'ApplicationError';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ApplicationErrorNode.classType,
      nodeType: BitloopsTypesMapping.TDomainError,
      metadata,
      classNodeName: ApplicationErrorNode.classNodeName,
    });
    this.nodeType = BitloopsTypesMapping.TApplicationError;
  }
}
