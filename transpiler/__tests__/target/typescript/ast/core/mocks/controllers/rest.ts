import { RestControllerBuilderDirector } from '../../../../core/builders/controllers/rest.js';

export const REST_CONTROLLER_TEST_CASES = [
  {
    description: 'prepend await to this.useCase.execute()',
    controller: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(
      'CreateTodoController',
    ),
    expectedOutput: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(
      'CreateTodoController',
      { await: true },
    ),
  },
  {
    description: 'append dot value to result of this.useCase.execute() afterwards',
    controller: new RestControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
      'CreateTodoController',
    ),
    expectedOutput: new RestControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
      'CreateTodoController',
      { await: true, dotValue: true },
    ),
  },
  {
    description: 'nothing happens if there is no this.useCase.execute()',
    controller: new RestControllerBuilderDirector().buildControllerThatReturnsHelloWorld(
      'HelloWorldController',
    ),
    expectedOutput: new RestControllerBuilderDirector().buildControllerThatReturnsHelloWorld(
      'HelloWorldController',
    ),
  },
  {
    description: 'appends dot value 2 times if result is used twice',
    controller: new RestControllerBuilderDirector().buildControllerThatExecutesAndUsesResultTwice(
      'CreateTodoController',
    ),
    expectedOutput:
      new RestControllerBuilderDirector().buildControllerThatExecutesAndUsesResultTwice(
        'CreateTodoController',
        { await: true, dotValue: true },
      ),
  },
];
