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
    description: 'hello world controller',
    controllerName: 'HelloWorldController',
    controller: new RestControllerBuilderDirector().buildControllerThatReturnsHelloWorld(
      'HelloWorldController',
    ),
    serverType: 'REST.Fastify',
    output: `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
export class HelloWorldController extends Fastify.BaseController {
  constructor() {
    super();
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    return 'Hello World';
  }
}`,
  },
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
    description:
      'REST controller that executes result and returns it, testing both await and dot value',
    controllerName: 'CreateTodoController',
    controller: new RestControllerBuilderDirector().buildControllerThatExecutesAndReturnsResult(
      'CreateTodoController',
    ),
    serverType: 'REST.Fastify',
    output: `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { TodoCreateUseCase } from '../application/TodoCreateUseCase';
export class CreateTodoController extends Fastify.BaseController {
  private useCase: TodoCreateUseCase;
  constructor(useCase: TodoCreateUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const result = await this.useCase.execute();
    if (true) {
      return this.ok(result.value);
    }
  }
}`,
  },
  {
    description: 'Realistic REST controller with dto and switch on use case result',
    controllerName: 'HelloWorldController',
    controller: new RestControllerBuilderDirector().buildControllerWithSwitchStatement(
      'HelloWorldController',
    ),
    serverType: 'REST.Fastify',
    output: `import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { HelloWorldUseCase } from '../application/HelloWorldUseCase';
import { HelloWorldRequestDTO } from '../dtos/HelloWorldRequestDTO';
import { DomainErrors } from '../domain/errors/index';
export class HelloWorldController extends Fastify.BaseController {
  private useCase: HelloWorldUseCase;
  constructor(useCase: HelloWorldUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: HelloWorldRequestDTO = { name: request.body.name };
    const result = await this.useCase.execute(dto);
    if (result.value.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.InvalidNameError: {
          this.clientError(response, result.value.message);
          break;
        }
        default: {
          this.error(response, result.value.message);
        }
      }
    } else {
      this.ok(response, result.value);
    }
  }
}`,
  },
];
