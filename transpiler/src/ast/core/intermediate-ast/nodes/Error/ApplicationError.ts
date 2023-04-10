import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

// This would extend the ExpressionNode class instead
export class ApplicationErrorNode extends ClassTypeNode {
  private static classType = ClassTypes.ApplicationError;
  private static classNodeName = 'ApplicationError';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ApplicationErrorNode.classType,
      nodeType: BitloopsTypesMapping.TApplicationError,
      metadata,
      classNodeName: ApplicationErrorNode.classNodeName,
    });
  }
  public getIdentifier(): IdentifierNode {
    const identifier = this.getChildNodeByType(BitloopsTypesMapping.TIdentifier) as IdentifierNode;
    return identifier;
  }
}
