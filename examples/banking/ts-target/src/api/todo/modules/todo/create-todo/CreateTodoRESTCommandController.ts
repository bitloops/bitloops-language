import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';
import { CreateTodoCommand } from '../../../../../bounded-contexts/todo/todo/application/commands';
import { DomainErrors } from '../../../../../bounded-contexts/todo/todo/domain/errors';
import { CreateTodoRequestDTO } from '../../../../../bounded-contexts/todo/todo/dtos/CreateTodoRequestDTO';
import { Either, Infra } from '@bitloops/bl-boilerplate-core';

type CreateTodoUseCaseResponse = Either<void, DomainErrors.TitleOutOfBounds>;

export class CreateTodoRESTCommandController extends Fastify.BaseController {
  constructor(private commandBus: Infra.CommandBus.ICommandBus) {
    super();
    this.commandBus = commandBus;
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    const dto: CreateTodoRequestDTO = {
      title: (request.body as any).title,
    };

    const command = new CreateTodoCommand(dto);
    const result = (await this.commandBus.sendAndGetResponse(command, [
      DomainErrors.TitleOutOfBounds,
    ])) as CreateTodoUseCaseResponse;

    if (result.isFail()) {
      switch (result.value.constructor) {
        case DomainErrors.TitleOutOfBounds: {
          this.badRequest(response, result.value);
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
