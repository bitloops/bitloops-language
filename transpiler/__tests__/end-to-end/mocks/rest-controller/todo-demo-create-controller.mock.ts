import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { CreateTodoUseCase } from '../application/CreateTodoUseCase';
import { Container, Infra } from '@bitloops/bl-boilerplate-core';
import { DomainErrors } from '../domain/errors/index';
export class CreateTodoRESTController extends Fastify.BaseController {
  private commandBus: Infra.CommandBus.ICommandBus;
  private queryBus: Infra.QueryBus.IQueryBus;
  constructor(private createTodoUseCase: CreateTodoUseCase) {
    super();
    this.commandBus = Container.getCommandBusFromContext('Todo');
    this.queryBus = Container.getQueryBusFromContext('Todo');
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto = { title: request.body.title };
    const result = await this.createTodoUseCase.execute(dto);
    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.TitleOutOfBoundsError: {
          this.clientError(response, result.value.message);
          break;
        }
        default: {
          this.fail(response, result.value.message);
        }
      }
    } else {
      this.created(response);
    }
  }
}
