import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { TodoGetAllUseCase } from '../application/TodoGetAllUseCase';

export class TodoGetAllController extends Fastify.BaseController {
  private useCase: TodoGetAllUseCase;
  constructor(useCase: TodoGetAllUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const result = await this.useCase.execute();
    if (result.isFail()) {
      this.fail(response, result.value);
    } else {
      this.ok(response, result.value);
    }
  }
}
