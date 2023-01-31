import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { ApplicationErrors } from '../../../../../bounded-contexts/todo/todo/application/errors';
import { UpdateTodoUseCase } from '../../../../../bounded-contexts/todo/todo/application/UpdateTodoUseCase';
import { UpdateTodoRequestDTO } from '../../../../../bounded-contexts/todo/todo/dtos/UpdateTodoRequestDTO';

export class UpdateTodoRESTController extends Fastify.BaseController {
  private updateTodoUseCase: UpdateTodoUseCase;
  constructor(updateTodoUseCase: UpdateTodoUseCase) {
    super();
    this.updateTodoUseCase = updateTodoUseCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const requestBody = request.body as any;
    const requestParams = request.params as any;

    const dto: UpdateTodoRequestDTO = {
      id: requestParams.id,
      title: requestBody.title,
      completed: requestBody.completed,
    };
    const result = await this.updateTodoUseCase.execute(dto);
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
      this.created(response);
    }
  }
}
