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

      const voPrimitivesResult: ValueObjectPrimitives = {
        type: PrimitiveObjectPropertyType.ValueObject,
        identifier: valueObjectIdentifier,
      };
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
      const result = BitloopsPrimTypeIdentifiers.standardVOToPrimitiveType(type);
      return {
        type: PrimitiveObjectPropertyType.StandardVO,
        identifier: result.type,
      };
    }
    if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
      const bitloopsPrimaryTypeValues = type[arrayPrimaryTypeKey];
      return {
        type: PrimitiveObjectPropertyType.Array,
        value: this.getPrimitiveValue(bitloopsPrimaryTypeValues, tree),
      };
    }
    throw new Error('Not implemented');
  }
}
