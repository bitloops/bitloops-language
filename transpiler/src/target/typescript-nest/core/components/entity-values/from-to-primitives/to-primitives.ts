import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TGetFieldPrimitives,
  ValueObjectPrimitives,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';

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
        const valueObjectToPrimitives = this.buildToPrimitivesOfValueObject(
          key,
          keyValue,
          ast,
          keyToAppend,
        );
        result += `${key}: ${valueObjectToPrimitives}`;
      } else {
        // const updatedKey = keyToAppend ? keyToAppend : key;
        result += this.buildToPrimitivesLeafValue({ keyToAppend, key });
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
    const updatedKey = keyToAppend ? `${keyToAppend}.${parentKey}` : parentKey;

    let result = '{\n';
    for (const [childKey, voChildKeyProperty] of Object.entries(keyValue.value)) {
      if (PrimitivesObjectTypeGuard.isValueObjectType(voChildKeyProperty)) {
        const primitivesObject = { [childKey]: voChildKeyProperty };
        result += this.buildToPrimitives(primitivesObject, ast, updatedKey);
        continue;
      }
      // The value object is either primitive or array
      const voIdentifier = keyValue.identifier;
      const fields = this.getFieldNodesOfVOIdentifier(ast, voIdentifier);
      result += this.buildToPrimitivesFieldValue({
        keyToAppend: updatedKey,
        key: childKey,
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

  private static buildToPrimitivesLeafValue = (data: {
    keyToAppend: string;
    key: string;
  }): string => {
    const { keyToAppend, key } = data;
    if (keyToAppend) {
      return `${key}: this.props.${keyToAppend}.${key},`;
    }
    return `${key}: this.props.${key},`;
  };

  private static buildToPrimitivesFieldValue = (data: {
    keyToAppend: string;
    key: string;
    fields: FieldNode[];
  }): string => {
    const { keyToAppend, key, fields } = data;
    const { builtInClassVariableValue, builtInClassVariableFound } =
      this.getBuiltInclassToPrimitivesValue({
        keyToAppend,
        key,
        fields,
      });

    if (builtInClassVariableFound) {
      return builtInClassVariableValue;
    }
    if (keyToAppend) {
      return `${key}: this.props.${keyToAppend}.${key},`;
    }
    return `${key}: this.props.${key},`;
  };

  private static getBuiltInclassToPrimitivesValue = (data: {
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
        if (fieldNode.getTypeNode().getBuiltInClassName() === 'UUIDv4') {
          if (keyToAppend) {
            builtInClassVariableValue += `${key}: this.props.${keyToAppend}.${key}.toString(),`;
          } else {
            builtInClassVariableValue += `${key}: this.props.${key}.toString(),`;
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
