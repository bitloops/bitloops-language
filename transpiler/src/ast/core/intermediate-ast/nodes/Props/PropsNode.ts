import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { TBitloopsPrimitives, TValueObjectIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PropsIdentifierNode } from './PropsIdentifierNode.js';

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

  public getPropsIdentifierNode(): PropsIdentifierNode {
    const identifierNode: PropsIdentifierNode = this.getChildNodeByType(
      BitloopsTypesMapping.TPropsIdentifier,
    );
    return identifierNode;
  }

  public getIdentifierValue(): string {
    const identifierNode: PropsIdentifierNode = this.getPropsIdentifierNode();
    return identifierNode.getValue().propsIdentifier;
  }

  public getFieldListNode(): FieldListNode {
    const fieldListNode: FieldListNode = this.getChildNodeByType(BitloopsTypesMapping.TVariables);
    return fieldListNode;
  }

  public getPrimitiveFields(): Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.getPrimitiveFields();
  }

  public getValueObjectFields(): Array<{ fieldValue: string; fieldType: TValueObjectIdentifier }> {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.getValueObjectFields();
  }

  public hasOnlyOnePrimitiveField():
    | { result: true; type: TBitloopsPrimitives }
    | { result: false } {
    const fieldListNode: FieldListNode = this.getFieldListNode();
    return fieldListNode.hasOnlyOnePrimitiveField();
  }
}
