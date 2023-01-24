import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { GetAllTodosUseCase } from '../application/GetAllTodoUseCase';

export class GetAllTodoRESTController extends Fastify.BaseController {
  private useCase: GetAllTodosUseCase;
  constructor(useCase: GetAllTodosUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const result = await this.useCase.execute();

    this.ok(response, result.value);
  }
}
