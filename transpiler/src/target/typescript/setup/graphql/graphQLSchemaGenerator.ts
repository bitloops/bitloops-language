import {
  TBoundedContexts,
  TDTOValues,
  TGraphQLOperation,
  TModule,
  TResolver,
  TResolvers,
} from '../../../../types.js';
import { BitloopsPrimTypeIdentifiers } from '../../core/type-identifiers/bitloopsPrimType.js';
import { mapBitloopsPrimitiveToGraphQL } from './typeMappings.js';
import { AllResolvers, ResolverValues } from './types.js';

export class GraphQLSchemaGenerator {
  generateResolversSchemasAndHandlers(
    resolvers: TResolvers,
    bitloopsModel: TBoundedContexts,
  ): AllResolvers {
    const resolversSchemasAndHandlers: AllResolvers = {};

    for (const resolver of resolvers) {
      const { boundedContext, module } = resolver;
      const moduleModel = bitloopsModel[boundedContext][module];
      const resolverVariable = resolver.operationName;
      const resolverValues = this.prepareSchemaAndHandlersOfResolver(resolver, moduleModel);
      resolversSchemasAndHandlers[resolverVariable] = resolverValues;
    }
    return resolversSchemasAndHandlers;
  }

  private prepareSchemaAndHandlersOfResolver = (
    resolver: TResolver,
    moduleModel: TModule,
  ): ResolverValues => {
    const { controller, input, output, operationName } = resolver;
    const inputType: string | null = typeof input === 'string' ? this.trimDTOSuffix(input) : input;
    const outputType = this.trimDTOSuffix(output);
    const operationTypeMapping: Record<TGraphQLOperation, string> = {
      query: 'queries',
      mutation: 'mutations',
      subscription: 'subscriptions',
    };
    const operationType = operationTypeMapping[resolver.operationType];
    if (!operationType) {
      throw new Error(`Operation type ${resolver.operationType} not supported`);
    }

    const resolverValues = this.generateTypesAndInputsFromDTOs(input, output, moduleModel);

    resolverValues.typeDefs[operationType][operationName] = this.generateOperationString(
      operationName,
      inputType,
      outputType,
    );
    resolverValues.handlers[operationType][operationName] = controller;
    return resolverValues;
  };

  private generateOperationString(
    operationName: string,
    inputType: string | null,
    outputType: string,
  ): string {
    if (inputType) {
      return `${operationName}(input: ${inputType}): ${outputType}`;
    }
    return `${operationName}: ${outputType}`;
  }

  private generateTypesAndInputsFromDTOs(
    inputType: string | null,
    output: string,
    moduleModel: TModule,
  ): ResolverValues {
    const resolverValues: ResolverValues = {
      typeDefs: {
        inputs: {},
        types: {},
        queries: {},
        mutations: {},
      },
      handlers: {
        queries: {},
        mutations: {},
      },
    };
    const dtos = moduleModel.DTOs;
    // Generate operation arguments if not primitive
    if (typeof inputType === 'string') {
      const dto = dtos[inputType];
      if (!dto) {
        throw new Error(`DTO ${inputType} not found`);
      }
      // TODO handle nested/complex DTOs, e.g. DTOs with other DTOs/ReadModels/Arrays as properties
      const result = this.dtoToGraphQLMapping(dto);
      const typeName = this.trimDTOSuffix(inputType);
      resolverValues.typeDefs.inputs[inputType] = `input ${typeName} ${result}`;
    }

    // Generate operation's return Type
    const dto = dtos[output];
    if (!dto) {
      throw new Error(`DTO ${output} not found`);
    }
    const result = this.dtoToGraphQLMapping(dto);
    const typeName = this.trimDTOSuffix(output);
    resolverValues.typeDefs.types[output] = `type ${typeName} ${result}`;
    return resolverValues;
  }

  private trimDTOSuffix(typeName: string): string {
    return typeName.endsWith('DTO') ? typeName.slice(0, -3) : typeName;
  }

  private dtoToGraphQLMapping(dto: TDTOValues): string {
    let result = '';
    for (const field of dto.fields) {
      const { name, type, optional } = field;
      if (BitloopsPrimTypeIdentifiers.isBitloopsPrimitive(type)) {
        const fieldType = mapBitloopsPrimitiveToGraphQL(type, optional);
        result += `${name}: ${fieldType}`;
      } else {
        // TODO handle arrays/structs/nested dtos etc
        throw new Error(`Unsupported type ${JSON.stringify(type)}`);
      }
    }

    return '{' + result + '}';
  }
}
