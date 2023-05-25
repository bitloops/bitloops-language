import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
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
    for (const [key, keyValue] of Object.entries(primitivesObject)) {
      if (this.isIdPrimitivesKey(key)) {
        result += this.getToPrimitivesIdValue('id', 'id');
        continue;
      }
      if (PrimitivesObjectTypeGuard.isArrayType(keyValue)) {
        const updatedKeyToPrepend = `${keyToPrepend}.${key}`;
        const arrayToPrimitives = this.buildToPrimitivesOfArray(keyValue, updatedKeyToPrepend);
        result += `${key}: ${arrayToPrimitives},`;
        continue;
      }
      if (PrimitivesObjectTypeGuard.isValueObjectType(keyValue)) {
        const updatedKeyToPrepend = `${keyToPrepend}.${key}`;
        result += `${key}: ${updatedKeyToPrepend}.toPrimitives(),`;
        continue;
      }
      if (PrimitivesObjectTypeGuard.isPrimitiveProperty(keyValue)) {
        result += `${key}: ${keyToPrepend}.${key},`;
        continue;
      }
      if (PrimitivesObjectTypeGuard.isEntityType(keyValue)) {
        const updatedKeyToPrepend = `${keyToPrepend}.${key}`;
        result += `${key}: ${updatedKeyToPrepend}.toPrimitives(),`;
        continue;
      }
      throw new Error(`Unknown type: ${keyValue}`);
    }
    return result;
  }

  private static isIdPrimitivesKey = (primitivesKey: string): boolean => {
    return primitivesKey === 'id';
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
  // TODO make this call buildToPrimitives if possible, to make it closed for modification(open-closed principle)
  private static buildToPrimitivesOfArray = (
    propertyValue: TArrayPropertyValue,
    keyToPrepend: string,
  ): string => {
    const arrayValue = propertyValue.value;
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return keyToPrepend;
    }

    if (PrimitivesObjectTypeGuard.isValueObjectType(arrayValue)) {
      const variableName = 'x';
      return `${keyToPrepend}.map((${variableName}) => (${variableName}.toPrimitives()))`;
    }
    if (PrimitivesObjectTypeGuard.isEntityType(arrayValue)) {
      const variableName = 'x';
      return `${keyToPrepend}.map((${variableName}) => (${variableName}.toPrimitives()))`;
    }
    // Probably array of arrays
    throw new Error('Unhandled array types case');
  };

  private static getToPrimitivesIdValue = (key: string, fullPathKey: string): string => {
    return `${key}: this.${fullPathKey}.toString(),`;
  };

  // private static getBuiltInclassToPrimitivesValue = (data: {
  //   keyToPrepend: string;
  //   key: string;
  //   fields: FieldNode[];
  // }): {
  //   builtInClassVariableValue: string;
  //   builtInClassVariableFound: boolean;
  // } => {
  //   const { keyToPrepend: keyToAppend, key, fields } = data;
  //   let builtInClassVariableValue = '';
  //   let builtInClassVariableFound = false;
  //   for (const fieldNode of fields) {
  //     if (fieldNode.getIdentifierNode().getValue().identifier === key) {
  //       if (fieldNode.getTypeNode().getBuiltInClassName() === 'UUIDv4') {
  //         builtInClassVariableValue += `${key}: ${keyToAppend}.${key}.toString(),`;
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

// const buildStandardVOFieldValue = (data: {
//   keyToAppend: string;
//   key: string;
//   primitivesKey: string;
// }): string => {
//   const { keyToAppend, key, primitivesKey } = data;
//   let propsValue = '';
//   if (isNestedKey(keyToAppend)) {
//     propsValue += `${primitivesKey}: this.props.${keyToAppend}.${key},`;
//   } else {
//     propsValue += `${primitivesKey}: ${key}: this.props.${keyToAppend}.${key},`;
//   }
//   return propsValue;
// };

export { generateToPrimitives };
