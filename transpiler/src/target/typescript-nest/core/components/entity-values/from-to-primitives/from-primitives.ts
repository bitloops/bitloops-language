import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
  TGetFieldPrimitivesValue,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { PrimitivesTypeFactory } from './primitives-type.js';

const isIdPrimitivesKey = (primitivesKey: string): boolean => {
  return primitivesKey === 'id';
};

const generateFromPrimitives = (
  primitivesObject: TGetFieldPrimitives,
  valueObjectIdentifier: string,
): string => {
  const typeName = PrimitivesTypeFactory.getPrimitivesTypeName(valueObjectIdentifier);
  const propsName = `${valueObjectIdentifier}Props`;
  let result = `public static fromPrimitives(data: ${typeName}): ${valueObjectIdentifier} {`;
  result += `const ${propsName} = {`;
  result += ValueObjectFromPrimitivesMethod.buildFromPrimitives(primitivesObject);
  result += '};\n';
  result += `return new ${valueObjectIdentifier}(${propsName});\n`;
  result += '}';

  return result;
};

class ValueObjectFromPrimitivesMethod {
  static buildFromPrimitives(primitivesObject: TGetFieldPrimitives, keyToPrepend = 'data'): string {
    let result = '';
    for (const [propertyKey, propertyValue] of Object.entries(primitivesObject)) {
      if (isIdPrimitivesKey(propertyKey)) {
        result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,\n';
        continue;
      }
      const updatedKeyToPrepend = `${keyToPrepend}.${propertyKey}`;
      const propResult = this.buildFromPrimitivesForProperty(updatedKeyToPrepend, propertyValue);
      result += `${propertyKey}: ${propResult},`;
      result += '\n';
    }
    return result;
  }

  private static buildFromPrimitivesForProperty(
    keyToPrepend: string,
    propertyValue: TGetFieldPrimitivesValue,
  ): string {
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(propertyValue)) {
      return keyToPrepend;
    }
    if (
      PrimitivesObjectTypeGuard.isValueObjectType(propertyValue) ||
      PrimitivesObjectTypeGuard.isEntityType(propertyValue) ||
      PrimitivesObjectTypeGuard.isStandardVOType(propertyValue)
    ) {
      const identifier = propertyValue.identifier;
      if (propertyValue.optional) {
        return `${keyToPrepend} ? ${identifier}.fromPrimitives(${keyToPrepend}) : undefined`;
      }
      return `${identifier}.fromPrimitives(${keyToPrepend})`;
    }

    if (PrimitivesObjectTypeGuard.isArrayType(propertyValue)) {
      const arrayValue = this.buildArrayFromPrimitives(propertyValue, keyToPrepend);
      return arrayValue;
    }
    throw new Error(`Unhandled fromPrimitivesCase ${propertyValue}}`);
  }

  /**
   * @example
  public static fromPrimitives(data: TMoneyVOPrimitives): MoneyVO {
    const MoneyVOProps = {
      currency: data.currency,
      amount: AmountVO.fromPrimitives(data.amount),
      denominations: data.denominations,
      rates: data.rates.map((x) => RateVO.fromPrimitives(x)),
    };
    return new MoneyVO(MoneyVOProps);
  }
   */
  private static buildArrayFromPrimitives(
    propertyValue: TArrayPropertyValue,
    keyToPrepend: string,
  ): string {
    const arrayValue = propertyValue.value;

    // If array of primitives, we don't need to map
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return keyToPrepend;
    }
    if (
      PrimitivesObjectTypeGuard.isValueObjectType(arrayValue) ||
      PrimitivesObjectTypeGuard.isEntityType(arrayValue) ||
      PrimitivesObjectTypeGuard.isStandardVOType(arrayValue) ||
      PrimitivesObjectTypeGuard.isArrayType(arrayValue) // if it's a 2d+ array, we need to map the inner array
    ) {
      const variableName = 'x';
      if (propertyValue.optional) {
        return `${keyToPrepend} ? ${keyToPrepend}.map((${variableName}) =>
        ${this.buildFromPrimitivesForProperty(variableName, arrayValue)}
        ) : undefined`;
      }
      return `${keyToPrepend}.map((${variableName}) => 
      ${this.buildFromPrimitivesForProperty(variableName, arrayValue)}
      )`;
    }
    throw new Error('Unhandled array types case');
  }
}

export { generateFromPrimitives };
