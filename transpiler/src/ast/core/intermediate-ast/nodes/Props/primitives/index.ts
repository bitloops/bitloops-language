import { BitloopsTypesMapping } from '../../../../../../helpers/mappings.js';
import { modelToTargetLanguage } from '../../../../../../target/typescript-nest/core/modelToTargetLanguage.js';
import { BitloopsPrimTypeIdentifiers } from '../../../../../../target/typescript-nest/core/type-identifiers/bitloopsPrimType.js';
import {
  TBitloopsIdentifier,
  TBitloopsPrimaryTypeValues,
  arrayPrimaryTypeKey,
  bitloopsIdentifiersTypeKey,
} from '../../../../../../types.js';
import { IntermediateASTTree } from '../../../IntermediateASTTree.js';
import {
  EntityPrimitives,
  PrimitiveObjectPropertyType,
  PrimitiveType,
  TGetFieldPrimitivesValue,
  ValueObjectPrimitives,
} from './types.js';

export class PrimitivesObject {
  static getPrimitiveValue(
    type: TBitloopsPrimaryTypeValues,
    tree: IntermediateASTTree,
  ): TGetFieldPrimitivesValue {
    if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
      const res = modelToTargetLanguage({
        type: BitloopsTypesMapping.TBitloopsPrimaryType,
        value: { type },
      });
      const primitive: PrimitiveType = {
        type: PrimitiveObjectPropertyType.Primitive,
        value: res.output,
      };
      return primitive;
    }
    if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
      const primitive: PrimitiveType = {
        type: PrimitiveObjectPropertyType.Primitive,
        value: BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type),
      };
      return primitive;
    }
    if (BitloopsPrimTypeIdentifiers.isBitloopsValueObjectIdentifier(type)) {
      const valueObjectIdentifier: TBitloopsIdentifier = type[bitloopsIdentifiersTypeKey];
      const valueObject = tree.getValueObjectByIdentifier(type[bitloopsIdentifiersTypeKey]);
      const propsNode = tree.getPropsNodeOfValueObject(valueObject);
      const voFieldPrimitives = propsNode.getFieldsPrimitives(tree);

      // const valueObjectIdentifier = valueObject.getIdentifierValue();
      const voPrimitivesResult: ValueObjectPrimitives = {
        type: PrimitiveObjectPropertyType.ValueObject,
        identifier: valueObjectIdentifier,
        value: {},
      };
      for (const [fieldPrimitiveKey, fieldPrimitiveValues] of Object.entries(voFieldPrimitives)) {
        voPrimitivesResult.value[fieldPrimitiveKey] = fieldPrimitiveValues;
      }
      return voPrimitivesResult;
    }
    if (BitloopsPrimTypeIdentifiers.isBitloopsEntityIdentifier(type)) {
      const entityIdentifier: TBitloopsIdentifier = type[bitloopsIdentifiersTypeKey];
      const entityPrimitivesResult: EntityPrimitives = {
        type: PrimitiveObjectPropertyType.Entity,
        identifier: entityIdentifier,
      };
      return entityPrimitivesResult;
    }
    if (BitloopsPrimTypeIdentifiers.isStandardValueType(type)) {
      // Lets handle it just as value objects,
      //   const voPrimitivesResult: ValueObjectPrimitives = {};
      const result = BitloopsPrimTypeIdentifiers.standardVOToPrimitiveType(type);
      //   for (const [fieldPrimitiveKey, fieldPrimitiveValue] of Object.entries(result.primitive)) {
      //     voPrimitivesResult[fieldPrimitiveKey] = {
      //       primitiveValue: fieldPrimitiveValue as any,
      //       identifier: result.type,
      //     };
      //   }
      //   return voPrimitivesResult;

      return {
        primitiveValue: result.primitive,
        identifier: result.type,
        isStandardVO: true,
      } as any; // TODO Fix
    }
    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
      const bitloopsPrimaryTypeValues = type[arrayPrimaryTypeKey];
      return {
        type: PrimitiveObjectPropertyType.Array,
        value: this.getPrimitiveValue(bitloopsPrimaryTypeValues, tree),
      };
    }
    // TODO Fix
    throw new Error('Not implemented');
  }
}
