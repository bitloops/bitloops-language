import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import { TGetFieldPrimitives } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { BitloopsBuiltInClassNames } from '../../../../../../types.js';
import { TypeUtils } from '../../../../../../utils/TypeUtils.js';

const isNestedKey = (keyToAppend: string): boolean => {
  return keyToAppend.length > 0;
};

const isIdPrimitivesKey = (primitivesKey: string): boolean => {
  return primitivesKey === 'id';
};

const generateFromPrimitives = (
  primitivesObject: TGetFieldPrimitives,
  entityName: string,
  ast: IntermediateASTTree,
): string => {
  const typeName = `T${entityName}Primitives`;
  const propsName = `${entityName}Props`;
  let result = `public static fromPrimitives(data: ${typeName}): ${entityName} {`;
  result += `const ${propsName} = {`;
  result += buildFromPrimitives(primitivesObject, ast);
  result += '};\n';
  result += `return new ${entityName}(${propsName});\n`;
  result += '}';

  return result;
};

const getIdentifierFromNestedType = (key: Record<string, any>): string => {
  const { identifier } = Object.values(key)[0];
  return identifier;
};

const buildFromPrimitives = (
  primitivesObject: TGetFieldPrimitives,
  ast: IntermediateASTTree,
  keyToAppend = '',
  isStandardValueType = false,
): string => {
  let result = '';
  for (const [primitivesKey, value] of Object.entries(primitivesObject)) {
    if (isIdPrimitivesKey(primitivesKey)) {
      result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
    } else {
      if (PrimitivesObjectTypeGuard.isPrimitiveProperty(value)) {
        result += `${primitivesKey}: data.${primitivesKey},`;
        result += '\n';
        continue;
      }
      if (PrimitivesObjectTypeGuard.isArrayType(value)) {
        continue;
        // throw new Error('Array types are not supported');
      }

      // It is either Value Object or Entity
      const unttypedValue: any = value;
      let primitivesValue = value.primitiveValue ?? value;
      let nestedTypeName = '';
      const isStandardVO = isStandardValueType === true || unttypedValue.isStandardVO === true;

      let fields: FieldNode[] = [];
      if (isStandardVO) {
        primitivesValue = value.primitiveValue;
        nestedTypeName = unttypedValue.identifier;
      } else {
        nestedTypeName = getIdentifierFromNestedType(primitivesValue);
        const valueObjectNode = ast.getValueObjectByIdentifier(nestedTypeName);
        const propsOfVo = ast.getPropsNodeOfValueObject(valueObjectNode);
        fields = propsOfVo.getFieldListNode().getFieldNodes();
      }

      let voString = `${nestedTypeName}.create({\n`;
      for (const key in primitivesValue) {
        const voPropertyToBuild = primitivesValue[key].primitiveValue;
        if (TypeUtils.hasObjectType(voPropertyToBuild)) {
          const updatedKey = `${primitivesKey}.${key}`;
          voString += buildFromPrimitives(
            { [key]: voPropertyToBuild },
            ast,
            updatedKey,
            isStandardVO,
          );
        } else {
          const leafValue = buildFromPrimitivesLeafValue({
            isStandardVO,
            keyToAppend,
            key,
            primitivesKey,
            fields,
          });
          voString += `${leafValue},`;
        }
      }
      voString += `\n}).value as ${nestedTypeName},`;
      result += `${primitivesKey}: ${voString}`;
    }
    result += '\n';
  }
  return result;
};

const buildFromPrimitivesLeafValue = (data: {
  isStandardVO: boolean;
  keyToAppend: string;
  key: string;
  primitivesKey: string;
  fields: FieldNode[];
}): string => {
  const { isStandardVO, keyToAppend, key, primitivesKey, fields } = data;
  let res = '';
  if (isStandardVO) {
    if (isNestedKey(keyToAppend)) {
      res += `${key}: data.${keyToAppend}`;
    } else {
      res += `${key}: data.${primitivesKey}`;
    }
  } else {
    const { builtInClassVariableValue, builtInClassVariableFound } =
      getBuiltInClassFromPrimitivesValue({
        keyToAppend,
        key,
        fields,
        primitivesKey,
      });
    if (!builtInClassVariableFound) {
      if (isNestedKey(keyToAppend)) {
        res += `${key}: data.${keyToAppend}.${key}`;
      } else {
        res += `${key}: data.${primitivesKey}.${key}`;
      }
    } else {
      res += builtInClassVariableValue;
    }
  }
  return res;
};

const getBuiltInClassFromPrimitivesValue = (data: {
  keyToAppend: string;
  key: string;
  fields: FieldNode[];
  primitivesKey: string;
}): {
  builtInClassVariableValue: string;
  builtInClassVariableFound: boolean;
} => {
  const { keyToAppend, key, fields, primitivesKey } = data;
  let builtInClassVariableFound = false;
  let builtInClassVariableValue = '';
  for (const fieldNode of fields) {
    if (fieldNode.getIdentifierNode().getValue().identifier === key) {
      if (fieldNode.getTypeNode().getBuiltInClassName() === BitloopsBuiltInClassNames.UUIDv4) {
        if (isNestedKey(keyToAppend)) {
          builtInClassVariableValue += `${key}: new Domain.UUIDv4(data.${keyToAppend}.${key}) as Domain.UUIDv4`;
        } else {
          builtInClassVariableValue += `${key}: new Domain.UUIDv4(data.${primitivesKey}.${key}) as Domain.UUIDv4`;
        }
        builtInClassVariableFound = true;
        continue;
      }
    }
  }
  return {
    builtInClassVariableValue,
    builtInClassVariableFound,
  };
};

export { generateFromPrimitives };
