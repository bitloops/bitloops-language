import { ClassTypes, BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class StructNode extends ClassTypeNode {
  private static classType = ClassTypes.Structs;
  private static classNodeName = 'Struct';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: StructNode.classType,
      nodeType: BitloopsTypesMapping.TStructDeclaration,
      metadata,
      classNodeName: StructNode.classNodeName,
    });
  }
}
