import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { GetAllTodoUseCase } from '../application/GetAllTodoUseCase';

export class GetAllTodoRESTController extends Fastify.BaseController {
  private useCase: GetAllTodoUseCase;
  constructor(useCase: GetAllTodoUseCase) {
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
