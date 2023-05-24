import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
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
    keyToPrepend = 'this.props',
  ): string {
    let result = '';
    for (const [key, keyValue] of Object.entries(primitivesObject)) {
      if (this.isIdPrimitivesKey(key)) {
        result += this.getToPrimitivesIdValue('id', 'id');
        continue;
      }
      if (PrimitivesObjectTypeGuard.isArrayType(keyValue)) {
        const updatedKeyToPrepend = `${keyToPrepend}.${key}`;
        const arrayToPrimitives = this.buildToPrimitivesOfArray(
          keyValue,
          ast,
          updatedKeyToPrepend,
          key,
        );
        result += `${key}: ${arrayToPrimitives},`;
        continue;
      }
      if (PrimitivesObjectTypeGuard.isValueObjectType(keyValue)) {
        const updatedKeyToPrepend = `${keyToPrepend}.${key}`;
        const valueObjectToPrimitives = this.buildToPrimitivesOfValueObject(
          keyValue,
          ast,
          updatedKeyToPrepend,
        );
        result += `${key}: ${valueObjectToPrimitives},`;
        continue;
      }
      if (PrimitivesObjectTypeGuard.isPrimitiveProperty(keyValue)) {
        // const updatedKey = keyToAppend ? keyToAppend : key;
        result += this.buildToPrimitivesLeafValue({ keyToPrepend, key });
        continue;
      }
      throw new Error(`Unknown type: ${keyValue}`);
    }
    return result;
  }

  private static isIdPrimitivesKey = (primitivesKey: string): boolean => {
    return primitivesKey === 'id';
  };

  private static buildToPrimitivesOfValueObject(
    keyValue: ValueObjectPrimitives,
    ast: IntermediateASTTree,
    keyToPrepend: string,
  ): string {
    let result = '{\n';
    for (const [childKey, voChildKeyProperty] of Object.entries(keyValue.value)) {
      if (PrimitivesObjectTypeGuard.isValueObjectType(voChildKeyProperty)) {
        const primitivesObject = { [childKey]: voChildKeyProperty };
        result += this.buildToPrimitives(primitivesObject, ast, keyToPrepend);
        continue;
      }
      // The value object is either primitive or array
      const voIdentifier = keyValue.identifier;
      const fields = this.getFieldNodesOfVOIdentifier(ast, voIdentifier);
      result += this.buildToPrimitivesFieldValue({
        keyToPrepend,
        key: childKey,
        fields,
      });
    }

    result += '}';
    return result;
  }

  private static buildToPrimitivesOfArray = (
    propertyValue: TArrayPropertyValue,
    ast: IntermediateASTTree,
    keyToPrepend: string,
    key: string,
  ): string => {
    /**
     * We need to do something like this:
    -       : this.props.locations.map((x) => ({
    -        path: x.path,
    -      })),
     */
    const arrayValue = propertyValue.value;
    if (PrimitivesObjectTypeGuard.isValueObjectType(arrayValue)) {
      const variableName = 'x';
      return `${keyToPrepend}.map((${variableName}) => (${this.buildToPrimitivesOfValueObject(
        arrayValue,
        ast,
        variableName,
      )})
      )`;
    }
    // If array of primitives, we don't need to map
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return `${keyToPrepend}.${key}`;
    }
    // Probably array of arrays
    throw new Error('Unhandled array types case');
  };

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
    keyToPrepend: string;
    key: string;
  }): string => {
    const { keyToPrepend, key } = data;
    return `${key}: ${keyToPrepend}.${key},`;
  };

  private static buildToPrimitivesFieldValue = (data: {
    keyToPrepend: string;
    key: string;
    fields: FieldNode[];
  }): string => {
    const { keyToPrepend, key, fields } = data;
    const { builtInClassVariableValue, builtInClassVariableFound } =
      this.getBuiltInclassToPrimitivesValue({
        keyToPrepend: keyToPrepend,
        key,
        fields,
      });

    if (builtInClassVariableFound) {
      return builtInClassVariableValue;
    }
    return `${key}: ${keyToPrepend}.${key},`;
  };

  private static getBuiltInclassToPrimitivesValue = (data: {
    keyToPrepend: string;
    key: string;
    fields: FieldNode[];
  }): {
    builtInClassVariableValue: string;
    builtInClassVariableFound: boolean;
  } => {
    const { keyToPrepend: keyToAppend, key, fields } = data;
    let builtInClassVariableValue = '';
    let builtInClassVariableFound = false;
    for (const fieldNode of fields) {
      if (fieldNode.getIdentifierNode().getValue().identifier === key) {
        if (fieldNode.getTypeNode().getBuiltInClassName() === 'UUIDv4') {
          builtInClassVariableValue += `${key}: ${keyToAppend}.${key}.toString(),`;
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
