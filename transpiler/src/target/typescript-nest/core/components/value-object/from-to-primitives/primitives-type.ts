import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  TArrayPropertyValue,
  TGetFieldPrimitives,
  TGetFieldPrimitivesValue,
  ValueObjectPrimitives,
} from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/types.js';
import { ClassTypes } from '../../../../../../helpers/mappings.js';
import { TDependenciesTypeScript } from '../../../../../../types.js';
import { getTargetFileName } from '../../../../helpers/getTargetFileDestination.js';

export const getPrimitivesType = (
  primitivesObject: TGetFieldPrimitives,
  valueObjectName: string,
): string => {
  const typeName = ValueObjectPrimitivesTypeFactory.getPrimitivesTypeName(valueObjectName);
  let resultType = `export type ${typeName} = `;
  resultType += ValueObjectPrimitivesTypeFactory.buildType(primitivesObject);
  return resultType;
};

export class ValueObjectPrimitivesTypeFactory {
  static getPrimitivesTypeName(valueObjectIdentifier: string): string {
    return `T${valueObjectIdentifier}Primitives`;
  }
  static typeGuardFunctions = [
    {
      guard: PrimitivesObjectTypeGuard.isPrimitiveProperty,
      action: (key: string, type: string): string => {
        return `${key}: ${type};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isValueObjectType,
      action: (key: string, type: ValueObjectPrimitives): string => {
        const voPrimitivesType = ValueObjectPrimitivesTypeFactory.getPrimitivesTypeName(
          type.identifier,
        );
        return `${key}: ${voPrimitivesType};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isArrayType,
      action: (key: string, type: TArrayPropertyValue): string => {
        const arrayTypeResult = this.buildTypeForArray(key, type);
        return `${key}: ${arrayTypeResult};\n`;
      },
    },
    // Add more type guards and corresponding actions if necessary
  ];

  static buildType(primitivesObject: TGetFieldPrimitives): string {
    let result = '{\n';

    for (const [key, keyValue] of Object.entries(primitivesObject)) {
      result += this.findPrimitiveType(key, keyValue);
    }
    result += '}';
    return result;
  }

  static findPrimitiveType(key: string, type: TGetFieldPrimitivesValue): string | null {
    for (const { guard, action } of this.typeGuardFunctions) {
      if (guard(type)) {
        // FIX ts inference here by using discriminated union
        return action(key, type as any);
      }
    }

    throw new Error(`Unknown type: ${JSON.stringify(type)}`);
  }

  private static buildTypeForArray(key: string, keyValue: TArrayPropertyValue): string {
    const type = keyValue.value;
    // Primitive is the base condition
    if (PrimitivesObjectTypeGuard.isPrimitiveProperty(type)) {
      return `${type}[]`;
    } else if (PrimitivesObjectTypeGuard.isValueObjectType(type)) {
      const valueObjectIdentifier = type.identifier;
      const voPrimitivesType =
        ValueObjectPrimitivesTypeFactory.getPrimitivesTypeName(valueObjectIdentifier);

      return `${voPrimitivesType}[]`;
    }
    if (PrimitivesObjectTypeGuard.isArrayType(type)) {
      return `${this.buildTypeForArray(key, type)}[]`;
    }
    throw new Error(`Unknown type: ${type}`);
  }

  /**
   *  If our props have value objects, we need to import their primitives types,
   * since they are not ClassTypes, we create childDependencies for them manually
   */
  static getPrimitiveTypesThatNeedToBeImported(
    primitivesObject: TGetFieldPrimitives,
  ): TDependenciesTypeScript {
    const valueObjectProps = Object.values(primitivesObject).filter(
      PrimitivesObjectTypeGuard.isValueObjectType,
    );

    const valueObjectsInsideArrays: ValueObjectPrimitives[] = [];
    Object.values(primitivesObject).forEach((valueObjectProp) => {
      let currentArrayType = valueObjectProp;
      while (PrimitivesObjectTypeGuard.isArrayType(currentArrayType)) {
        currentArrayType = currentArrayType.value;
        if (PrimitivesObjectTypeGuard.isValueObjectType(currentArrayType)) {
          valueObjectsInsideArrays.push(currentArrayType);
          break;
        }
      }
    });

    const allVoProperties = [...valueObjectProps, ...valueObjectsInsideArrays];
    return allVoProperties.flatMap((valueObjectProp) => {
      const primitivesTypeName = this.getPrimitivesTypeName(valueObjectProp.identifier);
      const className = getTargetFileName(valueObjectProp.identifier, ClassTypes.ValueObject);
      return [
        {
          type: 'relative',
          default: false,
          value: valueObjectProp.identifier,
          classType: ClassTypes.ValueObject,
          className,
        },
        {
          type: 'relative',
          default: false,
          value: primitivesTypeName,
          classType: ClassTypes.ValueObject,
          className,
        },
      ];
    });
  }
}
