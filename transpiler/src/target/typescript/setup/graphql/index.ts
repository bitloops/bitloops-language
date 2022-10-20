/**
 *  Bitloops Language CLI
 *  Copyright (C) 2022 Bitloops S.A.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  For further information you can contact legal(at)bitloops.com.
 */
import { SupportedLanguages } from '../../../../helpers/supportedLanguages.js';
import {
  IAddResolversToServer,
  IServer,
  TDTO,
  TDTOValues,
  TGraphQLSetupData,
  TProps,
  TResolver,
  TTargetDependenciesTypeScript,
} from '../../../../types.js';
import { mapBitloopsPrimitiveToGraphQL } from './typeMappings.js';
import { AllResolvers, ResolversBuilder, ResolverValues, SchemaBuilder } from './types.js';

/**
 *  Gather for each resolver, the typeDefs and Query&Mutations associated with it
 * For each server find its corresponding resolvers
 * For all these resolvers, merge the typeDefs and resolverMap each into one object
 * (Remove duplicate inputs and types)
 */
const graphQLSetupDataToTargetLanguage = (
  setupData: TGraphQLSetupData,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const { servers, resolvers, addResolversToServer, bitloopsModel } = setupData;

  const resolversSchemasAndHandlers: AllResolvers = {};

  for (const resolver of resolvers) {
    const { boundedContext, module } = resolver;
    const DTOs = bitloopsModel[boundedContext][module].DTOs;
    const resolverVariable = resolver.operationName;
    const resolverValues = prepareSchemaAndHandlersOfResolver(resolver, DTOs, targetLanguage);
    resolversSchemasAndHandlers[resolverVariable] = resolverValues;
  }

  // console.log('allResolvers:', allResolvers);
  // console.log('========================');
  let codeForAllServers = '';
  for (const server of servers) {
    // const typeDefsString = schemaString.replace(/\r?|\r/g, '');
    codeForAllServers += generateServerCode(
      server,
      addResolversToServer,
      resolversSchemasAndHandlers,
      targetLanguage,
    );
  }
  console.log('-----------------------------');
  return { output: codeForAllServers, dependencies: [] };
};

const generateServerCode = (
  server: IServer,
  addResolversToServer: IAddResolversToServer[],
  resolversSchemasAndHandlers: AllResolvers,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  let resultString = '';

  const resolversOfInterest = findResolversOfServer(
    server,
    addResolversToServer,
    resolversSchemasAndHandlers,
  );

  const typeDefsName = `${server.name}TypeDefs`;
  const resolversMapName = `${server.name}Resolvers`;

  const typeDefsToTargetLanguage = generateGraphQLSchema(
    resolversOfInterest,
    typeDefsName,
    targetLanguage,
  );
  const resolversMapString = generateGraphQLResolverHandlers(
    resolversOfInterest,
    resolversMapName,
    targetLanguage,
  );

  resultString += typeDefsToTargetLanguage + '' + resolversMapString;
  const { name, port } = server;

  const result = `const ${name} = new ApolloServer({ typeDefs: ${typeDefsName}, resolvers: ${resolversMapName} }); server.listen({ port: ${port} });`;
  resultString += result;
  return { output: resultString, dependencies: [] };
};

const prepareSchemaAndHandlersOfResolver = (
  resolver: TResolver,
  dtos: TDTO,
  targetLanguage: string,
): ResolverValues => {
  console.log('targetLanguage', targetLanguage);
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

  const { controller, input, output, operationName } = resolver;
  const inputType = typeof input === 'string' ? trimDTOSuffix(input) : input;
  const outputType = trimDTOSuffix(output);
  const operationTypeMapping = {
    query: 'queries',
    mutation: 'mutations',
  };
  const operationType = operationTypeMapping[resolver.operationType];
  if (!operationType) {
    throw new Error(`Operation type ${resolver.operationType} not supported`);
  }

  generateTypesAndInputsFromDTOs(input, output, dtos, resolverValues);
  resolverValues.typeDefs[operationType][
    operationName
  ] = `${operationName}(input: ${inputType}): ${outputType}`;
  resolverValues.handlers[operationType][operationName] = controller;
  return resolverValues;
};

const findResolversOfServer = (
  server: IServer,
  addResolversToServer: IAddResolversToServer[],
  allResolvers: AllResolvers,
): AllResolvers => {
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
};

const generateGraphQLSchema = (
  resolversOfInterest: AllResolvers,
  typeDefsName: string,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const typeDefsLanguageMapping = {
    [SupportedLanguages.TypeScript]: (typeDefs: string, typeDefsName: string) =>
      `const ${typeDefsName} = gql\`${typeDefs}\`;`,
  };
  const mergedSchema = mergeTypeDefs(resolversOfInterest);
  const typeDefsString = buildSchemaString(mergedSchema);
  return {
    output: typeDefsLanguageMapping[targetLanguage](typeDefsString, typeDefsName),
    dependencies: [],
  };
};

const generateGraphQLResolverHandlers = (
  resolversOfInterest: AllResolvers,
  resolversMapName: string,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const mergedResolversMap = mergeHandlers(resolversOfInterest);

  // const resolversMapName = `${server.name}Resolvers`;
  const resolversMapString = buildResolversString(
    mergedResolversMap,
    resolversMapName,
    targetLanguage,
  );
  return resolversMapString;
};

const mergeTypeDefs = (resolvers: AllResolvers): SchemaBuilder => {
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
};

const mergeHandlers = (resolvers: AllResolvers): ResolversBuilder => {
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
};

const generateTypesAndInputsFromDTOs = (
  inputType: string | TProps,
  output: string,
  dtos: TDTO,
  resolverValues: ResolverValues,
): void => {
  // Generate operation arguments if not primitive
  // if (isBitloopsPrimitive(inputType)) {
  //   continue;
  // }
  if (typeof inputType === 'string') {
    const dto = dtos[inputType];
    if (!dto) {
      throw new Error(`DTO ${inputType} not found`);
    }
    // console.log('dto', dto);
    const result = dtoToGraphQLMapping(dto);
    const typeName = trimDTOSuffix(inputType);
    resolverValues.typeDefs.inputs[inputType] = `input ${typeName} ${result}`;
  } else {
    // custom prop type, TODO or remove as option
  }

  // Generate operation's return Type
  const dto = dtos[output];
  if (!dto) {
    throw new Error(`DTO ${output} not found`);
  }
  const result = dtoToGraphQLMapping(dto);
  const typeName = trimDTOSuffix(output);
  resolverValues.typeDefs.types[output] = `type ${typeName} ${result}`;
};

const buildSchemaString = (schema: SchemaBuilder): string => {
  let result = '';
  for (const type of Object.values(schema.inputs)) {
    result += `${type}`;
    // console.log(type);
  }

  for (const type of Object.values(schema.types)) {
    result += `${type}`;
    // console.log(type);
  }

  if (Object.keys(schema.queries).length > 0) {
    result += 'type Query {';

    for (const query of Object.values(schema.queries)) {
      result += `${query} `;
      // console.log(type);
    }
    result += '}';
  }
  if (Object.keys(schema.mutations).length > 0) {
    result += 'type Mutation {';

    for (const mutation of Object.values(schema.mutations)) {
      result += `${mutation} `;
      // console.log(type);
    }
    result += '}';
  }
  return result;
};

const buildResolversString = (
  resolvers: ResolversBuilder,
  resolversVarName: string,
  targetLanguage: string,
): TTargetDependenciesTypeScript => {
  const languageMapping = {
    [SupportedLanguages.TypeScript]: (resolvers: ResolversBuilder) => {
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

      return result;
    },
  };
  return { output: languageMapping[targetLanguage](resolvers), dependencies: [] };
};

const trimDTOSuffix = (typeName: string): string => {
  return typeName.endsWith('DTO') ? typeName.slice(0, -3) : typeName;
};

const dtoToGraphQLMapping = (dto: TDTOValues): string => {
  let result = '';
  for (const field of dto.fields) {
    const { name, type, optional } = field;
    const fieldType = mapBitloopsPrimitiveToGraphQL(type, optional);
    result += `${name}: ${fieldType}`;
  }

  return '{' + result + '}';
};

export { graphQLSetupDataToTargetLanguage };

// TODO discuss useCases, controllers di
// export const data: TGraphQLSetupData = {
//   servers: [
//     { type: 'graphql', name: 'server', port: '4002' },
//     {
//       type: 'graphql',
//       name: 'secondServer',
//       port: '4003',
//     },
//   ],
//   resolvers: [
//     {
//       boundedContext: 'bx',
//       module: 'mod',
//       operationType: 'query',
//       operationName: 'hello',
//       controller: 'helloWorldController',
//       input: 'HelloWorldRequestDTO',
//       output: 'HelloWorldResponseDTO',
//     },
//     {
//       boundedContext: 'bx',
//       module: 'mod',
//       operationType: 'mutation',
//       operationName: 'saveHello',
//       controller: 'saveHelloController',
//       input: 'SaveHelloRequestDTO',
//       output: 'HelloWorldResponseDTO',
//     },
//   ],
//   addResolversToServer: [
//     {
//       serverName: 'server',
//       resolver: {
//         boundedContext: 'bx',
//         module: 'mod',
//         name: 'hello',
//       },
//     },
//     {
//       serverName: 'secondServer',
//       resolver: {
//         boundedContext: 'bx',
//         module: 'mod',
//         name: 'saveHello',
//       },
//     },
//   ],
//   DTOs: {
//     // Referenced DTOs are also needed
//     HelloWorldRequestDTO: {
//       fields: [
//         {
//           name: 'name',
//           type: 'string',
//           optional: false,
//         },
//       ],
//     },
//     HelloWorldResponseDTO: {
//       fields: [
//         {
//           name: 'message',
//           type: 'string',
//           optional: false,
//         },
//       ],
//     },
//     SaveHelloRequestDTO: {
//       fields: [
//         {
//           name: 'helloToBeSaved',
//           type: 'string',
//           optional: false,
//         },
//       ],
//     },
//   },
// };
// console.log(graphQLSetupDataToTargetLanguage(data, SupportedLanguages.TypeScript));
