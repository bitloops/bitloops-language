import { IntermediateASTTree } from '../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { BitloopsBuiltInClassNames } from '../../../../../types.js';
import { TypeUtils } from '../../../../../utils/TypeUtils.js';

const getPrimitivesType = (primitivesObject: Record<string, any>, entityName: string): string => {
  const typeName = `T${entityName}Primitives`;
  let resultType = `type ${typeName} = `;
  resultType += buildPrimitivesTypeValue(primitivesObject, entityName);
  return resultType;
};

const buildPrimitivesTypeValue = (
  primitivesObject: Record<string, any>,
  entityName: string,
  isStandardValueType = false,
): string => {
  let result = '{\n';

  for (const key in primitivesObject) {
    const type = primitivesObject[key].primitiveValue ?? primitivesObject[key];
    if (TypeUtils.hasObjectType(type)) {
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

const generateToPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
  ast: IntermediateASTTree,
): string => {
  const typeName = `T${entityName}Primitives`;
  let result = `public toPrimitives(): ${typeName} {`;
  result += 'return {\n';
  result += buildToPrimitives(primitivesObject, ast);
  result += '};\n}';

  return result;
};

const buildToPrimitives = (
  primitivesObject: Record<string, any>,
  ast: IntermediateASTTree,
  keyToAppend = '',
  isStandardVO = false,
): string => {
  let result = '';
  for (const [primitivesKey, value] of Object.entries(primitivesObject)) {
    if (primitivesKey === 'id') {
      result += getToPrimitivesIdValue();
    } else {
      const primitivesValue = value.primitiveValue ?? value;
      if (TypeUtils.hasObjectType(primitivesValue)) {
        result += `${primitivesKey}: {\n`;
        for (const key in primitivesValue) {
          const voProperty = primitivesValue[key].primitiveValue;
          if (TypeUtils.hasObjectType(voProperty)) {
            const updatedKey = `${primitivesKey}.${key}`;
            const isStandardVO = voProperty.isStandardVO === true;
            const primitivesObject = { [key]: voProperty };
            result += buildToPrimitives(primitivesObject, ast, updatedKey, isStandardVO);
          } else {
            if (isStandardVO) {
              return buildStandardVOFieldValue({ key, primitivesKey, keyToAppend });
            } else {
              const fields = getFieldNodesOfVOIdentifier(ast, primitivesValue[key].identifier);
              result += buildToPrimitivesFieldValue({ keyToAppend, key, primitivesKey, fields });
            }
          }
        }

        result += '},';
      } else {
        const strToAppend = buildToPrimitivesLeafValue({ keyToAppend, primitivesKey });
        result += strToAppend;
      }
    }
  }
  return result;
};

const getToPrimitivesIdValue = (): string => {
  return 'id: this.id.toString(),';
};

const getFieldNodesOfVOIdentifier = (ast: IntermediateASTTree, identifier: string): FieldNode[] => {
  const valueObjectNode = ast.getValueObjectByIdentifier(identifier);
  const propsOfVo = ast.getPropsNodeOfValueObject(valueObjectNode);
  const fields = propsOfVo.getFieldListNode().getFieldNodes();
  return fields;
};

const buildToPrimitivesLeafValue = (data: {
  keyToAppend: string;
  primitivesKey: string;
}): string => {
  const { keyToAppend, primitivesKey } = data;
  let strToAppend = '';
  if (keyToAppend) {
    strToAppend += `${primitivesKey}: this.props.${keyToAppend}.${primitivesKey},`;
  } else {
    strToAppend += `${primitivesKey}: this.props.${primitivesKey},`;
  }
  return strToAppend;
};

const buildToPrimitivesFieldValue = (data: {
  keyToAppend: string;
  key: string;
  primitivesKey: string;
  fields: FieldNode[];
}): string => {
  const { keyToAppend, key, primitivesKey, fields } = data;
  let result = '';
  if (isNestedKey(keyToAppend)) {
    const { builtInClassVariableValue, builtInClassVariableFound } =
      getBuiltInclassToPrimitivesValue({
        keyToAppend,
        key,
        fields,
      });

    if (!builtInClassVariableFound) {
      result += `${key}: this.props.${keyToAppend}.${key},`;
    } else {
      result += builtInClassVariableValue;
    }
  } else {
    result += `${key}: this.props.${primitivesKey}.${key},`;
  }
  return result;
};

const getBuiltInclassToPrimitivesValue = (data: {
  keyToAppend: string;
  key: string;
  fields: FieldNode[];
}): {
  builtInClassVariableValue: string;
  builtInClassVariableFound: boolean;
} => {
  const { keyToAppend, key, fields } = data;
  let builtInClassVariableValue = '';
  let builtInClassVariableFound = false;
  for (const fieldNode of fields) {
    if (fieldNode.getIdentifierNode().getValue().identifier === key) {
      if (fieldNode.getTypeNode().getValue().type.buildInClassType === 'UUIDv4') {
        builtInClassVariableValue += `${key}: this.props.${keyToAppend}.${key}.toString(),`;
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

const isNestedKey = (keyToAppend: string): boolean => {
  return keyToAppend.length > 0;
};

const buildStandardVOFieldValue = (data: {
  keyToAppend: string;
  key: string;
  primitivesKey: string;
}): string => {
  const { keyToAppend, key, primitivesKey } = data;
  let propsValue = '';
  if (isNestedKey(keyToAppend)) {
    propsValue += `${primitivesKey}: this.props.${keyToAppend}.${key},`;
  } else {
    propsValue += `${primitivesKey}: ${key}: this.props.${keyToAppend}.${key},`;
  }
  return propsValue;
};

const generateFromPrimitives = (
  primitivesObject: Record<string, any>,
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
  primitivesObject: Record<string, any>,
  ast: IntermediateASTTree,
  keyToAppend = '',
  isStandardValueType = false,
): string => {
  let result = '';
  for (const [primitivesKey, value] of Object.entries(primitivesObject)) {
    if (primitivesKey === 'id') {
      result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
    } else {
      let primitivesValue = value.primitiveValue ?? value;
      let nestedTypeName = '';
      const isStandardVO = isStandardValueType === true || value.isStandardVO === true;
      if (TypeUtils.hasObjectType(primitivesValue)) {
        let fields: FieldNode[] = [];
        if (isStandardVO) {
          primitivesValue = value.primitiveValue;
          nestedTypeName = value.identifier;
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
      } else {
        result += `${primitivesKey}: data.${primitivesKey},`;
      }
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
  if (isNestedKey(keyToAppend)) {
    if (isStandardVO) {
      res += `${key}: data.${keyToAppend}`;
    } else {
      const { builtInClassVariableValue, builtInClassVariableFound } =
        getBuiltInclassFromPrimitivesValue({
          keyToAppend,
          key,
          fields,
        });
      if (!builtInClassVariableFound) {
        res += `${key}: data.${keyToAppend}.${key}`;
      } else {
        res += builtInClassVariableValue;
      }
    }
  } else {
    if (isStandardVO) {
      res += `${key}: data.${primitivesKey}`;
    } else {
      res += `${key}: data.${primitivesKey}.${key}`;
    }
  }
  return res;
};

const getBuiltInclassFromPrimitivesValue = (data: {
  keyToAppend: string;
  key: string;
  fields: FieldNode[];
}): {
  builtInClassVariableValue: string;
  builtInClassVariableFound: boolean;
} => {
  const { keyToAppend, key, fields } = data;
  let builtInClassVariableFound = false;
  let builtInClassVariableValue = '';
  for (const fieldNode of fields) {
    if (fieldNode.getIdentifierNode().getValue().identifier === key) {
      if (
        fieldNode.getTypeNode().getValue().type.buildInClassType ===
        BitloopsBuiltInClassNames.UUIDv4
      ) {
        builtInClassVariableValue += `${key}: new Domain.UUIDv4(data.${keyToAppend}.${key}) as Domain.UUIDv4`;
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

export { getPrimitivesType, generateFromPrimitives, generateToPrimitives };
