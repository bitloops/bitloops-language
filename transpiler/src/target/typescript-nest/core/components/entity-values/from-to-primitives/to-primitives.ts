import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
  TGetFieldPrimitivesValue,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';

const generateToPrimitives = (
  primitivesObject: Record<string, any>,
  valueObjectIdentifier: string,
): string => {
  const typeName = `T${valueObjectIdentifier}Primitives`;
  let result = `public toPrimitives(): ${typeName} {`;
  result += 'return {\n';
  result += ToPrimitivesMethod.buildToPrimitives(primitivesObject);
  result += '};\n}';

  return result;
};

class ToPrimitivesMethod {
  static buildToPrimitives(primitivesObject: TGetFieldPrimitives, keyToPrepend = 'this'): string {
    let result = '';
    for (const [propertyKey, keyValue] of Object.entries(primitivesObject)) {
      if (this.isIdPrimitivesKey(propertyKey)) {
        result += this.getToPrimitivesIdValue('id', 'id');
        continue;
      }

      const updatedKeyToPrepend = `${keyToPrepend}.${propertyKey}`;
      const propValueResult = this.buildToPrimitivesForProperty(updatedKeyToPrepend, keyValue);
      result += `${propertyKey}: ${propValueResult},`;
    }
    return result;
  }

  private static isIdPrimitivesKey = (primitivesKey: string): boolean => {
    return primitivesKey === 'id';
  };

  private static buildToPrimitivesForProperty = (
    keyToPrepend: string,
    keyValue: TGetFieldPrimitivesValue,
  ): string => {
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(keyValue)) {
      return keyToPrepend;
    }
    if (
      PrimitivesObjectTypeGuard.isValueObjectType(keyValue) ||
      PrimitivesObjectTypeGuard.isEntityType(keyValue) ||
      PrimitivesObjectTypeGuard.isStandardVOType(keyValue)
    ) {
      if (keyValue.optional) {
        return `${keyToPrepend}?.toPrimitives()`;
      }
      return `${keyToPrepend}.toPrimitives()`;
    }
    if (PrimitivesObjectTypeGuard.isArrayType(keyValue)) {
      const arrayToPrimitives = this.buildToPrimitivesOfArray(keyValue, keyToPrepend);
      return arrayToPrimitives;
    }
    throw new Error(`Unknown type: ${keyValue}`);
  };

  /**
   * @example
   public toPrimitives(): TMoneyVOPrimitives {
    return {
      currency: this.currency,
      amount: this.amount.toPrimitives(),
      denominations: this.denominations,
      rates: this.rates.map((rate) => rate.toPrimitives()),
    };
  }
   */
  private static buildToPrimitivesOfArray = (
    propertyValue: TArrayPropertyValue,
    keyToPrepend: string,
  ): string => {
    const arrayValue = propertyValue.value;
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return keyToPrepend;
    }

    if (
      PrimitivesObjectTypeGuard.isValueObjectType(arrayValue) ||
      PrimitivesObjectTypeGuard.isEntityType(arrayValue) ||
      PrimitivesObjectTypeGuard.isStandardVOType(arrayValue) ||
      PrimitivesObjectTypeGuard.isArrayType(arrayValue)
    ) {
      const variableName = 'x';
      if (propertyValue.optional) {
        return `${keyToPrepend}?.map((${variableName}) => (${this.buildToPrimitivesForProperty(
          variableName,
          arrayValue,
        )}))`;
      }

      return `${keyToPrepend}.map((${variableName}) => (${this.buildToPrimitivesForProperty(
        variableName,
        arrayValue,
      )}))`;
    }
    throw new Error('Unhandled array types case');
  };

  private static getToPrimitivesIdValue = (key: string, fullPathKey: string): string => {
    return `${key}: this.${fullPathKey}.toString(),`;
  };
}

export { generateToPrimitives };
