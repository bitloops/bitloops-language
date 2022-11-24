import { IntermediateASTTree } from '../../../../refactoring-arch/intermediate-ast/IntermediateASTTree.js';
import {
  bitloopsIdentifiersTypeKey,
  buildInClassTypeKey,
  fieldKey,
  primitivesTypeKey,
  TBitloopsPrimaryType,
  TVariables,
} from '../../../../types.js';
import { BitloopsPrimTypeIdentifiers } from '../../core/type-identifiers/bitloopsPrimType.js';
import { mapBitloopsPrimitiveToGraphQL } from './typeMappings.js';

export class ClassTypeToGraphQLMapping {
  generateGraphQLTypes(
    classTypeName: string,
    moduleModel: IntermediateASTTree,
  ): Record<string, string> {
    let graphQLTypes = {};

    const fields = this.fetchClassTypeFields(classTypeName, moduleModel);

    const fieldStrings = [];
    for (const field of fields) {
      const { identifier, type, optional } = field[fieldKey];
      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const fieldType = mapBitloopsPrimitiveToGraphQL(type[primitivesTypeKey], optional);
        fieldStrings.push(`${identifier}: ${fieldType}`);
      } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
        const fieldTypeRes = this.findFieldFromArray(type, optional);

        if (fieldTypeRes.fieldDependency) {
          const depType = this.generateGraphQLTypes(fieldTypeRes.fieldDependency, moduleModel);
          graphQLTypes = { ...graphQLTypes, ...depType };
        }

        fieldStrings.push(`${identifier}: ${fieldTypeRes.result}`);
      } else {
        // TODO handle arrays/structs/nested dtos etc
        throw new Error(`Unsupported type ${JSON.stringify(type)}`);
      }
    }

    graphQLTypes[classTypeName] = '{' + fieldStrings.join(' ') + '}';
    return graphQLTypes;
  }

  private fetchClassTypeFields(
    classTypeName: string,
    moduleModel: IntermediateASTTree,
  ): TVariables {
    let fields: TVariables = [];
    if (BitloopsPrimTypeIdentifiers.isDTOIdentifier(classTypeName)) {
      fields = moduleModel['DTOs'][classTypeName].fields;
    } else if (BitloopsPrimTypeIdentifiers.isReadModelIdentifier(classTypeName)) {
      fields = moduleModel['ReadModels'][classTypeName].variables;
    } else {
      throw new Error(`Dependency ${classTypeName} is not a DTO or ReadModel`);
    }
    return fields;
  }

  private findFieldFromArray(
    type: TBitloopsPrimaryType,
    optional: boolean,
  ): {
    result: string;
    fieldDependency: string | null;
  } {
    if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
      const result = mapBitloopsPrimitiveToGraphQL(type[primitivesTypeKey], optional);
      return { result, fieldDependency: null };
    } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
      const res = this.findFieldFromArray(type.arrayPrimaryType, optional);
      return { result: '[' + res.result + ']', fieldDependency: res.fieldDependency };
    } else if (BitloopsPrimTypeIdentifiers.isBitloopsBuiltInClass(type)) {
      return { result: type[buildInClassTypeKey], fieldDependency: type[buildInClassTypeKey] };
    } else if (BitloopsPrimTypeIdentifiers.isBitloopsIdentifierType(type)) {
      return {
        result: type[bitloopsIdentifiersTypeKey],
        fieldDependency: type[bitloopsIdentifiersTypeKey],
      };
    } else {
      throw new Error(`Invalid primary type ${type}`);
    }
  }
}
