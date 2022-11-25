import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { ApplicationErrors } from '../application/errors';
import { GetByIdTodoUseCase } from '../application/GetByIdTodoUseCase';
import { GetByIdTodoRequestDTO } from '../dtos/GetByIdTodoRequestDTO';

export class GetByIdTodoRESTController extends Fastify.BaseController {
  private useCase: GetByIdTodoUseCase;
  constructor(useCase: GetByIdTodoUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: GetByIdTodoRequestDTO = {
      id: (request.params as any).id,
    };
    const result = await this.useCase.execute(dto);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case ApplicationErrors.ToDoNotFound: {
          this.notFound(response, result.value);
          break;
        }
        default:
          this.fail(response, result.value.message);
      }
    } else {
      this.ok(response, result.value);
    }
  }
}
