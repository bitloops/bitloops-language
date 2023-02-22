import { BitloopsTypesMapping } from '../../../../../helpers/mappings.js';
import { TBitloopsPrimitives, TValueObjectIdentifier, fieldsKey } from '../../../../../types.js';
import { IntermediateASTNode, TNodeMetadata } from '../IntermediateASTNode.js';
import { FieldNode } from './FieldNode.js';

export class FieldListNode extends IntermediateASTNode {
  constructor(metadata?: TNodeMetadata) {
    super(BitloopsTypesMapping.TVariables, metadata, fieldsKey);
  }

  getFieldNodes(): FieldNode[] {
    const fieldNodes = this.getChildrenNodesByType<FieldNode>(BitloopsTypesMapping.TVariable);
    return fieldNodes;
  }

  public getPrimitiveFields(): Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> {
    const fieldsNodes = this.getFieldNodes();
    const result: Array<{ fieldValue: string; fieldType: TBitloopsPrimitives }> = [];
    for (const fieldNode of fieldsNodes) {
      if (fieldNode.isPrimitiveField()) {
        const fieldValue = fieldNode.getIdentifierNode().getIdentifierName();
        const fieldPrimitiveTypeNode = fieldNode.getTypeNode().getPrimitiveTypeNode();
        const fieldType = fieldPrimitiveTypeNode.getTypeValue();
        result.push({ fieldValue, fieldType });
      }
    }
    return result;
  }

  public getValueObjectFields(): Array<{ fieldValue: string; fieldType: TValueObjectIdentifier }> {
    const result: Array<{ fieldValue: string; fieldType: TValueObjectIdentifier }> = [];
    const fieldsNodes = this.getFieldNodes();
    for (const fieldNode of fieldsNodes) {
      if (!fieldNode.isBitloopsIdentifierField()) {
        continue;
      }
      const typeNode = fieldNode.getTypeNode().getBitloopsIdentifierTypeNode();
      if (!typeNode.isValueObjectIdentifier()) {
        continue;
      }
      const valueObjectIdentifier = typeNode.getIdentifierName();
      const fieldValue = fieldNode.getIdentifierNode().getIdentifierName();
      result.push({ fieldValue, fieldType: valueObjectIdentifier });
    }
    return result;
  }

  public hasOnlyOnePrimitiveField():
    | { result: true; type: TBitloopsPrimitives }
    | { result: false } {
    const primitiveFields = this.getPrimitiveFields();
    const fieldsNodes = this.getFieldNodes();
    if (fieldsNodes.length !== primitiveFields.length) {
      return { result: false };
    }
    if (primitiveFields.length !== 1) {
      return { result: false };
    }

    return { result: true, type: primitiveFields[0].fieldType };
  }
}
