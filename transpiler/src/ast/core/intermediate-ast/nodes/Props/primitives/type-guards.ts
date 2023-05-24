import { TypeUtils } from '../../../../../../utils/TypeUtils.js';
import {
  PrimitiveObjectPropertyType,
  PrimitiveType,
  TArrayPropertyValue,
  ValueObjectPrimitives,
} from './types.js';

export class PrimitivesObjectTypeGuard {
  static isPrimitiveProperty(propertyTypeValue: any): propertyTypeValue is PrimitiveType {
    return typeof propertyTypeValue === 'string';
  }
  static isArrayType(propertyTypeValue: any): propertyTypeValue is TArrayPropertyValue {
    return propertyTypeValue && propertyTypeValue.type === PrimitiveObjectPropertyType.Array;
  }

  static isValueObjectType(propertyTypeValue: any): propertyTypeValue is ValueObjectPrimitives {
    return TypeUtils.hasObjectType(propertyTypeValue);
  }

  static hasObjectType(type): boolean {
    return TypeUtils.hasObjectType(type);
  }
}
