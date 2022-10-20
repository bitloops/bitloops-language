import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { TodoCreateUseCase } from '../application/TodoCreateUseCase';
import { TodoCreateRequestDTO } from '../dtos/TodoCreateRequestDTO';

export class TodoCreateController extends Fastify.BaseController {
  private useCase: TodoCreateUseCase;
  constructor(useCase: TodoCreateUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: TodoCreateRequestDTO = {
      title: (request.body as any).title,
    };
    const result = await this.useCase.execute(dto);
    if (result.isFail()) {
      this.fail(response, result.value.message);
    } else {
      this.created(response);
    }
  }
}
