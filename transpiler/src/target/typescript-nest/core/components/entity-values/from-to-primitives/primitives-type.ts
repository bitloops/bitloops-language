import { PrimitivesObjectTypeGuard } from '../../../../../../ast/core/intermediate-ast/nodes/Props/primitives/type-guards.js';
import {
  EntityPrimitives,
  PrimitiveType,
  StandardVOType,
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
  identifierName: string,
): string => {
  const typeName = PrimitivesTypeFactory.getPrimitivesTypeName(identifierName);
  let resultType = `export type ${typeName} = `;
  resultType += PrimitivesTypeFactory.buildType(primitivesObject);
  return resultType;
};

export class PrimitivesTypeFactory {
  static getPrimitivesTypeName(identifier: string): string {
    return `T${identifier}Primitives`;
  }
  static typeGuardFunctions = [
    {
      guard: PrimitivesObjectTypeGuard.isPrimitiveProperty,
      action: (key: string, type: PrimitiveType): string => {
        if (type.optional) return `${key}?: ${type.value};\n`;
        return `${key}: ${type.value};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isValueObjectType,
      action: (key: string, type: ValueObjectPrimitives): string => {
        const voPrimitivesType = PrimitivesTypeFactory.getPrimitivesTypeName(type.identifier);
        if (type.optional) return `${key}?: ${voPrimitivesType};\n`;
        return `${key}: ${voPrimitivesType};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isArrayType,
      action: (key: string, type: TArrayPropertyValue): string => {
        const arrayTypeResult = this.buildTypeForArray(key, type);
        if (type.optional) return `${key}?: ${arrayTypeResult};\n`;
        return `${key}: ${arrayTypeResult};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isEntityType,
      action: (key: string, type: EntityPrimitives): string => {
        const entityPrimitivesType = PrimitivesTypeFactory.getPrimitivesTypeName(type.identifier);
        if (type.optional) return `${key}?: ${entityPrimitivesType};\n`;
        return `${key}: ${entityPrimitivesType};\n`;
      },
    },
    {
      guard: PrimitivesObjectTypeGuard.isStandardVOType,
      action: (key: string, _type: StandardVOType): string => {
        // We could replace this any, with an exported PrimitivesType of the StandardVO in the future
        return `${key}: any;\n`;
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
      return `${type.value}[]`;
    }
    if (PrimitivesObjectTypeGuard.isValueObjectType(type)) {
      const valueObjectIdentifier = type.identifier;
      const voPrimitivesType = PrimitivesTypeFactory.getPrimitivesTypeName(valueObjectIdentifier);

      return `${voPrimitivesType}[]`;
    }
    if (PrimitivesObjectTypeGuard.isEntityType(type)) {
      const entityIdentifier = type.identifier;
      const entityPrimitivesType = PrimitivesTypeFactory.getPrimitivesTypeName(entityIdentifier);
      return `${entityPrimitivesType}[]`;
    }
    if (PrimitivesObjectTypeGuard.isStandardVOType(type)) {
      return 'any[]';
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

    const valueObjectsInsideArrays: ValueObjectPrimitives[] = this.lookRecursivelyInsideArrays(
      primitivesObject,
      PrimitivesObjectTypeGuard.isValueObjectType,
    );

    const allVoProperties = [...valueObjectProps, ...valueObjectsInsideArrays];
    const voImports: TDependenciesTypeScript = allVoProperties.flatMap((valueObjectProp) => {
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

    // Entity Imports
    const entityProps = Object.values(primitivesObject).filter(
      PrimitivesObjectTypeGuard.isEntityType,
    );

    const entitiesInsideArrays: EntityPrimitives[] = this.lookRecursivelyInsideArrays(
      primitivesObject,
      PrimitivesObjectTypeGuard.isEntityType,
    );

    const allEntityProperties = [...entityProps, ...entitiesInsideArrays];
    const entityImports: TDependenciesTypeScript = allEntityProperties.flatMap((entityProp) => {
      const primitivesTypeName = this.getPrimitivesTypeName(entityProp.identifier);
      const className = getTargetFileName(entityProp.identifier, ClassTypes.Entity);
      return [
        {
          type: 'relative',
          default: false,
          value: entityProp.identifier,
          classType: ClassTypes.Entity,
          className,
        },
        {
          type: 'relative',
          default: false,
          value: primitivesTypeName,
          classType: ClassTypes.Entity,
          className,
        },
      ];
    });

    return [...voImports, ...entityImports];
  }

  private static lookRecursivelyInsideArrays<T extends TGetFieldPrimitivesValue>(
    primitivesObject: TGetFieldPrimitives,
    guard: (v: TGetFieldPrimitivesValue) => v is T,
  ): T[] {
    const elementsOfInterest: T[] = [];
    Object.values(primitivesObject).forEach((valueObjectProp) => {
      let currentArrayType = valueObjectProp;
      while (PrimitivesObjectTypeGuard.isArrayType(currentArrayType)) {
        currentArrayType = currentArrayType.value;
        if (guard(currentArrayType)) {
          elementsOfInterest.push(currentArrayType);
          break;
        }
      }
    });
    return elementsOfInterest;
  }
}
