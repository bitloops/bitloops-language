import { TypeUtils } from '../../../../../../utils/TypeUtils.js';
import { PrimitiveObjectPropertyType, PrimitiveType, TArrayPropertyValue } from './types.js';

export class PrimitivesObjectTypeGuard {
  static isPrimitiveProperty(propertyTypeValue: any): propertyTypeValue is PrimitiveType {
    return typeof propertyTypeValue === 'string';
  }
  static isArrayType(propertyTypeValue: any): propertyTypeValue is TArrayPropertyValue {
    return propertyTypeValue && propertyTypeValue.type === PrimitiveObjectPropertyType.Array;
  }

  static hasObjectType(type): boolean {
    return TypeUtils.hasObjectType(type);
  }
}
