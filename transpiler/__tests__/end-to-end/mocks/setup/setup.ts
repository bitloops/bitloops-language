import { TTargetSetupContent } from '../../../../src/target/types.js';
import { FileUtil } from '../../../../src/utils/file.js';
import { formatString } from '../../../../src/target/typescript-nest/core/codeFormatting.js';

type TestCase = {
  description: string;
  inputSetup: { fileId: string; fileContents: string }[];
  inputCore: { boundedContext: string; module: string; fileId: string; fileContents: string }[];
  expectedOutputs: TTargetSetupContent[];
};

const setupFilePaths = {
  'di-constants.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/constants.ts',
    fileType: 'DI.Tokens',
    formatterParser: 'typescript',
  },
  'domainError.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/domain/errors/index.ts',
    fileType: 'DomainError',
    formatterParser: 'typescript',
  },
  'applicationError.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/application/errors/index.ts',
    fileType: 'ApplicationError',
    formatterParser: 'typescript',
  },
  'domainRule.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/domain/rules/index.ts',
    fileType: 'DomainRule',
    formatterParser: 'typescript',
  },
  'index.command-handlers.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/application/command-handlers/index.ts',
    fileType: 'index.ts',
    formatterParser: 'typescript',
  },
  'index.query-handlers.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/application/query-handlers/index.ts',
    fileType: 'index.ts',
    formatterParser: 'typescript',
  },
  'index.domain-event-handlers.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/application/event-handlers/domain/index.ts',
    fileType: 'index.ts',
    formatterParser: 'typescript',
  },
  'index.integration-event-handlers.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/application/event-handlers/integration/index.ts',
    fileType: 'index.ts',
    formatterParser: 'typescript',
  },
  'nest.module.mock.ts': {
    fileId: 'bounded-contexts/demo/hello-world/hello-world.module.ts',
    fileType: 'nest.module.ts',
    formatterParser: 'typescript',
  },
};

const getExpectedSetupOutputs = (
  setupFilePaths: Record<string, { fileId: string; fileType: string; formatterParser: string }>,
): TTargetSetupContent[] => {
  const basePath = 'transpiler/__tests__/end-to-end/mocks/setup/outputs/';

  const expectedOutput: TTargetSetupContent[] = [];
  for (const [mockFileName, { fileId, fileType, formatterParser }] of Object.entries(
    setupFilePaths,
  )) {
    const fileContent = FileUtil.readFileString(basePath + mockFileName);
    const formatterConfig = { semi: true, parser: formatterParser, singleQuote: true };
    expectedOutput.push({
      fileId,
      fileType,
      fileContent: formatString(fileContent, formatterConfig),
    });
  }

  return expectedOutput;
};

export const SETUP_END_TO_END_TEST_CASES: Array<TestCase> = [
  {
    description: '',
    inputSetup: [
      {
        fileId: 'setup.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/setup/setup.bl',
        ),
      },
    ],
    inputCore: [
      {
        boundedContext: 'Demo',
        module: 'Hello World',
        fileId: 'useCases.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/setup/core/useCases.bl',
        ),
      },
      {
        boundedContext: 'Demo',
        module: 'Hello World',
        fileId: 'repoPorts.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/setup/core/repoPorts.bl',
        ),
      },
      {
        boundedContext: 'Demo',
        module: 'Hello World',
        fileId: 'domain.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/setup/core/domain.bl',
        ),
      },
      {
        boundedContext: 'Demo',
        module: 'Hello World',
        fileId: 'commandHandlers.bl',
        fileContents: FileUtil.readFileString(
          'transpiler/__tests__/end-to-end/mocks/setup/core/commandHandlers.bl',
        ),
      },
      // {
      //   boundedContext: 'Demo',
      //   module: 'Hello World',
      //   fileId: 'packagePort.bl',
      //   fileContents: FileUtil.readFileString(
      //     'transpiler/__tests__/end-to-end/mocks/setup/core/packagePort.bl',
      //   ),
      // },
    ],
    expectedOutputs: getExpectedSetupOutputs(setupFilePaths),
  },
];

// TODO add graphql tests cases
// Examples:
// | {"servers":[{"type":"graphql","name":"server","port":"4002"}],"resolvers":[{"boundedContext":"bx","module":"mod","operationType":"query","operationName":"hello","controller":"helloWorldController","input":"HelloWorldRequestDTO","output":"HelloWorldResponseDTO"},{"boundedContext":"bx","module":"mod","operationType":"mutation","operationName":"saveHello","controller":"saveHelloController","input":"SaveHelloRequestDTO","output":"HelloWorldResponseDTO"}],"addResolversToServer":[{"serverName":"server","resolver":{"boundedContext":"bx","module":"mod","name":"hello"}},{"serverName":"server","resolver":{"boundedContext":"bx","module":"mod","name":"saveHello"}}],"bitloopsModel":{"bx":{"mod":{"DTOs":{"HelloWorldRequestDTO":{"fields":[{"name":"name","type":"string","optional":false}]},"HelloWorldResponseDTO":{"fields":[{"name":"message","type":"string","optional":false}]},"SaveHelloRequestDTO":{"fields":[{"name":"helloToBeSaved","type":"string","optional":false}]}}}}}} | const serverTypeDefs = GraphQL.gql`input HelloWorldRequest {name: String!}input SaveHelloRequest {helloToBeSaved: String!}type HelloWorldResponse {message: String!}type Query {hello(input: HelloWorldRequest): HelloWorldResponse}type Mutation {saveHello(input: SaveHelloRequest): HelloWorldResponse}`;const serverResolvers = {  Query: {hello: async(_parent: any, args: any, context: any): Promise<any> => { const result = await helloWorldController.execute({ args: args.input, context }); return result; },  },  Mutation: {saveHello: async(_parent: any, args: any, context: any): Promise<any> => { const result = await saveHelloController.execute({ args: args.input, context }); return result; },  },};const server = new GraphQL.ApolloServer({ typeDefs: serverTypeDefs, resolvers: serverResolvers }); server.listen({ port: 4002 }); |
// With 2 servers
// | {"servers":[{"type":"graphql","name":"server","port":"4002"},{"type":"graphql","name":"secondServer","port":"4003"}],"resolvers":[{"boundedContext":"bx","module":"mod","operationType":"query","operationName":"hello","controller":"helloWorldController","input":"HelloWorldRequestDTO","output":"HelloWorldResponseDTO"},{"boundedContext":"bx","module":"mod","operationType":"mutation","operationName":"saveHello","controller":"saveHelloController","input":"SaveHelloRequestDTO","output":"HelloWorldResponseDTO"}],"addResolversToServer":[{"serverName":"server","resolver":{"boundedContext":"bx","module":"mod","name":"hello"}},{"serverName":"secondServer","resolver":{"boundedContext":"bx","module":"mod","name":"saveHello"}}],"bitloopsModel":{"bx":{"mod":{"DTOs":{"HelloWorldRequestDTO":{"fields":[{"name":"name","type":"string","optional":false}]},"HelloWorldResponseDTO":{"fields":[{"name":"message","type":"string","optional":false}]},"SaveHelloRequestDTO":{"fields":[{"name":"helloToBeSaved","type":"string","optional":false}]}}}}}} | const serverTypeDefs = GraphQL.gql`input HelloWorldRequest {name: String!}type HelloWorldResponse {message: String!}type Query {hello(input: HelloWorldRequest): HelloWorldResponse}`;const serverResolvers = {  Query: {hello: async(_parent: any, args: any, context: any): Promise<any> => { const result = await helloWorldController.execute({ args: args.input, context }); return result; },  },};const server = new GraphQL.ApolloServer({ typeDefs: serverTypeDefs, resolvers: serverResolvers }); server.listen({ port: 4002 });const secondServerTypeDefs = GraphQL.gql`input SaveHelloRequest {helloToBeSaved: String!}type HelloWorldResponse {message: String!}type Query { empty: String }type Mutation {saveHello(input: SaveHelloRequest): HelloWorldResponse}`;const secondServerResolvers = {  Mutation: {saveHello: async(_parent: any, args: any, context: any): Promise<any> => { const result = await saveHelloController.execute({ args: args.input, context }); return result; },  },};const secondServer = new GraphQL.ApolloServer({ typeDefs: secondServerTypeDefs, resolvers: secondServerResolvers }); server.listen({ port: 4003 }); |
