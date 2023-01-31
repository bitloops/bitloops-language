import { DomainErrors } from '../../domain/errors/index.js';
import { CreateTodoCommand } from './commands/';

import {
  Application,
  Domain,
  failWithPublish as failResp,
  okWithpublish as okResp,
  Either,
} from '@bitloops/bl-boilerplate-core';

type InsertPINCommandHandlerResponse = Either<void, DomainErrors.>;

export class CreateTodoCommandHandler
  implements Application.IUseCase<CreateTodoCommand, Promise<InsertPINCommandHandlerResponse>>
{
  private todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>;

  constructor(todoRepo: Application.Repo.ICRUDWritePort<TodoEntity, Domain.UUIDv4>) {
    this.todoRepo = todoRepo;
  }

  async execute(command: CreateTodoCommand): Promise<InsertPINCommandHandlerResponse> {
    const fail = failResp(command.metadata);
    const ok = okResp(command.metadata);

    const title = TitleVO.create({ title: command.title });

    if (title.isFail()) {
      return fail(title.value);
    }
    const todo = TodoEntity.create({ title: title.value, completed: false });
    if (todo.isFail()) {
      return fail(todo.value);
    }

    await this.todoRepo.save(todo.value);
    return ok();
  }
}
