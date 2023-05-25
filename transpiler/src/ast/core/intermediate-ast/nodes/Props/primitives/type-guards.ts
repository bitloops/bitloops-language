import {
  EntityPrimitives,
  PrimitiveObjectPropertyType,
  PrimitiveType,
  StandardVOType,
  TArrayPropertyValue,
  TGetFieldPrimitivesValue,
  ValueObjectPrimitives,
} from './types.js';

export class PrimitivesObjectTypeGuard {
  static isPrimitiveProperty(
    propertyTypeValue: TGetFieldPrimitivesValue,
  ): propertyTypeValue is PrimitiveType {
    return propertyTypeValue && propertyTypeValue.type === PrimitiveObjectPropertyType.Primitive;
  }
  static isArrayType(
    propertyTypeValue: TGetFieldPrimitivesValue,
  ): propertyTypeValue is TArrayPropertyValue {
    return propertyTypeValue && propertyTypeValue.type === PrimitiveObjectPropertyType.Array;
  }

  static isValueObjectType(
    propertyTypeValue: TGetFieldPrimitivesValue,
  ): propertyTypeValue is ValueObjectPrimitives {
    return propertyTypeValue.type === PrimitiveObjectPropertyType.ValueObject;
  }
  static isStandardVOType(
    propertyTypeValue: TGetFieldPrimitivesValue,
  ): propertyTypeValue is StandardVOType {
    return propertyTypeValue.type === PrimitiveObjectPropertyType.StandardVO;
  }

  static isEntityType(
    propertyTypeValue: TGetFieldPrimitivesValue,
  ): propertyTypeValue is EntityPrimitives {
    return propertyTypeValue.type === PrimitiveObjectPropertyType.Entity;
  }
}
