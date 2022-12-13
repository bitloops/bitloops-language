import { RestControllerBuilderDirector } from '../../../../core/builders/controllers/rest.js';

export const REST_CONTROLLER_TEST_CASES = [
  {
    description: 'prepend await to this.useCase.execute()',
    controller: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(
      'CreateTodoController',
    ),
    expectedOutput:
      new RestControllerBuilderDirector().buildRestControllerWithAwaitThisUseCaseExecute(
        'CreateTodoController',
      ),
  },
  {
    description: 'append dot value to result of this.useCase.execute() afterwards',
    controller: new RestControllerBuilderDirector().buildTodoCreateControllerPreModelToTSModel(
      'CreateTodoController',
    ),
    expectedOutput:
      new RestControllerBuilderDirector().buildTodoCreateControllerAfterModelToTSModel(
        'CreateTodoController',
      ),
  },
];
