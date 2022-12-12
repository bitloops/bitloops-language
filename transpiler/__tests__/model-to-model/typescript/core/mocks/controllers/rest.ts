import { RestControllerBuilderDirector } from '../../../../../target/typescript/core/builders/controllers/rest.js';

export const REST_CONTROLLER_TEST_CASES = [
  {
    description: 'append await to this.useCase.execute()',
    controller: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(),
    // TODO output should have await
    outputTree: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(),
  },
];
