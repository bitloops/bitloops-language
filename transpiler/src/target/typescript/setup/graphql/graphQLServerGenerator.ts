import { TTargetDependenciesTypeScript } from '../../../../types.js';
import {
  AllResolvers,
  IAddResolversToServer,
  IServer,
  ResolversBuilder,
  SchemaBuilder,
} from './types.js';

export class GraphQLServerGenerator {
  generateAllServersCode(
    servers: IServer[],
    addResolversToServer: IAddResolversToServer[],
    resolversSchemasAndHandlers: AllResolvers,
  ): TTargetDependenciesTypeScript {
    return servers.reduce(
      (acc, server) => {
        const { output, dependencies } = this.generateServerCode(
          server,
          addResolversToServer,
          resolversSchemasAndHandlers,
        );

        acc.output += output;
        acc.dependencies = [...acc.dependencies, ...dependencies];
        return acc;
      },
      { output: '', dependencies: [] },
    );
  }

  generateServerCode(
    server: IServer,
    addResolversToServer: IAddResolversToServer[],
    resolversSchemasAndHandlers: AllResolvers,
  ): TTargetDependenciesTypeScript {
    let resultString = '';

    const resolversOfInterest = this.findResolversOfServer(
      server,
      addResolversToServer,
      resolversSchemasAndHandlers,
    );

    const typeDefsName = `${server.name}TypeDefs`;
    const resolversMapName = `${server.name}Resolvers`;

    const typeDefsToTargetLanguage = this.generateGraphQLSchema(resolversOfInterest, typeDefsName);
    const resolversMapString = this.generateGraphQLResolverHandlers(
      resolversOfInterest,
      resolversMapName,
    );

    resultString += typeDefsToTargetLanguage.output + '' + resolversMapString.output;
    const { name, port } = server;

    const result = `const ${name} = new GraphQL.ApolloServer({ typeDefs: ${typeDefsName}, resolvers: ${resolversMapName} }); server.listen({ port: ${port} });`;
    resultString += result;
    return { output: resultString, dependencies: [] };
  }

  findResolversOfServer(
    server: IServer,
    addResolversToServer: IAddResolversToServer[],
    allResolvers: AllResolvers,
  ): AllResolvers {
    const resolversAddedToServer = addResolversToServer.filter(
      (resolverBinding) => resolverBinding.serverName === server.name,
    );

    // Find all resolvers, merge their typeDefs and Handlers
    // (remove any duplicates in inputs and types, throw error for other duplicates)
    const resolversOfInterest = Object.fromEntries(
      Object.entries(allResolvers).filter(([resolverName]) =>
        resolversAddedToServer.some((x) => x.resolver.name === resolverName),
      ),
    );
    return resolversOfInterest;
  }

  private generateGraphQLSchema(
    resolversOfInterest: AllResolvers,
    typeDefsName: string,
  ): TTargetDependenciesTypeScript {
    const mergedSchema = this.mergeTypeDefs(resolversOfInterest);
    const typeDefsString = this.buildSchemaString(mergedSchema);
    return {
      output: `const ${typeDefsName} = GraphQL.gql\`${typeDefsString}\`;`,

      dependencies: [],
    };
  }

  private generateGraphQLResolverHandlers(
    resolversOfInterest: AllResolvers,
    resolversMapName: string,
  ): TTargetDependenciesTypeScript {
    const mergedResolversMap = this.mergeHandlers(resolversOfInterest);

    // const resolversMapName = `${server.name}Resolvers`;
    const resolversMapString = this.buildResolversString(mergedResolversMap, resolversMapName);
    return resolversMapString;
  }

  private mergeTypeDefs(resolvers: AllResolvers): SchemaBuilder {
    const schema: SchemaBuilder = {
      types: {},
      inputs: {},
      queries: {},
      mutations: {},
    };
    for (const resolver of Object.values(resolvers)) {
      for (const [typeName, typeImpl] of Object.entries(resolver.typeDefs.types)) {
        schema.types[typeName] = typeImpl;
      }
      for (const [inputName, inputImpl] of Object.entries(resolver.typeDefs.inputs)) {
        schema.inputs[inputName] = inputImpl;
      }
      for (const [queryName, queryImpl] of Object.entries(resolver.typeDefs.queries)) {
        if (schema.queries[queryName]) {
          throw new Error(`Duplicate query name: ${queryName}`);
        }
        schema.queries[queryName] = queryImpl;
      }
      for (const [mutationName, mutationImpl] of Object.entries(resolver.typeDefs.mutations)) {
        if (schema.mutations[mutationName]) {
          throw new Error(`Duplicate mutation name: ${mutationName}`);
        }
        schema.mutations[mutationName] = mutationImpl;
      }
    }
    return schema;
  }

  private mergeHandlers(resolvers: AllResolvers): ResolversBuilder {
    const resolversBuilder: ResolversBuilder = {
      queries: {},
      mutations: {},
    };
    for (const resolver of Object.values(resolvers)) {
      for (const [queryName, queryImpl] of Object.entries(resolver.handlers.queries)) {
        if (resolversBuilder.queries[queryName]) {
          throw new Error(`Duplicate query name: ${queryName}`);
        }
        resolversBuilder.queries[queryName] = queryImpl;
      }
      for (const [mutationName, mutationImpl] of Object.entries(resolver.handlers.mutations)) {
        if (resolversBuilder.mutations[mutationName]) {
          throw new Error(`Duplicate mutation name: ${mutationName}`);
        }
        resolversBuilder.mutations[mutationName] = mutationImpl;
      }
    }
    return resolversBuilder;
  }

  private buildSchemaString(schema: SchemaBuilder): string {
    let result = '';
    result += Object.values(schema.inputs).join('');
    result += Object.values(schema.types).join('');

    if (Object.keys(schema.queries).length > 0) {
      result += 'type Query {';
      result += Object.values(schema.queries).join(' ');
      result += '}';
    } else {
      // Validation of Schema fails if no Query type is defined
      result += 'type Query { empty: String }';
    }

    if (Object.keys(schema.mutations).length > 0) {
      result += 'type Mutation {';
      result += Object.values(schema.mutations).join(' ');
      result += '}';
    }
    return result;
  }

  buildResolversString = (
    resolvers: ResolversBuilder,
    resolversVarName: string,
  ): TTargetDependenciesTypeScript => {
    let result = `const ${resolversVarName} = {`;
    if (Object.keys(resolvers.queries).length > 0) {
      result += '  Query: {';
      for (const [field, controller] of Object.entries(resolvers.queries)) {
        result += `${field}: async(_parent: any, args: any, context: any): Promise<any> => { const result = await ${controller}.execute({ args: args.input, context }); return result; },`;
      }
      result += '  },';
    }
    if (Object.keys(resolvers.mutations).length > 0) {
      result += '  Mutation: {';
      for (const [field, controller] of Object.entries(resolvers.mutations)) {
        result += `${field}: async(_parent: any, args: any, context: any): Promise<any> => { const result = await ${controller}.execute({ args: args.input, context }); return result; },`;
      }
      result += '  },';
    }
    result += '};';

    return { output: result, dependencies: [] };
  };
}
