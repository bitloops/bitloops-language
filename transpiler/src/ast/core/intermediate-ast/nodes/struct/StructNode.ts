import { ClassTypes, BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { FieldNode } from '../FieldList/FieldNode.js';
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

  public getFieldNodes(): FieldNode[] {
    const fieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables) as FieldListNode;
    if (!fieldListNode) {
      return [];
    }
    return fieldListNode.getFieldNodes();
  }

  public getFieldTypes(): Record<string, BitloopsPrimaryTypeNode> {
    const fieldNodes = this.getFieldNodes();
    const fieldTypes: Record<string, BitloopsPrimaryTypeNode> = {};
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeNode();
      fieldTypes[identifier] = type;
    });
    return fieldTypes;
  }
}
