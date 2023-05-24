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
  result += FromPrimitivesMethod.buildFromPrimitives(primitivesObject, ast);
  result += '};\n';
  result += `return new ${entityName}(${propsName});\n`;
  result += '}';

  return result;
};

class FromPrimitivesMethod {
  static buildFromPrimitives(
    primitivesObject: TGetFieldPrimitives,
    ast: IntermediateASTTree,
    keyToAppend = '',
  ): string {
    let result = '';
    for (const [primitivesKey, propertyValue] of Object.entries(primitivesObject)) {
      if (isIdPrimitivesKey(primitivesKey)) {
        result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
      } else {
        if (PrimitivesObjectTypeGuard.isPrimitiveProperty(propertyValue)) {
          result += `${primitivesKey}: data.${primitivesKey},`;
          result += '\n';
          continue;
        }
        if (PrimitivesObjectTypeGuard.isArrayType(propertyValue)) {
          continue;
          // throw new Error('Array types are not supported');
        }

        if (PrimitivesObjectTypeGuard.isValueObjectType(propertyValue)) {
          // It is either Value Object or Entity
          // let primitivesValue = propertyValue.primitiveValue ?? propertyValue;

          let fields: FieldNode[] = [];
          const valueObjectIdentifier = propertyValue.identifier;
          const valueObjectNode = ast.getValueObjectByIdentifier(valueObjectIdentifier);
          const propsOfVo = ast.getPropsNodeOfValueObject(valueObjectNode);
          fields = propsOfVo.getFieldListNode().getFieldNodes();

          let voString = `${valueObjectIdentifier}.create({\n`;
          const valueObjectFields = propertyValue.value;
          for (const [voPropertyKey, voPropertyValue] of Object.entries(valueObjectFields)) {
            if (TypeUtils.hasObjectType(voPropertyValue)) {
              const updatedKey = `${primitivesKey}.${voPropertyKey}`;
              voString += this.buildFromPrimitives(
                { [voPropertyKey]: voPropertyValue },
                ast,
                updatedKey,
              );
            } else {
              // Else this is not a value object but a primitive/or array or whatever else...
              const leafValue = this.buildFromPrimitivesLeafValue({
                keyToAppend,
                key: voPropertyKey,
                primitivesKey,
                fields,
              });
              voString += `${leafValue},`;
            }
          }
          voString += `\n}).value as ${valueObjectIdentifier},`;
          result += `${primitivesKey}: ${voString}`;
        }
      }
      result += '\n';
    }
    return result;
  }

  private static buildFromPrimitivesLeafValue = (data: {
    keyToAppend: string;
    key: string;
    primitivesKey: string;
    fields: FieldNode[];
  }): string => {
    const { keyToAppend, key, primitivesKey, fields } = data;
    let res = '';
    const { builtInClassVariableValue, builtInClassVariableFound } =
      this.getBuiltInClassFromPrimitivesValue({
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
    return res;
  };

  private static getBuiltInClassFromPrimitivesValue = (data: {
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
}

export { generateFromPrimitives };
