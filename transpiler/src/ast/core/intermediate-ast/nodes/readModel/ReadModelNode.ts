import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { ReadModelKey, TBitloopsPrimitives, TValueObjectIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { ReadModelIdentifierNode } from './ReadModelIdentifierNode.js';

export class ReadModelNode extends ClassTypeNode {
  private static classType = ClassTypes.ReadModel;
  private static nodeType = BitloopsTypesMapping.TReadModel;
  private static classNodeName = ReadModelKey;

  constructor(metadata?: TNodeMetadata) {
    super({
      classType: ReadModelNode.classType,
      nodeType: ReadModelNode.nodeType,
      metadata,
      classNodeName: ReadModelNode.classNodeName,
    });
  }
  public getIdentifier(): ReadModelIdentifierNode {
    const identifier = this.getChildNodeByType(
      BitloopsTypesMapping.TReadModelIdentifier,
    ) as ReadModelIdentifierNode;
    return identifier;
  }

  public getIdentifierValue(): string {
    return this.getIdentifier().getIdentifierName();
  }

  public getFieldListNode(): FieldListNode {
    return this.getChildNodeByType<FieldListNode>(BitloopsTypesMapping.TVariables);
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
