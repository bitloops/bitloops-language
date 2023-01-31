import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { DeleteTodoUseCase } from '../../../../../bounded-contexts/todo/todo/application/DeleteToDoUseCase';
import { ApplicationErrors } from '../../../../../bounded-contexts/todo/todo/application/errors';
import { DeleteTodoRequestDTO } from '../../../../../bounded-contexts/todo/todo/dtos/DeleteToDoRequestDTO';

export class DeleteTodoRESTController extends Fastify.BaseController {
  private deleteTodoUseCase: DeleteTodoUseCase;
  constructor(deleteTodoUseCase: DeleteTodoUseCase) {
    super();
    this.deleteTodoUseCase = deleteTodoUseCase;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: DeleteTodoRequestDTO = {
      id: (request.params as any).id,
    };
    const result = await this.deleteTodoUseCase.execute(dto);

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
      this.ok(response);
    }
  }
}
