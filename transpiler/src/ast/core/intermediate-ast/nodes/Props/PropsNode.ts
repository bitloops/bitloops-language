import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { IdentifierNode } from '../identifier/IdentifierNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';

export class PropsNode extends ClassTypeNode {
  private static classType = ClassTypes.Props;
  private static classNodeName = 'Props';

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: PropsNode.classType,
      nodeType: BitloopsTypesMapping.TProps,
      metadata,
      classNodeName: PropsNode.classNodeName,
    });
  }

  public getIdentifierNode(): IdentifierNode {
    const identifierNode: IdentifierNode = this.getChildNodeByType(
      BitloopsTypesMapping.TIdentifier,
    );
    return identifierNode;
  }

  public getFieldListNode(): FieldListNode {
    const fieldListNode: FieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables);
    return fieldListNode;
  }
}
