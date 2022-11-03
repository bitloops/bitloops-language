import { Domain } from '@bitloops/bl-boilerplate-core';
import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { ApplicationErrors } from '../application/errors';
import { UpdateTodoUseCase } from '../application/UpdateTodoUseCase';
import { UpdateTodoRequestDTO } from '../dtos/UpdateTodoRequestDTO';

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
      id: new Domain.UUIDv4(requestParams.id),
      title: requestBody.title,
      completed: requestBody.completed,
    };
    const result = await this.updateTodoUseCase.execute(dto);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case ApplicationErrors.ToDoNotFound: {
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
