import { IntermediateASTTree } from '../../../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { FieldNode } from '../../../../../../ast/core/intermediate-ast/nodes/FieldList/FieldNode.js';
import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
  ValueObjectPrimitives,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { BitloopsBuiltInClassNames } from '../../../../../../types.js';
import { TypeUtils } from '../../../../../../utils/TypeUtils.js';

const isNestedKey = (keyToPrepend: string): boolean => {
  return keyToPrepend.length > 0;
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
  // TODO Should try to refactor into something like this
  //  static typeGuardFunctions = [
  //   {
  //     guard: PrimitivesObjectTypeGuard.isPrimitiveProperty,
  //     action: (type: TBitloopsPrimaryTypeValues) => {
  //       const res = modelToTargetLanguage({
  //         type: BitloopsTypesMapping.TBitloopsPrimaryType,
  //         value: { type },
  //       });
  //       const primitive: PrimitiveType = res.output;
  //       return primitive;
  //     }
  //   },
  //   {
  //     guard: BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass,
  //     action: (type: TBitloopsPrimaryTypeValues) => {
  //       const primitive: PrimitiveType =
  //         BitloopsPrimTypeIdentifiers.builtInClassToPrimitiveType(type);
  //       return primitive;
  //     }
  //   },
  //   // Add more type guards and corresponding actions if necessary
  // ];

  static buildFromPrimitives(
    primitivesObject: TGetFieldPrimitives,
    ast: IntermediateASTTree,
    keyToPrepend = 'data',
  ): string {
    let result = '';
    for (const [primitivesKey, propertyValue] of Object.entries(primitivesObject)) {
      if (isIdPrimitivesKey(primitivesKey)) {
        result += 'id: new Domain.UUIDv4(data.id) as Domain.UUIDv4,';
      } else {
        if (PrimitivesObjectTypeGuard.isPrimitiveProperty(propertyValue)) {
          result += `${primitivesKey}: ${keyToPrepend}.${primitivesKey},`;
          result += '\n';
          continue;
        }
        if (PrimitivesObjectTypeGuard.isArrayType(propertyValue)) {
          const updatedkeyToPrepend = `${keyToPrepend}.${primitivesKey}`;
          const arrayValue = this.buildArrayFromPrimitives(
            propertyValue,
            primitivesKey,
            updatedkeyToPrepend,
            ast,
          );
          result += `${primitivesKey}: ${arrayValue}`;
          continue;
          // throw new Error('Array types are not supported');
        }

        if (PrimitivesObjectTypeGuard.isValueObjectType(propertyValue)) {
          // It is either Value Object or Entity
          // let primitivesValue = propertyValue.primitiveValue ?? propertyValue;

          const updatedkeyToPrepend = `${keyToPrepend}.${primitivesKey}`;
          const voString = this.buildFromPrimitivesForValueObject(
            propertyValue,
            updatedkeyToPrepend,
            ast,
          );
          result += `${primitivesKey}: ${voString}`;
        }
      }
      result += '\n';
    }
    return result;
  }

  private static buildFromPrimitivesForValueObject(
    propertyValue: ValueObjectPrimitives,
    keyToPrepend: string,
    ast: IntermediateASTTree,
  ): string {
    let fields: FieldNode[] = [];
    const valueObjectIdentifier = propertyValue.identifier;
    const valueObjectNode = ast.getValueObjectByIdentifier(valueObjectIdentifier);
    const propsOfVo = ast.getPropsNodeOfValueObject(valueObjectNode);
    fields = propsOfVo.getFieldListNode().getFieldNodes();

    let voString = `${valueObjectIdentifier}.create({\n`;
    const valueObjectFields = propertyValue.value;
    for (const [voPropertyKey, voPropertyValue] of Object.entries(valueObjectFields)) {
      if (TypeUtils.hasObjectType(voPropertyValue)) {
        voString += this.buildFromPrimitives(
          { [voPropertyKey]: voPropertyValue },
          ast,
          keyToPrepend,
        );
      } else {
        // Else this is not a value object but a primitive/or array or whatever else...
        const leafValue = this.buildFromPrimitivesLeafValue({
          keyToPrepend: keyToPrepend,
          key: voPropertyKey,
          fields,
        });
        voString += `${leafValue},`;
      }
    }
    voString += `\n}).value as ${valueObjectIdentifier},`;
    return voString;
  }

  private static buildArrayFromPrimitives(
    propertyValue: TArrayPropertyValue,
    primitivesKey: string,
    keyToPrepend: string,
    ast: IntermediateASTTree,
  ): string {
    /**
     * Need to return something likes 
     * data.locations.map(
    -         (x) =>
    -           DocumentLocationVO.create({
    -             path: x.path,
    -           }).value as DocumentLocationVO
    -       ),
     */
    const arrayValue = propertyValue.value;
    if (PrimitivesObjectTypeGuard.isValueObjectType(arrayValue)) {
      const variableName = 'x';
      return `${keyToPrepend}.map((${variableName}) => 
      ${this.buildFromPrimitivesForValueObject(arrayValue, variableName, ast)}
      ),`;
    }
    // If array of primitives, we don't need to map
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(arrayValue)) {
      return `${keyToPrepend}.${primitivesKey}`;
    }
    // Probably array of arrays
    throw new Error('Unhandled array types case');
  }

  private static buildFromPrimitivesLeafValue = (data: {
    keyToPrepend: string;
    key: string;
    fields: FieldNode[];
  }): string => {
    const { keyToPrepend, key, fields } = data;
    const { builtInClassVariableValue, builtInClassVariableFound } =
      this.getBuiltInClassFromPrimitivesValue({
        keyToPrepend,
        key,
        fields,
      });
    if (builtInClassVariableFound) {
      return builtInClassVariableValue;
    }
    return `${key}: ${keyToPrepend}.${key}`;
  };

  private static getBuiltInClassFromPrimitivesValue = (data: {
    keyToPrepend: string;
    key: string;
    fields: FieldNode[];
  }): {
    builtInClassVariableValue: string;
    builtInClassVariableFound: boolean;
  } => {
    const { keyToPrepend, key, fields } = data;
    let builtInClassVariableFound = false;
    let builtInClassVariableValue = '';
    for (const fieldNode of fields) {
      if (fieldNode.getIdentifierNode().getValue().identifier === key) {
        if (fieldNode.getTypeNode().getBuiltInClassName() === BitloopsBuiltInClassNames.UUIDv4) {
          if (isNestedKey(keyToPrepend)) {
            builtInClassVariableValue += `${key}: new Domain.UUIDv4(${keyToPrepend}.${key}) as Domain.UUIDv4`;
          } else {
            builtInClassVariableValue += `${key}: new Domain.UUIDv4(${key}) as Domain.UUIDv4`;
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
