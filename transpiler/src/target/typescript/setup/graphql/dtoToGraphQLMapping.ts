import { TBitloopsPrimaryType, TModule, TVariables } from '../../../../types.js';
import { BitloopsPrimTypeIdentifiers } from '../../core/type-identifiers/bitloopsPrimType.js';
import { mapBitloopsPrimitiveToGraphQL } from './typeMappings.js';

export class ClassTypeToGraphQLMapping {
  generateGraphQLTypes(classTypeName: string, moduleModel: TModule): Record<string, string> {
    let graphQLTypes = {};

    const fields = this.fetchClassTypeFields(classTypeName, moduleModel);

    const fieldStrings = [];
    for (const field of fields) {
      const { name, type, optional } = field;
      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const fieldType = mapBitloopsPrimitiveToGraphQL(type, optional);
        fieldStrings.push(`${name}: ${fieldType}`);
      } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
        const fieldTypeRes = this.findFieldFromArray(type, optional);

        if (fieldTypeRes.fieldDependency) {
          const depType = this.generateGraphQLTypes(fieldTypeRes.fieldDependency, moduleModel);
          graphQLTypes = { ...graphQLTypes, ...depType };
        }

        fieldStrings.push(`${name}: ${fieldTypeRes.result}`);
      } else {
        // TODO handle arrays/structs/nested dtos etc
        throw new Error(`Unsupported type ${JSON.stringify(type)}`);
      }
    }

    graphQLTypes[classTypeName] = '{' + fieldStrings.join(' ') + '}';
    return graphQLTypes;
  }

  private fetchClassTypeFields(classTypeName: string, moduleModel: TModule): TVariables {
    let fields: TVariables = [];
    if (BitloopsPrimTypeIdentifiers.isDTOIdentifier(classTypeName)) {
      fields = moduleModel.DTOs[classTypeName].fields;
    } else if (BitloopsPrimTypeIdentifiers.isReadModelIdentifier(classTypeName)) {
      fields = moduleModel.ReadModels[classTypeName].variables;
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
      const result = mapBitloopsPrimitiveToGraphQL(type, optional);
      return { result, fieldDependency: null };
    } else if (BitloopsPrimTypeIdentifiers.isArrayPrimType(type)) {
      const res = this.findFieldFromArray(type.arrayType.value, optional);
      return { result: '[' + res.result + ']', fieldDependency: res.fieldDependency };
    } else {
      return { result: type, fieldDependency: type };
    }
  }
}
