import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
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
  // TODO Should try to refactor into something like this

  static buildFromPrimitives(primitivesObject: TGetFieldPrimitives, keyToPrepend = 'data'): string {
    let result = '';
    for (const [primitivesKey, propertyValue] of Object.entries(primitivesObject)) {
      if (isIdPrimitivesKey(primitivesKey)) {
        result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
      } else {
        if (PrimitivesObjectTypeGuard.isPrimitiveProperty(propertyValue)) {
          result += `${primitivesKey}: ${keyToPrepend}.${primitivesKey},`;
          result += '\n';
          continue;
        }
        if (PrimitivesObjectTypeGuard.isArrayType(propertyValue)) {
          // TODO: update this
          const updatedKeyToPrepend = `${keyToPrepend}.${primitivesKey}`;
          const arrayValue = this.buildArrayFromPrimitives(propertyValue, updatedKeyToPrepend);
          result += `${primitivesKey}: ${arrayValue},`;
          continue;
        }

        if (PrimitivesObjectTypeGuard.isValueObjectType(propertyValue)) {
          // It is either Value Object or Entity
          // let primitivesValue = propertyValue.primitiveValue ?? propertyValue;

          const identifier = propertyValue.identifier;
          result += `${primitivesKey}: ${identifier}.fromPrimitives(${keyToPrepend}.${primitivesKey}),`;
          continue;
        }
      }
      result += '\n';
    }
    return result;
  }

  /**
   * @example
  public static fromPrimitives(data: TMoneyVOPrimitives): MoneyVO {
    const MoneyVOProps = {
      currency: data.currency,
      amount: AmountVO.fromPrimitives(data.amount),
      denominations: data.denominations,
      rates: data.rates.map((rate) => RateVO.fromPrimitives(rate)),
    };
    return new MoneyVO(MoneyVOProps);
  }
   */
  private static buildArrayFromPrimitives(
    propertyValue: TArrayPropertyValue,
    keyToPrepend: string,
  ): string {
    const arrayValue = propertyValue.value;

    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return keyToPrepend;
    }
    if (PrimitivesObjectTypeGuard.isValueObjectType(arrayValue)) {
      const variableName = 'x';
      const valueObjectIdentifier = arrayValue.identifier;
      return `${keyToPrepend}.map((${variableName}) => 
      ${valueObjectIdentifier}.fromPrimitives(${variableName})
      )`;
    }
    // If array of primitives, we don't need to map
    // Probably array of arrays
    throw new Error('Unhandled array types case');
  }

  // private static getBuiltInClassFromPrimitivesValue = (data: {
  //   keyToPrepend: string;
  //   key: string;
  //   fields: FieldNode[];
  // }): {
  //   builtInClassVariableValue: string;
  //   builtInClassVariableFound: boolean;
  // } => {
  //   const { keyToPrepend, key, fields } = data;
  //   let builtInClassVariableFound = false;
  //   let builtInClassVariableValue = '';
  //   for (const fieldNode of fields) {
  //     if (fieldNode.getIdentifierNode().getValue().identifier === key) {
  //       if (fieldNode.getTypeNode().getBuiltInClassName() === BitloopsBuiltInClassNames.UUIDv4) {
  //         if (isNestedKey(keyToPrepend)) {
  //           builtInClassVariableValue += `${key}: new Domain.UUIDv4(${keyToPrepend}.${key}) as Domain.UUIDv4`;
  //         } else {
  //           builtInClassVariableValue += `${key}: new Domain.UUIDv4(${key}) as Domain.UUIDv4`;
  //         }
  //         builtInClassVariableFound = true;
  //         continue;
  //       }
  //     }
  //   }
  //   return {
  //     builtInClassVariableValue,
  //     builtInClassVariableFound,
  //   };
  // };
}

export { generateFromPrimitives };
