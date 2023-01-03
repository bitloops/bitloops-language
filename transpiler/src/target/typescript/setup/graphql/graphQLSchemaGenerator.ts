import { IntermediateASTTree } from '../../../../ast/core/intermediate-ast/IntermediateASTTree.js';
import { TGraphQLOperation, TResolver, TResolvers } from '../../../../types.js';
import { TBoundedContexts } from '../../../../ast/core/types.js';
import { ClassTypeToGraphQLMapping } from './dtoToGraphQLMapping.js';
import { AllResolvers, ResolverValues } from './types.js';

const operationTypeMapping: Record<TGraphQLOperation, string> = {
  query: 'queries',
  mutation: 'mutations',
  subscription: 'subscriptions',
};

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
    moduleModel: IntermediateASTTree,
  ): ResolverValues => {
    const { controller, input, output, operationName } = resolver;
    const inputType: string | null = typeof input === 'string' ? this.trimDTOSuffix(input) : input;
    const outputType = this.trimDTOSuffix(output);

    const resolverValues = this.generateInputAndTypesOfResolver(input, output, moduleModel);
    const operationType = operationTypeMapping[resolver.operationType];
    if (!operationType) {
      throw new Error(`Operation type ${resolver.operationType} not supported`);
    }

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

  private generateInputAndTypesOfResolver(
    inputType: string | null,
    output: string,
    moduleModel: IntermediateASTTree,
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

    if (inputType !== null && typeof inputType === 'string') {
      const { input, types } = this.generateResolverInputTypeDefs(moduleModel, inputType);

      resolverValues.typeDefs.inputs = { ...resolverValues.typeDefs.inputs, ...input };
      resolverValues.typeDefs.types = { ...resolverValues.typeDefs.types, ...types };
    }

    const { types } = this.generateResolverOutputTypeDefs(moduleModel, output);
    resolverValues.typeDefs.types = { ...resolverValues.typeDefs.types, ...types };

    return resolverValues;
  }

  private generateResolverInputTypeDefs(
    moduleModel: IntermediateASTTree,
    inputType: string,
  ): { input: Record<string, string>; types: Record<string, string> } {
    const mapper = new ClassTypeToGraphQLMapping();
    const graphQLTypes = mapper.generateGraphQLTypes(inputType, moduleModel);

    const { [inputType]: inputSchema, ...restTypes } = graphQLTypes;
    const typeName = this.trimDTOSuffix(inputType);

    const types = {};
    for (const [typeName, typeSchema] of Object.entries(restTypes)) {
      types[typeName] = `type ${typeName} ${typeSchema}`;
    }

    return {
      input: { [inputType]: `input ${typeName} ${inputSchema}` },
      types,
    };
  }

  private generateResolverOutputTypeDefs(
    moduleModel: IntermediateASTTree,
    output: string,
  ): { types: Record<string, string> } {
    const mapper = new ClassTypeToGraphQLMapping();
    const graphQLTypes = mapper.generateGraphQLTypes(output, moduleModel);
    const { [output]: outputSchema, ...restTypes } = graphQLTypes;
    const typeName = this.trimDTOSuffix(output);

    const types = {
      [output]: `type ${typeName} ${outputSchema}`,
    };
    for (const [typeName, typeSchema] of Object.entries(restTypes)) {
      types[typeName] = `type ${typeName} ${typeSchema}`;
    }

    return {
      types,
    };
  }

  private trimDTOSuffix(typeName: string): string {
    return typeName.endsWith('DTO') ? typeName.slice(0, -3) : typeName;
  }
}
