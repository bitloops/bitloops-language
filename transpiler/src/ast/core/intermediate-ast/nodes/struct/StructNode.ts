import { ClassTypes, BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { StructIdentifierNode } from './StructIdentifierNode.js';

export class StructNode extends ClassTypeNode {
  private static classType = ClassTypes.Struct;
  private static classNodeName = 'Struct';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: StructNode.classType,
      nodeType: BitloopsTypesMapping.TStruct,
      metadata,
      classNodeName: StructNode.classNodeName,
    });
  }
  public getIdentifier(): StructIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TStructIdentifier,
    ) as StructIdentifierNode;
    return identifier;
  }
}
