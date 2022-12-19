import { RESTControllerNode } from '../../../../../../src/ast/core/intermediate-ast/nodes/controllers/restController/RESTControllerNode.js';
import { TServerType } from '../../../../../../src/types.js';
import { RestControllerBuilderDirector } from '../../builders/controllers/rest.js';

type TestCase = {
  description: string;
  controller: RESTControllerNode;
  controllerName: string;
  serverType: TServerType;
  output: string;
};

export const VALID_REST_CONTROLLER_TEST_CASES: TestCase[] = [
  {
    description: 'REST controller with one use case execute',
    controllerName: 'CreateTodoController',
    controller: new RestControllerBuilderDirector().buildRestControllerWithThisUseCaseExecute(
      'CreateTodoController',
    ),
    serverType: 'REST.Fastify',
    output: `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
export class CreateTodoController extends Fastify.BaseController {
  constructor() {
    super();
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const result = await this.useCase.execute();
  }
}`,
  },
  {
    description: 'REST controller that executes result and returns it',
    controllerName: 'CreateTodoController',
    controller: new RestControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
      'CreateTodoController',
    ),
    serverType: 'REST.Fastify',
    output: `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
export class CreateTodoController extends Fastify.BaseController {
  constructor() {
    super();
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const result = await this.useCase.execute();
    if (true) {
      return result;
    }
  }
}`,
  },
];
