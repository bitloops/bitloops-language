import {
  TBoundedContexts,
  TGraphQLOperation,
  TModule,
  TResolver,
  TResolvers,
} from '../../../../types.js';
import { ClassTypeToGraphQLMapping } from './dtoToGraphQLMapping.js';
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
    // Generate operation arguments if not primitive
    if (typeof inputType === 'string') {
      const { input, types } = this.generateResolverInputTypeDefs(moduleModel, inputType);

      resolverValues.typeDefs.inputs = { ...resolverValues.typeDefs.inputs, ...input };
      resolverValues.typeDefs.types = { ...resolverValues.typeDefs.types, ...types };
    }

    // TODO use this.generateResolverOutputTypeDefs(moduleModel, inputType);
    const mapper = new ClassTypeToGraphQLMapping();
    const graphQLTypes = mapper.generateGraphQLTypes(output, moduleModel);
    const { [output]: outputSchema, ...restTypes } = graphQLTypes;
    console.log('restTypes', restTypes);
    const typeName = this.trimDTOSuffix(output);
    resolverValues.typeDefs.types[output] = `type ${typeName} ${outputSchema}`;
    for (const [typeName, typeSchema] of Object.entries(restTypes)) {
      resolverValues.typeDefs.types[typeName] = `type ${typeName} ${typeSchema}`;
    }
    return resolverValues;
  }

  private generateResolverInputTypeDefs(
    moduleModel: TModule,
    inputType: string,
  ): { input: Record<string, string>; types: Record<string, string> } {
    const dtos = moduleModel.DTOs;
    const dto = dtos[inputType];
    if (!dto) {
      throw new Error(`DTO ${inputType} not found`);
    }

    const mapper = new ClassTypeToGraphQLMapping();
    const graphQLTypes = mapper.generateGraphQLTypes(inputType, moduleModel);

    // return graphQLTypes;
    const { [inputType]: inputSchema, ...restTypes } = graphQLTypes;
    const typeName = this.trimDTOSuffix(inputType);

    // resolverValues.typeDefs.inputs[inputType] = `input ${typeName} ${inputSchema}`;
    const types = {};
    for (const [typeName, typeSchema] of Object.entries(restTypes)) {
      types[typeName] = `type ${typeName} ${typeSchema}`;
    }

    return {
      input: { [inputType]: `input ${typeName} ${inputSchema}` },
      types,
    };
  }

  private trimDTOSuffix(typeName: string): string {
    return typeName.endsWith('DTO') ? typeName.slice(0, -3) : typeName;
  }
}
