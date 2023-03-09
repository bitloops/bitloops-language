import { TGraphQLController } from '../../../../../src/types.js';
import { GraphQLControllerBuilderDirector } from '../../builders/controllers/graphQLControllerBuilderDirector.js';

type GraphQLControllerDeclarationTestCase = {
  description: string;
  fileId: string;
  inputBLString: string;
  expected: TGraphQLController;
};

export const validGraphQLControllerDeclarationCases: Array<GraphQLControllerDeclarationTestCase> = [
  {
    description: 'GraphQL controller declaration without error',
    fileId: 'testFile.bl',
    inputBLString: `
    GraphQLController HelloWorldController ( ) {
      operation: GraphQL.Operations.Query;
      input: HelloWorldRequestDTO;

      execute(request): HelloWorldResponseDTO {
        this.ok('Hello World!');
      }
    }`,
    expected: new GraphQLControllerBuilderDirector().buildControllerWithInputAndNoParams({
      identifier: 'HelloWorldController',
      operationType: 'query',
      inputType: 'HelloWorldRequestDTO',
    }),
  },
  {
    description: 'GraphQL controller declaration without input',
    fileId: 'testFile.bl',
    inputBLString: `
    GraphQLController HelloWorldController ( ) {
      operation: GraphQL.Operations.Query;

      execute(request): HelloWorldResponseDTO {
        this.ok('Hello World!');
      }
    }`,
    expected: new GraphQLControllerBuilderDirector().buildControllerWithoutInputAndNoParams({
      identifier: 'HelloWorldController',
      operationType: 'query',
    }),
  },
  {
    description: 'GraphQL controller declaration with 1 dependency',
    fileId: 'testFile.bl',
    inputBLString: `
    GraphQLController HelloWorldController (helloWorldUseCase: HelloWorldUseCase) {
      operation: GraphQL.Operations.Query;
      input: HelloWorldRequestDTO;

      execute(request): HelloWorldResponseDTO {
        this.ok('Hello World!');
      }
    }`,
    expected: new GraphQLControllerBuilderDirector().buildControllerWithInputAndOneParam({
      identifier: 'HelloWorldController',
      operationType: 'query',
      inputType: 'HelloWorldRequestDTO',
      param: {
        identifier: 'helloWorldUseCase',
        type: 'HelloWorldUseCase',
      },
    }),
  },
];
