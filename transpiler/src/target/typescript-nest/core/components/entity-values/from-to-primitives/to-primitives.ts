import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import { TypeUtils } from '../../../../../../utils/TypeUtils.js';

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
    if (isIdPrimitivesKey(primitivesKey)) {
      result += getToPrimitivesIdValue('id', 'id');
    } else {
      const primitivesValue = value.primitiveValue ?? value;
      if (PrimitivesObjectTypeGuard.isArrayType(primitivesValue)) {
        continue;
      } else if (PrimitivesObjectTypeGuard.hasObjectType(primitivesValue)) {
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

const getToPrimitivesIdValue = (key: string, fullPathKey: string): string => {
  return `${key}: this.${fullPathKey}.toString(),`;
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
  const { builtInClassVariableValue, builtInClassVariableFound } = getBuiltInclassToPrimitivesValue(
    {
      keyToAppend,
      key,
      fields,
      primitivesKey,
    },
  );

  if (!builtInClassVariableFound) {
    if (keyToAppend) {
      result += `${key}: this.props.${keyToAppend}.${key},`;
    } else {
      result += `${key}: this.props.${primitivesKey}.${key},`;
    }
  } else {
    result += builtInClassVariableValue;
  }
  return result;
};

const getBuiltInclassToPrimitivesValue = (data: {
  keyToAppend: string;
  key: string;
  fields: FieldNode[];
  primitivesKey: string;
}): {
  builtInClassVariableValue: string;
  builtInClassVariableFound: boolean;
} => {
  const { keyToAppend, key, fields, primitivesKey } = data;
  let builtInClassVariableValue = '';
  let builtInClassVariableFound = false;
  for (const fieldNode of fields) {
    if (fieldNode.getIdentifierNode().getValue().identifier === key) {
      if (fieldNode.getTypeNode().getBuiltInClassName() === 'UUIDv4') {
        if (isNestedKey(keyToAppend)) {
          builtInClassVariableValue += `${key}: this.props.${keyToAppend}.${key}.toString(),`;
        } else {
          builtInClassVariableValue += `${key}: this.props.${primitivesKey}.${key}.toString(),`;
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

const isNestedKey = (keyToAppend: string): boolean => {
  return keyToAppend.length > 0;
};

const isIdPrimitivesKey = (primitivesKey: string): boolean => {
  return primitivesKey === 'id';
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

export { generateToPrimitives };
