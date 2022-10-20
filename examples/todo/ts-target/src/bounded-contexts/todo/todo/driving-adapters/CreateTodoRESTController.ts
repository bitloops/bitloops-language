import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { CreateTodoUseCase } from '../application/CreateTodoUseCase';
import { DomainErrors } from '../domain/DomainErrors';
import { CreateTodoRequestDTO } from '../dtos/CreateTodoRequestDTO';

export class CreateTodoRESTController extends Fastify.BaseController {
  private createTodoUseCase: CreateTodoUseCase;
  constructor(createTodoUseCase: CreateTodoUseCase) {
    super();
    this.createTodoUseCase = createTodoUseCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: CreateTodoRequestDTO = {
      title: (request.body as any).title,
    };
    const result = await this.createTodoUseCase.execute(dto);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.TitleOutOfBoundsError: {
          this.clientError(response, result.value.message);
          break;
        }
        default:
          this.fail(response, result.value.message);
      }
    } else {
      this.created(response);
    }
  }
}
