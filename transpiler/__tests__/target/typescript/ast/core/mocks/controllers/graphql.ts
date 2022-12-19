import { GraphQLControllerBuilderDirector } from '../../../../core/builders/controllers/graphqlDirector.js';

export const GRAPHQL_CONTROLLER_TEST_CASES = [
  {
    description: 'prepend await to this.useCase.execute()',
    controller: new GraphQLControllerBuilderDirector().buildGraphQLControllerWithThisUseCaseExecute(
      'CreateTodoController',
    ),
    expectedOutput:
      new GraphQLControllerBuilderDirector().buildGraphQLControllerWithThisUseCaseExecute(
        'CreateTodoController',
        { await: true },
      ),
  },
  {
    description: 'append dot value to result of this.useCase.execute() afterwards',
    controller: new GraphQLControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
      'CreateTodoController',
    ),
    expectedOutput:
      new GraphQLControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
        'CreateTodoController',
        { await: true, dotValue: true },
      ),
  },
  {
    description: 'nothing happens if there is no this.useCase.execute()',
    controller: new GraphQLControllerBuilderDirector().buildControllerThatReturnsHelloWorld(
      'HelloWorldController',
    ),
    expectedOutput: new GraphQLControllerBuilderDirector().buildControllerThatReturnsHelloWorld(
      'HelloWorldController',
    ),
  },
  {
    description: 'appends dot value 2 times if result is used twice',
    controller:
      new GraphQLControllerBuilderDirector().buildControllerThatExecutesAndUsesResultTwice(
        'CreateTodoController',
      ),
    expectedOutput:
      new GraphQLControllerBuilderDirector().buildControllerThatExecutesAndUsesResultTwice(
        'CreateTodoController',
        { await: true, dotValue: true },
      ),
  },
];
