import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import { TGetFieldPrimitives } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { TypeUtils } from '../../../../../../utils/TypeUtils.js';

export const getPrimitivesType = (
  primitivesObject: TGetFieldPrimitives,
  entityName: string,
): string => {
  const typeName = `T${entityName}Primitives`;
  let resultType = `type ${typeName} = `;
  resultType += buildPrimitivesTypeValue(primitivesObject, entityName);
  return resultType;
};

const buildPrimitivesTypeValue = (
  primitivesObject: TGetFieldPrimitives,
  entityName: string,
  isStandardValueType = false,
): string => {
  let result = '{\n';

  // TODO fix this undefined fallback
  for (const [key, value] of Object.entries(primitivesObject ?? {})) {
    const type = (value as any).primitiveValue ?? value;
    if (PrimitivesObjectTypeGuard.isArrayType(type)) {
      const nestedType = type.value as any; // TODO fix
      result += `${key}: ${buildPrimitivesTypeValue(nestedType, entityName)}[];\n`;
    } else if (PrimitivesObjectTypeGuard.hasObjectType(type)) {
      let nestedType = type;
      const isStandardVO = type.isStandardVO === true;
      if (nestedType.primitiveValue) {
        nestedType = type.primitiveValue;
      } else if (isStandardVO) {
        nestedType = type.primitiveValue;
        if (TypeUtils.hasObjectType(nestedType)) {
          nestedType = Object.values(nestedType)[0];
        }
      }
      result += `${key}: ${buildPrimitivesTypeValue(nestedType, entityName, isStandardVO)};\n`;
    } else {
      if (isStandardValueType) {
        const objType = primitivesObject.primitiveValue || type;
        result = objType;
        return result;
      } else {
        result += `${key}: ${type};\n`;
      }
    }
  }
  result += '}';
  return result;
};
