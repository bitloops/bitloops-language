import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../../target/typescript/core/modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../../../../../target/typescript/core/type-identifiers/bitloopsPrimType.js';
import { bitloopsIdentifiersTypeKey } from '../../../../../types.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
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

  public getFieldsPrimitives(tree: IntermediateASTTree): Record<
    string,
    | {
        primitiveValue: string;
        identifier?: string;
      }
    | string
  > {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const primitivesValues = {};
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeValue();

      let typeTarget;
      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const res = modelToTargetLanguage({
          type: BitloopsTypesMapping.TBitloopsPrimaryType,
          value: { type },
        });
        typeTarget = res.output;
        primitivesValues[identifier] = typeTarget;
      } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
        typeTarget = BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
        primitivesValues[identifier] = typeTarget;
      } else if (BitloopsPrimTypeIdentifiers.isBitloopsValueObjectIdentifier(type)) {
        //TODO add valueObjectIdentifier to the result
        const valueObject = tree.getValueObjectByIdentifier(type[bitloopsIdentifiersTypeKey]);
        const propsNode = tree.getPropsNodeOfValueObject(valueObject);
        const fieldPrimitives = propsNode.getFieldsPrimitives(tree);
        primitivesValues[identifier] = {};
        const valueObjectIdentifier = valueObject.getIdentifier();
        for (const [fieldPrimitiveKey, fieldPrimitiveValue] of Object.entries(fieldPrimitives)) {
          primitivesValues[identifier][fieldPrimitiveKey] = {
            primitiveValue: fieldPrimitiveValue,
            identifier: valueObjectIdentifier,
          };
        }
      } else if (BitloopsPrimTypeIdentifiers.isStandardValueType(type)) {
        const result = BitloopsPrimTypeIdentifiers.standardVOToPrimitiveType(type);
        primitivesValues[identifier] = {
          primitiveValue: result.primitive,
          identifier: result.type,
          isStandardVO: true,
        };
      }
    });
    return primitivesValues;
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
