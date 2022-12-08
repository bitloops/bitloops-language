import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class ValueObjectDeclarationNode extends ClassTypeNode {
  private static classType = ClassTypes.ValueObject;
  private static classNodeName = 'ValueObject';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ValueObjectDeclarationNode.classType,
      nodeType: BitloopsTypesMapping.TValueObject,
      metadata,
      classNodeName: ValueObjectDeclarationNode.classNodeName,
    });
  }
}
