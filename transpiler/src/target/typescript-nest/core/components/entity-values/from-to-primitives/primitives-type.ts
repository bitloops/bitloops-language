import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';

export const getPrimitivesType = (
  primitivesObject: TGetFieldPrimitives,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  let resultType = `type ${typeName} = `;
  resultType += PrimitivesTypeFactory.buildType(primitivesObject);
  return resultType;
};

export class PrimitivesTypeFactory {
  static buildType(primitivesObject: TGetFieldPrimitives): string {
    let result = '{\n';

    for (const [key, keyValue] of Object.entries(primitivesObject)) {
      if (PrimitivesObjectTypeGuard.isPrimitiveProperty(keyValue)) {
        result += `${key}: ${keyValue};\n`;
      } else if (PrimitivesObjectTypeGuard.isArrayType(keyValue)) {
        const arrayTypeResult = this.buildTypeForArray(key, keyValue);
        result += `${key}: ${arrayTypeResult};\n`;
      } else if (PrimitivesObjectTypeGuard.isValueObjectType(keyValue)) {
        result += `${key}: ${this.buildType(keyValue.value)};\n`;
      }
    }
    result += '}';
    return result;
  }

  private static buildTypeForArray(key: string, keyValue: TArrayPropertyValue): string {
    const type = keyValue.value;
    // Primitive is the base condition
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(type)) {
      return `${type}[]`;
    } else if (PrimitivesObjectTypeGuard.isValueObjectType(type)) {
      return `${this.buildType(type.value)}[]`;
    }
    if (PrimitivesObjectTypeGuard.isArrayType(type)) {
      return `${this.buildTypeForArray(key, type)}[]`;
    }
    throw new Error(`Unknown type: ${type}`);
  }
}
