import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TGetFieldPrimitives,
  ValueObjectPrimitives,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { TypeUtils } from '../../../../../../utils/TypeUtils.js';

const generateToPrimitives = (
  primitivesObject: Record<string, any>,
  entityName: string,
  ast: IntermediateASTTree,
): string => {
  const typeName = `T${entityName}Primitives`;
  let result = `public toPrimitives(): ${typeName} {`;
  result += 'return {\n';
  result += ToPrimitivesMethod.buildToPrimitives(primitivesObject, ast);
  result += '};\n}';

  return result;
};

class ToPrimitivesMethod {
  static buildToPrimitives(
    primitivesObject: TGetFieldPrimitives,
    ast: IntermediateASTTree,
    keyToAppend = '',
  ): string {
    let result = '';
    for (const [key, keyValue] of Object.entries(primitivesObject)) {
      if (this.isIdPrimitivesKey(key)) {
        result += this.getToPrimitivesIdValue('id', 'id');
        continue;
      }
      if (PrimitivesObjectTypeGuard.isArrayType(keyValue)) {
        continue;
      } else if (PrimitivesObjectTypeGuard.isValueObjectType(keyValue)) {
        result += this.buildToPrimitivesOfValueObject(key, keyValue, ast, keyToAppend);
      } else {
        result += this.buildToPrimitivesLeafValue({ keyToAppend, primitivesKey: key });
      }
    }
    return result;
  }

  private static buildToPrimitivesOfValueObject(
    parentKey: string,
    keyValue: ValueObjectPrimitives,
    ast: IntermediateASTTree,
    keyToAppend: string,
  ): string {
    // result += `${primitivesKey}: {\n`;
    // for (const key in primitivesValue) {
    //   const voProperty = primitivesValue[key].primitiveValue;
    //   if (TypeUtils.hasObjectType(voProperty)) {
    //     const updatedKey = `${primitivesKey}.${key}`;
    //     const isStandardVO = voProperty.isStandardVO === true;
    //     const primitivesObject = { [key]: voProperty };
    //     result += buildToPrimitives(primitivesObject, ast, updatedKey, isStandardVO);
    //   } else {
    //     if (isStandardVO) {
    //       return buildStandardVOFieldValue({ key, primitivesKey, keyToAppend });
    //     } else {
    //       const fields = getFieldNodesOfVOIdentifier(ast, primitivesValue[key].identifier);
    //       result += buildToPrimitivesFieldValue({ keyToAppend, key, primitivesKey, fields });
    //     }
    //   }

    let result = `${parentKey}: {\n`;
    for (const [key, voProperty] of Object.entries(keyValue.value)) {
      if (PrimitivesObjectTypeGuard.isValueObjectType(voProperty)) {
        const updatedKey = `${parentKey}.${key}`;
        const primitivesObject = { [key]: voProperty };
        result += this.buildToPrimitives(primitivesObject, ast, updatedKey);
        continue;
      }
      // The value object is either primitive or array
      const voIdentifier = keyValue.identifier;
      const fields = this.getFieldNodesOfVOIdentifier(ast, voIdentifier);
      result += this.buildToPrimitivesFieldValue({
        keyToAppend,
        key,
        primitivesKey: parentKey,
        fields,
      });
    }

    result += '},';
    return result;
  }

  private static getToPrimitivesIdValue = (key: string, fullPathKey: string): string => {
    return `${key}: this.${fullPathKey}.toString(),`;
  };

  private static getFieldNodesOfVOIdentifier = (
    ast: IntermediateASTTree,
    identifier: string,
  ): FieldNode[] => {
    const valueObjectNode = ast.getValueObjectByIdentifier(identifier);
    const propsOfVo = ast.getPropsNodeOfValueObject(valueObjectNode);
    const fields = propsOfVo.getFieldListNode().getFieldNodes();
    return fields;
  };

  private static buildToPrimitivesLeafValue = ({
    keyToAppend,
    primitivesKey,
  }: {
    keyToAppend: string;
    primitivesKey: string;
  }): string => {
    let strToAppend = '';
    if (keyToAppend) {
      strToAppend += `${primitivesKey}: this.props.${keyToAppend}.${primitivesKey},`;
    } else {
      strToAppend += `${primitivesKey}: this.props.${primitivesKey},`;
    }
    return strToAppend;
  };

  private static buildToPrimitivesFieldValue = (data: {
    keyToAppend: string;
    key: string;
    primitivesKey: string;
    fields: FieldNode[];
  }): string => {
    const { keyToAppend, key, primitivesKey, fields } = data;
    let result = '';
    const { builtInClassVariableValue, builtInClassVariableFound } =
      this.getBuiltInclassToPrimitivesValue({
        keyToAppend,
        key,
        fields,
        primitivesKey,
      });

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

  private static getBuiltInclassToPrimitivesValue = (data: {
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
          if (this.isNestedKey(keyToAppend)) {
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

  private static isNestedKey = (keyToAppend: string): boolean => {
    return keyToAppend.length > 0;
  };

  private static isIdPrimitivesKey = (primitivesKey: string): boolean => {
    return primitivesKey === 'id';
  };
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
