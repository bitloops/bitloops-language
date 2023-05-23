import { BitloopsTypesMapping, ClassTypes } from '../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../../target/typescript-nest/core/modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../../../../../target/typescript-nest/core/type-identifiers/bitloopsPrimType.js';
import {
  TBitloopsIdentifier,
  TBitloopsPrimaryTypeValues,
  bitloopsIdentifiersTypeKey,
} from '../../../../../types.js';
import { IntermediateASTTree } from '../../IntermediateASTTree.js';
import { TBitloopsPrimitives, TValueObjectIdentifier } from '../../../../../types.js';
import { ClassTypeNode } from '../ClassTypeNode.js';
import { FieldListNode } from '../FieldList/FieldListNode.js';
import { TNodeMetadata } from '../IntermediateASTNode.js';
import { PropsIdentifierNode } from './PropsIdentifierNode.js';
import { BitloopsPrimaryTypeNode } from '../BitloopsPrimaryType/BitloopsPrimaryTypeNode.js';
// const a: TGetFieldPrimitives = {
//   id: 'string',
//   name: 'string',
//   status: {
//     status: {
//       primitiveValue: 'string',
//       identifier: 'StatusVO',
//     },
//   },
// };
type PrimitiveType = string;
type ValueObjectPrimitives = Record<
  // value object, e.g. { status: { status: { primitiveValue: 'string', identifier: 'StatusVO' }} }
  string,
  {
    primitiveValue: TGetFieldPrimitivesValue; //string;
    identifier?: string;
    isStandardVO?: boolean;
  }
>;

type TGetFieldPrimitivesValue =
  | PrimitiveType // primitive, e.g. 'string', 'number', 'boolean'
  | ValueObjectPrimitives
  | Array<TGetFieldPrimitivesValue>; // array of any of the above
type TGetFieldPrimitives = Record<string, TGetFieldPrimitivesValue>;

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

  public getFieldTypes(): Record<string, BitloopsPrimaryTypeNode> {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const fieldTypes: Record<string, BitloopsPrimaryTypeNode> = {};
    fieldNodes.forEach((fieldNode) => {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeNode();
      fieldTypes[identifier] = type;
    });
    return fieldTypes;
  }

  public getFieldNodeType(identifier: string): string {
    const fieldTypes = this.getFieldTypes();
    const fieldType = fieldTypes[identifier];
    return fieldType.getInferredType();
  }

  public getFieldsPrimitives(tree: IntermediateASTTree): TGetFieldPrimitives {
    const fieldNodes = this.getFieldListNode().getFieldNodes();
    const primitivesValues = {};
    for (const fieldNode of fieldNodes) {
      const identifier = fieldNode.getIdentifierValue();
      const type = fieldNode.getTypeValue();

      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const res = modelToTargetLanguage({
          type: BitloopsTypesMapping.TBitloopsPrimaryType,
          value: { type },
        });
        const primitive: PrimitiveType = res.output;
        primitivesValues[identifier] = primitive;
        continue;
      }
      if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
        const primitive: PrimitiveType =
          BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
        primitivesValues[identifier] = primitive;
        continue;
      }
      if (BitloopsPrimTypeIdentifiers.isBitloopsValueObjectIdentifier(type)) {
        const valueObjectIdentifier: TBitloopsIdentifier = type[bitloopsIdentifiersTypeKey];
        const valueObject = tree.getValueObjectByIdentifier(type[bitloopsIdentifiersTypeKey]);
        const propsNode = tree.getPropsNodeOfValueObject(valueObject);
        const voFieldPrimitives = propsNode.getFieldsPrimitives(tree);
        primitivesValues[identifier] = {};

        // const valueObjectIdentifier = valueObject.getIdentifierValue();
        const voPrimitivesResult: ValueObjectPrimitives = {};
        for (const [fieldPrimitiveKey, fieldPrimitiveValue] of Object.entries(voFieldPrimitives)) {
          voPrimitivesResult[fieldPrimitiveKey] = {
            primitiveValue: fieldPrimitiveValue,
            identifier: valueObjectIdentifier,
          };
        }
        primitivesValues[identifier] = voPrimitivesResult;
        continue;
      }
      if (BitloopsPrimTypeIdentifiers.isStandardValueType(type)) {
        const result = BitloopsPrimTypeIdentifiers.standardVOToPrimitiveType(type);
        primitivesValues[identifier] = {
          primitiveValue: result.primitive,
          identifier: result.type,
          isStandardVO: true,
        };
        continue;
      }
      if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
        // we want | Array<TGetFieldPrimitivesValue>; // array of any of the above
        // pass
      }
    }

    return primitivesValues;
  }

  private getPrimitiveValue(
    type: TBitloopsPrimaryTypeValues,
    tree: IntermediateASTTree,
  ): TGetFieldPrimitivesValue {
    if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
      const res = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type },
      });
      const primitive: PrimitiveType = res.output;
      return primitive;
    }
    if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
      const primitive: PrimitiveType =
        BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
      return primitive;
    }
    if (BitloopsPrimTypeIdentifiers.isBitloopsValueObjectIdentifier(type)) {
      const valueObjectIdentifier: TBitloopsIdentifier = type[bitloopsIdentifiersTypeKey];
      const valueObject = tree.getValueObjectByIdentifier(type[bitloopsIdentifiersTypeKey]);
      const propsNode = tree.getPropsNodeOfValueObject(valueObject);
      const voFieldPrimitives = propsNode.getFieldsPrimitives(tree);

      // const valueObjectIdentifier = valueObject.getIdentifierValue();
      const voPrimitivesResult: ValueObjectPrimitives = {};
      for (const [fieldPrimitiveKey, fieldPrimitiveValue] of Object.entries(voFieldPrimitives)) {
        voPrimitivesResult[fieldPrimitiveKey] = {
          primitiveValue: fieldPrimitiveValue,
          identifier: valueObjectIdentifier,
        };
      }
      return voPrimitivesResult;
    }
    if (BitloopsPrimTypeIdentifiers.isStandardValueType(type)) {
      const result = BitloopsPrimTypeIdentifiers.standardVOToPrimitiveType(type);
      return {
        primitiveValue: result.primitive,
        identifier: result.type,
        isStandardVO: true,
      } as any; // TODO Fix
    }
    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
      // we want | Array<TGetFieldPrimitivesValue>; // array of any of the above
      // pass
    }
    // TODO Fix
    return {} as any;
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
